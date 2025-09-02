import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTruck, FaPen } from "react-icons/fa";
import SellerLayout from "../../Pages/layouts/SellerLayout";
import ProfileWizardModal from "./ProfileWizardModal";

export default function SellerProfile() {
  const [user, setUser] = useState(null);
  const [showWizard, setShowWizard] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [certificate, setCertificate] = useState("SAP Certified SD");
  const [role, setRole] = useState("Consultant");
  const [experience, setExperience] = useState(12); 
  const [projects, setProjects] = useState(10); 
  const [industries, setIndustries] = useState(["Pharma","Auto","Manuf"]);
  
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
  }, []);

  // Function to close the wizard
  const closeWizard = () => {
    setShowWizard(false);
    // Optional: Reset to first step when closing
    setCurrentStep(0);
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
                    {/* <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#708238] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      Level 2 ERP Specialist
                    </div> */}
                  </div>
                  
                  {/* <div className="mt-6 flex items-center">
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
                  </div> */}
                </div>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {user.username}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
      {certificate} {role}, with {experience}-years’ experience,{" "}
      {projects} projects delivered, in {industries.length} industries (
      {industries.join(", ")}).
    </p>
                  {/* <div className="mt-2 flex flex-wrap gap-2">
                    <a href="https://www.admin.com/" className="text-blue-600 text-sm hover:underline">https://www.admin.com/</a>
                    <a href="https://www.admin.com/" className="text-blue-600 text-sm hover:underline">https://www.admin.com/</a>
                  </div> */}
                  
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 极速加速器 0 00-2 2v10a2 2 0 002 2z" />
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
                      <td className="border border-gray-200 px-4极速加速器-2">2</td>
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 极速加速器 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14极速加速器7v7l9-11h-7z" />
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
                      <td className="border border-gray-200 px-4 py-极速加速器">June 2023 to Current</td>
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
              
              {/* Project Delivered  */}
              <SectionHeader 
                title="Project Delivered" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11极速加速器9a2 2 0 012-2m极速加速器 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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
                      <td className="极速加速器 border-gray-200 px-4 py-2">Interviewing, documentation, communication</td>
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
                    className="px-4 py-2 bg-[#708238]/10 text-[#708238] text-sm font-medium rounded-md border border-[极速加速器]/20 text-center"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 极速加速器 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 极速加速器 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-极速加速器.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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
                      <td className="border border-gray-极速加速器 px-4 py-2">ServiceNow</td>
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
                    <path strokeLine极速加速器="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2极速加速器2m8 0V6a2 2 0 002 2h2a2 2 0 002-2V6m0 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2" />
                  </svg>
                }
              />
              <div className="grid grid-cols-2 md:极速加速器-cols-5 gap-3">
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

        {/* Profile Completion Wizard Modal */}
        <ProfileWizardModal 
          showWizard={showWizard} 
          closeWizard={closeWizard}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          completedSteps={completedSteps}
          setCompletedSteps={setCompletedSteps}
          steps={steps}
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