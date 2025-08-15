import React, { useRef } from "react";
import "../style/ImageUploader.css";

interface SelectedImage {
  file: File;
  url: string;
  name: string;
}

const ImageUploader: React.FC<{ selectedImages: SelectedImage[]; setSelectedImages: React.Dispatch<React.SetStateAction<SelectedImage[]>>; }> = ({ selectedImages, setSelectedImages }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setSelectedImages((prev) => [
            ...prev,
            { file, url: event.target?.result as string, name: file.name }
          ]);
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset file input so same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-uploader">
      <button className="add-images-btn" onClick={openFileDialog}>
        Add Images
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="file-input"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="images-preview">
        <div className="images-grid">
          {selectedImages.length === 0 ? (
            <div className="empty-state">No images selected</div>
          ) : (
            selectedImages.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.url} alt={image.name} className="image-preview" />
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveImage(index)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;