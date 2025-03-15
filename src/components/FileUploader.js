"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FileUploader() {
  const [image, setImage] = useState(null);
  const router = useRouter();

  function handleFileChange(event) {
    const file = event.target.files[0];
    if(file){
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        console.log(imageUrl);
        localStorage.setItem('uploadedImage', imageUrl);
        router.push('/editor');
      }
      
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-4 p-2 border rounded"
      />
    </div>
  );
}
