"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Breadcrumb, DatePicker, Spin, Table, Tag } from "antd";
import LeftNavbar from "@/components/left-navbar/page";
import MentorRequest from "@/components/mentor-request/page";
import { UserAuth } from "@/app/context/AuthContext";
import { SortOrder } from "antd/es/table/interface";
import { http } from "@/api/http";
import moment from "moment";
import "moment/locale/vi";
import dayjs from "dayjs";

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

const StaffTransaction = () => {
  const [selectedComponent, setSelectedComponent] = useState("MentorRequest");
  const { id, userData } = UserAuth();

  const [activeTab, setActiveTab] = useState("revenue");
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const [pagination, setPagination] = useState({
    showSizeChanger: false, // Ẩn tuỳ chọn chọn số lượng bản ghi trên mỗi trang
    showQuickJumper: false,
    current: 1,
    pageSize: 10, // Số dòng mỗi trang
  });

  const handlePageChange = (current, pageSize) => {
    setPagination({
      showSizeChanger: false, // Ẩn tuỳ chọn chọn số lượng bản ghi trên mỗi trang
      showQuickJumper: false,
      current,
      pageSize,
    });
  };

  const today = dayjs();

  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [date, setDate] = useState<any>("");
  console.log("hmmm", date);

  useEffect(() => {
    if (userData) {
      try {
        http
          .get(
            `https://learnconnectapi.azurewebsites.net/api/payment-transaction/transaction-history-staff?filterDate=${date}&filterType=${activeTab}`
          )
          .then((res) => {
            setTransaction(res.data);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [activeTab, userData, date]);

  const data = [
    {
      key: "1",
      index: 1,
      buyerName: "Người mua 1",
      courseName: "Khóa học 1",
      price: 100,
      purchaseDate: "01/01/2023",
      status: "Hoàn thành",
    },
    {
      key: "2",
      index: 2,
      buyerName: "Người mua 2",
      courseName: "Khóa học 2",
      price: 150,
      purchaseDate: "02/01/2023",
      status: "Chờ xử lý",
    },
    // Thêm dữ liệu khác nếu cần
  ];

  const columns = [
    {
      title: "Student Name",
      dataIndex: "userBuy",
      key: "userBuy",
      sorter: (a, b) => a.userBuy.localeCompare(b.userBuy),
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      sorter: (a, b) => a.courseName.localeCompare(b.courseName),
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (price) => (price === 0 ? <>Free</> : price),
    },
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
      key: "transactionId",
      sorter: (a, b) => a.transactionId - b.transactionId,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text) => (text === null ? <>-</> : text),
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      sorter: (a, b) =>
        new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text) => moment(text).locale("en").format("LLL"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => (a.status ? 1 : -1) - (b.status ? 1 : -1),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
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

      case 2:
        return "gray";
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
      case 2:
        return "Pending";
      default:
        return "Unknown Status";
    }
  };

  const columns2 = [
    {
      title: "Mentor Name",
      dataIndex: "mentorPay",
      key: "mentorPay",
      sorter: (a, b) => a.mentorPay.localeCompare(b.mentorPay),
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
      key: "transactionId",
      sorter: (a, b) => a.transactionId - b.transactionId,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text) => (text === null ? <>-</> : text),
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      sorter: (a, b) =>
        new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text) => moment(text).locale("en").format("LLL"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => (a.status ? 1 : -1) - (b.status ? 1 : -1),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
  ];

  const handleDateChange = (date: any, dateString: string) => {
    // console.log("Selected Dates:", date.format("YYYY-MM-DD"));
    console.log("Formatted Dates:", dateString);
    setDate(dateString);
  };

  // const handleOpenChange = (status) => {
  //   console.log(status);
  //   // Nếu lựa chọn đã mở và bạn nhấp vào nút "Hủy", đặt giá trị thành null
  //   if (!status) {
  //     handleDateChange("", "");
  //   }
  // };

  return (
    <>
      {!userData ? (
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

          <div className="w-full mt-4">
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
                  // onOpenChange={handleOpenChange}
                  format="YYYY-MM-DD"
                  // defaultValue={}
                  disabledDate={disabledDate}
                  style={{ height: "40px" }}
                />
              </div>
            </div>
            <div className="flex justify-center py-2 rounded-md">
              <ul className="tabs flex space-x-5">
                <li
                  className={`cursor-pointer rounded-md shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                    activeTab === "revenue"
                      ? "bg-[#309255] text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleTabClick("revenue")}
                >
                  <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                    Student
                  </button>
                </li>
                <li
                  className={`cursor-pointer rounded-md shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                    activeTab === "pay" ? "bg-[#309255] text-white" : "bg-white"
                  }`}
                  onClick={() => handleTabClick("pay")}
                >
                  <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                    Mentor
                  </button>
                </li>
              </ul>
            </div>
            {activeTab === "revenue" && (
              <div className="mx-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg">
                <Table
                  dataSource={transaction}
                  columns={columns}
                  pagination={{ ...pagination, onChange: handlePageChange }}
                />
              </div>
            )}

            {activeTab === "pay" && (
              <div className="mx-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg">
                <Table
                  dataSource={transaction}
                  columns={columns2}
                  pagination={{ ...pagination, onChange: handlePageChange }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StaffTransaction;
