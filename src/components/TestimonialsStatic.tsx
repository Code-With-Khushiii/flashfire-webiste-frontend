import React from "react";
import { useEffect, useState } from "react";
import { Linkedin, Mail, Calendar, MessageCircle } from "lucide-react";
import Footer from "./Footer";


const screenshots = [
    "/images/image1.jpg", "/images/image3.jpg", "/images/image4.jpg", "/images/image5.jpg",
    "/images/image6.jpg", "/images/image7.jpg", "/images/image8.jpg", "/images/image9.png",
    "/images/image10.jpg", "/images/image13.png", "/images/image14.jpg", "/images/image15.jpg",
    "/images/image16.png", "/images/image17.png", "/images/image18.jpg", "/images/image19.png",
    "/images/image20.png", "/images/image21.png", "/images/image22.png", "/images/image23.png",
    "/images/image24.png", "/images/image25.png",
];
const teamMembers = [
    {
        name: "Adit Jain",
        role: "Partner",
        image: "https://res.cloudinary.com/drit9nkha/image/upload/v1753688852/Adit_f2qfe8.webp",
        linkedin: "https://www.linkedin.com/in/adit-jain-907555218/",
        description:
            "Former Growth Associate with a background in operations, focused on solving user pain points through scalable, outcome-driven systems.",
    },
    {
        name: "Pranjal Tripathi",
        role: "CTO",
        image: "https://res.cloudinary.com/drit9nkha/image/upload/v1753688852/pran_img_nbwdya.webp",
        linkedin: "https://www.linkedin.com/in/pranjal-tripathi-a98048222/",
        description:
            "AI and automation specialist with 3+ years of experience, leading Flashfire's intelligent job-matching and automation systems.",
    },
];

