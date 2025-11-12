import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../Assets/images/logo-2.jpeg";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";

const Footer = () => {
  const { t, i18n } = useTranslation();

  const footerData = [
    {
      heading: t('footer_business_users'),
      links: [
        { name: t('hire_erp_consultant'), href: "/how_to_hire_erp_consultant" },
        { name: t('how_erp_works'), href: "/how/erp/works" },
        { name: t('faqs'), href: "/faq" },
      ],
    },
    {
      heading: t('footer_erp_freelancers'),
      links: [
        { name: t('join_freelancer'), href: "/join/as/consultant" },
        { name: t('justerps_project_teams'), href: "/erp/team" },
      ],
    },
    {
      heading: t('footer_categories'),
      links: [
        { name: t('erp_consultant'), href: "/join" },
        { name: t('data_migration'), href: "/join" },
        { name: t('business_intelligence_bi'), href: "/join" },
        { name: t('change_management'), href: "/join" },
        { name: t('end_user_trainers'), href: "/join" },
        { name: t('reporting'), href: "/join" },
        { name: t('grc'), href: "/join" },
        { name: t('business_analyst'), href: "/join" },
        { name: t('data_entry'), href: "/join" },
        { name: t('technical_consultant'), href: "/join" },
        { name: t('functional_consultant'), href: "/join" },
        { name: t('techno_functional_consultant'), href: "/join" },
        { name: t('project_manager'), href: "/join" },
        { name: t('team_lead'), href: "/join" },
        { name: t('view_all_categories'), href: "/join" },
      ],
    },
    {
      heading: t('footer_about_justerps'),
      links: [
        { name: t('justerps'), href: "/justerps" },
        { name: t('customer_support'), href: "/customer/services" },
        { name: t('privacy_policy'), href: "/terms/services" },
        { name: t('social_responsibility'), href: "/social/responsibility" },
        { name: t('referral_bonus'), href: "/referral/bonus" },
        { name: t('data_protection'), href: "/personal/data/protection" },
      ],
    },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="bg-white border-t border-gray-200 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-10 md:pt-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
            <img src={logo} className="w-48 rounded-lg" alt="JustERPs Logo" />
            <p className="text-black text-sm">
              © {new Date().getFullYear()} {t('company_name')}
            </p>
          </div>

          <div className="flex space-x-6 text-md text-black items-center">
            <a
              href="https://facebook.com/justerps"
              className="transition-colors duration-300 hover:text-[#FFA500]"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/justerps"
              className="transition-colors duration-300 hover:text-[#FFA500]"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/justerps"
              className="transition-colors duration-300 hover:text-[#FFA500]"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/company/justerps"
              className="transition-colors duration-300 hover:text-[#FFA500]"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

            <div className="flex items-center gap-2 text-black font-semibold transition-colors duration-300">
              <TfiWorld className="text-md" />
              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="appearance-none bg-transparent border-none focus:outline-none cursor-pointer"
                aria-label="Select language"
              >
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
                <option value="it">Italiano</option>
                <option value="nl">Nederlands</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;