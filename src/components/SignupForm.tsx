import { useState, useEffect } from 'react';
import { X, User, Phone, Mail} from 'lucide-react';
import { createOrUpdateContact, trackSignupEvent, waitForCRMLoad } from '../utils/CRMTracking';
import { useNavigate } from 'react-router-dom';
import { loadFormData, saveFormData, clearFormData, FormData } from '../utils/LocalStorageUtils';
import { 
  trackFormStart, 
  trackFormFieldFocus, 
  trackFormSubmit, 
  trackFormError,
  trackModalClose,
  trackConversion 
} from '../utils/PostHogTracking.ts';
import { navigateWithUTM } from '../utils/UTMUtils';

interface SignupFormProps {
  setSignupFormVisibility: (visible: boolean) => void;
  setCalendlyModalVisibility: (visible: boolean) => void;
  setCalendlyUser: (user: any) => void;
}

function SignupForm({ setSignupFormVisibility, setCalendlyModalVisibility, setCalendlyUser }: SignupFormProps) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    countryCode: '+1',
    email: '',
    workAuthorization: ''
  });
  const navigate = useNavigate();

  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedData = loadFormData();
    setFormData(savedData);
  }, []);

  const countryCodes = [
    { code: '+1', country: 'USA', pattern: /^1/ },
    { code: '+91', country: 'India', pattern: /^91/ }
  ];

  const closeModal = () => {
    console.log('Modal closed');
    
    
    // Track modal close
    trackModalClose("signup_form", "button", {
      form_name: "signup_form",
      close_method: "close_button"
    });
    
//     if (window.history.length > 1) {
//   window.history.back();
// } else {
  if(formData){
    const STORAGE_KEY = 'flashfire_signup_form_data';

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
  setSignupFormVisibility(false);
  navigate('/');
// }
    // Don't clear form data on close - keep it for next time
    // setSignupFormVisibility(false);
    // setCalendlyModalVisibility(true);


    
  };

  async function SaveDetailsToDB() {
    try {
      // Track form submission start
      trackFormSubmit("signup_form", {
        form_name: "signup_form",
        form_step: "submission",
        user_email: formData.email,
        user_name: formData.fullName
      });
      
      let reqToServer = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          mobile: formData.countryCode + formData.phone,
          workAuthorization: formData.workAuthorization
        })
      });
      console.log(formData.countryCode + formData.phone);
      let responseFromServer = await reqToServer.json();
      console.log("Response from server:", responseFromServer);
      if(responseFromServer?.message.length > 0) {
        // Track successful conversion
        trackConversion("signup_form_submission", 1, {
          conversion_type: "signup_form",
          user_email: formData.email,
          user_name: formData.fullName,
          work_authorization: formData.workAuthorization
        });
        
        // Wait for CRM to load and then track the contact
        await waitForCRMLoad();
        
        // Create/update contact in CRM
        const [firstName, ...lastNameParts] = formData.fullName.split(' ');
        const lastName = lastNameParts.join(' ') || '';
        
        createOrUpdateContact({
          firstName,
          lastName,
          email: formData.email,
          phone: formData.countryCode + formData.phone,
          workAuthorization: formData.workAuthorization,
          source: 'Signup Form'
        });
        
        // Track signup event
        trackSignupEvent(formData.email, 'Signup Form');
        
        // Clear form data after successful submission
        clearFormData();
        
        setSignupFormVisibility(false);
      }
    } catch (error) {
      console.log(error);
      // Track form error
      trackFormError("signup_form", error instanceof Error ? error.message : 'Unknown error', "form_submission", {
        error_type: "api_error",
        form_name: "signup_form"
      });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form start when user begins interaction
    trackFormStart("signup_form", "initial", {
      form_name: "signup_form",
      form_step: "form_interaction"
    });
    
    setCalendlyUser(formData);
    navigateWithUTM('/book-free-demo', navigate);

    // setCalendlyModalVisibility(true);
    try {
      if (
        formData.fullName &&
        formData.phone &&
        formData.email &&
        formData.phone.length === 10
      ) {
        await SaveDetailsToDB();
      }
    } catch (error) {
      console.log('Error during form submission:', error);
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
          [name]: numericValue
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

  return (
    <div  className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center w-full">
      <div className="bg-white w-fit mx-4 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
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

          <form onSubmit={handleSubmit}  name="signupform" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" /> Full Name
              </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onFocus={() => trackFormFieldFocus("signup_form", "fullName", {
                    field_name: "fullName",
                    form_name: "signup_form"
                  })}
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
                  onFocus={() => trackFormFieldFocus("signup_form", "phone", {
                    field_name: "phone",
                    form_name: "signup_form"
                  })}
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
                onFocus={() => trackFormFieldFocus("signup_form", "email", {
                  field_name: "email",
                  form_name: "signup_form"
                })}
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
                onFocus={() => trackFormFieldFocus("signup_form", "workAuthorization", {
                  field_name: "workAuthorization",
                  form_name: "signup_form"
                })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                
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
      </div>
    </div>
  );
}

export default SignupForm;

