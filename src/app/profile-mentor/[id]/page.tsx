"use client";
import Link from "next/link";
import "../../globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserAuth } from "@/app/context/AuthContext";
import { CourseItem } from "@/components/pagination/useDataFavoritesFetcher";
import { Empty, Spin } from "antd";
import Paginate from "@/components/pagination/pagination";
import { Rating } from "@mui/material";

export type User = {
  id: string | number;
  password: string;
  email: string;
  role: 1;
  fullName: string;
  phoneNumber: string;
  gender: number;
  bioDescription: string;
  profilePictureUrl: string;
  status: number;
};
export type CourseItemProfile = {
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
  totalRatingCount: number;
};

export default function ProfileUser({ params }: any) {
  const idMentor = params.id;
  const [DataMentor, SetDataMentor] = useState<User>();
  const [courses, setCourses] = useState<CourseItemProfile[]>([]);
  const API_URL =
    "https://learnconnectapitest.azurewebsites.net/api/course/get-courses-by-mentor?mentorId=";
  const pagesize = 4;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/mentor/${idMentor}`
        );
        SetDataMentor(response?.data.user);
        console.log("data mentor", response?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (idMentor) {
      fetchUserData();
    }
  }, [idMentor]);

  const displayGender = (gender: number | undefined) => {
    if (gender === 1) {
      return "Male";
    } else if (gender === 2) {
      return "Female";
    } else if (gender === 3) {
      return "Other";
    } else {
      return "Not specified";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await axios.get(
        `${API_URL}${idMentor}&currentPage=${page}&pageSize=${pagesize}`
      );
      setCourses(result?.data.courses);
      console.log("datacourse", result?.data.courses);
      setTotalPages(result?.data.paginationData.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [currentPage]);

  console.log("course", courses);

  return (
    <div className="container">
      {DataMentor && (
        <section className="bg-gradient-to-b">
          <div className="py-5">
            <div className="flex justify-center items-center">
              <div className="w-full">
                <div className="bg-[#fff] rounded-lg shadow-lg">
                  <div className="bg-[#309255] text-white flex items-center lg:flex-row rounded-t p-4 lg:p-8">
                    <div className="lg:mr-4 lg:mt-0 flex flex-col items-center w-full lg:w-36">
                      <img
                        src={
                          DataMentor?.profilePictureUrl ||
                          "www.default.imageurl"
                        }
                        alt="Generic placeholder image"
                        className="w-36 h-36 rounded-full mt-4 mb-2"
                      />
                    </div>
                    <div className="author-content pl-4 flex items-center">
                      <h5 className="text-lg my-1">
                        Full Name: {DataMentor?.fullName}
                      </h5>
                      <h5 className="text-lg my-1">
                        Email: {DataMentor?.email}
                      </h5>
                      <h5 className="text-lg my-1">
                        Gender: {displayGender(DataMentor?.gender)}
                      </h5>
                      <h5 className="text-lg my-1">
                        Phone: {DataMentor?.phoneNumber}
                      </h5>
                    </div>
                  </div>
                  <div className="card-body p-4 text-black">
                    <div className="mb-5">
                      <p className="font-semibold text-lg mb-2">
                        Bio Description
                      </p>
                      <div className="p-4 bg-gray-200">
                        <p className="italic mb-1">
                          {DataMentor?.bioDescription}
                        </p>
                      </div>
                    </div>
                    {loading ? (
                      <div className="text-center text-5xl mt-5">
                        <Spin size="large" />
                      </div>
                    ) : (
                      <div className="min-h-[60vh]">
                        {courses.length === 0 ? (
                          <div className="text-center text-2xl mt-8 items-center justify-center">
                            <Empty description={false} />
                            Mentor don&apos;t have any courses.
                          </div>
                        ) : (
                          <div className="min-h-[1000px]">
                            {courses &&
                              courses.length > 0 &&
                              courses.map((item) => (
                                <div className="swiper-container" key={item.id}>
                                  <div className="swiper-wrapper mb-3 shadow-lg rounded-lg hover:border-[#309255] hover:bg-[#e7f8ee]">
                                    <div className="single-review mt-3.5 border border-opacity-20 border-[#30925533] p-7 rounded-md">
                                      <div className="review-author flex ">
                                        <div className="author-thumb border border-[#309255]">
                                          <img
                                            src={item.imageUrl}
                                            alt="Author"
                                            className="w-60 h-44 object-cover min-w-[240px]"
                                          />
                                        </div>
                                        <div className="pl-4">
                                          <h4 className="text-2xl font-medium">
                                            {item.name}
                                          </h4>
                                          <div>
                                            <span className="text-sm">
                                              {item.description}
                                            </span>
                                          </div>
                                          <div className="flex">
                                            <Rating
                                              name="half-rating-read"
                                              defaultValue={item.averageRating}
                                              precision={0.1}
                                              readOnly
                                            />
                                            <span className="">
                                              ({item.totalRatingCount} Reviews)
                                            </span>
                                            {/* <span>{item.totalRatingCount}</span> */}
                                          </div>
                                          <div>
                                            <span className="rating-bar">
                                              {item.totalEnrollment &&
                                                item.totalEnrollment.toLocaleString()}{" "}
                                              Students Joined
                                            </span>
                                          </div>
                                          <div>
                                            <span className="text-[#309255] mt-1.5 font-light font-bold">
                                              {item.price === 0 ? (
                                                <p>Free</p>
                                              ) : (
                                                <>
                                                  {item.price &&
                                                    item.price.toLocaleString()}{" "}
                                                  <span>VND</span>
                                                </>
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {courses.length > 0 && (
              <Paginate
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </section>
      )}
    </div>
  );
}
