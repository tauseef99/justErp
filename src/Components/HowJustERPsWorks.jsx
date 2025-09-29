import React, { useState, useEffect } from 'react';

const HowJustERPsWorks = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FFA500] opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#708238] opacity-5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header Section */}
      <div className={`relative bg-gradient-to-r from-[#708238] to-[#8a9c4a] text-white py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4 animate-bounce">
            <span className="text-2xl">🛠️</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
            How JustERPs Works Page Under Construction
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            For Freelancers (ERP Consultants) & Buyers (The Client)
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 py-12">
        <div className={`bg-white rounded-2xl shadow-xl p-8 mb-12 transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            JustERPs is not just an ERP software marketplace it also connects
            businesses with freelance ERP consultants who can assist with
            implementation, customization, training, and troubleshooting.
            Whether you're a freelancer looking for work or a buyer looking to
            get ERP services, here's how the process works:
          </p>
        </div>

        {/* For Buyers Section */}
        <div className="mb-16">
          <h2 className={`text-4xl font-bold text-[#708238] mb-8 flex items-center justify-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="bg-[#708238] text-white p-3 rounded-full mr-4 shadow-lg">🔹</span>
            For Buyers (The Clients)
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Steps */}
            <div className="space-y-6">
              {buyerSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-lg border-l-4 border-[#FFA500] p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FFA500] to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#708238] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <div className="text-gray-600 space-y-2 leading-relaxed">
                        {step.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Image Placeholder with Animation */}
            <div className={`sticky top-8 bg-gradient-to-br from-gray-100 to-white rounded-2xl shadow-xl p-8 transform transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="bg-gradient-to-br from-[#708238] to-[#8a9c4a] rounded-xl p-1 mb-6">
                <div className="bg-gray-200 rounded-lg flex items-center justify-center min-h-[400px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-20"></div>
                  <div className="text-center text-gray-500 z-10">
                    <div className="text-6xl mb-4 animate-pulse"></div>
                    <p className="text-xl font-semibold mb-2">1st image place</p>
                    <p className="text-sm"></p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button className="bg-[#FFA500] hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  View Detailed Workflow
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* For Freelancers Section */}
        <div className="mb-16">
          <h2 className={`text-4xl font-bold text-[#708238] mb-8 flex items-center justify-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <span className="bg-[#708238] text-white p-3 rounded-full mr-4 shadow-lg">🔹</span>
            For Freelancers
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Image Placeholder with Animation */}
            <div className={`sticky top-8 bg-gradient-to-br from-gray-100 to-white rounded-2xl shadow-xl p-8 transform transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="bg-gradient-to-br from-[#FFA500] to-orange-400 rounded-xl p-1 mb-6">
                <div className="bg-gray-200 rounded-lg flex items-center justify-center min-h-[400px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-20"></div>
                  <div className="text-center text-gray-500 z-10">
                    <div className="text-6xl mb-4 animate-pulse"></div>
                    <p className="text-xl font-semibold mb-2">2nd image place here</p>
                    <p className="text-sm"></p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button className="bg-[#708238] hover:bg-[#5a6a2d] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  View Detailed Workflow
                </button>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {freelancerSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-lg border-l-4 border-[#708238] p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#708238] to-[#8a9c4a] rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#FFA500] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <div className="text-gray-600 space-y-2 leading-relaxed">
                        {step.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unique Features */}
        <div className="mb-16">
          <h2 className={`text-4xl font-bold text-[#708238] mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            ⚙️ JustERP's Unique Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-gray-200 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFA500] to-orange-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-lg">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#708238] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips for Success */}
        <div className="mb-16">
          <h2 className={`text-4xl font-bold text-[#708238] mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            📌 Tips for Success
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Buyers Tips */}
            <div className={`bg-gradient-to-br from-[#708238] to-[#8a9c4a] rounded-2xl shadow-xl p-8 transform transition-all duration-700 hover:scale-105 group ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">👥</span>
                </div>
                <h3 className="text-2xl font-bold text-white">For Buyers</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start text-white">
                  <span className="text-orange-300 mr-3 text-lg">•</span>
                  <span>Be clear and detailed in your project descriptions</span>
                </li>
                <li className="flex items-start text-white">
                  <span className="text-orange-300 mr-3 text-lg">•</span>
                  <span>Set realistic deadlines and budgets</span>
                </li>
                <li className="flex items-start text-white">
                  <span className="text-orange-300 mr-3 text-lg">•</span>
                  <span>Communicate frequently with your freelancer</span>
                </li>
              </ul>
            </div>

            {/* Freelancers Tips */}
            <div className={`bg-gradient-to-br from-[#FFA500] to-orange-400 rounded-2xl shadow-xl p-8 transform transition-all duration-700 hover:scale-105 group ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">💼</span>
                </div>
                <h3 className="text-2xl font-bold text-white">For Freelancers</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start text-white">
                  <span className="text-[#708238] mr-3 text-lg">•</span>
                  <span>Keep your profile updated and professional</span>
                </li>
                <li className="flex items-start text-white">
                  <span className="text-[#708238] mr-3 text-lg">•</span>
                  <span>Be prompt and polite in communications</span>
                </li>
                <li className="flex items-start text-white">
                  <span className="text-[#708238] mr-3 text-lg">•</span>
                  <span>Meet deadlines and go the extra mile for good reviews</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Need Help & Join Now */}
        <div className={`bg-gradient-to-br from-[#708238] to-[#5a6a2d] text-white rounded-3xl shadow-2xl p-12 mb-8 transform transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-3xl">💬</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Need Help?</h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Our support team is here to assist both freelancers and buyers. 
              Visit our <span className="underline font-semibold text-orange-300 cursor-pointer hover:text-orange-200 transition-colors duration-300">Contact Us</span> page anytime.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">✅ Join Now</h2>
            <div className="flex flex-col lg:flex-row justify-center gap-6">
              <button className="group bg-gradient-to-r from-[#FFA500] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3">
                <span>👉</span>
                <span>Sign Up as a Buyer</span>
              </button>
              <button className="group bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-gray-200 text-[#708238] font-bold py-4 px-10 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3">
                <span>👉</span>
                <span>Sign Up as a Freelancer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced data with icons
const buyerSteps = [
  {
    title: "Sign Up & Create Your Profile",
    content: (
      <ul className="list-none space-y-2">
        <li className="flex items-start">
          <span className="text-[#FFA500] mr-2">✓</span>
          <span>Register with your email or Gmail account</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#FFA500] mr-2">✓</span>
          <span>Set up your profile with business details and project preferences</span>
        </li>
      </ul>
    )
  },
  {
    title: "Browse or Post a Project",
    content: (
      <div className="space-y-3">
        <div className="flex items-start">
          <span className="text-[#FFA500] font-semibold mr-2">A:</span>
          <span>Browse services and packages offered by freelancers</span>
        </div>
        <div className="flex items-start">
          <span className="text-[#FFA500] font-semibold mr-2">B:</span>
          <span>Post custom projects and invite freelancers to bid</span>
        </div>
      </div>
    )
  },
  {
    title: "Evaluate & Hire",
    content: (
      <ul className="list-none space-y-2">
        <li className="flex items-start">
          <span className="text-[#FFA500] mr-2">✓</span>
          <span>Review profiles, ratings, portfolios, and proposals</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#FFA500] mr-2">✓</span>
          <span>Chat directly to discuss project scope</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#FFA500] mr-2">✓</span>
          <span>Hire the best fit with optional escrow protection</span>
        </li>
      </ul>
    )
  },
  {
    title: "Work in Progress",
    content: (
      <ul className="list-none space-y-2">
        <li className="flex items-start">
          <span className="text-[#FFA500] mr-2">✓</span>
          <span>Track progress through the dashboard</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#FFA500] mr-2">✓</span>
          <span>Communicate using built-in chat or video</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#FFA500] mr-2">✓</span>
          <span>Request updates, demos, or partial deliveries</span>
        </li>
      </ul>
    )
  },
  {
    title: "Approve & Pay",
    content: (
      <ul className="list-none space-y-2">
        <li className="flex items-start">
          <span className="text-[#FFA500] mr-2">✓</span>
          <span>Mark work complete when satisfied</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#FFA500] mr-2">✓</span>
          <span>Release payment from escrow</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#FFA500] mr-2">✓</span>
          <span>Leave reviews to help others</span>
        </li>
      </ul>
    )
  }
];

const freelancerSteps = [
  {
    title: "Sign Up & Create a Profile",
    content: (
      <ul className="list-none space-y-2">
        <li className="flex items-start">
          <span className="text-[#708238] mr-2">✓</span>
          <span>Register as a freelancer</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#708238] mr-2">✓</span>
          <span>Add detailed profile with skills, experience, and portfolio</span>
        </li>
      </ul>
    )
  },
  {
    title: "List Services or Browse Projects",
    content: (
      <div className="space-y-3">
        <div className="flex items-start">
          <span className="text-[#708238] font-semibold mr-2">A:</span>
          <span>Create service packages for various needs</span>
        </div>
        <div className="flex items-start">
          <span className="text-[#708238] font-semibold mr-2">B:</span>
          <span>Browse open projects and submit proposals</span>
        </div>
      </div>
    )
  },
  {
    title: "Communicate & Get Hired",
    content: (
      <ul className="list-none space-y-2">
        <li className="flex items-start">
          <span className="text-[#708238] mr-2">✓</span>
          <span>Respond quickly to messages and proposals</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#708238] mr-2">✓</span>
          <span>Clarify project scope, timeline, and budget</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#708238] mr-2">✓</span>
          <span>Get hired and start work on agreed terms</span>
        </li>
      </ul>
    )
  },
  {
    title: "Deliver Work",
    content: (
      <ul className="list-none space-y-2">
        <li className="flex items-start">
          <span className="text-[#708238] mr-2">✓</span>
          <span>Share progress updates regularly</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#708238] mr-2">✓</span>
          <span>Submit deliverables through the platform</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#708238] mr-2">✓</span>
          <span>Be responsive to feedback and changes</span>
        </li>
      </ul>
    )
  },
  {
    title: "Get Paid",
    content: (
      <ul className="list-none space-y-2">
        <li className="flex items-start">
          <span className="text-[#708238] mr-2">✓</span>
          <span>Receive funds after client approval</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#708238] mr-2">✓</span>
          <span>Withdraw to preferred payment method</span>
        </li>
        <li className="flex items-start">
          <span className="text-[#708238] mr-2">✓</span>
          <span>Build reputation with ratings and reviews</span>
        </li>
      </ul>
    )
  }
];

const features = [
  {
    icon: "🔒",
    title: "Secure Escrow Payments",
    description: "Complete protection for both freelancers and buyers with guaranteed payment security."
  },
  {
    icon: "⚖️",
    title: "Dispute Resolution",
    description: "Fair mediation and professional conflict resolution in case of disagreements."
  },
  {
    icon: "✅",
    title: "Verified Profiles & Reviews",
    description: "Build trust with transparent feedback and verified professional profiles."
  },
  {
    icon: "💬",
    title: "Real-Time Communication",
    description: "Stay connected throughout projects with built-in chat, video, and notifications."
  },
  {
    icon: "🎯",
    title: "Custom Offers",
    description: "Tailor proposals and services to meet specific client requirements and needs."
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    description: "Monitor project milestones and deliverables through intuitive dashboards."
  }
];

export default HowJustERPsWorks;