import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { InlineWidget } from 'react-calendly';
import { loadFormData, saveFormData, clearFormData, FormData } from '../utils/LocalStorageUtils';



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SignupModal = ({setCalendlyUser }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    countryCode: '+1',
    email: '',
    workAuthorization: ''
  });

  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedData = loadFormData();
    setFormData(savedData);
  }, []);


  (window as any).openSignupModal = (customStep = 1) => {
  const modal = document.getElementById('signup-modal');
  if (modal) {
    modal.classList.remove('hidden');
    setStep(customStep);
  }
};


  const countryCodes = [
    { code: '+1', country: 'USA', pattern: /^1/ },
    { code: '+91', country: 'India', pattern: /^91/ }
  ];

  const closeModal = () => {
    const modal = document.getElementById('signup-modal');
    if (modal) modal.classList.add('hidden');
    setStep(1);
    // Don't clear form data on close - keep it for next time
  };

  async function SaveDetailsToDB() {
    try {
        let reqToServer = await fetch(`${API_BASE_URL}`, { //https://api.flashfirejobs.com/
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({name : formData?.fullName,
                                                    email: formData?.email,
                                                    mobile:formData?.countryCode + formData.phone,
                                                    workAuthorization: formData.workAuthorization})
                            })
                            console.log(formData.countryCode + formData.phone);
        let responseFromServer = await reqToServer?.json();
        console.log("Response from server:", responseFromServer);
      
    } catch (error) {
      console.log(error)
    }

    
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setStep(2);
    if (
      formData.fullName &&
      formData.phone &&
      formData.email &&
      formData.workAuthorization &&
      formData.phone.length === 10
    ) {
      await SaveDetailsToDB();
      // Clear form data after successful submission
      clearFormData();
    }
  } catch (error) {
    console.log('Error during form submission:', error);
    // Optionally, show an error message to the user here
  }
};


  const detectCountryFromPhone = (phoneNumber: string) => {
    for (const country of countryCodes) {
      if (country.pattern && country.pattern.test(phoneNumber)) {
        return country.code;
      }
    }
    return '+1';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newFormData: FormData;
    
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        newFormData = {
          ...formData,
          [name]: numericValue,
          // countryCode: detectedCountry
        };
      } else {
        return; // Don't update if phone number is too long
      }
    } else {
      newFormData = { ...formData, [name]: value };
    }
    
    setFormData(newFormData);
    // Save to localStorage on every change
    saveFormData(newFormData);
  };

  const goBack = () => {
    setStep(1);
  };

  return (
    <div id="signup-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center w-full">
  <div className={`bg-white w-full ${step === 1 ? 'max-w-md' : 'max-w-5xl'} mx-4 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300`}>
    {step === 1 ? (
      <div className="p-6 w-full">
        <div className="flex justify-between items-start mb-6 w-full">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started for Free</h2>
            <p className="text-gray-600 text-sm">Tell us about yourself to schedule your consultation</p>
          </div>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" /> Full Name
            </label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleInputChange} 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              placeholder="Enter your full name" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" /> Phone Number (10 digits only)
            </label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <select 
                name="countryCode" 
                value={formData.countryCode} 
                onChange={handleInputChange} 
                className="w-full sm:w-auto px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} ({country.country})
                  </option>
                ))}
              </select>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                placeholder="Enter 10-digit phone number" 
                pattern="[0-9]{10}" 
                inputMode="numeric" 
                maxLength={10} 
                required 
              />
            </div>
            {formData.phone && formData.phone.length !== 10 && (
              <p className="text-red-500 text-sm mt-1">Phone number must be exactly 10 digits</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" /> Email Address
            </label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              placeholder="Enter your email address" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are you authorized to work in USA?
            </label>
            <select 
              name="workAuthorization" 
              value={formData.workAuthorization} 
              onChange={handleInputChange} 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              required
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={formData.phone.length !== 10} 
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">No spam, ever. We respect your privacy.</p>
      </div>
        ) : (
          <div className="relative h-full w-full">
            {/* Close button - fixed position */}
            <button onClick={closeModal} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-600 transition-colors z-20 bg-white/90 rounded-full p-2 shadow-lg">
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Back button */}
            <button onClick={goBack} className="absolute top-4 left-4 sm:top-6 sm:left-6 text-gray-400 hover:text-gray-600 transition-colors z-20 bg-white/90 rounded-full p-2 shadow-lg">
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Mobile Layout: Full Screen Optimized */}
            <div className="block lg:hidden h-full">
              {/* Ultra Compact Header for All Mobile Sizes */}
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 sm:p-4 text-white relative overflow-hidden">
                <div className="relative z-10 pt-10 pb-1">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold">Schedule Your Flashfire Consultation</h2>
                      <p className="text-orange-100 text-xs sm:text-sm">30 Minutes • Free</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Section - Maximum Available Height */}
              <div className="bg-white overflow-hidden" style={{ height: 'calc(100vh - 100px)' }}>
                <InlineWidget
                   url='https://calendly.com/feedback-flashfire/30min'
// 'https://calendly.com/biswajitshrm6/meet-with-me' //'https://calendly.com/adit-jain606/30min'   //"https://calendly.com/tripathipranjal01/flashfire"
                  prefill={{
                    name: formData.fullName,
                    email: formData.email
                  }}
                  styles={{
                    height: '100%',
                    width: '100%',
                    minHeight: '400px'
                  }}
                  pageSettings={{
                    backgroundColor: 'ffffff',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: 'f97316',
                    textColor: '374151'
                  }}
                />
              </div>
            </div>

            {/* Desktop Layout: Side by Side */}
            <div className="hidden lg:grid lg:grid-cols-5 h-full">
              {/* Information Section - 2 columns */}
              <div className="lg:col-span-2 bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white relative overflow-hidden">
                <div className="relative z-10 h-full overflow-y-auto pt-12">
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Calendar className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Schedule Your Flashfire Consultation</h2>
                        <p className="text-orange-100">30 Minutes • Free</p>
                      </div>
                    </div>
                    <p className="text-orange-100 text-lg leading-relaxed">
                      Book your personalized consultation to learn how Flashfire can automate your job search and land interviews faster.
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h3 className="text-xl font-bold mb-4">What You'll Get:</h3>

                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Personalized Strategy</h4>
                        <p className="text-orange-100 text-sm">Custom job search plan tailored to your goals</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Resume Review</h4>
                        <p className="text-orange-100 text-sm">Expert feedback on your current resume</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">AI Demo</h4>
                        <p className="text-orange-100 text-sm">See our automation technology in action</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Q&A Session</h4>
                        <p className="text-orange-100 text-sm">Get all your questions answered by experts</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">95%</div>
                        <div className="text-orange-100 text-xs">Success Rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">10K+</div>
                        <div className="text-orange-100 text-xs">Jobs Landed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">220+</div>
                        <div className="text-orange-100 text-xs">Hours Saved</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Section - 3 columns */}
              <div className="lg:col-span-3 bg-white">
                <InlineWidget
                  url='https://calendly.com/feedback-flashfire/30min'  //'https://calendly.com/adit-jain606/30min' //"https://calendly.com/tripathipranjal01/flashfire"
                  prefill={{
                    name: formData.fullName,
                    email: formData.email
                  }}
                  styles={{
                    height: '100%',
                    width: '100%'
                  }}
                  pageSettings={{
                    backgroundColor: 'ffffff',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: 'f97316',
                    textColor: '374151'
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
