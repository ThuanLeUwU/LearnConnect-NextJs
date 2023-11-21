"use client";
import React, { useEffect, useState } from "react";
import InstructorCourseStyle from ".././styles/style.module.scss";
import Link from "next/link";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  Upload,
} from "antd";
import { UserAuth } from "@/app/context/AuthContext";
import { Lecture } from "@/app/my-course/[id]/page";
import axios from "axios";
import { http } from "@/api/http";
import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Rating,
} from "@mui/material";
import { toast } from "sonner";
import { Course } from "@/components/courses/courses";
import { Test } from "@/app/test/[id]/page";
// import { Rating } from "@/app/course-detail/[id]/page";

export type Rating = {
  userRatingInfo: any;
  ratingCourseInfo: any;
  id: number;
  rating1: number;
  comment: string;
  timeStamp: string;
  status: number;
  userId: number;
  courseId: number;
  mentorId: number;
};
// export type Test = {
//   test: {
//     id: number;
//     title: string;
//     description: string;
//     totalQuestion: number;
//     createDate: string;
//     status: number;
//     courseId: number;
//     questions: null;
//   };
//   questions: {
//     question: {
//       id: number;
//       questionTest: string;
//       questionType: number;
//       status: number;
//       testId: number;
//     };
//     answers: {
//       id: number;
//       answerTest: string;
//       isCorrect: boolean;
//       questionId: number;
//     };
//   };
// };

// export type Question = {
//   id: number;
//   questionTest: string;
//   questionType: number;
//   status: number;
//   testId: number;
// };

// export type Answers = {
//   id: number;
//   questionTest: string;
//   questionType: number;
//   status: number;
//   testId: number;
// };

