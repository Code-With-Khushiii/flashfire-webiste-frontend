"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { GTagUTM } from "../utils/GTagUTM.js"
import { useNavigate } from "react-router-dom"
import { trackButtonClick, trackSignupIntent, trackSectionView, trackPageView } from "../utils/PostHogTracking.ts"
import { navigateWithUTM } from "../utils/UTMUtils"

const Hero = ({ setSignupFormVisibility }) => {
  const [isSuccessMatrixVisible, setIsSuccessMatrixVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const successMatrixRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSuccessMatrixVisible(true)
          // Track section view
          trackSectionView("success_matrix", {
            section: "hero_success_metrics",
          })
        }
      },
      { threshold: 0.05, rootMargin: "100px 0px" },
    )
    if (successMatrixRef.current) observer.observe(successMatrixRef.current)

    // Track page view for hero section
    trackPageView("hero", "home", {
      section: "hero_landing",
    })

    return () => {
      clearTimeout(timer)
      if (successMatrixRef.current) observer.unobserve(successMatrixRef.current)
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes flowingGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .flowing-bg {
          background: linear-gradient(-45deg, #ff6b35, #f7931e, #ff4500, #ff6b35);
          background-size: 400% 400%;
          animation: flowingGradient 15s ease infinite;
          position: absolute;
          inset: 0;
          opacity: 0.15;
        }

        .scroll-bounce {
          animation: scrollBounce 2s ease-in-out infinite;
        }
      `}</style>

      {/* Main Hero Section - 100vh */}
      <section
        id="home"
        className="relative pb-4 h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="flowing-bg" />
        </div>

        {/* Main Content - Centered (lift above background) */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div
              className={`inline-flex items-center space-x-2 bg-orange-100 border border-orange-200 rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8 lg:mb-20 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
              <span className="text-orange-800 text-xs sm:text-sm font-medium">Save 150+ Hours Every Month</span>
            </div>

            {/* Main Headline */}
            <h1
              className={`relative -top-[18px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-black leading-snug mb-6 sm:mb-8 px-2 text-center transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
              <span className="block">Land 15+ Interview Calls with Us</span>
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Powered by Flashfire AI.
              </span>
            </h1>

            {/* Subtext */}
            <p
              className={`text-lg sm:text-xl md:text-2xl lg:text-2xl text-[#333333] tracking-tight mb-12 sm:mb-12 max-w-[1100px] mx-auto leading-snug px-4 text-center lg:mb-14 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
              We apply to <span className="text-orange-600 font-bold">1,200+ USA jobs</span> and track everything - so
              you can focus on interviews.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
              <button
                type="button"
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
                    })
                  } catch {}

                  // PostHog tracking
                  trackButtonClick("Start My 7-Day Free Trial", "hero_cta", "cta", {
                    button_location: "hero_main_cta",
                    section: "hero_landing",
                  })
                  trackSignupIntent("hero_cta", {
                    signup_source: "hero_main_button",
                    funnel_stage: "signup_intent",
                  })

                  navigateWithUTM("/signup", navigate)
                }}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center transform"
              >
                <span>Start My 7-Day Free Trial</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 h-fit transform -translate-x-1/2 scroll-bounce">
          <div className="w-8 h-12 border-3 border-orange-500 rounded-full flex justify-center bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="w-2 h-4 bg-orange-500 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Success Matrix Section - simplified */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-200/40 to-red-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-red-200/30 to-orange-200/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-orange-100/50 to-red-100/40 rounded-full blur-3xl" />

          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-60" />
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-full opacity-50" />
          <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-gradient-to-r from-orange-300 to-red-300 rounded-full opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={successMatrixRef}
            className={`max-w-7xl mx-auto text-center transition-all duration-800 ease-out opacity-100 transform translate-y-0 lg:opacity-0 lg:transform lg:translate-y-8 ${
              isSuccessMatrixVisible ? "lg:opacity-100 lg:transform lg:translate-y-0" : ""
            }`}
          >
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight transition-all duration-800 delay-100 opacity-100 transform translate-y-0 lg:opacity-0 lg:transform lg:translate-y-4 ${
                isSuccessMatrixVisible ? "lg:opacity-100 lg:transform lg:translate-y-0" : ""
              }`}
            >
              <span className="block bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
                Our Platform Gets Users Interview Calls Within Weeks —
              </span>
              <span className="block bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">
                And Offers In Months
              </span>
            </h2>

            <p
              className={`text-lg sm:text-xl md:text-xl lg:text-xl text-gray-600 mb-8 sm:mb-12 lg:mb-16 transition-all duration-800 delay-150 opacity-100 transform translate-y-0 lg:opacity-0 lg:transform lg:translate-y-4 ${
                isSuccessMatrixVisible ? "lg:opacity-100 lg:transform lg:translate-y-0" : ""
              }`}
            >
              Powered by AI-driven job targeting and recruiter outreach automation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 mb-8 sm:mb-12">
              {[
                {
                  percentage: "95%",
                  title: "Clients get calls",
                  subtitle: "within a month",
                  delay: "delay-200",
                },
                {
                  percentage: "90%",
                  title: "Clients land job",
                  subtitle: "within 3 months",
                  delay: "delay-300",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`text-center group cursor-pointer relative p-6 sm:p-8 lg:p-10 transition-all duration-800 ${stat.delay} opacity-100 transform translate-y-0 lg:opacity-0 lg:transform lg:translate-y-6 flex flex-col items-center justify-center ${
                    isSuccessMatrixVisible ? "lg:opacity-100 lg:transform lg:translate-y-0" : ""
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 bg-gradient-to-br from-orange-500/10 via-red-500/15 to-orange-600/10 rounded-full scale-0 group-hover:scale-100 transition-all duration-700 ease-out group-hover:opacity-100" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-76 lg:h-76 xl:w-84 xl:h-84 border-2 border-orange-300/40 rounded-full scale-0 group-hover:scale-100 transition-all duration-900 ease-out opacity-0 group-hover:opacity-60" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-68 lg:h-68 xl:w-76 xl:h-76 bg-gradient-to-r from-orange-400/20 via-red-400/25 to-orange-500/20 rounded-full scale-0 group-hover:scale-100 transition-all duration-800 ease-out group-hover:opacity-100 blur-lg" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-20 h-20 border-2 border-orange-400/60 rounded-full" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center transition-all duration-500 group-hover:scale-110">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 lg:mb-4 transition-all duration-500 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent group-hover:scale-115 group-hover:from-orange-500 group-hover:via-red-500 group-hover:to-orange-600 ">
                      {stat.percentage}
                    </div>

                    <div className="h-1.5 w-16 sm:w-20 lg:w-24 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 mx-auto mb-4 sm:mb-5 lg:mb-6 transition-all duration-500 group-hover:w-20 sm:group-hover:w-24 lg:group-hover:w-28 rounded-full group-hover:h-2" />

                    <div className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3 text-center leading-tight group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:via-red-600 group-hover:to-orange-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {stat.title}
                    </div>

                    <div className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-medium text-center transition-all duration-500 bg-gradient-to-r from-orange-600 via-red-500 to-orange-700 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:via-red-500 group-hover:to-orange-600">
                      {stat.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p
              className={`text-sm sm:text-base md:text-lg text-gray-500 italic transition-all duration-800 delay-400 opacity-100 transform translate-y-0 lg:opacity-0 lg:transform lg:translate-y-4 ${
                isSuccessMatrixVisible ? "lg:opacity-100 lg:transform lg:translate-y-0" : ""
              }`}
            >
              *Based on verified user data from 2024-25 cohort
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
