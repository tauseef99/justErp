import React from "react";
import myImage from "../Assets/images/happy-young-woman.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaRegEnvelope, FaApple, FaFacebookF } from "react-icons/fa";

export default function SignInForm() {
  return (
    <div className="max-w-6xl w-full mx-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
      
      {/* Left Side ssection */}
      <div className="w-full md:w-1/2 bg-red-900 text-white p-6 md:p-10 flex flex-col justify-center space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">Success starts here</h1>
        <ul className="space-y-3 text-base md:text-lg font-medium">
          {[
            "Verified professionals at your service",
            "Post jobs and get matched instantly",
            "Flexible hiring for any budget",
          ].map((text, index) => (
            <li key={index} className="flex items-center">
              <span className="inline-block rounded-full w-6 h-6 flex items-center justify-center mr-3 text-white">
                ✓
              </span>
              {text}
            </li>
          ))}
        </ul>

        
        <div className="mt-6 hidden sm:block">
          <img
            src={myImage}
            alt="Woman working on laptop"
            className="w-full h-56 md:h-72 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Right Side secction */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
        <h2 className="text-xl md:text-2xl font-bold mb-3">
          Sign in to your account
        </h2>
        <p className="mb-5 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <button className="text-blue-600 underline hover:text-blue-800">
            Join here
          </button>
        </p>

        <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 mb-3 hover:bg-gray-50 text-sm">
          <FcGoogle className="w-5 h-5 mr-2" />
          Continue with Google
        </button>

        <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 mb-5 hover:bg-gray-50 text-sm">
          <FaRegEnvelope className="w-5 h-5 mr-2" />
          Continue with email/username
        </button>

        <div className="flex items-center justify-center text-gray-400 mb-5">
          <span className="border-b border-gray-300 w-14"></span>
          <span className="px-3">OR</span>
          <span className="border-b border-gray-300 w-14"></span>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
          <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 hover:bg-gray-50 text-sm">
            <FaApple className="w-5 h-5" />
            <span className="ml-2">Apple</span>
          </button>

          <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 hover:bg-gray-50 text-sm text-blue-600 font-semibold">
            <FaFacebookF className="w-5 h-5" />
            <span className="ml-2">Facebook</span>
          </button>
        </div>

        {/* test for role */}

          
        <p className="mt-6 text-xs text-gray-400">
          By joining, you agree to the Fiverr{" "}
          <span className="underline text-green-600 hover:text-green-700 cursor-pointer">
            Terms of Service
          </span>{" "}
          and to occasionally receive emails from us. Please read our{" "}
          <span className="underline text-green-600 hover:text-green-700 cursor-pointer">
            Privacy Policy
          </span>{" "}
          to learn how we use your personal data.
        </p>
      </div>
    </div>
  );
}
