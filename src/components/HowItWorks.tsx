
import React from 'react';
import { Linkedin, FileText, Rocket, Phone } from 'lucide-react';
import {GTagUTM} from '../utils/GTagUTM.ts';
import { useNavigate } from 'react-router-dom';


const HowItWorks = ({setSignupFormVisibility}) => {
  const navigate = useNavigate();
  const steps = [
     {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Resume Tailoring",
      description: "Your resume is customized for each role with role-specific keywords and formatting recruiters love.",
      step: "Step 1"
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Resume Tailoring",
      description: "Your resume is customized for each role with role-specific keywords and formatting recruiters love.",
      step: "Step 1"
    },
    {
      icon: <Linkedin className="w-8 h-8 text-orange-600" />,
      title: "LinkedIn Optimization",
      description: "We rewrite your LinkedIn to stand out in U.S. recruiter searches, using AI-powered keyword matching.",
      step: "Step 2"
    },
    {
      icon: <Rocket className="w-8 h-8 text-purple-600" />,
      title: "Smart Job Applications",
      description: "We apply to 1000+ curated jobs that match your goals, location, and visa needs — no spam, just precision.",
      step: "Step 3"
    },
    {
      icon: <Phone className="w-8 h-8 text-red-600" />,
      title: "Get Interview Calls",
      description: "Start receiving interview invites as we track and optimize every application. You focus on prep, we handle the hustle.",
      step: "Step 4"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Rocket className="w-4 h-4" />
            <span>See How Flashfire Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Your Path to Success in 4 Simple Steps
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven process that gets you hired while you save{' '}
            <span className="text-orange-600 font-semibold">150+ hours every month</span>
          </p>
        </div>

        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:flex items-center justify-between mb-16">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg">
                    {index + 1}
                  </div>
                  <span className="text-sm text-orange-600 font-medium">{step.step}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 bg-gradient-to-r from-orange-300 to-orange-400 mx-4 rounded-full"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 hover:-translate-y-2"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-orange-50 transition-colors duration-300">
                    {step.icon}
                  </div>
                  {/* <div className="ml-4">
                    <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {step.step}
                    </span>
                  </div> */}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="mt-5 sm:mt-20 text-center">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Start Your Success Journey?
            </h3>
            <p className="text-orange-100 mb-6 sm:mb-8 text-lg sm:text-xl max-w-2xl mx-auto">
              Join thousands of professionals who've accelerated their careers with Flashfire's proven 4-step process.
            </p>
            <button
              onClick={() => {
                                GTagUTM({
                                  eventName: 'sign_up_click',
                                  label: 'Hero_Start_Free_Trial_Button',
                                  utmParams: {
                                    utm_source: 'WEBSITE',
                                    utm_medium: 'Website_HowItWorks_section',
                                    utm_campaign: 'Website',
                                  },
                                });
                                navigate('/signup');
                                // setSignupFormVisibility(true);
                              }}
              className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:scale-105"
            >
              Start Free Trial
            </button>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default HowItWorks;
