"use client";
import React from "react";
import ReactStars from "react-stars";
import { Button } from "react-bootstrap";
import { Modal, Space } from "antd";
import InstructorCourseStyle from "./styles/style.module.scss";
import Link from "next/link";

const Dashboard = () => {
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
        {/* DashBoard */}
        <div className={`${InstructorCourseStyle.body_container}`}>
            DashBoard
          {/* <div className={`${InstructorCourseStyle.body_message}`}>
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
          </div> */}
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
    </div>
  );
};

export default Dashboard;
