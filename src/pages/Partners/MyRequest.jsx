import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";

const MyRequest = ({ data, index }) => {
  const { partnerId: id } = data;
  const axiosInstance = useAxios();
  const [reqData, setReqData] = useState([]);

    const {name , profileImage , subject , studyMode , location } = reqData

  useEffect(() => {
    axiosInstance
      .get(`/findPartner/${id}`)
      .then((data) => {
        setReqData(data.data);
      })
      .catch((err) => console.error("Error fetching partner:", err));
  }, [axiosInstance, id]);

const handleDelete = () => {
  console.log('hello delete')
}





  return (
<tr className="h-24 hover:bg-gray-100 transition duration-200">
  <th>{index + 1}</th>
  <td>
    <div className="flex items-center gap-3 h-full">
      <div className="avatar">
        <div className="mask rounded-[50%] h-16 w-16">
          <img src={profileImage} alt="Avatar" />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="font-bold">{name}</div>
        <div className="text-sm opacity-50">{location}</div>
      </div>
    </div>
  </td>
  <td>{subject}</td>
  <td>{studyMode}</td>
  <td>
    <button className="btn bg-[#5BBC2E] hover:bg-[#4DA626] text-white transition duration-200">
      Update
    </button>
  </td>
  <td>
    <button onClick={handleDelete} className="btn bg-red-700 hover:bg-red-800 text-white transition duration-200">
      Delete
    </button>
  </td>
</tr>


  );
};

export default MyRequest;
