import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuth, updateProfile } from "firebase/auth";

const MyRequest = ({ data, index }) => {
  const { partnerId: id, _id: ID } = data;
  const axiosInstance = useAxios();
  const auth = getAuth();
  
  const [reqData, setReqData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/findPartner/${id}`)
      .then((res) => {
        setReqData(res.data);
        setImagePreview(res.data.profileImage); 
      })
      .catch((err) => console.error("Error fetching partner:", err));
  }, [axiosInstance, id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
    setSubmitLoading(true);

    const form = e.target;
    const name = form.name.value;
    let photoURL = reqData.profileImage; 

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No user logged in");

      // 1. Upload to ImgBB if a file exists (Using your exact logic)
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        const res = await axios.post(image_API_URL, formData);
        if (res.data.success) {
          photoURL = res.data.data.display_url;
        }
      }

      // 2. Update Firebase Profile
      await updateProfile(currentUser, { displayName: name, photoURL: photoURL });

      // 3. Prepare Object and Update DB
      const updatedData = {
        name: name,
        profileImage: photoURL,
        subject: form.subject.value,
        studyMode: form.studyMode.value,
        location: form.location.value,
      };

      const dbRes = await axiosInstance.patch(`/updatePartner/${id}`, updatedData);

      if (dbRes.data.success || dbRes.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Partner info updated successfully.",
          icon: "success",
        });
        setReqData((prev) => ({ ...prev, ...updatedData }));
        setIsModalOpen(false);
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!reqData) return null;

  const { name, profileImage, subject, studyMode, location } = reqData;

  return (
    <>
      {/* Your Original Table Row Design */}
      <tr className="h-24 bg-secondary border-b border-primary">
        <th>{index + 1}</th>
        <td className="flex justify-center items-center">
          <div className="flex items-center py-2 flex-col justify-center gap-2 sm:gap-3">
            <div className="avatar">
              <div className="mask rounded-full h-10 w-10">
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
            className="sm:btn sm:p-4 p-1 border bg-primary hover:bg-neutral rounded-sm text-white transition duration-200 text-[10px] sm:text-sm"
          >
            Update
          </button>
        </td>
        <td>
          <button
            onClick={handleDelete}
            className="sm:btn sm:p-4 p-1 border bg-red-500 hover:bg-red-800 rounded-sm text-white transition duration-200 text-[10px] sm:text-sm"
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Your Original Modal Design */}
      {isModalOpen && (
        <dialog open className="modal modal-center sm:modal-middle">
          <div className="modal-box bg-base-100 rounded-xl max-h-[90vh] text-neutral-content sm:max-h-[80vh] overflow-y-auto border border-white/10">
            <h3 className="font-bold text-lg text-primary mb-4">
              Update Partner Info
            </h3>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4">

              <div className="flex flex-col items-center gap-3 mb-2">
                <div className="relative group w-24 h-24">
                  <img src={imagePreview} className="w-full h-full object-cover rounded-full border-2 border-primary" alt="Preview" />
                   <p className="text-xs">Click to change</p>
                  <label className="absolute inset-0 flex items-center justify-center  rounded-full cursor-pointer">
                    <input type="file" name="photo" className="hidden " onChange={handleImageChange} accept="image/*" />
                  </label>
                   
                </div>
              </div>

              <input type="text" name="name" defaultValue={name} className="input input-bordered w-full outline-none border border-gray-400  text-xs sm:text-sm" />
              <input type="text" name="subject" defaultValue={subject} className="input input-bordered w-full outline-none border border-gray-400  text-xs sm:text-sm" />
              <select name="studyMode" defaultValue={studyMode} className="select outline-none border border-gray-400 select-bordered w-full   text-xs sm:text-sm" >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
              <input type="text" name="location" defaultValue={location} className="input input-bordered w-full outline-none border border-gray-400   text-xs sm:text-sm" />

              <div className="modal-action flex flex-col sm:flex-row gap-2">
                <button type="submit" className="btn bg-primary border-none  hover:bg-neutral text-white transition duration-200" disabled={submitLoading}>
                  {submitLoading ? "Saving..." : "Save Changes"}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline border-red-600 text-white hover:bg-red-800 border-none  bg-red-600 " >
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