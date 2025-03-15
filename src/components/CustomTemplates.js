"use client";
import Image from "next/image";
import { useState } from "react";

const templates = [
  { id: 1, title: "Event Poster", image: "/event_poster.avif" },
  { id: 2, title: "Club Announcement", image: "/club_announcement.webp" },
  { id: 3, title: "Workshop Flyer", image: "/workshop.jpg" },
  { id: 4, title: "Social Media Post", image: "/download.png" },
  { id: 5, title: "Club Poster", image: "/club.jpg" },
];

export default function CustomTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 bg-gray-700">Custom Templates</h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-10 w-max">
          {templates.map((template) => (
            <div
              key={template.id}
              className="relative w-60 h-40 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              onClick={() => setSelectedTemplate(template)}
            >
              <Image
                src={template.image}
                alt={template.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-50 text-white text-center w-full py-2">
                {template.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Selected Template Info */}
      {selectedTemplate && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="text-xl font-semibold">{selectedTemplate.title}</h3>
          <p>Click to edit this template!</p>
        </div>
      )}
    </div>
  );
}
