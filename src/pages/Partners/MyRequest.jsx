import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const MyRequest = ({ data, index }) => {
  const { partnerId: id, _id: ID } = data;
  const axiosInstance = useAxios();
  const [reqData, setReqData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/findPartner/${id}`)
      .then((res) => setReqData(res.data))
      .catch((err) => console.error("Error fetching partner:", err));
  }, [axiosInstance, id]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/request/${ID}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire("Deleted!", "Your request has been deleted.", "success");
            setReqData(null);
          }
        });
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      name: form.name.value,
      profileImage: form.profileImage.value,
      subject: form.subject.value,
      studyMode: form.studyMode.value,
      location: form.location.value,
    };

    const res = await axiosInstance.patch(`/updatePartner/${id}`, updatedData);

    if (res.data.success) {
      Swal.fire("Updated!", "Partner info updated successfully.", "success");
      setReqData((prev) => ({ ...prev, ...updatedData }));
      setIsModalOpen(false);
    } else {
      Swal.fire("No changes made!", res.data.message, "info");
    }
  };

  if (!reqData) return null;

  const { name, profileImage, subject, studyMode, location } = reqData;

  return (
    <>
      <tr className="h-24 bg-gray-100 transition duration-200">
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
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn border border-[#5bbc3e] text-[#5bbc2e] hover:bg-[#5BBC2E]  hover:text-white transition duration-200"
          >
            Update
          </button>
        </td>
        <td>
          <button
            onClick={handleDelete}
            className="btn hover:bg-red-600 hover:text-white border border-red-600 text-red-600 transition duration-200"
          >
            Delete
          </button>
        </td>
      </tr>

      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box border-2 border-[#5BBC2E] max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
            <h3 className="font-bold text-lg text-[#5BBC2E] mb-4">
              Update Partner Info
            </h3>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                defaultValue={name}
                placeholder="Full Name"
                className="input input-bordered w-full outline-none focus:border-[#5BBC2E]"
              />

              <input
                type="url"
                name="profileImage"
                defaultValue={profileImage}
                placeholder="Profile Image URL"
                className="input input-bordered w-full outline-none focus:border-[#5BBC2E]"
              />

              <input
                type="text"
                name="subject"
                defaultValue={subject}
                placeholder="Subject"
                className="input input-bordered w-full outline-none focus:border-[#5BBC2E]"
              />

              <select
                name="studyMode"
                defaultValue={studyMode}
                className="select select-bordered w-full outline-none focus:border-[#5BBC2E]"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>

              <input
                type="text"
                name="location"
                defaultValue={location}
                placeholder="Location"
                className="input input-bordered w-full outline-none focus:border-[#5BBC2E]"
              />

              <div className="modal-action">
                <button
                  type="submit"
                  className="btn border border-[#5bbc3e] text-[#5bbc2e] hover:bg-[#5BBC2E]  hover:text-white transition duration-200"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn hover:bg-red-600 hover:text-white border border-red-600 text-red-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default MyRequest;
