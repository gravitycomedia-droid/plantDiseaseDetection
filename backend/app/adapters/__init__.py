from .base import BaseModelAdapter
from .pytorch_adapter import PyTorchAdapter

# Lazy imports for adapters with optional dependencies
try:
    from .tensorflow_adapter import TensorFlowAdapter
except ImportError:
    TensorFlowAdapter = None  # type: ignore

try:
    from .onnx_adapter import ONNXAdapter
except ImportError:
    ONNXAdapter = None  # type: ignore

__all__ = [
    "BaseModelAdapter",
    "TensorFlowAdapter",
    "PyTorchAdapter",
    "ONNXAdapter"
]