export default function TestimonialsStatic() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 overflow-hidden py-20 px-6">
            {/* <div className="absolute inset-0 " /> */}

            {/* Content Container */}
            <div className="relative max-w-7xl mx-auto z-10">
                <div className="mb-16">
                    <div
                        className={`transform transition-all duration-1000 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                    >
                        <div className="text-center">
                            <h1 className="text-5xl sm:text-6xl font-bold text-white" style={{ fontFamily: "Pacifico, cursive" }}>
                                Hear It from the People We’ve Helped
                            </h1>

                            {/* Subtitle */}
                            <p className="text-center text-white/90 text-lg sm:text-xl mt-4">What started as individual dreams became shared victories — and we’re proud to have been part of their journey.</p>
                        </div>
                    </div>
                </div>

                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                    {screenshots.map((src, idx) => (
                        <div
                            key={idx}
                            className={`relative overflow-hidden rounded-2xl break-inside-avoid transform transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer group ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            style={{
                                transitionDelay: loaded ? `${idx * 50}ms` : "0ms",
                            }}
                        >
                            {/* Image container */}
                            <div className="relative rounded-2xl overflow-hidden border-4 border-white/80 shadow-lg bg-white/5">
                                <img
                                    src={src || "/placeholder.svg"}
                                    alt={`Happy user testimonial ${idx + 1}`}
                                    className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative z-10  mt-16">
                <div className="bg-white border border-orange-200 mt-10 shadow-xl rounded-3xl p-10 sm:p-16 max-w-6xl mx-auto leading-relaxed">

                    {/* Hero Heading - Bold Letter Style */}
                    <p className="text-gray-900 font-bold text-[1.4rem] leading-snug mb-6">
                        To Every Job Seeker Who’s Ready to Move Forward
                    </p>

                    {/* Story Sections */}
                    <div className="space-y-6 text-gray-700 text-[1.1rem]">
                        <p>
                            I know how exhausting the job search can be. You keep sending out application after application,
                            waiting for replies, and slowly start to wonder if it’s you. Especially in the U.S., where hundreds
                            apply for the same role, even the most talented people begin to lose hope.
                        </p>

                        <p>
                            Flashfire was born from that same feeling. I watched my sister, smart, capable, and hardworking,
                            apply to hundreds of roles and still get no response. It wasn’t her fault. The system had stopped
                            seeing people for who they are.
                        </p>

                        <p className="border-l-4 border-orange-400 pl-4 italic">
                            The problem was never the people. It was the process.
                        </p>

                        <p>
                            That’s when <span className="font-semibold text-orange-600">Pranjal</span> joined me. He had been through
                            the same struggle, preparing hard, clearing rounds, yet still falling short of the offer. Not because he
                            wasn’t good enough, but because the process wasn’t fair. Instead of giving up, he decided to help build a
                            better way forward.
                        </p>

                        <p>
                            Together, we started building Flashfire with belief, empathy, and persistence.
                        </p>

                        <p>
                            What began as a way to help one person is now helping hundreds. Flashfire helps people apply smarter,
                            tell their stories better, and finally hear that long-awaited “yes.”
                        </p>
                    </div>


                    {/* Team Members Grid */}
                    <div className="grid sm:grid-cols-2 gap-12 max-w-4xl mt-10 mx-auto">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center">
                                {/* Profile Image - Square */}
                                <div className="mb-4 inline-block">
                                    <div
                                        className={`w-44 h-44 rounded-2xl overflow-hidden shadow-md border border-gray-200 ${member.name === "Pranjal Tripathi" ? "bg-cover bg-center" : ""
                                            }`}
                                        style={
                                            member.name === "Pranjal Tripathi"
                                                ? {
                                                    backgroundImage: `url(${member.image})`,
                                                    backgroundSize: "120%",
                                                    backgroundPosition: "center",
                                                }
                                                : {}
                                        }
                                    >
                                        {member.name === "Adit Jain" && (
                                            <img
                                                src={member.image || "/placeholder.svg"}
                                                alt={member.name}
                                                className="w-full h-full object-cover object-[center_20%] rounded-2xl"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Member Name + LinkedIn (row), Role below */}
                                <div className="mt-2 flex items-center justify-center gap-2">
                                    <h3 className="text-xl font-bold text-gray-900 text-center">{member.name}</h3>
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${member.name} LinkedIn Profile`}
                                        title="LinkedIn"
                                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E6F0FA] text-[#0A66C2] hover:bg-[#D9EAF7] focus:outline-none focus:ring-2 focus:ring-[#BFD7F2] transition"
                                    >
                                        <Linkedin className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                                <p className="mt-1 text-sm text-gray-600 text-center">{member.role}</p>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
            <section className="mt-10 sm:mt-12 bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-lg w-[85%] sm:w-[70%] lg:w-[60%] min-h-[700px] mx-auto flex flex-col justify-center px-6 sm:px-10 py-14">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <MessageCircle className="w-4 h-4" />
                            <span>Get In Touch</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Ready to Accelerate Your Career?
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            Have questions about FLASHFIRE? Our team is here to help you get started on your journey to landing your dream job.
                        </p>
                    </div>

                    {/* Left: Contact Info + Why Choose */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* White Box */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 h-full">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Get Started Today</h3>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-orange-100 rounded-xl">
                                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-semibold">Email Us</p>
                                        <p className="text-gray-600 text-sm sm:text-base">support@flashfirejobs.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-orange-100 rounded-xl">
                                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-semibold">Book a Demo</p>
                                        <p className="text-gray-600 text-sm sm:text-base">Schedule a free consultation</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Orange Box */}
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 sm:p-8 rounded-2xl text-white shadow-lg h-full 
                            transform transition-transform duration-300 hover:-translate-y-2">
                            <h4 className="text-lg sm:text-xl font-bold mb-4">Why Choose FLASHFIRE?</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl sm:text-3xl font-bold">95%</div>
                                    <div className="text-orange-100 text-xs sm:text-sm">Success Rate</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl sm:text-3xl font-bold">150+</div>
                                    <div className="text-orange-100 text-xs sm:text-sm">Hours Saved</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl sm:text-3xl font-bold">50+</div>
                                    <div className="text-orange-100 text-xs sm:text-sm">Jobs Landed</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl sm:text-3xl font-bold">24/7</div>
                                    <div className="text-orange-100 text-xs sm:text-sm">Help / Support</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </section>

                        
    );
}
