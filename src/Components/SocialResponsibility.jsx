import React, { useState, useEffect } from 'react';

const SocialResponsibility = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [impactCounters, setImpactCounters] = useState({
    projects: 0,
    children: 0,
    communities: 0
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Animate counters
    const animateCounters = () => {
      const targets = { projects: 1250, children: 500, communities: 75 };
      const duration = 2000;
      const steps = 60;
      const stepValues = {};
      
      Object.keys(targets).forEach(key => {
        stepValues[key] = targets[key] / steps;
      });

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setImpactCounters(prev => ({
          projects: Math.min(Math.floor(prev.projects + stepValues.projects), targets.projects),
          children: Math.min(Math.floor(prev.children + stepValues.children), targets.children),
          communities: Math.min(Math.floor(prev.communities + stepValues.communities), targets.communities)
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);
    };

    setTimeout(animateCounters, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Animated Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#FFA500] opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#708238] opacity-5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200 opacity-3 rounded-full blur-3xl animate-bounce delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className={`relative bg-gradient-to-r from-[#708238] to-[#8a9c4a] text-white py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6 animate-bounce">
            <span className="text-3xl">🛠️</span>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
            SOCIAL RESPONSIBILITY page is Under Construction
          </h1>
          <p className="text-2xl font-light mb-6">Work With Purpose. Hire With Heart.</p>
          <div className="w-24 h-1 bg-[#FFA500] mx-auto mb-8"></div>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-90">
            At JustERPs, We're Redefining the Freelance Marketplace
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container mx-auto px-4 py-16">
        <div className={`bg-white rounded-3xl shadow-2xl p-12 mb-16 transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-[#708238] mb-6">
              More Than Just a Marketplace
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              JustERPs is more than a platform connecting businesses with top-tier ERP consultants—it's a catalyst for change. 
              While our consultants deliver exceptional project-based results across SAP, NetSuite, Oracle, and beyond, 
              our mission reaches further: to harness digital transformation as a force for social good.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFA500] to-orange-500 text-white rounded-full font-semibold text-lg">
               Creating Impact Through Technology
            </div>
          </div>
        </div>

        {/* Impact Model Section */}
        <div className="mb-20">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl font-bold text-[#708238] mb-4">The JustERPs Impact Model</h2>
            <div className="w-32 h-1 bg-[#FFA500] mx-auto mb-6"></div>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
              We reinvest <span className="text-[#FFA500] font-bold text-3xl">5% of every transaction</span> into high-impact, community-driven initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {impactInitiatives.map((initiative, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFA500] to-orange-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <span className="text-2xl text-white">{initiative.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-[#708238] text-center mb-4 group-hover:text-[#FFA500] transition-colors duration-300">
                  {initiative.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {initiative.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Real World Impact Section */}
        <div className="mb-20">
          <div className={`bg-gradient-to-r from-[#708238] to-[#8a9c4a] rounded-3xl shadow-2xl p-12 mb-12 transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-4xl font-bold text-white text-center mb-8">
              How Your Consulting Work Creates Real-World Impact
            </h2>
            <p className="text-xl text-white text-center mb-12 opacity-90 max-w-4xl mx-auto">
              Every hour worked on JustERPs fuels tangible social outcomes
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {impactExamples.map((example, index) => (
                <div 
                  key={index}
                  className={`bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 border border-white border-opacity-30 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                >
                  <div className="text-4xl mb-4 text-center">{example.icon}</div>
                  <h3 className="text-xl font-semibold text-white text-center mb-4">
                    {example.scenario}
                  </h3>
                  <p className="text-white text-center opacity-90 leading-relaxed">
                    {example.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Dashboard Section */}
        <div className="mb-20">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-[#708238] mb-4">Transparent, Trackable Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our real-time impact dashboard gives every member full visibility into the difference they're making
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Dashboard Features */}
            <div className="space-y-6">
              {dashboardFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-500 hover:scale-105 group ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FFA500] to-orange-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-lg">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#708238] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Stats */}
            <div className={`bg-gradient-to-br from-[#FFA500] to-orange-500 rounded-3xl shadow-2xl p-8 transform transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">Live Impact Tracker</h3>
                <p className="text-white opacity-90">Real-time contributions making a difference</p>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "Projects Completed", value: impactCounters.projects, suffix: "+" },
                  { label: "Children Supported", value: impactCounters.children, suffix: "+" },
                  { label: "Communities Impacted", value: impactCounters.communities, suffix: "+" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-white opacity-90 font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Founder Quote */}
        <div className={`bg-white rounded-3xl shadow-2xl p-12 mb-16 transform transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-6xl mb-4">💬</div>
            <blockquote className="text-2xl italic text-gray-700 mb-6 leading-relaxed">
              "Unlike traditional freelancing platforms that take commissions, we turn them into life-changing opportunities. We don't just optimize business systems—we optimize human potential."
            </blockquote>
            <div className="w-24 h-1 bg-[#FFA500] mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-[#708238]"> JustERPs Founder</p>
          </div>
        </div>

        {/* Dual Impact Section */}
        <div className="mb-16">
          <h2 className={`text-5xl font-bold text-[#708238] text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Dual Impact. Shared Purpose.
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* For Consultants */}
            <div className={`bg-gradient-to-br from-[#708238] to-[#8a9c4a] rounded-3xl shadow-2xl p-10 transform transition-all duration-700 hover:scale-105 group ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white"> 👨‍💻</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">For Consultants</h3>
              </div>
              <p className="text-xl text-white text-center leading-relaxed opacity-90">
                Your expertise does more than solve complex ERP challenges it changes lives. Every project you complete creates ripple effects of positive change in communities worldwide.
              </p>
            </div>

            {/* For Clients */}
            <div className={`bg-gradient-to-br from-[#FFA500] to-orange-500 rounded-3xl shadow-2xl p-10 transform transition-all duration-700 hover:scale-105 group ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">👨‍💼</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">For Clients</h3>
              </div>
              <p className="text-xl text-white text-center leading-relaxed opacity-90">
                Every project improvement now powers human development on a global scale. Your business growth directly contributes to meaningful social transformation.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className={`bg-gradient-to-r from-[#708238] to-[#5a6a2d] text-white rounded-3xl shadow-2xl p-16 transform transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Be part of a community that believes in using technology to create a better world. 
              Your skills and projects can drive real change.
            </p>
            
            <div className="flex flex-col lg:flex-row justify-center gap-6">
              <button className="group bg-gradient-to-r from-[#FFA500] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-5 px-12 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 text-lg">
                <span></span>
                <span>Register as ERP Consultant</span>
              </button>
              <button className="group bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-gray-200 text-[#708238] font-bold py-5 px-12 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 text-lg">
                <span></span>
                <span>Hire ERP Consultant</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Data for impact initiatives
const impactInitiatives = [
  {
    icon: "🍎",
    title: "Child Nutrition",
    description: "Delivering daily meals to malnourished children in underserved communities worldwide."
  },
  {
    icon: "🎓",
    title: "Vocational Training",
    description: "Equipping unemployed parents with in-demand skills for sustainable employment."
  },
  {
    icon: "📚",
    title: "Education Initiatives",
    description: "Providing books, uniforms, and digital access to underserved students."
  },
  {
    icon: "🌍",
    title: "Community Development",
    description: "Improving infrastructure and facilities in marginalized areas globally."
  }
];

// Data for impact examples
const impactExamples = [
  {
    icon: "",
    scenario: "40 Hours of SAP Consulting",
    impact: "Funds a child's school meals for an entire month"
  },
  {
    icon: "",
    scenario: "NetSuite Implementation",
    impact: "Supports a women's entrepreneurship workshop"
  },
  {
    icon: "",
    scenario: "Long-term Engagements",
    impact: "Finances entire classroom renovations in needy communities"
  }
];

// Data for dashboard features
const dashboardFeatures = [
  {
    icon: "📊",
    title: "Track Contributions",
    description: "Monitor your impact by project, consultant, or timeframe"
  },
  {
    icon: "🗺️",
    title: "Regional Impact",
    description: "View aid distribution and results across different regions"
  },
  {
    icon: "📖",
    title: "Personal Stories",
    description: "Read inspiring stories from the lives you've helped transform"
  },
  {
    icon: "📈",
    title: "Impact Analytics",
    description: "Detailed reports on the social return of your investments"
  }
];

export default SocialResponsibility;