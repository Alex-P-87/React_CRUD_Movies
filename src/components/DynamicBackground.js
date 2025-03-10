import React, { useState, useEffect } from "react";
import './styleComponents/DynamicBackground.css';

const DynamicBackground = () => {
  const images = [
    "/background-images/bridgeNightLighet.jpg",
    "/background-images/bridgeNight.jpg",
    "/background-images/cosmos.jpg",
    "/background-images/darkForrest.jpg",
    "/background-images/darkTree.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); 

    return () => clearInterval(interval); 
  }, );

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1
      }}
    >
    </div>
  );
};

export default DynamicBackground;