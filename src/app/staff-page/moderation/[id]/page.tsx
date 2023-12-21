"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { Course } from "@/components/courses/courses";
import LeftNavbar from "@/components/left-navbar/page";
import InstructorCourseStyle from ".././styles/style.module.scss";
import { useEffect, useState } from "react";
import { http } from "@/api/http";
import { Lecture } from "@/app/my-course/[id]/page";
import {
  Breadcrumb,
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import { toast } from "sonner";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import { Test } from "@/components/test/test";
import { Avatar } from "@mui/material";

interface Report {
  id: number;
  reportType: string;
  description: string;
  timeStamp: string;
  imageUrl: string;
  reportByNavigation: {
    fullName: string;
    profilePictureUrl: string;
  };
}

const DetailsContent = ({ params }: any) => {
  const idCourse = params.id;
  const [loading, setLoading] = useState(true);

  const [course, setCourse] = useState<Course>();
  const [reportData, setReportData] = useState<Report[]>([]);
  // console.log("má", course);

  const { id, userData } = UserAuth();

  useEffect(() => {
    http
      .get(
        `https://learnconnectserver.azurewebsites.net/api/course/get-course-pending/${idCourse}`
      )
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [idCourse]);

  const [lectures, setLectures] = useState<Lecture[]>([]);

  const getStatusCount = () => {
    const statusCount = lectures.reduce(
      (accumulator, item) =>
        item.status === 0 || item.status === 1 ? accumulator + 1 : accumulator,
      0
    );
    return statusCount;
  };

  const [showApproved, setShowApproved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(
          `https://learnconnectserver.azurewebsites.net/api/report/get-reports?targetId=${idCourse}&reportType=course`
        );
        // console.log("API Response:", response.data);
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idCourse]);

  useEffect(() => {
    const statusCount = getStatusCount();
    setShowApproved(statusCount >= 3);
  }, [lectures]);

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(
        `https://learnconnectserver.azurewebsites.net/api/lecture/by-course/${idCourse}`
        // `https://learnconnectapi.azurewebsites.net/api/lecture/by-user-course?userId=8&courseId=${idCourse}`
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

  const [oneLecture, setOneLecture] = useState<Lecture>();
  const [acceptModal, setAcceptModal] = useState(false);
  const [lectureId, setLectureId] = useState<number>(0);

  const handleAcceptLecture = (data: any) => {
    setAcceptModal(true);
    setOneLecture(data);
    setLectureId(data.id);
  };

  const handleAcceptClick = (data: any) => {
    try {
      http
        .post(
          `https://learnconnectserver.azurewebsites.net/api/lecture/process-lecture-request?lectureId=${lectureId}&acceptRequest=true`
        )
        .then(() => {
          {
            handleModalCancel();
            toast.success("Approve Lecture Successfully");
            http.get(`/lecture/by-course/${idCourse}`).then((response) => {
              setLectures(response.data);
              setLoading(false);
              // form.resetFields();
            });
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const [RejectModal, setRejectModal] = useState(false);

  const [form] = Form.useForm();
  const router = useRouter();

  const handleRejectLecture = (data: any) => {
    setRejectModal(true);
    setOneLecture(data);
  };
  const handleRejectClick = (data: any) => {
    const formData = new FormData();
    formData.append("note", data.reason);
    try {
      http
        .post(
          `https://learnconnectserver.azurewebsites.net/api/lecture/process-lecture-request?lectureId=${oneLecture?.id}&acceptRequest=false&note=${data.reason}`,
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
            http.get(`/lecture/by-course/${idCourse}`).then((response) => {
              setLectures(response.data);
              setLoading(false);
              // form.resetFields();
            });
          }
        });
    } catch (err) {
      console.error(err);
    }
  };
  const handleBanLecture = (data: any) => {};

  const [approveCourse, setApproveCourse] = useState(false);
  const [rejectCourse, setRejectCourse] = useState(false);
  const [banCourse, setBanCourse] = useState(false);
  const [unBanCourse, setUnBanCourse] = useState(false);

  const handleApprove = (data: any) => {
    setApproveCourse(true);
  };

  const handleReject = (data: any) => {
    setRejectCourse(true);
  };

  const handleBan = (data: any) => {
    setBanCourse(true);
  };

  const handleBanCourseClick = (data: any) => {
    const formData = new FormData();
    formData.append("reason", data.reason);
    formData.append("status", "true");
    try {
      http
        .post(
          `https://learnconnectserver.azurewebsites.net/api/course/ban-course?courseId=${idCourse}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          handleModalCancel();
          toast.success("Ban Course Successfully !!!");
          router.push("/staff-page/moderation");
        });
    } catch (err) {
      toast.error("Ban course Fails !!!");
    }
  };

  const handleUnBan = (data: any) => {
    setUnBanCourse(true);
  };

  const handleUnBanCourseClick = () => {
    try {
      http
        .post(
          `https://learnconnectserver.azurewebsites.net/api/course/ban-course?courseId=${idCourse}&status=false`
        )
        .then(() => {
          handleModalCancel();
          toast.success("Ban Course Successfully !!!");
          router.push("/staff-page/moderation");
        });
    } catch (err) {
      toast.error("Ban course Fails !!!");
    }
  };

  const handleApproveClick = () => {
    try {
      http
        .post(
          `https://learnconnectserver.azurewebsites.net/api/course/process-course-request?courseId=${idCourse}&acceptRequest=true`
        )
        .then(() => {
          {
            handleModalCancel();
            toast.success("Approve Courses Successfully");
            // http.get(`/lecture/by-course/${idCourse}`).then((response) => {
            //   setLectures(response.data);
            //   setLoading(false);
            //   // form.resetFields();
            // });
            router.push("/staff-page/moderation");
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRejectCourse = (data: any) => {
    const formData = new FormData();
    formData.append("note", data.reason);
    try {
      http
        .post(
          `https://learnconnectserver.azurewebsites.net/api/course/process-course-request?courseId=${idCourse}&acceptRequest=false&note=${data.reason}`
        )
        .then(() => {
          {
            handleModalCancel();
            toast.success("Reject Courses Successfully");
            // http.get(`/lecture/by-course/${idCourse}`).then((response) => {
            //   setLectures(response.data);
            //   setLoading(false);
            //   // form.resetFields();
            // });
            router.push("/staff-page/moderation");
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");

  const showModal = (content) => {
    setSelectedContent(content);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setAcceptModal(false);
    setRejectModal(false);
    setApproveCourse(false);
    setRejectCourse(false);
    setBanCourse(false);
    setUnBanCourse(false);
    setApproveTestModal(false);
    setRejectTestModal(false);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <>
          {text.length > 50 ? (
            <>
              <a type="link" onClick={() => showModal(text)}>
                {`${text.slice(0, 50)}...`}
              </a>
            </>
          ) : (
            text
          )}
        </>
      ),
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      sorter: (a, b) => a.content.localeCompare(b.content),

      render: (text, record) => (
        <>
          {text.length > 50 ? (
            <>
              <a type="link" onClick={() => showModal(text)}>
                {`${text.slice(0, 50)}...`}
              </a>
            </>
          ) : (
            text
          )}
        </>
      ),
    },
    {
      title: "Type",
      dataIndex: "contentType",
      key: "contentType",
      sorter: (a, b) => a.contentType - b.contentType,

      render: (text: number, record: any) => {
        return text === 1 ? "Video" : "Document";
      },
    },
    {
      title: "Actions",
      key: "actions",
      // align: "center",
      render: (text, record) => (
        <Space>
          <Button
            type="default"
            style={{
              backgroundColor: "",
              borderColor: "",
              color: "black",
            }}
            onClick={() => {
              routerPush(record.id);
              console.log("tne", record.id);
            }}
          >
            Analysis
          </Button>
        </Space>
      ),
    },
    {
      title: "Note",
      dataIndex: "rejectReason",
      key: "rejectReason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status - b.status,

      render: (status) => getStatusText(status),
    },
  ];

  const routerPush = (id: any) => {
    router.push(`/staff-page/moderation/${idCourse}/${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "green"; // Màu xanh cho trạng thái Active
      case 1:
        return "grey"; // Màu đỏ cho trạng thái Pending
      case 2:
        return "volcano"; // Màu đỏ cam cho trạng thái Reject
      case 3:
        return "red"; // Màu đỏ hồng cho trạng thái Banned
      default:
        return "defaultColor"; // Màu mặc định nếu status không phù hợp với bất kỳ trạng thái nào
    }
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

  const breadcrumbNavigation = () => {
    router.push("/staff-page/moderation");
  };

  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const [listQuestion, setListQuestion] = useState<Test[]>([]);
  const [allQuestions, setAllQuestions] = useState<Test[]>([]);
  const [idTest, setIdTest] = useState<Test>();
  const [testStatus, setTestStatus] = useState<number>(0);
  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(`/test/get-tests-by-course?courseId=${idCourse}`)
      .then((response) => {
        // setInfoTest(response.data.questions);
        setListQuestion(response.data);
        setAllQuestions(response.data[0].questions);
        setIdTest(response.data[0].test.id);
        setTestStatus(response.data[0].test.status);
        // console.log("vải ò", response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const [approveTestModal, setApproveTestModal] = useState(false);
  const [testId, setTestId] = useState<number>(0);

  const handleApproveTestModal = (data: any) => {
    setApproveTestModal(true);
    setTestId(data);
  };

  const handleApproveTestClick = () => {
    try {
      http
        .post(
          `https://learnconnectserver.azurewebsites.net/api/test/process-test-request?testId=${testId}&acceptRequest=true`
        )
        .then(() => {
          http
            .get(`/test/get-tests-by-course?courseId=${idCourse}`)
            .then((response) => {
              setListQuestion(response.data);
              setAllQuestions(response.data[0].questions);
              setIdTest(response.data[0].test.id);
              setTestStatus(response.data[0].test.status);
              setApproveTestModal(false);
              toast.success("Approve Test Successfully!");
            })
            .catch((error) => {
              console.log("Error fetching user data:", error);
              setLoading(false);
            });
        });
    } catch (e) {
      console.log(e);
    }
  };

  const [rejectTestModal, setRejectTestModal] = useState(false);

  const handleRejectTestModal = (data: any) => {
    setRejectTestModal(true);
    setTestId(data);
  };

  const handleRejectTestClick = (data: any) => {
    try {
      http
        .post(
          `https://learnconnectserver.azurewebsites.net/api/test/process-test-request?testId=${testId}&acceptRequest=false&note=${data.reason}`
        )
        .then(() => {
          http
            .get(`/test/get-tests-by-course?courseId=${idCourse}`)
            .then((response) => {
              setListQuestion(response.data);
              setAllQuestions(response.data[0].questions);
              setIdTest(response.data[0].test.id);
              setTestStatus(response.data[0].test.status);
              setRejectTestModal(false);
              toast.success("Approve Test Successfully!");
            })
            .catch((error) => {
              console.log("Error fetching user data:", error);
              setLoading(false);
            });
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {!userData ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex">
          <LeftNavbar
            page1={"/staff-page"}
            page2={"/staff-page/staff-rating"}
            page3={"/staff-page/staff-report"}
            page4={"/staff-page/moderation"}
            page5={"/staff-page/list-major"}
            page6={"/staff-page/staff-revenue"}
            page7={"/staff-page/staff-transaction"}
          />
          <div className="w-full my-4">
            <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
              <Breadcrumb className="text-start font-semibold text-2xl my-5 px-4">
                <Breadcrumb.Item>
                  <button onClick={breadcrumbNavigation}>Course</button>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{course?.name}</Breadcrumb.Item>
                {/* <Breadcrumb.Item>React</Breadcrumb.Item> */}
              </Breadcrumb>
            </div>

            <>
              {course?.status === 2 && (
                <div className="text-3xl mt-4 underline">
                  Reasons for reject the course : {course?.note}
                </div>
              )}
            </>
            <div className={`${InstructorCourseStyle.featured} mx-5`}>
              <div className={`${InstructorCourseStyle.featured_top} `}>
                <h1 className={`${InstructorCourseStyle.featured_top_title}`}>
                  About Course
                </h1>

                <div className="flex justify-end gap-2  items-center">
                  {course?.status === 0 ? (
                    <button
                      className="bg-white text-black border rounded-lg border-red-500 hover:bg-red-500 hover:text-white transition duration-300 px-6 py-2"
                      onClick={handleBan}
                    >
                      Ban
                    </button>
                  ) : course?.status === 1 ? (
                    <>
                      {" "}
                      {showApproved &&
                        listQuestion.length !== 0 &&
                        allQuestions.length !== 0 &&
                        testStatus !== 2 && (
                          <button
                            className="bg-white text-black border rounded-lg border-[#4caf50] hover:bg-[#4caf50] hover:text-white transition duration-300 px-4 py-2"
                            onClick={handleApprove}
                          >
                            Approve
                          </button>
                        )}
                      <button
                        className="bg-white text-black border rounded-lg border-[#ffa04e] hover:bg-[#ffa04e] hover:text-white transition duration-300 px-5 py-2"
                        // style={{
                        //   backgroundColor: "#ffa04e",
                        //   borderColor: "#ffa04e",
                        //   color: "#fff",
                        // }}
                        onClick={handleReject}
                      >
                        Reject
                      </button>
                      {/* <button
                        className="bg-white text-black border rounded-lg border-red-500 hover:bg-red-500 hover:text-white transition duration-300 px-6 py-2"
                        onClick={handleBan}
                      >
                        Ban
                      </button> */}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
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
                  <p
                    className={`${InstructorCourseStyle.featured_bottom_title}`}
                  >
                    <div className="flex justify-between">
                      <div>{course?.name}</div>{" "}
                      <div className="flex items-center">
                        {" "}
                        {getStatusText(course?.status)}
                      </div>
                    </div>
                  </p>
                  <p
                    className={`${InstructorCourseStyle.featured_bottom_cate}`}
                  >
                    {course?.specializationName}
                  </p>
                  <div className="flex flex-row justify-between">
                    <div>
                      <p
                        className={`${InstructorCourseStyle.featured_bottom_amount}`}
                      >
                        Author: {course?.mentorName}
                      </p>
                      <p
                        className={`${InstructorCourseStyle.featured_bottom_amount}`}
                      >
                        Lectures: {course?.lectureCount}
                      </p>
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
                    </div>
                  </div>
                  <div
                    className={`${InstructorCourseStyle.featured_bottom_amount}`}
                  >
                    <p>
                      <span className="">Create Date: </span>
                      {course?.createDate
                        ? new Date(course?.createDate).toLocaleTimeString(
                            "en-US"
                          )
                        : ""}{" "}
                      {course?.createDate
                        ? new Date(course?.createDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : ""}{" "}
                    </p>
                    <div className="bg-[#e5f4eb] rounded-[10px] px-10 h-[5px]"></div>
                    <div>
                      <span>Description:</span>
                      <br />
                      {course?.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center bg-[#e7f8ee] py-4 rounded-md m-5">
              <ul className="tabs flex space-x-10 ">
                <li
                  className={`cursor-pointer rounded-md ${
                    activeTab === "tab1"
                      ? "bg-[#309255] text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleTabClick("tab1")}
                >
                  <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                    Lectures
                  </button>
                </li>
                <li
                  className={`cursor-pointer rounded-md ${
                    activeTab === "tab2"
                      ? "bg-[#309255] text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleTabClick("tab2")}
                >
                  <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                    Test
                  </button>
                </li>
                {course?.status === 0 && (
                  <li
                    className={`cursor-pointer rounded-md ${
                      activeTab === "tab3"
                        ? "bg-[#309255] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleTabClick("tab3")}
                  >
                    <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                      Reports
                    </button>
                  </li>
                )}
              </ul>
            </div>
            {activeTab === "tab1" && (
              <div className="mt-5 mx-5">
                {loading ? (
                  <Spin size="large" />
                ) : (
                  <Table
                    className="shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg"
                    dataSource={lectures}
                    columns={columns}
                  />
                )}
              </div>
            )}
            {activeTab === "tab2" && (
              <div className={`${InstructorCourseStyle.lecture}`}>
                {/* <div className="flex justify-between mb-5">
              <Button onClick={showModal}> New Question</Button>
            </div> */}
                {listQuestion.length === 0 ? (
                  <>
                    <Empty />
                  </>
                ) : (
                  <>
                    {loading ? (
                      <Spin size="large" />
                    ) : (
                      <>
                        {listQuestion.map((item) => (
                          <div key={item.test.id} className="mb-4 mt-6">
                            <div className="flex flex-col">
                              <div className="flex flex-row justify-end">
                                <Space>
                                  {item.test.status === 1 &&
                                    allQuestions.length !== 0 && (
                                      <>
                                        {" "}
                                        <button
                                          onClick={() => {
                                            handleApproveTestModal(
                                              item.test.id
                                            );
                                          }}
                                          className="bg-white text-black border rounded-lg border-[#4caf50] hover:bg-[#4caf50] hover:text-white transition duration-300 px-3 py-1"
                                        >
                                          Approve
                                        </button>
                                      </>
                                    )}
                                  <button
                                    onClick={() => {
                                      handleRejectTestModal(item.test.id);
                                    }}
                                    className="bg-white text-black border rounded-lg border-[#ffa04e] hover:bg-[#ffa04e] hover:text-white transition duration-300 px-3 py-1"
                                  >
                                    Reject
                                  </button>
                                </Space>{" "}
                              </div>
                              <h3 className="text-xl font-semibold mt-2 text-center ">
                                <div className=" flex flex-col items-center justify-center mb-2">
                                  <div className="flex flex-row justify-center items-center gap-2 ">
                                    <div className="text-3xl flex flex-col gap-2">
                                      <div>{item.test.title} </div>
                                      <div className="flex justify-center items-center text-2xl">
                                        {getStatusText(item.test.status)}
                                      </div>
                                    </div>
                                  </div>

                                  <br />
                                  <div> {item.test.description}</div>
                                </div>
                              </h3>
                            </div>

                            {/* {item.questions.length == 0 ? <></> : <></>} */}
                            {item.questions.map((q, index) => (
                              <div
                                key={q.question.id}
                                className="mb-2 my-8 p-4 border-2 rounded-lg border-gray-200 shadow-[10px_10px_20px_10px_rgba(0,0,0,0.15)] "
                              >
                                <div className="mb-1 font-medium text-[18px] flex flex-row justify-between">
                                  <div className="flex flex-row gap-2">
                                    {index + 1}.{" "}
                                    <div className="w-full">
                                      {q.question.questionText}
                                    </div>
                                  </div>
                                </div>
                                <div className="px-4 grid grid-cols-2 gap-4">
                                  {q.answers.map((answer, ansIndex) => (
                                    <>
                                      <div className="flex gap-2 justify-center align-middle items-center mt-3">
                                        <div
                                          className={` border-2 p-2 flex-auto text-left rounded-lg ${
                                            answer.isCorrect === true
                                              ? "border-green-500 bg-green-100"
                                              : ""
                                          }`}
                                        >
                                          {answer.answerText}
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <></>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
            {activeTab === "tab3" && (
              <div className={`${InstructorCourseStyle.lecture}`}>
                {reportData.length === 0 ? (
                  <Empty />
                ) : (
                  <>
                    {loading ? (
                      <Spin size="large" />
                    ) : (
                      // <Table dataSource={listRating} columns={rating} />
                      <div className="reviews-wrapper reviews-active">
                        <div className="swiper-container">
                          <div className="swiper-wrapper">
                            {reportData.map((report) => {
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
                                            src={
                                              report.reportByNavigation
                                                .profilePictureUrl
                                            }
                                            alt="Author"
                                            // className="w-24 h-24 rounded-full"
                                          />
                                          <i className="icofont-quote-left"></i>
                                        </div>
                                        <div className="author-content pl-4">
                                          <h4 className="text-2xl font-medium">
                                            {report.reportByNavigation.fullName}
                                          </h4>
                                          <span className="text-lg text-[#309255] mt-1.5 font-light">
                                            {report.timeStamp
                                              ? new Date(
                                                  report.timeStamp
                                                ).toLocaleTimeString("en-US")
                                              : ""}{" "}
                                            {report.timeStamp
                                              ? new Date(
                                                  report.timeStamp
                                                ).toLocaleDateString("en-GB", {
                                                  day: "numeric",
                                                  month: "long",
                                                  year: "numeric",
                                                })
                                              : ""}{" "}
                                          </span>
                                          {report.description === "null" ? (
                                            <></>
                                          ) : (
                                            <p className="mt-3 font-medium text-[#52565b] text-lg">
                                              {report.description}
                                            </p>
                                          )}
                                        </div>
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
                  </>
                )}
              </div>
            )}
          </div>

          <Modal
            title="Content Details"
            open={modalVisible}
            onCancel={handleModalCancel}
            footer={null}
            style={{
              top: "30%",
            }}
          >
            <p>{selectedContent}</p>
          </Modal>

          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Approve this Course?
              </div>
            }
            open={approveCourse}
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
              onFinish={handleApproveClick}
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
                Are you sure you want to Ban this Course?
              </div>
            }
            open={banCourse}
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
              onFinish={handleBanCourseClick}
            >
              <Form.Item
                label="Reason"
                name="reason"
                rules={[{ required: true, message: "Please provide a reason" }]}
              >
                <Input.TextArea autoSize={{ minRows: 2 }} />
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

          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to UnBan this Course?
              </div>
            }
            open={unBanCourse}
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
              onFinish={handleUnBanCourseClick}
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
            open={RejectModal}
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

          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Reject this Course?
              </div>
            }
            open={rejectCourse}
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
              onFinish={handleRejectCourse}
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

          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Approve this Test?
              </div>
            }
            open={approveTestModal}
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
              onFinish={handleApproveTestClick}
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
                Are you sure you want to Reject this Test?
              </div>
            }
            open={rejectTestModal}
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
              onFinish={handleRejectTestClick}
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
        </div>
      )}
    </>
  );
};

export default DetailsContent;
