import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="2xl:w-[1536px] mx-auto px-6 py-12 grid lg:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">
            Study<span className="text-[#5BBC2E]">Mate</span>
          </h1>
          <p className="text-gray-400">
            StudyMate is a platform that connects students with study partners to enhance learning and collaboration.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-[#5BBC2E] transition-colors duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#5BBC2E] transition-colors duration-300">
              <RiTwitterXFill />
            </a>
            <a href="#" className="hover:text-[#5BBC2E] transition-colors duration-300">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-[#5BBC2E] transition-colors duration-300">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col space-y-2">
          <h6 className="font-semibold text-white mb-2">Services</h6>
          <a href="#" className="hover:text-[#5BBC2E] transition-colors duration-300">Branding</a>
          <a href="#" className="hover:text-[#5BBC2E] transition-colors duration-300">Design</a>
          <a href="#" className="hover:text-[#5BBC2E] transition-colors duration-300">Marketing</a>
          <a href="#" className="hover:text-[#5BBC2E] transition-colors duration-300">Advertisement</a>
        </div>

        {/* Company */}
        <div className="flex flex-col space-y-2">
          <h6 className="font-semibold text-white mb-2">Company</h6>
          <a href="#" className="hover:text-[#5BBC2E] transition-colors duration-300">About Us</a>
          <a href="#" className="hover:text-[#5BBC2E] transition-colors duration-300">Contact</a>
          <a href="#" className="hover:text-[#5BBC2E] transition-colors duration-300">Jobs</a>
          <a href="#" className="hover:text-[#5BBC2E] transition-colors duration-300">Press Kit</a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-[#5BBC2E]"></div>
      <div className="bg-[#5BBC2E] mt-3 py-4 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} StudyMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
