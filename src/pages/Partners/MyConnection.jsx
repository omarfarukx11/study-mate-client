import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { FaRegStar } from "react-icons/fa";

const MyConnection = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axiosInstance
      .get(`/request?userEmail=${user.email}`)
      .then((res) => {
        const userRequests = res.data;

        const partnerPromises = userRequests.map((request) =>
          axiosInstance.get(`/studyPartner/${request.partnerId}`).then((partnerRes) => ({
            ...request,
            partnerData: partnerRes.data,
          }))
        );

        Promise.all(partnerPromises)
          .then((mergedData) => setRequests(mergedData))
          .catch((err) => console.error("Failed to fetch partner data", err));
      })
      .catch((err) => console.error("Failed to fetch requests", err));
  }, [user, axiosInstance]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 w-full">
      <h1 className="text-4xl font-bold text-green-500 mb-8 text-center">
        My Connections
      </h1>

      {requests.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">No requests sent yet.</p>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {requests.map((request, index) => {
            const data = request.partnerData;
            const bgColor = index % 2 === 0 ? "bg-white" : "bg-gray-50";

            return (
              <div
                key={request._id}
                className={`${bgColor} rounded-lg shadow-md p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition hover:shadow-lg`}
              >
                {/* Serial Number */}
                <div className="text-gray-700 font-semibold md:w-8">{index + 1}</div>

                {/* Avatar + Name + Email */}
                <div className="flex items-center gap-3 md:w-1/3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={data.profileImage || "https://via.placeholder.com/40"}
                        alt={data.name}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{data.name}</div>
                    <div className="text-sm opacity-50">{data.email}</div>
                  </div>
                </div>

                {/* Subject */}
                <div className="md:w-1/6 mt-2 md:mt-0">
                  <span className="badge badge-ghost">{data.subject || "N/A"}</span>
                </div>

                {/* Study Mode */}
                <div className="md:w-1/6 mt-2 md:mt-0">
                  <span className="badge badge-info">{data.studyMode || "N/A"}</span>
                </div>

                {/* Skill */}
                <div className="md:w-1/6 mt-2 md:mt-0">
                  <span className="badge badge-success">{data.skill || "N/A"}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 md:w-1/6 mt-2 md:mt-0">
                  <FaRegStar className="text-yellow-500" /> {data.rating || "N/A"}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 md:w-1/4 mt-2 md:mt-0">
                  <button className="btn btn-sm bg-green-500 text-white hover:bg-white hover:text-green-500 hover:border hover:border-green-500 transition-all duration-300">
                    Update
                  </button>
                  <button className="btn btn-sm bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border hover:border-red-500 transition-all duration-300">
                    Cancel Request
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyConnection;
