"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import InstructorCourseStyle from "./styles.module.scss";
import { toast } from "sonner";
import { Breadcrumb, Button, Form, Input, Modal, Space, Spin, Tag } from "antd";
import LeftNavbar from "@/components/left-navbar/page";
import MentorRequest from "@/components/mentor-request/page";
import { UserAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { http } from "@/api/http";
import { Course } from "@/components/courses/courses";
import { Lecture } from "@/app/my-course/[id]/page";
import ProgressBar from "@ramonak/react-progress-bar";
import { ClockCircleOutlined } from "@ant-design/icons";

export type ModerationAI = {
  contentModeration: any;
  id: number;
  videoUrl: string;
  contentLength: number;
  percentExplicit: number;
  percentUnsafe: number;
  rejectReason: string;
  previewDate: string;
  status: number;
  previewBy: string;
  lectureId: number;
  flagDetails: any;
  flags: any;
};

export type Flag = {
  flags: any;
  id: number;
  title: string;
  description: string;
  atTime: number;
  contentModerationId: number;
};

const LectureModeration = ({ params }: any) => {
  const { id, userData } = UserAuth();
  const router = useRouter();

  const LectureId = params.lectureId;
  //   console.log("hh", LectureId);
  const [idCourse, setIdCourse] = useState<string>("");
  //   console.log("cou", idCourse);

  const [course, setCourse] = useState<Course>();
  //   console.log("cou", course);

  const [lecture, setLecture] = useState<Lecture>();
  //   console.log("lec", lecture);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (idCourse !== "") {
      try {
        http
          .get(
            `https://learnconnectserver.azurewebsites.net/api/lecture/by-course/${idCourse}/lecture/${LectureId}`
          )
          .then((res) => {
            setLecture(res.data);
            setLoading(true);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [LectureId, idCourse]);

  const [moderationLecture, setModerationLecture] = useState<ModerationAI>();
  const [flagContent, setFlagContent] = useState<Flag[]>([]);
  console.log("jeje", flagContent);

  useEffect(() => {
    if (idCourse !== "") {
      try {
        http
          .get(
            `https://learnconnectserver.azurewebsites.net/api/content-moderation/get-moderation?lectureId=${LectureId}`
          )
          .then((res) => {
            setModerationLecture(res.data);
            setFlagContent(res.data.flags);
            setLoading(true);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [LectureId, idCourse]);

  useEffect(() => {
    // Check if window is defined before using it
    if (typeof window !== "undefined") {
      const url = window.location.href;
      const parts = url.split("/");
      const value = parts[parts.length - 2];
      setIdCourse(value);
      console.log(value);
      http
        .get(
          `https://learnconnectserver.azurewebsites.net/api/course/get-course-pending/${value}`
        )
        .then((response) => {
          setCourse(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
      // Your window-dependent code here
    }
  }, [LectureId]);

  const breadcrumbNavigation = () => {
    router.push("/staff-page/moderation");
  };

  const courseNavigation = () => {
    router.push(`/staff-page/moderation/${idCourse}`);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return (
          <Tag color="green" className="text-lg">
            Active
          </Tag>
        );

      case 1:
        return (
          <Tag color="gray" className="text-lg">
            Pending
          </Tag>
        );
      case 2:
        return (
          <Tag color="#ffa04e" className="text-lg">
            Reject
          </Tag>
        );
      case 3:
        return (
          <Tag color="red" className="text-lg">
            Ban
          </Tag>
        );
      default:
        return "Unknown Status";
    }
  };

  const getStatusText2 = (status) => {
    switch (status) {
      case 0:
        return (
          <Tag color="green" className="text-lg">
            Valid
          </Tag>
        );
      case 1:
        return (
          <Tag color="red" className="text-lg">
            Invalid
          </Tag>
        );
      default:
        return "Unknown Status";
    }
  };

  const [acceptModal, setAcceptModal] = useState(false);
  const [form] = Form.useForm();

  const handleAcceptLecture = () => {
    setAcceptModal(true);
  };

  const handleModalCancel = () => {
    setAcceptModal(false);
    setRejectModal(false);
  };

  const handleAcceptClick = () => {
    try {
      http
        .post(
          `https://learnconnectserver.azurewebsites.net/api/lecture/process-lecture-request?lectureId=${LectureId}&acceptRequest=true`
        )
        .then(() => {
          {
            handleModalCancel();
            toast.success("Approve Lecture Successfully");
            router.push(`/staff-page/moderation/${idCourse}`);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const [rejectModal, setRejectModal] = useState(false);

  const handleRejectLecture = () => {
    setRejectModal(true);
  };

  const handleRejectClick = (data: any) => {
    const formData = new FormData();
    formData.append("note", data.reason);
    try {
      http
        .post(
          `https://learnconnectserver.azurewebsites.net/api/lecture/process-lecture-request?lectureId=${LectureId}&acceptRequest=false&note=${data.reason}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          {
            handleModalCancel();
            toast.success("Reject Lecture Successfully");
            // http.get(`/lecture/by-course/${idCourse}`).then((response) => {
            //   setLecture(response.data);
            //   setLoading(false);
            //   // form.resetFields();
            // });
            router.push(`/staff-page/moderation/${idCourse}`);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeChange = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const getDangerColor = (description) => {
    switch (description.toLowerCase()) {
      case "possible":
        return "#f7eb71"; // Màu cho mức độ thấp
      case "likely":
        return "Orange"; // Màu cho mức độ trung bình
      case "verylikely":
        return "red"; // Màu cho mức độ cao
      default:
        return "black"; // Màu mặc định hoặc xử lý ngoại lệ khác nếu cần
    }
  };

  const formatTime = (time: any) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = time % 60;

    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
    return formattedTime;
  };

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
          {/* <MentorRequest /> */}
          <div className="w-full mt-4">
            <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
              <Breadcrumb className="text-start font-semibold text-3xl my-5 px-4">
                <Breadcrumb.Item>
                  <button onClick={breadcrumbNavigation}>Course</button>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <button onClick={courseNavigation}>{course?.name}</button>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{lecture?.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div className="mx-5 flex flex-row gap-10">
              <div className="flex-1 border-2 p-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg">
                <div className="text-2xl flex flex-row justify-between">
                  <div>Lecture: {lecture?.title}</div>{" "}
                  <div> {getStatusText(lecture?.status)}</div>
                </div>
                {lecture?.contentUrl && (
                  <div className="py-10 w-full">
                    {" "}
                    <video
                      width="full"
                      height="full"
                      controls
                      id="courseVideo"
                      controlsList="nodownload"
                      ref={videoRef}
                    >
                      <source src={lecture?.contentUrl} type="video/mp4" />
                    </video>
                  </div>
                )}
                <div className="text-xl">
                  <span>Description:</span>
                  <div>{lecture?.content}</div>
                </div>
              </div>
              <div className="flex-1 border-2 p-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg flex flex-col gap-4">
                <Space className="flex justify-end">
                  {/* {lecture?.status === 0 && (
                    <Button
                      danger
                      // onClick={() => handleBanLecture(record)}
                    >
                      Ban
                    </Button>
                  )} */}
                  {lecture?.status === 1 && (
                    <>
                      <Button onClick={() => handleAcceptLecture()}>
                        Accept
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#ffa04e",
                          borderColor: "#ffa04e",
                          color: "#fff",
                        }}
                        onClick={() => handleRejectLecture()}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {lecture?.status === 2 && (
                    <div className="text-xl ">
                      Reason : {lecture.rejectReason}
                    </div>
                  )}
                  {/* {lecture?.status === 3 && <Button>Unban</Button>} */}
                </Space>
                <div className="flex justify-center text-3xl">
                  Content moderation details
                </div>
                {!loading ? (
                  <Spin />
                ) : (
                  <div>
                    <div className="border-2">
                      {/* <div className="grid grid-cols-12  border-b border-gray-300">
                        <div className="col-span-4 font-bold border-r border-gray-300 p-4 break-all">
                          Content Length:
                        </div>
                        <div className="col-span-8 bg-white p-4">
                          {" "}
                          {moderationLecture?.contentModeration.contentLength}
                        </div>
                      </div> */}

                      <div className="grid grid-cols-12  border-b border-gray-300">
                        <div className="col-span-4 font-bold border-r border-gray-300 p-4 break-all">
                          Percent Explicit:
                        </div>
                        <div className="col-span-8 bg-white p-4">
                          <ProgressBar
                            completed={
                              moderationLecture?.contentModeration
                                .percentExplicit
                            }
                            bgColor="#309255"
                            height="15px"
                            width="60%"
                            labelAlignment="outside"
                            labelColor="black"
                            labelSize="12px"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-12 border-b border-gray-300">
                        <div className="col-span-4 font-bold border-r border-gray-300 p-4 break-all">
                          Percent Unsafe:
                        </div>
                        <div className="col-span-8 bg-white p-4">
                          <ProgressBar
                            completed={
                              moderationLecture?.contentModeration.percentUnsafe
                            }
                            bgColor="red"
                            height="15px"
                            width="60%"
                            labelAlignment="outside"
                            labelColor="black"
                            labelSize="12px"
                          />
                        </div>
                      </div>

                      {/* <div className="grid grid-cols-12  border-b border-gray-300">
                        <div className="col-span-4 font-bold border-r border-gray-300 p-4 break-all">
                          Status:
                        </div>
                        <div className="col-span-8 bg-white p-4">
                          {getStatusText2(
                            moderationLecture?.contentModeration.status
                          )}
                        </div>
                      </div> */}
                      <div className="grid grid-cols-12 border-gray-300">
                        <div className="col-span-4 font-bold border-r border-gray-300 p-4 break-all">
                          Details:
                        </div>
                        <div className="col-span-8 bg-white p-4 min-h-[200px]">
                          {/* {moderationLecture?.contentModeration} */}
                          <div className="flex flex-col gap-4">
                            {flagContent.map((item, index) => (
                              <div
                                key={index}
                                className="flex flex-row gap-4 items-center"
                              >
                                <div className="font-medium text-lg">
                                  {item.title} :
                                </div>
                                <div
                                  style={{
                                    backgroundColor: getDangerColor(
                                      item.description
                                    ),
                                  }}
                                  className="flex-1 border-2 px-2 rounded-lg text-center text-black font-medium"
                                >
                                  {item.description}
                                </div>
                                at
                                <button
                                  className="flex-1 text-lg hover:underline"
                                  onClick={() => handleTimeChange(item.atTime)}
                                >
                                  <ClockCircleOutlined />{" "}
                                  {formatTime(item.atTime)}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <div>hehe</div> */}
        </div>
      )}
      <Modal
        destroyOnClose={true}
        title={
          <div className="text-lg">
            Are you sure you want to Approve this Lecture?
          </div>
        }
        open={acceptModal}
        // onOk={handleOk}
        width="35%"
        onCancel={handleModalCancel}
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
          onFinish={handleAcceptClick}
        >
          <Space className="justify-end w-full">
            <Form.Item className="mb-0">
              <Space>
                <Button
                  className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                  onClick={handleModalCancel}
                  style={{
                    // backgroundColor: "#4caf50",
                    // borderColor: "#4caf50",
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
                    // backgroundColor: "#4caf50",
                    // borderColor: "#4caf50",
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

      <Modal
        destroyOnClose={true}
        title={
          <div className="text-lg">
            Are you sure you want to Reject this Lecture?
          </div>
        }
        open={rejectModal}
        // onOk={handleOk}
        width="35%"
        onCancel={handleModalCancel}
        footer={false}
        style={{
          top: "30%",
        }}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          layout="horizontal"
          className="mt-5"
          style={{ width: "100%" }}
          onFinish={handleRejectClick}
        >
          <Form.Item
            rules={[{ required: true, message: "Please input Reason!" }]}
            label="Reason"
            name="reason"
          >
            <Input.TextArea rows={4} placeholder="Write your Reason" />
          </Form.Item>

          <Space className="justify-end w-full">
            <Form.Item className="mb-0">
              <Space>
                <Button
                  className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                  onClick={handleModalCancel}
                  style={{
                    // backgroundColor: "#4caf50",
                    // borderColor: "#4caf50",
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
                    // backgroundColor: "#4caf50",
                    // borderColor: "#4caf50",
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

export default LectureModeration;
