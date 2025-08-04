import React from "react";
import { SiSap, SiOracle, SiSage, SiSalesforce } from "react-icons/si";
import { FaMicrosoft, FaCog } from "react-icons/fa"; // FaCog used for Infor

const platforms = [
  { name: "SAP", icon: <SiSap className="text-green-800 text-6xl mx-auto" /> },
  {
    name: "Oracle",
    icon: <SiOracle className="text-red-600 text-6xl mx-auto" />,
  },
  {
    name: "Microsoft",
    icon: <FaMicrosoft className="text-blue-600 text-6xl mx-auto" />,
  },
  {
    name: "Sage",
    icon: <SiSage className="text-green-600 text-6xl mx-auto" />,
  },
  { name: "Infor", icon: <FaCog className="text-gray-600 text-6xl mx-auto" /> }, // Replaced with a gear icon
  {
    name: "Salesforce",
    icon: <SiSalesforce className="text-sky-600 text-6xl mx-auto" />,
  },
];

function Popularservices() {
  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h2 className="text-3xl lg:text-5xl">Popular ERP Platforms</h2>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className="bg-[#003912] rounded-2xl text-center pt-4"
          >
            <h3 className="text-white font-semibold text-xl pt-4">
              {platform.name}
            </h3>
            <div className="bg-white m-4 rounded-2xl mt-6 py-8 flex justify-center items-center">
              {platform.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popularservices;
