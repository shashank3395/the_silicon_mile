"use client"

import { useState } from "react"

// Sample event photos - using Unsplash images as placeholders
const eventPhotos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80",
    alt: "Runners at the start line",
    height: 400,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80",
    alt: "Group of runners",
    height: 300,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80",
    alt: "Running event",
    height: 500,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
    alt: "Finish line celebration",
    height: 350,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    alt: "Corporate team running",
    height: 450,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    alt: "Runners on track",
    height: 380,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    alt: "Wellness event",
    height: 320,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    alt: "Networking at event",
    height: 420,
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    alt: "Award ceremony",
    height: 360,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    alt: "Team photo",
    height: 400,
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    alt: "Event setup",
    height: 280,
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80",
    alt: "Participants networking",
    height: 440,
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
          Event Gallery
        </h1>
        <div className="w-24 h-1 bg-orange mx-auto mb-6" />
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Relive the moments from our corporate wellness events and The Silicon Mile 5K
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {eventPhotos.map((photo) => (
          <div
            key={photo.id}
            className="break-inside-avoid mb-4 group cursor-pointer"
            onClick={() => setSelectedImage(photo.id)}
          >
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover"
                style={{ height: `${photo.height}px` }}
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{photo.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={eventPhotos.find((p) => p.id === selectedImage)?.src || ""}
              alt={eventPhotos.find((p) => p.id === selectedImage)?.alt || ""}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
