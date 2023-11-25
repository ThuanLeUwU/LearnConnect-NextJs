"use client";
import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Button } from "react-bootstrap";
import { Empty, Modal, Space, Spin, Tooltip } from "antd";
import InstructorCourseStyle from "./styles/style.module.scss";
import Link from "next/link";
import { Rating } from "@mui/material";
import { http } from "@/api/http";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export type Review = {
  ratingMentorInfo: any;
  userRatingInfo: any;
  id: number;
  rating1: number;
  comment: string;
  timeStamp: string;
  status: number;
  userId: number;
  courseId: number;
  mentorId: number;
};

const Reviews = () => {
  const { role } = UserAuth();
  const router = useRouter();
  useEffect(() => {
    if (role === 0) {
      router.push(`/user-manage`);
    }
    if (role === 1) {
      router.push(`/staff-page`);
    }
    // if (role === 2) {
    //   router.push(`/instructorcourses`);
    // }
    if (role === 3) {
      router.push(`/`);
    }
    if (role === -1) {
      router.push(`/`);
    }
  });
  const { id, userData } = UserAuth();

  const menuItem = [
    {
      image: "/menu-icon/book-alt.png",
      title: "Courses",
      href: "/instructorcourses",
    },
    // {
    //   image: "/menu-icon/icon-2.png",
    //   href: "/dashboard",
    // },
    {
      image: "/menu-icon/feedback-review.png",
      title: "Reviews",
      href: "/review-mentor",
    },
    {
      image: "/menu-icon/money-check-edit.png",
      title: "Revenues",
      href: "/revenue",
    },
    {
      image: "/menu-icon/file-edit.png",
      title: "Requests",
      href: "/request-history",
    },
  ];

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(`/rating/listRatingOfMentor/${id}`)
      .then((response) => {
        // setInfoTest(response.data.questions);
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className={`${InstructorCourseStyle.content_wrapper}`}>
      <div className={`${InstructorCourseStyle.sidebar_wrapper}`}>
        <div className={`${InstructorCourseStyle.sidebar_list}`}>
          {menuItem.map((item, index) => {
            return (
              <Tooltip key={index} title={item.title}>
                <Link
                  key={index}
                  href={item.href}
                  className={`${InstructorCourseStyle.sidebar_active} mt-5`}
                >
                  <img src={item.image} alt="image"></img>
                </Link>
              </Tooltip>
            );
          })}
        </div>
      </div>
      {loading ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className={`${InstructorCourseStyle.body_wrapper}`}>
          {/* DashBoard */}
          <div className={`${InstructorCourseStyle.featured}`}>
            <div className={`${InstructorCourseStyle.featured_top}`}>
              <h1 className={`${InstructorCourseStyle.featured_top_title}`}>
                Reviews About Me
              </h1>
            </div>
            {reviews.length === 0 ? (
              <div className="text-center">
                <Empty description="No Reviews" className="text-4xl" />
              </div>
            ) : (
              <>
                {reviews.map((item) => {
                  return (
                    <>
                      <div className="single-review mt-3.5 border-4 border-opacity-10 border-black p-7 rounded-md hover:border-[#48b544]">
                        <div className="review-author flex justify-between">
                          <div className="flex flex-row">
                            <div className="author-thumb p-2">
                              <img
                                src={item.userRatingInfo.imageUser}
                                alt="Author"
                                className="w-24 h-24 rounded-full"
                              />
                              <i className="icofont-quote-left"></i>
                            </div>
                            <div className="author-content pl-4 flex flex-col">
                              <h4 className="text-2xl font-medium">
                                {item.userRatingInfo.fullName}
                              </h4>
                              <span className="text-lg text-[#309255] mt-1.5 font-medium ">
                                {item.ratingMentorInfo.timeStamp
                                  ? new Date(
                                      item.ratingMentorInfo.timeStamp
                                    ).toLocaleTimeString("en-US")
                                  : ""}{" "}
                                {item.ratingMentorInfo.timeStamp
                                  ? new Date(
                                      item.ratingMentorInfo.timeStamp
                                    ).toLocaleDateString("en-GB", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })
                                  : ""}{" "}
                              </span>
                              <p className="mt-3 font-medium text-[#52565b] text-lg">
                                {item.ratingMentorInfo.comment}
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <Rating
                              size="large"
                              name="half-rating-read"
                              max={5}
                              precision={0.1}
                              readOnly
                              value={item.ratingMentorInfo.rating1}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}

            {/* <div className={`${InstructorCourseStyle.featured_bottom}`}> */}
          </div>
          {/* <div className={`${InstructorCourseStyle.course_tab}`}>
          <h3 className={`${InstructorCourseStyle.course_tab_title}`}>
            Course
          </h3>
          <div className={`${InstructorCourseStyle.course_tab_btn}`}>
            <Button
              onClick={() => {
                Modal.confirm({
                  title: "Create New Course",
                  content: (
                    <CreateCourse
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
              className={`${InstructorCourseStyle.create_btn}`}
            >
              <h6> New Course</h6>
            </Button>
          </div>
        </div>
        <div className={`${InstructorCourseStyle.course_list_wrapper}`}>
          <div className={`${InstructorCourseStyle.course_item}`}>
            <div>
              <Link href="#">
                <img src="/images/admin-courses-01.jpg" alt="Image" />
              </Link>
            </div>
            <div className={`${InstructorCourseStyle.course_item_title}`}>
              <h2>
                <Link href="#">
                  Build An eCommerce Site With WooCommerce and WooLentor.
                </Link>
              </h2>
            </div>
            <div className={`${InstructorCourseStyle.course_tracker}`}>
              <div className={`${InstructorCourseStyle.course_tracker_1}`}>
                <p>Earned</p>
                <span
                  className={`${InstructorCourseStyle.course_tracker_count}`}
                >
                  $5,68.00
                </span>
              </div>
              <div className={`${InstructorCourseStyle.course_tracker_2}`}>
                <p>Enrollments</p>
                <span
                  className={`${InstructorCourseStyle.course_tracker_count}`}
                >
                  1,500
                </span>
              </div>
              <div className={`${InstructorCourseStyle.course_tracker_3}`}>
                <p>Course Rating</p>
                <span
                  className={`${InstructorCourseStyle.course_tracker_count}`}
                >
                  4.5
                  <ReactStars count={1} color2={"#ffd700"}></ReactStars>
                </span>
              </div>
            </div>
          </div>
          <div className={`${InstructorCourseStyle.course_item}`}></div>
          <div className={`${InstructorCourseStyle.course_item}`}></div>
        </div> */}
        </div>
      )}
    </div>
  );
};

export default Reviews;