const Dashboard = ({ params }: any) => {
  const idCourse = params.id;
  // console.log("param", params);
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
    form.resetFields();
  };

  //update
  const [updateVisible, setUpdateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [oneLecture, setOneLecture] = useState<Lecture>();
  const [updateType, setUpdateType] = useState(oneLecture?.contentType);
  const [updateSrc, setUpdateSrc] = useState(oneLecture?.contentUrl);

  const handleUpdateModal = (record: any) => {
    setSelectedItem(record);
    setOneLecture(record);
    setUpdateVisible(true);
    setUpdateType(record.contentType);
    setUpdateSrc(record.contentUrl);
  };

  const handleUpdateType = (data: number) => {
    setUpdateType(data);
    // setType(data);
  };

  const handleDeleteModal = (record: any) => {
    setSelectedItem(record);
    setOneLecture(record);
    setDeleteVisible(true);
  };

  //Get This Course
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    http
      .get(
        `https://learnconnectapitest.azurewebsites.net/api/course/user/${id}/course/${idCourse}`
      )
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [id]);

  // const [updateType, setUpdateType] = useState(oneLecture?.contentType);

  const handleUpdate = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title || oneLecture?.title);
    formData.append("content", data.content || oneLecture?.content);
    formData.append("contentType", type.toString());
    if (formDataSource !== undefined) {
      formData.append("contentUrl", formDataSource);
    }

    try {
      await http
        .put(
          `/lecture/update/${idCourse}/${id}?lectureId=${oneLecture?.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          handleCancel();
          toast.success("update Lecture Successfully");
          http.get(`/lecture/by-course/${idCourse}`).then((response) => {
            setLectures(response.data);
            setLoading(false);
            // form.resetFields();
          });
        });
    } catch (err) {
      setTimeout(() => {
        toast.error("Update Lecture fail");
      });
    }
    // Implement your update logic here
    // You can use selectedItem to identify the item to update
    setUpdateVisible(false);
  };

  const handleDelete = () => {
    // Implement your delete logic here
    // You can use selectedItem to identify the item to delete
    setDeleteVisible(false);
  };

  const handleUpdateCancel = () => {
    setSource(undefined);
    setUpdateVisible(false);
    form.resetFields();
  };

  const handleDeleteCancel = () => {
    setDeleteVisible(false);
  };

  const handleSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("contentType", type.toString());
    if (formDataSource !== undefined) {
      formData.append("contentUrl", formDataSource);
    }

    try {
      await http
        .post(
          `https://learnconnectapitest.azurewebsites.net/api/lecture/create-new-lecture?userId=${id}&courseId=${idCourse}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          handleCancel();
          toast.success("Create Lecture Successfully");
          http
            .get(
              `https://learnconnectapitest.azurewebsites.net/api/lecture/by-course/${idCourse}`
            )
            .then((response) => {
              setLectures(response.data);
              setLoading(false);
            });
        });
    } catch (err) {
      setTimeout(() => {
        toast.error("Create Lecture fail");
      });
    }
  };

  //get list lecture
  const [lectures, setLectures] = useState<Lecture[]>([]);
  // console.log("lecture", lectures);
  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
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

  //type
  const [type, setType] = useState<number>(1);
  const { Option } = Select;
  // console.log("type", type);

  const Type = [
    { id: 1, title: "Video" },
    { id: 2, title: "Document" },
  ];

  const handleChangeType = (value: number) => {
    setType(value);
  };

  //video upload
  // const inputRef = React.useRef();
  const [formDataSource, setFormDataSource] = useState();
  const [source, setSource] = useState<string>();

  const handleFileChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

      setFormDataSource(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setSource(url);
        setUpdateSrc(url);
      });
    }
  };

  const handleDocChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

      setFormDataSource(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setSource(url);
        // setUpdateImage(url);
      });
    }
  };

  const getBase64 = (src: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(src);
  };
  // const handleChoose = (event) => {
  //   inputRef.current.click();
  // };

  //List Of Question
  // const [infoTest, setInfoTest] = useState<Test>();
  // console.log("test", infoTest);
  const [listQuestion, setListQuestion] = useState<Test[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: { answer: string; isCorrect: boolean };
  }>({});
  // console.log("Questions", listQuestion);
  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(`/test/get-tests-by-course?courseId=${idCourse}`)
      .then((response) => {
        // setInfoTest(response.data.questions);
        setListQuestion(response.data);
        listQuestion.forEach((item) => {
          const totalQuestion = item.test.totalQuestion;
          // console.log("Total Questions:", totalQuestion);
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

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
      render: (text, record) => {
        return (
          <a href={text} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "contentType",
      key: "contentType",
      render: (text: number, record: any) => {
        return text === 1 ? "Video" : "Document";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button onClick={() => handleUpdateModal(record)}>Update</Button>
          <Button danger onClick={() => handleDeleteModal(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 1 ? "red" : "green"}>
          {status === 1 ? "Inactive" : "Active"}
        </Tag>
      ),
    },
  ];

  const [listRating, setListRating] = useState<Rating[]>([]);

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(`/rating/listRatingOfCourse/${idCourse}`)
      .then((response) => {
        // setInfoTest(response.data.questions);
        setListRating(response.data);
        console.log("rating", response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [idCourse]);

  const rating = [
    {
      title: "Rating",
      dataIndex: "rating1",
      key: "rating1",
      render: (rating1) => <Tag color="blue">{rating1}</Tag>,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Time",
      dataIndex: "timeStamp",
      key: "timeStamp",
      render: (timeStamp) => {
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZone: "Asia/Ho_Chi_Minh", // Chỉ định múi giờ nếu cần thiết
        }).format(new Date(timeStamp));
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 1 ? "red" : "green"}>
          {status === 1 ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
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
      href: "/review-mentor",
    },
    {
      image: "/menu-icon/icon1.png",
      href: "/revenue",
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
        <div className={`${InstructorCourseStyle.featured}`}>
          <div className={`${InstructorCourseStyle.featured_top}`}>
            <h1 className={`${InstructorCourseStyle.featured_top_title}`}>
              About Course
            </h1>
          </div>
          {/* <div className={`${InstructorCourseStyle.featured_bottom}`}> */}
          <div className="p-5 flex gap-5">
            <div className="flex-1">
              <img
                width="400px"
                className="h-[300px] w-[400px] rounded-lg"
                src={`${course?.imageUrl}`}
                alt=""
              />
            </div>
            <div className="flex-auto w-[36rem]">
              <p className={`${InstructorCourseStyle.featured_bottom_title}`}>
                {course?.name}
              </p>
              <p className={`${InstructorCourseStyle.featured_bottom_cate}`}>
                {course?.categoryName}
              </p>
              <div className="flex flex-row justify-between">
                <div>
                  <p
                    className={`${InstructorCourseStyle.featured_bottom_amount}`}
                  >
                    Price:
                    {course?.price === 0 ? (
                      <> Free</>
                    ) : (
                      <> {course?.price} VND</>
                    )}
                  </p>
                  <p
                    className={`${InstructorCourseStyle.featured_bottom_amount}`}
                  >
                    Enrollment: {course?.totalEnrollment}
                  </p>
                </div>
                <div>
                  <p
                    className={`${InstructorCourseStyle.featured_bottom_amount}`}
                  >
                    Total Rating: {course?.totalRatingCount}
                  </p>
                  <p
                    className={`${InstructorCourseStyle.featured_bottom_amount} flex items-center`}
                  >
                    Average Rating: {course?.averageRating}{" "}
                    <Rating
                      size="medium"
                      name="half-rating-read"
                      max={1}
                      readOnly
                      value={1}
                    />
                  </p>
                </div>
              </div>
              <div
                className={`${InstructorCourseStyle.featured_bottom_amount}`}
              >
                <p>
                  <span className="text-green-500">Create Date: </span>
                  {course?.createDate
                    ? new Date(course?.createDate).toLocaleTimeString("en-US")
                    : ""}{" "}
                  {course?.createDate
                    ? new Date(course?.createDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}{" "}
                </p>
                <div className="bg-[#e5f4eb] rounded-[10px] px-10 h-[5px]"></div>
                <div>
                  <span>Description:</span>
                  <br />
                  {course?.description}
                </div>
              </div>
              <div>{/* <span>Description: {course?.description}</span> */}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center bg-[#e7f8ee] py-4 rounded-md m-5">
          <ul className="tabs flex space-x-5 ">
            <li
              className={`cursor-pointer rounded-md ${
                activeTab === "tab1" ? "bg-[#309255] text-white" : "bg-white"
              }`}
              onClick={() => handleTabClick("tab1")}
            >
              <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                Lectures
              </button>
            </li>
            <li
              className={`cursor-pointer rounded-md ${
                activeTab === "tab2" ? "bg-[#309255] text-white" : "bg-white"
              }`}
              onClick={() => handleTabClick("tab2")}
            >
              <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                Test
              </button>
            </li>
            <li
              className={`cursor-pointer rounded-md ${
                activeTab === "tab3" ? "bg-[#309255] text-white" : "bg-white"
              }`}
              onClick={() => handleTabClick("tab3")}
            >
              <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                Reviews
              </button>
            </li>
          </ul>
        </div>
        {activeTab === "tab1" && (
          <div className={`${InstructorCourseStyle.lecture}`}>
            {course?.lectureCount !== lectures.length ? (
              <div className="flex justify-between mb-5">
                <Button onClick={showModal}> New Lectures</Button>
              </div>
            ) : (
              <div className="flex justify-between mb-5">
                <Button disabled> New Lectures</Button>
              </div>
            )}

            {loading ? (
              <Spin size="large" />
            ) : (
              <Table dataSource={lectures} columns={columns} />
            )}
          </div>
        )}
        {activeTab === "tab2" && (
          <div className={`${InstructorCourseStyle.lecture}`}>
            <div className="flex justify-between mb-5">
              <Button onClick={showModal}> New Question</Button>
            </div>
            {loading ? (
              <Spin size="large" />
            ) : (
              <>
                {listQuestion.map((item) => (
                  <div key={item.test.id} className="mb-4 mt-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {item.test.title}
                    </h3>
                    {item.questions.map((q, index) => (
                      <div
                        key={q.question.id}
                        className="mb-2 mt-6 p-6 border-2 rounded-lg border-gray-200"
                      >
                        <p className="mb-1 font-medium text-[18px]">
                          {index + 1}. {q.question.questionTest}
                        </p>
                        <div className="pl-4 grid grid-cols-2 gap-4">
                          {q.answers.map((answer, ansIndex) => (
                            <div
                              key={answer.id}
                              className={`mt-3 border-2 p-2 text-left rounded-lg ${
                                answer.isCorrect === true
                                  ? "border-green-500 bg-green-100"
                                  : ""
                              }`}
                              // onClick={() =>
                              //   handleAnswerSelect(
                              //     q.question.id,
                              //     answer.answerTest,
                              //     answer.isCorrect
                              //   )
                              // }
                            >
                              {/* <span className="mr-2">
                              {answerOptions[ansIndex]}
                            </span> */}
                              {answer.answerTest}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
        {activeTab === "tab3" && (
          <div className={`${InstructorCourseStyle.lecture}`}>
            <div className="flex justify-between mb-5">
              <span className="text-lg">Rating of Course</span>
            </div>
            {loading ? (
              <Spin size="large" />
            ) : (
              // <Table dataSource={listRating} columns={rating} />
              <div className="reviews-wrapper reviews-active">
                <div className="swiper-container">
                  <div className="swiper-wrapper">
                    {listRating.map((item) => {
                      return (
                        <>
                          <div className="single-review mt-3.5 border border-opacity-20 border-[#30925533] p-7 rounded-md">
                            <div className="review-author flex justify-between">
                              <div className="flex flex-row">
                                <div className="author-thumb p-2">
                                  <Avatar
                                    sx={{
                                      width: "100px",
                                      height: "100px",
                                      borderRadius: "100%",
                                    }}
                                    src={item.userRatingInfo.imageUser}
                                    alt="Author"
                                    // className="w-24 h-24 rounded-full"
                                  />
                                  <i className="icofont-quote-left"></i>
                                </div>
                                <div className="author-content pl-4">
                                  <h4 className="text-2xl font-medium">
                                    {item.userRatingInfo.fullName}
                                  </h4>
                                  <span className="text-lg text-[#309255] mt-1.5 font-light">
                                    {item.ratingCourseInfo.timeStamp
                                      ? new Date(
                                          item.ratingCourseInfo.timeStamp
                                        ).toLocaleTimeString("en-US")
                                      : ""}{" "}
                                    {item.ratingCourseInfo.timeStamp
                                      ? new Date(
                                          item.ratingCourseInfo.timeStamp
                                        ).toLocaleDateString("en-GB", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                        })
                                      : ""}{" "}
                                  </span>
                                  {item.ratingCourseInfo.comment === "null" ? (
                                    <></>
                                  ) : (
                                    <p className="mt-3 font-medium text-[#52565b] text-lg">
                                      {item.ratingCourseInfo.comment}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <Rating
                                  size="large"
                                  name="half-rating-read"
                                  max={5}
                                  precision={0.1}
                                  readOnly
                                  value={item.ratingCourseInfo.rating1}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* create Lecture */}
      <Modal
        destroyOnClose={true}
        title={`Create Lecture for Course by ${userData?.fullName}`}
        open={isModal}
        // onOk={handleOk}
        width={600}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          className="mt-5"
          style={{ width: 600 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            rules={[{ required: true, message: "Please input Name!" }]}
            label="Title"
            name="title"
          >
            <Input placeholder="Input Title" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input Name!" }]}
            label="Content"
            name="content"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Type">
            <Select onChange={handleChangeType} defaultValue={type}>
              {Type.map((option) => {
                return (
                  <Option key={option.id} value={option.id}>
                    {option.title}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {type === 1 ? (
            // <Form.Item label="Video">
            <div>
              <div style={{ display: "flex" }} className="flex justify-center">
                {/* <video width={200} height={200} src={source} /> */}
                <video width={400} height={300} src={source} controls />
              </div>
              <div
                className="flex justify-center pt-2 pb-2"
                style={{ display: "flex" }}
              >
                <Upload
                  // accept="image/png, image/jpeg"
                  // ref={inputRef}
                  accept=".mov,.mp4"
                  // accept=".docx"
                  onChange={handleFileChange}
                  // beforeUpload={beforeUpload}
                  // headers={{ Authorization: authorization }}
                  action="https://learnconnectapitest.azurewebsites.net/api/Upload/video"
                >
                  <Button>Upload</Button>
                </Upload>
              </div>
            </div>
          ) : (
            // </Form.Item>
            <Form.Item label="Document">
              <div
                className="flex justify-center pt-2 pb-2"
                style={{ display: "flex" }}
              >
                <Upload
                  // accept="image/png, image/jpeg"
                  // ref={inputRef}
                  // accept=".mov,.mp4"
                  accept=".pdf"
                  onChange={handleFileChange}
                  // beforeUpload={beforeUpload}
                  // headers={{ Authorization: authorization }}
                  action="https://learnconnectapitest.azurewebsites.net/api/Upload/video"
                >
                  <Button>Upload</Button>
                </Upload>
              </div>
            </Form.Item>
          )}
          <Space className="justify-end w-full pr-[90px]">
            <Form.Item className="mb-0">
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ color: "black" }}
                >
                  Create
                </Button>
              </Space>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
      {/* update lecture */}
      <Modal
        destroyOnClose={true}
        title={`Update lecture ${oneLecture?.title} `}
        open={updateVisible}
        // onOk={handleUpdateOk}
        width={600}
        onCancel={handleUpdateCancel}
        footer={false}
      >
        {/* Add your update form here */}
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          className="mt-5"
          style={{ width: 600 }}
          onFinish={handleUpdate}
        >
          <Form.Item
            // rules={[{ required: true, message: "Please input Name!" }]}
            label="Title"
            name="title"
          >
            <Input defaultValue={oneLecture?.title} />
          </Form.Item>
          <Form.Item
            // rules={[{ required: true, message: "Please input Name!" }]}
            label="Content"
            name="content"
          >
            <Input.TextArea rows={4} defaultValue={oneLecture?.content} />
          </Form.Item>
          <Form.Item label="Category">
            <Select onChange={handleUpdateType} defaultValue={updateType}>
              {Type.map((option) => {
                return (
                  <Option key={option.id} value={option.id}>
                    {option.title}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {updateType === 1 ? (
            // <Form.Item label="Video">
            <div>
              <div style={{ display: "flex" }} className="flex justify-center">
                {/* <video width={200} height={200} src={source} /> */}
                <video width={400} height={300} src={updateSrc} controls />
              </div>
              <div
                className="flex justify-center pt-2 pb-2"
                style={{ display: "flex" }}
              >
                <Upload
                  // accept="image/png, image/jpeg"
                  // ref={inputRef}
                  accept=".mov,.mp4"
                  // accept=".docx"
                  onChange={handleFileChange}
                  // beforeUpload={beforeUpload}
                  // headers={{ Authorization: authorization }}
                  action="https://learnconnectapitest.azurewebsites.net/api/Upload/video"
                >
                  <Button>Upload</Button>
                </Upload>
              </div>
            </div>
          ) : (
            // </Form.Item>
            <Form.Item label="Document">
              {/* <div
                className="flex justify-center pt-2 pb-2"
                style={{ display: "flex" }}
              >
                <Upload
                  // accept="image/png, image/jpeg"
                  // ref={inputRef}
                  // accept=".mov,.mp4"
                  accept=".docx"
                  onChange={handleFileChange}
                  // beforeUpload={beforeUpload}
                  // headers={{ Authorization: authorization }}
                  action="https://learnconnectapitest.azurewebsites.net/api/Upload/video"
                >
                  <Button>Upload</Button>
                </Upload>
              </div> */}
            </Form.Item>
          )}
          <Space className="justify-end w-full pr-[90px]">
            <Form.Item className="mb-0">
              <Space>
                <Button onClick={handleUpdateCancel}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ color: "black" }}
                >
                  Update
                </Button>
              </Space>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
      {/* Delete Lecture */}
      {/* <Modal
        title="Delete Item"
        open={deleteVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal> */}

      {/* Dialog */}
      <Dialog
        open={deleteVisible}
        onClose={handleDeleteCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{ backgroundColor: "#ff0000", fontSize: "20px", color: "white" }}
        >
          {" "}
          WARNING!!!{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Do you want to Delete the Lecture {oneLecture?.title}?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>cancel</Button>

          <Button
            danger
            onClick={() => handleDeleteModal(oneLecture)}
            type="primary"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
