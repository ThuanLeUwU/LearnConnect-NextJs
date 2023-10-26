"use client";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export type CourseItem = {
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
};

const CourseItem = ({
  imageUrl,
  name,
  description,
  id,
}: {
  imageUrl: string;
  name: string;
  description: string;
  id: string | number;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/my-course/${id}`);
  };
  return (
    <div className="lg:col-span-4 border border-solid border-[#acd6bc] p-[20px] rounded-lg my-[10px] hover:border-[#309255] mx-[15px]">
      <div className="single-courses">
        <div>
          <div className="courses-images">
            <a href={`/my-course/${id}`}>
              <img
                className="rounded-lg w-full h-[180px] object-cover"
                src={imageUrl}
                alt="Courses"
              />
            </a>
          </div>
          <div className="courses-content">
            <div className="courses-author">
              <div className="flex text-center items-center pt-[25px]">
                <div className="author-thumb">
                  <a href="#">
                    <img
                      className="rounded-full w-[50px] h-[50px]"
                      src="./author-01.jpg"
                      alt="Author"
                    />
                  </a>
                </div>
                <div className="pl-3">
                  <a className="text-[#52565b] hover:text-[#309255]" href="#">
                    Jason Williams
                  </a>
                  <a> || </a>
                  <a className="text-[#309255]" href="#">
                    Ohula Malsh
                  </a>
                </div>
              </div>
            </div>
            <div className="min-h-[60px]">
              <h4 className="mt-[13px] mb-2 text-[#52565b] text-[16px] hover:text-[#309255] font-bold">
                <a href={`/my-course/${id}`}>{name}</a>
              </h4>
            </div>

            <div className="courses-rating">
              <p className="text-[#52565b] text-[14px]">60% Complete</p>

              <div className="rating-progress-bar mt-2">
                <ProgressBar
                  completed={60}
                  bgColor="#309255"
                  height="15px"
                  customLabel=""
                />
              </div>
              <div className="rating-meta">
                <span className="rating-star">
                  <span className="rating-bar"></span>
                </span>
                <div className="flex justify-between">
                  <Button
                    onClick={handleClick}
                    className="text-[#52565b] text-[14px] text-right pt-2"
                  >
                    Continue
                  </Button>
                  <button> Report </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
