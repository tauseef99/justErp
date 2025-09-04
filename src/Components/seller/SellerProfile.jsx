import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTruck, FaPen, FaStar } from "react-icons/fa";
import SellerLayout from "../../Pages/layouts/SellerLayout";
import ProfileWizardModal from "./ProfileWizardModal";
import axios from "axios";

export default function SellerProfile() {
  const [user, setUser] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  // Updated steps according to client requirements from the screenshot
  const steps = [
    "Professional Summary",
    "Functional Role",
    "Technical Role", 
    "Project History",
    "Technical Skills",
    "Certifications",
    "Services Offered",
    "Language Skills"
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // fallback dummy data
      setUser({
        username: "naseem hussain",
        email: "naseem@example.com",
        firstName: "naseem",
        lastName: "hussain"
      });
    }
    
    fetchSellerData();
  }, []);

  const fetchSellerData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found');
        return;
      }
      
      const cleanToken = token.replace(/^"(.*)"$/, '$1');
      
      const response = await axios.get('http://localhost:5000/api/profile-wizard', {
        headers: { 
          Authorization: `Bearer ${cleanToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      setSellerData(response.data);
    } catch (error) {
      console.error('Error fetching seller data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to close the wizard
  const closeWizard = () => {
    setShowWizard(false);
    // Refresh data after wizard closes
    fetchSellerData();
  };

  if (loading) {
    return (
      <SellerLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </SellerLayout>
    );
  }

  if (!user) {
    return (
      <SellerLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </SellerLayout>
    );
  }

  // Calculate experience years from functional roles
  const calculateExperienceYears = () => {
    if (!sellerData || !sellerData.functionalRoles) return 0;
    return sellerData.functionalRoles.length;
  };

  // Extract industries from roles and projects
  const extractIndustries = () => {
    const industries = new Set();
    
    if (sellerData?.functionalRoles) {
      sellerData.functionalRoles.forEach(role => {
        if (role.industry) industries.add(role.industry);
      });
    }
    
    if (sellerData?.technicalRoles) {
      sellerData.technicalRoles.forEach(role => {
        if (role.industry) industries.add(role.industry);
      });
    }
    
    if (sellerData?.projects) {
      sellerData.projects.forEach(project => {
        if (project.industry) industries.add(project.industry);
      });
    }
    
    return Array.from(industries);
  };

  // Generate tagline based on seller data
  const generateTagline = () => {
    if (!sellerData) return "ERP Consultant";
    
    const certification = sellerData.certifications && sellerData.certifications.length > 0 
      ? sellerData.certifications[0].name 
      : "Certified";
    
    const experienceYears = calculateExperienceYears();
    const projectCount = sellerData.projects ? sellerData.projects.length : 0;
    const industries = extractIndustries();
    
    const industryList = industries.length > 0 
      ? `in ${industries.length} industries (${industries.slice(0, 3).join(", ")}${industries.length > 3 ? ", and more" : ""})`
      : "";
    
    return `${certification} Consultant, with ${experienceYears}-years' experience, ${projectCount} projects delivered ${industryList}`;
  };

  return (
    <SellerLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 font-sans">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">ERP Consultant Profile</h1>
            <button 
              onClick={() => setShowWizard(true)}
              className="bg-[#708238] hover:bg-[#5a6a2d] text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Complete Your Profile
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-[#708238]/10 to-[#FFA500]/10 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
                      alt="profile"
                      className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                  
                  <div className="mt-6 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`w-5 h-5 ${i < 4 ? 'text-[#FFA500]' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-gray-600 ml-2 text-sm font-medium">4.8 (128 reviews)</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {user.username}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    {generateTagline()}
                  </p>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileInfo 
                      icon={<FaMapMarkerAlt className="text-gray-500" />} 
                      label="Based in" 
                      value="Karachi, Pakistan" 
                    />
                    <ProfileInfo 
                      icon={<FaCalendarAlt className="text-gray-500" />} 
                      label="Member since" 
                      value="Apr 2023" 
                    />
                    <ProfileInfo 
                      icon={<FaClock className="text-gray-500" />} 
                      label="Avg. response time" 
                      value="< 1 hour" 
                    />
                    <ProfileInfo 
                      icon={<FaTruck className="text-gray-500" />} 
                      label="Last delivery" 
                      value="2 days ago" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile Sections */}
            <div className="p-6 space-y-8">
              {/* Professional Summary */}
              <SectionHeader 
                title="Professional Summary" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              <p className="text-gray-600 leading-relaxed">
                {sellerData?.professionalSummary || "No professional summary provided."}
              </p>
              
              {/* Functional Experience */}
              <SectionHeader 
                title="Functional Role" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="current" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Year</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Responsibility</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Team Size</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Industry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerData?.functionalRoles && sellerData.functionalRoles.length > 0 ? (
                      sellerData.functionalRoles.map((role, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-200 px-4 py-2">{role.year || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.role || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.responsibility || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.teamSize || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.industry || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border border-gray-200 px-4 py-4 text-center text-gray-500">
                          No functional roles added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Technical Experience */}
              <SectionHeader 
                title="Technical Role" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Year</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Responsibility</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Team Size</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Industry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerData?.technicalRoles && sellerData.technicalRoles.length > 0 ? (
                      sellerData.technicalRoles.map((role, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-200 px-4 py-2">{role.year || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.role || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.responsibility || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.teamSize || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.industry || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border border-gray-200 px-4 py-4 text-center text-gray-500">
                          No technical roles added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Project Delivered  */}
              <SectionHeader 
                title="Project Delivered" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                }
              />
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Project Name</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Industry</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Role Played</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Team Size</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerData?.projects && sellerData.projects.length > 0 ? (
                      sellerData.projects.map((project, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-200 px-4 py-2">{project.name || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{project.industry || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{project.role || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{project.teamSize || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{project.activities || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border border-gray-200 px-4 py-4 text-center text-gray-500">
                          No projects added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Technical Skills */}
              <SectionHeader 
                title="Technical Skills" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {sellerData?.technicalSkills && sellerData.technicalSkills.length > 0 ? (
                  sellerData.technicalSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#708238]/10 text-[#708238] text-sm font-medium rounded-md border border-[#708238]/20 text-center"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full">No technical skills added yet.</p>
                )}
              </div>
              
              {/* Certifications */}
              <SectionHeader 
                title="Certifications" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3. 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                }
              />
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Certification Name</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Exam</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Certification No.</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Issued By</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Validity/Expire Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerData?.certifications && sellerData.certifications.length > 0 ? (
                      sellerData.certifications.map((cert, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-200 px-4 py-2">{cert.name || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{cert.exam || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{cert.number || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{cert.issuedBy || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{cert.validity || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border border-gray-200 px-4 py-4 text-center text-gray-500">
                          No certifications added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Services Offered */}
              <SectionHeader 
                title="ERP Consultancy/Services Offered" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h2a2 2 0 002-2V6m0 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2" />
                  </svg>
                }
              />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {sellerData?.servicesOffered && sellerData.servicesOffered.length > 0 ? (
                  sellerData.servicesOffered.map((service, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#708238]/10 text-[#708238] text-sm font-medium rounded-md border border-[#708238]/20 text-center"
                    >
                      {service}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full">No services added yet.</p>
                )}
              </div>
              
              {/* Language Proficiencies */}
              <SectionHeader 
                title="Language Proficiencies" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                }
              />
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Language</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Basic</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Intermediate</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Fluent</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Native</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerData?.languages && sellerData.languages.length > 0 ? (
                      sellerData.languages.map((lang, index) => (
                        <tr key={index}>
                          <td className="border border-gray-200 px-4 py-2 font-medium">{lang.language}</td>
                          <td className="border border-gray-200 px-4 py-2 text-center">
                            <input 
                              type="radio" 
                              checked={lang.proficiency === "Basic"} 
                              readOnly
                              className="h-4 w-4 text-[#708238] focus:ring-[#708238]" 
                            />
                          </td>
                          <td className="border border-gray-200 px-4 py-2 text-center">
                            <input 
                              type="radio" 
                              checked={lang.proficiency === "Intermediate"} 
                              readOnly
                              className="h-4 w-4 text-[#708238] focus:ring-[#708238]" 
                            />
                          </td>
                          <td className="border border-gray-200 px-4 py-2 text-center">
                            <input 
                              type="radio" 
                              checked={lang.proficiency === "Fluent"} 
                              readOnly
                              className="h-4 w-4 text-[#708238] focus:ring-[#708238]" 
                            />
                          </td>
                          <td className="border border-gray-200 px-4 py-2 text-center">
                            <input 
                              type="radio" 
                              checked={lang.proficiency === "Native"} 
                              readOnly
                              className="h-4 w-4 text-[#708238] focus:ring-[#708238]" 
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border border-gray-200 px-4 py-4 text-center text-gray-500">
                          No languages added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Completion Wizard Modal */}
        <ProfileWizardModal 
          showWizard={showWizard} 
          closeWizard={closeWizard}
          user={user}
        />
      </div>
    </SellerLayout>
  );
}

// Helper components
function ProfileInfo({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-400">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function SectionHeader({ title, icon }) {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="text-[#708238] bg-[#708238]/10 p-2 rounded-lg">
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <button className="text-gray-500 hover:text-[#708238] flex items-center gap-2 text-sm">
        <FaPen className="text-xs" />
        Edit
      </button>
    </div>
  );
}