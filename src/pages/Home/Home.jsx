import React from "react";
import Navbar from "../../Components/Navbar";
import Banner from "./Banner";
import TopPartners from "./TopPartners";
import { useLoaderData } from "react-router";
import AboutStudy from "./AboutStudy";
import Comment from "./Comment";

const Home = () => {
  const topPartner = useLoaderData();

  return (
    <div>
      <div className="h-[300px]  my-5  bg-[#f5f5f5] flex items-center justify-center flex-col rounded-sm">
        <h1 className="text-6xl font-bold ">
          Study <span className="text-[#5BBC2E]">Mate</span>
        </h1>
        <p className="text-center py-5 text-gray-500">
          Find your perfect study partner, stay motivated, and achieve your
          academic goals together. <br />
          Connect with learners who share your passion and grow smarter,
          together.
        </p>
      </div>
      <Banner></Banner>
      <div className="h-[300px]  my-5 bg-[#f5f5f5] flex items-center justify-center flex-col rounded-sm">
        <h1 className="text-6xl font-bold ">
          Top Study <span className="text-[#5BBC2E]">Partners</span>
        </h1>
        <p className="text-center py-5 text-gray-500">
          Meet the most active and dedicated learners from our community. Browse
          their profiles, discover your ideal match, and start collaborating
          today!
        </p>
      </div>

      <div className="w-[1536px] mx-auto grid grid-cols-1 gap-5 lg:grid-cols-3 rounded-sm">
        {topPartner.map((data) => (
          <TopPartners key={data._id} data={data}></TopPartners>
        ))}
      </div>

      <AboutStudy></AboutStudy>

      <div className="bg-[#f5f5f5] my-20 py-20">
        <div className="w-full text-center my-10">
          <h2 className="text-6xl font-bold text-gray-800">
            What Our Users Say
          </h2>
          <p className="text-2xl text-gray-500 mt-4">
            Read the reviews and feedback from our study partners.
          </p>
        </div>
        <Comment></Comment>
      </div>
    </div>
  );
};

export default Home;
