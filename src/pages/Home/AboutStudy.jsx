import React from "react";
import { FaBook } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { IoPersonAddSharp } from "react-icons/io5";

const AboutStudy = () => {
  return (
    <section className="bg-[#F5F5F5] py-16 my-10">
      <div className="w-[1536px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-6xl font-bold mb-3">How It Works</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Study Mate makes it easy to find your ideal partner and stay productive together. 
            Here’s how it works in just a few simple steps:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="card bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-transform hover:scale-105 duration-300">
            <div className="card-body items-center text-center p-8 my-10">
              <div className="text-6xl text-primary mb-4">
                <IoPersonAddSharp />
              </div>
              <h3 className="card-title text-2xl font-semibold mb-3">
                1. Create Your Profile
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Sign up and share your study interests, goals, and skills to match with the right partner.
              </p>
            </div>
          </div>


          <div className="card bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-transform hover:scale-105 duration-300">
            <div className="card-body items-center text-center p-8 my-10">
              <div className="text-6xl text-primary mb-4">
                <FcSearch />
              </div>
              <h3 className="card-title text-2xl font-semibold mb-3">
                2. Find a Partner
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Browse through our study community and connect with learners who match your goals.
              </p>
            </div>
          </div>

          <div className="card bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-transform hover:scale-105 duration-300">
            <div className="card-body items-center text-center p-8 my-10">
              <div className="text-6xl text-primary mb-4">
                <FaBook />
              </div>
              <h3 className="card-title text-2xl font-semibold mb-3">
                3. Study Together
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Chat, collaborate, and achieve your study goals together — anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStudy;
