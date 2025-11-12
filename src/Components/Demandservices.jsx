import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaProjectDiagram,
  FaCloud,
  FaAws,
  FaCogs,
  FaLightbulb,
  FaExchangeAlt,
} from "react-icons/fa";
import { SiSap, SiApacheairflow } from "react-icons/si";
import { MdOutlineAnalytics, MdOutlineDesignServices } from "react-icons/md";

function Demandservices() {
  const { t } = useTranslation();

  // Updated services array to use translation keys
  const services = [
    {
      key: "business_intelligence",
      icon: <MdOutlineAnalytics size={40} className="mx-auto text-blue-600 transition-colors duration-300" />,
    },
    {
      key: "data_migration",
      icon: <FaExchangeAlt size={40} className="mx-auto text-green-600 transition-colors duration-300" />,
    },
    {
      key: "reporting",
      icon: <FaLightbulb size={40} className="mx-auto text-yellow-600 transition-colors duration-300" />,
    },
    {
      key: "cloud_services",
      icon: <FaCloud size={40} className="mx-auto text-purple-600 transition-colors duration-300" />,
    },
    {
      key: "s4_hana",
      icon: <SiSap size={40} className="mx-auto text-gray-700 transition-colors duration-300" />,
    },
    {
      key: "sap_abap_service",
      icon: <FaCogs size={40} className="mx-auto text-indigo-600 transition-colors duration-300" />,
    },
    {
      key: "sap_basis_service",
      icon: <SiApacheairflow size={40} className="mx-auto text-pink-600 transition-colors duration-300" />,
    },
    {
      key: "aws",
      icon: <FaAws size={40} className="mx-auto text-orange-500 transition-colors duration-300" />,
    },
    {
      key: "project_management_service",
      icon: <FaProjectDiagram size={40} className="mx-auto text-red-500 transition-colors duration-300" />,
    },
    {
      key: "industrial_design",
      icon: (
        <MdOutlineDesignServices size={40} className="mx-auto text-teal-600 transition-colors duration-300" />
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h2 className="text-3xl lg:text-5xl">{t('in_demand_services')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-between items-center mt-8 lg:mt-16">
        {services.map((service, index) => (
          <div
            key={index}
            className="py-12 px-4 demand-services rounded-2xl text-center shadow-md cursor-pointer 
                       transition-colors duration-300 hover:bg-[#708238] hover:text-white"
          >
            <div className="pb-4 transition-colors duration-300">{service.icon}</div>
            <p className="text-lg font-semibold transition-colors duration-300">{t(service.key)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Demandservices;