"use client";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export type CourseItem = {
  course: {
    id: string | number;
    name: string;
    description: string;
    shortDescription: string;
    difficultyLevel: string;
    imageUrl: string;
    price: number;
    totalEnrollment: number;
    contentLength: number;
    averageRating: number;
    status: number;
    categoryId: number;
    mentorName: string;
    mentorId: number;
    mentorProfilePictureUrl: string;
    totalRatingCount: number;
    percentComplete: number;
  };
};

export type Performance = {
  id: string | number;
  score: number;
  timeSpent: number;
  userId: number;
  courseId: number;
};

const CourseItem = ({
  imageUrl,
  name,
  id,
  mentorName,
  mentorProfilePictureUrl,
  percentComplete,
  mentorId,
}: {
  imageUrl: string;
  name: string;
  id: string | number;
  mentorName: string;
  mentorProfilePictureUrl: string;
  percentComplete: number;
  mentorId: number;
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/my-course/${id}`);
  };

  const handlePushMentor = () => {
    // router.push(`/profile-mentor/${mentorId}`);
    // router.push(`/profile-mentor/${mentorId}`);
  };

  return (
    <div className="lg:col-span-4 border border-solid border-[#acd6bc] p-[20px] my-[10px] hover:border-[#309255] mx-[15px] shadow-lg rounded-lg">
      <div className="single-courses">
        <div>
          <div className="courses-images">
            <button onClick={handleClick} className="w-full">
              <img
                className="rounded-lg w-full h-[180px] object-cover"
                src={imageUrl}
                alt="Courses"
              />
            </button>
          </div>
          <div className="courses-content">
            <div className="courses-author">
              <div className="flex text-center items-center pt-[25px]">
                <div className="author-thumb">
                  <a href="#">
                    <img
                      className="rounded-full w-[50px] h-[50px]"
                      src={mentorProfilePictureUrl}
                      alt="Author"
                    />
                  </a>
                </div>
                <div className="pl-3">
                  <button
                    className="text-[#52565b] hover:text-[#309255] font-medium z-10"
                    onClick={handlePushMentor}
                  >
                    {mentorName}
                  </button>
                </div>
              </div>
            </div>
            <div className="min-h-[60px]">
              <h4 className="mt-[13px] mb-2 text-[#52565b] text-[16px] hover:text-[#309255] font-bold text-left">
                <button onClick={handleClick}>{name}</button>
              </h4>
            </div>

            <div className="courses-rating">
              <p className="text-[#52565b] text-[14px]">
                {percentComplete !== null
                  ? `${percentComplete}% Complete`
                  : "0% Complete"}
              </p>

              <div className="rating-progress-bar mt-2">
                <ProgressBar
                  completed={percentComplete}
                  bgColor="#309255"
                  height="15px"
                  labelAlignment="outside"
                  labelSize="14px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
