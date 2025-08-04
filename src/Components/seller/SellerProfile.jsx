import React from "react";
import { FaPen, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTruck, FaGlobe, FaGraduationCap } from "react-icons/fa";
import SellerLayout from "../../Pages/layouts/SellerLayout";

export default function SellerProfile() {
  return (
    <SellerLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 font-sans">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">ERP Specialist Profile</h1>
            <button className="bg-fiverr-green hover:bg-green-600 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors">
              Complete Profile
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
                      alt="profile"
                      className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-fiverr-green text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      Level 2 ERP Specialist
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
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
                  <h1 className="text-2xl font-bold text-gray-800">Abdul Razi</h1>
                  <p className="text-lg text-gray-600 mt-1">
                    Certified ERP Implementation Specialist | SAP & Oracle Expert
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
              {/* About Me */}
              <SectionHeader 
                title="About Me" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              <p className="text-gray-600 leading-relaxed">
                Certified ERP implementation specialist with 8+ years of experience in SAP S/4HANA, Oracle Cloud ERP, and Microsoft Dynamics. I've successfully led 50+ ERP implementations for manufacturing, logistics, and retail businesses. My expertise includes system configuration, module integration, data migration, and user training. I focus on delivering tailored ERP solutions that streamline operations and drive business growth.
              </p>
              
              {/* ERP Specializations */}
              <SectionHeader 
                title="ERP Specializations" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SpecializationCard 
                  title="Implementation"
                  items={["SAP S/4HANA", "Oracle Cloud ERP", "Microsoft Dynamics"]}
                />
                <SpecializationCard 
                  title="Modules"
                  items={["Finance (FI/CO)", "Supply Chain (SCM)", "HR (HCM)", "CRM"]}
                />
                <SpecializationCard 
                  title="Integration"
                  items={["API Development", "EDI Solutions", "Legacy System Migration"]}
                />
              </div>
              
              {/* Portfolio */}
              <SectionHeader 
                title="ERP Portfolio" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                }
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
                        <h3 className="font-semibold mt-2 text-gray-700">ERP Case Study #{item}</h3>
                        <p className="text-xs text-gray-500 mt-1">Manufacturing Solution</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-500">SAP Implementation</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Completed</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Education & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <SectionHeader 
                    title="Education" 
                    icon={<FaGraduationCap className="text-gray-500" />}
                  />
                  <div className="space-y-4">
                    <EducationItem 
                      degree="MSc in Enterprise Systems" 
                      institution="University of Technology" 
                      year="2015-2017"
                    />
                    <EducationItem 
                      degree="BSc in Computer Science" 
                      institution="University of Karachi" 
                      year="2010-2014"
                    />
                  </div>
                </div>
                
                <div>
                  <SectionHeader 
                    title="Certifications" 
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    }
                  />
                  <div className="space-y-3">
                    <CertificationItem 
                      title="SAP Certified Application Associate" 
                      issuer="SAP" 
                      year="2022"
                    />
                    <CertificationItem 
                      title="Oracle Cloud ERP Implementation Specialist" 
                      issuer="Oracle" 
                      year="2021"
                    />
                    <CertificationItem 
                      title="Microsoft Dynamics 365 Finance" 
                      issuer="Microsoft" 
                      year="2020"
                    />
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload additional certifications
                      </label>
                      <div className="flex items-center">
                        <label className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            Choose File
                          </div>
                          <input type="file" className="sr-only" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skills */}
              <SectionHeader 
                title="Technical Skills" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
              <div className="flex flex-wrap gap-3">
                {[
                  "SAP S/4HANA", "Oracle ERP Cloud", "Microsoft Dynamics", 
                  "ABAP Development", "SQL Database", "ERP Configuration",
                  "Business Process Modeling", "Data Migration", "System Integration",
                  "Workflow Automation", "Financial Module", "Supply Chain Module",
                  "HR Module", "CRM Integration", "API Development"
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
}

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
        <div className="text-fiverr-green bg-green-50 p-2 rounded-lg">
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <button className="text-gray-500 hover:text-fiverr-green flex items-center gap-2 text-sm">
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
            <div className="text-fiverr-green mt-0.5 mr-2">•</div>
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
      <div className="bg-green-50 text-fiverr-green p-2 rounded-lg mr-3">
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
      <div className="bg-blue-50 text-blue-500 p-2 rounded-lg mr-3">
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