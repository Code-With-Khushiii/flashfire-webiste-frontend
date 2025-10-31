import React from "react";
import { useEffect, useState } from "react";

const screenshots = [
  "/images/image1.jpg","/images/image3.jpg","/images/image4.jpg","/images/image5.jpg",
  "/images/image6.jpg","/images/image7.jpg","/images/image8.jpg","/images/image9.png",
  "/images/image10.jpg","/images/image13.png","/images/image14.jpg","/images/image15.jpg",
  "/images/image16.png","/images/image17.png","/images/image18.jpg","/images/image19.png",
  "/images/image20.png","/images/image21.png","/images/image22.png","/images/image23.png",
  "/images/image24.png","/images/image25.png",
];

export default function TestimonialsStatic() {
 const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])
  return (
   <section className="relative min-h-screen overflow-hidden py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500" />

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="mb-16">
          <div
            className={`transform transition-all duration-1000 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl font-bold text-white" style={{ fontFamily: "Pacifico, cursive" }}>
                All Testimonials 
              </h1>

              {/* Subtitle */}
              <p className="text-center text-white/90 text-lg sm:text-xl mt-4">See what our happy users are saying!</p>
            </div>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {screenshots.map((src, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl break-inside-avoid transform transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer group ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: loaded ? `${idx * 50}ms` : "0ms",
              }}
            >
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-white/80 shadow-lg bg-white/5">
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Happy user testimonial ${idx + 1}`}
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

    
    </section>
  );
}
