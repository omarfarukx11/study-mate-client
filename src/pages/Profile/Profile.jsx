import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import { FaUserEdit, FaCamera, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value.trim();
    const imageFile = e.target.photo.files[0];

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      let photoURL = user?.photoURL;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await axios.post(image_hosting_api, formData);
        if (res.data.success) photoURL = res.data.data.display_url;
      }

      await updateProfile(currentUser, { displayName: name, photoURL: photoURL });
      setUser({ ...currentUser, displayName: name, photoURL: photoURL });

      setShowForm(false);
      Swal.fire({ icon: "success", title: "Profile Refreshed!", timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Update Failed", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 text-neutral-content ">
      <title>StudyMate | My Profile</title>
      
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          {/* --- LEFT: IDENTITY SIDEBAR --- */}
          <div className="w-full lg:w-[40%] bg-primary p-10 lg:p-16 text-white flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border-8 border-white/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={user?.photoURL || "https://via.placeholder.com/150"} 
                  className="w-full h-full object-cover" 
                  alt="Profile" 
                />
              </div>
            </div>

            <h2 className="text-3xl font-black tracking-tight mb-2">{user?.displayName}</h2>
            <p className="opacity-80 font-medium mb-10 flex items-center gap-2">
              <FaEnvelope className="text-sm" /> {user?.email}
            </p>

            <div className="w-full space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex justify-between items-center border border-white/10">
                <span className="text-sm font-bold opacity-70">Account Status</span>
                <span className="bg-green-400 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">Verified</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: ACTIONS & FORM --- */}
          <div className="w-full lg:w-[60%] p-10 lg:p-20 bg-base-100 text-neutral-content">
            {!showForm ? (
              
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-4xl font-black mb-6 tracking-tighter">
                  Manage your <br /> <span className="text-primary underline decoration-primary/20 underline-offset-8">Personal Info</span>
                </h3>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                  Control how your profile appears to the community. Update your name, change your avatar, and manage your account security.
                </p>
                
                <button 
                  onClick={() => setShowForm(true)}
                  className="group flex items-center justify-between bg-gray-50 border border-gray-100 p-6 rounded-3xl transition-all "
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <FaUserEdit />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-800">Edit Public Profile</p>
                      <p className="text-sm text-gray-400 font-medium">Name and Profile Picture</p>
                    </div>
                  </div>
                  <span className="text-primary font-black opacity-0 group-hover:opacity-100 transition-opacity">GO →</span>
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-10 duration-500">
                <h3 className="text-2xl font-black  mb-8 tracking-tight">Update Details</h3>
                
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Display Name</label>
                    <input 
                      name="name"
                      type="text" 
                      defaultValue={user?.displayName}
                      className="w-full px-6 py-4 rounded-2xl bg-secondary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Profile Photo</label>
                    <div className="relative group">
                      <input 
                        name="photo"
                        type="file" 
                        accept="image/*"
                        className="w-full px-6 py-4 rounded-2xl bg-secondary file:hidden cursor-pointer transition-colors"
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
                        <FaCamera />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-4">
                    <button 
                      disabled={loading}
                      type="submit"
                      className="w-full py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      {loading ? "Saving Changes..." : "Save Information"}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="w-full py-3 text-gray-400 font-bold hover:text-gray-200 transition-colors"
                    >
                      Dismiss Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;