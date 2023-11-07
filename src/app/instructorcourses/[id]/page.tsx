"use client";
import React, { useEffect, useState } from "react";
import InstructorCourseStyle from ".././styles/style.module.scss";
import Link from "next/link";
import { Button, Form, Modal, Spin, Table } from "antd";
import { UserAuth } from "@/app/context/AuthContext";
import { Lecture } from "@/app/my-course/[id]/page";
import axios from "axios";

const Dashboard = ({ params }: any) => {
  const idCourse = params.id;
  console.log("param", params);
  const { id, userData, jwtToken } = UserAuth();

  //   console.log(" idcourse", idCourse);

  //create lecture
  const [loading, setLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModal(true);
  };

  const handleCancel = () => {
    setIsModal(false);
  };

  const handleSubmit = async (data: any) => {};

  //get list lecture
  const [lectures, setLectures] = useState<Lecture[]>([]);
  console.log("lecture", lectures);
  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    axios
      .get(
        `https://learnconnectapitest.azurewebsites.net/api/lecture/by-course/${idCourse}`
      )
      .then((response) => {
        setLectures(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);
  //table lecture
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "title",
    },
    {
      title: "URL",
      dataIndex: "contentUrl",
      key: "contentUrl",
    },
    {
      title: "Type",
      dataIndex: "contentType",
      key: "contentType",
      render: (text: number, record: any) => {
        return text === 1 ? "Video" : "Document";
      },
    },
  ];

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
  const data = [
    { name: "January", Total: 1200 },
    { name: "February", Total: 2100 },
    { name: "March", Total: 800 },
    { name: "April", Total: 1600 },
    { name: "May", Total: 900 },
    { name: "June", Total: 1700 },
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
        <div className={`${InstructorCourseStyle.featured}`}>
          <div className={`${InstructorCourseStyle.featured_top}`}>
            <h1 className={`${InstructorCourseStyle.featured_top_title}`}>
              Total Revenue
            </h1>
            {/* <MoreVertIcon fontSize="small" /> */}
          </div>
          <div className={`${InstructorCourseStyle.featured_bottom}`}>
            <div
              className={`${InstructorCourseStyle.featured_bottom_featuredChart}`}
            >
              {/* <CircularProgressbar value={70} text={"70%"} strokeWidth={5} /> */}
            </div>
            <p className={`${InstructorCourseStyle.featured_bottom_title}`}>
              Total sales made today
            </p>
            <p className={`${InstructorCourseStyle.featured_bottom_amount}`}>
              $420
            </p>
            <p className={`${InstructorCourseStyle.featured_bottom_desc}`}>
              Previous transactions processing. Last payments may not be
              included.
            </p>
            <div className={`${InstructorCourseStyle.featured_bottom_summary}`}>
              <div
                className={`${InstructorCourseStyle.featured_bottom_summary_item}`}
              >
                <div
                  className={`${InstructorCourseStyle.featured_bottom_summary_item_itemTitle}`}
                >
                  Target
                </div>
                <div
                  className={`${InstructorCourseStyle.featured_bottom_summary_item_itemTitle}`}
                >
                  {/* <KeyboardArrowDownIcon fontSize="small"/> */}
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
              <div
                className={`${InstructorCourseStyle.featured_bottom_summary_item}`}
              >
                <div
                  className={`${InstructorCourseStyle.featured_bottom_summary_item_itemTitle}`}
                >
                  Last Week
                </div>
                <div
                  className={`${InstructorCourseStyle.featured_bottom_summary_item_itemTitle}`}
                >
                  {/* <KeyboardArrowUpOutlinedIcon fontSize="small"/> */}
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Last Month</div>
                <div className="itemResult positive">
                  {/* <KeyboardArrowUpOutlinedIcon fontSize="small"/> */}
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${InstructorCourseStyle.lecture}`}>
          <div className="flex justify-between mb-5">
            <span className="text-lg">List of Lectures</span>
            <Button onClick={showModal}> New Lectures</Button>
          </div>
          {loading ? (
            <Spin size="large" />
          ) : (
            <Table dataSource={lectures} columns={columns} />
          )}
        </div>
      </div>
      <Modal
        destroyOnClose={true}
        title={`Create Lecture for Course by ${userData?.fullName}`}
        open={isModal}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          className="mt-5"
          style={{ width: 600 }}
          onFinish={handleSubmit}
        ></Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
