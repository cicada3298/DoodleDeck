"use client";

import { useEffect, useState, useRef } from "react";
import * as fabric from "fabric";

export default function Editor() {
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null);
  const dropZoneRef = useRef(null);

  useEffect(() => {
    if(canvasRef.current){
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
      });

      canvasInstance.current = canvas;
      
      return () => {
        if (canvas) {
          canvas.dispose();
        }
      };
    }
  }, []);

  const uploadImage = (e) => {      
    const file = e.target.files[0];
    if(!file) return;
    handleFile(file);
  }

  const handleFile = (file) => {
    const canvas = canvasInstance.current;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const imageURL = e.target.result;
      let imageElement = document.createElement('img');
      imageElement.src = imageURL;
      imageElement.onload = () => {
        const img = new fabric.Image(imageElement);
        const scaleFactor = Math.min(
          canvas.width / img.width, 
          canvas.height / img.height
        );
        img.scale(scaleFactor);

        img.set({
          left : (canvas.width - img.getScaledWidth())/2,
          top : (canvas.height - img.getScaledHeight())/2,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      }

    };
  }

  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    };

    dropZone.addEventListener("dragover", handleDragOver);
    dropZone.addEventListener("drop", handleDrop);

    return () => {
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, []);

  const addText = () => {
    const canvas = canvasInstance.current;
    if(!canvas) return;
    const text = new fabric.IText('Sample Text', {
      left: 100,
      top: 100,
      fill: '#000',
      fontSize: 24,
    });
    canvas.add(text).setActiveObject(text);
  };

  const addShape = (shape) => {
    const canvas = canvasInstance.current;
    if(!canvas) return;
    let obj;
    if (shape === 'rect') {
      obj = new fabric.Rect({ left: 100, top: 100, width: 100, height: 100, fill: 'blue' });
    } else if (shape === 'circle') {
      obj = new fabric.Circle({ left: 100, top: 100, radius: 50, fill: 'green' });
    }
    canvas.add(obj).setActiveObject(obj);
  };

  const applyFilter = () => {
    const canvas = canvasInstance.current;
    if(!canvas) return;
    const obj = canvas.getActiveObject();
    if (obj && obj.filters) {
      obj.filters.push(new fabric.Image.filters.Grayscale());
      obj.applyFilters();
      canvas.renderAll();
    }
  };

  const crop = () => {
    const canvas = canvasInstance.current;
    if(!canvas) return;
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
    <div className="h-screen bg-black text-white flex flex-col items-center p-4">
      {/* Toolbar */}
      <div className="flex space-x-3 bg-gray-900 p-3 rounded-lg shadow-lg mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="hidden"
          id="upload-input"
        />
        <label
          htmlFor="upload-input"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
        >
          Upload Image
        </label>
        <a
          href="/dashboard"
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
        >
          Back to Dashboard
        </a>
      </div>

      {/* Canvas Container */}
      <div ref={dropZoneRef} className="flex justify-center items-center bg-white h-screen w-full border-2 border-dashed border-gray-500">
        <canvas ref={canvasRef} className="" />
      </div>
    </div>
  );
}
