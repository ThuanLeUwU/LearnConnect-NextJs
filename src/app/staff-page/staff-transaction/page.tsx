"use client";
import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  DatePicker,
  Form,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
} from "antd";
import LeftNavbar from "@/components/left-navbar/page";
import { UserAuth } from "@/app/context/AuthContext";
import { SortOrder } from "antd/es/table/interface";
import { http } from "@/api/http";
import moment from "moment";
import "moment/locale/vi";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

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

  const [form] = Form.useForm();
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
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    if (userData) {
      try {
        http
          .get(
            `https://learnconnectapifpt.azurewebsites.net/api/payment-transaction/transaction-history-staff?filterDate=${date}&filterType=${activeTab}`
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
      title: "Date",
      dataIndex: "createDate",
      key: "createDate",
      width: 140,
      sorter: (a, b) =>
        new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Transaction ID",
      dataIndex: "paymentTransactionId",
      key: "paymentTransactionId",
      width: 150,
      sorter: (a, b) => a.paymentTransactionId - b.paymentTransactionId,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (paymentTransactionId) =>
        paymentTransactionId === 0 ? (
          <>Free</>
        ) : (
          numberWithCommas(paymentTransactionId)
        ),
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      sorter: (a, b) => a.courseName.localeCompare(b.courseName),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      onCell: (record) => ({
        onClick: () => {
          const courseId = record.courseId;
          if (courseId) {
            router.push(`/staff-page/moderation/${courseId}`);
          }
        },
      }),
    },
    // {
    //   title: "Success Date",
    //   dataIndex: "successDate",
    //   key: "successDate",
    //   width: 140,
    //   sorter: (a, b) =>
    //     new Date(a.successDate).getTime() - new Date(b.successDate).getTime(),
    //   sortDirections: ["ascend", "descend"] as SortOrder[],
    //   render: (date) =>
    //     moment(date).isValid()
    //       ? moment(date).format("YYYY-MM-DD HH:mm:ss")
    //       : "-",
    // },
    {
      title: "Student Name",
      dataIndex: "userBuy",
      key: "userBuy",
      sorter: (a, b) => a.userBuy.localeCompare(b.userBuy),
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },

    {
      title: "Price (VND)",
      dataIndex: "price",
      key: "price",
      width: 140,
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (price) =>
        price === 0 ? <>Free</> : <>{numberWithCommas(price)}</>,
    },
    {
      title: "VNPay Transaction Code",
      dataIndex: "transactionId",
      key: "transactionId",
      width: 200,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
      width: 140,
      sorter: (a, b) => a.enrollmentId - b.enrollmentId,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (enrollmentId) =>
        enrollmentId === 0 ? <>Free</> : numberWithCommas(enrollmentId),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      sorter: (a, b) => a.status - b.status,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (status, record) => (
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
        return "yellow";
      case 3:
        return "purple"; // Màu mặc định nếu status không phù hợp với bất kỳ trạng thái nào
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
      case 3:
        return "Handled";
    }
  };

  const router = useRouter();

  const columns2 = [
    {
      title: "Date",
      dataIndex: "createDate",
      key: "createDate",
      width: 120,
      sorter: (a, b) => a.createDate.localeCompare(b.createDate),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Transaction ID",
      dataIndex: "paymentTransactionId",
      key: "paymentTransactionId",
      width: 150,
      sorter: (a, b) => a.paymentTransactionId - b.paymentTransactionId,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (paymentTransactionId) =>
        paymentTransactionId === 0 ? (
          <>Free</>
        ) : (
          numberWithCommas(paymentTransactionId)
        ),
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      sorter: (a, b) => a.courseName.localeCompare(b.courseName),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      onCell: (record) => ({
        onClick: () => {
          const courseId = record.courseId;
          if (courseId) {
            router.push(`/staff-page/moderation/${courseId}`);
          }
        },
      }),
    },
    {
      title: "Mentor Name",
      dataIndex: "mentorPay",
      key: "mentorPay",
      width: 200,
      sorter: (a, b) => a.mentorPay.localeCompare(b.mentorPay),
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "Course Price (VND)",
      dataIndex: "coursePrice",
      key: "coursePrice",
      width: 140,
      sorter: (a, b) => a.coursePrice - b.coursePrice,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (coursePrice) =>
        coursePrice === 0 ? <>Free</> : <>{numberWithCommas(coursePrice)}</>,
    },
    {
      title: "Platform Fee (VND)",
      dataIndex: "platformFee",
      key: "platformFee",
      width: 140,
      sorter: (a, b) => a.platformFee - b.platformFee,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (platformFee) =>
        platformFee === 0 ? <>Free</> : <>{numberWithCommas(platformFee)}</>,
    },
    {
      title: "Amount (VND)",
      dataIndex: "amount",
      key: "amount",
      width: 140,
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (amount) =>
        amount === 0 ? <>Free</> : <>{numberWithCommas(amount)}</>,
    },
    {
      title: "PayPal Transaction Code",
      dataIndex: "transactionId",
      key: "transactionId",
      width: 200,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text) =>
        text === null ? (
          <>-</>
        ) : (
          <a
            href={`https://www.sandbox.paypal.com/activity/masspay/${text}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        ),
    },
    {
      title: "Enrollment ID",
      dataIndex: "enrollmentId",
      key: "enrollmentId",
      width: 140,
      sorter: (a, b) => a.enrollmentId - b.enrollmentId,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (enrollmentId) =>
        enrollmentId === 0 ? <>Free</> : numberWithCommas(enrollmentId),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      sorter: (a, b) => a.status - b.status,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (status, record) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "Note",
      dataIndex: "transactionError",
      key: "transactionError",
      width: 200,
      sorter: (a, b) => {
        const errorA = a.transactionError || "";
        const errorB = b.transactionError || "";
        return errorA.localeCompare(errorB);
      },
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text) => (text === null ? <>-</> : text),
    },
    {
      title: "",
      key: "actionRepay",
      width: 100,
      render: (text, record) => {
        // Kiểm tra nếu trạng thái là 1, hiển thị nút hoặc phần giao diện bạn muốn
        if (record.status === 2) {
          return (
            <Button
              onClick={() => {
                handleRepay(record);
              }}
            >
              Repay
            </Button>
          );
        } else {
          return <>-</>;
        }
      },
    },
  ];
  function numberWithCommas(x) {
    if (x !== undefined && x !== null) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "N/A";
    }
  }
  const [modalRepay, setModalRepay] = useState(false);
  const [repayId, setRepayId] = useState<number>(0);

  const [mentorPay, setMentorPay] = useState<string>("");
  const [dateError, setdateError] = useState<string>("");
  const [courseName, setCourseName] = useState<string>("");
  const [transactionError, setTransactionError] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleRepay = (record) => {
    // Thực hiện các hành động cần thiết khi người dùng nhấn nút Repay
    setRepayId(record.paymentTransactionId);
    setMentorPay(record.mentorPay); // Set mentorPay value
    setAmount(record.amount);
    setTransactionError(record.transactionError);
    setCourseName(record.courseName);
    setdateError(record.createDate);
    setModalRepay(true);
    console.log("Repay action for record:", record.paymentTransactionId);
    // ... (thêm logic xử lý ở đây)
  };

  const handleRepayClick = () => {
    try {
      http
        .post(
          `https://learnconnectapifpt.azurewebsites.net/api/payment-transaction/re-pay?transactionId=${repayId}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          setModalRepay(false);
          http
            .get(
              `https://learnconnectapifpt.azurewebsites.net/api/payment-transaction/transaction-history-staff?filterDate=${date}&filterType=${activeTab}`
            )
            .then((res) => {
              setTransaction(res.data);
            });
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setModalRepay(false);
  };

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
            page1={"/staff-page"}
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
                    <div className="text-start font-semibold text-2xl my-5 px-4">
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

      <Modal
        destroyOnClose={true}
        title={
          <div className="text-xl">
            Are you sure you want to Repay for {mentorPay}?
          </div>
        }
        open={modalRepay}
        // onOk={handleOk}
        width="35%"
        onCancel={handleCancel}
        footer={false}
        style={{
          top: "30%",
        }}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 23 }}
          layout="horizontal"
          className="mt-5"
          style={{ width: "100%" }}
          onFinish={handleRepayClick}
        >
          <Form.Item className="w-full mb-0">
            <div className="text-lg">
              Course: <strong>{courseName}</strong> <br />
              Mentor: <strong>{mentorPay}</strong>
              <br />
              Course Price: <strong>{numberWithCommas(amount)}</strong> VND
              <br />
              Error: <strong>{transactionError}</strong>
            </div>
            {/* <div className="text-lg">
              There seems to be an issue with the payment for the course &quot;
              <strong>{courseName}</strong>&quot; scheduled for{" "}
              <strong>{moment(dateError).format("YYYY-MM-DD HH:mm:ss")}</strong>{" "}
              with mentor <strong>{mentorPay}</strong>. Width error is{" "}
              <strong>{transactionError}</strong>.
            </div> */}
            <div className="text-lg mt-5">
              Are you sure you want to proceed with the payment of{" "}
              <strong>{numberWithCommas(amount)}</strong> VND for mentor{" "}
              <strong>{mentorPay}</strong> ?
            </div>
          </Form.Item>
          <Space className="justify-end w-full mt-5">
            <Form.Item className="mb-0">
              <Space>
                <Button
                  className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                  onClick={handleCancel}
                  style={{
                    border: "2px solid #E0E0E0",
                    color: "black",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="hover:bg-[#67b46a] border border-[#4caf50] bg-[#4caf50] text-white transition duration-300 px-2 py-1"
                  htmlType="submit"
                  style={{
                    border: "2px solid #4caf50",
                    color: "#fff",
                  }}
                >
                  Confirm
                </Button>
              </Space>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default StaffTransaction;
