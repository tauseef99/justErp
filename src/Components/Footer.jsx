import React from "react";
import logo from "../Assets/images/logo.jpeg";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { TfiWorld, TfiLayoutAccordionSeparated } from "react-icons/tfi";

const footerData = [
  {
    heading: "Categories",
    links: [
      { name: "ERP Solutions", href: "/categories/erp-solutions" },
      { name: "CRM Services", href: "/categories/crm-services" },
      { name: "HR Management", href: "/categories/hr-management" },
      { name: "Accounting Tools", href: "/categories/accounting" },
    ],
  },
  {
    heading: "For Clients",
    links: [
      { name: "Explore Services", href: "/services" },
      { name: "Post a Project", href: "/projects" },
      { name: "Community Hub", href: "/community" },
      { name: "Client Success", href: "/success-stories" },
    ],
  },
  {
    heading: "For Freelancers",
    links: [
      { name: "Join as Partner", href: "/join" },
      { name: "Freelancer Guide", href: "/freelancers-guide" },
      { name: "Help & Support", href: "/help" },
      { name: "Contact Support", href: "/contact" },
    ],
  },
  {
    heading: "Business Solutions",
    links: [
      { name: "justERPs for Teams", href: "/business" },
      { name: "Enterprise ERP", href: "/enterprise" },
      { name: "Integration Services", href: "/integrations" },
      { name: "Dedicated Managers", href: "/managers" },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "About justERPs", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press & News", href: "/press" },
      { name: "Investor Relations", href: "/investors" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-10 md:pt-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {footerData.map((section, index) => (
            <div key={index}>
              <h4 className="text-gray-800 font-semibold mb-4">
                {section.heading}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="hover:underline">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-3 items-center">
                    <img src={logo} className="h-10 rounded-lg"/>
            <p className="text-black text-sm">
              © {new Date().getFullYear()} justERPs International Ltd.
            </p>
          </div>

          <div className="flex space-x-6 text-md text-black items-center">
            <a
              href="https://facebook.com/justerps"
              className="hover:text-[#1dbf73]"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/justerps"
              className="hover:text-[#1dbf73]"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/justerps"
              className="hover:text-[#1dbf73]"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/company/justerps"
              className="hover:text-[#1dbf73]"
            >
              <FaLinkedinIn />
            </a>

            <div className="flex items-center cursor-pointer hover:text-[#1dbf73] gap-2 text-gray-500 font-semibold">
              <TfiWorld className="text-md " />
              <p>English</p>
            </div>

            <div className="flex items-center cursor-pointer gap-2 hover:text-[#1dbf73] text-gray-500 font-semibold">
              <span>PKR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
