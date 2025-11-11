import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const CreatePartnerProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const profileImage = form.profileImage.value;
    const subject = form.subject.value;
    const skill = form.skill.value; // ✅ নতুন field
    const studyMode = form.studyMode.value;
    const availabilityTime = form.availabilityTime.value;
    const location = form.location.value;
    const experienceLevel = form.experienceLevel.value;
    const rating = form.rating.value;
    const email = user?.email || "";
    const partnerCount = 0;

    const newPartner = {
      name,
      profileImage,
      subject,
      skill,
      studyMode,
      availabilityTime,
      location,
      experienceLevel,
      rating,
      email,
      partnerCount,
    };

    axiosInstance.post("/studyPartner", newPartner).then((data) => {
      if (data.data.insertedId) {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      }
      e.target.reset();
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl border-2 border-[#5BBC2E] rounded-xl p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#5BBC2E] mb-8">
          Create Your Study Partner Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          id="createProfileForm"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full border-2 border-gray-300 focus:border-[#5BBC2E] rounded-sm px-4 py-2 outline-none"
              placeholder="Enter your full name"
            />
          </div>


          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Profile Image URL
            </label>
            <input
              type="url"
              name="profileImage"
              required
              className="w-full border-2 border-gray-300 focus:border-[#5BBC2E] rounded-sm px-4 py-2 outline-none"
              placeholder="Paste your profile image link"
            />
          </div>


          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              required
              className="w-full border-2 border-gray-300 focus:border-[#5BBC2E] rounded-sm px-4 py-2 outline-none"
              placeholder="e.g. Math, English, Programming"
            />
          </div>


          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Skill
            </label>
            <input
              type="text"
              name="skill"
              required
              className="w-full border-2 border-gray-300 focus:border-[#5BBC2E] rounded-sm px-4 py-2 outline-none"
              placeholder="e.g. Communication, Problem Solving"
            />
          </div>


          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Study Mode
            </label>
            <select
              name="studyMode"
              required
              className="w-full border-2 border-gray-300 focus:border-[#5BBC2E] rounded-sm px-4 py-2 outline-none"
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

 
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Availability Time
            </label>
            <input
              type="text"
              name="availabilityTime"
              required
              className="w-full border-2 border-gray-300 focus:border-[#5BBC2E] rounded-sm px-4 py-2 outline-none"
              placeholder="e.g. Evening 6–9 PM"
            />
          </div>


          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              className="w-full border-2 border-gray-300 focus:border-[#5BBC2E] rounded-sm px-4 py-2 outline-none"
              placeholder="City, Area or preferred place"
            />
          </div>


          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              required
              className="w-full border-2 border-gray-300 focus:border-[#5BBC2E] rounded-sm px-4 py-2 outline-none"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>


          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              required
              className="w-full border-2 border-gray-300 focus:border-[#5BBC2E] rounded-sm px-4 py-2 outline-none"
              placeholder="e.g. 4.5"
            />
          </div>

     
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email (Read Only)
            </label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              readOnly
              className="w-full border-2 border-[#5BBC2E] bg-gray-100 text-gray-700 rounded-sm px-4 py-2 cursor-not-allowed"
            />
          </div>
        </form>


        <div className="mt-10">
          <button
            type="submit"
            form="createProfileForm"
            className="w-full bg-[#5BBC2E] text-white font-semibold text-lg py-3 rounded-sm hover:bg-white hover:text-[#5BBC2E] hover:border-2 hover:border-[#5BBC2E] transition-all duration-300"
          >
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePartnerProfile;
