import React, { useState, useEffect } from "react";
import { FaPen, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTruck, FaGraduationCap, FaCheck, FaTimes, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import SellerLayout from "../../Pages/layouts/SellerLayout";

export default function SellerProfile() {
  const [user, setUser] = useState(null);
  const [showWizard, setShowWizard] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // fallback dummy data
      setUser({
        username: "John Doe",
        email: "johndoe@example.com",
        firstName: "John",
        lastName: "Doe"
      });
    }
  }, []);

  const steps = [
    "Personal Info",
    "Professional Summary",
    "Functional Role",
    "Technical Role",
    "Project History",
    "Technical Skills",
    "Certifications",
    "Services Offered",
    "Languages"
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    } else {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setShowWizard(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index) => {
    if (index <= completedSteps.length || index === completedSteps.length + 1) {
      setCurrentStep(index);
    }
  };

  const closeWizard = () => {
    setShowWizard(false);
  };

  if (!user) {
    return (
      <SellerLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </SellerLayout>
    );
  }

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
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#708238] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      Level 2 ERP Specialist
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < 4 ? 'text-[#FFA500]' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-600 ml-2 text-sm font-medium">4.8 (128 reviews)</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {user.username}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    Certified ERP Implementation Specialist | SAP & Oracle Expert
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <a href="https://www.admin.com/" className="text-blue-600 text-sm hover:underline">https://www.admin.com/</a>
                    <a href="https://www.admin.com/" className="text-blue-600 text-sm hover:underline">https://www.admin.com/</a>
                  </div>
                  
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              <p className="text-gray-600 leading-relaxed">
                Certified ERP implementation specialist with 8+ years of experience in SAP S/4HANA, Oracle Cloud ERP, and Microsoft Dynamics.
              </p>
              
              {/* Functional Experience */}
              <SectionHeader 
                title="Functional Role" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">June 2023 to Current</td>
                      <td className="border border-gray-200 px-4 py-2">SAP MM Senior Consultant</td>
                      <td className="border border-gray-200 px-4 py-2">Configuration, Sign-Off, BA, documentation, reporting to team leader.</td>
                      <td className="border border-gray-200 px-4 py-2">2</td>
                      <td className="border border-gray-200 px-4 py-2">Manuf.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">March 2021 to May 2023</td>
                      <td className="border border-gray-200 px-4 py-2">SAP MM Consultant</td>
                      <td className="border border-gray-200 px-4 py-2">Reporting to senior team lead, requirement gathering, documentation, implementation</td>
                      <td className="border border-gray-200 px-4 py-2">3</td>
                      <td className="border border-gray-200 px-4 py-2">Auto</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Feb. 2018 to Feb. 2012</td>
                      <td className="border border-gray-200 px-4 py-2">SAP MM Support</td>
                      <td className="border border-gray-200 px-4 py-2">End-user support, training, backups</td>
                      <td className="border border-gray-200 px-4 py-2">3</td>
                      <td className="border border-gray-200 px-4 py-2">Pharma</td>
                    </tr>
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
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">June 2023 to Current</td>
                      <td className="border border-gray-200 px-4 py-2">SAP MM Senior Consultant</td>
                      <td className="border border-gray-200 px-4 py-2">Configuration, Sign-Off, BA, documentation, reporting to team leader.</td>
                      <td className="border border-gray-200 px-4 py-2">2</td>
                      <td className="border border-gray-200 px-4 py-2">Manuf.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">March 2021 to May 2023</td>
                      <td className="border border-gray-200 px-4 py-2">SAP MM Support</td>
                      <td className="border border-gray-200 px-4 py-2">Reporting to senior team lead, requirement gathering, documentation, implementation</td>
                      <td className="border border-gray-200 px-4 py-2">3</td>
                      <td className="border border-gray-200 px-4 py-2">Auto</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">2023</td>
                      <td className="border border-gray-200 px-4 py-2">Consultant</td>
                      <td className="border border-gray-200 px-4 py-2">requirement gathering, documentation, implementation</td>
                      <td className="border border-gray-200 px-4 py-2">3</td>
                      <td className="border border-gray-200 px-4 py-2">Pharma</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Feb. 2018 to Feb. 2012</td>
                      <td className="border border-gray-200 px-4 py-2">SAP MM Support</td>
                      <td className="border border-gray-200 px-4 py-2">End-user support, training, backups</td>
                      <td className="border border-gray-200 px-4 py-2">3</td>
                      <td className="border border-gray-200 px-4 py-2">Pharma</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Project Delivered History */}
              <SectionHeader 
                title="Project Delivered History" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">S4HANA</td>
                      <td className="border border-gray-200 px-4 py-2">Manufacturing</td>
                      <td className="border border-gray-200 px-4 py-2">Team Lead</td>
                      <td className="border border-gray-200 px-4 py-2">4</td>
                      <td className="border border-gray-200 px-4 py-2">Interviewing, documentation, communication</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">ECCG</td>
                      <td className="border border-gray-200 px-4 py-2">Auto</td>
                      <td className="border border-gray-200 px-4 py-2">BA</td>
                      <td className="border border-gray-200 px-4 py-2">3</td>
                      <td className="border border-gray-200 px-4 py-2"></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Upgrade 4.7 LB ECCG</td>
                      <td className="border border-gray-200 px-4 py-2">FMCG</td>
                      <td className="border border-gray-200 px-4 py-2">Support</td>
                      <td className="border border-gray-200 px-4 py-2">2</td>
                      <td className="border border-gray-200 px-4 py-2"></td>
                    </tr>
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
                {[
                  "Data Cleansing", "Data Migration", "Data Entry", "Development", "ERP Consulting",
                  "ERP", "Cloud", "S4HANA", "ABAP", "Basis", 
                  "Implementation", "Compute"
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-[#708238]/10 text-[#708238] text-sm font-medium rounded-md border border-[#708238]/20 text-center"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Certifications */}
              <SectionHeader 
                title="Certifications" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">SAP CRM</td>
                      <td className="border border-gray-200 px-4 py-2">CAT-05</td>
                      <td className="border border-gray-200 px-4 py-2">123456</td>
                      <td className="border border-gray-200 px-4 py-2">SAP</td>
                      <td className="border border-gray-200 px-4 py-2">3 years</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">PMP</td>
                      <td className="border border-gray-200 px-4 py-2">PMP008</td>
                      <td className="border border-gray-200 px-4 py-2">089755</td>
                      <td className="border border-gray-200 px-4 py-2">Google</td>
                      <td className="border border-gray-200 px-4 py-2">2 years</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">ServiceNow</td>
                      <td className="border border-gray-200 px-4 py-2">SMDB</td>
                      <td className="border border-gray-200 px-4 py-2">278901</td>
                      <td className="border border-gray-200 px-4 py-2">ServiceNow</td>
                      <td className="border border-gray-200 px-4 py-2">2 years</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">SAP BASIS</td>
                      <td className="border border-gray-200 px-4 py-2">0088</td>
                      <td className="border border-gray-200 px-4 py-2">123456</td>
                      <td className="border border-gray-200 px-4 py-2">SAP</td>
                      <td className="border border-gray-200 px-4 py-2">2 years</td>
                    </tr>
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
                {[
                  "Implementation", "Configuration", "Upgrade", "Migration", "Reporting",
                  "Training", "SignCard", "Data Cleansing", "Data Backups", "Remote Monitoring",
                  "Business Analyst", "Business Intelligence", "Mapping", "Documentation", "DR"
                ].map((service) => (
                  <span
                    key={service}
                    className="px-4 py-2 bg-[#708238]/10 text-[#708238] text-sm font-medium rounded-md border border-[#708238]/20 text-center"
                  >
                    {service}
                  </span>
                ))}
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
                      <th className="border border-gray-200 px-4 py-2 text-center">Moderate</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Professional</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Native</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["French", "Arabic", "English", "Uidu", "Persian", "Russian"].map((language) => (
                      <tr key={language}>
                        <td className="border border-gray-200 px-4 py-2 font-medium">{language}</td>
                        <td className="border border-gray-200 px-4 py-2 text-center">
                          <input type="radio" name={language} className="h-4 w-4 text-[#708238] focus:ring-[#708238]" />
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-center">
                          <input type="radio" name={language} className="h-4 w-4 text-[#708238] focus:ring-[#708238]" />
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-center">
                          <input type="radio" name={language} className="h-4 w-4 text-[#708238] focus:ring-[#708238]" />
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-center">
                          <input type="radio" name={language} className="h-4 w-4 text-[#708238] focus:ring-[#708238]" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completion Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl h-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Complete Your Profile</h2>
              <button 
                onClick={closeWizard}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <button
                      onClick={() => handleStepClick(index)}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        currentStep === index 
                          ? "border-[#708238] bg-[#708238] text-white" 
                          : completedSteps.includes(index)
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-300 bg-white text-gray-500"
                      }`}
                    >
                      {completedSteps.includes(index) && index !== currentStep ? (
                        <FaCheck className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </button>
                    <span className={`text-xs mt-2 ${
                      currentStep === index ? "text-[#708238] font-medium" : "text-gray-500"
                    }`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Step Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {currentStep === 0 && <PersonalInfoStep user={user} />}
              {currentStep === 1 && <AboutMeStep />}
              {currentStep === 2 && <ERPSpecializationStep />}
              {currentStep === 3 && <ERPPortfolioStep />}
              {currentStep === 4 && <EducationStep />}
              {currentStep === 5 && <CertificationStep />}
              {currentStep === 6 && <TechnicalSkillsStep />}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between p-6 border-t border-gray-200">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center px-4 py-2 rounded-md ${
                  currentStep === 0 
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>
              
              <button
                onClick={handleNext}
                className="flex items-center px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
              >
                {currentStep === steps.length - 1 ? "Complete Profile" : "Next"} 
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </SellerLayout>
  );
}

// Step Components
function PersonalInfoStep({ user }) {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: "",
    location: "",
    title: "Certified ERP Implementation Specialist | SAP & Oracle Expert"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
        <div className="flex items-center">
          <div className="relative mr-4">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
              alt="profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
          <label className="cursor-pointer">
            <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium">
              Change Photo
            </div>
            <input type="file" className="sr-only" accept="image/*" />
          </label>
        </div>
      </div>
    </div>
  );
}

function AboutMeStep() {
  const [about, setAbout] = useState("Certified ERP implementation specialist with 8+ years of experience in SAP S/4HANA, Oracle Cloud ERP, and Microsoft Dynamics.");

  return (
    <div className="space-y-4">
  <h3 className="text-lg font-semibold text-gray-800">About Me</h3>
  <p className="text-sm text-gray-600">
    Write a detailed description about yourself, your experience, and your expertise.
  </p>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
    <textarea
      value={about}
      onChange={(e) => setAbout(e.target.value)}
      rows={8}
      maxLength={150} 
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
    />
  </div>

  <div
    className={`text-xs ${about.length === 150 ? "text-red-500" : "text-gray-500"}`}
  >
    {about.length}/150 characters
  </div>
</div>

  );
}

function ERPSpecializationStep() {
  const [specializations, setSpecializations] = useState({
    implementation: ["SAP S/4HANA", "Oracle Cloud ERP", "Microsoft Dynamics"],
    modules: ["Finance (FI/CO)", "Supply Chain (SCM)", "HR (HCM)", "CRM"],
    integration: ["API Development", "EDI Solutions", "Legacy System Migration"]
  });

  const [newItem, setNewItem] = useState({ category: "", value: "" });

  const addSpecialization = () => {
    if (newItem.category && newItem.value) {
      setSpecializations({
        ...specializations,
        [newItem.category]: [...(specializations[newItem.category] || []), newItem.value]
      });
      setNewItem({ category: "", value: "" });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">ERP Specializations</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-3">Implementation</h4>
          <ul className="space-y-2">
            {specializations.implementation.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="text-[#708238] mt-0.5 mr-2">•</div>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-3">Modules</h4>
          <ul className="space-y-2">
            {specializations.modules.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="text-[#708238] mt-0.5 mr-2">•</div>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-3">Integration</h4>
          <ul className="space-y-2">
            {specializations.integration.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="text-[#708238] mt-0.5 mr-2">•</div>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Specialization</h4>
        <div className="flex flex-col md:flex-row gap-2">
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
          >
            <option value="">Select Category</option>
            <option value="implementation">Implementation</option>
            <option value="modules">Modules</option>
            <option value="integration">Integration</option>
            <option value="other">Other</option>
          </select>
          
          <input
            type="text"
            value={newItem.value}
            onChange={(e) => setNewItem({...newItem, value: e.target.value})}
            placeholder="Enter specialization"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
          />
          
          <button
            onClick={addSpecialization}
            className="px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function ERPPortfolioStep() {
  const [projects, setProjects] = useState([
    { id: 1, title: "ERP Case Study #1", description: "Manufacturing Solution", type: "SAP Implementation", status: "Completed" },
    { id: 2, title: "ERP Case Study #2", description: "Logistics Solution", type: "Oracle Implementation", status: "Completed" },
    { id: 3, title: "ERP Case Study #3", description: "Retail Solution", type: "Dynamics Implementation", status: "In Progress" }
  ]);

  const [newProject, setNewProject] = useState({ title: "", description: "", type: "", status: "Completed" });

  const addProject = () => {
    if (newProject.title && newProject.description && newProject.type) {
      setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
      setNewProject({ title: "", description: "", type: "", status: "Completed" });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">ERP Portfolio</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 bg-gradient-to-br from-[#708238]/10 to-[#FFA500]/10 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                <h3 className="font-semibold mt-2 text-gray-700">{project.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{project.description}</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500">{project.type}</span>
                <span className="text-xs bg-[#708238]/10 text-[#708238] px-2 py-1 rounded">{project.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Project</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
            <input
              type="text"
              value={newProject.type}
              onChange={(e) => setNewProject({...newProject, type: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={newProject.status}
              onChange={(e) => setNewProject({...newProject, status: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            >
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Planning">Planning</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
          <div className="flex items-center">
            <label className="cursor-pointer">
              <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium">
                Upload Image
              </div>
              <input type="file" className="sr-only" accept="image/*" />
            </label>
          </div>
        </div>
        
        <button
          onClick={addProject}
          className="mt-4 px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
        >
          Add Project
        </button>
      </div>
    </div>
  );
}

function EducationStep() {
  const [education, setEducation] = useState([
    { degree: "MSc in Enterprise Systems", institution: "University of Technology", year: "2015-2017" },
    { degree: "BSc in Computer Science", institution: "University of Karachi", year: "2010-2014" }
  ]);

  const [newEducation, setNewEducation] = useState({ degree: "", institution: "", year: "" });

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.year) {
      setEducation([...education, newEducation]);
      setNewEducation({ degree: "", institution: "", year: "" });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Education</h3>
      
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="flex items-start">
            <div className="bg-[#708238]/10 text-[#708238] p-2 rounded-lg mr-3">
              <FaGraduationCap />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{edu.degree}</h3>
              <p className="text-gray-600 text-sm">{edu.institution}</p>
              <p className="text-gray-400 text-xs mt-1">{edu.year}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Education</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
            <input
              type="text"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
            <input
              type="text"
              value={newEducation.institution}
              onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="text"
              value={newEducation.year}
              onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
              placeholder="e.g. 2015-2017"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
        </div>
        
        <button
          onClick={addEducation}
          className="mt-4 px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
        >
          Add Education
        </button>
      </div>
    </div>
  );
}

function CertificationStep() {
  const [certifications, setCertifications] = useState([
    { title: "SAP Certified Application Associate", issuer: "SAP", year: "2022" },
    { title: "Oracle Cloud ERP Implementation Specialist", issuer: "Oracle", year: "2021" },
    { title: "Microsoft Dynamics 365 Finance", issuer: "Microsoft", year: "2020" }
  ]);

  const [newCert, setNewCert] = useState({ title: "", issuer: "", year: "" });

  const addCertification = () => {
    if (newCert.title && newCert.issuer && newCert.year) {
      setCertifications([...certifications, newCert]);
      setNewCert({ title: "", issuer: "", year: "" });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Certifications</h3>
      
      <div className="space-y-3">
        {certifications.map((cert, index) => (
          <div key={index} className="flex items-start">
            <div className="bg-[#708238]/10 text-[#708238] p-2 rounded-lg mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{cert.title}</h3>
              <p className="text-gray-600 text-sm">{cert.issuer}</p>
              <p className="text-gray-400 text-xs mt-1">Issued {cert.year}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Certification</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certification Title</label>
            <input
              type="text"
              value={newCert.title}
              onChange={(e) => setNewCert({...newCert, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
            <input
              type="text"
              value={newCert.issuer}
              onChange={(e) => setNewCert({...newCert, issuer: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="text"
              value={newCert.year}
              onChange={(e) => setNewCert({...newCert, year: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Certificate</label>
          <div className="flex items-center">
            <label className="cursor-pointer">
              <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium">
                Choose File
              </div>
              <input type="file" className="sr-only" />
            </label>
          </div>
        </div>
        
        <button
          onClick={addCertification}
          className="mt-4 px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
        >
          Add Certification
        </button>
      </div>
    </div>
  );
}

function TechnicalSkillsStep() {
  const [skills, setSkills] = useState([
    "SAP S/4HANA", "Oracle ERP Cloud", "Microsoft Dynamics", 
    "ABAP Development", "SQL Database", "ERP Configuration",
    "Business Process Modeling", "Data Migration", "System Integration",
    "Workflow Automation", "Financial Module", "Supply Chain Module",
    "HR Module", "CRM Integration", "API Development"
  ]);

  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Technical Skills</h3>
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div key={skill} className="relative group">
            <span className="px-4 py-2 bg-[#708238]/10 text-[#708238] text-sm font-medium rounded-full border border-[#708238]/20">
              {skill}
            </span>
            <button
              onClick={() => removeSkill(skill)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Skill</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
          />
          
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
          >
            Add Skill
          </button>
        </div>
      </div>
    </div>
  );
}

// Existing helper components (unchanged)
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

function SpecializationCard({ title, items }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="text-[#708238] mt-0.5 mr-2">•</div>
            <span className="text-gray-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EducationItem({ degree, institution, year }) {
  return (
    <div className="flex items-start">
      <div className="bg-[#708238]/10 text-[#708238] p-2 rounded-lg mr-3">
        <FaGraduationCap />
      </div>
      <div>
        <h3 className="font-medium text-gray-800">{degree}</h3>
        <p className="text-gray-600 text-sm">{institution}</p>
        <p className="text-gray-400 text-xs mt-1">{year}</p>
      </div>
    </div>
  );
}

function CertificationItem({ title, issuer, year }) {
  return (
    <div className="flex items-start">
      <div className="bg-[#708238]/10 text-[#708238] p-2 rounded-lg mr-3">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{issuer}</p>
        <p className="text-gray-400 text-xs mt-1">Issued {year}</p>
      </div>
    </div>
  );
}