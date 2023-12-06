"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../globals.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Course, Lectures } from "@/components/courses/courses";
import { FaCheck } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { VscEllipsis } from "react-icons/vsc";
import { FaRankingStar } from "react-icons/fa6";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Modal,
  Rate,
  Select,
  Space,
  Tooltip,
  Upload,
  message,
} from "antd";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { IoChatboxSharp } from "react-icons/io5";
import { UserAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";
import { http } from "@/api/http";
import { maxTime } from "date-fns";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { BsFillFlagFill } from "react-icons/bs";
import Loading from "@/components/loading/loading";
import Quiz from "@/components/test/test";
import { type } from "os";

export type Lecture = {
  id: string | number;
  title: string;
  content: string;
  contentUrl: string;
  contentType: number;
  rejectReason: string;
  status: number;
  courseId: number;
  courseName: string;
};

export type Performance = {
  id: string | number;
  score: number;
  timeSpent: number;
  userId: number;
  courseId: number;
};

export type Comment = {
  // map(arg0: (item: any, index: any) => React.JSX.Element): React.ReactNode;
  comment: {
    id: number;
    userId: number;
    parentCommentId: null;
    comment1: string;
    commentTime: string;
    status: number;
    lectureId: number;
  };
  user: {
    userId: number;
    userName: string;
    userEmail: string;
    userImage: string;
  };
  reply: [comment: any, user: any];
};

export type Reply = {
  comment: {
    id: number;
    userId: number;
    parentCommentId: null;
    comment1: string;
    commentTime: string;
    status: number;
    lectureId: number;
  };
  user: {
    userId: number;
    userName: string;
    userEmail: string;
    userImage: string;
  };
};

export default function AfterEnroll({ params }: any) {
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
    // if (role === 3) {
    //   router.push(`/`);
    // }
    if (role === -1) {
      router.push(`/`);
    }
  });
  const [activeTab, setActiveTab] = useState("tab1");
  const { id, user, jwtToken, userData } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const [form] = Form.useForm();

  const [image, setImage] = useState<string>();
  const [formDataImage, setFormDataImage] = useState();

  const [selected, setSelected] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(-1);
  const { Option } = Select;
  const { TextArea } = Input;
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  const [lectures, setLectures] = useState<Lectures>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const idCourse = params.id;
  const [courses, setCourses] = useState<Course>();
  const [isTestOpen, setIsTestOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [timeSpent, setTimeSpent] = useState<Performance>();
  const [comment, setComment] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [IdLecture, setIdLecture] = useState(0);
  const [editText, setEditText] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [reply, setReply] = useState<Reply[]>([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const handleOk = async (data: any) => {
    setIsModalOpen(false);
    const formdata = new FormData();
    formdata.append("reportReason", selected || "1");
    formdata.append("reportComment", data.comment);
    if (formDataImage !== undefined) {
      formdata.append("reportImage", formDataImage);
    }
    try {
      await axios.post(
        `https://learnconnectapitest.azurewebsites.net/api/report/report-course?userId=${id}&courseId=${idCourse}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleCancel();

      setTimeout(() => {
        toast.success("Report successful");
      });
    } catch (err) {
      setTimeout(() => {
        toast.error("Report fail");
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModalRatingOpen(false);
    setValue(0);
    form.resetFields();
    setIsConfirmationModalOpen(false);
  };

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setFormDataImage(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setImage(url);
      });
    }
  };

  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const Reasons = [
    { id: "1", name: "Inappropriate content" },
    { id: "2", name: "Copyright violation" },
    { id: "3", name: "Community standards violation" },
  ];

  const handleChangeReason = (value: React.SetStateAction<null>) => {
    setSelected(value);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [testVideo, setTestVideo] = useState<Lecture[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/lecture/by-course/${idCourse}`
      );
      setTestVideo(responseData?.data);
    };

    fetchData();
  }, []);

  const [pdf, setPDF] = useState<number>();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [percentage, setPercentage] = useState(0);
  const [learned, setLearned] = useState(0);
  const [selectedType, setSelectedType] = useState("course");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onDocumentLoadSuccess = (numPages) => {
    setNumPages(numPages);
  };

  const [idDropDown, setIdDropdown] = useState<Number>();
  const toggleDropdown = (data: any) => {
    setIdDropdown(data);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [videoSrc, setVideoSrc] = useState("");
  const [isComplete, setIsComplete] = useState(true);

  const changeVideoSource = (lecture: Lecture, index: number) => {
    if (index < learned) {
      setVideoSrc(lecture.contentUrl);
      setIsTestOpen(false);
      setActiveVideoIndex(index);
      const videoElement = document.getElementById(
        "courseVideo"
      ) as HTMLVideoElement;
      if (videoElement) {
        videoElement.load();
      }
      const getProcess = async () => {
        await http
          .get(
            `https://learnconnectapitest.azurewebsites.net/api/learning-process/get_lecture_process?lectureId=${lecture.id}&courseId=${idCourse}&userId=${userData?.id}`
          )
          .then((res) => {
            const learningProcess = res?.data.status;
            if (learningProcess === 1) {
              setIsComplete(false);
            } else {
              setIsComplete(true);
            }
            setCurrentTime(res?.data.currentStudyTime);
            setMaxTime(res?.data.maxStudyTime);
            if (res?.data.currentStudyTime > 0) {
              setHasCurrentTime(!hasCurrentTime);
            }
          })

          .catch();
      };
      getProcess();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await http.get(
        `https://learnconnectapitest.azurewebsites.net/api/course/${idCourse}`
      );
      setCourses(responseData?.data);
    };

    fetchData();
  }, []);

  const handleClick = () => {
    if (isComplete && testVideo.length + 1 === learned) {
      setIsTestOpen(true);
      setVideoSrc("");
    }
  };

  //rating
  const [modalRating, setModalRatingOpen] = useState(false);
  const [value, setValue] = useState<number>(0);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const showModalRating = () => {
    setModalRatingOpen(true);
  };

  const handleTabClickComment = (tabName: string, type: string) => {
    setActiveTab(tabName);
    setSelectedType(type);
  };

  const handleRateChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleSubmit = async (data: any) => {
    const formdata = new FormData();
    formdata.append("rating", value.toString());

    formdata.append(
      "comment",
      data.description !== undefined ? data.description : null
    );

    try {
      await http.post(
        `/rating/rating-course?userId=${id}&courseId=${idCourse}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setModalRatingOpen(false);

      setTimeout(() => {
        toast.success("Rating successful");
      });
    } catch (err) {
      setTimeout(() => {
        toast.error("Rating fail");
      });
    }
    // console.log("value", parseInt(value.toString()));
    // console.log("value", data.description);

    setModalRatingOpen(false);
  };

  const [performance, setPerformance] = useState<Performance>();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseData = await http.get(
          `/learning-performance/user/${id}/course/${idCourse}`
        );
        setPerformance(responseData?.data);
        // console.log("performance", performance);
      };
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, [id]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [maxTime, setMaxTime] = useState<number>(0); //truyen maxTime tu API response
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState(1);
  const handleOnTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
    if (videoRef.current && e.target.currentTime > maxTime) {
      setMaxTime(videoRef.current.played.end(0));
      setTotalTime(Math.floor(videoRef.current.duration));
    }
    if (Math.floor(e.target.currentTime) >= totalTime * 0.9) {
      setIsComplete(true);
      setMaxTime(totalTime);
    }
    if (
      (Math.floor(e.target.currentTime) > 1 &&
        Math.floor(e.target.currentTime) % 5 == 0) ||
      Math.floor(e.target.currentTime) === totalTime
    ) {
      // setMaxTime(totalTime);
      http.post(
        `https://learnconnectapitest.azurewebsites.net/api/learning-process/save_process?userId=${id}&lectureId=${
          testVideo[activeVideoIndex].id
        }&courseId=${idCourse}&currentTime=${Math.floor(
          currentTime
        )}&maxTime=${Math.floor(maxTime)}&totalTime=${totalTime}`
      );
    }

    if (activeVideoIndex + 1 === learned) {
      setPercentage((maxTime / totalTime) * 100);
      if (maxTime >= totalTime * 0.9) {
        setLearned(learned + 1);
        setPercentage(0);
      }
    }
  };

  const handleOnSeek = (e) => {
    if (videoRef.current && e.target.currentTime > maxTime) {
      videoRef.current.currentTime = maxTime;
    }
  };

  const handleOnProgress = () => {
    if (videoRef.current) {
      setTotalTime(Math.floor(videoRef.current.duration));
    }
  };

  const [hasCurrentTime, setHasCurrentTime] = useState(false);

  useEffect(() => {
    if (videoRef.current && currentTime !== 0) {
      videoRef.current.currentTime = currentTime; //truyen currentTime tu API response
    }
  }, [hasCurrentTime]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/learning-performance/get-by/${userData?.id}/${idCourse}`
      );
      setTimeSpent(responseData?.data);
    };

    fetchData();
  }, []);

  function formatTime(minutes) {
    if (isNaN(minutes) || minutes < 0) {
      return "Invalid input";
    }

    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    const remainingMinutes = minutes % 60;

    let formattedTime = "";

    if (days > 0) {
      formattedTime += `${days} Day `;
    }

    if (hours > 0) {
      formattedTime += `${hours} Hour `;
    }

    if (remainingMinutes > 0) {
      formattedTime += `${remainingMinutes} Minute`;
    }

    return formattedTime.trim(); // Remove trailing space
  }

  const breadcrumbsHome = () => {
    router.push("/");
  };

  const breadcrumbsMyCourses = () => {
    router.push("/my-course");
  };

  useEffect(() => {
    const fetchData = async () => {
      await http
        .get(
          `https://learnconnectapitest.azurewebsites.net/api/learning-process/get_user_current_lecture?courseId=${idCourse}&userId=${userData?.id}`
        )
        .then((response) => {
          setPercentage(response?.data?.progress);
          setLearned(response?.data.lectureLearned);
        })
        .catch((error) => {
          console.log("error at fetchData: ", error);
        });
    };
    fetchData();
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    const dropdown = document.getElementById("dropdown-menu");

    if (dropdown && !dropdown.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const consoleLogLectureId = async (lectureId) => {
    await http
      .get(
        `https://learnconnectapitest.azurewebsites.net/api/Comment/get-comments-by-lectureId/${lectureId}`
      )
      .then((res) => {
        setComment(res?.data.reverse());
        setIdLecture(lectureId);
      });
  };

  const submitComment = async () => {
    try {
      if (!commentText) {
        toast.error("Comment cannot be empty.");
        return;
      }
      const formData = new FormData();
      formData.append("comment", commentText);
      await http
        .post(
          `https://learnconnectapitest.azurewebsites.net/api/Comment?userId=${userData?.id}&lectureId=${IdLecture}`,
          formData
        )
        .then(() => {
          http
            .get(
              `https://learnconnectapitest.azurewebsites.net/api/Comment/get-comments-by-lectureId/${IdLecture}`
            )
            .then((res) => {
              setComment(res?.data.reverse());
            });
        });
      toast.success("Comment posted successfully!!");
      setCommentText("");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment. Please try again.");
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);

  const AnswerMode = (data) => {
    setIsAnswer(!isAnswer);
    setIdDropdown(data);

    console.log("isanswer", isAnswer);
  };

  const EditCommentMode = () => {
    setIsEditing(true);
  };

  const ReplyComment = async (comment) => {
    if (!replyComment) {
      toast.error("Comment cannot be empty.");
      return;
    }
    const formData = new FormData();
    formData.append("comment", replyComment);
    await http
      .post(
        `https://learnconnectapitest.azurewebsites.net/api/comment?userId=${userData?.id}&lectureId=${IdLecture}&parentCommentId=${comment}`,
        formData
      )
      .then(() => {
        toast.success("Reply Comment Success");
        setIsAnswer(false);
        setReplyComment("");
        http
          .get(
            `https://learnconnectapitest.azurewebsites.net/api/Comment/get-comments-by-lectureId/${IdLecture}`
          )
          .then((res) => {
            setComment(res?.data.reverse());
          });
      });
  };

  const EditComment = async (comment) => {
    if (!editText) {
      toast.error("Comment cannot be empty.");
      return;
    }
    comment.comment1 = editText;
    await http
      .put(
        `https://learnconnectapitest.azurewebsites.net/api/comment/${comment.id}`,
        comment
      )
      .then(() => {
        toast.success("Edit Comment Success");
        setIsEditing(false);
        http
          .get(
            `https://learnconnectapitest.azurewebsites.net/api/Comment/get-comments-by-lectureId/${IdLecture}`
          )
          .then((res) => {
            setComment(res?.data.reverse());
          });
      });
    setEditText("");
  };

  const DeleteComment = async (promotionId) => {
    await http
      .delete(
        `https://learnconnectapitest.azurewebsites.net/api/comment/${promotionId}`
      )
      .then(() => {
        toast.success("Delete Comment Success");
        http
          .get(
            `https://learnconnectapitest.azurewebsites.net/api/Comment/get-comments-by-lectureId/${IdLecture}`
          )
          .then((res) => {
            setComment(res?.data.reverse());
          });
      });
  };

  const HandleOnDelteClick = () => {
    DeleteComment;
  };

  return !role ? (
    <Loading />
  ) : (
    <>
      <div className="bg-[#e7f8ee]">
        <div
          className="bg-no-repeat bg-auto flex flex-row justify-between"
          style={{
            backgroundImage: "url('/images/shape-23.png')",
          }}
        >
          <div>
            <Breadcrumb className="font-semibold text-3xl py-5 px-64 flex-auto">
              <Breadcrumb.Item>
                <button onClick={breadcrumbsHome}>Home</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <button onClick={breadcrumbsMyCourses}>My Courses</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>{courses?.name}</span>
              </Breadcrumb.Item>
            </Breadcrumb>{" "}
          </div>
          <div
            className="w-2/5 bg-auto bg-no-repeat bg-right-top flex-1"
            style={{
              backgroundImage: "url('/images/shape-24.png')",
            }}
          />
        </div>
      </div>
      <div className="container">
        <div className="grid cols-2 lg:grid-cols-12 mt-[40px] gap-5">
          <div className="lg:col-span-8">
            {isTestOpen ? (
              <Quiz idCourse={idCourse} />
            ) : (
              <>
                {!videoSrc && (
                  <img
                    src={courses?.imageUrl}
                    className="w-full object-cover h-[438px]"
                  />
                )}
                {videoSrc && (
                  <>
                    {pdf === 1 ? (
                      <video
                        width="full"
                        height="full"
                        controls
                        id="courseVideo"
                        ref={videoRef}
                        onSeeked={handleOnSeek}
                        onTimeUpdate={handleOnTimeUpdate}
                        onProgress={handleOnProgress}
                        controlsList="nodownload"
                      >
                        <source src={videoSrc} type="video/mp4" />
                      </video>
                    ) : (
                      <iframe
                        title="PDF Viewer"
                        width="100%"
                        height="438px"
                        src={videoSrc}
                        aria-readonly
                      ></iframe>
                    )}
                  </>
                )}
                <div>
                  <div className="">
                    <div className="flex justify-between mt-2.5 items-center">
                      <h2 className="text-[25px] leading-normal text-[#212832] font-medium ">
                        {activeVideoIndex === 0
                          ? testVideo[activeVideoIndex].title
                          : courses?.name}
                      </h2>
                      <div className=" flex gap-[10px]">
                        {value === 0 ? (
                          <Button
                            style={{ color: "black" }}
                            onClick={showModalRating}
                            className="text-[20px] border border-[#309255]"
                          >
                            <FaRankingStar />
                          </Button>
                        ) : (
                          <Tooltip title="You have already rated this course !">
                            <Button
                              disabled
                              style={{
                                color: "black",
                              }}
                              onClick={showModalRating}
                            >
                              <FaRankingStar />
                            </Button>
                          </Tooltip>
                        )}

                        <Button
                          onClick={showModal}
                          style={{
                            color: "black",
                          }}
                          className="border border-red-500"
                        >
                          <BsFillFlagFill />
                        </Button>
                      </div>
                      <Modal
                        destroyOnClose={true}
                        title={`Rating ${courses?.name} by ${user?.displayName}`}
                        open={modalRating}
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
                        >
                          <span className="flex pl-[140px] pb-5">
                            <Rate
                              tooltips={desc}
                              onChange={handleRateChange}
                              value={value}
                            />
                          </span>
                          <Form.Item label="Description" name="description">
                            <Input.TextArea rows={3} />
                          </Form.Item>
                          <Space className="justify-end w-full pr-[150px]">
                            <Form.Item className="mb-0">
                              <Space>
                                <Button onClick={handleCancel}>Cancel</Button>
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  style={{ color: "black" }}
                                >
                                  Rating
                                </Button>
                              </Space>
                            </Form.Item>
                          </Space>
                        </Form>
                      </Modal>
                      <Modal
                        destroyOnClose={true}
                        title={`Report ${courses?.name} by ${user?.displayName}`}
                        open={isModalOpen}
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
                          onFinish={handleOk}
                        >
                          <Form.Item label="Reason">
                            <Select onChange={handleChangeReason}>
                              {Reasons.map((option) => {
                                return (
                                  <Option key={option.id} value={option.name}>
                                    {option.name}
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                          <Form.Item label="Comment" name="comment">
                            <Input.TextArea rows={4} />
                          </Form.Item>
                          <Form.Item
                            label="Capture"
                            getValueFromEvent={normFile}
                          >
                            <Upload
                              accept="image/png, image/jpeg"
                              onChange={handleChange}
                              beforeUpload={beforeUpload}
                              // headers={{ Authorization: authorization }}
                              action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
                              listType="picture-card"
                            >
                              Upload
                            </Upload>
                          </Form.Item>
                          <Space className="justify-end w-full pr-[150px]">
                            <Form.Item className="mb-0">
                              <Space>
                                <Button onClick={handleCancel}>Cancel</Button>
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  style={{ color: "black" }}
                                >
                                  Report
                                </Button>
                              </Space>
                            </Form.Item>
                          </Space>
                        </Form>
                      </Modal>
                    </div>
                    {activeVideoIndex + 1 !== 0 ? (
                      <div className="w-full mx-auto mb-3 shadow-lg rounded-lg">
                        <div className="flex justify-center bg-[#e7f8ee] p-3 rounded-lg mt-5">
                          <ul className="tabs flex space-x-5">
                            <li
                              className={`cursor-pointer rounded-md ${
                                activeTab === "tab1"
                                  ? " text-[#fff] bg-[#309255]"
                                  : "bg-[#fff] "
                              }`}
                              onClick={() =>
                                handleTabClickComment("tab1", "course")
                              }
                            >
                              <button className="w-28 h-14 px-[15px] text-center text-sm font-medium  rounded-md hover:text-[#fff] hover:bg-[#309255]">
                                Description
                              </button>
                            </li>
                            <li
                              className={`cursor-pointer rounded-md ${
                                activeTab === "tab2"
                                  ? " text-[#fff] bg-[#309255]"
                                  : "bg-[#fff] "
                              }`}
                              onClick={() =>
                                handleTabClickComment("tab2", "mentor")
                              }
                            >
                              <button className="w-28 h-14 px-[15px] text-center text-sm font-medium  border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#fff] hover:bg-[#309255]">
                                Comment
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div className="faq-wrapper">
                          {activeTab === "tab1" && (
                            <div className="single-faq-item">
                              <div className="grid cols-2 lg:grid-cols-12 border-[#dff0e6] border border-solid rounded-lg px-[70px] pb-[35px] mt-5">
                                <div className="lg:col-span-12">
                                  <div key={activeVideoIndex}>
                                    <p className="mt-3.5 text-[#52565b] text-base font-normal">
                                      {testVideo[activeVideoIndex]?.content}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {activeTab === "tab2" && (
                            <div className="">
                              <div className="py-7 px-5">
                                <div className="flex">
                                  <img
                                    alt="CommentImg"
                                    src={userData?.profilePictureUrl}
                                    className="w-[70px] h-[70px] rounded-full"
                                  />
                                  <div className="my-auto pl-5 w-full">
                                    <TextArea
                                      placeholder="Post Comment"
                                      autoSize={{ minRows: 7, maxRows: 15 }}
                                      className="w-full"
                                      value={commentText}
                                      onChange={(e) =>
                                        setCommentText(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="pt-5 flex justify-end">
                                  {/* <button
                                    className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg hover:border-red-500"
                                    onClick={() => {
                                      setCommentText("");
                                    }}
                                  >
                                    Cancel
                                  </button> */}
                                  <button
                                    className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg text-[#309255] hover:bg-[#309255] hover:text-[#fff]"
                                    onClick={() => submitComment()}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                              {comment &&
                                comment.map((item, index) => (
                                  <div
                                    className="py-7 px-5 border-t border-[#30925533]"
                                    key={index}
                                  >
                                    <div className="flex">
                                      <img
                                        alt="CommentImg"
                                        src={item?.user.userImage}
                                        className="w-[70px] h-[70px] rounded-full"
                                      />
                                      <div className="my-auto pl-5">
                                        <p className="font-bold text-xl">
                                          {item?.user.userName}
                                        </p>
                                        <p className="font-light text-[#8e9298]">
                                          {item?.comment.commentTime}
                                        </p>
                                      </div>

                                      <div className="flex ml-auto">
                                        <button
                                          className=" my-auto bg-[#d6e9dd] ml-auto px-5 max-h-[40px] flex item-center rounded-lg border border-[#30925533] w-full py-1 hover:text-[#fff] hover:bg-[#309255]"
                                          onClick={() => {
                                            AnswerMode(item.comment.id);
                                          }}
                                        >
                                          <span className="my-auto pr-1">
                                            <IoChatboxSharp />
                                          </span>
                                          Answer
                                        </button>
                                        {item?.user.userId === userData?.id && (
                                          <button
                                            className="w-full flex my-auto ml-2 border border-[#30925533] p-2 rounded-lg hover:text-[#000] hover:bg-[#30925533]"
                                            onClick={() => {
                                              toggleDropdown(item?.comment.id);
                                            }}
                                          >
                                            <VscEllipsis />
                                            {isDropdownOpen &&
                                              item?.comment.id ===
                                                idDropDown && (
                                                <div
                                                  id="dropdown-menu"
                                                  className="modal-overlay absolute mt-[30px] z-50"
                                                >
                                                  <div className="bg-white border border-gray-300 rounded shadow-lg">
                                                    <div className="p-2 text-black flex flex-col">
                                                      <button
                                                        className="px-3 py-2 mb-1 hover:bg-[#e7f8ee]"
                                                        onClick={
                                                          EditCommentMode
                                                        }
                                                      >
                                                        Edit Comment
                                                      </button>
                                                      <button
                                                        className="px-3 py-2 hover:bg-[#e7f8ee]"
                                                        onClick={() => {
                                                          // DeleteComment(
                                                          //   item?.comment.id
                                                          // );
                                                          setIdDelete(
                                                            item?.comment.id
                                                          );
                                                          setIsConfirmationModalOpen(
                                                            true
                                                          );
                                                        }}
                                                      >
                                                        Delete Comment
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                    <div className="py-5">
                                      {isEditing &&
                                      item?.comment.id === idDropDown ? (
                                        <div>
                                          <TextArea
                                            placeholder="Edit Comment"
                                            autoSize={{
                                              minRows: 7,
                                              maxRows: 15,
                                            }}
                                            className="w-full"
                                            defaultValue={
                                              item?.comment.comment1
                                            }
                                            onChange={(e) =>
                                              setEditText(e.target.value)
                                            }
                                          />
                                          <div className="py-5 flex justify-end">
                                            <button
                                              className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg hover:border-red-500"
                                              onClick={() => {
                                                setIsEditing(false);
                                              }}
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg text-[#309255] hover:bg-[#309255] hover:text-[#fff]"
                                              onClick={() => {
                                                EditComment(item.comment);
                                              }}
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <p>{item?.comment.comment1}</p>
                                      )}
                                    </div>
                                    {isAnswer &&
                                      item?.comment.id === idDropDown && (
                                        <div className="py-7 px-5 ml-[110px] border-t border-[#30925533]">
                                          <div className="flex">
                                            <img
                                              alt="CommentImg"
                                              src={userData?.profilePictureUrl}
                                              className="w-[70px] h-[70px] rounded-full"
                                            />
                                            <div className="my-auto pl-5">
                                              <p className="font-bold text-xl">
                                                {userData?.fullName}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="pt-5">
                                            <TextArea
                                              placeholder="Post Comment"
                                              autoSize={{
                                                minRows: 7,
                                                maxRows: 15,
                                              }}
                                              className="w-full"
                                              value={replyComment}
                                              // defaultValue={item?.comment.comment1}
                                              onChange={(e) =>
                                                setReplyComment(e.target.value)
                                              }
                                            />
                                          </div>
                                          <div className="pt-5 flex justify-end">
                                            <button
                                              className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg hover:border-red-500"
                                              onClick={() => {
                                                setIsAnswer(false);
                                                setReplyComment("");
                                              }}
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg text-[#309255] hover:bg-[#309255] hover:text-[#fff]"
                                              onClick={() => {
                                                ReplyComment(item.comment.id);
                                              }}
                                            >
                                              Reply
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    {item.reply.map((replyItem, replyIndex) => (
                                      <div
                                        className="py-7 px-5 ml-[110px] border-t border-[#30925533]"
                                        key={replyIndex}
                                      >
                                        <div className="flex">
                                          <img
                                            alt="CommentImg"
                                            src={replyItem.user.userImage}
                                            className="w-[70px] h-[70px] rounded-full"
                                          />

                                          <div className="my-auto pl-5">
                                            {replyItem.user && (
                                              <div>
                                                <p className="font-bold text-xl">
                                                  {replyItem.user.userName}
                                                </p>
                                                <p className="font-light text-[#8e9298]">
                                                  {
                                                    replyItem?.comment
                                                      .commentTime
                                                  }
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                          <div className="flex ml-auto">
                                            {replyItem?.user.userId ===
                                              userData?.id && (
                                              <button
                                                className="w-full flex my-auto ml-2 border border-[#30925533] p-2 rounded-lg hover:text-[#000] hover:bg-[#30925533]"
                                                onClick={() => {
                                                  toggleDropdown(
                                                    replyItem?.comment.id
                                                  );
                                                }}
                                              >
                                                <VscEllipsis />
                                                {isDropdownOpen &&
                                                  replyItem?.comment.id ===
                                                    idDropDown && (
                                                    <div
                                                      id="dropdown-menu"
                                                      className="modal-overlay absolute mt-[30px] z-50"
                                                    >
                                                      <div className="bg-white border border-gray-300 rounded shadow-lg">
                                                        <div className="p-2 text-black flex flex-col">
                                                          <button
                                                            className="px-3 py-2 mb-1 hover:bg-[#e7f8ee]"
                                                            onClick={
                                                              EditCommentMode
                                                            }
                                                          >
                                                            Edit Comment
                                                          </button>
                                                          <button
                                                            className="px-3 py-2 hover:bg-[#e7f8ee]"
                                                            onClick={() => {
                                                              // DeleteComment(
                                                              //   replyItem
                                                              //     ?.comment.id
                                                              // );
                                                              setIdDelete(
                                                                replyItem
                                                                  ?.comment.id
                                                              );
                                                              setIsConfirmationModalOpen(
                                                                true
                                                              );
                                                            }}
                                                          >
                                                            Delete Comment
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                        <div className="py-5">
                                          {isEditing &&
                                          replyItem?.comment.id ===
                                            idDropDown ? (
                                            <div>
                                              <TextArea
                                                placeholder="Edit Comment"
                                                autoSize={{
                                                  minRows: 7,
                                                  maxRows: 15,
                                                }}
                                                className="w-full"
                                                defaultValue={
                                                  replyItem?.comment.comment1
                                                }
                                                onChange={(e) =>
                                                  setEditText(e.target.value)
                                                }
                                              />
                                              <div className="py-5 flex justify-end">
                                                <button
                                                  className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg hover:border-red-500"
                                                  onClick={() => {
                                                    setIsEditing(false);
                                                  }}
                                                >
                                                  Cancel
                                                </button>
                                                <button
                                                  className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg text-[#309255] hover:bg-[#309255] hover:text-[#fff]"
                                                  onClick={() => {
                                                    EditComment(
                                                      replyItem.comment
                                                    );
                                                  }}
                                                >
                                                  Save
                                                </button>
                                              </div>
                                            </div>
                                          ) : (
                                            <p> {replyItem.comment.comment1}</p>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              {/* <div className="border-t border-[#30925533]">
                                <div className="py-7 px-5  mt-8">
                                  <button className="text-[18px] text-[#309255] border border-[#309255] w-full py-2 rounded-lg hover:text-[#fff] hover:bg-[#309255] bg-[#d6e9dd] ">
                                    Load more 22 answer
                                  </button>
                                </div>
                              </div> */}
                              <Modal
                                destroyOnClose={true}
                                title={
                                  <div className="text-lg">
                                    Are you sure to delete this comment
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
                                  onFinish={() => {
                                    DeleteComment(idDelete);
                                    setIsConfirmationModalOpen(false);
                                    setIdDelete(0);
                                  }}
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
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-center bg-[#e7f8ee] p-3 rounded-lg mt-5">
                          <ul className="tabs flex space-x-5">
                            <li
                              className={`cursor-pointer rounded-md ${
                                activeTab === "tab1"
                                  ? " text-[#fff] bg-[#309255]"
                                  : "bg-[#fff] "
                              }`}
                              onClick={() => handleTabClick("tab1")}
                            >
                              <button className="w-28 h-14 px-[15px] text-center text-sm font-medium  rounded-md hover:text-[#fff] hover:bg-[#309255]">
                                Overview
                              </button>
                            </li>
                            <li
                              className={`cursor-pointer rounded-md ${
                                activeTab === "tab2"
                                  ? " text-[#fff] bg-[#309255]"
                                  : "bg-[#fff] "
                              }`}
                              onClick={() => handleTabClick("tab2")}
                            >
                              <button className="w-28 h-14 px-[15px] text-center text-sm font-medium  border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#fff] hover:bg-[#309255]">
                                Lectures
                              </button>
                            </li>
                          </ul>
                        </div>
                        {activeTab === "tab1" && (
                          <div className="w-full mx-auto mb-3">
                            <div className="faq-wrapper">
                              <div className="single-faq-item">
                                <div className="grid cols-2 lg:grid-cols-12 border-[#dff0e6] border border-solid rounded-lg px-[70px] pb-[35px] mt-5">
                                  <div className="lg:col-span-12">
                                    <div className="text-[15px] font-medium mt-[25px] px-[15px]">
                                      <p className="mb-4 leading-loose">
                                        {courses?.description}{" "}
                                      </p>
                                      <div className="flex flex-col">
                                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                          <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="overflow-hidden">
                                              <table className="min-w-full text-left text-sm font-light">
                                                <tbody>
                                                  <tr className="border-b border-b-[#e7f8ee]">
                                                    <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
                                                      Instructor
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                      :
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-normal">
                                                      {/* {courses.} */}
                                                      {courses?.mentorName}
                                                    </td>
                                                  </tr>
                                                  <tr className="border-b border-b-[#e7f8ee]">
                                                    <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
                                                      Duration
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                      :
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-normal">
                                                      {courses?.contentLength}{" "}
                                                      <span>
                                                        {courses?.contentLength &&
                                                        courses.contentLength <=
                                                          1
                                                          ? "minute"
                                                          : "minutes"}
                                                      </span>
                                                    </td>
                                                  </tr>
                                                  <tr className="border-b border-b-[#e7f8ee]">
                                                    <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
                                                      Lectures
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                      :
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-normal">
                                                      {courses?.lectureCount}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {activeTab === "tab2" && (
                          <div className="w-full mx-auto mb-3">
                            <div className="faq-wrapper">
                              <div className="single-faq-item">
                                <div className="grid cols-2 lg:grid-cols-12 border-[#dff0e6] border border-solid rounded-lg px-[70px] pb-[35px] mt-5">
                                  <div className="lg:col-span-12">
                                    {testVideo &&
                                      testVideo.map((item, index) => (
                                        <div key={index}>
                                          <p className="mt-5 font-bold">
                                            Lecture {index + 1}: {item.title}
                                          </p>
                                          <p className="mt-3.5 text-[#52565b] text-base font-medium">
                                            {item?.content}
                                          </p>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[#dff0e6] px-[30px] pt-[15px] pb-[25px]">
              <h3 className="text-[22px] mt-2.5">{courses?.name}</h3>
              <span className="mt-2.5 text-[#309255] text-[18px]">
                {courses?.lectureCount}{" "}
                {courses?.lectureCount && courses.lectureCount <= 1
                  ? "Lecture"
                  : "Lectures"}{" "}
                ({courses?.contentLength}{" "}
                {courses?.contentLength && courses.contentLength <= 1
                  ? "minute"
                  : "minutes"}
                )
              </span>
            </div>
            <div className="video-playlist bg-[#eefbf3] text-black">
              <div className="accordion" id="videoPlaylist">
                <nav className="vids">
                  {testVideo.map((item, index) => {
                    return (
                      <button
                        key={item.id}
                        className={`hover:bg-[#dff0e6] w-full text-left link ${
                          activeVideoIndex === index
                            ? "active text-[#309255]"
                            : ""
                        }`}
                        onClick={() => {
                          setMaxTime(0);
                          changeVideoSource(item, index);
                          setPDF(item.contentType);
                          consoleLogLectureId(item.id);
                        }}
                      >
                        <div className="flex">
                          {index + 1 === learned && (
                            <CircularProgressbar
                              value={percentage}
                              styles={buildStyles({
                                rotation: 0,
                                strokeLinecap: "butt",
                                textSize: "25px",
                                pathTransitionDuration: 0.5,
                                pathColor: `#309255`,
                                trailColor: "#d6d6d6",
                                backgroundColor: "#309255",
                              })}
                              strokeWidth={20}
                              className="w-[40px] h-[40px] pl-[10px] min-w-[40px]"
                            />
                          )}
                          {index + 1 > learned && (
                            <FaLock className="h-[20px] pl-[10px] text-gray-500 mt-[10px] min-w-[40px]" />
                          )}
                          {index + 1 < learned && (
                            <FaCheck className="w-[40px] h-[20px] pl-[10px] text-[#309255] mt-[10px] min-w-[40px]" />
                          )}

                          <div className="py-2 pl-[10px] flex flex-row gap-3">
                            <p className="flex-none h-[50px]">
                              Lecture {index + 1}:
                            </p>
                            <p className="flex-auto"> {item.title}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                  <div className="pl-10 py-2 pr-[30px] bg-[#dff0e6] flex">
                    <p className=" py-1">
                      Time Spent: {formatTime(timeSpent?.timeSpent)}
                    </p>
                  </div>
                  <div className="pl-10 py-2 pr-[30px] bg-[#dff0e6] flex">
                    <button
                      className="border-2 border-[#309255] px-5 py-1 rounded-lg hover:bg-[#309255] active:bg-[#75c989] hover:text-white flex"
                      onClick={handleClick}
                    >
                      {!(isComplete && testVideo.length + 1 === learned) && (
                        <FaLock className="my-auto" />
                      )}{" "}
                      <span>Test</span>
                    </button>

                    <p className="ml-auto my-auto">
                      Score: {performance?.score}
                    </p>
                  </div>
                </nav>
              </div>
            </div>
            <div className="video-playlist bg-[#eefbf3] text-black">
              <div className="accordion" id="videoPlaylist"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
