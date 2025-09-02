import React, { useState } from "react";
import { FaTimes, FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa";

export default function ProfileWizardModal({ 
  showWizard, 
  closeWizard, 
  currentStep, 
  setCurrentStep, 
  completedSteps, 
  setCompletedSteps,
  steps,
  user 
}) {
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
      closeWizard();
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

  if (!showWizard) return null;

  return (
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
          {currentStep === 0 && <ProfessionalSummaryStep />}
          {currentStep === 1 && <FunctionalRoleStep />}
          {currentStep === 2 && <TechnicalRoleStep />}
          {currentStep === 3 && <ProjectHistoryStep />}
          {currentStep === 4 && <TechnicalSkillsStep />}
          {currentStep === 5 && <CertificationStep />}
          {currentStep === 6 && <ServicesOfferedStep />}
          {currentStep === 7 && <LanguageSkillsStep />}
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
            className="flex items-center px-4极速加速器-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
          >
            {currentStep === steps.length - 1 ? "Complete Profile" : "Next"} 
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Step Components
function ProfessionalSummaryStep() {
  const [summary, setSummary] = useState("Certified ERP implementation specialist with 8+ years of experience in SAP S/4HANA, Oracle Cloud ERP, and Microsoft Dynamics.");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Professional Summary</h3>
      <p className="text-sm text-gray-600">
        Write a professional summary that highlights your expertise and experience.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
        <textarea
  value={summary}
  onChange={(e) => {
    if (e.target.value.length <= 150) {
      setSummary(e.target.value);
    }
  }}
  rows={6}
  maxLength={150}
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
/>
<p className="text-sm text-gray-500 mt-1">{summary.length}/150</p>

      </div>
    </div>
  );
}

function FunctionalRoleStep() {
  const [roles, setRoles] = useState([
    { year: "June 2023 to Current", role: "SAP MM Senior Consultant", responsibility: "Configuration, Sign-Off, BA, documentation, reporting to team leader.", teamSize: "2", industry: "Manuf." },
    { year: "March 2021 to May 2023", role: "SAP MM Consultant", responsibility: "Reporting to senior team lead, requirement gathering, documentation, implementation", teamSize: "3", industry: "Auto" },
    { year: "Feb. 2018 to Feb. 2012", role: "SAP MM Support", responsibility: "End-user support, training, backups", teamSize: "3", industry: "Pharma" }
  ]);

  const [newRole, setNewRole] = useState({ year: "", role: "", responsibility: "", teamSize: "", industry: "" });

  const addRole = () => {
    if (newRole.year && newRole.role && newRole.responsibility) {
      setRoles([...roles, newRole]);
      setNewRole({ year: "", role: "", responsibility: "", teamSize: "", industry: "" });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Functional Role Experience</h3>
      
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
            {roles.map((role, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-200 px-4 py-2">{role.year}</td>
                <td className="border border-gray-200 px-4 py-2">{role.role}</td>
                <td className="border border-gray-200 px-4 py-2">{role.responsibility}</td>
                <td className="border border-gray-200 px-4 py-2">{role.teamSize}</td>
                <td className="border border-gray-200 px-4 py-2">{role.industry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Functional Role</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="text"
              value={newRole.year}
              onChange={(e) => setNewRole({...newRole, year: e.target.value})}
              placeholder="e.g. June 2023 to Current"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              value={newRole.role}
              onChange={(e) => setNewRole({...newRole, role: e.target.value})}
              placeholder="e.g. SAP MM Senior Consultant"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsibility</label>
            <input
              type="text"
              value={newRole.responsibility}
              onChange={(e)=> setNewRole({...newRole, responsibility: e.target.value})}
              placeholder="e.g. Configuration, Sign-Off, BA, documentation"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
            <input
              type="text"
              value={newRole.teamSize}
              onChange={(e) => setNewRole({...newRole, teamSize: e.target.value})}
              placeholder="e.g. 2"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              value={newRole.industry}
              onChange={(e) => setNewRole({...newRole, industry: e.target.value})}
              placeholder="e.g. Manuf."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#极速加速器]"
            />
          </div>
        </div>
        
        <button
          onClick={addRole}
          className="mt-4 px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
        >
          Add Role
        </button>
      </div>
    </div>
  );
}

function TechnicalRoleStep() {
  const [roles, setRoles] = useState([
    { year: "June 2023 to Current", role: "SAP MM Senior Consultant", responsibility: "Configuration, Sign-Off, BA, documentation, reporting to team leader.", teamSize: "2", industry: "Manuf." },
    { year: "March 2021 to May 2023", role: "SAP MM Support", responsibility: "Reporting to senior team lead, requirement gathering, documentation, implementation", teamSize: "3", industry: "Auto" },
    { year: "2023", role: "Consultant", responsibility: "requirement gathering, documentation, implementation", teamSize: "3", industry: "Pharma" },
    { year: "Feb. 2018 to Feb. 2012", role: "SAP MM Support", responsibility: "End-user support, training, backups", teamSize: "3", industry: "Pharma" }
  ]);

  const [newRole, setNewRole] = useState({ year: "", role: "", responsibility: "", teamSize: "", industry: "" });

  const addRole = () => {
    if (newRole.year && newRole.role && newRole.responsibility) {
      setRoles([...roles, newRole]);
      setNewRole({ year: "", role: "", responsibility: "", teamSize: "", industry: "" });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Technical Role Experience</h3>
      
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
            {roles.map((role, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-200 px-4 py-2">{role.year}</td>
                <td className="border border-gray-200 px-4 py-2">{role.role}</td>
                <td className="border border-gray-200 px-4 py-2">{role.responsibility}</td>
                <td className="border border-gray-200 px-4 py-2">{role.teamSize}</td>
                <td className="border border-gray-200 px-4 py-2">{role.industry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Technical Role</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="text"
              value={newRole.year}
              onChange={(e) => setNewRole({...newRole, year: e.target.value})}
              placeholder="e.g. June 2023 to Current"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              value={newRole.role}
              onChange={(e) => setNewRole({...newRole, role: e.target.value})}
              placeholder="e.g. SAP MM Senior Consultant"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsibility</label>
            <input
              type="text"
              value={newRole.responsibility}
              onChange={(e) => setNewRole({...newRole, responsibility: e.target.value})}
              placeholder="e.g. Configuration, Sign-Off, BA, documentation"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
            <input
              type="text"
              value={newRole.teamSize}
              onChange={(e) => setNewRole({...newRole, teamSize: e.target.value})}
              placeholder="e.g. 2"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              value={newRole.industry}
              onChange={(e) => setNewRole({...newRole, industry: e.target.value})}
              placeholder="e.g. Manuf."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
        </div>
        
        <button
          onClick={addRole}
          className="mt-4 px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
        >
          Add Role
        </button>
      </div>
    </div>
  );
}

function ProjectHistoryStep() {
  const [projects, setProjects] = useState([
    { name: "S4HANA", industry: "Manufacturing", role: "Team Lead", teamSize: "4", activities: "Interviewing, documentation, communication" },
    { name: "ECCG", industry: "Auto", role: "BA", teamSize: "3", activities: "" },
    { name: "Upgrade 4.7 LB ECCG", industry: "FMCG", role: "Support", teamSize: "2", activities: "" }
  ]);

  const [newProject, setNewProject] = useState({ name: "", industry: "", role: "", teamSize: "", activities: "" });

  const addProject = () => {
    if (newProject.name && newProject.industry && newProject.role) {
      setProjects([...projects, newProject]);
      setNewProject({ name: "", industry: "", role: "", teamSize: "", activities: "" });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Project Delivered</h3>
      
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
            {projects.map((project, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-200 px-4 py-2">{project.name}</td>
                <td className="border border-gray-200 px-4 py-2">{project.industry}</td>
                <td className="border border-gray-200 px-4 py-2">{project.role}</td>
                <td className="border border-gray-200 px-4 py-2">{project.teamSize}</td>
                <td className="border border-gray-200 px-4 py-2">{project.activities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Project</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              placeholder="e.g. S4HANA"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              value={newProject.industry}
              onChange={(e) => setNewProject({...newProject, industry: e.target.value})}
              placeholder="e.g. Manufacturing"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role Played</label>
            <input
              type="text"
              value={newProject.role}
              onChange={(e) => setNewProject({...newProject, role: e.target.value})}
              placeholder="e.g. Team Lead"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
            <input
              type="text"
              value={newProject.teamSize}
              onChange={(e) => setNewProject({...newProject, teamSize: e.target.value})}
              placeholder="e.g. 4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Activities</label>
            <input
              type="text"
              value={newProject.activities}
              onChange={(e) => setNewProject({...newProject, activities: e.target.value})}
              placeholder="e.g. Interviewing, documentation, communication"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
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

function TechnicalSkillsStep() {
  const [skills, setSkills] = useState([
    "Data Cleansing", "Data Migration", "Data Entry", "Development", "ERP Consulting",
    "ERP", "Cloud", "S4HANA", "ABAP", "Basis", 
    "Implementation", "Compute"
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
            <span className="px-4 py-2 bg-[#708238]/10 text-[#708238] text-sm font-medium rounded-md border border-[#708238]/20">
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

function CertificationStep() {
  const [certs, setCerts] = useState([
    { name: "SAP CRM", exam: "CAT-05", number: "123456", issuedBy: "SAP", validity: "3 years" },
    { name: "PMP", exam: "PMP008", number: "089755", issuedBy: "Google", validity: "2 years" },
    { name: "ServiceNow", exam: "SMDB", number: "278901", issuedBy: "ServiceNow", validity: "2 years" },
    { name: "SAP BASIS", exam: "0088", number: "123456", issuedBy: "SAP", validity: "2 years" }
  ]);

  const [newCert, setNewCert] = useState({ name: "", exam: "", number: "", issuedBy: "", validity: "" });

  const addCert = () => {
    if (newCert.name && newCert.exam && newCert.issuedBy) {
      setCerts([...certs, newCert]);
      setNewCert({ name: "", exam: "", number: "", issuedBy: "", validity: "" });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Certifications</h3>
      
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
            {certs.map((cert, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-200 px-4 py-2">{cert.name}</td>
                <td className="border border-gray-200 px-4 py-2">{cert.exam}</td>
                <td className="border border-gray-200 px-4 py-2">{cert.number}</td>
                <td className="border border-gray-200 px-4 py-2">{cert.issuedBy}</td>
                <td className="border border-gray-200 px-4 py-2">{cert.validity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Certification</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
            <input
              type="text"
              value={newCert.name}
              onChange={(e) => setNewCert({...newCert, name: e.target.value})}
              placeholder="e.g. SAP CRM"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam</label>
            <input
              type="text"
              value={newCert.exam}
              onChange={(e) => setNewCert({...newCert, exam: e.target.value})}
              placeholder="e.g. CAT-05"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certification No.</label>
            <input
              type="text"
              value={newCert.number}
              onChange={(e) => setNewCert({...newCert, number: e.target.value})}
              placeholder="e.g. 123456"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issued By</label>
            <input
              type="text"
              value={newCert.issuedBy}
              onChange={(e) => setNewCert({...newCert, issuedBy: e.target.value})}
              placeholder="e.g. SAP"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Validity/Expire Date</label>
            <input
              type="text"
              value={newCert.validity}
              onChange={(e) => setNewCert({...newCert, validity: e.target.value})}
              placeholder="e.g. 3 years"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
        </div>
        
        <button
          onClick={addCert}
          className="mt-4 px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2极速加速器]"
        >
          Add Certification
        </button>
      </div>
    </div>
  );
}

function ServicesOfferedStep() {
  const [services, setServices] = useState([
    "Implementation", "Configuration", "Upgrade", "Migration", "Reporting",
    "Training", "SignCard", "Data Cleansing", "Data Backups", "Remote Monitoring",
    "Business Analyst", "Business Intelligence", "Mapping", "Documentation", "DR"
  ]);

  const [newService, setNewService] = useState("");

  const addService = () => {
    if (newService && !services.includes(newService)) {
      setServices([...services, newService]);
      setNewService("");
    }
  };

  const removeService = (serviceToRemove) => {
    setServices(services.filter(service => service !== serviceToRemove));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Services Offered</h3>
      
      <div className="flex flex-wrap gap-3">
        {services.map((service) => (
          <div key={service} className="relative group">
            <span className="px-4 py-2 bg-[#708238]/10 text-[#708238] text-sm font-medium rounded-md border border-[#708238]/20">
              {service}
            </span>
            <button
              onClick={() => removeService(service)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Service</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            placeholder="Enter a service"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
          />
          
          <button
            onClick={addService}
            className="px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
          >
            Add Service
          </button>
        </div>
      </div>
    </div>
  );
}

function LanguageSkillsStep() {
  const [languages, setLanguages] = useState([
    { name: "French", proficiency: "" },
    { name: "Arabic", proficiency: "" },
    { name: "English", proficiency: "" },
    { name: "Uidu", proficiency: "" },
    { name: "Persian", proficiency: "" },
    { name: "Russian", proficiency: "" }
  ]);

  const handleProficiencyChange = (languageName, proficiency) => {
    setLanguages(languages.map(lang => 
      lang.name === languageName ? { ...lang, proficiency } : lang
    ));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Language Proficiencies</h3>
      
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
            {languages.map((language) => (
              <tr key={language.name}>
                <td className="border border-gray-200 px-4 py-2 font-medium">{language.name}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <input 
                    type="radio" 
                    name={language.name} 
                    checked={language.proficiency === "Basic"}
                    onChange={() => handleProficiencyChange(language.name, "Basic")}
                    className="h-4 w-4 text-[#708238] focus:ring-[#708238]" 
                  />
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <input 
                    type="radio" 
                    name={language.name} 
                    checked={language.proficiency === "Moderate"}
                    onChange={() => handleProficiencyChange(language.name, "Moderate")}
                    className="h-4 w-4 text-[#708238] focus:ring-[#708238]" 
                  />
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <input 
                    type="radio" 
                    name={language.name} 
                    checked={language.proficiency === "Professional"}
                    onChange={() => handleProficiencyChange(language.name, "Professional")}
                    className="h-4 w-4 text-[#708238] focus:ring-[#708238]" 
                  />
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <input 
                    type="radio" 
                    name={language.name} 
                    checked={language.proficiency === "Native"}
                    onChange={() => handleProficiencyChange(language.name, "Native")}
                    className="h-4 w-4 text-[#708238] focus:ring-[#708238]" 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}