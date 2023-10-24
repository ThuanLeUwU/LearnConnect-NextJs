"use client";
import React, { useEffect, useState } from "react";
import "../../app/./globals.css";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import { useRouter } from "next/navigation";
import CourseStyle from "./styles/style.module.scss";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

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
}: {
  imageUrl: string;
  name: string;
  description: string;
  id: string | number;
  price: string | number;
  categoryName: string;
  totalEnrollment: string | number;
  contentLength: string | number;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/course-detail/${id}`);
  };

  const ratingValue = 4.3;
  return (
    <div className={`${CourseStyle.single_courses}`}>
      <div className={`${CourseStyle.single_courses_image}`}>
        <a onClick={handleClick}>
          <img
            className="rounded-lg w-full h-[180px] object-cover"
            src={imageUrl}
            alt="Courses"
          />
        </a>
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
              <a className="font-bold	" href="#">
                {name}
              </a>
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
            {/* <i className="icofont-clock-time"></i>  */}
            {totalEnrollment} Students Joined
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
              defaultValue={ratingValue}
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
            <span className="old-parice">{price}</span>
          </div>
          <div className="courses-review">VND</div>
        </div>
      </div>
    </div>
  );
};
export default Courses;
