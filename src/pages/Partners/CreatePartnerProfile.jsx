import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxios from "../../Hooks/useAxios";
import axios from "axios"; // Added for direct ImgBB call
import Swal from "sweetalert2";
import Loader from "../../Components/Loader";
import { FaCloudUploadAlt } from "react-icons/fa";

const CreatePartnerProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  // Handle Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const form = e.target;
    const profileImageFile = form.photo.files[0];
    let photoURL = "";

    try {
      // 1. Upload to ImgBB if a file exists
      if (profileImageFile) {
        const formData = new FormData();
        formData.append("image", profileImageFile);
        
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        const res = await axios.post(image_API_URL, formData);
        if (res.data.success) {
          photoURL = res.data.data.display_url;
        }
      }

      // 2. Prepare Final Object
      const newPartner = {
        name: form.name.value,
        profileImage: photoURL, // Now uses the ImgBB link
        subject: form.subject.value,
        skill: form.skill.value,
        studyMode: form.studyMode.value,
        availabilityTime: form.availabilityTime.value,
        location: form.location.value,
        experienceLevel: form.experienceLevel.value,
        rating: form.rating.value,
        email: user?.email || "",
        partnerCount: 0,
      };

      // 3. Post to your DB
      const res = await axiosInstance.post("/studyPartner", newPartner);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Profile Created!",
          icon: "success",
          confirmButtonColor: "#22c55e",
        });
        form.reset();
        setImagePreview(null);
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  const inputStyle = "w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none text-gray-700 bg-white";
  const labelStyle = "block text-sm font-bold text-gray-700 mb-1.5";

  if (pageLoading || submitLoading) return <Loader fullScreen={true} />;

  return (
   <div className="bg-base-100 min-h-[calc(100vh-120px)] py-6 flex items-center justify-center">
    <div className="max-w-4xl mx-auto rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      
      <div className="px-8 py-4 border-b border-gray-100 bg-white">
        <h2 className="text-xl font-bold text-gray-800">Talent Information</h2>
        <p className="text-gray-500 text-xs">Edit and create your partner profile.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        
        {/* Section 1: Identity */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Smaller Photo Box */}
          <div className="md:col-span-1">
            <label className={labelStyle}>Profile Picture</label>
            <div className="relative group border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="text-center p-2">
                  <FaCloudUploadAlt className="mx-auto text-2xl text-gray-400 group-hover:text-green-500 transition-colors" />
                  <p className="text-[10px] text-gray-400 mt-1">Upload Photo</p>
                </div>
              )}
              <input 
                type="file" 
                name="photo" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer" 
                required 
              />
            </div>
          </div>

          {/* Compact Inputs */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
             <div className="md:col-span-2">
                <label className={labelStyle}>Full Name</label>
                <input type="text" name="name" required className={inputStyle} placeholder="John Doe" />
             </div>
             <div className="md:col-span-2">
                <label className={labelStyle}>Email Address</label>
                <input type="email" value={user?.email || ""} readOnly className={`${inputStyle} bg-gray-50 text-gray-400 cursor-not-allowed`} />
             </div>
             <div>
                <label className={labelStyle}>Location</label>
                <input type="text" name="location" required className={inputStyle} placeholder="City, Country" />
             </div>
             <div>
                <label className={labelStyle}>Initial Rating</label>
                <input type="number" name="rating" step="0.1" max="5" required className={inputStyle} placeholder="4.5" />
             </div>
          </div>
        </section>

        {/* Section 2: Expertise */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-green-600">Expertise & Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
             <div>
                <label className={labelStyle}>Primary Subject</label>
                <input type="text" name="subject" required className={inputStyle} placeholder="Subject" />
             </div>
             <div>
                <label className={labelStyle}>Core Skill</label>
                <input type="text" name="skill" required className={inputStyle} placeholder="Skill" />
             </div>
             <div>
                <label className={labelStyle}>Study Mode</label>
                <select name="studyMode" required className={inputStyle}>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
             </div>
             <div>
                <label className={labelStyle}>Experience Level</label>
                <select name="experienceLevel" required className={inputStyle}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
             </div>
             <div className="md:col-span-2">
                <label className={labelStyle}>Availability Time</label>
                <input type="text" name="availabilityTime" required className={inputStyle} placeholder="e.g. 10 AM - 4 PM" />
             </div>
          </div>
        </section>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="w-full md:w-max px-8 py-2 bg-green-500 text-white text-sm font-bold rounded-md hover:bg-green-600 shadow-md transition-all active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default CreatePartnerProfile;