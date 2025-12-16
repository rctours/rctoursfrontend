// TopBar.jsx
import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="fixed top-15 left-0 right-0 w-full bg-lime-900 text-gray-100 text-sm z-[999]">
      <div className="max-w-screen flex items-center justify-center flex-wrap gap-20 px-1 py-1.5">

        <div className="flex items-center gap-1 sm:gap-1 md:gap-20">

          {/* Phone (clickable) */}
          <a href="tel:+919172271464" className="flex items-center gap-1 text-white">
            <FaPhoneAlt />  <span className="text-sm xm:text-[10px]">+91 9172271464</span> 
          </a>

          {/* Email (clickable) */}
          <a href="mailto:rctoursandtravels01@gmail.com" className="flex items-center gap-1 text-white">
            <FaEnvelope /> <span className="text-sm xm:text-[10px]">rctoursandtravels01@gmail.com</span> 
          </a>

        </div>

      </div>
    </div>
  );
};

export default TopBar;
