import json
import numpy as np
from typing import List, Tuple, Optional
from pathlib import Path
from .base import BaseModelAdapter


class PyTorchAdapter(BaseModelAdapter):
    """Adapter for PyTorch ResNet50 models trained with torchvision."""

    def __init__(self, model_path: str, labels_path: str = None):
        super().__init__(model_path, labels_path)
        self.device = None
        # ResNet50 expects 224x224 with ImageNet normalization
        self.input_shape = (224, 224, 3)

    def load_model(self) -> None:
        """Load PyTorch ResNet50 model from a state_dict checkpoint."""
        try:
            import torch
            import torch.nn as nn
            from torchvision import models

            # Set device
            self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
            print(f"Using device: {self.device}")

            # Load labels first to determine number of classes
            self.labels = self.load_labels()
            num_classes = len(self.labels)
            print(f"Number of classes from labels: {num_classes}")

            # Reconstruct the exact same ResNet50 architecture used during training
            self.model = models.resnet50(weights=None)
            self.model.fc = nn.Linear(self.model.fc.in_features, num_classes)

            # Load the trained state_dict
            state_dict = torch.load(self.model_path, map_location=self.device, weights_only=True)
            self.model.load_state_dict(state_dict)
            self.model.to(self.device)
            self.model.eval()

            print(f"PyTorch ResNet50 model loaded successfully")
            print(f"Input shape: {self.input_shape}")
            print(f"Number of classes: {num_classes}")

        except Exception as e:
            print(f"Error loading PyTorch model: {e}")
            raise

    def preprocess_image(self, image) -> 'torch.Tensor':
        """Preprocess image for ResNet50 with ImageNet normalization.
        
        Matches the exact transforms used during training:
        - Resize to 224x224
        - ToTensor (converts to [0, 1] and CHW format)
        - Normalize with ImageNet mean/std
        """
        import torch
        from PIL import Image

        # Resize to model input size
        target_size = (self.input_shape[0], self.input_shape[1])
        image = image.resize(target_size, Image.BILINEAR)

        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')

        # Convert to tensor: HWC uint8 -> CHW float32 [0, 1]
        image_array = np.array(image, dtype=np.float32) / 255.0
        image_array = np.transpose(image_array, (2, 0, 1))  # HWC -> CHW

        # Apply ImageNet normalization (must match training transforms)
        mean = np.array([0.485, 0.456, 0.406], dtype=np.float32).reshape(3, 1, 1)
        std = np.array([0.229, 0.224, 0.225], dtype=np.float32).reshape(3, 1, 1)
        image_array = (image_array - mean) / std

        # Add batch dimension and convert to tensor
        image_tensor = torch.from_numpy(image_array).unsqueeze(0).to(self.device)

        return image_tensor

    def predict(self, image_tensor) -> np.ndarray:
        """Make prediction using PyTorch model."""
        try:
            import torch

            if self.model is None:
                raise ValueError("Model not loaded")

            with torch.no_grad():
                outputs = self.model(image_tensor)

                # Apply softmax to get probabilities
                probabilities = torch.nn.functional.softmax(outputs, dim=1)

                # Convert to numpy
                predictions = probabilities.cpu().numpy()

            return predictions

        except Exception as e:
            print(f"Error during PyTorch prediction: {e}")
            raise

    def load_labels(self) -> List[str]:
        """Load class labels from class_names.json or config.
        
        Priority:
        1. Labels JSON file (class_names.json from training)
        2. Config manager
        """
        # Try labels file first (this is the ground truth from training)
        if self.labels_path and Path(self.labels_path).exists():
            try:
                with open(self.labels_path, 'r') as f:
                    labels = json.load(f)
                print(f"Loaded {len(labels)} labels from {self.labels_path}")
                return labels
            except Exception as e:
                print(f"Error loading labels from file: {e}")

        # Fallback to config manager
        if self.config:
            return self.config.get_class_names()

        return []