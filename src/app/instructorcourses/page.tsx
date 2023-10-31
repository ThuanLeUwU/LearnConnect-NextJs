"use client";
import React, { useEffect, useState } from "react";
import InstructorCourseStyle from "./styles/style.module.scss";
import Link from "next/link";
import { CreateCourse } from "@/components/createCourse";
import { Button } from "react-bootstrap";
import { Modal, Space } from "antd";
import ReactStars from "react-stars";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { Rating } from "@mui/material";

export type ListCourse = {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  price: string;
  totalEnrollment: number;
  lectureCount: number;
  contentLength: number;
  averageRating: number;
  createDate: string;
  status: number;
  categoryId: number;
  mentorId: number;
  categoryName: string;
  totalRatingCount: number;
};

const InstructorCourse = () => {
  const { id, user } = UserAuth();
  // console.log("id", id);
  // console.log("id", user);
  const [visible, setVisible] = useState(false);

  const [listCourseInstructor, setListCourseInstructor] = useState<
    ListCourse[]
  >([]);
  console.log("set", listCourseInstructor);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/course/get-courses-by-mentor?userId=8&currentPage=1&pageSize=6
        `
      );
      setListCourseInstructor(responseData?.data.courses);
      // console.log("má", responseData?.data.courses);
    };
    fetchData();
  }, []);

  const menuItem = [
    {
      image: "/menu-icon/icon-1.png",
      href: "/instructorcourses",
    },
    {
      image: "/menu-icon/icon-2.png",
      href: "/dashboard",
    },
    {
      image: "/menu-icon/icon-3.png",
      href: "/instructorcourses",
    },
    {
      image: "/menu-icon/icon-4.png",
      href: "/instructorcourses",
    },
  ];

  return (
    <div className={`${InstructorCourseStyle.content_wrapper}`}>
      <div className={`${InstructorCourseStyle.sidebar_wrapper}`}>
        <div className={`${InstructorCourseStyle.sidebar_list}`}>
          {menuItem.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.href}
                className={`${InstructorCourseStyle.sidebar_active}`}
              >
                <img src={item.image} alt="image"></img>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={`${InstructorCourseStyle.body_wrapper}`}>
        <div className={`${InstructorCourseStyle.body_container}`}>
          <div className={`${InstructorCourseStyle.body_message}`}>
            <div className={`${InstructorCourseStyle.message_icon}`}>
              <img src="/menu-icon/icon-6.png" alt="image" />
            </div>
            <div className={`${InstructorCourseStyle.message_content}`}>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry &apos s standard
                dummy text ever since the 1500s when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic.
              </p>
            </div>
          </div>
        </div>
        <div className={`${InstructorCourseStyle.course_tab}`}>
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
              <span className=""> New Course</span>
            </Button>
          </div>
        </div>
        <div className={`${InstructorCourseStyle.course_list_wrapper}`}>
          {listCourseInstructor.map((item, index) => {
            return (
              <div key={index}>
                <div className={`${InstructorCourseStyle.course_item}`}>
                  <div className="flex">
                    <div>
                      <Link href="#">
                        <img src="/images/admin-courses-01.jpg" alt="Image" />
                      </Link>
                    </div>
                    <div
                      className={`${InstructorCourseStyle.course_item_title}`}
                    >
                      <h2>
                        <Link href="#">{item.name}</Link>
                      </h2>
                    </div>
                  </div>
                  <div className={`${InstructorCourseStyle.course_tracker}`}>
                    <div
                      className={`${InstructorCourseStyle.course_tracker_1}`}
                    >
                      <p>Earned</p>
                      <span
                        className={`${InstructorCourseStyle.course_tracker_count}`}
                      >
                        $5,68.00
                      </span>
                    </div>
                    <div
                      className={`${InstructorCourseStyle.course_tracker_2}`}
                    >
                      <p>Enrollments</p>
                      <span
                        className={`${InstructorCourseStyle.course_tracker_count}`}
                      >
                        {item.totalEnrollment}
                      </span>
                    </div>
                    <div
                      className={`${InstructorCourseStyle.course_tracker_3}`}
                    >
                      <p>Course Rating</p>
                      <span
                        className={`${InstructorCourseStyle.course_tracker_count}`}
                      >
                        {item.averageRating}
                        {/* <ReactStars count={1} color2={"#ffd700"}></ReactStars> */}
                        <span>
                          <Rating
                            size="small"
                            name="half-rating-read"
                            defaultValue={item.averageRating}
                            precision={0.1}
                            readOnly
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InstructorCourse;
