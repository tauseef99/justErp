import React from "react";
import {
  FaProjectDiagram,
  FaCloud,
  FaAws,
  FaCogs,
  FaCube,
  FaLightbulb,
  FaExchangeAlt,
} from "react-icons/fa";
import { SiSap, SiApacheairflow } from "react-icons/si";
import { MdOutlineAnalytics, MdOutlineDesignServices } from "react-icons/md";

const services = [
  {
    name: "Business Intelligence",
    icon: <MdOutlineAnalytics size={40} className="mx-auto text-blue-600" />,
  },
  {
    name: "Data Migration",
    icon: <FaExchangeAlt size={40} className="mx-auto text-green-600" />,
  },
  {
    name: "Reporting",
    icon: <FaLightbulb size={40} className="mx-auto text-yellow-600" />,
  },
  {
    name: "Cloud Services",
    icon: <FaCloud size={40} className="mx-auto text-purple-600" />,
  },
  {
    name: "S/4HANA",
    icon: <SiSap size={40} className="mx-auto text-gray-700" />,
  },
  {
    name: "SAP ABAP",
    icon: <FaCogs size={40} className="mx-auto text-indigo-600" />,
  },
  {
    name: "SAP Basis",
    icon: <SiApacheairflow size={40} className="mx-auto text-pink-600" />,
  },
  {
    name: "AWS",
    icon: <FaAws size={40} className="mx-auto text-orange-500" />,
  },
  {
    name: "Project Management",
    icon: <FaProjectDiagram size={40} className="mx-auto text-red-500" />,
  },
  {
    name: "3D Industrial Design",
    icon: (
      <MdOutlineDesignServices size={40} className="mx-auto text-teal-600" />
    ),
  },
];

function Demandservices() {
  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h2 className="text-3xl lg:text-5xl">In-Demand Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-between items-center mt-8 lg:mt-16">
        {services.map((service, index) => (
          <div
            key={index}
            className="py-12 px-4 demand-services rounded-2xl text-center shadow-md cursor-pointer transition-shadow duration-300"
          >
            <div className="pb-4">{service.icon}</div>
            <p className="text-lg font-semibold">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Demandservices;
