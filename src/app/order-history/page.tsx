"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Avatar,
  Breadcrumb,
  Button,
  DatePicker,
  Modal,
  Spin,
  Table,
  Tag,
  Tooltip,
} from "antd";
import LeftNavbar from "@/components/left-navbar/page";
import MentorRequest from "@/components/mentor-request/page";
import { UserAuth } from "@/app/context/AuthContext";
import { SortOrder } from "antd/es/table/interface";
import { http } from "@/api/http";
import InstructorCourseStyle from "./styles/style.module.scss";
import moment from "moment";
import "moment/locale/vi";
import dayjs from "dayjs";
import Link from "next/link";
import { Revenue } from "../revenue/page";

export type Transaction = {
  userBuy: string;
  courseName: string;
  price: number;
  transactionId: number;
  createDate: string;
  successDate: string;
  transactionError: string;
  status: number;
  mentorPay: string;
  amount: number;
};

const OrderHistory = () => {
  const [selectedComponent, setSelectedComponent] = useState("MentorRequest");
  const { id, userData } = UserAuth();

  const [activeTab, setActiveTab] = useState("revenue");
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Số dòng mỗi trang
  });

  const [isModal, setIsModal] = useState(false);
  const [enrollList, setEnrollList] = useState<Revenue[]>([]);

  const detailsEnroll = (value) => {
    // Đặt logic xử lý cho việc lọc dữ liệu theo ngày ở đây
    // console.log("vải", value.usersEnroll);
    setIsModal(true);
    setEnrollList(value.usersEnroll);
  };

  const handlePageChange = (current, pageSize) => {
    setPagination({ current, pageSize });
  };

  const today = dayjs();

  const [transaction, setTransaction] = useState<Transaction[]>([]);

  const [eachCourse, setEachCourse] = useState<Revenue[]>([]);
  const [date, setDate] = useState<dayjs.Dayjs>(today);

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectapi.azurewebsites.net/api/payment-transaction/revenue-mentor?mentorUserId=${id}&filterDate=${date.format(
            "YYYY-MM-DD"
          )}`
        )
        .then((res) => {
          setEachCourse(res.data[0].revenueCourse);
        });
    } catch (e) {
      console.log(e);
    }
  }, [activeTab, userData, date]);

  const menuItem = [
    {
      image: "/menu-icon/book-alt.png",
      title: "Courses",
      href: "/instructorcourses",
    },
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
    {
      image: "/menu-icon/receipt.png",
      title: "Transaction History",
      href: "/order-history",
    },
  ];

  const columns = [
    {
      title: "Course Image",
      dataIndex: "courseImage",
      key: "courseImage",
      render: (text, record) => (
        <img
          src={record.courseImage}
          alt={`Course Image`}
          style={{ width: "100px", height: "100px" }} // Set the desired width and height
        />
      ),
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      sorter: (a, b) => a.courseName.localeCompare(b.courseName),
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "Revenue Course",
      dataIndex: "totalRevenueCourse",
      key: "totalRevenueCourse",
      sorter: (a, b) => a.totalRevenueCourse - b.totalRevenueCourse,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (price) => (price === 0 ? <>Free</> : price),
    },
    {
      title: "Enrollment",
      dataIndex: "totalEnroll",
      key: "totalEnroll",
      sorter: (a, b) => a.totalEnroll - b.totalEnroll,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text) => (text === null ? <>-</> : text),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          style={{
            // backgroundColor: "#4caf50",
            // borderColor: "#4caf50",
            border: "1px solid #E0E0E0",
            color: "black",
          }}
          onClick={() => detailsEnroll(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const disabledDate = (current: dayjs.Dayjs | null) => {
    return current ? current.isAfter(today) : false;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "green"; // Màu xanh cho trạng thái Active
      case 1:
        return "red"; // Màu đỏ hồng cho trạng thái Banned
      default:
        return "defaultColor"; // Màu mặc định nếu status không phù hợp với bất kỳ trạng thái nào
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Success";
      case 1:
        return "Error";
      default:
        return "Unknown Status";
    }
  };

  const columns2 = [
    {
      title: "Avatar",
      dataIndex: "userImage",
      key: "userImage",
      render: (userImage) => <Avatar src={userImage} />,
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Time",
      dataIndex: "enrollmentDate",
      key: "enrollmentDate",
      render: (enrollmentDate) => moment(enrollmentDate).format("HH:mm:ss"),
    },
  ];

  const handleDateChange = (date: dayjs.Dayjs, dateString: string) => {
    console.log("Selected Dates:", date.format("YYYY-MM-DD"));
    console.log("Formatted Dates:", dateString);
    setDate(date);
  };

  return (
    <>
      <>
        {!userData ? (
          <div className="text-center text-5xl mt-5">
            <Spin size="large" />
          </div>
        ) : (
          <div className={`${InstructorCourseStyle.content_wrapper} `}>
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
            <div className={`${InstructorCourseStyle.body_wrapper}`}>
              <div className="flex flex-col pb-5 gap-2">
                <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <div className="text-start font-semibold text-4xl my-5 px-4">
                        Transaction History
                      </div>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <DatePicker
                    onChange={handleDateChange}
                    format="YYYY-MM-DD"
                    defaultValue={today}
                    disabledDate={disabledDate}
                    style={{ height: "40px" }}
                  />
                </div>
              </div>
              <div className="mx-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg">
                <Table
                  dataSource={eachCourse}
                  columns={columns}
                  pagination={{ ...pagination, onChange: handlePageChange }}
                />
              </div>
            </div>
          </div>
        )}
        <Modal
          title="List Enrollment"
          open={isModal}
          onCancel={() => setIsModal(false)}
          footer={false}
        >
          <Table
            columns={columns2}
            dataSource={enrollList}
            pagination={{ ...pagination, onChange: handlePageChange }}
          />
        </Modal>
      </>
      {/* {!userData ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex w-full">
          <LeftNavbar
            page1={"#"}
            page2={"/staff-page/staff-rating"}
            page3={"/staff-page/staff-report"}
            page4={"/staff-page/moderation"}
            page5={"/staff-page/list-major"}
            page6={"/staff-page/staff-revenue"}
            page7={"/staff-page/staff-transaction"}
          />
        </div>
      )} */}
    </>
  );
};

export default OrderHistory;
