import React from "react";
import { MdApps } from "react-icons/md";
import { FaProjectDiagram, FaLanguage, FaGlobeAmericas } from "react-icons/fa";
import CountUp from "react-countup";

const statsData = [
  {
    icon: <MdApps size={40} className="mx-auto text-[#C44251]" />,
    number: 47,
    suffix: "+", // optional suffix
    description: "More than 200 + ERPS",
  },
  {
    icon: <FaProjectDiagram size={40} className="mx-auto text-[#C44251]" />,
    number: 1200,
    suffix: "+",
    description: "Consulting Categories",
  },
  {
    icon: <FaLanguage size={40} className="mx-auto text-[#C44251]" />,
    number: 49,
    suffix: "",
    description: "Languages known by consultants",
  },
  {
    icon: <FaGlobeAmericas size={40} className="mx-auto text-[#C44251]" />,
    number: 450,
    suffix: "+",
    description: "Worldwide consultants",
  },
];

function Community() {
  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-between">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="py-12 px-4 demand-services rounded-2xl text-center shadow-md cursor-pointer transition-shadow duration-300"
          >
            <p>{item.icon}</p>
            <h6 className="py-6 text-[#315F6F] text-5xl font-bold">
              <CountUp
                start={0}
                end={item.number}
                duration={2}
                separator=","
                suffix={item.suffix}
              />
            </h6>
            <p className="font-semibold text-lg italic">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
