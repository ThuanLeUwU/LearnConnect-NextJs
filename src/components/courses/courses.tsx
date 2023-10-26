"use client";
import React, { useEffect, useState } from "react";
import "../../app/./globals.css";
import { useRouter } from "next/navigation";
import CourseStyle from "./styles/style.module.scss";
import Rating from "@mui/material/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

export type Course = {
  id: string | number;
  name: string;
  description: string;
  shortDescription: string;
  // difficultyLevel: string;
  totalEnrollment: number;
  imageUrl: string;
  price: number;
  rating: number;
  categoryId: number | string;
  contentLength: number;
  lectureCount: number;
  averageRating: number;
  mentorName: string;
};

export type Lectures = {
  map(arg0: (item: any, index: any) => React.JSX.Element): React.ReactNode;
  id: string | number;
  title: string;
  content: string;
  contentUrl: string;
  contentType: number;
  rejectReason: null;
  status: number;
  courseId: number;
};

const Courses = ({
  imageUrl,
  name,
  description,
  id,
  price,
  categoryName,
  totalEnrollment,
  contentLength,
  lectureCount,
  averageRating,
}: {
  imageUrl: string;
  name: string;
  description: string;
  id: string | number;
  price: string | number;
  categoryName: string;
  totalEnrollment: string | number;
  contentLength: string | number;
  lectureCount: string | number;
  averageRating: number;
}) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    router.push(`/course-detail/${id}`);
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className={`${CourseStyle.single_courses}`}>
      <div className={`${CourseStyle.single_courses_image}`}>
        <div className="relative">
          <a onClick={handleClick}>
            <img
              className="rounded-lg w-full h-[180px] object-cover"
              src={imageUrl}
              alt="Courses"
            />
          </a>
          <div
            onClick={handleLike}
            className="absolute top-2 right-2 cursor-pointer"
          >
            {isLiked ? (
              <FaHeart className={`text-2xl text-red-500`} />
            ) : (
              <FaRegHeart className={`text-2xl text-[#000]`} />
            )}
          </div>
        </div>
      </div>
      <div className={`${CourseStyle.single_courses_content}`}>
        <div className={`${CourseStyle.single_courses_author}`}>
          <div className="author">
            <div className="author-thumb">
              <a onClick={handleClick}>
                {/* <img
                                  src="assets/images/author/author-01.jpg"
                                  alt="Author"
                                /> */}
              </a>
            </div>
            <div className="author-name">
              <div className="min-h-[60px]">
                <a className="font-bold" href="#">
                  {name}
                </a>
              </div>
            </div>
          </div>
          {/* <div className={`${CourseStyle.single_courses_tag}`}>
            <a href="#">{categoryName}</a>
          </div> */}
        </div>

        {/* <h4 className="title">
          <a
            onClick={handleClick}
            className={`${CourseStyle.single_courses_title}`}
          >
            {description}
          </a>
        </h4> */}
        <div className={`${CourseStyle.single_courses_timeline}`}>
          <span>
            {" "}
            {totalEnrollment && totalEnrollment.toLocaleString()} Students
            Joined
          </span>
          <span>
            {" "}
            <i className="icofont-read-book"></i> {contentLength} Lectures
          </span>
        </div>
        <div className={`${CourseStyle.single_courses_timeline}`}>
          <span>
            <Rating
              name="half-rating-read"
              defaultValue={averageRating}
              precision={0.1}
              readOnly
            />
          </span>
          <span className="font-extralight">{contentLength} Rating</span>
        </div>
        <div className={`${CourseStyle.single_courses_price}`}>
          <div className="courses-price">
            <span className={`${CourseStyle.single_courses_price_sale}`}>
              {/* {item.sale} */}
            </span>
            {/* <span className="old-parice">{formattedPrice}</span> */}
            <span> {price && price.toLocaleString()}</span>
          </div>
          <div className="courses-review">VND</div>
        </div>
      </div>
    </div>
  );
};
export default Courses;
