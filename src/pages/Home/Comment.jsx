import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import ReviewCard from "./ReviewCard";
import Marquee from "react-fast-marquee";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/review").then((data) => {
      setComments(data.data);
    });
  }, [axiosInstance]);


  const marqueeItems = [...comments, ...comments];

  return (
    <div className="2xl:w-[1536px] mx-auto">
      <Marquee pauseOnHover={true} speed={50} gradient={false}>
        <div className="flex gap-8">
          {marqueeItems.map((comment, index) => (
            <ReviewCard key={index} comment={comment} />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Comment;
