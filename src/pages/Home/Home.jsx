import React from "react";
import Navbar from "../../Components/Navbar";
import Banner from "./Banner";
import TopPartners from "./TopPartners";

import AboutStudy from "./AboutStudy";
import Comment from "./Comment";
import { useLoaderData } from "react-router";

const Home = () => {
  const topPartner = useLoaderData();

  return (
    <div className="w-full text-neutral-content">
      <title>StudyMate - Home</title>
      <div className="lg:h-[300px] lg:py-0 py-10 my-5 bg-secondary flex items-center justify-center flex-col rounded-sm">
        <h1 className="lg:text-6xl text-2xl font-bold ">
          Study <span className="text-primary">Mate</span>
        </h1>
        <p className="text-center px-10 lg:py-5 py-2 md:text-xl text-sm text-gray-500">
          Find your perfect study partner, stay motivated, and achieve your
          academic goals together. <br />
          Connect with learners who share your passion and grow smarter,
          together.
        </p>
      </div>

      <Banner></Banner>

      <div className="lg:h-[300px] lg:py-0 py-10  my-5 bg-secondary flex items-center justify-center flex-col rounded-sm">
        <h1 className="lg:text-6xl text-2xl font-bold text-center ">
          Top Study <span className="text-primary">Partners</span>
        </h1>
        <p className="text-center lg:py-5 py-2 text-gray-500 md:text-xl text-sm">
          Meet the most active and dedicated learners from our community. Browse
          their profiles, discover your ideal match, and start collaborating
          today!
        </p>
      </div>

      <div className="2xl:w-[1536px] mx-auto grid grid-cols-1 gap-5 xl:grid-cols-3 rounded-sm my-20 lg:p-0 p-5">
        {topPartner.map((data) => (
          <TopPartners key={data._id} data={data}></TopPartners>
        ))}
      </div>

        <AboutStudy></AboutStudy>


      <div className="bg-secondary my-20 lg:py-20 py-5 ">
        <div className="w-full text-center my-10">
          <h2 className="lg:text-6xl text-2xl font-bold ">
            What Our Users Say
          </h2>
          <p className="md:text-xl text-sm text-gray-500 lg:mt-4 mt-2">
            Read the reviews and feedback from our study partners.
          </p>
        </div>
        <Comment></Comment>
      </div>
    </div>
  );
};

export default Home;
