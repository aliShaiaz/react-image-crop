import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "../css/ImageCrop.css";

const ImageCrop = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 / 1 });
  const [crop, setCrop] = useState({ unit: "%", width: 30 });
  const [croppedImage, setCroppedImage] = useState(null);
  const imageRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCropChange = (crop) => {
    setCrop(crop);
  };

  const handleCropComplete = (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      generateCroppedImage(imageRef.current, crop);
    }
  };

  const generateCroppedImage = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob(
      (blob) => {
        setCroppedImage(URL.createObjectURL(blob));
      },
      "image/jpeg",
      1
    );
  };

  const handleDownloadClick = () => {
    if (croppedImage) {
      const link = document.createElement("a");
      link.href = croppedImage;
      link.download = "cropped-image.jpg";
      link.click();
    }
  };

  return (
    <>
      <div className="header">
        <h1>Image Cropper</h1>
      </div>

      <div className="body">
        <div className="leftSegment">
          <input type="file" onChange={handleFileChange} />{" "}
          {croppedImage && (
            <div>
              <button onClick={handleDownloadClick}>
                Download Cropped Image
              </button>
            </div>
          )}
        </div>
        <div className="rightSegment">
          {selectedFile && (
            <ReactCrop
              src={URL.createObjectURL(selectedFile)}
              crop={crop}
              onChange={handleCropChange}
              onComplete={handleCropComplete}
              onImageLoaded={(image) => {
                imageRef.current = image;
              }}
            />
          )}{" "}
        </div>
      </div>
      <div className="footer">
        <h4>Designed & Developed by</h4>
        <h6>Shaiaz Ali</h6>
        <h6>Bachelor of CS, AIUB</h6>
      </div>
      {/* 
      
       */}
    </>
  );
};

export default ImageCrop;
