import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Zap, Crown, Rocket, ChevronDown, Linkedin } from "lucide-react"


interface Plan {
  name: string
  icon: React.ReactNode
  applications: string
  price: number
  originalPrice: number
  popular: boolean
  description: string
  paymentLink: string
  features: string[]
  cta: string
  badge?: string;
}

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<"default" | "addons" | "upgrade">("default")
  const [selectedAddon, setSelectedAddon] = useState<number | null>(null)

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const plans: Plan[] = [
    {
      name: "Ignite",
      icon: <Zap className="w-6 h-6" />,
      applications: "250",
      price: 199,
      originalPrice: 299,
      popular: false,
      description: "For senior professionals & executives",
      paymentLink: "https://www.paypal.com/ncp/payment/F6CESAWAYUYU2",
      features: [
        "AI-powered job matching",
        "250 tailored applications",
        "Resume optimization",
        "Basic analytics dashboard",
      ],
      cta: "Start Now",
    },
    {
      name: "Professional",
      icon: <Crown className="w-6 h-6" />,
      applications: "500",
      price: 349,
      originalPrice: 449,
      badge: "Economical",
      popular: false,
      description: "Most popular for mid-level professionals",
      paymentLink: "https://www.paypal.com/ncp/payment/SMTK5UYQYM4A8",
      features: [
        "Everything in Ignite",
        "500 tailored applications",
        "Priority job matching",
        "Advanced analytics & insights",
        "LinkedIn profile optimization",
        "Interview preparation tips",
      ],
      cta: "Start Now",
    },
    {
      name: "Executive",
      icon: <Rocket className="w-6 h-6" />,
      applications: "1200+",
      price: 599,
      originalPrice: 699,
      popular: true,
      // badge: "Best Value",
      description: "Perfect for entry-level professionals",
      paymentLink: "https://www.paypal.com/ncp/payment/CDRFGB6M566X8",
      features: [
        "Everything in Professional",
        "1000+ tailored applications",
        "Executive-level job targeting",
        "Portfolio development",
        "Cover letters",
        "Network introduction requests",
        "Emailing Recruiters",
      ],
      cta: "Start Now",
    },
  ]

  const addonsPricing = {
    Ignite: [
      { label: "+250 Applications", price: 130 },
      { label: "+500 Applications", price: 220 },
      { label: "+1000 Applications", price: 380 },
    ],
    Professional: [
      { label: "+250 Applications", price: 120 },
      { label: "+500 Applications", price: 200 },
      { label: "+1000 Applications", price: 350 },
    ],
    Executive: [
      { label: "+250 Applications", price: 110 },
      { label: "+500 Applications", price: 190 },
      { label: "+1000 Applications", price: 330 },
    ],
  }

  const upgradePaths = [
    {
      from: "Ignite",
      to: "Professional",
      fromPrice: 199,
      toPrice: 349,
      description: "Unlock priority matching and advanced analytics",
    },
    {
      from: "Professional",
      to: "Executive",
      fromPrice: 349,
      toPrice: 599,
      description: "Get executive-level targeting and portfolio tools",
    },
    {
      from: "Ignite",
      to: "Executive",
      fromPrice: 199,
      toPrice: 599,
      description: "Jump to our most comprehensive plan",
    },
  ]
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
  ]


  const handlePayment = (paymentLink: string) => {
    window.open(paymentLink, "_blank")
  }

  const calculateUpgradePrice = (fromPrice: number, toPrice: number) => {
  const difference = toPrice - fromPrice
  const tenPercentOfExisting = fromPrice * 0.1
  const total = difference + tenPercentOfExisting + 0.1
  return Number(total.toFixed(2)) 
}

  const handleExploreMore = (planName: string) => {
    setSelectedPlan(planName)
    setActiveView("addons")
    setSelectedAddon(null)
    setTimeout(() => scrollToSection("addons-section"), 200)
  }

  const handleUpgradePlan = (planName: string) => {
    setSelectedPlan(planName)
    setActiveView("upgrade")
    setTimeout(() => scrollToSection("upgrade-section"), 200)
  }

  const handleCloseView = () => {
    setActiveView("default")
    setSelectedPlan(null)
    setSelectedAddon(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const slideUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 40,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      <section id="pricing" className="scroll-mt-20 mt-4  sm:py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              <span>Limited Time Offer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Choose Your Career Acceleration Plan
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8">
              All plans include our AI-powered job matching and application automation.
              <span className="text-orange-600 font-semibold"> Save 150+ hours monthly</span> while we work for you
              24/7.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${plan.popular
                  ? "border-orange-500 scale-100 lg:scale-105 ring-4 ring-orange-500/20"
                  : "border-gray-200 hover:border-orange-300"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      🏆 Most Popular
                    </span>
                  </div>
                )}

                {plan.badge && !plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      💎 {plan.badge}
                    </span>
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-2 sm:mb-8">
                    <div
                      className={`inline-flex items-center space-x-2 p-3 rounded-2xl mb-4 ${plan.popular ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {plan.icon}
                      <span className="font-semibold">{plan.name}</span>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm sm:text-base">{plan.description}</p>

                    <div className="mb-4">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-3xl sm:text-4xl font-bold text-gray-900">${plan.price}</span>
                        <div className="text-left">
                          <div className="text-gray-400 line-through text-sm">${plan.originalPrice}</div>
                        </div>
                      </div>
                      <p className="text-orange-600 font-semibold text-sm mt-1">
                        {plan.applications} applications included
                      </p>
                      <div className="mt-2 flex justify-center">
                        <span className="bg-orange-50 text-orange-700 border-orange-200 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
                          No fixed timeframe — all applications completed.
                        </span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePayment(plan.paymentLink)}
                    className={`w-full py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-200 ${plan.popular
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl hover:scale-105"
                      : "bg-gray-900 text-white hover:bg-gray-800 hover:scale-105"
                      }`}
                  >
                    {plan.cta}
                  </button>

                  <div className={`grid ${plan.name === "Executive" ? "grid-cols-1" : "grid-cols-2"} gap-2 mt-4`}>
                    <button
                      onClick={() => handleExploreMore(plan.name)}
                      className="py-2 px-3 rounded-lg border border-orange-300 text-orange-600 hover:bg-orange-50 transition-colors text-sm font-medium"
                    >
                      Add More
                    </button>

                    {plan.name !== "Executive" && (
                      <button
                        onClick={() => handleUpgradePlan(plan.name)}
                        className="py-2 px-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Upgrade Plan
                      </button>
                    )}
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-4">Secure payment via PayPal</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Add-ons Section */}
      <AnimatePresence>
        {activeView === "addons" && (
          <motion.section
            id="addons-section"
            className="pt-2 pb-2 sm:pt-6 sm:pb-8 bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="mb-8 flex items-center justify-between"
                variants={slideUpVariants}
                initial="hidden"
                animate="visible"
              >
                {/* <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Add More Applications to {selectedPlan}
                </h3> */}
                <div className="flex-1 text-right">
                  <button onClick={handleCloseView} className="text-gray-500 hover:text-gray-700 justify-end transition-colors">
                    ✕
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 "
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {addonsPricing[selectedPlan!].map((addon, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    onClick={() => setSelectedAddon(index)}
                    className={`relative group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                    ${selectedAddon === index
                        ? "border-orange-500 bg-gradient-to-br from-orange-50 via-white to-red-50 shadow-xl scale-[1.02]"
                        : "border-gray-200 bg-white hover:shadow-lg hover:border-orange-300"
                      }`}
                  >
                    {/* Title */}
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
                      <span className="text-orange-500">⚡</span> {addon.label}
                    </h4>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-3"></div>

                    {/* Price Section */}
                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-4 text-center">
                      <p className="text-gray-700 text-sm font-medium">
                        <span className="font-semibold text-gray-900">Total Price:</span> ${addon.price}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-sm text-center mb-6">
                      Add more applications to enhance your reach and visibility.
                    </p>

                    {/* Select Button */}
                    <button
                      onClick={() => handlePayment(plans.find((p) => p.name === selectedPlan)!.paymentLink)}
                      className={`w-full py-2.5 px-4 rounded-xl font-semibold transition-all duration-200
                        ${selectedAddon === index
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:shadow-lg hover:scale-105"
                          : "bg-gray-100 text-gray-800 hover:bg-orange-50 hover:text-orange-600"
                        }`}
                    >
                      {selectedAddon === index ? "Proceed to Checkout" : "Select Add-on"}
                    </button>
                  </motion.div>

                ))}
              </motion.div>

              {/* {selectedAddon !== null && (
                <motion.div
                  className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Total for {selectedPlan}:</span> $
                    {plans.find((p) => p.name === selectedPlan)!.price +
                      addonsPricing[selectedPlan!][selectedAddon].price}
                  </p>
                  <button
                    onClick={() => handlePayment(plans.find((p) => p.name === selectedPlan)!.paymentLink)}
                    className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-200 hover:scale-105"
                  >
                    Proceed to Checkout
                  </button>
                </motion.div>
              )} */}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Upgrade Section */}
      <AnimatePresence>
        {activeView === "upgrade" && (
          <motion.section
            id="upgrade-section"
            className="pt-2 pb-2 sm:pt-6 sm:pb-8 bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="mb-10 flex flex-col items-center justify-center text-center"
                variants={slideUpVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex justify-between w-full max-w-4xl items-center mb-4">
                  <div className="flex-1"></div>
                  {/* <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 flex-1 text-center">
                    Upgrade from {selectedPlan}
                  </h3> */}
                  <div className="flex-1 text-right">
                    <button onClick={handleCloseView} className="text-gray-500 hover:text-gray-700 transition-colors">
                      ✕
                    </button>
                  </div>
                </div>
              </motion.div>


              <motion.div
                className="flex flex-wrap justify-center items-stretch gap-6 "
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {upgradePaths
                  .filter((path) => path.from === selectedPlan)
                  .map((path, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="w-full sm:w-[360px] md:w-[400px] lg:w-[420px] h-[320px] flex flex-col justify-between p-6 rounded-2xl border-2 border-gray-200 bg-white hover:border-orange-300 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-600">From</p>
                          <p className="text-lg font-bold text-gray-900">{path.from}</p>
                        </div>
                        <ChevronDown className="w-5 h-5 text-gray-400 rotate-90" />
                        <div>
                          <p className="text-sm text-gray-600">To</p>
                          <p className="text-lg font-bold text-orange-600">{path.to}</p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">{path.description}</p>

                      {/* ✅ Only show total upgrade price */}
                      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-4 text-center">
                        <p className="text-gray-700 text-sm font-medium">
                          <span className="font-semibold text-gray-900">Total Upgrade Price:</span> $
                          {calculateUpgradePrice(path.fromPrice, path.toPrice)}
                        </p>
                      </div>

                      <button
                        onClick={() => handlePayment(plans.find((p) => p.name === path.to)!.paymentLink)}
                        className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 hover:scale-105"
                      >
                        Upgrade Now
                      </button>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Risk-Free Guarantee Section */}
      <section className=" mb-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl border-4 border-orange-300 p-6 sm:p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

            <div className="relative z-10">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">100% Risk-Free Guarantee</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">Only jobs you approve.</span> Get 150–200 extra
                    applications completely free if you don't receive interview calls from your initial applications.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
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

          {/* Stylish Divider */}
          {/* <div className="w-24 h-1 bg-orange-400 rounded-full mx-auto my-12"></div> */}

          {/* Team Section */}
          {/* <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Meet the People Behind Flashfire
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
              A team built from real struggles — now building real solutions.
            </p>
          </div> */}

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


      </section >

    </>
  )
}

export default Pricing
