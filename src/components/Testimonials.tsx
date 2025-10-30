import { useState, useEffect } from "react"
import { Play, Linkedin } from "lucide-react"

const customStyles = `@keyframes bounce-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(5deg); }
  66% { transform: translateY(-5px) rotate(-5deg); }
}

@keyframes slide-in-left {
  0% { transform: translateX(-20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes slide-in-right {
  0% { transform: translateX(20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes slide-in-bottom {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.animate-bounce-gentle { animation: bounce-gentle 2s infinite; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
.animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
.animate-slide-in-bottom { animation: slide-in-bottom 0.4s ease-out; }
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-500 { animation-delay: 0.5s; }
.animation-delay-1000 { animation-delay: 1s; }
`

const screenshots = [
  "/images/image1.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
  "/images/image7.jpg",
  "/images/image8.jpg",
  "/images/image9.png",
  "/images/image10.jpg",
  "/images/image13.png",
  "/images/image14.jpg",
  "/images/image15.jpg",
  "/images/image16.png",
  "/images/image17.png",
  "/images/image18.jpg",
  "/images/image19.png",
  "/images/image20.png",
  "/images/image21.png",
  "/images/image22.png",
  "/images/image23.png",
  "/images/image24.png",
  "/images/image25.png",

]

const rotations = [
  "rotate-2",
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-3",
  "-rotate-3",
  "rotate-1",
  "-rotate-2",
  "rotate-2",
  "-rotate-1",
]

const VideoTestimonial = ({ testimonial, index }) => {
  const [showVideo, setShowVideo] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handlePageClick = (e) => {
      if (showVideo && !e.target.closest("iframe") && !e.target.closest("button")) {
        setShowVideo(false)
        setIsLoading(false)
        setHasError(false)
      }
    }
    if (showVideo) {
      document.addEventListener("click", handlePageClick)
    }
    return () => {
      document.removeEventListener("click", handlePageClick)
    }
  }, [showVideo])

  const handleShowVideo = (e) => {
    e.stopPropagation()
    setIsLoading(true)
    setShowVideo(true)
    setHasError(false)
  }

  const handleStopVideo = () => {
    setShowVideo(false)
    setIsLoading(false)
    setHasError(false)
  }

  return (
    <div
      className={`mb-2 inline-block w-full rounded-xl shadow-md transform ${rotations[index % rotations.length]} hover:rotate-0 transition-all duration-300  p-2`}
    >
      {!showVideo ? (
        <div className="relative overflow-hidden">
          <img
            src={testimonial.thumbnail || "/placeholder.svg"}
            alt={`${testimonial.name} video testimonial`}
            className="w-full aspect-[3/4] object-cover rounded-xl transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleShowVideo}
              className="relative w-16 h-16 bg-white bg-opacity-95 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 hover:scale-110 animate-bounce-gentle group-hover:animate-pulse"
            >
              <Play className="w-8 h-8 text-orange-500 ml-1 transition-transform duration-200 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-full border-2 border-white opacity-60 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-white opacity-40 animate-ping animation-delay-200"></div>
            </button>
          </div>

          <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-60 animate-float"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full opacity-40 animate-float animation-delay-500"></div>
          <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-float animation-delay-1000"></div>

          {testimonial.linkedinUrl !== undefined && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (testimonial.linkedinUrl) {
                  window.open(testimonial.linkedinUrl, "_blank");
                }
              }}
              className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-all duration-300 hover:scale-110 shadow-lg z-10 cursor-pointer"
            >
              <Linkedin className="w-5 h-5 text-blue-600" />
            </div>
          )}


          <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
            <img
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover border-4 border-orange-100 shadow-md transition-transform duration-300 hover:scale-110"
            />
            <div className="animate-slide-in-right">
              <p className="font-bold text-base">{testimonial.name}</p>
              <p className="text-sm font-medium opacity-90">{testimonial.role}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          {isLoading && !hasError && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10 rounded-2xl">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-sm">Loading video...</p>
              </div>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10 rounded-2xl">
              <div className="flex flex-col items-center gap-3 text-center p-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <p className="text-white text-sm">Video unavailable on localhost</p>
                <p className="text-gray-300 text-xs">Deploy to see videos</p>
                <button onClick={handleStopVideo} className="text-orange-400 text-xs underline">
                  Go back
                </button>
              </div>
            </div>
          )}
          <div className="relative overflow-hidden rounded-xl ">
            <iframe
              id={`video-${index}`}
              src={`${testimonial.videoUrl}?autoplay=1&controls=1&modestbranding=1&rel=0`}
              className="w-full aspect-[3/4] rounded-lg"
              allow="autoplay; encrypted-media"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false)
                setHasError(true)
              }}
              title={`${testimonial.name} testimonial video`}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const TestimonialsGrid = () => {
  return (
   <section id="testimonials" className="scroll-mt-28 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 min-h-screen py-16 px-6 overflow-hidden rounded-[3rem]">

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            100+ HAPPY
            <br />
            USERS' LOVE
          </h2>
          <div className="max-w-2xl">
            <p className="text-white/90 text-sm leading-relaxed">
              Thank you for your praise and suggestions. With your support, we can go further. We hope to accompany you
              throughout your job search journey.
            </p>
          </div>
        </div>

        {/* Image Testimonials */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 [column-fill:_balance]">
          {screenshots.map((src, index) => (
            <div
              key={index}
              className={`mb-2 inline-block w-full rounded-xl shadow-md transform ${rotations[index % rotations.length]} hover:rotate-0 transition-all duration-300 p-2`}
            >
              <img
                src={src || "/placeholder.svg"}
                alt={`Testimonial ${index + 1}`}
                className="rounded-lg w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Video Testimonials */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              videoUrl: "https://www.youtube.com/embed/p41OvikonKo",
              thumbnail: "/images/anjali.jpeg",
              name: "Anjali S.",
              avatar: "/images/anjali.jpeg",
              role: "Skyworks Solutions, Inc.",
              linkedinUrl: " https://www.linkedin.com/in/anjalishah6198/",
            },
            {
              videoUrl: "https://www.youtube.com/embed/nYEO8K0q38c",
              thumbnail: "images/rijul.jpg",
              name: "Rijul J.",
              avatar: "images/rijul.jpg",
              role: "Wise",
              linkedinUrl: " https://www.linkedin.com/in/-rijuljain-/",
            },
            {
              videoUrl: "https://www.youtube.com/embed/p9kzhLHjJuI",
              thumbnail: "/images/aryan.jpg",
              name: "Aryan G.",
              avatar: "/images/aryan.jpg",
              role: "IBM",
              linkedinUrl: "",
            },
          ].map((video, index) => (
            <VideoTestimonial testimonial={video} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsGrid
