"use client";
import { http } from "@/api/http";
import { useEffect, useState } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { Breadcrumb, Spin, Table, Space, Form, Modal, Button } from "antd";
import { Rating } from "@mui/material";
import { toast } from "sonner";
import { AlignType } from "react-bootstrap/esm/types";

export type Rating = {
  ratingInfo: any;
  id: number;
  rating1: number;
  comment: string | null;
  timeStamp: string;
  status: number;
  ratingBy: number;
  courseId: number;
  mentorId: number;
  email: string;
  userRatingInfo: {
    email: string;
    fullName: string;
    imageUser: string;
  };
};

const StaffRatingTable = () => {
  const { jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const [activeTab, setActiveTab] = useState("tab2");
  const [selectedType, setSelectedType] = useState("course");
  const handleTabClick = (tabName: string, type: string) => {
    setActiveTab(tabName);
    setSelectedType(type);
  };
  const [rating, setRating] = useState<Rating[]>([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedRatingId, setSelectedRatingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [form] = Form.useForm();

  const fetchData = async () => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
      try {
        const responseData = await http.get(
          `https://learnconnectserver.azurewebsites.net/api/rating/allListRatings?ratingType=${selectedType}`
        );
        setRating(responseData?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedType]);

  const handleRatingStatusUpdate = async (id, status) => {
    try {
      await axios.put(
        `https://learnconnectserver.azurewebsites.net/api/rating/update-rating-status?id=${id}&status=${status}`
      );
      fetchData();
      setTimeout(() => {
        toast.success("Display successful");
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleBanConfirmation = async (confirmed) => {
    setIsConfirmationModalOpen(false);

    if (confirmed) {
      try {
        await axios.put(
          `https://learnconnectserver.azurewebsites.net/api/rating/update-rating-status?id=${selectedRatingId}&status=0`
        );
        fetchData();
        setTimeout(() => {
          toast.success("Hidden successful");
        });
      } catch (error) {
        console.error("Error updating rating status:", error);
        setTimeout(() => {
          toast.error(error.response.data);
        });
      }
    }
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (pageSize: number) => {
    setRowsPerPage(pageSize);
    setPage(0);
  };

  const handleCancel = () => {
    setIsConfirmationModalOpen(false);
    form.resetFields();
  };

  const handleUnBanCourseClick = () => {
    handleBanConfirmation(true);
  };

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Số dòng mỗi trang
  });

  const handlePageChange = (current, pageSize) => {
    setPagination({ current, pageSize });
  };

  // Define columns for Ant Design Table
  const columns = [
    {
      title: "Rating Date",
      dataIndex: "ratingInfo",
      key: "ratingInfo",
      width: 150,

      render: (ratingInfo) => (
        <div className="text-[16px]">
          {new Date(ratingInfo.timeStamp).toLocaleDateString()}
          <br />
          {new Date(ratingInfo.timeStamp).toLocaleTimeString()}
        </div>
      ),
      sorter: (a, b) => {
        const dateA = new Date(a.ratingInfo.timeStamp);
        const dateB = new Date(b.ratingInfo.timeStamp);
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      title: "Course/Mentor",
      dataIndex: "ratingInfo",
      key: "courseName",
      render: (ratingInfo) => (
        <div className="flex">
          <img
            src={
              activeTab === "tab2"
                ? ratingInfo.courseImage
                : ratingInfo.mentorImage
            }
            alt="Author"
            className="w-28 h-28 rounded-lg border border-opacity-20 border-[#309255]"
          />
          <div className="mt-2">
            <p className="ml-2 text-[20px]">
              {activeTab === "tab2"
                ? ratingInfo.courseName
                : ratingInfo.mentorName}
            </p>
          </div>
        </div>
      ),
      sorter: (a, b) => {
        const nameA =
          activeTab === "tab2"
            ? a.ratingInfo.courseName
            : a.ratingInfo.mentorName;
        const nameB =
          activeTab === "tab2"
            ? b.ratingInfo.courseName
            : b.ratingInfo.mentorName;
        return nameA.localeCompare(nameB);
      },
    },
    {
      title: "Rating by",
      dataIndex: "userRatingInfo",
      key: "fullName",
      render: (userRatingInfo) => (
        <div className="flex">
          <img
            src={userRatingInfo.imageUser}
            alt="Author"
            className="w-20 h-20 rounded-full border border-opacity-20 border-[#309255]"
          />
          <div className="mt-2">
            <p className="ml-2 text-[20px]">{userRatingInfo.fullName}</p>
            <p className="ml-2">{userRatingInfo.email}</p>
          </div>
        </div>
      ),
      sorter: (a, b) => {
        const nameA = a.userRatingInfo.fullName.toLowerCase();
        const nameB = b.userRatingInfo.fullName.toLowerCase();
        return nameA.localeCompare(nameB);
      },
    },
    {
      title: "Rating",
      dataIndex: "ratingInfo",
      key: "rating1",
      render: (ratingInfo) => (
        <Rating
          size="large"
          name="half-rating-read"
          max={5}
          precision={0.1}
          readOnly
          value={ratingInfo.rating1}
        />
      ),
      sorter: (a, b) => a.ratingInfo.rating1 - b.ratingInfo.rating1,
    },
    {
      title: "Description",
      dataIndex: "ratingInfo",
      key: "comment",
      render: (ratingInfo) => (
        <p className="text-[16px]">{ratingInfo.comment}</p>
      ),
      sorter: (a, b) => {
        const descriptionA = a.ratingInfo.comment || ""; // Handle null or undefined values
        const descriptionB = b.ratingInfo.comment || "";
        return descriptionA.localeCompare(descriptionB);
      },
    },
    {
      title: "Action",
      key: "action",
      render: (rating) => (
        <Space direction="vertical">
          {rating.ratingInfo.status === 0 ? (
            <button
              onClick={() => handleRatingStatusUpdate(rating.ratingInfo.id, 1)}
              className="border-2 px-2 py-1 text-sm rounded-md w-24 hover:border-[#309255] hover:text-white hover:bg-[#59b77d] border-[#309255]"
            >
              Display
            </button>
          ) : (
            <button
              onClick={() => {
                setSelectedRatingId(rating.ratingInfo.id);
                setIsConfirmationModalOpen(true);
              }}
              className="border-2 px-2 py-1 text-sm rounded-md w-24 hover:border-[#f33404] hover:text-white hover:bg-[#f33404b7] border-[#f33404]"
            >
              Hidden
            </button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
        <Breadcrumb>
          <Breadcrumb.Item>
            <div className="text-start font-semibold text-2xl my-5 px-4">
              Ratings
            </div>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <div className=" text-[#212832] ">
          <div className="flex justify-center py-4 rounded-md">
            <ul className="tabs flex space-x-5 ">
              <li
                className={`cursor-pointer rounded-md shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                  activeTab === "tab2" ? "bg-[#309255] text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick("tab2", "course")}
              >
                <button className="py-2 px-5 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                  Courses
                </button>
              </li>
              <li
                className={`cursor-pointer rounded-md  shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                  activeTab === "tab3" ? "bg-[#309255] text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick("tab3", "mentor")}
              >
                <button className="py-2 px-5 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                  Mentors
                </button>
              </li>
            </ul>
          </div>

          <div className="tab-content">
            {activeTab === "tab2" && (
              <div className="min-h-[1000px] w-full">
                <Table
                  dataSource={rating}
                  columns={columns}
                  pagination={{ ...pagination, onChange: handlePageChange }}
                  loading={isLoading}
                  className="mx-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg"
                />
              </div>
            )}
            {activeTab === "tab3" && (
              <div className="min-h-[1000px] w-full">
                <Table
                  columns={columns}
                  dataSource={rating}
                  pagination={{ ...pagination, onChange: handlePageChange }}
                  loading={isLoading}
                  className="mx-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        destroyOnClose={true}
        title={
          <div className="text-lg">
            Are you sure you want to Hidden this Rating?
          </div>
        }
        open={isConfirmationModalOpen}
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
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          className="mt-5"
          style={{ width: "100%" }}
          onFinish={handleUnBanCourseClick}
        >
          <Space className="justify-end w-full">
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
    </div>
  );
};

export default StaffRatingTable;
