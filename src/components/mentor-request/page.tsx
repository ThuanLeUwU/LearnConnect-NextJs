"use client";
import React, { useState, useEffect } from "react";
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
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import InstructorCourseStyle from "./styles.module.scss";
import { toast } from "sonner";
import { Spin } from "antd";
import LeftNavbar from "@/components/left-navbar/page";
import { UserAuth } from "@/app/context/AuthContext";

export type specializationOfMentor = {
  name: string;
  id: number;
  verificationDate: string;
  note: string | null;
  status: number;
  specializationId: number;
  mentorId: number;
};

export type User = {
  id: string | number;
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

export type specialization = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
};

export type VerificationDocument = {
  id: number;
  description: string;
  documentUrl: string;
  specializationOfMentorId: number;
};

export type ApiData = {
  specializationOfMentor: specializationOfMentor;
  user: User;
  mentor: Mentor;
  specialization: specializationOfMentor;
  verificationDocuments: VerificationDocument[];
}[];

const MentorRequest = () => {
  const [requestData, setRequestData] = useState<ApiData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("verificationDate");
  const { userData, jwtToken } = UserAuth();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<
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

  console.log("token Staff:", jwtToken);
  const handleViewMoreClick = (documents: VerificationDocument[]) => {
    setSelectedDocuments(documents);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://learnconnectapitest.azurewebsites.net/api/user/all-specialization-of-mentor-details",
        {
          params: {
            page: page + 1,
            rowsPerPage,
          },
        }
      );
      setRequestData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = (mentorUserId: number, specializationId: number) => {
    setConfirmationData({
      isOpen: true,
      actionType: "approve",
      mentorUserId,
      specializationId,
    });
  };

  const handleReject = (mentorUserId: number, specializationId: number) => {
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
      const reason = rejectReason || "Your request is Approve";
      await axios.post(
        `https://learnconnectapitest.azurewebsites.net/api/mentor/process-mentor-request?staffUserId=${userData?.id}&mentorUserId=${mentorUserId}&specializationId=${specializationId}&acceptRequest=true&rejectReason=${reason}`
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
        `https://learnconnectapitest.azurewebsites.net/api/mentor/process-mentor-request?staffUserId=${userData?.id}&mentorUserId=${mentorUserId}&specializationId=${specializationId}&acceptRequest=false&rejectReason=${reason}`
      );
      fetchData();
      toast.success("Mentor request rejected successfully");
    } catch (error) {
      toast.error("Failed to reject mentor request");
      console.error("Error rejecting mentor request:", error.message || error);
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

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const startIndex = page * rowsPerPage + 1;
  const endIndex = Math.min(
    (page + 1) * rowsPerPage,
    (requestData && requestData.length) || 0
  );

  function stableSort(
    data: ApiData,
    comparator: (a: any, b: any) => number
  ): ApiData {
    return data.slice().sort(comparator);
  }

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

  return (
    <>
      <div className="min-h-[1000px] w-full">
        <Typography variant="h3" className="px-3">
          Become mentor request
        </Typography>
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
                      <TableRow>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "verificationDate"}
                            direction={
                              orderBy === "verificationDate" ? order : "asc"
                            }
                            onClick={() =>
                              handleRequestSort("verificationDate")
                            }
                            className="w-[110px]"
                          >
                            Create Date
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell className="w-[600px]">Description</TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "specialization.name"}
                            direction={
                              orderBy === "specialization.name" ? order : "asc"
                            }
                            onClick={() =>
                              handleRequestSort("specialization.name")
                            }
                          >
                            Specialization
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell className="w-[400px]">Note</TableCell>
                        <TableCell align="center">Verification</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                      {requestData &&
                        stableSort(requestData, getComparator(order, orderBy))
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((data) => (
                            <TableRow key={data.specializationOfMentor.id}>
                              <TableCell>
                                <div>
                                  {new Date(
                                    data.specializationOfMentor.verificationDate
                                  ).toLocaleDateString()}
                                </div>
                                <div>
                                  {new Date(
                                    data.specializationOfMentor.verificationDate
                                  ).toLocaleTimeString()}
                                </div>
                              </TableCell>
                              <TableCell>{data.user.fullName}</TableCell>
                              <TableCell>{data.user.email}</TableCell>

                              <TableCell size="small">
                                {data.mentor.description}
                              </TableCell>
                              <TableCell>{data.specialization.name}</TableCell>
                              <TableCell
                                style={{
                                  color: getStatusColor(
                                    data.specializationOfMentor.status
                                  ),
                                }}
                              >
                                {getStatusText(
                                  data.specializationOfMentor.status
                                )}
                              </TableCell>
                              <TableCell>
                                {data.specializationOfMentor.note}
                              </TableCell>
                              <TableCell>
                                <Button
                                  onClick={() =>
                                    handleViewMoreClick(
                                      data.verificationDocuments
                                    )
                                  }
                                >
                                  View
                                </Button>
                              </TableCell>

                              <TableCell>
                                {data.specializationOfMentor.status !== 0 && (
                                  <div className="flex flex-col gap-[10px]">
                                    {data.specializationOfMentor.status !==
                                      2 && (
                                      <Button
                                        className="w-full my-1 bg-green-500 text-white"
                                        color="success"
                                        variant="contained"
                                        onClick={() =>
                                          handleApprove(
                                            data.mentor.userId,
                                            data.specializationOfMentor
                                              .specializationId
                                          )
                                        }
                                      >
                                        Approve
                                      </Button>
                                    )}
                                    {data.specializationOfMentor.status !==
                                      2 && (
                                      <Button
                                        variant="contained"
                                        color="error"
                                        className="w-full my-1 bg-red-500 text-white"
                                        onClick={() =>
                                          handleReject(
                                            data.mentor.userId,
                                            data.specializationOfMentor
                                              .specializationId
                                          )
                                        }
                                      >
                                        Reject
                                      </Button>
                                    )}
                                  </div>
                                )}
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
                count={requestData ? requestData.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Card>
        </Box>
        <Box mt={2} ml={2}>
          <Typography variant="caption" color="textSecondary">
            Showing {startIndex} - {endIndex} of{" "}
            {requestData ? requestData.length : 0} items
          </Typography>
        </Box>
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
            {selectedDocuments.length === 0 ? (
              <Typography variant="subtitle1" textAlign="center">
                No information available
              </Typography>
            ) : (
              <>
                {selectedDocuments.map((doc) => (
                  <Paper key={doc.id} sx={{ flex: "0 0 30%", p: 2 }}>
                    <Typography variant="subtitle1">
                      {doc.description}
                    </Typography>
                    <img
                      src={doc.documentUrl}
                      alt={doc.description}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                  </Paper>
                ))}
                <Box textAlign="right" width="100%">
                  <Button onClick={handleCloseModal} color="primary">
                    Close
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
        <Modal
          open={confirmationData.isOpen}
          onClose={() =>
            setConfirmationData({
              isOpen: false,
              actionType: "",
              mentorUserId: null,
              specializationId: null,
            })
          }
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Confirm{" "}
                {confirmationData.actionType === "approve"
                  ? "Approval"
                  : "Rejection"}
                ?
              </h2>
              {confirmationData.actionType === "reject" && (
                <div className="mb-4">
                  <label
                    htmlFor="rejectReason"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Note:
                  </label>
                  <input
                    type="text"
                    id="rejectReason"
                    name="rejectReason"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
              )}
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    if (confirmationData.actionType === "approve") {
                      handleApproveConfirmation(
                        confirmationData.mentorUserId,
                        noteInput,
                        confirmationData.specializationId
                      );
                    } else {
                      handleRejectConfirmation(
                        confirmationData.mentorUserId,
                        noteInput,
                        confirmationData.specializationId
                      );
                    }
                    setConfirmationData({
                      isOpen: false,
                      actionType: "",
                      mentorUserId: null,
                      specializationId: null,
                    });
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={() =>
                    setConfirmationData({
                      isOpen: false,
                      actionType: "",
                      mentorUserId: null,
                      specializationId: null,
                    })
                  }
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MentorRequest;
