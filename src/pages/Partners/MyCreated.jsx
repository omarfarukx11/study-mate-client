import React from "react";

const MyCreated = ({ profiles }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-[#5BBC2E] mb-6 text-center">
        My Created Profiles
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-[#5BBC2E] text-white">
              <th>Profile</th>
              <th>Subject</th>
              <th>Study Mode</th>
              <th>Experience</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((profile) => (
              <tr key={profile._id} className="hover:bg-gray-100">
                <td className="flex items-center gap-3">
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="font-semibold">{profile.name}</span>
                </td>
                <td>{profile.subject}</td>
                <td>{profile.studyMode}</td>
                <td>{profile.experienceLevel}</td>
                <td>{profile.rating}</td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-warning">Update</button>
                  <button className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {profiles?.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            You have not created any profiles yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCreated;
