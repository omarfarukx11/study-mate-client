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

  return (
    <div className="w-[1536px] mx-auto my-20 ">
      <Marquee pauseOnHover={true} speed={300} gradient={false} >
  <div className="flex gap-8">
    {comments.map((comment) => (
      <ReviewCard key={comment.id} comment={comment} />
    ))}
  </div>
</Marquee>

    </div>
  );
};

export default Comment;
