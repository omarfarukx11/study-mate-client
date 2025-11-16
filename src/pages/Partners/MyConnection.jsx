import React from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { FaRegStar } from "react-icons/fa";
import { useLoaderData } from "react-router";
import MyRequest from "./MyRequest";

const MyConnection = () => {
  const allPartners = useLoaderData();

  return (
    <div className=" 2xl:w-[1536px] min-h-screen px-5 lg:px-0 mx-auto mb-10 ">
      <title>StudyMate - MyConnection</title>
      <div className="lg:h-[200px] lg:py-0 py-10  my-5 bg-[#f5f5f5] flex items-center justify-center flex-col rounded-sm">
        <h1 className="lg:text-6xl text-2xl font-bold text-center ">
          My <span className="text-[#5BBC2E]">Connections</span>
        </h1>
        <p className="text-center lg:py-5 py-2 text-gray-500 text-sm">
          ChatGPT said: You can manage your partner requests easily. Edit the
          details of any request whenever you need. <br />
           Delete requests that are no
          longer relevant. Keep your study partners list up-to-date and
          organized.
        </p>
      </div>

      <table className="table full  ">
        <thead className="h-[100px] bg-[#5BBC2E] text-white lg:text-2xl text-[10px]">
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
          {allPartners.map((data, index) => (
            <MyRequest key={data._id} index={index} data={data}></MyRequest>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyConnection;
