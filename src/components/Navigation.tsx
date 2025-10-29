import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { GTagUTM } from "../utils/GTagUTM.ts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  trackButtonClick, 
  trackNavigation, 
  trackModalOpen
} from "../utils/PostHogTracking.ts";
import { createLinkWithUTM, navigateWithUTM } from "../utils/UTMUtils";
import { handleWhatsAppClick } from "./WhatsAppButton.tsx";
interface NavigationProps {
  setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setCalendlyModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  handleBookingAttempt?: () => boolean;
}

type NavItem =
  | { name: "" | "Home" | "Features" | "Testimonials" | "Pricing" | "FAQ"; type: "section"; id: string }
  | { name: "Blog" | "Employers"; type: "route"; to: string };

const Navigation: React.FC<NavigationProps> = ({
  setSignupFormVisibility,
  setCalendlyModalVisibility,
  handleBookingAttempt,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // const [employerFormVisible, setEmployerFormVisible] = useState(false);


  // ----------------- Countdown (Days / Hrs / Mins / Secs) -----------------
  // Monthly countdown that rolls over to the end of next month after expiry.
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ----------------- Dynamic Slot Calculation -----------------
  // Calculate remaining slots based on current date
  // Starts with 5 slots on 1st, reduces by 1 every 10 days
  const getRemainingSlots = () => {
    const now = new Date();
    const currentDay = now.getDate();
    
    // Start with 5 slots on 1st day of month
    let slots = 5;
    
    // Reduce by 1 every 10 days
    if (currentDay >= 11) slots--;
    if (currentDay >= 21) slots--;
    if (currentDay >= 25) slots--;
    
    // Ensure minimum of 1 slot
    const finalSlots = Math.max(slots, 1);
    
    // Debug logging (remove in production)
    console.log(`Current day: ${currentDay}, Remaining slots: ${finalSlots}`);
    
    return finalSlots;
  };

  // Test function to verify slot logic (remove in production)
  const testSlotLogic = () => {
    const testDays = [1, 10, 11, 20, 21, 24, 25, 30];
    console.log('Testing slot logic:');
    testDays.forEach(day => {
      let slots = 5;
      if (day >= 11) slots--;
      if (day >= 21) slots--;
      if (day >= 25) slots--;
      slots = Math.max(slots, 1);
      console.log(`Day ${day}: ${slots} slots`);
    });
  };

  // Run test on component mount (remove in production)
  useEffect(() => {
    testSlotLogic();
  }, []);

  const [remainingSlots, setRemainingSlots] = useState(getRemainingSlots());

  // Update slots when date changes (at midnight)
  useEffect(() => {
    const updateSlots = () => {
      setRemainingSlots(getRemainingSlots());
    };

    // Update immediately
    updateSlots();

    // Calculate time until next midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    // Set timeout for next midnight
    const timeoutId = setTimeout(() => {
      updateSlots();
      // Then update every 24 hours
      const intervalId = setInterval(updateSlots, 24 * 60 * 60 * 1000);
      return () => clearInterval(intervalId);
    }, msUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, []);

  // End of current month at 23:59:59.999 local time
  const getEndOfCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0);
    lastDayOfMonth.setHours(23, 59, 59, 999);
    return lastDayOfMonth.getTime();
  };

  // End of next month at 23:59:59.999 local time
  const getEndOfNextMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const lastDayOfNextMonth = new Date(year, month + 2, 0);
    lastDayOfNextMonth.setHours(23, 59, 59, 999);
    return lastDayOfNextMonth.getTime();
  };

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const currentMonthEnd = getEndOfCurrentMonth();

      if (now >= currentMonthEnd) {
        // Month ended → countdown to end of next month
        const nextMonthEnd = getEndOfNextMonth();
        const distance = nextMonthEnd - now;
        if (distance <= 0) {
          // Defensive: recompute once
          const retryDistance = getEndOfNextMonth() - now;
          if (retryDistance <= 0) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
          }
          const days = Math.floor(retryDistance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((retryDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((retryDistance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((retryDistance % (1000 * 60)) / 1000);
          setTimeLeft({ days, hours, minutes, seconds });
          return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Still within current month → countdown to its end
        const distance = currentMonthEnd - now;
        if (distance <= 0) {
          const nextMonthEnd = getEndOfNextMonth();
          const nextDistance = nextMonthEnd - now;
          if (nextDistance <= 0) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
          }
          const days = Math.floor(nextDistance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((nextDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((nextDistance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((nextDistance % (1000 * 60)) / 1000);
          setTimeLeft({ days, hours, minutes, seconds });
          return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    // Initial calculation and interval update
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const Two = (n: number) => String(n).padStart(2, '0');

   const Countdown = () => (
    <div className="flex items-end sm:items-center gap-2 text-center">
      {[
        { value: Two(timeLeft.days), label: "Days" },
        { value: Two(timeLeft.hours), label: "Hrs" },
        { value: Two(timeLeft.minutes), label: "Mins" },
        { value: Two(timeLeft.seconds), label: "Secs" },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="min-w-12 px-3 py-2 rounded-lg bg-white/30 text-white font-extrabold text-sm sm:text-base shadow-md">
            {item.value}
            <div className=" text-[10px] leading-tight text-white/80 font-normal">{item.label}</div>
          </div>
          {/* <div className="mt-1 text-[10px] leading-tight text-white/90">{item.label}</div> */}
        </div>
      ))}
    </div>
  )
  // ------------------------------------------------------------------------

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- CONFIG: one-pager sections + external routes ---
  const navItems: NavItem[] = [
    { name: "Home", type: "section", id: "home" },
    { name: "Features", type: "section", id: "features" },
    { name: "Testimonials", type: "section", id: "testimonials" },
    { name: "Pricing", type: "section", id: "pricing" },
    { name: "FAQ", type: "section", id: "faq" },
    { name: "Blog", type: "route", to: "/blogs"  },
    { name: "Employers", type: "route", to: "/employers" },
  ];

  // --- helpers ---
  const safeTrack = (payload: any) => {
    try {
      GTagUTM?.(payload);
    } catch {
      /* swallow analytics errors */
    }
  };

  // Navigate to "/", then scroll to a section id.
  // If we're already on "/", just scroll.
  const goToSection = (id: string, closeMenu = true) => {
    const el = document.getElementById(id);

    // Track navigation
    trackNavigation(location.pathname, `/#${id}`, 'click', {
      section: id,
      navigation_type: 'section_scroll'
    });

    if (el) {
      // Scroll if element exists
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState({}, "", "/" + id);
    } else {
      // Navigate to home first
      navigate("/");

      // Wait for Home to mount, then scroll
      setTimeout(() => {
        const newEl = document.getElementById(id);
        if (newEl) {
          newEl.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState({}, "", "/" + id);
        }
      }, 100); // Delay allows DOM to render
    }

    if (closeMenu) setIsMenuOpen(false);
  };


  const openSignup = () => {
    setSignupFormVisibility(true);
    setIsMenuOpen(false);
    
    // Track with both GTag and PostHog
    safeTrack({
      eventName: "sign_up_click",
      label: "Header Sign Up Button",
      utmParams: {
        utm_source: "WEBSITE",
        utm_medium: "NAVBAR_SIGNUP_BUTTON",
        utm_campaign: "header_signup",
      },
    });
    
    // PostHog tracking
    trackButtonClick("Get Started Now", "navigation_header", "cta", {
      button_location: "header",
      navigation_type: "desktop"
    });
    trackModalOpen("signup_form", "navigation_button", {
      trigger_source: "header_cta"
    });
  };

  const openCalendly = () => {
    // Check geolocation before opening booking modal
    if (handleBookingAttempt && !handleBookingAttempt()) {
      // If geolocation check fails (user is from India), the modal will be shown by App.tsx
      return;
    }
    
    setCalendlyModalVisibility(true);
    setIsMenuOpen(false);
    
    // Track with both GTag and PostHog
    safeTrack({
      eventName: "Calendly_Meet_click",
      label: "NAVBAR_LOWER_SECTION_Button",
      utmParams: {
        utm_source: "WEBSITE",
        utm_medium: "Navbar_Meet_Button",
        utm_campaign: "WEBSITE_NAVBAR_LOWER_SECTION",
      },
    });
    
    // PostHog tracking
    trackButtonClick("Book Now", "navigation_banner", "cta", {
      button_location: "banner",
      navigation_type: "banner_cta"
    });
    trackModalOpen("calendly_modal", "navigation_button", {
      trigger_source: "banner_cta"
    });
  };

  // const openEmployerForm = () => {
  //   setEmployerFormVisibility(true);
  // };
  // const closeEmployerForm = () => setEmployerFormVisibility(false);

  return (
    <div className="font-inter">
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-white/80 backdrop-blur-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity duration-200"
                onClick={(e) => {
                  // If not on home, go home; if on home, scroll to top
                  e.preventDefault();
                  goToSection("home");
                }}
              >
                FLASHFIRE
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => {
                if (item.type === "route") {
                  // Special handling for Employers (open in new tab)
                  if (item.name === "Employers") {
                    return (
                      <a 
                        href="/employer-registration" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={item.name}
                        className="font-medium text-gray-700 transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base focus:outline-none focus:ring-0 focus:text-orange-500"
                      >
                        {item.name}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="font-medium text-gray-700 transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base focus:outline-none focus:ring-0 focus:text-orange-500"
                    >
                      {item.name}
                    </Link>
                  );
                }

                // section item (one-pager)
                return (
                  <Link to={item.name.toLowerCase()}>
                    <button
                      key={item.name}
                      onClick={() => goToSection(item.id)}
                      className="font-medium text-gray-700 transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base focus:outline-none focus:text-orange-500 focus:ring-0"
                    >
                      {item.name}
                    </button>
                  </Link>
                );
              })}
            </div>

            {/* CTA Button (desktop) */}
            <div className="hidden md:block">
              <button
                onClick={() => {
                  trackButtonClick("Get Started Now", "navigation_header_desktop", "cta", {
                    button_location: "header_desktop",
                    navigation_type: "desktop"
                  });
                  navigateWithUTM('/get-started-now', navigate);
                  handleWhatsAppClick();
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm lg:text-base"
              >
                Get Started Now →
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => {
                  trackButtonClick(
                    isMenuOpen ? "Close Menu" : "Open Menu", 
                    "navigation_mobile_menu", 
                    "icon",
                    {
                      button_location: "mobile_header",
                      menu_state: isMenuOpen ? "closing" : "opening"
                    }
                  );
                  setIsMenuOpen((v) => !v);
                }}
                className="text-gray-700 transition-colors duration-200 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-100 rounded-b-lg shadow-lg">
                {navItems.map((item) => {
                  if (item.type === "route") {
                    if (item.name === "Employers") {
                      return (
                        <a 
                          href="/employer-registration" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          key={item.name}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      );
                    }
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    );
                  }

                  // section (one-pager) on mobile
                  return (
                    <button
                      key={item.name}
                      onClick={() => goToSection(item.id)}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  );
                })}

                {/* CTA Button (mobile) */}
                <button
                  onClick={() => {
                    trackButtonClick("Get Started Now", "navigation_mobile_menu", "cta", {
                      button_location: "mobile_menu",
                      navigation_type: "mobile"
                    });
                    navigateWithUTM('/get-started-now', navigate);
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 block text-center mt-4 w-full text-base"
                >
                  Get Started Now →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Consultation Banner */}
        <div className="w-full h-16 bg-gradient-to-r from-orange-500  to-orange-600 shadow-lg relative overflow-hidden">
          {/* Background effects (unchanged) */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite]"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-white/5 rounded-full animate-[float_4s_ease-in-out_infinite_reverse]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
            {/* Mobile Layout */}
            <div className="sm:hidden h-full flex items-center justify-between gap-3 px-2">
              {/* Left: Countdown (replaces clock icon) */}
              <div className="flex-shrink-0">
                <Countdown />
              </div>

              {/* Middle: Only 1 Spot Remaining (unchanged) */}
              {/* <div className="flex-1 min-w-0 flex items-center justify-center">
                <span className="inline-block w-2 h-2 bg-red-300 rounded-full mr-2 animate-[breathe_1.5s_ease-in-out_infinite]"></span>
                <span className="text-white font-semibold text-sm opacity-95 truncate">
                  10 Slots Left 
                </span>
              </div> */}

              {/* Right: Book Now */}
              <div className="flex-shrink-0">
                {location.pathname === '/book-free-demo' ? (
                  <button
                    onClick={() => {
                      trackButtonClick("Book Now", "navigation_banner_mobile", "cta", {
                        button_location: "banner_mobile",
                        navigation_type: "mobile_banner"
                      });
                      openCalendly();
                    }}
                    className="rounded-full bg-white text-red-600 font-bold px-5 sm:px-6 py-2 shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    Book Now
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      trackButtonClick("Book Now", "navigation_banner_mobile", "cta", {
                        button_location: "banner_mobile",
                        navigation_type: "mobile_banner"
                      });
                      openCalendly();
                    }}
                    className="rounded-full bg-white text-red-600 font-bold px-5 sm:px-6 py-2 shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex h-full items-center justify-center space-x-1 sm:space-x-4 lg:space-x-8 text-nowrap">
              {/* Left: Arrow + text (unchanged) */}
              <div className="flex items-center space-x-1 sm:space-x-3 lg:space-x-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span className="font-bold text-white text-xs sm:text-base lg:text-lg tracking-wide whitespace-nowrap">
                  Hurry! {remainingSlots} Slots Remaining
                </span>
              </div>

              {/* Divider (unchanged) */}
              {/* <div className="w-px h-6 sm:h-6 lg:h-8 bg-white/50" /> */}

              {/* Middle: Countdown + "Just 1 Spot Left" (clock replaced) */}
              <div className="order-last sm:order-none">
                
                <Countdown />
                {/* <span className="font-bold text-white text-xs sm:text-base lg:text-lg tracking-wide whitespace-nowrap flex items-center">
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-300 rounded-full mr-1.5 sm:mr-2 animate-[breathe_1.5s_ease-in-out_infinite]"></span>
                  10 Slots Left This September
                </span> */}
              </div>
              {location.pathname === '/book-free-demo' ? (
                <button
                  onClick={() => {
                    trackButtonClick("Book Now", "navigation_banner_desktop", "cta", {
                      button_location: "banner_desktop",
                      navigation_type: "desktop_banner"
                    });
                    openCalendly();
                  }}
                  className="rounded-full bg-white text-red-600 font-bold px-5 sm:px-6 py-2 shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  Book Now
                </button>
              ) : (
                <Link to={createLinkWithUTM('/book-free-demo')}>
                  <button
                    onClick={() => {
                      trackButtonClick("Book Now", "navigation_banner_desktop", "cta", {
                        button_location: "banner_desktop",
                        navigation_type: "desktop_banner"
                      });
                    }}
                    className="rounded-full bg-white text-red-600 font-bold px-5 sm:px-6 py-2 shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    Book Now
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
