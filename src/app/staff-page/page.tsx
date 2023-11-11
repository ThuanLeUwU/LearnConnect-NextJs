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

export type CourseCategory = {
  id: number;
  verificationDate: string;
  rejectReason: string | null;
  status: number;
  categoryId: number;
  mentorId: number;
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
  const [selectedDocuments, setSelectedDocuments] = useState<
    VerificationDocument[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

  const handleViewMoreClick = (documents: VerificationDocument[]) => {
    setSelectedDocuments(documents);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://learnconnectapitest.azurewebsites.net/api/user/all-course-category-of-mentor-details",
          {
            params: {
              page: page + 1, // Assuming API uses 1-based indexing
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

    fetchData();
  }, [page, rowsPerPage]);

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
                    Table Of all Request Become Mentor
                  </Typography>
                </Box>
                <Paper sx={{ width: "100%" }}>
                  {isLoading ? (
                    <p>Loading...</p>
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
                                Verification Date
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>Reject Reason</TableCell>
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
                                Mentor Description
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
                                    {
                                      data.courseCategoryOfMentor
                                        .verificationDate
                                    }
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
                  flexWrap: "wrap", // Allow items to wrap to the next line
                  gap: 2, // Adjust the gap as needed
                  alignItems: "center", // Center items vertically
                  justifyContent: "center", // Center items horizontally
                  width: "70vw", // Adjust the width as needed
                  minHeight: 380, // Set the minimum height to 380px
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
                            width: "100%", // Adjust based on your design
                            height: "200px", // Maintain aspect ratio
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
