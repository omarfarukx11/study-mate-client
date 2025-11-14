import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthContext";
import { updateProfile } from "firebase/auth"; // Make sure firebase/auth is imported

const Profile = () => {
  const { user, setUser, setError, error } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const photo = e.target.photo.value.trim();

    if (!name || !photo) {
      Swal.fire({
        icon: "warning",
        title: "Please fill both fields",
      });
      return;
    }

    try {
      if (!user) throw new Error("No user logged in");

      // ✅ Update Firebase Auth profile
      await updateProfile(user, { displayName: name, photoURL: photo });

      // ✅ Update local React context so UI updates immediately
      setUser({ ...user, displayName: name, photoURL: photo });

      setShowForm(false);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message,
      });
    }
  };

  return (
    
    <div className=" flex items-center justify-center w-full ">

    <div className="md:w-[50%] w-[80%] mx-auto bg-white border border-green-500/30 shadow-xl rounded-2xl p-6 text-center md:mt-10 overflow-hidden">
      
      {/* Profile Image */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="profile"
          className="w-40 h-40 rounded-full border-4 border-green-500 object-cover shadow-lg"
        />
      </div>

      {/* User Info */}
      <h2 className="text-3xl font-bold text-green-700">{user?.displayName}</h2>
      <p className="text-lg pt-2">{user?.email}</p>

      {/* Update Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mt-6 px-6 py-2 rounded-lg bg-green-500 hover:bg-white hover:text-green-500 hover:border hover:border-green-500 transition-all duration-300 text-white"
        >
          Update
        </button>
      )}

      {/* Update Form */}
      {showForm && (
        <form onSubmit={handleUpdate} className="mt-6 flex flex-col gap-4 w-full">
          <input
            type="text"
            name="name"
            className="input input-bordered w-full bg-white border-green-500/50 outline-none"
            placeholder="Enter new name"
            required
          />
          <input
            type="text"
            name="photo"
            className="input input-bordered w-full bg-white outline-none border-green-500/50"
            placeholder="Enter new photo URL"
            required
          />

          <div className="flex flex-col gap-2 mt-2">
            <button
              type="submit"
              className="btn w-full bg-green-500 text-white hover:bg-white hover:text-green-500 hover:border hover:border-green-500 transition-all duration-300"
            >
              Update Info
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn w-full bg-red-500 text-white hover:bg-red-400 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Error */}
      {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
    </div>
    </div>
  );
};

export default Profile;
