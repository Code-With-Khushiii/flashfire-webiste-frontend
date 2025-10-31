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
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-8 text-orange-500">
          All Testimonials
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {screenshots.map((src, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <img
                src={src}
                alt={`Testimonial ${idx + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
