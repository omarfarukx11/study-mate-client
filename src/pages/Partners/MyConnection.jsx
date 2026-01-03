import React, { use } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { FaRegStar } from "react-icons/fa";
import { useLoaderData } from "react-router";
import MyRequest from "./MyRequest";

const MyConnection = () => {
  const allPartners = useLoaderData();
   const { user } = use(AuthContext)


  const filteredRequests = allPartners.filter(
    req => req.userEmail === user.email
  );



  return (
    <div className="min-h-[calc(100vh-120px)] bg-secondary px-5 lg:px-0 mx-auto rounded-lg text-neutral-content">
      <title>StudyMate - MyConnection</title>
      <div className="lg:h-[200px] lg:py-0 py-10  bg-secondary flex items-center justify-center flex-col rounded-sm">
        <h1 className="lg:text-6xl text-2xl font-bold text-center ">
          My <span className="text-primary">Connections</span>
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
        allPartners.length === 0 ? <p className="bg-primary lg:text-5xl text-center font-semibold my-10 text-white p-10 rounded-sm"> You don’t have any connections yet.</p> :
        <table className="w-full roulg">
        <thead className="h-[100px] bg-primary text-white lg:text-2xl sm:text-sm text-[10px]">
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
          {filteredRequests.map((data, index) => (
            <MyRequest key={data._id} index={index} data={data}></MyRequest>
          ))}
        </tbody>
      </table>
      }
    </div>
  );
};

export default MyConnection;
