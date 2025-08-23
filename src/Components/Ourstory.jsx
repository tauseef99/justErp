import React from 'react';
import ourstory from "../Assets/images/our_story1.jpg";
import ourstory2 from "../Assets/images/our_story2.png";
import Footer from './Footer';
import Navbar from './Navbar';

export const Ourstory = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#708238] bg-opacity-10 px-4 py-2 rounded-full mb-6">
            <span className="text-[#708238] font-semibold uppercase tracking-wider text-sm">Our Journey</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Story</h1>
          <div className="w-24 h-1 bg-[#FFA500] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The journey of AMJ and the ERP marketplace revolution that's changing how businesses connect with specialized talent.
          </p>
        </div>
        
        {/* Hero Image */}
        <div className="mb-16 rounded-lg overflow-hidden shadow-lg border-4 border-white">
          <img 
            src={ourstory} 
            alt="ERP Marketplace Revolution" 
            className="w-full h-96 object-cover"
          />
        </div>
        
        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12 border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold text-[#708238] mb-8 text-center">
            The ERP Marketplace Revolution: AMJ's Journey to Bridge the Gap
          </h2>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              December 2007 marked a turning point for AMJ when he finally passed his
              SAP CRM certification on his third attempt - a triumph achieved through
              unwavering persistence and countless hours of self-study. This hard-won
              victory launched him into what would become a remarkable twenty-year
              career in ERP sales.
            </p>
            
            <p>
              As he navigated the industry, meeting thousands of
              ERP consultants across the globe, he began noticing a persistent problem
              that no one seemed to be solving. Year after year, AMJ observed the same frustrating pattern: businesses
              needing specialized SAP expertise for specific projects - whether system
              upgrades, custom report development, or process optimizations - found
              themselves forced into hiring full-time employees.
            </p>
            
            <div className="bg-[#FFA500] bg-opacity-5 p-6 rounded-lg border-l-4 border-[#FFA500]">
              <p className="italic text-gray-800">
                "This created unnecessary financial burdens for companies while leaving a wealth of
                independent ERP talent underutilized. Meanwhile, highly skilled
                consultants with decades of experience struggled to find freelance
                opportunities."
              </p>
            </div>
            
            <p>
              The human cost of this inefficiency became painfully clear to AMJ. He
              watched brilliant colleagues - experts in their fields - unable to
              monetize their hard-earned skills outside traditional employment. Some
              wanted to support their children's college education; others sought to
              share their knowledge with more organizations. The current system was
              failing both businesses and professionals alike.
            </p>
            
            <p>
              The breakthrough came during a conversation with a fellow consultant. As
              they discussed the challenges of finding project work, AMJ realized what
              the industry desperately needed: a global, digital marketplace
              specifically designed for ERP talent.
            </p>
            
            <p>
              This vision consumed AMJ. He pictured a marketplace that would transform
              the ERP landscape - giving businesses the agility to stay competitive
              while providing professionals the freedom to build their careers on
              their own terms. No more wasted potential. No more unnecessary expenses.
              Just efficient, mutually beneficial connections.
            </p>
             {/* Hero Image */}
        <div className="mb-16 rounded-lg overflow-hidden shadow-lg border-4 border-white">
          <img 
            src={ourstory2} 
            alt="ERP Marketplace Revolution" 
            className="w-full h-96 object-cover"
          />
        </div>
            
            <p>
              With this clear mission, AMJ set out to create what the industry had
              been missing for decades. This wouldn't just be another job board or
              freelancing site, but a specialized ecosystem built specifically for the
              unique needs of ERP professionals and the businesses that relied on
              them.
            </p>
            
            <p>
              The journey ahead would be challenging, but AMJ knew this solution could
              redefine how ERP work was done. After twenty years of witnessing the
              problem firsthand, he was ready to build the platform that would finally
              connect the world's SAP talent with the opportunities they deserved.
              The ERP revolution was about to begin.
            </p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-[#FFA500] hover:bg-[#e59400] text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
            Join Our Revolution
          </button>
          <p className="text-gray-500 text-sm mt-4">Be part of the change in ERP consulting</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};