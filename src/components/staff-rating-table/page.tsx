"use client";

import { http } from "@/api/http";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import {
  Box,
  Card,
  Link,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Breadcrumb, Button, Form, Modal, Space, Spin } from "antd";
import form from "antd/es/form";
import { toast } from "sonner";

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
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("verificationDate");
  const [form] = Form.useForm();

  const fetchData = async () => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
      try {
        const responseData = await http.get(
          `https://learnconnectapitest.azurewebsites.net/api/rating/allListRatings?ratingType=${selectedType}`
        );
        setRating(responseData?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  console.log("JWT Staff", jwtToken);

  useEffect(() => {
    fetchData();
  }, [selectedType]);

  const handleRatingStatusUpdate = async (id, status) => {
    try {
      await axios.put(
        `https://learnconnectapitest.azurewebsites.net/api/rating/update-rating-status?id=${id}&status=${status}`
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
          `https://learnconnectapitest.azurewebsites.net/api/rating/update-rating-status?id=${selectedRatingId}&status=0`
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function getComparator(
    order: "asc" | "desc",
    orderBy: string
  ): (a: any, b: any) => number {
    return (a, b) => {
      if (order === "asc") {
        return a[orderBy] > b[orderBy] ? 1 : -1;
      } else {
        return b[orderBy] > a[orderBy] ? 1 : -1;
      }
    };
  }

  const handleCancel = () => {
    setIsConfirmationModalOpen(false);
    form.resetFields();
  };

  const handleUnBanCourseClick = () => {
    handleBanConfirmation(true);
  };
  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
        <Breadcrumb>
          <Breadcrumb.Item>
            <div className="text-start font-semibold text-4xl my-5 px-4">
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
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                  }}
                  className="shadow-[5px_10px_20px_15px_rgba(0,0,0,0.15)] rounded-lg mx-5 my-5"
                >
                  <Card>
                    <Paper sx={{ width: "100%" }}>
                      {isLoading ? (
                        <div className="text-center text-5xl mt-5">
                          <Spin size="large" />
                        </div>
                      ) : (
                        <TableContainer>
                          <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size="medium"
                          >
                            <TableHead>
                              <TableRow className="">
                                <TableCell>
                                  <TableSortLabel className="w-[110px] text-[14px]">
                                    Rating Date
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell className="w-[400px] text-[14px]">
                                  Course
                                </TableCell>
                                <TableCell className="w-[400px] text-[14px]">
                                  Rating by
                                </TableCell>
                                <TableCell className="text-[14px]">
                                  Rating
                                </TableCell>
                                <TableCell className="w-[600px] text-[14px]">
                                  Description
                                </TableCell>

                                <TableCell
                                  align="center"
                                  className="text-[14px]"
                                >
                                  Action
                                </TableCell>
                              </TableRow>
                              {rating &&
                                rating
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((rating) => (
                                    <TableRow key={rating.id}>
                                      <TableCell>
                                        <div>
                                          {new Date(
                                            rating.ratingInfo.timeStamp
                                          ).toLocaleDateString()}
                                        </div>
                                        <div>
                                          {new Date(
                                            rating.ratingInfo.timeStamp
                                          ).toLocaleTimeString()}
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex">
                                          <img
                                            src={rating.ratingInfo.courseImage}
                                            alt="Author"
                                            className="w-28 h-28 rounded-lg border border-opacity-20 border-[#309255]"
                                          />
                                          <div className="mt-2">
                                            <p className="ml-2 text-[20px]">
                                              {rating.ratingInfo.courseName}
                                            </p>
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex">
                                          <img
                                            src={
                                              rating.userRatingInfo.imageUser
                                            }
                                            alt="Author"
                                            className="w-28 h-28 rounded-lg border border-opacity-20 border-[#309255]"
                                          />
                                          <div className="mt-2">
                                            <p className="ml-2 text-[20px]">
                                              {rating.userRatingInfo.fullName}
                                            </p>
                                            <p className="ml-2">
                                              {rating.userRatingInfo.email}
                                            </p>
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <Rating
                                          size="large"
                                          name="half-rating-read"
                                          max={5}
                                          precision={0.1}
                                          readOnly
                                          value={rating.ratingInfo.rating1}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <p className="text-[16px]">
                                          {" "}
                                          {rating.ratingInfo.comment}
                                        </p>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex justify-center">
                                          {rating.ratingInfo.status === 0 ? (
                                            <button
                                              onClick={() =>
                                                handleRatingStatusUpdate(
                                                  rating.ratingInfo.id,
                                                  1
                                                )
                                              }
                                              className="px-5 py-3 mx-2 bg-[#309255] w-[100px] text-white rounded-lg"
                                            >
                                              Display
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() => {
                                                setSelectedRatingId(
                                                  rating.ratingInfo.id
                                                );
                                                setIsConfirmationModalOpen(
                                                  true
                                                );
                                              }}
                                              className="px-5 py-3 mx-2 bg-red-500 w-[100px] text-white rounded-lg"
                                            >
                                              Hidden
                                            </button>
                                          )}
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                            </TableHead>
                          </Table>
                        </TableContainer>
                      )}
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rating ? rating.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </Card>
                </Box>
              </div>
            )}
            {activeTab === "tab3" && (
              <div className="min-h-[1000px] w-full">
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                  }}
                  className="shadow-[5px_10px_20px_15px_rgba(0,0,0,0.15)] rounded-lg mx-5 my-5"
                >
                  <Card>
                    <Paper sx={{ width: "100%" }}>
                      {isLoading ? (
                        <div className="text-center text-5xl mt-5">
                          <Spin size="large" />
                        </div>
                      ) : (
                        <TableContainer>
                          <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size="medium"
                          >
                            <TableHead>
                              <TableRow className="">
                                <TableCell>
                                  <TableSortLabel className="w-[110px] text-[14px]">
                                    Rating Date
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell className="w-[400px] text-[14px]">
                                  Mentors
                                </TableCell>
                                <TableCell className="w-[400px] text-[14px]">
                                  Rating by
                                </TableCell>
                                <TableCell className="text-[14px]">
                                  Rating
                                </TableCell>
                                <TableCell className="w-[600px] text-[14px]">
                                  Description
                                </TableCell>

                                <TableCell
                                  align="center"
                                  className="text-[14px]"
                                >
                                  Action
                                </TableCell>
                              </TableRow>
                              {rating &&
                                rating
                                  .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )
                                  .map((rating) => (
                                    <TableRow key={rating.id}>
                                      <TableCell>
                                        <div>
                                          {new Date(
                                            rating.ratingInfo.timeStamp
                                          ).toLocaleDateString()}
                                        </div>
                                        <div>
                                          {new Date(
                                            rating.ratingInfo.timeStamp
                                          ).toLocaleTimeString()}
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex">
                                          <img
                                            src={rating.ratingInfo.mentorImage}
                                            alt="Author"
                                            className="w-28 h-28 rounded-lg border border-opacity-20 border-[#309255]"
                                          />
                                          <div className="mt-2">
                                            <p className="ml-2 text-[20px]">
                                              {rating.ratingInfo.mentorName}
                                            </p>
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex">
                                          <img
                                            src={
                                              rating.userRatingInfo.imageUser
                                            }
                                            alt="Author"
                                            className="w-28 h-28 rounded-lg border border-opacity-20 border-[#309255]"
                                          />
                                          <div className="mt-2">
                                            <p className="ml-2 text-[20px]">
                                              {rating.userRatingInfo.fullName}
                                            </p>
                                            <p className="ml-2">
                                              {rating.userRatingInfo.email}
                                            </p>
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <Rating
                                          size="large"
                                          name="half-rating-read"
                                          max={5}
                                          precision={0.1}
                                          readOnly
                                          value={rating.ratingInfo.rating1}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <p className="text-[16px]">
                                          {" "}
                                          {rating.ratingInfo.comment}
                                        </p>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex justify-center">
                                          {rating.ratingInfo.status === 0 ? (
                                            <button
                                              onClick={() =>
                                                handleRatingStatusUpdate(
                                                  rating.ratingInfo.id,
                                                  1
                                                )
                                              }
                                              className="px-5 py-3 mx-2 bg-[#309255] w-[100px] text-white rounded-lg"
                                            >
                                              Display
                                            </button>
                                          ) : (
                                            <button
                                              onClick={() => {
                                                setSelectedRatingId(
                                                  rating.ratingInfo.id
                                                );
                                                setIsConfirmationModalOpen(
                                                  true
                                                );
                                              }}
                                              className="px-5 py-3 mx-2 bg-red-500 w-[100px] text-white rounded-lg"
                                            >
                                              Hidden
                                            </button>
                                          )}
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                            </TableHead>
                          </Table>
                        </TableContainer>
                      )}
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rating ? rating.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </Card>
                </Box>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Modal
        open={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Are you sure you want to Hidden this Comment?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => handleBanConfirmation(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Confirm
              </button>
              <button
                onClick={() => handleBanConfirmation(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal> */}
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
