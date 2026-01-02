import React from "react";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router";

const PartnerCard = ({ partner }) => {
  const { _id, name, skill, subject, rating ,profileImage} = partner;

  return (
      <div className="group flex flex-col bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-sm transition-all duration-300 h-full">
     
     <div className="relative aspect-3/2 overflow-hidden">
       <img
         src={profileImage}
         alt={name}
         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
       />
       <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
            <FaRegStar className="text-amber-500 fill-amber-500" /> {rating}
          </span>
       </div>
     </div>
   
     {/* Content Section */}
     <div className="p-4 flex flex-col grow">
       <div className="mb-3">
         <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 truncate capitalize">
           {name}
         </h2>
         <p className="text-primary text-xs font-semibold tracking-wide uppercase">
           {subject}
         </p>
       </div>
   
       {/* Description - Clamped to 2 lines to prevent height stretching */}
       <p className="text-slate-500 dark:text-zinc-400 text-xs leading-relaxed line-clamp-2 mb-4">
         Expert in {skill}. Professional support and specialized guidance in {subject}.
       </p>
   
       {/* Footer Section - Pushed to bottom */}
       <div className="mt-auto pt-3 border-t border-slate-50 dark:border-zinc-800">
         <Link
           to={`/partnerDetails/${_id}`}
           className="w-full inline-flex items-center justify-center bg-slate-900 dark:bg-primary text-white text-xs font-bold py-2.5 rounded-xl transition-all hover:bg-primary dark:hover:bg-primary/80 active:scale-95"
         >
           View Profile
         </Link>
       </div>
     </div>
   </div>
  );
};

export default PartnerCard;
