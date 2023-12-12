"use client";
import { Payment } from "@/components/payment";
import { Breadcrumb, Menu, Modal } from "antd";
import Link from "next/link";
import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Course, Lectures } from "@/components/courses/courses";
import { UserAuth } from "@/app/context/AuthContext";
import Rating from "@mui/material/Rating";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { http } from "@/api/http";
import { toast } from "sonner";

export type Rating = {
  ratingCourseInfo: any;
  userRatingInfo: any;
  id: number;
  rating1: number;
  comment: string;
  timeStamp: string;
  status: number;
  userId: number;
  ratingBy: number;
  courseId: number;
  mentorId: number;
};

export default function CourseDetailPage({ params }: any) {
  const router = useRouter();
  const { id, user, role } = UserAuth();
  useEffect(() => {
    if (role === 0) {
      router.push(`/user-manage`);
    }
    if (role === 1) {
      router.push(`/staff-page`);
    }
    if (role === 2) {
      router.push(`/instructorcourses`);
    }
    // if (role === 3) {
    //   router.push(`/`);
    // }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });
  const [visible, setVisible] = useState(false);
  const idCourse = params.id;
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  const [courses, setCourses] = useState<Course>();
  const [lectures, setLectures] = useState<Lectures>();
  const { userData, jwtToken } = UserAuth();
  const [averageRating, setAverageRating] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const idUser = id;

  useEffect(() => {
    const fetchData = async () => {
      // let url = `https://learnconnectapi.azurewebsites.net/api/course/user/${idUser}/course/${idCourse}`;
      let url = `https://learnconnectapi.azurewebsites.net/api/course/${idCourse}?userId=${idUser}`;
      if (!idUser) {
        url = `https://learnconnectapi.azurewebsites.net/api/course/${idCourse}`;
      }
      const responseData = await http.get(url);
      setCourses(responseData?.data);
      setAverageRating(responseData?.data.averageRating);
    };
    fetchData();
  }, [idUser]);
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await http.get(
        `https://learnconnectapi.azurewebsites.net/api/lecture/by-course/${idCourse}`
      );
      setLectures(responseData?.data);
    };

    fetchData();
  }, []);

  const handlePushMentor = () => {
    if (userData) {
      if (courses && courses.mentorUserId) {
        router.push(`/profile-mentor/${courses.mentorUserId}`);
      }
    } else {
      if (courses && courses.mentorId) {
        router.push(`/profile-mentor/${courses.mentorId}`);
      }
    }
  };

  const [listRating, setListRating] = useState<Rating[]>([]);

  useEffect(() => {
    http
      .get(`/rating/listRatingOfCourse/${idCourse}`)
      .then((response) => {
        setListRating(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // setLoading(false);
      });
  }, [idCourse]);

  const payment = async (
    userId: any,
    courseId: any,
    returnUrl: string | number | boolean
  ) => {
    const url = `https://learnconnectapi.azurewebsites.net/api/enrollment/Enroll?userId=${userId}&courseId=${courseId}&returnUrl=${encodeURIComponent(
      returnUrl
    )}`;

    try {
      const response = await http.post(url);
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

  const handleClickGotoCourse = () => {
    router.push(`/my-course/${idCourse}`);
    // setIsModalVisible(false);
  };

  const breadcrumbsHome = () => {
    router.push("/");
  };
  const breadcrumbCourses = () => {
    router.push("/courses");
  };
  return (
    <>
      <div className="bg-[#e7f8ee]">
        <div
          className="bg-no-repeat bg-auto flex flex-row justify-between"
          style={{
            backgroundImage: "url('/images/shape-23.png')",
          }}
        >
          <div>
            <Breadcrumb className="font-semibold text-3xl py-5 px-64 flex-auto">
              <Breadcrumb.Item>
                <button onClick={breadcrumbsHome}>Home</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <button onClick={breadcrumbCourses}>Courses</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>{courses?.name}</span>
              </Breadcrumb.Item>
            </Breadcrumb>{" "}
          </div>
          <div
            className="w-2/5 bg-auto bg-no-repeat bg-right-top flex-1"
            style={{
              backgroundImage: "url('/images/shape-24.png')",
            }}
          />
        </div>
        {/* </div> */}
      </div>
      {/* <div className="container"> */}
      {/* <div className="bg-[#fff]"> */}
      <div className="container">
        <div className="grid cols-2 lg:grid-cols-12 pb-20 pt-10">
          <div className="lg:col-span-8 max-w-3xl mx-auto w-full">
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
                  <button>
                    <img
                      src={courses?.mentorProfilePictureUrl}
                      alt="Author"
                      className="rounded-full w-12 h-12 object-cover"
                      onClick={handlePushMentor}
                    />
                  </button>
                </div>
                <div className="author-content pl-4">
                  <button
                    className="text-base pl-4 pb-1.5"
                    onClick={handlePushMentor}
                  >
                    {courses?.mentorName}
                  </button>
                  {/* <Link
                      className="text-base pl-4 pb-1.5"
                      href="#"
                      onClick={handlePushMentor}
                    >
                      {courses?.mentorName}
                    </Link> */}
                  <span className="mx-5"></span>
                  <span className="text-sm font-normal text-[#309255]">
                    {courses?.totalEnrollment !== undefined ? (
                      <>
                        {courses.totalEnrollment.toLocaleString()}{" "}
                        {courses.totalEnrollment <= 1
                          ? "Enrolled Student"
                          : "Enrolled Students"}
                      </>
                    ) : (
                      "No Enrollment Data"
                    )}
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
                  {courses && courses.totalRatingCount !== undefined
                    ? courses.totalRatingCount <= 1
                      ? `(${courses.totalRatingCount} Rating)`
                      : `(${courses.totalRatingCount} Ratings)`
                    : "No Ratings"}
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
                      Lectures
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
                    <div className="grid cols-2 lg:grid-cols-12 border-[#dff0e6] border border-solid rounded-lg px-[70px] pb-[35px] mt-5">
                      {/* <div className="lg:col-span-4 px-[15px]">
                          <div className="">
                            <h4 className="text-[25px] px-[15px] pt-5 text-[#212832]">
                              Details
                            </h4>
                          </div>
                        </div> */}
                      <div className="lg:col-span-12">
                        <div className="text-[15px] font-medium mt-[25px] px-[15px]">
                          <p className="mb-4 leading-loose">
                            {courses?.description}{" "}
                          </p>
                          <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                  <table className="min-w-full text-left text-sm font-light">
                                    <tbody>
                                      <tr className="border-b border-b-[#e7f8ee]">
                                        <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
                                          Specialization
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                          :
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-normal">
                                          {courses?.specializationName}
                                        </td>
                                      </tr>
                                      <tr className="border-b border-b-[#e7f8ee]">
                                        <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
                                          Mentor
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                          :
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-normal">
                                          {/* {courses.} */}
                                          {courses?.mentorName}
                                        </td>
                                      </tr>
                                      <tr className="border-b border-b-[#e7f8ee]">
                                        <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
                                          Duration
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                          :
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-normal">
                                          {courses?.contentLength ?? 0}{" "}
                                          <span>
                                            {courses?.contentLength &&
                                            courses.contentLength <= 1
                                              ? "minute"
                                              : "minutes"}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr className="border-b border-b-[#e7f8ee]">
                                        <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
                                          Lecture
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                          :
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-normal">
                                          {courses?.lectureCount}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "tab2" && (
                  <div className="w-full mx-auto">
                    <div className="faq-wrapper">
                      <div className="single-faq-item">
                        <div className="grid cols-2 lg:grid-cols-12 border-[#dff0e6] border border-solid rounded-lg px-[70px] pb-[35px] mt-5">
                          <div className="lg:col-span-12">
                            {lectures &&
                              lectures.map((item, index) => (
                                <div key={index}>
                                  <p className="mt-5 font-bold">
                                    Lecture {index + 1}: {item.title}
                                  </p>
                                  <p className="mt-3.5 text-[#52565b] text-base font-normal">
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
                    <div className="reviews-wrapper reviews-active">
                      <div className="swiper-container">
                        <div className="swiper-wrapper">
                          {listRating.map((item) => {
                            return (
                              <>
                                <div className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-7 rounded-md">
                                  <div className="review-author flex justify-between">
                                    <div className="flex flex-row">
                                      <div className="author-thumb p-2 rounded-full">
                                        <img
                                          src={item.userRatingInfo.imageUser}
                                          alt="Author"
                                          className="w-16 h-16 rounded-full"
                                        />
                                      </div>
                                      <div className="author-content pl-4 flex flex-col justify-center">
                                        <div className=" font-bold text-xl">
                                          {item.userRatingInfo.fullName}
                                        </div>
                                        <span className=" text-[#309255] font-light">
                                          {item.ratingCourseInfo.timeStamp
                                            ? new Date(
                                                item.ratingCourseInfo.timeStamp
                                              ).toLocaleTimeString("en-US")
                                            : ""}{" "}
                                          {item.ratingCourseInfo.timeStamp
                                            ? new Date(
                                                item.ratingCourseInfo.timeStamp
                                              ).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                              })
                                            : ""}{" "}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="">
                                      <Rating
                                        size="large"
                                        name="half-rating-read"
                                        max={5}
                                        precision={0.1}
                                        readOnly
                                        value={item.ratingCourseInfo.rating1}
                                      />
                                    </div>
                                  </div>
                                  {item.ratingCourseInfo.comment === "null" ? (
                                    <></>
                                  ) : (
                                    <p className="mt-3 font-semibold text-[#52565b] ">
                                      {item.ratingCourseInfo.comment}
                                    </p>
                                  )}
                                </div>
                              </>
                            );
                          })}
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
                          {
                            courses?.contentLength !== undefined
                              ? `${courses.contentLength} ${
                                  courses.contentLength <= 1
                                    ? "minute"
                                    : "minutes"
                                }`
                              : "N/A" // or some default value when contentLength is undefined
                          }
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
                    {courses?.enrolled ? (
                      <div className="flex flex-col justify-center items-center">
                        <Button
                          disabled
                          className="inline-block align-middle text-center select-none font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-[#e7f8ee] text-[#309255] btn-outline w-44 border-[#309255] border transition-all duration-300 ease-in-out delay-0 my-2"
                        >
                          Enrolled
                        </Button>
                        <div className="text-lg">
                          <span>Go to </span>
                          <Button
                            className="text-[#309255] underline"
                            onClick={handleClickGotoCourse}
                          >
                            Course
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          if (!jwtToken) {
                            toast.error("You Must Login To Buy Course");
                            router.push("/login");
                            return;
                          } else {
                            setIsModalVisible(true);
                          }
                        }}
                        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-[#309255] text-white hover:bg-black btn-outline w-44 border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                      >
                        Enroll Now
                      </Button>
                    )}
                    <Modal
                      title="Your Order Preview"
                      visible={isModalVisible}
                      onOk={() => {
                        payment(
                          idUser,
                          idCourse,
                          "https://learnconnect.vercel.app/after-payment"
                          // "http://localhost:3000/after-payment"
                        );

                        setIsModalVisible(false);
                      }}
                      onCancel={() => {
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
                            {courses?.price && courses?.price.toLocaleString()}
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
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
