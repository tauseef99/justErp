import React, { useState, useEffect } from "react";
import img1 from "../Assets/images/Buyer_Side.png";
import img2 from "../Assets/images/Seller_Side.png";
import clientandbuyer from "../Assets/images/Happy Buyer-Supplier.jpg"; 
import Navbar from "./Navbar";
import Footer from "./Footer";

const HowJustERPsWorks = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FFA500] opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#708238] opacity-5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header Section */}
      <div
        className={`relative bg-gradient-to-r from-[#708238] to-[#8a9c4a] text-white py-20 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20   rounded-full mb-6 ">
            
          </div>
          <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
            How JustERPs Works
          </h1>
          <p className="text-2xl max-w-3xl mx-auto leading-relaxed">
            For Freelancers (ERP Consultants) & Buyers (The Client)
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        {/* Intro */}
        <div
          className={`bg-white rounded-3xl shadow-2xl p-10 mb-16 transform transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-xl text-gray-700 leading-relaxed text-center">
            JustERPs connects businesses with freelance ERP consultants for
            implementation, customization, training, and troubleshooting.
            Whether you're a freelancer or a buyer, here's how it works:
          </p>
        </div>

        

        {/* For Buyers */}
        <div className="mb-20">
          <h2
            className={`text-5xl font-bold text-[#708238] mb-12 flex items-center justify-center transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <span className="bg-[#708238] text-white p-4 rounded-full mr-5 shadow-lg">
              🔹
            </span>
            For Buyers (The Clients)
          </h2>

          <div className="space-y-8 max-w-4xl mx-auto">
            {buyerSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl border-l-6 border-[#FFA500] p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: `${300 + index * 120}ms` }}
              >
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#FFA500] to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-[#708238] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <div className="text-gray-600 leading-relaxed text-lg">
                      {step.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Large Top Image - img1 */}
        <div className="mb-20">
          <div
            className={`bg-gradient-to-br from-gray-100 to-white rounded-3xl shadow-2xl p-8 transform transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <img
              src={img1}
              alt="Buyer Side Process"
              className="w-full h-auto max-h-[600px] object-contain rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

       

        {/* For Freelancers */}
        <div className="mb-20">
          <h2
            className={`text-5xl font-bold text-[#708238] mb-12 flex items-center justify-center transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <span className="bg-[#708238] text-white p-4 rounded-full mr-5 shadow-lg">
              🔹
            </span>
            For Freelancers
          </h2>

          <div className="space-y-8 max-w-4xl mx-auto">
            {freelancerSteps.map((step, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl border-l-6 border-[#708238] p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${300 + index * 120}ms` }}
              >
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#708238] to-[#8a9c4a] rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-[#FFA500] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <div className="text-gray-600 leading-relaxed text-lg">
                      {step.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
         {/* Large Middle Image - img2 */}
        <div className="mb-20">
          <div
            className={`bg-gradient-to-br from-gray-100 to-white rounded-3xl shadow-2xl p-8 transform transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <img
              src={img2}
              alt="Seller Side Process"
              className="w-full h-auto max-h-[600px] object-contain rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2
            className={`text-5xl font-bold text-[#708238] mb-14 text-center transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            ⚙️ JustERP's Unique Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-200 group ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${200 + index * 120}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFA500] to-orange-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-[#708238] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Large Bottom Image - clientandbuyer */}
        <div className="mb-20">
          <div
            className={`bg-gradient-to-br from-gray-100 to-white rounded-3xl shadow-2xl p-8 transform transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <img
              src={clientandbuyer}
              alt="Happy Buyer & Supplier Collaboration"
              className="w-full h-auto max-h-[700px] object-contain rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Final CTA Section */}
        <div
          className={`bg-gradient-to-r from-[#708238] to-[#8a9c4a] rounded-3xl shadow-2xl p-12 text-center transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h3>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and freelancers who are already using JustERPs to transform their ERP implementation experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#708238] px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Sign Up as Buyer
            </button>
            <button className="bg-[#FFA500] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-orange-500 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Join as Freelancer
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

// Data
const buyerSteps = [
  { 
    title: "Sign Up & Create Your Profile", 
    content: <p>Register with your business email and set up a comprehensive business profile detailing your ERP needs and requirements.</p> 
  },
  { 
    title: "Browse or Post a Project", 
    content: <p>Browse through our curated list of freelance ERP consultants or post your specific project requirements to attract the right talent.</p> 
  },
  { 
    title: "Evaluate & Hire", 
    content: <p>Review freelancer profiles, portfolios, and ratings. Communicate through our secure chat system and hire the best-matched consultant.</p> 
  },
  { 
    title: "Work in Progress", 
    content: <p>Monitor project progress in real-time, receive regular updates, and provide feedback throughout the implementation process.</p> 
  },
  { 
    title: "Approve & Pay", 
    content: <p>Safely release payments through our secure escrow system only after you're completely satisfied with the delivered work.</p> 
  },
];

const freelancerSteps = [
  { 
    title: "Sign Up & Create a Profile", 
    content: <p>Register and build a comprehensive profile showcasing your ERP expertise, skills, portfolio, certifications, and professional experience.</p> 
  },
  { 
    title: "List Services or Browse Projects", 
    content: <p>Create service packages highlighting your specialties or browse and bid on relevant ERP projects posted by businesses worldwide.</p> 
  },
  { 
    title: "Communicate & Get Hired", 
    content: <p>Respond promptly to client inquiries, discuss project scope and requirements in detail, and secure the job with competitive proposals.</p> 
  },
  { 
    title: "Deliver Work", 
    content: <p>Provide high-quality deliverables while maintaining clear communication and regular progress updates to ensure client satisfaction.</p> 
  },
  { 
    title: "Get Paid", 
    content: <p>Receive secure and timely payments through our protected system while building your reputation with client reviews and ratings.</p> 
  },
];

const features = [
  { 
    icon: "🔒", 
    title: "Secure Escrow Payments", 
    description: "Fully protected payment system ensuring both parties are secure with milestone-based releases and dispute protection." 
  },
  { 
    icon: "⚖️", 
    title: "Professional Dispute Resolution", 
    description: "Expert mediation services to resolve conflicts fairly and efficiently, protecting both client and freelancer interests." 
  },
  { 
    icon: "✅", 
    title: "Verified Profiles & Credentials", 
    description: "Thoroughly vetted professionals with verified credentials, work history, and transparent client reviews and ratings." 
  },
  { 
    icon: "💬", 
    title: "Real-Time Communication", 
    description: "Integrated messaging, video calls, and file sharing for seamless communication between clients and freelancers." 
  },
  { 
    icon: "🎯", 
    title: "Custom Project Solutions", 
    description: "Tailored project scoping and flexible engagement models to match specific business requirements and budgets." 
  },
  { 
    icon: "📊", 
    title: "Advanced Progress Tracking", 
    description: "Comprehensive project management tools with milestone tracking, time monitoring, and progress reporting features." 
  },
];

export default HowJustERPsWorks;