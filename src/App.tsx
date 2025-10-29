
import {useEffect, useState} from 'react';
import { Outlet, useLocation } from "react-router-dom";
import SignupForm from './components/SignupForm.tsx';
import CalendlyModal from './components/CalendlyModal.tsx';
import CalendlyPreloader from './components/CalendlyPreloader.tsx';
import Navigation from './components/Navigation.tsx';
import Footer from './components/Footer.tsx';
import SalesPopup from './components/SalesPopUp.tsx';
import GeoBlockModal from './components/GeoBlockModal.tsx';
import { trackPageView, trackUserJourney } from './utils/PostHogTracking.ts';
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [signupFormVisibility, setSignupFormVisibility] = useState(false);
  const [calendlyModalVisibility, setCalendlyModalVisibility] = useState(false);
  const [calendlyUser, setCalendlyUser] = useState(null);
  const [showGeoBlockModal, setShowGeoBlockModal] = useState(false);
  const [isFromIndia, setIsFromIndia] = useState(false);
  const [countryInfo, setCountryInfo] = useState<{code: string, name: string} | null>(null);
  const [geoLoading, setGeoLoading] = useState(true);
  const [pendingAction, setPendingAction] = useState<null | 'signup' | 'calendly'>(null);
  const [isBookingFlow, setIsBookingFlow] = useState(false);
  const location = useLocation();

  // Set booking flow state when CalendlyModal becomes visible
  useEffect(() => {
    if (calendlyModalVisibility) {
      setIsBookingFlow(true);
    }
  }, [calendlyModalVisibility]);

  // Simple geolocation function using browser APIs only
  const detectUserCountry = async () => {
    try {
      setGeoLoading(true);
      console.log("🌍 Detecting user location using browser APIs...");
      
      // Use fallback method immediately since external APIs have CORS issues
      detectCountryFallback();
      
    } catch (error) {
      console.log("❌ Geolocation failed:", error);
      // Ultimate fallback: assume not from India
      setIsFromIndia(false);
      setCountryInfo({ code: 'US', name: 'United States' });
    } finally {
      setGeoLoading(false);
    }
  };

  // Fallback method using browser timezone and language
  const detectCountryFallback = () => {
    try {
      console.log("🔄 Using fallback country detection...");
      
      // Get timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log("🕐 Timezone detected:", timezone);
      
      // Get language
      const language = navigator.language || navigator.languages?.[0];
      console.log("🗣️ Language detected:", language);
      
      // Simple heuristics for India detection
      let isIndia = false;
      
      // Check timezone
      if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
        isIndia = true;
        console.log("🇮🇳 India detected via timezone");
      }
      
      // Check language
      if (language.startsWith('hi') || language.startsWith('bn') || language.startsWith('te') || 
          language.startsWith('ta') || language.startsWith('gu') || language.startsWith('kn') || 
          language.startsWith('ml') || language.startsWith('pa') || language.startsWith('or')) {
        isIndia = true;
        console.log("🇮🇳 India detected via language");
      }
      
      // Set fallback country info
      setCountryInfo({
        code: isIndia ? 'IN' : 'US', // Default to US if not India
        name: isIndia ? 'India' : 'United States'
      });
      
      setIsFromIndia(isIndia);
      
      if (isIndia) {
        console.log("🇮🇳 Fallback: User likely from India");
      } else {
        console.log("🌎 Fallback: User likely from US (default)");
      }
      
    } catch (error) {
      console.log("❌ Fallback detection failed:", error);
      // Ultimate fallback: assume not from India
      setIsFromIndia(false);
      setCountryInfo({ code: 'US', name: 'United States' });
    }
  };

  // Detect user country on component mount
  useEffect(() => {
    detectUserCountry();
  }, []);

  // Add a simple way to test India detection (for development)
  useEffect(() => {
    // Check for URL parameter to simulate India (for testing)
    const urlParams = new URLSearchParams(window.location.search);
    const testIndia = urlParams.get('test_india');
    
    if (testIndia === 'true') {
      console.log("🧪 Testing: Simulating India location via URL parameter");
      setIsFromIndia(true);
      setCountryInfo({ code: 'IN', name: 'India' });
      setGeoLoading(false);
    }
  }, []);

  // Handle booking attempts for Indian users
  const handleBookingAttempt = () => {
    // Set booking flow state to prevent AI Optimizer notification
    setIsBookingFlow(true);
    
    // If geolocation is still loading, allow booking (fallback behavior)
    if (geoLoading) {
      console.log("⏳ Geolocation still loading, allowing booking");
      return true;
    }
    
    if (isFromIndia) {
      console.log("🚫 Geo-blocking Indian user from booking");
      setPendingAction('calendly');
      setShowGeoBlockModal(true);
      trackUserJourney('geo_block_modal_opened', 'geo_blocking', {
        country: countryInfo?.code || 'unknown',
        blocked_reason: 'india_not_supported'
      });
      return false; // Block the booking
    }
    return true; // Allow booking
  };

  // Handle "provide anyway" action
  const handleProvideAnyway = () => {
    setShowGeoBlockModal(false);
    
    if (pendingAction === 'calendly') {
      setCalendlyModalVisibility(true);
    } else if (pendingAction === 'signup') {
      setSignupFormVisibility(true);
    }
    setPendingAction(null);
    trackUserJourney('geo_block_bypassed', 'geo_blocking', {
      country: countryInfo?.code || 'unknown',
      bypass_reason: 'user_insisted'
    });
  };

  // Close geo block modal
  const closeGeoBlockModal = () => {
    setShowGeoBlockModal(false);
    setIsBookingFlow(false); // Reset booking flow state
    trackUserJourney('geo_block_modal_closed', 'geo_blocking', {
      country: countryInfo?.code || 'unknown',
      action: 'modal_closed'
    });
  };

  // Reset booking flow state when modal is closed
  const handleCalendlyModalClose = () => {
    setIsBookingFlow(false);
  };


  //  useEffect(() => {
  //   const id = window.location.hash.slice(1);
  //   if (!id) return;
  //   const el = document.getElementById(id);
  //   if (el) {
  //     // let layout settle
  //     setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  //   }
  // }, []);
  
  // Capture and store UTM parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    
    // Store UTM parameters from URL in localStorage
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");
    const utmContent = params.get("utm_content");
    const utmTerm = params.get("utm_term");
    
    // Store UTM parameters in localStorage if they exist in URL
    if (utmSource) {
      localStorage.setItem("utm_source", utmSource);
      console.log("Stored utm_source:", utmSource);
    }
    if (utmMedium) {
      localStorage.setItem("utm_medium", utmMedium);
      console.log("Stored utm_medium:", utmMedium);
    }
    if (utmCampaign) {
      localStorage.setItem("utm_campaign", utmCampaign);
      console.log("Stored utm_campaign:", utmCampaign);
    }
    if (utmContent) {
      localStorage.setItem("utm_content", utmContent);
      console.log("Stored utm_content:", utmContent);
    }
    if (utmTerm) {
      localStorage.setItem("utm_term", utmTerm);
      console.log("Stored utm_term:", utmTerm);
    }

    // Generate or retrieve visitor ID
    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("visitor_id", visitorId);
    }

    // Track page visit with UTM if utm_source exists
    if (utmSource) {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.flashfirejobs.com';
      fetch(`${API_BASE_URL}/api/campaigns/track/visit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utmSource,
          visitorId,
          userAgent: navigator.userAgent,
          ipAddress: null, // Will be captured by server
          referrer: document.referrer,
          pageUrl: window.location.href
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("✅ Campaign page visit tracked:", data.data);
          }
        })
        .catch((err) => console.error("Campaign tracking failed:", err));
    }

    // Handle ref parameter (existing logic)
    if (ref) {
      const payload = {
        ref,
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      fetch("https://clients-tracking-backend.onrender.com/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            console.log("UTM Source from ref:", data.utm_source); // ✅ campaigner 
            // Only override if not already set from URL
            if (!localStorage.getItem("utm_source")) {
              localStorage.setItem("utm_source", data.utm_source);
            }
            localStorage.setItem("ref-code", ref);
          } else {
            console.warn("Tracking error:", data.message || data.error);
          }
        })
        .catch((err) => console.error("Tracking failed:", err));
    }
  }, []);
  
  // Smooth-scroll to hash targets when path is '/#section'
  useEffect(() => {
    const tryScrollToHash = () => {
      if (location.hash) {
        const id = location.hash.slice(1);
        const scrollWithRetry = (retries: number) => {
          const el = document.getElementById(id);
          if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
          } else if (retries > 0) {
            requestAnimationFrame(() => scrollWithRetry(retries - 1));
          }
        };
        scrollWithRetry(20);
      } else if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    tryScrollToHash();
  }, [location.pathname, location.hash]);


    // Disabled auto-redirect that opened the signup form after 10 seconds
    // useEffect(() => {
    //   setTimeout(() =>
    //     navigate('/signup')
    //   , 10000);
    // }, []);
    // const location = useLocation();
  
  useEffect(() => {
    // Track page views
    const pageName = location.pathname === '/' ? 'home' : location.pathname.slice(1);
    trackPageView(pageName, location.pathname, {
      page_url: location.pathname,
      page_title: document.title
    });
    
    // Track user journey
    trackUserJourney('page_view', pageName, {
      page_name: pageName,
      page_url: location.pathname
    });
    
    if (location.pathname === '/signup' || location.pathname === '/get-a-demo' || location.pathname === '/get-started-now') {
      
      if (geoLoading) {
        setSignupFormVisibility(true);
        trackUserJourney('signup_modal_opened', 'signup_flow', {
          modal_trigger: 'direct_navigation'
        });
      } else if (isFromIndia) {
        setPendingAction('signup');
        setShowGeoBlockModal(true);
        trackUserJourney('geo_block_modal_opened', 'geo_blocking', {
          country: countryInfo?.code || 'unknown',
          blocked_reason: 'india_not_supported_signup'
        });
      } else {
        setSignupFormVisibility(true);
        trackUserJourney('signup_modal_opened', 'signup_flow', {
          modal_trigger: 'direct_navigation'
        });
      }
    } else if(location.pathname === '/book-free-demo'){
      // Check geolocation before opening booking modal
      if (handleBookingAttempt()) {
        setCalendlyModalVisibility(true);
        trackUserJourney('demo_modal_opened', 'demo_flow', {
          modal_trigger: 'direct_navigation'
        });
      }
    } else {
      setSignupFormVisibility(false);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <CalendlyPreloader />
      <Navigation 
        setSignupFormVisibility={setSignupFormVisibility} 
        setCalendlyModalVisibility={setCalendlyModalVisibility}
        handleBookingAttempt={handleBookingAttempt}
      />
      <Outlet context={{
        signupFormVisibility,
        calendlyModalVisibility, 
        setSignupFormVisibility, 
        setCalendlyModalVisibility,
        handleBookingAttempt
      }} />
      {signupFormVisibility && <SignupForm setCalendlyUser= {setCalendlyUser} setSignupFormVisibility={setSignupFormVisibility} setCalendlyModalVisibility={setCalendlyModalVisibility} />}
      <CalendlyModal user={calendlyUser} setCalendlyModalVisibility={setCalendlyModalVisibility} isVisible={calendlyModalVisibility} onClose={handleCalendlyModalClose}/>      
      <GeoBlockModal 
        isVisible={showGeoBlockModal}
        onClose={closeGeoBlockModal}
        onProvideAnyway={handleProvideAnyway}
      />
      <SalesPopup isBookingFlow={isBookingFlow} />
      <Footer />
    </div>
  );
}

export default App;
