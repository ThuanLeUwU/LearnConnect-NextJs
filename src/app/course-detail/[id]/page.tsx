"use client";
import { Payment } from "@/components/payment";
import { Modal } from "antd";
import Link from "next/link";
import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Course, Lectures } from "@/components/courses/courses";

export default function CourseDetailPage({ params }: any) {
  const [visible, setVisible] = useState(false);
  const idCourse = params.id;
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  const [courses, setCourses] = useState<Course>();
  const [lectures, setLectures] = useState<Lectures>();

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/course/${idCourse}`
      );
      setCourses(responseData?.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/lecture/by-course/${idCourse}`
      );
      setLectures(responseData?.data);
    };

    fetchData();
  }, []);

  console.log("lectures: ", lectures);
  console.log("id is : ", idCourse);
  return (
    <div className="contain-wrapper">
      <div className="bg-[#fff]">
        <div className="container mx-auto max-w-screen-xl">
          <div className="grid cols-2 lg:grid-cols-12 py-20">
            <div className="lg:col-span-8 max-w-3xl px-6 mx-auto w-full">
              <img
                src={courses?.imageUrl}
                alt="course-detail"
                className="rounded-md w-full h-[456px] object-cover"
              />
              <h2 className="text-[#212832] mt-8 text-2xl font-medium">
                {courses?.name}
              </h2>
              <div className="courses-details-admin text-[#212832] flex justify-between items-center py-2.5">
                <div className="admin-author flex items-center">
                  <div className="w-12 h-12 ">
                    <img
                      src="./author-01.jpg"
                      alt="Author"
                      className="rounded-full"
                    />
                  </div>
                  <div className="author-content pl-4">
                    <Link className="text-base pl-4 pb-1.5" href="#">
                      Pamela Foster
                    </Link>
                    <span className="mx-5"></span>
                    <span className="text-sm font-normal text-[#309255]">
                      {/* {courses?.totalEnrollment} Enrolled Students */}
                      {courses?.totalEnrollment &&
                        courses?.totalEnrollment.toLocaleString()}{" "}
                      Enrolled Students
                    </span>
                  </div>
                </div>
                <div className="admin-rating">
                  <span className="font-medium text-sm">
                    {courses?.averageRating}{" "}
                  </span>
                  <span className="rating-star">
                    <span className="rating-bar"></span>
                  </span>
                  <span className="text-sm text-[#52565b] font-normal">
                    (5,764 Rating)
                  </span>
                </div>
              </div>
              <div className=" text-[#212832] ">
                <div className="flex justify-center bg-[#e7f8ee] py-4 rounded-md">
                  <ul className="tabs flex space-x-5 ">
                    <li
                      className={`cursor-pointer rounded-md ${
                        activeTab === "tab1"
                          ? "bg-[#309255] text-white"
                          : "bg-white"
                      }`}
                      onClick={() => handleTabClick("tab1")}
                    >
                      <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                        Overview
                      </button>
                    </li>
                    <li
                      className={`cursor-pointer rounded-md ${
                        activeTab === "tab2"
                          ? "bg-[#309255] text-white"
                          : "bg-white"
                      }`}
                      onClick={() => handleTabClick("tab2")}
                    >
                      <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                        Lecture
                      </button>
                    </li>
                    <li
                      className={`cursor-pointer rounded-md ${
                        activeTab === "tab3"
                          ? "bg-[#309255] text-white"
                          : "bg-white"
                      }`}
                      onClick={() => handleTabClick("tab3")}
                    >
                      <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                        Reviews
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="tab-content">
                  {activeTab === "tab1" && (
                    <div className="tab-description">
                      <div className="">
                        <h3 className="text-[#212832] text-2xl font-medium mt-6 px-2">
                          Description:
                        </h3>
                        <p className="mt-3.5 text-[#52565b] text-base font-extralight px-4">
                          {courses?.description}
                        </p>
                      </div>
                    </div>
                  )}
                  {activeTab === "tab2" && (
                    <div className="w-full mx-auto">
                      <div className="faq-wrapper">
                        <div className="single-faq-item">
                          <div className="grid cols-2 lg:grid-cols-12 border-[#dff0e6] border border-solid rounded-lg px-[70px] pb-[35px] mt-5">
                            <div className="lg:col-span-4 px-[15px]">
                              <div className="">
                                <h4 className="text-[#212832] text-2xl font-medium mt-6 px-2">
                                  Lectures:
                                </h4>
                              </div>
                            </div>
                            <div className="lg:col-span-8">
                              {lectures &&
                                lectures.map((item, index) => (
                                  <div key={index}>
                                    <p className="mt-5 font-bold">
                                      Lecture-{item.id} : {item.title}
                                    </p>
                                    <p className="mt-3.5 text-[#52565b] text-base font-extralight">
                                      {item?.content}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "tab3" && (
                    <div className="tab-reviews">
                      <h3 className="text-[#212832] text-2xl font-medium mt-6">
                        Student Reviews:
                      </h3>
                      <div className="reviews-wrapper reviews-active">
                        <div className="swiper-container">
                          <div className="swiper-wrapper">
                            <div className="single-review mt-3.5 border border-opacity-20 border-[#30925533] p-7 rounded-md">
                              <div className="review-author flex items-center ">
                                <div className="author-thumb p-2">
                                  <img
                                    src="./author/author-06.jpg"
                                    alt="Author"
                                    className="w-24 h-24 rounded-full"
                                  />
                                  <i className="icofont-quote-left"></i>
                                </div>
                                <div className="author-content pl-4">
                                  <h4 className="text-2xl font-medium">
                                    Sara Alexander
                                  </h4>
                                  <span className="text-sm text-[#309255] mt-1.5 font-light">
                                    Product Designer, USA
                                  </span>
                                  <span className="rating-star">
                                    <span className="rating-bar"></span>
                                  </span>
                                </div>
                              </div>
                              <p className="mt-3 font-light text-[#52565b] text-sm">
                                Lorem Ipsum has been the industry&apos;s
                                standard dummy text since the 1500 when unknown
                                printer took a galley of type and scrambled to
                                make type specimen book has survived not five
                                centuries but also the leap into electronic type
                                and book.
                              </p>
                            </div>

                            <div className="single-review mt-3.5 border border-opacity-20 border-[#30925533] p-7 rounded-md">
                              <div className="review-author flex items-center">
                                <div className="author-thumb p-2">
                                  <img
                                    src="./author/author-07.jpg"
                                    alt="Author"
                                    className="w-24 h-24 rounded-full"
                                  />
                                  <i className="icofont-quote-left"></i>
                                </div>
                                <div className="author-content pl-4">
                                  <h4 className="text-2xl font-medium">
                                    Karol Bachman
                                  </h4>
                                  <span className="text-sm text-[#309255] mt-1.5 font-light">
                                    Product Designer, USA
                                  </span>
                                  <span className="rating-star">
                                    <span className="rating-bar"></span>
                                  </span>
                                </div>
                              </div>
                              <p className="mt-3 font-light text-[#52565b] text-sm">
                                Lorem Ipsum has been the industry&apos;s
                                standard dummy text since the 1500 when unknown
                                printer took a galley of type and scrambled to
                                make type specimen book has survived not five
                                centuries but also the leap into electronic type
                                and book.
                              </p>
                            </div>

                            <div className="single-review mt-3.5 border border-opacity-20 border-[#30925533] p-7 rounded-md">
                              <div className="review-author flex items-center">
                                <div className="author-thumb p-2">
                                  <img
                                    src="./author/author-03.jpg"
                                    alt="Author"
                                    className="w-24 h-24 rounded-full"
                                  />
                                  <i className="icofont-quote-left"></i>
                                </div>
                                <div className="author-content pl-4">
                                  <h4 className="text-2xl font-medium">
                                    Gertude Culbertson
                                  </h4>
                                  <span className="text-sm text-[#309255] mt-1.5 font-light">
                                    Product Designer, USA
                                  </span>
                                  <span className="rating-star">
                                    <span className="rating-bar"></span>
                                  </span>
                                </div>
                              </div>
                              <p className="mt-7 font-light text-[#52565b] text-sm">
                                Lorem Ipsum has been the industry&apos;s
                                standard dummy text since the 1500 when unknown
                                printer took a galley of type and scrambled to
                                make type specimen book has survived not five
                                centuries but also the leap into electronic type
                                and book.
                              </p>
                            </div>
                          </div>
                          <div className="swiper-pagination"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 lg:max-w-sm px-6 mt-8 lg:mt-0">
              <div className="">
                <div className="border rounded-lg border-solid border-opacity-20 border-green-600 rounded-10 bg-[#e7f8ee] pt-7 pl-7 pr-7 pb-9">
                  <div className="sidebar-widget widget-information">
                    <div className="text-center py-3.5">
                      <span className="text-[#309255] text-3xl font-bold">
                        {courses?.price && courses?.price.toLocaleString()} VND
                      </span>
                    </div>
                    <div className=" text-black">
                      <ul className="py-15">
                        <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                          <i className="icofont-man-in-glasses"></i>{" "}
                          <strong className="text-[#212832] text-base font-medium">
                            Instructor
                          </strong>{" "}
                          <span className="text-[#52565b] float-right text-base font-normal">
                            Pamela Foster
                          </span>
                        </li>
                        <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                          <i className="icofont-clock-time"></i>{" "}
                          <strong className="text-[#212832] text-base font-medium">
                            Duration
                          </strong>{" "}
                          <span className="text-[#52565b] float-right text-base font-normal">
                            {courses?.contentLength} mins
                          </span>
                        </li>
                        <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                          <i className="icofont-ui-video-play"></i>{" "}
                          <strong className="text-[#212832] text-base font-medium">
                            Lectures
                          </strong>{" "}
                          <span className="text-[#52565b] float-right text-base font-normal">
                            {courses?.lectureCount}
                          </span>
                        </li>
                        {/* <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                          <i className="icofont-book-alt"></i>{" "}
                          <strong className="text-[#212832] text-base font-medium">
                            Language
                          </strong>{" "}
                          <span className="text-[#52565b] float-right text-base font-normal">
                            English
                          </span>
                        </li> */}
                      </ul>
                    </div>
                    <div className="text-center mt-10">
                      <Button
                        // href="/after-enroll"
                        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-[#309255] text-white hover:bg-black btn-outline w-44 border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                        onClick={() => {
                          Modal.confirm({
                            title: "Payment successful",
                            content: (
                              <Payment
                                visible={visible}
                                setVisible={setVisible}
                                onCancel={() => {
                                  setVisible(false);
                                }}
                                isEdit={false}
                              />
                            ),
                          });
                        }}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="sidebar-widget">
                <h4 className="widget-title">Share Course:</h4>
                <ul className="social">
                  <li>
                    <Link href="#">
                      <i className="flaticon-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="flaticon-linkedin"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="flaticon-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="flaticon-skype"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="flaticon-instagram"></i>
                    </Link>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
