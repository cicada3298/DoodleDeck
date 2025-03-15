"use client";

import { useEffect, useState, useRef } from "react";
import * as fabric from "fabric";

export default function Editor() {
  const [imageUrl,setImageUrl] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
      setImageUrl(uploadedImage);
    }
  }, []);

  useEffect(() => {
    if(imageUrl && canvasRef.current){
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        
      });
      console.log("Canvas created", canvas);
      console.log(imageUrl);
      let imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.onload = () => {
        const img = new fabric.Image(imageElement);
        const scaleFactor = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        img.scale(scaleFactor);
  
        // Center the image on the canvas
        img.set({
          left: (canvas.width - img.getScaledWidth()) / 2,
          top: (canvas.height - img.getScaledHeight()) / 2,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      }
      
      return () => canvas.dispose();
    }
  }, [imageUrl]);

  const addText = () => {
    const canvas = canvasRef.current?.fabric;
    const text = new fabric.IText('Sample Text', {
      left: 100,
      top: 100,
      fill: '#000',
      fontSize: 24,
    });
    canvas.add(text).setActiveObject(text);
  };

  const addShape = (shape) => {
    const canvas = canvasRef.current?.fabric;
    let obj;
    if (shape === 'rect') {
      obj = new fabric.Rect({ left: 100, top: 100, width: 100, height: 100, fill: 'blue' });
    } else if (shape === 'circle') {
      obj = new fabric.Circle({ left: 100, top: 100, radius: 50, fill: 'green' });
    }
    canvas.add(obj).setActiveObject(obj);
  };

  const applyFilter = () => {
    const canvas = canvasRef.current?.fabric;
    const obj = canvas.getActiveObject();
    if (obj && obj.filters) {
      obj.filters.push(new fabric.Image.filters.Grayscale());
      obj.applyFilters();
      canvas.renderAll();
    }
  };

  const crop = () => {
    const canvas = canvasRef.current?.fabric;
    const obj = canvas.getActiveObject();
    if (obj && obj.type === 'image') {
      const cropped = new fabric.Image(obj.getElement(), {
        left: obj.left,
        top: obj.top,
        width: obj.width / 2,
        height: obj.height / 2,
        cropX: obj.width / 4,
        cropY: obj.height / 4,
      });
      canvas.remove(obj);
      canvas.add(cropped).setActiveObject(cropped);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 space-x-2">
        <button onClick={addText} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Text
        </button>
        <button onClick={() => addShape('rect')} className="px-4 py-2 bg-green-500 text-white rounded">
          Add Rectangle
        </button>
        <button onClick={() => addShape('circle')} className="px-4 py-2 bg-purple-500 text-white rounded">
          Add Circle
        </button>
        <button onClick={applyFilter} className="px-4 py-2 bg-gray-700 text-white rounded">
          Apply Grayscale Filter
        </button>
        <button onClick={crop} className="px-4 py-2 bg-red-500 text-white rounded">
          Crop Image
        </button>
      </div>
      <canvas ref={canvasRef} id="canvas" className="border w-full h-96" />
    </div>
  );
}
