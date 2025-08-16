import React, { useState } from "react";
import { FaStar, FaTimes, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCard = ({ item, onClick }) => (
  <div 
    className="min-w-[260px] max-w-[260px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    onClick={() => onClick(item)}
  >
    <div className="relative">
      <img src={item.img} alt={item.title} className="w-full h-44 object-cover" />
      <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
        <FaHeart className="text-gray-500 hover:text-[#FFA500]" />
      </button>
    </div>
    <div className="p-4">
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-800 leading-tight mb-1 hover:text-[#708238] transition-colors duration-200">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 mb-1">{item.provider}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">From ${item.price}</p>
        </div>
      </div>
      <div className="flex items-center text-[#FFA500] text-xs mb-1">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar key={i} className={i < Math.floor(item.rating) ? "text-[#FFA500]" : "text-gray-300"} />
        ))}
        <span className="text-gray-600 ml-2">({item.reviews})</span>
      </div>
    </div>
  </div>
);

const GigModal = ({ gig, onClose }) => {
  if (!gig) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-800">{gig.title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Gig Details */}
            <div className="lg:w-2/3">
              <div className="mb-6">
                <img 
                  src={gig.img} 
                  alt={gig.title} 
                  className="w-full h-72 object-cover rounded-xl"
                />
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">About This Gig</h3>
                <p className="text-gray-600 mb-4">{gig.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {gig.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-3">What's Included</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Custom ERP solution tailored to your business</li>
                    <li>Full setup and configuration</li>
                    <li>Integration with existing systems</li>
                    <li>Training session for your team</li>
                    <li>30 days of technical support</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Right Column - Order & Contact */}
            <div className="lg:w-1/3">
              <div className="border border-gray-200 rounded-xl p-5 shadow-sm sticky top-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Basic Package</h3>
                    <p className="text-gray-600 text-sm">Essential services to get started</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">${gig.price}</p>
                    <p className="text-gray-500 text-sm">Delivery: {gig.delivery}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-[#708238] mr-2 mt-1">✓</span>
                      <span>Custom ERP solution setup</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#708238] mr-2 mt-1">✓</span>
                      <span>Basic configuration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#708238] mr-2 mt-1">✓</span>
                      <span>1 round of revisions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#708238] mr-2 mt-1">✓</span>
                      <span>Documentation provided</span>
                    </li>
                  </ul>
                </div>
                
                <button className="w-full bg-[#708238] hover:bg-[#5a6a2d] text-white font-bold py-3 rounded-lg transition-colors duration-300 mb-4 flex items-center justify-center">
                  <FaShoppingCart className="mr-2" />
                  Continue (${gig.price})
                </button>
                
                <div className="text-center mb-4">
                  <p className="text-gray-500 text-sm">or</p>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">{gig.provider}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-[#FFA500] mr-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar key={i} className={i < Math.floor(gig.rating) ? "text-[#FFA500]" : "text-gray-300"} size={14} />
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm">({gig.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <button className="w-full border border-[#708238] text-[#708238] hover:bg-[#708238]/10 font-medium py-2 rounded-lg transition-colors duration-300">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BuyerDashboard() {
  const [selectedGig, setSelectedGig] = useState(null);
  
  const recentServices = [
    {
      id: 1,
      title: "Inventory Dashboard Setup",
      provider: "ERP Solutions Pro",
      rating: 4.9,
      reviews: 48,
      price: 120,
      delivery: "1 day",
      img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/282562225/original/6f38c5d851dcebf8718cab05c0e9416a898ad0ab.jpg",
      description: "Professional ERP inventory dashboard setup with real-time tracking and analytics. Customizable to your business needs with seamless integration.",
      tags: ["ERP", "Dashboard", "Analytics", "Inventory"]
    },
    {
      id: 2,
      title: "Sales & Invoicing Integration",
      provider: "NextGen ERP",
      rating: 5.0,
      reviews: 32,
      price: 150,
      delivery: "2 days",
      img: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/282512141/original/05ac3ede242c4774568b26922c3a5889a73e4597/automate-excel-with-macros-and-vba.png",
      description: "Seamless integration of sales and invoicing systems into your ERP. Automate billing, track payments, and generate financial reports effortlessly.",
      tags: ["Sales", "Invoicing", "Integration", "Automation"]
    },
    {
      id: 3,
      title: "Customer CRM Development",
      provider: "CRM Experts",
      rating: 4.8,
      reviews: 27,
      price: 110,
      delivery: "3 days",
      img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/183271274/original/f7588b5f12d1b1beaa1fd53a43e76f54f7d988c5.png",
      description: "Custom CRM solution tailored for your ERP system. Manage customer relationships, track interactions, and automate follow-ups.",
      tags: ["CRM", "Customer", "Development", "Integration"]
    },
    {
      id: 4,
      title: "Warehouse Management Module",
      provider: "WarehouseSoft",
      rating: 5.0,
      reviews: 21,
      price: 100,
      delivery: "4 days",
      img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/430593360/original/aad653ca444f92e02436633d7d72cdff46f888cc.png",
      description: "Comprehensive warehouse management module for your ERP. Track inventory, manage shipments, and optimize storage space.",
      tags: ["Warehouse", "Inventory", "Management", "Logistics"]
    },
  ];

  const inspiredServices = [
    {
      id: 5,
      title: "HR & Payroll Automation",
      provider: "SmartERP HR",
      rating: 4.7,
      reviews: 39,
      price: 130,
      delivery: "2 days",
      img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/106371679/original/f2d110667a924518aad3e8eb58895089885df3db.jpg",
      description: "Automate HR processes and payroll management with our ERP solution. Handle employee data, attendance, and salary processing efficiently.",
      tags: ["HR", "Payroll", "Automation", "Management"]
    },
    {
      id: 6,
      title: "Vendor Portal Integration",
      provider: "ERP Gateway",
      rating: 4.9,
      reviews: 22,
      price: 95,
      delivery: "1 day",
      img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/412787028/original/2f0a82655996dad9f99a482fb4cc12d3f4b776f2.jpg",
      description: "Connect with your vendors through a dedicated portal integrated with your ERP. Streamline procurement and vendor communications.",
      tags: ["Vendor", "Portal", "Integration", "Procurement"]
    },
    {
      id: 7,
      title: "Advanced Reporting Setup",
      provider: "ERP Insights",
      rating: 5.0,
      reviews: 30,
      price: 145,
      delivery: "3 days",
      img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/393706220/original/07162045d4d1cbb35f45a1de9be2c9d10ccec11f.jpg",
      description: "Create powerful custom reports for your ERP system. Visualize data, track KPIs, and make informed business decisions.",
      tags: ["Reporting", "Analytics", "Dashboard", "Business Intelligence"]
    },
    {
      id: 8,
      title: "Multi-Branch Inventory Sync",
      provider: "BranchSync Tech",
      rating: 4.6,
      reviews: 18,
      price: 125,
      delivery: "2 days",
      img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/388330322/original/b541f81d01dd1fe857c2cfa5ee4cfb5c65fc6f20.png",
      description: "Synchronize inventory across multiple branches in real-time. Prevent stockouts and optimize inventory distribution.",
      tags: ["Inventory", "Multi-branch", "Sync", "Real-time"]
    },
  ];

  const handleGigClick = (gig) => {
    setSelectedGig(gig);
  };
  
  const closeModal = () => {
    setSelectedGig(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="container mx-auto px-4 py-8">
        <GigModal gig={selectedGig} onClose={closeModal} />

        {/* Welcome Section */}
        <div className="relative bg-gradient-to-r from-[#708238]/10 to-[#FFA500]/10 rounded-3xl shadow-md p-8 mb-12 overflow-hidden border border-white">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              👋 Welcome back, Abdul Raziq
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
              {/* Card 1 */}
              <div className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 flex items-start gap-4 border border-gray-100 hover:border-[#708238]/30">
                <div className="bg-[#708238]/10 text-[#708238] p-3 rounded-full shadow-sm group-hover:bg-[#708238]/20 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-base">Post a Project Brief</p>
                  <p className="text-gray-500 text-xs">Get custom proposals from vetted professionals.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 flex items-start gap-4 border border-gray-100 hover:border-[#FFA500]/30">
                <div className="bg-[#FFA500]/10 text-[#FFA500] p-3 rounded-full shadow-sm group-hover:bg-[#FFA500]/20 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-base">Reply to Kathy Ky</p>
                  <p className="text-gray-500 text-xs">“I'll check and let you know” – 2 years ago</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 flex items-start gap-4 border border-gray-100 hover:border-[#708238]/30">
                <div className="bg-[#708238]/10 text-[#708238] p-3 rounded-full shadow-sm group-hover:bg-[#708238]/20 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16l-4-4H4a1 1 0 01-1-1V4z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-base">Customize Your Experience</p>
                  <p className="text-gray-500 text-xs">Tailor Fiverr to your business needs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Element */}
          <div className="absolute right-4 bottom-4 z-0 opacity-10 hidden md:block pointer-events-none">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
              alt="Decorative"
              className="w-40 h-40 object-contain"
            />
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Pick up where you left off</h2>
            <Link className="text-[#708238] hover:text-[#5a6a2d] font-medium text-sm">See all</Link>
          </div>
          <div className="flex overflow-x-auto gap-6 scrollbar-hide pb-2">
            {recentServices.map((item) => (
              <ServiceCard key={item.id} item={item} onClick={handleGigClick} />
            ))}
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Inspired by your ERP usage</h2>
            <Link className="text-[#708238] hover:text-[#5a6a2d] font-medium text-sm">See all</Link>
          </div>
          <div className="flex overflow-x-auto gap-6 scrollbar-hide pb-2">
            {inspiredServices.map((item) => (
              <ServiceCard key={item.id} item={item} onClick={handleGigClick} />
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Top-rated ERP Experts</h2>
            <Link className="text-[#708238] hover:text-[#5a6a2d] font-medium text-sm">See all</Link>
          </div>
          <div className="flex overflow-x-auto gap-6 scrollbar-hide pb-2">
            {[
              {
                id: 9,
                title: "Custom ERP Workflow Build",
                provider: "ProFlow Systems",
                rating: 5.0,
                reviews: 64,
                price: 160,
                delivery: "3 days",
                img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/350634094/original/8f3b9c7748031d52630453ef078da9fbaef1994d.jpg",
                description: "Build custom workflows for your ERP system to automate business processes and increase efficiency.",
                tags: ["Workflow", "Automation", "Custom", "ERP"]
              },
              {
                id: 10,
                title: "Data Migration to ERPNext",
                provider: "SmoothTransfer Co",
                rating: 4.9,
                reviews: 40,
                price: 140,
                delivery: "4 days",
                img: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/359002193/original/784e722490e7867dd813c47a78dbd5f93158f87c/migrate-and-update-frappe-and-erpnext.png",
                description: "Seamless data migration to ERPNext with zero downtime. Transfer all your business data safely and efficiently.",
                tags: ["Data Migration", "ERPNext", "Transfer", "Database"]
              },
              {
                id: 13,
                title: "ERP Custom Dashboard",
                provider: "DashPro Solutions",
                rating: 4.8,
                reviews: 52,
                price: 155,
                delivery: "2 days",
                img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/333467550/original/54bb9ddf59e88376b54f021addc8999f515c4301.jpg",
                description: "Create custom dashboards for your ERP system to visualize key metrics and business performance.",
                tags: ["Dashboard", "Analytics", "Custom", "Visualization"]
              },
              {
                id: 14,
                title: "Advanced ERP Reporting",
                provider: "ERP Insights",
                rating: 5.0,
                reviews: 38,
                price: 170,
                delivery: "3 days",
                img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/346612141/original/d18984b541730d630483aab8261a9492eeb7c27b.png",
                description: "Advanced reporting solutions for your ERP with custom templates and automated report generation.",
                tags: ["Reporting", "Analytics", "Business Intelligence", "Automation"]
              },
            ].map((item) => (
              <ServiceCard key={item.id} item={item} onClick={handleGigClick} />
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Automations You May Need</h2>
            <Link className="text-[#708238] hover:text-[#5a6a2d] font-medium text-sm">See all</Link>
          </div>
          <div className="flex overflow-x-auto gap-6 scrollbar-hide pb-2">
            {[
              {
                id: 11,
                title: "Automate Purchase Approvals",
                provider: "AutoERP AI",
                rating: 4.8,
                reviews: 29,
                price: 115,
                delivery: "2 days",
                img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/307131632/original/95fe48b82afe379277cca1b2aad6b24d745d8d52.jpg",
                description: "Automate your purchase approval workflows to save time and reduce manual intervention.",
                tags: ["Automation", "Purchase", "Approvals", "Workflow"]
              },
              {
                id: 12,
                title: "Real-time Inventory Reordering",
                provider: "SmartStock",
                rating: 5.0,
                reviews: 33,
                price: 135,
                delivery: "1 day",
                img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/433612033/original/4095563b840c3947bedfa4ddc4a4beff06f0ff16.jpg",
                description: "Set up real-time inventory reordering based on stock levels to prevent stockouts.",
                tags: ["Inventory", "Reordering", "Real-time", "Automation"]
              },
              {
                id: 15,
                title: "Automated Sales Invoicing",
                provider: "QuickBill",
                rating: 4.9,
                reviews: 42,
                price: 125,
                delivery: "1 day",
                img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/358327642/original/5f1bf72e5c4cbd69f4a0c2c86ce3c2fab8865217.jpg",
                description: "Automate your sales invoicing process to generate and send invoices immediately after sales.",
                tags: ["Invoicing", "Automation", "Sales", "Billing"]
              },
              {
                id: 16,
                title: "Scheduled Report Emails",
                provider: "AutoReports",
                rating: 4.7,
                reviews: 21,
                price: 110,
                delivery: "2 days",
                img: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/283613187/original/e188666db55c8dc50d0936a3cfc31ce330109cd2.png",
                description: "Set up scheduled email reports from your ERP to keep stakeholders informed automatically.",
                tags: ["Reports", "Automation", "Email", "Scheduling"]
              },
            ].map((item) => (
              <ServiceCard key={item.id} item={item} onClick={handleGigClick} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}