import React from "react";

const screenshots = [
  "/images/image1.jpg","/images/image3.jpg","/images/image4.jpg","/images/image5.jpg",
  "/images/image6.jpg","/images/image7.jpg","/images/image8.jpg","/images/image9.png",
  "/images/image10.jpg","/images/image13.png","/images/image14.jpg","/images/image15.jpg",
  "/images/image16.png","/images/image17.png","/images/image18.jpg","/images/image19.png",
  "/images/image20.png","/images/image21.png","/images/image22.png","/images/image23.png",
  "/images/image24.png","/images/image25.png",
];

export default function TestimonialsStatic() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-black text-center mb-10 text-white drop-shadow-md">
          All Testimonials
        </h2>

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
          {screenshots.map((src, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl shadow-lg border border-white/20 break-inside-avoid transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <img
                src={src}
                alt={`Testimonial ${idx + 1}`}
                className="w-full h-auto object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
