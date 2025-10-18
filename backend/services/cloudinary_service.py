import cloudinary
import cloudinary.uploader
from PIL import Image
import io

def upload_and_resize_image(file):
    """Upload image to Cloudinary with resizing"""
    # Resize image to 500px width
    image = Image.open(file.stream)
    
    # Calculate height maintaining aspect ratio
    width = 500
    height = int((width / image.width) * image.height)
    
    # Resize image
    resized_image = image.resize((width, height), Image.Resampling.LANCZOS)
    
    # Convert to bytes
    img_byte_arr = io.BytesIO()
    resized_image.save(img_byte_arr, format='JPEG', quality=85)
    img_byte_arr.seek(0)
    
    # Upload to Cloudinary
    result = cloudinary.uploader.upload(
        img_byte_arr.getvalue(),
        folder="saferide/documents",
        resource_type="image"
    )
    
    return result['secure_url']