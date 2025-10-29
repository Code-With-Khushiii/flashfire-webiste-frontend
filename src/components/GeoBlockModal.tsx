import React, { useEffect } from "react";
import { X, Globe, MapPin, Calendar } from "lucide-react";

interface GeoBlockModalProps {
  isVisible: boolean;
  onClose: () => void;
  onProvideAnyway: () => void;
}

const GeoBlockModal: React.FC<GeoBlockModalProps> = ({
  isVisible,
  onClose,
  onProvideAnyway,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div 
        className="relative bg-white max-w-md w-full mx-4 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition p-1 z-10 bg-white/80 hover:bg-white rounded-full shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        {/* <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Service Area Notice</h2>
              <p className="text-orange-100 text-sm">We're expanding globally!</p>
            </div>
          </div>
        </div> */}

        {/* Content */}
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Our services are currently limited to the USA.
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            We’re working hard to expand access worldwide. Stay tuned for updates
            on our global availability!
          </p>
            
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
              <p className="text-orange-800 text-sm font-medium">
                🚀 Coming soon to India!
              </p>
            </div>

          {/* Buttons */}
          <div className="space-y-3">
            {/* <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              I’ll Wait for Launch
            </button> */}

            {/* <button
              onClick={onProvideAnyway}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Try Anyway
            </button> */}
          </div>

          {/* Footer */}
          <p className="mt-6 text-xs text-gray-500 border-t border-gray-100 pt-4">
            For questions about our expansion, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeoBlockModal;
