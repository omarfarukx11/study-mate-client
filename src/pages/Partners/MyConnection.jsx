import React from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { FaRegStar } from "react-icons/fa";
import { useLoaderData } from "react-router";
import MyRequest from "./MyRequest";

const MyConnection = () => {
  const allPartners = useLoaderData();
  
  console.log(allPartners.length)

  return (
    <div className="w-[1536px] min-h-screen px-5 lg:px-0 mx-auto mb-10 rounded-lg ">
      <title>StudyMate - MyConnection</title>
      <div className="lg:h-[200px] lg:py-0 py-10  my-5 bg-[#f5f5f5] flex items-center justify-center flex-col rounded-sm">
        <h1 className="lg:text-6xl text-2xl font-bold text-center ">
          My <span className="text-[#5BBC2E]">Connections</span>
        </h1>
        <p className="text-center lg:py-5 py-2 text-gray-500 text-sm">
          You can manage your partner requests easily. Edit the
          details of any request whenever you need. <br />
           Delete requests that are no
          longer relevant. Keep your study partners list up-to-date and
          organized.
        </p>
      </div>

      {
        allPartners.length === 0 ? <p className="bg-[#5bbc2e] lg:text-5xl text-center font-semibold my-10 text-white p-10 rounded-sm"> You don’t have any connections yet.</p> :
        <table className="w-full roulg">
        <thead className="h-[100px] bg-[#5BBC2E] text-white lg:text-2xl sm:text-sm text-[10px]">
          <tr className="text-[10px] sm:text-sm">
            <th>SL</th>
            <th>Partner Name</th>
            <th>Subject</th>
            <th>Study Mode</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {allPartners.map((data, index) => (
            <MyRequest key={data._id} index={index} data={data}></MyRequest>
          ))}
        </tbody>
      </table>
      }
    </div>
  );
};

export default MyConnection;
