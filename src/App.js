import React, { useState, useRef } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ImageCrop from "./components/ImageCrop";
import "./css/App.css";

function App() {
  return (
    <div className="container">
      <ImageCrop />
    </div>
  );
}

export default App;
