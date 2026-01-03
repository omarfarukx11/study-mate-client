import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="2xl:w-[1536px] mx-auto px-6 py-12 grid lg:grid-cols-3 gap-8">

        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">
            Study<span className="text-primary">Mate</span>
          </h1>
          <p className="text-gray-400">
            StudyMate is a platform that connects students with study partners to enhance learning and collaboration.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-primary transition-colors duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              <RiTwitterXFill />
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              <FaInstagram />
            </a>
          </div>
        </div>


        <div className="flex flex-col space-y-2">
          <h6 className="font-semibold text-white mb-2">Services</h6>
          <Link  to={"/findPartner"} className="hover:text-primary transition-colors duration-300">Find Partner</Link>
          <Link  to={"/dashboard/create-partner"} className="hover:text-primary transition-colors duration-300">Create Partner</Link>
          <Link  to={"/blogs"} className="hover:text-primary transition-colors duration-300">Blogs</Link>
        </div>


        <div className="flex flex-col space-y-2">
          <h6 className="font-semibold text-white mb-2">Company</h6>
          <Link  to={"/aboutUs"} className="hover:text-primary transition-colors duration-300">About Us</Link>
          <Link  to={"/contract"} className="hover:text-primary transition-colors duration-300">Contact</Link>
          <Link  to={"/privacy-policy"} className="hover:text-primary transition-colors duration-300">Privecy Policy</Link>
        </div>
      </div>


      <div className="border-t-2 border-primary"></div>
      <div className="bg-primary mt-3 py-4 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} StudyMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
