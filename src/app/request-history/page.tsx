"use client";
import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import InstructorCourseStyle from "./styles/style.module.scss";
import Link from "next/link";
import { Rating } from "@mui/material";
import { http } from "@/api/http";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Rate,
  Select,
  Space,
  Spin,
  Tooltip,
  Upload,
  message,
} from "antd";
import { toast } from "sonner";
import axios from "axios";
import {
  Box,
  Card,
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

interface Major {
  majorId: number;
  majorName: string;
}

interface Specialization {
  specId: number;
  specName: string;
}

interface MentorData {
  specializationOfMentor: {
    description: string;
    id: number;
    verificationDate: string;
    note: string | null;
    status: number;
    specializationId: number;
    mentorId: number;
    mentor: null;
    specialization: null;
  };
  mentor: {
    id: number;
    description: string;
  };
  specialization: {
    id: number;
    name: string;
  };
  verificationDocuments: {
    id: number;
    description: string;
    documentUrl: string;
    specializationOfMentorId: number;
    mentorId: number;
    mentor: null;
  }[];
}

interface verificationDocuments {
  id: number;
  description: string;
  documentUrl: string;
  specializationOfMentorId: number;
  mentorId: number;
  mentor: null;
  documentType: number;
}
[];

const Reviews = () => {
  const { role, userData, jwtToken } = UserAuth();
  // console.log("jwtToken mentor", jwtToken);
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
    if (role === 3) {
      router.push(`/`);
    }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [formDataImage, setFormDataImage] = useState();
  const [image, setImage] = useState<string>();
  const [selectedMajor, setSelectedMajor] = useState<number | null>(null);
  const { Option } = Select;
  const [specialization, setSpecialization] = useState<Specialization[]>([]);
  const [backImage, setBackImage] = useState<string>();
  const [BackData, setBackData] = useState();
  const [major, setMajor] = useState<Major[]>([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedType, setSelectedType] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const [mentor, setMentor] = useState<MentorData[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [largerImageSrc, setLargerImageSrc] = useState<verificationDocuments[]>(
    []
  );
  const [triggerEffect, setTriggerEffect] = useState(false);

  const menuItem = [
    {
      image: "/menu-icon/book-alt.png",
      title: "Courses",
      href: "/instructorcourses",
    },
    {
      image: "/menu-icon/file-edit.png",
      title: "Requests",
      href: "/request-history",
    },
    {
      image: "/menu-icon/feedback-review.png",
      title: "Reviews",
      href: "/review-mentor",
    },

    {
      image: "/menu-icon/receipt.png",
      title: "Transaction History",
      href: "/order-history",
    },
    {
      image: "/menu-icon/money-check-edit.png",
      title: "Statistics",
      href: "/revenue",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
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

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    const fetchMajor = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapifpt.azurewebsites.net/api/major/get-majors-not-request-yet/${userData?.id}`
        );
        setMajor(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchMajor();
  }, []);

  useEffect(() => {
    if (selectedMajor !== null) {
      const fetchSpecializations = async () => {
        try {
          const response = await axios.get(
            `https://learnconnectapifpt.azurewebsites.net/api/specialization-of-mentor/get-specializations-not-request-yet/${userData?.id}/${selectedMajor}`
          );
          setSpecialization(response.data);
        } catch (error) {
          console.error("Error fetching specializations:", error);
        }
      };

      fetchSpecializations();
    }
  }, [selectedMajor]);

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!file) {
      message.warning("Please upload an image!");
      return false;
    }
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      toast.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const fetchData = async () => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
      try {
        const responseData = await http.get<MentorData[]>(
          `https://learnconnectapifpt.azurewebsites.net/api/mentor/specializations-request/${userData?.id}/${selectedType}`
        );
        setMentor(responseData?.data);
        // console.log("mentor", mentor);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedType, triggerEffect]);

  const handleOk = async (data: any) => {
    setIsModalOpen(false);
    const formData = new FormData();
    const { specialization, verificationDocument } = data;
    formData.append("major", data.major || "");
    formData.append("specialization", data.specialization || "");
    formData.append("DescriptionDocument", data.DescriptionDocument);
    formData.append("reason", data.reason);
    if (formDataImage !== undefined) {
      formData.append("verificationDocument", formDataImage);
    }

    try {
      await axios.post(
        `https://learnconnectapifpt.azurewebsites.net/api/mentor/add-specialization-by-mentor?userId=${userData?.id}&specializationId=${specialization}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleCancel();
      setTriggerEffect((prev) => !prev);
      setTimeout(() => {
        toast.success("Submit successful");
      });
    } catch (err) {
      setTimeout(() => {
        toast.error(err.response.data);
      });
    }
  };

  const handleTabClick = (tabName: string, type: string) => {
    if (activeTab !== tabName) {
      setIsLoading(true);
      setMentor([]);
      setActiveTab(tabName);
      setSelectedType(type);
    }
  };

  const getColorByStatus = (status) => {
    switch (status) {
      case 0: // Reject
        return "green";
      case 1: // Pending
        return "black";
      case 2: // Approve
        return "red";
      default:
        return "black";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Approve";
      case 1:
        return "Pending";
      case 2:
        return "Reject";
      default:
        return "";
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

  const openImageModal = (imageUrl) => {
    setLargerImageSrc(imageUrl);
    setIsImageModalOpen(true);
  };

  // Function to close the modal
  const closeImageModal = () => {
    setLargerImageSrc([]);
    setIsImageModalOpen(false);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");

  const showContentModal = (content: any) => {
    setSelectedContent(content);
    setModalVisible(true);
  };

  const handleContentCancel = () => {
    setModalVisible(false);
  };

  // if (!userData) return <Spin size="large" className="flex justify-center" />;

  return (
    <>
      {!userData ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className={`${InstructorCourseStyle.content_wrapper}`}>
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
            <Modal
              destroyOnClose={true}
              title={`Register A New Specialization Form`}
              open={isModalOpen}
              onCancel={handleCancel}
              footer={false}
              width="50%"
            >
              <Form
                autoComplete="off"
                form={form}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
                layout="horizontal"
                className="mt-5"
                style={{ width: "100%" }}
                onFinish={handleOk}
              >
                <Form.Item
                  label="Major"
                  name="major"
                  rules={[
                    { required: true, message: "Please select a major!" },
                  ]}
                  className="text-start"
                  labelAlign="left"
                >
                  <Select onChange={(value) => setSelectedMajor(value)}>
                    {major.map((major) => (
                      <Option key={major.majorId} value={major.majorId}>
                        {major.majorName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  rules={[
                    {
                      required: true,
                      message: "Please select a specialization!",
                    },
                  ]}
                  className="text-start"
                  labelAlign="left"
                >
                  <Select>
                    {specialization.map((specialization) => (
                      <Option
                        key={specialization.specId}
                        value={specialization.specId}
                      >
                        {specialization.specName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  rules={[
                    { required: true, message: "Please input Description" },
                  ]}
                  label="Experience"
                  name="reason"
                  labelAlign="left"
                >
                  <Input.TextArea rows={3} placeholder="Input Experiment" />
                </Form.Item>
                {/* <Form.Item
                  rules={[{ required: true, message: "Please input Document" }]}
                  label="Document"
                  name="DescriptionDocument"
                  labelAlign="left"
                >
                  <Input placeholder="Input Degree, Diploma, Certificate, Qualification" />
                </Form.Item> */}
                <Form.Item
                  label="Image of ID Document"
                  name="verificationDocument"
                  getValueFromEvent={normFile}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Please input image of ID Document",
                    },
                  ]}
                >
                  <Upload
                    accept="image/png, image/jpeg"
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    action="https://learnconnectapifpt.azurewebsites.net/api/Upload/image"
                    listType="picture-card"
                  >
                    Document
                  </Upload>
                </Form.Item>

                <Space className="justify-end w-full">
                  <Form.Item className="mb-0">
                    <Space>
                      <Button onClick={handleCancel}>Cancel</Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ color: "black" }}
                      >
                        Send
                      </Button>
                    </Space>
                  </Form.Item>
                </Space>
              </Form>
            </Modal>
            <div className="w-full">
              <div
                className={`${InstructorCourseStyle.course_tab} bg-[#e7f8ee]`}
              >
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <div className="text-start font-semibold text-2xl my-5 px-4">
                      Request Histories
                    </div>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex justify-center items-center ">
                  <button
                    className=" my-3 px-5 py-3 bg-[#eefbf3] text-[#309255] border-[#309255] border rounded-lg  flex justify-center  hover:bg-[#309255] hover:border-[#309255] hover:text-[#e5ecff] focus:outline-none transition-all duration-300"
                    onClick={showModal}
                  >
                    Register New Specialization
                  </button>
                </div>
              </div>
              <div className="flex justify-center py-4 rounded-md ">
                <ul className="tabs flex space-x-20">
                  <li
                    className={`cursor-pointer rounded-md shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                      activeTab === "tab1"
                        ? "bg-[#309255] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleTabClick("tab1", "1")}
                  >
                    <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                      Pending
                    </button>
                  </li>
                  <li
                    className={`cursor-pointer rounded-md shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                      activeTab === "tab2"
                        ? "bg-[#309255] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleTabClick("tab2", "0")}
                  >
                    <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                      Approve
                    </button>
                  </li>
                  <li
                    className={`cursor-pointer rounded-md shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                      activeTab === "tab3"
                        ? "bg-[#309255] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleTabClick("tab3", "2")}
                  >
                    <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                      Reject
                    </button>
                  </li>
                </ul>
              </div>

              {isLoading ? (
                <div className="text-center text-5xl mt-5">
                  <Spin size="large" />
                </div>
              ) : (
                <div>
                  <div className=" text-[#212832] ">
                    <div className="tab-content">
                      {activeTab === "tab1" && (
                        <div className="min-h-[1000px] w-full">
                          {mentor.length === 0 ? (
                            <div>
                              <div className="text-center text-2xl mt-8 items-center justify-center">
                                <Empty description={false} />
                                don&apos;t have any request.
                              </div>
                            </div>
                          ) : (
                            <Box
                              component="main"
                              sx={{
                                flexGrow: 1,
                              }}
                              className="shadow-[10px_10px_20px_10px_rgba(0,0,0,0.15)] m-5 rounded-lg"
                            >
                              <Card>
                                <Paper sx={{ width: "100%" }}>
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
                                              Date
                                            </TableSortLabel>
                                          </TableCell>
                                          <TableCell className="text-[14px]">
                                            Status
                                          </TableCell>
                                          <TableCell className="text-[14px]">
                                            Specialization
                                          </TableCell>
                                          <TableCell className="w-[600px] text-[14px]">
                                            Experience
                                          </TableCell>
                                          <TableCell className="text-[14px] w-[200px]">
                                            Image of Document
                                          </TableCell>
                                        </TableRow>
                                        {mentor &&
                                          mentor
                                            .slice(
                                              page * rowsPerPage,
                                              page * rowsPerPage + rowsPerPage
                                            )
                                            .map((mentorData) => (
                                              <TableRow
                                                key={
                                                  mentorData
                                                    .specializationOfMentor.id
                                                }
                                              >
                                                <TableCell>
                                                  <div>
                                                    {new Date(
                                                      mentorData.specializationOfMentor.verificationDate
                                                    ).toLocaleDateString()}
                                                  </div>
                                                  <div>
                                                    {new Date(
                                                      mentorData.specializationOfMentor.verificationDate
                                                    ).toLocaleTimeString()}
                                                  </div>
                                                </TableCell>
                                                <TableCell>
                                                  <p
                                                    className="text-[16px]"
                                                    style={{
                                                      color: getColorByStatus(
                                                        mentorData
                                                          .specializationOfMentor
                                                          .status
                                                      ),
                                                    }}
                                                  >
                                                    {getStatusText(
                                                      mentorData
                                                        .specializationOfMentor
                                                        .status
                                                    )}
                                                  </p>
                                                </TableCell>
                                                <TableCell>
                                                  <p className="text-[16px]">
                                                    {" "}
                                                    {
                                                      mentorData.specialization
                                                        .name
                                                    }
                                                  </p>
                                                </TableCell>
                                                <TableCell>
                                                  <p className="ml-2 text-[20px]">
                                                    {mentorData
                                                      .specializationOfMentor
                                                      .description.length >
                                                    200 ? (
                                                      <>
                                                        <a
                                                          type="link"
                                                          onClick={() =>
                                                            showContentModal(
                                                              mentorData
                                                                .specializationOfMentor
                                                                .description
                                                            )
                                                          }
                                                        >
                                                          {`${mentorData.specializationOfMentor.description.slice(
                                                            0,
                                                            200
                                                          )}...`}
                                                        </a>
                                                      </>
                                                    ) : (
                                                      mentorData
                                                        .specializationOfMentor
                                                        .description
                                                    )}
                                                  </p>
                                                </TableCell>
                                                <TableCell>
                                                  <button>
                                                    <img
                                                      src={
                                                        mentorData
                                                          .verificationDocuments[0]
                                                          .documentUrl
                                                      }
                                                      alt="Author"
                                                      className="w-44 h-28 rounded-lg border border-opacity-20 border-[#309255]"
                                                      onClick={() =>
                                                        openImageModal(
                                                          mentorData.verificationDocuments
                                                        )
                                                      }
                                                    />
                                                  </button>
                                                </TableCell>
                                                <Modal
                                                  title="Verification Document"
                                                  visible={isImageModalOpen}
                                                  onCancel={closeImageModal}
                                                  footer={null}
                                                  width={"70%"}
                                                >
                                                  <div className="bg-white p-8 w-full h-full max-w-full max-h-full overflow-auto">
                                                    {largerImageSrc.map(
                                                      (src) => (
                                                        <div key={src.id}>
                                                          <p className="text-xl">
                                                            {src.description}
                                                          </p>
                                                          <img
                                                            src={
                                                              src.documentUrl
                                                            }
                                                            alt="Larger Image"
                                                            className="w-full h-auto max-w-full max-h-full overflow-hidden "
                                                          />
                                                        </div>
                                                      )
                                                    )}
                                                  </div>
                                                </Modal>
                                              </TableRow>
                                            ))}
                                      </TableHead>
                                    </Table>
                                  </TableContainer>
                                  <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={mentor ? mentor.length : 0}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                      handleChangeRowsPerPage
                                    }
                                  />
                                </Paper>
                              </Card>
                            </Box>
                          )}
                        </div>
                      )}
                      {activeTab === "tab2" && (
                        <div className="min-h-[1000px] w-full">
                          {mentor.length === 0 ? (
                            <div>
                              <div className="text-center text-2xl mt-8 items-center justify-center">
                                <Empty description={false} />
                                don&apos;t have any request.
                              </div>
                            </div>
                          ) : (
                            <Box
                              component="main"
                              sx={{
                                flexGrow: 1,
                              }}
                              className="shadow-[10px_10px_20px_10px_rgba(0,0,0,0.15)] m-5 rounded-lg"
                            >
                              <Card>
                                <Paper sx={{ width: "100%" }}>
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
                                              Date
                                            </TableSortLabel>
                                          </TableCell>
                                          <TableCell className="text-[14px]">
                                            Status
                                          </TableCell>
                                          <TableCell className="text-[14px]">
                                            Note
                                          </TableCell>
                                          <TableCell className="text-[14px]">
                                            Specialization
                                          </TableCell>
                                          <TableCell className="w-[600px] text-[14px]">
                                            Experience
                                          </TableCell>
                                          <TableCell className="text-[14px] w-[200px]">
                                            Image of Document
                                          </TableCell>
                                        </TableRow>
                                        {mentor &&
                                          mentor
                                            .slice(
                                              page * rowsPerPage,
                                              page * rowsPerPage + rowsPerPage
                                            )
                                            .map((mentorData) => (
                                              <TableRow
                                                key={
                                                  mentorData
                                                    .specializationOfMentor.id
                                                }
                                              >
                                                <TableCell>
                                                  <div>
                                                    {new Date(
                                                      mentorData.specializationOfMentor.verificationDate
                                                    ).toLocaleDateString()}
                                                  </div>
                                                  <div>
                                                    {new Date(
                                                      mentorData.specializationOfMentor.verificationDate
                                                    ).toLocaleTimeString()}
                                                  </div>
                                                </TableCell>
                                                <TableCell>
                                                  <p
                                                    className="text-[16px]"
                                                    style={{
                                                      color: getColorByStatus(
                                                        mentorData
                                                          .specializationOfMentor
                                                          .status
                                                      ),
                                                    }}
                                                  >
                                                    {getStatusText(
                                                      mentorData
                                                        .specializationOfMentor
                                                        .status
                                                    )}
                                                  </p>
                                                </TableCell>
                                                <TableCell>
                                                  <p className="text-[16px]">
                                                    {
                                                      mentorData
                                                        .specializationOfMentor
                                                        .note
                                                    }
                                                  </p>
                                                </TableCell>
                                                <TableCell>
                                                  <p className="text-[16px]">
                                                    {" "}
                                                    {
                                                      mentorData.specialization
                                                        .name
                                                    }
                                                  </p>
                                                </TableCell>
                                                <TableCell>
                                                  <p className="ml-2 text-[20px]">
                                                    {mentorData
                                                      .specializationOfMentor
                                                      .description.length >
                                                    200 ? (
                                                      <>
                                                        <a
                                                          type="link"
                                                          onClick={() =>
                                                            showContentModal(
                                                              mentorData
                                                                .specializationOfMentor
                                                                .description
                                                            )
                                                          }
                                                        >
                                                          {`${mentorData.specializationOfMentor.description.slice(
                                                            0,
                                                            200
                                                          )}...`}
                                                        </a>
                                                      </>
                                                    ) : (
                                                      mentorData
                                                        .specializationOfMentor
                                                        .description
                                                    )}
                                                  </p>
                                                </TableCell>
                                                <TableCell>
                                                  <button>
                                                    <img
                                                      src={
                                                        mentorData
                                                          .verificationDocuments[0]
                                                          .documentUrl
                                                      }
                                                      alt="Author"
                                                      className="w-44 h-28 rounded-lg border border-opacity-20 border-[#309255]"
                                                      onClick={() =>
                                                        openImageModal(
                                                          mentorData.verificationDocuments
                                                        )
                                                      }
                                                    />
                                                  </button>
                                                </TableCell>
                                                <Modal
                                                  title="Verification Document"
                                                  visible={isImageModalOpen}
                                                  onCancel={closeImageModal}
                                                  footer={null}
                                                  width={
                                                    largerImageSrc.length > 1
                                                      ? "90%"
                                                      : "70%"
                                                  }
                                                >
                                                  <div
                                                    className={`bg-white p-8 w-full h-full max-w-full max-h-full overflow-auto ${
                                                      largerImageSrc.length > 1
                                                        ? "grid grid-cols-2 gap-4 justify-center items-center mx-auto"
                                                        : ""
                                                    }`}
                                                  >
                                                    {largerImageSrc.map(
                                                      (src) => (
                                                        <div
                                                          key={src.id}
                                                          className={`${
                                                            largerImageSrc.length >
                                                            1
                                                              ? ""
                                                              : ""
                                                          }`}
                                                        >
                                                          <p className="text-xl">
                                                            {src.description}
                                                          </p>
                                                          <img
                                                            src={
                                                              src.documentUrl
                                                            }
                                                            alt="Larger Image"
                                                            className={`w-full ${
                                                              largerImageSrc.length >
                                                              1
                                                                ? "h-[500px]"
                                                                : "h-auto"
                                                            } max-w-full max-h-full overflow-hidden my-5 rounded-lg`}
                                                          />
                                                        </div>
                                                      )
                                                    )}
                                                  </div>
                                                </Modal>
                                              </TableRow>
                                            ))}
                                      </TableHead>
                                    </Table>
                                  </TableContainer>
                                  <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={mentor ? mentor.length : 0}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                      handleChangeRowsPerPage
                                    }
                                  />
                                </Paper>
                              </Card>
                            </Box>
                          )}
                        </div>
                      )}
                      {activeTab === "tab3" && (
                        <div className="min-h-[1000px] w-full">
                          {mentor.length === 0 ? (
                            <div>
                              <div className="text-center text-2xl mt-8 items-center justify-center">
                                <Empty description={false} />
                                Don&apos;t have any request.
                              </div>
                            </div>
                          ) : (
                            <Box
                              component="main"
                              sx={{
                                flexGrow: 1,
                              }}
                              className="shadow-[10px_10px_20px_10px_rgba(0,0,0,0.15)] m-5 rounded-lg"
                            >
                              <Card>
                                <Paper sx={{ width: "100%" }}>
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
                                              Date
                                            </TableSortLabel>
                                          </TableCell>
                                          <TableCell className="text-[14px]">
                                            Status
                                          </TableCell>
                                          <TableCell className="text-[14px]">
                                            Reject Reason
                                          </TableCell>
                                          <TableCell className="text-[14px]">
                                            Specialization
                                          </TableCell>
                                          <TableCell className="w-[600px] text-[14px]">
                                            Experience
                                          </TableCell>
                                          <TableCell className="text-[14px] w-[200px]">
                                            Image of Document
                                          </TableCell>
                                        </TableRow>
                                        {mentor &&
                                          mentor
                                            .slice(
                                              page * rowsPerPage,
                                              page * rowsPerPage + rowsPerPage
                                            )
                                            .map((mentorData) => (
                                              <TableRow
                                                key={
                                                  mentorData
                                                    .specializationOfMentor.id
                                                }
                                              >
                                                <TableCell>
                                                  <div>
                                                    {new Date(
                                                      mentorData.specializationOfMentor.verificationDate
                                                    ).toLocaleDateString()}
                                                  </div>
                                                  <div>
                                                    {new Date(
                                                      mentorData.specializationOfMentor.verificationDate
                                                    ).toLocaleTimeString()}
                                                  </div>
                                                </TableCell>
                                                <TableCell>
                                                  <p
                                                    className="text-[16px]"
                                                    style={{
                                                      color: getColorByStatus(
                                                        mentorData
                                                          .specializationOfMentor
                                                          .status
                                                      ),
                                                    }}
                                                  >
                                                    {getStatusText(
                                                      mentorData
                                                        .specializationOfMentor
                                                        .status
                                                    )}
                                                  </p>
                                                </TableCell>
                                                <TableCell>
                                                  <p className="text-[16px]">
                                                    {
                                                      mentorData
                                                        .specializationOfMentor
                                                        .note
                                                    }
                                                  </p>
                                                </TableCell>
                                                <TableCell>
                                                  <p className="text-[16px]">
                                                    {" "}
                                                    {
                                                      mentorData.specialization
                                                        .name
                                                    }
                                                  </p>
                                                </TableCell>
                                                <TableCell>
                                                  <p className="ml-2 text-[20px]">
                                                    {mentorData
                                                      .specializationOfMentor
                                                      .description.length >
                                                    200 ? (
                                                      <>
                                                        <a
                                                          type="link"
                                                          onClick={() =>
                                                            showContentModal(
                                                              mentorData
                                                                .specializationOfMentor
                                                                .description
                                                            )
                                                          }
                                                        >
                                                          {`${mentorData.specializationOfMentor.description.slice(
                                                            0,
                                                            200
                                                          )}...`}
                                                        </a>
                                                      </>
                                                    ) : (
                                                      mentorData
                                                        .specializationOfMentor
                                                        .description
                                                    )}
                                                  </p>
                                                </TableCell>
                                                <TableCell>
                                                  <button>
                                                    <img
                                                      src={
                                                        mentorData
                                                          .verificationDocuments[0]
                                                          .documentUrl
                                                      }
                                                      alt="Author"
                                                      className="w-44 h-28 rounded-lg border border-opacity-20 border-[#309255]"
                                                      onClick={() =>
                                                        openImageModal(
                                                          mentorData.verificationDocuments
                                                        )
                                                      }
                                                    />
                                                  </button>
                                                </TableCell>
                                                <Modal
                                                  title="Verification Document"
                                                  visible={isImageModalOpen}
                                                  onCancel={closeImageModal}
                                                  footer={null}
                                                  width={"70%"}
                                                >
                                                  <div className="bg-white p-8 w-full h-full max-w-full max-h-full overflow-auto">
                                                    {/* Adjust the styles of the image container */}
                                                    {largerImageSrc.map(
                                                      (src) => (
                                                        <div key={src.id}>
                                                          <p className="text-xl">
                                                            {src.description}
                                                          </p>
                                                          <img
                                                            src={
                                                              src.documentUrl
                                                            }
                                                            alt="Larger Image"
                                                            className="w-full h-auto max-w-full max-h-full overflow-hidden my-5 rounded-lg"
                                                          />
                                                        </div>
                                                      )
                                                    )}
                                                  </div>
                                                </Modal>
                                              </TableRow>
                                            ))}
                                      </TableHead>
                                    </Table>
                                  </TableContainer>
                                  <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={mentor ? mentor.length : 0}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                      handleChangeRowsPerPage
                                    }
                                  />
                                </Paper>
                              </Card>
                            </Box>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Modal
              title="Details"
              open={modalVisible}
              onCancel={handleContentCancel}
              footer={null}
              style={{
                top: "30%",
              }}
            >
              <p>{selectedContent}</p>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default Reviews;
