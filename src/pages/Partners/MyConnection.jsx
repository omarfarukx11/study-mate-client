import React from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { FaRegStar } from "react-icons/fa";
import { useLoaderData } from "react-router";
import MyRequest from "./MyRequest";

const MyConnection = () => {
  const allPartners = useLoaderData();

  console.log(allPartners)


  return (
    <div className="overflow-x-auto 2xl:w-[1536px] mx-auto mb-10 ">
      <div className="lg:h-[300px] lg:py-0 py-10  my-5 bg-[#f5f5f5] flex items-center justify-center flex-col rounded-sm">
        <h1 className="lg:text-6xl text-2xl font-bold text-center ">
          My <span className="text-[#5BBC2E]">Connections</span>
        </h1>
        <p className="text-center lg:py-5 py-2 text-gray-500 text-sm">
          You are currently connected. Your connection is active and stable,
          allowing you to access all features seamlessly. <br />
           Data is secure and
          communication is reliable, ensuring a smooth experience while you are
          online.
        </p>
      </div>

      <table className="table w-full">
    
        <thead className="h-[100px] bg-[#5BBC2E] text-white text-2xl">
          <tr>
            <th>SL</th>
            <th>Partner Name</th>
            <th>Subject</th>
            <th>Study Mode</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
    
          {allPartners.map((data , index) => (
            <MyRequest key={data._id} index={index} data={data}></MyRequest>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyConnection;
