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
      <tr className="h-24 bg-secondary border-primary">
        <th>{index + 1}</th>
        <td className="flex justify-center items-center">
          <div className="flex items-center py-1 flex-col justify-center gap-2 sm:gap-3">
            <div className="avatar">
              <div className="mask rounded-full h-6 w-6 sm:h-10 sm:w-10">
                <img src={profileImage} alt="Avatar" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="font-bold text-[10px] sm:text-base">{name}</div>
              <div className="text-[10px] sm:text-sm opacity-50">{location}</div>
            </div>
          </div>
        </td>
        <td className="text-[10px] sm:text-sm">{subject}</td>
        <td className="text-[10px] sm:text-sm">{studyMode}</td>
        <td>
          <button
            onClick={() => setIsModalOpen(true)}
            className="sm:btn sm:p-4 p-1 border border-[#5bbc3e] text-primary hover:bg-primary hover:text-white transition duration-200 text-[10px] sm:text-sm"
          >
            Update
          </button>
        </td>
        <td>
          <button
            onClick={handleDelete}
            className="sm:btn sm:p-4 p-1 hover:bg-red-600 hover:text-white border border-red-600 text-red-600 transition duration-200 text-[10px] sm:text-sm"
          >
            Delete
          </button>
        </td>
      </tr>

      {isModalOpen && (
        <dialog open className="modal modal-center sm:modal-middle">
          <div className="modal-box border-2 border-primary max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
            <h3 className="font-bold text-lg text-primary mb-4">
              Update Partner Info
            </h3>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-3">
              <input
                type="text"
                name="name"
                defaultValue={name}
                placeholder="Full Name"
                className="input input-bordered w-full outline-none focus:border-primary text-xs sm:text-sm"
              />

              <input
                type="url"
                name="profileImage"
                defaultValue={profileImage}
                placeholder="Profile Image URL"
                className="input input-bordered w-full outline-none focus:border-primary text-xs sm:text-sm"
              />

              <input
                type="text"
                name="subject"
                defaultValue={subject}
                placeholder="Subject"
                className="input input-bordered w-full outline-none focus:border-primary text-xs sm:text-sm"
              />

              <select
                name="studyMode"
                defaultValue={studyMode}
                className="select select-bordered w-full outline-none focus:border-primary text-xs sm:text-sm"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>

              <input
                type="text"
                name="location"
                defaultValue={location}
                placeholder="Location"
                className="input input-bordered w-full outline-none focus:border-primary text-xs sm:text-sm"
              />

              <div className="modal-action flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  type="submit"
                  className="btn border border-[#5bbc3e] text-primary hover:bg-primary hover:text-white transition duration-200 text-xs sm:text-sm"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn hover:bg-red-600 hover:text-white border border-red-600 text-red-600 transition duration-200 text-xs sm:text-sm"
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
