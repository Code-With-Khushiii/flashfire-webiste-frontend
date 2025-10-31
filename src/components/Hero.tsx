import { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

<<<<<<< HEAD
const Hero = ({ setSignupFormVisibility }) => {
  const [isSuccessMatrixVisible, setIsSuccessMatrixVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const successMatrixRef = useRef<HTMLDivElement>(null);
=======
const Hero = ({ setSignupFormVisibility }: { setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [isSuccessMatrixVisible, setIsSuccessMatrixVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const successMatrixRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate();
>>>>>>> 16c90c0a8e399937ffe0025f26afa91e23d9d3b7

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsSuccessMatrixVisible(true);
      },
      { threshold: 0.05, rootMargin: "100px 0px" }
    );
    if (successMatrixRef.current) observer.observe(successMatrixRef.current);

    return () => {
      clearTimeout(timer);
      if (successMatrixRef.current)
        observer.unobserve(successMatrixRef.current);
    };
  }, []);

  // -----------------------------
  // CLOUD PARTICLES BACKGROUND
  // -----------------------------
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const initializeParticles = () => {
      particlesRef.current = [];
      const particleCount = 80;
      const colors = [
        "rgba(249, 115, 22, 0.6)", // orange
        "rgba(255, 255, 255, 0.5)", // white
        "rgba(209, 213, 219, 0.4)", // gray
        "rgba(249, 115, 22, 0.4)", // lighter orange
        "rgba(255, 255, 255, 0.3)", // lighter white
      ];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.3,
          vz: Math.random() * 0.8 + 0.3, // forward motion
          size: Math.random() * 80 + 40,
          opacity: Math.random() * 0.4 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initializeParticles();

    const animate = () => {
      timeRef.current += 1;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(255, 247, 237, 1)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(254, 242, 242, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        const depthFactor = particle.z / 100;
        const screenX =
          particle.x +
          (particle.x - canvas.width / 2) * depthFactor * 0.1;
        const screenY =
          particle.y +
          (particle.y - canvas.height / 2) * depthFactor * 0.05;

        const scaledSize = particle.size * (1 + depthFactor * 0.5);
        const scaledOpacity = particle.opacity * (0.3 + depthFactor * 0.7);

        if (particle.z > 100) {
          particle.z = -10;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        if (particle.x < -100) particle.x = canvas.width + 100;
        if (particle.x > canvas.width + 100) particle.x = -100;
        if (particle.y < -100) particle.y = canvas.height + 100;
        if (particle.y > canvas.height + 100) particle.y = -100;

        const glowGradient = ctx.createRadialGradient(
          screenX,
          screenY,
          0,
          screenX,
          screenY,
          scaledSize
        );

        const isOrange = particle.color.includes("249, 115, 22");
        const isGray = particle.color.includes("209, 213, 219");

        if (isOrange) {
          glowGradient.addColorStop(
            0,
            `rgba(249, 115, 22, ${scaledOpacity * 0.8})`
          );
          glowGradient.addColorStop(
            0.5,
            `rgba(249, 115, 22, ${scaledOpacity * 0.3})`
          );
          glowGradient.addColorStop(1, `rgba(249, 115, 22, 0)`);
        } else if (isGray) {
          glowGradient.addColorStop(
            0,
            `rgba(209, 213, 219, ${scaledOpacity * 0.6})`
          );
          glowGradient.addColorStop(
            0.5,
            `rgba(209, 213, 219, ${scaledOpacity * 0.2})`
          );
          glowGradient.addColorStop(1, `rgba(209, 213, 219, 0)`);
        } else {
          glowGradient.addColorStop(
            0,
            `rgba(255, 255, 255, ${scaledOpacity * 0.7})`
          );
          glowGradient.addColorStop(
            0.5,
            `rgba(255, 255, 255, ${scaledOpacity * 0.2})`
          );
          glowGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        }

        ctx.fillStyle = glowGradient;
        ctx.fillRect(
          screenX - scaledSize / 2,
          screenY - scaledSize / 2,
          scaledSize,
          scaledSize
        );

        if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(255, 255, 255, ${scaledOpacity * 0.3})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, scaledSize * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // -----------------------------
  // HERO SECTION JSX
  // -----------------------------
  return (
    <>
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .scroll-bounce { animation: scrollBounce 2s ease-in-out infinite; }
      `}</style>

      <section id="home" className="relative pb-4 h-screen overflow-hidden">
        {/* Integrated Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        />

        {/* Foreground content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className={`inline-flex items-center space-x-2 bg-orange-100 border border-orange-200 rounded-full px-3 sm:px-4 py-2 mb-8 transition-all duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-orange-800 text-sm font-medium">
                Save 150+ Hours Every Month
              </span>
            </div>

            <h1
              className={`text-5xl md:text-6xl font-bold text-black leading-snug mb-6 transition-all duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="block">Land 15+ Interview Calls with Us</span>
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Powered by Flashfire AI.
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl text-gray-700 mb-12 max-w-[900px] mx-auto transition-all duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              We apply to{" "}
              <span className="text-orange-600 font-bold">1,200+ USA jobs</span>{" "}
              and track everything — so you can focus on interviews.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                type="button"
<<<<<<< HEAD
                onClick={() => setSignupFormVisibility(true)}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2 pulse-glow"
=======
                onClick={() => {
                  // Track with both GTag and PostHog
                  try {
                    GTagUTM({
                      eventName: "sign_up_click",
                      label: "Hero_Start_Free_Trial_Button",
                      utmParams: {
                        utm_source: "WEBSITE",
                        utm_medium: "Website_Front_Page",
                        utm_campaign: "Website",
                      },
                    });
                  } catch {}
                  
                  // PostHog tracking
                  trackButtonClick("Start My 7-Day Free Trial", "hero_cta", "cta", {
                    button_location: "hero_main_cta",
                    section: "hero_landing"
                  });
                  trackSignupIntent("hero_cta", {
                    signup_source: "hero_main_button",
                    funnel_stage: "signup_intent"
                  });

                  try {
                    const hasSubmitted = localStorage.getItem('submitted') === 'true';
                    const savedRaw = localStorage.getItem('flashfire_signup_form_data');
                    let hasDetails = false;
                    if (savedRaw) {
                      try {
                        const saved = JSON.parse(savedRaw);
                        hasDetails = Boolean(saved?.fullName && saved?.email);
                      } catch {}
                    }
                    if (hasSubmitted || hasDetails) {
                      navigateWithUTM('/book-free-demo', navigate);
                      return;
                    }
                  } catch {}

                  navigateWithUTM('/signup', navigate);
                }}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center pulse-glow transform"
>>>>>>> 16c90c0a8e399937ffe0025f26afa91e23d9d3b7
              >
                <span>Start My 7-Day Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-bounce z-20">
          <div className="w-8 h-12 border-3 border-orange-500 rounded-full flex justify-center bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="w-2 h-4 bg-orange-500 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
