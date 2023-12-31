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

const DetailsContent = ({ params }: any) => {
  const idCourse = params.id;
  const [loading, setLoading] = useState(true);

  const [course, setCourse] = useState<Course>();
  // console.log("má", course);

  const { id, userData } = UserAuth();

  useEffect(() => {
    http
      .get(
        `https://learnconnectapitest.azurewebsites.net/api/course/get-course-pending/${idCourse}`
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
          `https://learnconnectapitest.azurewebsites.net/api/lecture/process-lecture-request?lectureId=${lectureId}&acceptRequest=true`
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
          `https://learnconnectapitest.azurewebsites.net/api/lecture/process-lecture-request?lectureId=${oneLecture?.id}&acceptRequest=false&note=${data.reason}`,
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

  const handleBanCourseClick = () => {
    try {
      http
        .post(
          `https://learnconnectapitest.azurewebsites.net/api/course/ban-course?courseId=${idCourse}&status=true`
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
          `https://learnconnectapitest.azurewebsites.net/api/course/ban-course?courseId=${idCourse}&status=false`
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
          `https://learnconnectapitest.azurewebsites.net/api/course/process-course-request?courseId=${idCourse}&acceptRequest=true`
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
          `https://learnconnectapitest.azurewebsites.net/api/course/process-course-request?courseId=${idCourse}&acceptRequest=false&note=${data.reason}`
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
  };

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
      sorter: (a, b) => a.title.localeCompare(b.title),
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
          {record.status === 0 && (
            <Button danger onClick={() => handleBanLecture(record)}>
              Ban
            </Button>
          )}
          {record.status === 1 && (
            <>
              <Button onClick={() => handleAcceptLecture(record)}>
                Accept
              </Button>
              <Button
                style={{
                  backgroundColor: "#ffa04e",
                  borderColor: "#ffa04e",
                  color: "#fff",
                }}
                onClick={() => handleRejectLecture(record)}
              >
                Reject
              </Button>
            </>
          )}
          {record.status === 2 && <></>}
          {record.status === 3 && <Button>Unban</Button>}
        </Space>
      ),
    },
    {
      title: "Note",
      dataIndex: "rejectReason",
      key: "rejectReason",
      sorter: (a, b) => a.rejectReason.localeCompare(b.rejectReason),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status - b.status,

      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
  ];

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
        return "Active";
      case 1:
        return "Pending";
      case 2:
        return "Reject";
      case 3:
        return "Banned";
      default:
        return "Unknown Status";
    }
  };

  const breadcrumbNavigation = () => {
    router.push("/staff-page/moderation");
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
          />
          <div className="w-full my-4">
            <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
              <Breadcrumb className="text-start font-semibold text-4xl my-5 px-4">
                <Breadcrumb.Item>
                  <button onClick={breadcrumbNavigation}>Course</button>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {course?.name} ({getStatusText(course?.status)})
                </Breadcrumb.Item>
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
                    {course?.name}
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
                      <span className="text-green-500">Create Date: </span>
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
            <div className="mt-5 mx-5">
              <div className="text-3xl my-5">List Of Lectures</div>
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
            <div className="flex justify-end gap-2 mt-10 pr-5">
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
                  <button
                    className="bg-white text-black border rounded-lg border-[#4caf50] hover:bg-[#4caf50] hover:text-white transition duration-300 px-4 py-2"
                    onClick={handleApprove}
                  >
                    Approve
                  </button>
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
                  <button
                    className="bg-white text-black border rounded-lg border-red-500 hover:bg-red-500 hover:text-white transition duration-300 px-6 py-2"
                    onClick={handleBan}
                  >
                    Ban
                  </button>
                </>
              ) : course?.status === 3 ? (
                <button
                  className="bg-white text-black border rounded-lg border-red-500 hover:bg-red-500 hover:text-white transition duration-300 px-6 py-2 mr-5"
                  onClick={handleUnBan}
                >
                  Unban
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>

          <Modal
            title="Content Details"
            open={modalVisible}
            onCancel={handleModalCancel}
            footer={null}
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

          {/* <Dialog
        open={banCourse}
        onClose={handleModalCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{ backgroundColor: "Red", fontSize: "20px", color: "white" }}
        >
          {" "}
          Warning!!!{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Do you want to Ban this Course ?</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalCancel}>cancel</Button>

          <Button
            style={{
              backgroundColor: "#4caf50",
              borderColor: "#4caf50",
              color: "#fff",
            }}
            onClick={() => handleBanCourseClick()}
            type="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog> */}
          {/* <Dialog
        open={rejectCourse}
        onClose={handleModalCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{ backgroundColor: "#ffa04e", fontSize: "20px", color: "white" }}
        >
          {" "}
          Warning!!!{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Do you want to Reject this Course?</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-white text-black border rounded-lg border-blue-400 hover:text-blue-400 transition duration-300 px-4 py-1"
            onClick={handleModalCancel}
          >
            Cancel
          </button>

          <button
            className="bg-white text-black border rounded-lg border-[#ffa04e] hover:bg-[#ffa04e] hover:text-white transition duration-300 px-2 py-1"
            onClick={() => handleRejectCourse()}
          >
            Confirm
          </button>
        </DialogActions>
      </Dialog> */}

          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Reject this Course?
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
        </div>
      )}
    </>
  );
};

export default DetailsContent;
