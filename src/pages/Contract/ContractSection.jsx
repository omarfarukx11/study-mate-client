import React from "react";
import { motion } from "framer-motion";
import {
  IoMailSharp,
  IoCallSharp,
  IoLocationSharp,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoInstagram,
} from "react-icons/io5";

const ContactSection = () => {
  return (
    <section className="relative py-24 bg-base-100 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          {/* Left Side: Contact Info Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 bg-secondary p-10 rounded-[2.5rem] text-secondary-content relative overflow-hidden shadow-2xl"
          >
            {/* Inner Glow for Glass Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />

            <h2 className="text-4xl font-bold mb-6">Let's Talk!</h2>
            <p className="opacity-80 text-lg mb-12">
              Have a question about study partners or want to suggest a feature?
              Drop us a line.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <IoMailSharp size={24} />
                </div>
                <div>
                  <p className="text-sm opacity-60 uppercase font-bold tracking-widest">
                    Email Us
                  </p>
                  <p className="text-xl font-semibold">hello@studymate.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <IoCallSharp size={24} />
                </div>
                <div>
                  <p className="text-sm opacity-60 uppercase font-bold tracking-widest">
                    Call Us
                  </p>
                  <p className="text-xl font-semibold">+1 (800) STUDY-NOW</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-20 flex gap-4">
              {[IoLogoLinkedin, IoLogoTwitter, IoLogoInstagram].map(
                (Icon, idx) => (
                  <motion.a
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-secondary transition-colors cursor-pointer"
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              )}
            </div>
          </motion.div>

          {/* Right Side: Modern Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 bg-base-100 p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-base-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Name Input */}
              <div className="form-control group">
                <label className="label">
                  <span className="label-text font-bold text-neutral group-focus-within:text-primary transition-colors">
                    Full Name
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered w-full bg-base-200/50 border-none focus:ring-2 focus:ring-primary/20 focus:bg-base-100 transition-all h-14 rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-focus-within:w-full transition-all duration-300 rounded-b-xl" />
                </div>
              </div>

              {/* Email Input */}
              <div className="form-control group">
                <label className="label">
                  <span className="label-text font-bold text-neutral group-focus-within:text-primary transition-colors">
                    Email Address
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="input input-bordered w-full bg-base-200/50 border-none focus:ring-2 focus:ring-primary/20 focus:bg-base-100 transition-all h-14 rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-focus-within:w-full transition-all duration-300 rounded-b-xl" />
                </div>
              </div>

              {/* Textarea */}
              <div className="form-control md:col-span-2 group">
                <label className="label">
                  <span className="label-text font-bold text-neutral group-focus-within:text-primary transition-colors">
                    Tell us about your goals
                  </span>
                </label>
                <div className="relative">
                  <textarea
                    className="textarea textarea-bordered w-full bg-base-200/50 border-none focus:ring-2 focus:ring-primary/20 focus:bg-base-100 transition-all min-h-[150px] rounded-xl p-4"
                    placeholder="I am looking for a partner for..."
                  ></textarea>
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-focus-within:w-full transition-all duration-300 rounded-b-xl" />
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-sm text-neutral/50 max-w-[250px]">
                By sending this message, you agree to our privacy policy.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg rounded-2xl px-12 text-white border-none shadow-lg shadow-primary/20"
              >
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
