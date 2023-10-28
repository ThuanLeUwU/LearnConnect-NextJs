"use client";
import { Payment } from "@/components/payment";
import { Modal } from "antd";
import Link from "next/link";
import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Course, Lectures } from "@/components/courses/courses";
import { UserAuth } from "@/app/context/AuthContext";
import Rating from "@mui/material/Rating";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function CourseDetailPage({ params }: any) {
  const [visible, setVisible] = useState(false);
  const idCourse = params.id;
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  const [courses, setCourses] = useState<Course>();
  const [lectures, setLectures] = useState<Lectures>();
  const { id, userData } = UserAuth();
  const [averageRating, setAverageRating] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const idUser = id;
  console.log("id user is", idUser);
  console.log("id course is", idCourse);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/course/${idCourse}`
      );
      setCourses(responseData?.data);
      setAverageRating(responseData?.data.averageRating);
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

  const payment = async (
    userId: any,
    courseId: any,
    returnUrl: string | number | boolean
  ) => {
    const url = `https://learnconnectapitest.azurewebsites.net/api/enrollment/Enroll?userId=${userId}&courseId=${courseId}&returnUrl=${encodeURIComponent(
      returnUrl
    )}`;

    try {
      const response = await axios.post(url);
      console.log("Response from API:", response.data);
      console.log("url", url);
      // const responseDataPayment = await axios.get(response.data);
      // console.log("responseDataPayment", responseDataPayment.data);

      if (response.data) {
        const newTab = window.open(response.data, "_blank");
        if (newTab) {
          newTab.focus();
        } else {
          alert("Popup blocked. Please allow popups for this website.");
        }
      } else {
        router.push(`/my-course/${courseId}`);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  console.log("course is :", courses?.averageRating);
  // setAverageRating(courses?.averageRating);
  // console.log("averageRating 1:", averageRating);
  // console.log("averageRating 2:", courses?.averageRating);
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
                      src={courses?.mentorProfilePictureUrl}
                      alt="Author"
                      className="rounded-full w-12 h-12 object-cover"
                    />
                  </div>
                  <div className="author-content pl-4">
                    <Link className="text-base pl-4 pb-1.5" href="#">
                      {courses?.mentorName}
                    </Link>
                    <span className="mx-5"></span>
                    <span className="text-sm font-normal text-[#309255]">
                      {courses?.totalEnrollment &&
                        courses?.totalEnrollment.toLocaleString()}{" "}
                      Enrolled Students
                    </span>
                  </div>
                </div>
                <div className="admin-rating flex">
                  <div className="flex">
                    <span className="font-medium text-sm">
                      {courses?.averageRating}{" "}
                    </span>{" "}
                    <span className="mt-[2px] text-yellow-400">
                      <AiFillStar />
                    </span>
                  </div>

                  <span className="text-sm text-[#52565b] font-normal">
                    ({courses?.totalRatingCount} Rating)
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
                                  Lectures
                                </h4>
                              </div>
                            </div>
                            <div className="lg:col-span-8">
                              {lectures &&
                                lectures.map((item, index) => (
                                  <div key={index}>
                                    <p className="mt-5 font-bold">
                                      Lecture-{index + 1} : {item.title}
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
                            {courses?.mentorName}
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
                      </ul>
                    </div>
                    <div className="text-center mt-10">
                      {/* <Button
                        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-[#309255] text-white hover:bg-black btn-outline w-44 border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                        onClick={() => {
                          Modal.confirm({
                            title: "Your Order Preview",
                            content: (
                              <div className="pr-[34px]">
                                <img
                                  src={courses?.imageUrl}
                                  alt="course-detail"
                                  className="rounded-md w-full h-[170px] object-cover"
                                />
                                <h3 className="mt-2">
                                  Course Name:{" "}
                                  <span className="font-bold">
                                    {courses?.name}
                                  </span>
                                </h3>
                                <h3 className="mt-2">
                                  Instructor Name:{" "}
                                  <span className="font-bold">
                                    {courses?.mentorName}
                                  </span>
                                </h3>
                                <h3 className="mt-2">
                                  Course Price:{" "}
                                  <span className="font-bold">
                                    {courses?.price &&
                                      courses?.price.toLocaleString()}
                                  </span>{" "}
                                  VND
                                </h3>
                              </div>
                            ),
                            onOk() {
                              payment(
                                idUser,
                                idCourse,
                                "https://learnconnectapitest.azurewebsites.net/api/payment-transaction/query-vnpay-transaction"
                              );
                              console.log("Enrollment confirmed");
                            },
                            onCancel() {
                              console.log("Enrollment canceled");
                            },
                          });
                        }}
                      >
                        Enroll Now
                      </Button> */}
                      <Button
                        onClick={() => {
                          setIsModalVisible(true);
                        }}
                        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-[#309255] text-white hover:bg-black btn-outline w-44 border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                      >
                        Enroll Now
                      </Button>
                      <Modal
                        title="Your Order Preview"
                        visible={isModalVisible}
                        onOk={() => {
                          payment(
                            idUser,
                            idCourse,
                            // "https://learnconnectapitest.azurewebsites.net/api/payment-transaction/query-vnpay-transaction"
                            "https://learn-connect-next-js-git-thuan-thuanleuwu.vercel.app/after-payment"
                          );
                          console.log("Enrollment confirmed");
                          setIsModalVisible(false);
                        }}
                        onCancel={() => {
                          console.log("Enrollment canceled");
                          setIsModalVisible(false);
                        }}
                        okButtonProps={{
                          style: { backgroundColor: "#309255" },
                        }}
                      >
                        <div className="pr-[34px]">
                          <img
                            src={courses?.imageUrl}
                            alt="course-detail"
                            className="rounded-md w-full h-[170px] object-cover"
                          />
                          <h3 className="mt-2">
                            Course Name:{" "}
                            <span className="font-bold">{courses?.name}</span>
                          </h3>
                          <h3 className="mt-2">
                            Instructor Name:{" "}
                            <span className="font-bold">
                              {courses?.mentorName}
                            </span>
                          </h3>
                          <h3 className="mt-2">
                            Course Price:{" "}
                            <span className="font-bold">
                              {courses?.price &&
                                courses?.price.toLocaleString()}
                            </span>{" "}
                            VND
                          </h3>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
