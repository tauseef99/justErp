import React, { useState, useEffect } from "react";
import { FaStar, FaTimes, FaHeart, FaShoppingCart, FaMapMarkerAlt, FaCalendar, FaClock, FaGraduationCap, FaCertificate, FaLanguage } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCard = ({ item, onClick }) => (
  <div 
    className="min-w-[260px] max-w-[260px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
    onClick={() => onClick(item)}
  >
    <div className="relative">
      <img 
        src={item.img} 
        alt={item.title} 
        className="w-full h-44 object-cover"
        onError={(e) => {
          e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
        }}
      />
      <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-200">
        <FaHeart className="text-gray-600 hover:text-[#FFA500]" />
      </button>
    </div>
    
    <div className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2 hover:text-[#708238] transition-colors duration-200">
            {item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 font-medium">{item.provider}</p>
          {item.level && (
            <span className="inline-block bg-[#708238]/15 text-[#708238] text-xs font-semibold px-3 py-1 rounded-full">
              {item.level}
            </span>
          )}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[#FFA500]">${item.price}</p>
          <p className="text-xs text-gray-500">starting</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center text-[#FFA500]">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={i < Math.floor(item.rating) ? "text-[#FFA500]" : "text-gray-300"} />
          ))}
          <span className="text-gray-600 ml-2 text-sm font-medium">({item.reviews})</span>
        </div>
        <div className="bg-[#708238] text-white text-xs font-semibold px-3 py-1 rounded-full">
          Contact Now
        </div>
      </div>
    </div>
  </div>
);

const GigModal = ({ gig, onClose }) => {
  if (!gig) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-6xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-4">
            <img 
              src={gig.img} 
              alt={gig.provider}
              className="w-16 h-16 rounded-full object-cover border-4 border-[#708238]/20 shadow-lg"
              onError={(e) => {
                e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
              }}
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{gig.provider}</h3>
              <p className="text-lg text-[#708238] font-semibold">{gig.level}</p>
              <div className="flex items-center mt-1">
                <div className="flex text-[#FFA500] mr-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} className={i < Math.floor(gig.rating) ? "text-[#FFA500]" : "text-gray-300"} size={16} />
                  ))}
                </div>
                <span className="text-gray-600">({gig.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-3 rounded-full hover:bg-gray-100"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Seller Profile & Basic Info */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Professional Summary */}
              {gig.professionalSummary && (
                <div className="bg-gradient-to-r from-[#708238]/5 to-[#FFA500]/5 rounded-2xl p-6 border border-[#708238]/10">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-[#708238] rounded-full mr-3"></span>
                    Professional Summary
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{gig.professionalSummary}</p>
                </div>
              )}

              {/* About Section */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-[#708238] rounded-full mr-3"></span>
                  About
                </h3>
                <p className="text-gray-700 mb-6">{gig.description || "Experienced professional offering comprehensive services."}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {gig.location && (
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-3 text-[#708238] text-lg" />
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{gig.location}</span>
                    </div>
                  )}
                  {gig.memberSince && (
                    <div className="flex items-center text-gray-600">
                      <FaCalendar className="mr-3 text-[#708238] text-lg" />
                      <span className="font-medium">Member Since:</span>
                      <span className="ml-2">{new Date(gig.memberSince).getFullYear()}</span>
                    </div>
                  )}
                  {gig.avgResponseTime && (
                    <div className="flex items-center text-gray-600">
                      <FaClock className="mr-3 text-[#708238] text-lg" />
                      <span className="font-medium">Avg Response:</span>
                      <span className="ml-2">{gig.avgResponseTime}</span>
                    </div>
                  )}
                  {gig.lastDelivery && (
                    <div className="flex items-center text-gray-600">
                      <FaShoppingCart className="mr-3 text-[#708238] text-lg" />
                      <span className="font-medium">Last Delivery:</span>
                      <span className="ml-2">{gig.lastDelivery}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Experience & Roles */}
              <div className="space-y-6">
                {/* Functional Roles */}
                {gig.functionalRoles && gig.functionalRoles.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-2 h-6 bg-[#708238] rounded-full mr-3"></span>
                      Functional Role
                    </h3>
                    <div className="space-y-4">
                      {gig.functionalRoles.map((role, index) => (
                        <div key={index} className="border-l-4 border-[#708238] pl-4 py-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-800">{role.role}</h4>
                              <p className="text-gray-600 text-sm">{role.responsibility}</p>
                              <p className="text-gray-500 text-xs mt-1">{role.industry} • Team: {role.teamSize}</p>
                            </div>
                            <span className="bg-[#708238]/10 text-[#708238] px-2 py-1 rounded-full text-xs font-medium">
                              {role.year}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Roles */}
                {gig.technicalRoles && gig.technicalRoles.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-2 h-6 bg-[#FFA500] rounded-full mr-3"></span>
                      Technical Role
                    </h3>
                    <div className="space-y-4">
                      {gig.technicalRoles.map((role, index) => (
                        <div key={index} className="border-l-4 border-[#FFA500] pl-4 py-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-800">{role.role}</h4>
                              <p className="text-gray-600 text-sm">{role.responsibility}</p>
                              <p className="text-gray-500 text-xs mt-1">{role.industry} • Team: {role.teamSize}</p>
                            </div>
                            <span className="bg-[#FFA500]/10 text-[#FFA500] px-2 py-1 rounded-full text-xs font-medium">
                              {role.year}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Projects */}
              {gig.projects && gig.projects.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-purple-500 rounded-full mr-3"></span>
                    Key Projects
                  </h3>
                  <div className="grid gap-4">
                    {gig.projects.map((project, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">{project.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                          <span><strong>Industry:</strong> {project.industry}</span>
                          <span><strong>Role:</strong> {project.role}</span>
                          <span><strong>Team Size:</strong> {project.teamSize}</span>
                          <span><strong>Activities:</strong> {project.activities}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Skills */}
              {gig.technicalSkills && gig.technicalSkills.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {gig.technicalSkills.map((skill, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {gig.certifications && gig.certifications.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaCertificate className="mr-3 text-green-500 text-xl" />
                    Certifications
                  </h3>
                  <div className="space-y-3">
                    {gig.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-800">{cert.name}</h4>
                          <p className="text-gray-600 text-sm">{cert.issuer} • {cert.year}</p>
                          {cert.validity && <p className="text-gray-500 text-xs">Valid until: {cert.validity}</p>}
                        </div>
                        {cert.certificateFile && (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            Certified
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Services & Contact */}
            <div className="space-y-6">
              
              {/* Services Offered */}
              {gig.servicesOffered && gig.servicesOffered.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-6 bg-[#708238] rounded-full mr-3"></span>
                    Services Offered
                  </h3>
                  <ul className="space-y-3">
                    {gig.servicesOffered.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#708238] mr-3 mt-1 text-lg">✓</span>
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              {gig.languages && gig.languages.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaLanguage className="mr-3 text-purple-500 text-xl" />
                    Languages
                  </h3>
                  <div className="space-y-2">
                    {gig.languages.map((lang, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{lang.language}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          lang.proficiency === 'Native' ? 'bg-purple-100 text-purple-700' :
                          lang.proficiency === 'Fluent' ? 'bg-green-100 text-green-700' :
                          lang.proficiency === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {lang.proficiency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact & Pricing */}
              <div className="bg-gradient-to-br from-[#708238]/10 to-[#FFA500]/10 rounded-2xl p-6 border border-[#708238]/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">${gig.price}</h3>
                  <p className="text-gray-600">Starting price</p>
                  <p className="text-gray-500 text-sm mt-1">Delivery: {gig.delivery}</p>
                </div>

                <button className="w-full bg-[#708238] hover:bg-[#5a6a2d] text-white font-bold py-3 rounded-lg transition-all duration-300 mb-4 flex items-center justify-center shadow-lg hover:shadow-xl">
                  <FaShoppingCart className="mr-2" />
                  Start Project (${gig.price})
                </button>

                <button className="w-full border-2 border-[#708238] text-[#708238] hover:bg-[#708238] hover:text-white font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center">
                  Contact Me
                </button>

                <div className="text-center mt-4">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <FaClock className="mr-1" /> {gig.avgResponseTime || '< 1 hour'} response
                    </span>
                    <span>•</span>
                    <span>100% Satisfaction</span>
                  </div>
                </div>
              </div>

              {/* Specializations */}
              {gig.specializations && gig.specializations.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaGraduationCap className="mr-3 text-orange-500 text-xl" />
                    Specializations
                  </h3>
                  <div className="space-y-3">
                    {gig.specializations.map((spec, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-gray-800 mb-2">{spec.category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {spec.items.map((item, itemIndex) => (
                            <span key={itemIndex} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BuyerDashboard() {
  const [selectedGig, setSelectedGig] = useState(null);
  const [userName, setUserName] = useState("");
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all seller profiles
 // In BuyerDashboard useEffect
const fetchSellers = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    // Use the detailed profiles endpoint
    const response = await fetch('http://localhost:5000/api/seller/profile/all', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch sellers');
    }

    const data = await response.json();
    setSellers(data);
    setError(null);
  } catch (err) {
    console.error('Error fetching sellers:', err);
    setError('Failed to load seller profiles');
    setSellers(getFallbackSellers());
  } finally {
    setLoading(false);
  }
};

  // Get user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name || parsedUser.username || parsedUser.email);
    }
    fetchSellers();
  }, []);

  const handleGigClick = (gig) => {
    setSelectedGig(gig);
  };
  
  const closeModal = () => {
    setSelectedGig(null);
  };

  // Fallback dummy data in case API fails
  const getFallbackSellers = () => {
    return [
      {
        id: 1,
        title: "ERP Implementation Specialist",
        provider: "John Doe",
        rating: 4.9,
        reviews: 48,
        price: 120,
        delivery: "1 day",
        img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        description: "Professional ERP implementation services with years of experience.",
        tags: ["ERP", "Implementation", "Consulting"],
        level: "Level 2 ERP Specialist",
        location: "New York, USA"
      }
    ];
  };

  // Split sellers into different sections for display
  const recentServices = sellers.slice(0, 4);
  const inspiredServices = sellers.slice(4, 8);
  const topRatedSellers = sellers.filter(seller => seller.rating >= 4.5).slice(0, 4);
  const automationSellers = sellers.slice(8, 12);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#708238] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading seller profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="container mx-auto px-4 py-8">
        <GigModal gig={selectedGig} onClose={closeModal} />

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            {error} - Showing available profiles
          </div>
        )}

        {/* Welcome Section */}
        <div className="relative bg-gradient-to-r from-[#708238]/10 to-[#FFA500]/10 rounded-3xl shadow-md p-8 mb-12 overflow-hidden border border-white">
          {/* ... (keep your existing welcome section code) */}
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              👋 Welcome back, {userName || "User"}
            </h1>
            {/* ... (rest of welcome section) */}
          </div>
        </div>

        {/* Section 1: Recent Services (Now showing real sellers) */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Available ERP Specialists</h2>
            <Link className="text-[#708238] hover:text-[#5a6a2d] font-medium text-sm">See all</Link>
          </div>
          {recentServices.length > 0 ? (
            <div className="flex overflow-x-auto gap-6 scrollbar-hide pb-2">
              {recentServices.map((item) => (
                <ServiceCard key={item.id} item={item} onClick={handleGigClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No seller profiles available at the moment.
            </div>
          )}
        </section>

        {/* Section 2: Inspired by your ERP usage */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Recommended Specialists</h2>
            <Link className="text-[#708238] hover:text-[#5a6a2d] font-medium text-sm">See all</Link>
          </div>
          {inspiredServices.length > 0 ? (
            <div className="flex overflow-x-auto gap-6 scrollbar-hide pb-2">
              {inspiredServices.map((item) => (
                <ServiceCard key={item.id} item={item} onClick={handleGigClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              More specialists coming soon.
            </div>
          )}
        </section>

        {/* Section 3: Top-rated ERP Experts */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Top-rated ERP Experts</h2>
            <Link className="text-[#708238] hover:text-[#5a6a2d] font-medium text-sm">See all</Link>
          </div>
          {topRatedSellers.length > 0 ? (
            <div className="flex overflow-x-auto gap-6 scrollbar-hide pb-2">
              {topRatedSellers.map((item) => (
                <ServiceCard key={item.id} item={item} onClick={handleGigClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No top-rated experts available.
            </div>
          )}
        </section>

        {/* Section 4: Automations You May Need */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Automation Specialists</h2>
            <Link className="text-[#708238] hover:text-[#5a6a2d] font-medium text-sm">See all</Link>
          </div>
          {automationSellers.length > 0 ? (
            <div className="flex overflow-x-auto gap-6 scrollbar-hide pb-2">
              {automationSellers.map((item) => (
                <ServiceCard key={item.id} item={item} onClick={handleGigClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No automation specialists available.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}