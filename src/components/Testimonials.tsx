import { useMemo, useState } from "react"
import { Play, Linkedin, X } from "lucide-react"

const customStyles = `
  @keyframes scroll-up {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
  @keyframes scroll-down {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0); }
  }
  .marquee-col {
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-play-state: running;
  }
  .marquee-group:hover .marquee-col {
    animation-play-state: paused;
  }
  @media (prefers-reduced-motion: reduce) {
    .marquee-col { animation: none !important; }
  }
`

const screenshots = [
  "/images/image1.jpg","/images/image3.jpg","/images/image4.jpg","/images/image5.jpg",
  "/images/image6.jpg","/images/image7.jpg","/images/image8.jpg","/images/image9.png",
  "/images/image10.jpg","/images/image13.png","/images/image14.jpg","/images/image15.jpg",
  "/images/image16.png","/images/image17.png","/images/image18.jpg","/images/image19.png",
  "/images/image20.png","/images/image21.png","/images/image22.png","/images/image23.png",
  "/images/image24.png","/images/image25.png",
]

function chunkInto<N extends number>(arr: string[], n: N): string[][] {
  const out: string[][] = Array.from({ length: n }, () => [])
  arr.forEach((item, i) => out[i % n].push(item))
  return out
}

const VideoTestimonial = ({ testimonial, index }: { testimonial: any; index: number }) => {
  const [showVideo, setShowVideo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handlePlay = () => {
    setLoading(true)
    setShowVideo(true)
    setError(false)
  }

  const handleClose = () => {
    setShowVideo(false)
    setLoading(false)
    setError(false)
  }

  return (
    <div className="mb-4 inline-block w-full rounded-xl transition-all duration-300">
      <div className="relative overflow-hidden rounded-xl">
        {!showVideo ? (
          <>
            <img
              src={testimonial.thumbnail || "/placeholder.svg"}
              alt={`${testimonial.name} video testimonial`}
              className="w-full aspect-[3/4] object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlay}
                className="relative w-16 h-16 bg-white/95 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <Play className="w-8 h-8 text-orange-500 ml-1" />
                <span className="absolute inset-0 rounded-full border-2 border-white/70 animate-ping" />
              </button>
            </div>
          </>
        ) : (
          <div className="relative">
            {loading && !error && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-white text-sm">Loading video...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 text-white p-4 text-center">
                <p className="mb-2">Video unavailable</p>
                <button onClick={handleClose} className="underline text-orange-400">Close</button>
              </div>
            )}

            <iframe
              src={`${testimonial.videoUrl}?autoplay=1&controls=1&modestbranding=1&rel=0`}
              className="w-full aspect-[3/4] rounded-xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
              onLoad={() => setLoading(false)}
              onError={() => { setLoading(false); setError(true); }}
            />
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-1 transition"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}

        {testimonial.linkedinUrl && !showVideo && (
          <a
            href={testimonial.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-all duration-300 hover:scale-110 shadow-lg z-10"
          >
            <Linkedin className="w-5 h-5 text-blue-600" />
          </a>
        )}

        <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
          <img
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-4 border-orange-100 shadow-md"
          />
          <div>
            <p className="font-bold text-base">{testimonial.name}</p>
            <p className="text-sm font-medium opacity-90">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsGrid() {
  const cols = useMemo(() => chunkInto(screenshots, 4), [])
  const speeds = [42, 48, 54, 46]

  return (
    <section
      id="testimonials"
      className="scroll-mt-28 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 min-h-screen py-16 px-6 rounded-[3rem] overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            100+ HAPPY<br />USERS' LOVE
          </h2>
          <p className="max-w-2xl text-white/90 text-sm leading-relaxed">
            Thank you for your praise and suggestions. With your support, we can go further.
            We hope to accompany you throughout your job search journey.
          </p>
        </div>

        {/* Auto-scrolling images */}
        <div className="marquee-group relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 h-[68vh] md:h-[70vh] lg:h-[72vh] select-none">
          {cols.map((colItems, colIdx) => {
            const dur = `${speeds[colIdx % speeds.length]}s`
            const anim = colIdx % 2 === 0 ? "scroll-up" : "scroll-down"
            return (
              <div key={colIdx} className="relative overflow-hidden rounded-xl">
                <div className="marquee-col" style={{ animationName: anim, animationDuration: dur }}>
                  <div className="flex flex-col gap-3 pb-3">
                    {colItems.concat(colItems).map((src, i) => (
                      <div key={i} className="rounded-xl transition-all duration-300">
                        <img
                          src={src}
                          alt={`Testimonial ${colIdx}-${i}`}
                          className="rounded-lg w-full h-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Video testimonials */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              videoUrl: "https://www.youtube.com/embed/p41OvikonKo",
              thumbnail: "/images/anjali.jpeg",
              name: "Anjali S.",
              avatar: "/images/anjali.jpeg",
              role: "Skyworks Solutions, Inc.",
              linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
            },
            {
              videoUrl: "https://www.youtube.com/embed/nYEO8K0q38c",
              thumbnail: "images/rijul.jpg",
              name: "Rijul J.",
              avatar: "images/rijul.jpg",
              role: "Wise",
              linkedinUrl: "https://www.linkedin.com/in/-rijuljain-/",
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
