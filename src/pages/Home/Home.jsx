import React from "react";
import Navbar from "../../Components/Navbar";
import Banner from "./Banner";
import TopPartners from "./TopPartners";
import AboutStudy from "./AboutStudy";
import Comment from "./Comment";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";

const Home = () => {
  const topPartner = useLoaderData();

  const quickSlide = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.175, 0.885, 0.32, 1.275],
      },
    },
  };
  const fastFadeUp = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };
  const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Each child will wait 0.1 seconds after the previous one starts
      staggerChildren: 0.1, 
      // This ensures the container itself doesn't wait to show children
      delayChildren: 0.1, 
    },
  },
};
  return (
    <div className="w-full text-neutral-content mt-5 overflow-x-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={quickSlide}
      >
        <Banner />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fastFadeUp}
        className="lg:h-[300px] lg:py-0 py-10 lg:px-10 my-5 bg-secondary flex items-center justify-center flex-col rounded-sm"
      >
        <h1 className="lg:text-6xl text-2xl font-bold text-center text-secondary-content">
          Top Study <span className="text-primary">Partners</span>
        </h1>
        <p className="text-center lg:py-5 py-2 text-secondary-content/70 md:text-xl text-sm max-w-3xl px-5">
          Meet the most active and dedicated learners from our community. Browse
          their profiles, discover your ideal match, and start collaborating
          today!
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="2xl:w-[1536px] lg:px-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:grid-cols-4 rounded-sm my-20 lg:p-0 p-5 overflow-hidden"
      >
        {topPartner.map((data) => (
          <motion.div
            key={data._id}
            variants={fastFadeUp}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <TopPartners data={data} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fastFadeUp}
      >
        <AboutStudy />
      </motion.div>

      {/* 5. Testimonials Section with Scale Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-secondary my-20 lg:py-20 py-5"
      >
        <div className="w-full text-center my-10 px-5">
          <h2 className="lg:text-6xl text-2xl font-bold text-secondary-content">
            What Our Users Say
          </h2>
          <p className="md:text-xl text-sm text-secondary-content/60 lg:mt-4 mt-2">
            Read the reviews and feedback from our study partners.
          </p>
        </div>
        <div className="2xl:w-[1536px] mx-auto">
          <Comment />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
