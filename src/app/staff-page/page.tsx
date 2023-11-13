"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
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

export type CourseCategory = {
  id: number;
  verificationDate: string;
  rejectReason: string | null;
  status: number;
  categoryId: number;
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

export type Category = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
};

export type VerificationDocument = {
  id: number;
  description: string;
  documentUrl: string;
  courseCategoryOfMentorId: number;
};

export type ApiData = {
  courseCategoryOfMentor: CourseCategory;
  user: User;
  mentor: Mentor;
  category: Category;
  verificationDocuments: VerificationDocument[];
}[];

const Transaction = () => {
  const [requestData, setRequestData] = useState<ApiData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("verificationDate");
  const { jwtToken }: { jwtToken: string } = UserAuth();
  const { userData } = UserAuth();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [selectedDocuments, setSelectedDocuments] = useState<
    VerificationDocument[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  console.log("id Staff:", userData?.id);
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
        "https://learnconnectapitest.azurewebsites.net/api/user/all-course-category-of-mentor-details",
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
  }, [page, rowsPerPage]);

  const handleApprove = async (mentorUserId: number) => {
    try {
      await axios.post(
        `https://learnconnectapitest.azurewebsites.net/api/mentor/process-mentor-request?staffUserId=${userData?.id}&mentorUserId=${mentorUserId}&acceptRequest=true`
      );
      fetchData();
      toast.success("Mentor request approved successfully");
    } catch (error) {
      toast.error("Failed to approve mentor request");
      console.error("Error approving mentor request:", error.message || error);
    }
  };

  const handleReject = async (mentorUserId: number) => {
    try {
      await axios.post(
        `https://learnconnectapitest.azurewebsites.net/api/mentor/process-mentor-request?staffUserId=${userData?.id}&mentorUserId=${mentorUserId}&acceptRequest=false`
      );
      fetchData();
      toast.success("Mentor request rejected successfully");
    } catch (error) {
      toast.error("Failed to rejected mentor request");
      console.error("Error rejecting mentor request:", error.message || error);
    }
  };

  const renderVerificationDocuments = (documents: VerificationDocument[]) => {
    return documents.map((doc) => (
      <div key={doc.id}>
        <p>{doc.description}</p>
        <img src={doc.documentUrl} alt={doc.description} />
      </div>
    ));
  };

  const menuItem = [
    {
      image: "/menu-icon/icon-1.png",
      href: "#",
    },
    {
      image: "/menu-icon/icon-2.png",
      href: "#",
    },
    {
      image: "/menu-icon/icon-3.png",
      href: "#",
    },
    {
      image: "/menu-icon/icon-4.png",
      href: "#",
    },
  ];

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
      <div className={`${InstructorCourseStyle.content_wrapper}`}>
        <div className={`${InstructorCourseStyle.sidebar_wrapper}`}>
          <div className={`${InstructorCourseStyle.sidebar_list}`}>
            {menuItem.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`${InstructorCourseStyle.sidebar_active}`}
              >
                <img src={item.image} alt={`icon-${index + 1}`} />
              </Link>
            ))}
          </div>
        </div>
        <div className={`${InstructorCourseStyle.body_wrapper}`}>
          <div className={`${InstructorCourseStyle.body_container}`}>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: 5,
                p: 5,
              }}
            >
              <Card>
                <Box display="flex" justifyContent="center">
                  <Typography textTransform="uppercase" variant="h3">
                    Request Become Mentor
                  </Typography>
                </Box>
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
                              >
                                CreateDate
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>UserName</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Process Note</TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderBy === "mentor.description"}
                                direction={
                                  orderBy === "mentor.description"
                                    ? order
                                    : "asc"
                                }
                                onClick={() =>
                                  handleRequestSort("mentor.description")
                                }
                              >
                                Description
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderBy === "category.name"}
                                direction={
                                  orderBy === "category.name" ? order : "asc"
                                }
                                onClick={() =>
                                  handleRequestSort("category.name")
                                }
                              >
                                Category Name
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>View More</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                          {requestData &&
                            stableSort(
                              requestData,
                              getComparator(order, orderBy)
                            )
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((data) => (
                                <TableRow key={data.courseCategoryOfMentor.id}>
                                  <TableCell>
                                    <div>
                                      {new Date(
                                        data.courseCategoryOfMentor.verificationDate
                                      ).toLocaleDateString()}
                                    </div>
                                    <div>
                                      {new Date(
                                        data.courseCategoryOfMentor.verificationDate
                                      ).toLocaleTimeString()}
                                    </div>
                                  </TableCell>
                                  <TableCell>{data.user.fullName}</TableCell>
                                  <TableCell>{data.user.email}</TableCell>
                                  <TableCell
                                    style={{
                                      color: getStatusColor(
                                        data.courseCategoryOfMentor.status
                                      ),
                                    }}
                                  >
                                    {getStatusText(
                                      data.courseCategoryOfMentor.status
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {data.courseCategoryOfMentor.rejectReason}
                                  </TableCell>
                                  <TableCell>
                                    {data.mentor.description}
                                  </TableCell>
                                  <TableCell>{data.category.name}</TableCell>
                                  <TableCell>
                                    <Button
                                      onClick={() =>
                                        handleViewMoreClick(
                                          data.verificationDocuments
                                        )
                                      }
                                    >
                                      View More
                                    </Button>
                                  </TableCell>
                                  <TableCell>
                                    {data.courseCategoryOfMentor.status !==
                                      0 && (
                                      <div className="flex flex-col gap-[10px]">
                                        <Button
                                          className="w-full my-1 bg-green-500 text-white"
                                          color="success"
                                          variant="contained"
                                          onClick={() =>
                                            handleApprove(data.mentor.userId)
                                          }
                                        >
                                          Approve
                                        </Button>
                                        <Button
                                          variant="contained"
                                          color="error"
                                          className="w-full my-1 bg-red-500 text-white"
                                          onClick={() =>
                                            handleReject(data.mentor.userId)
                                          }
                                        >
                                          Reject
                                        </Button>
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
            <Box mt={2}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
