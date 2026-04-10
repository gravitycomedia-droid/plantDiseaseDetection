import os
import logging
from pathlib import Path
from huggingface_hub import hf_hub_download
from ..config import settings

logger = logging.getLogger(__name__)

def download_model_from_hf():
    """
    Download the model and labels from Hugging Face Hub if they aren't already present.
    """
    try:
        # Define local directory (backend/app/models)
        base_dir = Path(__file__).parent.parent
        models_dir = base_dir / "models"
        models_dir.mkdir(parents=True, exist_ok=True)

        logger.info(f"Checking for model files in {models_dir}...")

        # Files to download
        files_to_download = {
            settings.hf_model_file: settings.model_path,
            settings.hf_labels_file: settings.model_labels_path
        }

        for hf_file, local_path_str in files_to_download.items():
            # Construct absolute local path
            # settings.model_path is relative to backend root or just app/models
            # We want to ensure we download to the right place
            local_path = base_dir.parent / local_path_str
            
            # Check if file exists and we aren't forcing download
            if local_path.exists() and not settings.force_download:
                logger.info(f"✅ File {hf_file} already exists at {local_path}. Skipping download.")
                continue

            logger.info(f"📥 Downloading {hf_file} from {settings.hf_repo_id}...")
            
            # Download from Hugging Face Hub
            downloaded_path = hf_hub_download(
                repo_id=settings.hf_repo_id,
                filename=hf_file,
                token=settings.hf_token,
                local_dir=local_path.parent,
                local_dir_use_symlinks=False
            )
            
            logger.info(f"Successfully downloaded {hf_file} to {downloaded_path}")

        return True
    except Exception as e:
        logger.error(f"❌ Error downloading model from Hugging Face: {e}")
        # In production, we might want to fail hard, but for now we'll just log
        if settings.is_production:
            raise e
        return False
