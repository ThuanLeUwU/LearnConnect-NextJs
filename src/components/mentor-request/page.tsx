"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  Table,
  Space,
  Modal as ModalAntd,
  Form,
  Button as ButtonAntd,
  Breadcrumb,
  Input,
} from "antd";

import Button from "@mui/material/Button";
import { toast } from "sonner";
import { Spin } from "antd";
import { UserAuth } from "@/app/context/AuthContext";

export type specializationOfMentor = {
  name: string;
  id: number;
  verificationDate: string;
  note: string | null;
  status: number;
  specializationId: number;
  mentorId: number;
  description: string;
};

export type User = {
  name: string;
  id: number;
  email: string;
  fullName: string;
};

export type Mentor = {
  id: number;
  description: string;
  averageRating: number | null;
  accountNumber: number;
  bankName: string;
  status: number;
  userId: number;
};

export type Specialization = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  majorId: number;
};

export type VerificationDocument = {
  id: number;
  description: string;
  documentUrl: string;
  specializationOfMentorId: number;
};

export type ApiData = {
  specializationOfMentor: specializationOfMentor;
  user: any;
  mentor: any;
  specialization: any;
  verificationDocuments: any;
  specializationDocuments: any;
}[];

const MentorRequest = () => {
  const [requestData, setRequestData] = useState<ApiData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("verificationDate");
  const { userData, jwtToken } = UserAuth();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedType, setSelectedType] = useState("mentor");
  const [form] = Form.useForm();
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState<
    VerificationDocument[]
  >([]);
  const [selectedDocuments2, setSelectedDocuments2] = useState<
    VerificationDocument[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    isOpen: boolean;
    actionType: string;
    mentorUserId: number | null;
    specializationId: number | null;
  }>({
    isOpen: false,
    actionType: "",
    mentorUserId: null,
    specializationId: null,
  });
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const [noteInput, setNoteInput] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Số dòng mỗi trang
  });
  const [rejectReason, setRejectReason] = useState("");

  console.log("token Staff:", jwtToken);

  const handleViewMoreClick = (
    verify: VerificationDocument[],
    specialization: VerificationDocument[],
    description: string
  ) => {
    specialization[0].description = description;
    setSelectedDocuments(verify);
    setIsModalOpen(true);
    setSelectedDocuments2(specialization);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://learnconnectserver.azurewebsites.net/api/specialization-of-mentor/get-all-specializations-and-mentors?requestType=${selectedType}`,
        {
          params: {
            page: page + 1,
            rowsPerPage,
          },
        }
      );
      setRequestData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, selectedType, userData]);

  const handleApprove = (mentorUserId: number, specializationId: number) => {
    setConfirmationModalOpen(true);
    setAction("approve");
    setConfirmationData({
      isOpen: true,
      actionType: "approve",
      mentorUserId,
      specializationId,
    });
  };

  const handleReject = (mentorUserId: number, specializationId: number) => {
    setConfirmationModalOpen(true);
    setAction("reject");
    setConfirmationData({
      isOpen: true,
      actionType: "reject",
      mentorUserId,
      specializationId,
    });
  };

  const handleApproveConfirmation = async (
    mentorUserId: number | null,
    rejectReason: string,
    specializationId: number | null
  ) => {
    try {
      const reason = rejectReason || "Your request is Approved";
      await axios.post(
        `https://learnconnectserver.azurewebsites.net/api/mentor/process-mentor-request?staffUserId=${userData?.id}&mentorUserId=${mentorUserId}&specializationId=${specializationId}&acceptRequest=true&rejectReason=${reason}`
      );
      fetchData();
      toast.success("Mentor request approved successfully");
    } catch (error) {
      toast.error("Failed to approve mentor request");
      console.error("Error approving mentor request:", error.message || error);
    }
  };

  const handleRejectConfirmation = async (
    mentorUserId: number | null,
    rejectReason: string,
    specializationId: number | null
  ) => {
    try {
      const reason = rejectReason || "Your request is Not Approve";
      await axios.post(
        `https://learnconnectserver.azurewebsites.net/api/mentor/process-mentor-request?staffUserId=${userData?.id}&mentorUserId=${mentorUserId}&specializationId=${specializationId}&acceptRequest=false&rejectReason=${reason}`
      );
      fetchData();
      toast.success("Mentor request rejected successfully");
    } catch (error) {
      toast.error(error.response.data);
      console.error("Error rejecting mentor request:", error.message || error);
    }
  };

  const handlePageChange = (current, pageSize) => {
    setPagination({ current, pageSize });
  };

  function getStatusColor(status) {
    switch (status) {
      case 0:
        return "green";
      case 1:
        return "black";
      case 2:
        return "red";
      default:
        return "black";
    }
  }

  function getStatusText(status) {
    switch (status) {
      case 0:
        return "Approved";
      case 1:
        return "Pending";
      case 2:
        return "Reject";
      default:
        return "Unknown Status";
    }
  }

  const handleTabClick = (tabName: string, type: string) => {
    setActiveTab(tabName);
    setSelectedType(type);
    setPage(0);
  };

  const handleCancelBan = () => {
    setConfirmationModalOpen(false);
    form.resetFields();
    setConfirmationData({
      isOpen: false,
      actionType: "",
      mentorUserId: null,
      specializationId: null,
    });
  };

  const handleConfirmBan = async (rejectReason) => {
    if (confirmationData.actionType === "approve") {
      handleApproveConfirmation(
        confirmationData.mentorUserId,
        noteInput,
        confirmationData.specializationId
      );
    } else {
      handleRejectConfirmation(
        confirmationData.mentorUserId,
        rejectReason, // Pass reject reason to the function
        confirmationData.specializationId
      );
    }
    setConfirmationData({
      isOpen: false,
      actionType: "",
      mentorUserId: null,
      specializationId: null,
    });
    setConfirmationModalOpen(false);
  };

  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate || "";
  }

  const columns = [
    {
      title: "Create Date",
      dataIndex: "specializationOfMentor",
      key: "verificationDate",
      width: 150,
      sorter: (a, b) => {
        const dateA = new Date(
          a.specializationOfMentor.verificationDate
        ).getTime();
        const dateB = new Date(
          b.specializationOfMentor.verificationDate
        ).getTime();
        return dateA - dateB;
      },
      render: (specializationOfMentor, record) => (
        <div className="text-[16px]">
          {new Date(
            specializationOfMentor.verificationDate
          ).toLocaleDateString()}{" "}
          <br />
          {new Date(
            specializationOfMentor.verificationDate
          ).toLocaleTimeString()}
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "user",
      key: "name",
      width: 200,
      sorter: (a, b) => {
        const nameA = a.user.name.toUpperCase();
        const nameB = b.user.name.toUpperCase();
        return nameA.localeCompare(nameB);
      },
      render: (user) => <p className="text-[16px]">{user.name}</p>,
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "email",
      sorter: (a, b) => {
        const emailA = a.user.email.toUpperCase();
        const emailB = b.user.email.toUpperCase();
        return emailA.localeCompare(emailB);
      },
      render: (user) => <p className="text-[16px]">{user.email}</p>,
    },
    {
      title: selectedType === "mentor" ? "Description" : "Experience",
      dataIndex:
        selectedType === "mentor" ? "mentor" : "specializationOfMentor",
      key: "description",
      width: 600,
      // sorter: (a, b) => {
      //   const descriptionA = a.mentor.description.toUpperCase();
      //   const descriptionB = b.mentor.description.toUpperCase();
      //   return descriptionA.localeCompare(descriptionB);
      // },
      render: (text, record) => (
        <>
          {text.description.length > 50 ? (
            <>
              <a type="link" onClick={() => showContentModal(text.description)}>
                {`${text.description.slice(0, 50)}...`}
              </a>
            </>
          ) : (
            text.description
          )}
        </>
      ),
      // render: (mentor) => <p className="text-[16px]">{mentor.description}</p>,
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
      sorter: (a, b) => {
        const specializationA = a.specialization.name.toUpperCase();
        const specializationB = b.specialization.name.toUpperCase();
        return specializationA.localeCompare(specializationB);
      },
      render: (specialization) => (
        <p className="text-[16px]">{specialization.name}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "specializationOfMentor",
      key: "status",
      sorter: (a, b) =>
        a.specializationOfMentor.status - b.specializationOfMentor.status,

      render: (specializationOfMentor) => (
        <span
          className="text-[16px]"
          style={{ color: getStatusColor(specializationOfMentor.status) }}
        >
          {getStatusText(specializationOfMentor.status)}
        </span>
      ),
    },
    {
      title: "Note",
      dataIndex: "specializationOfMentor",
      key: "note",
      // sorter: (a, b) => {
      //   const noteA = (a.specializationOfMentor.note || "").toUpperCase();
      //   const noteB = (b.specializationOfMentor.note || "").toUpperCase();
      //   return noteA.localeCompare(noteB);
      // },
      render: (specializationOfMentor) => (
        <p className="text-[16px]">{specializationOfMentor.note}</p>
      ),
    },
    {
      title: "Verification",
      key: "verification",
      render: (text, record) => (
        <Button
          onClick={() =>
            handleViewMoreClick(
              record.verificationDocuments,
              record.specializationDocuments,
              record.specializationOfMentor.description
            )
          }
        >
          View
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space direction="vertical">
          {record.specializationOfMentor.status !== 0 && (
            <>
              {record.specializationOfMentor.status !== 2 && (
                <button
                  className="border-2 px-2 py-1 text-sm rounded-md w-24 hover:border-[#309255] hover:text-white hover:bg-[#59b77d]"
                  onClick={() =>
                    handleApprove(record.user.id, record.specialization.id)
                  }
                >
                  Approve
                </button>
              )}
              {record.specializationOfMentor.status !== 2 && (
                <button
                  className="border-2 px-2 py-1 text-sm rounded-md w-24 hover:border-[#f33404] hover:text-white hover:bg-[#f33404b7]"
                  onClick={() =>
                    handleReject(record.user.id, record.specialization.id)
                  }
                >
                  Reject
                </button>
              )}
            </>
          )}
        </Space>
      ),
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");

  const showContentModal = (content: any) => {
    setSelectedContent(content);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="w-full mt-4">
        <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
          <Breadcrumb>
            <Breadcrumb.Item>
              <div className="text-start font-semibold text-2xl my-5 px-4">
                Requests
              </div>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="flex justify-center py-4 rounded-md">
          <ul className="tabs flex space-x-5">
            <li
              className={`cursor-pointer rounded-md shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                activeTab === "tab1" ? "bg-[#309255] text-white" : "bg-white"
              }`}
              onClick={() => handleTabClick("tab1", "mentor")}
            >
              <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                Mentor
              </button>
            </li>
            <li
              className={`cursor-pointer rounded-md shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                activeTab === "tab2" ? "bg-[#309255] text-white" : "bg-white"
              }`}
              onClick={() => handleTabClick("tab2", "specialization")}
            >
              <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                Specialization
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content">
          {activeTab === "tab1" && (
            <div className="min-h-[1000px] w-full">
              <Table
                dataSource={requestData}
                columns={columns}
                pagination={{ ...pagination, onChange: handlePageChange }}
                loading={isLoading}
                className="mx-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg"
              />
              <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50vw",
                    minHeight: 380,
                    p: 4,
                    bgcolor: "white",
                    borderRadius: 8,
                  }}
                >
                  {selectedDocuments.length === 0 ? (
                    <Typography variant="subtitle1" textAlign="center">
                      No information available
                    </Typography>
                  ) : (
                    <div className="">
                      <div className="scrollable-container max-h-[750px] overflow-y-auto mx-5">
                        {selectedDocuments.map((doc, index) => (
                          <div className="pt-5" key={doc.id}>
                            {index === 0 && (
                              <div className="flex">
                                <p className="text-xl">
                                  Identify Number: {doc.description}
                                </p>
                              </div>
                            )}
                            {index === 1 && (
                              <div className="flex">
                                <p className="text-xl">
                                  Issue Date: {formatDate(doc.description)}
                                </p>
                                <p className="text-xl font-bold"></p>
                              </div>
                            )}
                            <img
                              src={doc.documentUrl}
                              alt={doc.description}
                              className="w-full h-auto rounded-lg"
                            />
                          </div>
                        ))}
                        {selectedDocuments2.map((doc) => (
                          <div className="pt-5" key={doc.id}>
                            {
                              <div className="flex">
                                <p className="text-xl">
                                  Experience: {doc.description}
                                </p>
                                <p className="text-xl font-bold"></p>
                                {/* <p className="text-xl font-bold">
                                  {formatDate(doc.description)}
                                </p> */}
                              </div>
                            }
                            <img
                              src={doc.documentUrl}
                              alt={doc.description}
                              className="w-full h-auto rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                      {/* Close button */}
                      <Box textAlign="right" width="100%">
                        <Button onClick={handleCloseModal} color="primary">
                          Close
                        </Button>
                      </Box>
                    </div>
                  )}
                </Box>
              </Modal>
              <ModalAntd
                destroyOnClose={true}
                title={
                  <div className="text-lg">
                    Are you sure you want to {action} this mentor ?
                  </div>
                }
                open={isConfirmationModalOpen}
                width="35%"
                onCancel={handleCancelBan}
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
                  onFinish={(values) => handleConfirmBan(values.rejectReason)}
                >
                  <Form.Item
                    label="Reason"
                    name="rejectReason"
                    rules={[
                      {
                        required: false,
                        message: "Please provide a reason!",
                      },
                    ]}
                  >
                    <Input.TextArea placeholder="Enter reason..." rows={4} />
                  </Form.Item>
                  <Space className="justify-end w-full">
                    <Form.Item className="mb-0">
                      <Space>
                        <ButtonAntd
                          className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                          onClick={handleCancelBan}
                          style={{
                            border: "2px solid #E0E0E0",
                            color: "black",
                          }}
                        >
                          Cancel
                        </ButtonAntd>
                        <ButtonAntd
                          className="hover:bg-[#67b46a] border border-[#4caf50] bg-[#4caf50] text-white transition duration-300 px-2 py-1"
                          htmlType="submit"
                          style={{
                            border: "2px solid #4caf50",
                            color: "#fff",
                          }}
                        >
                          Confirm
                        </ButtonAntd>
                      </Space>
                    </Form.Item>
                  </Space>
                </Form>
              </ModalAntd>
            </div>
          )}
          {activeTab === "tab2" && (
            <div className="min-h-[1000px] w-full">
              <Table
                dataSource={requestData}
                columns={columns}
                pagination={{ ...pagination, onChange: handlePageChange }}
                loading={isLoading}
                className="mx-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg"
              />
              <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "70vw",
                    minHeight: 380,
                    p: 4,
                    bgcolor: "white",
                    borderRadius: 8,
                  }}
                >
                  {selectedDocuments2.length === 0 ? (
                    <Typography variant="subtitle1" textAlign="center">
                      No information available
                    </Typography>
                  ) : (
                    <div className="scrollable-container w-full">
                      <div className="w-full">
                        {selectedDocuments2.map((doc) => (
                          <div
                            key={doc.id}
                            className="w-full mx-auto overflow-hidden p-8"
                          >
                            {/* <p className="text-xl mb-5">
                              Specialization: {doc.description}
                            </p> */}
                            <div className="max-h-[600px] overflow-y-auto">
                              <img
                                src={doc.documentUrl}
                                alt="SpecializationImage"
                                className="w-full h-auto rounded-lg m-auto"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <Box textAlign="right" width="100%">
                        <Button onClick={handleCloseModal} color="primary">
                          Close
                        </Button>
                      </Box>
                    </div>
                  )}
                </Box>
              </Modal>
              <ModalAntd
                destroyOnClose={true}
                title={
                  <div className="text-lg">
                    Do you want to perform {action} action?
                  </div>
                }
                open={isConfirmationModalOpen}
                width="35%"
                onCancel={handleCancelBan}
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
                  onFinish={(values) => handleConfirmBan(values.rejectReason)}
                >
                  <Form.Item
                    label="Reason"
                    name="rejectReason"
                    rules={[
                      {
                        required: false,
                        message: "Please provide a reason!",
                      },
                    ]}
                  >
                    <Input.TextArea placeholder="Enter reason..." rows={4} />
                  </Form.Item>
                  <Space className="justify-end w-full">
                    <Form.Item className="mb-0">
                      <Space>
                        <ButtonAntd
                          className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                          onClick={handleCancelBan}
                          style={{
                            border: "2px solid #E0E0E0",
                            color: "black",
                          }}
                        >
                          Cancel
                        </ButtonAntd>
                        <ButtonAntd
                          className="hover:bg-[#67b46a] border border-[#4caf50] bg-[#4caf50] text-white transition duration-300 px-2 py-1"
                          htmlType="submit"
                          style={{
                            border: "2px solid #4caf50",
                            color: "#fff",
                          }}
                        >
                          Confirm
                        </ButtonAntd>
                      </Space>
                    </Form.Item>
                  </Space>
                </Form>
              </ModalAntd>
            </div>
          )}
        </div>
        <ModalAntd
          title="Details"
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <p>{selectedContent}</p>
        </ModalAntd>
      </div>
    </>
  );
};

export default MentorRequest;
