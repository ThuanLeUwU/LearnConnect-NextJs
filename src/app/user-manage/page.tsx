"use client";
import Image from "next/image";
import styles from "../user-manage/styles.module.scss";
import Link from "next/link";
import InstructorCourseStyle from "./styles.module.scss";
import {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { UserAuth } from "../context/AuthContext";
import {
  Box,
  Card,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import axios from "axios";
import Head from "next/head";
import PropTypes from "prop-types";
import { Button, Form, Modal, Tag } from "antd";

export type User = {
  id: string | number;
  password: string;
  email: string;
  role: string | number;
  fullName: string;
  dob: string;
  phoneNumber: string;
  gender: number;
  registrationDate: string;
  lastLoginDate: string;
  bioDescription: string;
  profilePictureUrl: string;
  status: string | number;
};

export default function UserManagePage() {
  const { user, jwtToken } = UserAuth();
  const [allUser, setAllUser] = useState<User[]>([]);
  // console.log("all user", allUser);

  //Table
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [mounted, setMounted] = useState(false);
  // console.log("sort,",allUser);
  console.log("Admin Token", jwtToken);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - allUser.length + 0.11)
      : 0;

  //update Role

  const [selected, setSelected] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/user`
      );
      // const headers = {
      //   'Authorization': 'Bearer ' + getCookie('accessToken')
      // }
      // const response = await axios.get(`https://evenu.herokuapp.com/api/students`, {
      //   headers
      // })
      const sortedData = response.data.sort((a, b) => a.role - b.role);
      // setUserData(sortedData);
      setAllUser(sortedData);

      setMounted(true);
    };
    fetchData();
  }, []);

  const menuItem = [
    // {
    //   image: "/menu-icon/icon-1.png",
    //   href: "/instructorcourses",
    // },
    {
      image: "/menu-icon/icon-2.png",
      href: "/user-manage",
    },
    {
      image: "/menu-icon/icon-3.png",
      href: "/dashboard",
    },
    // {
    //   image: "/menu-icon/icon-4.png",
    //   href: "/instructorcourses",
    // },
  ];

  //update Role
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState<User>();

  const showModal = (name: any) => {
    setIsModalOpen(true);
    setUserName(name);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // data.target.reset();
    // event.preventDefault();
    // event.target.reset();
    form.resetFields();
  };

  const displayRoleText = (role: number) => {
    if (role === 0) {
      return <div className="text-red-500"> Admin</div>;
    } else if (role === 1) {
      return <div className="text-blue-500"> Staff</div>;
    } else if (role === 2) {
      return <div className="text-pink-600"> Mentor</div>;
    } else {
      return "Student";
    }
  };

  const displayActive = (status: number) => {
    if (status === 0) {
      return (
        <Tag color="green" className="mx-2">
          Active
        </Tag>
      );
    } else if (status === 1) {
      return <Tag color="red">Inactive</Tag>;
    }
  };
  // if (!mounted)

  // console.log("JWT Token staff: ", jwtToken);
  return (
    <>
      <Head>
        <title>Admin nè</title>
      </Head>
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
          <div className="ml-3">
            <Typography variant="h3">Table Of all user</Typography>
          </div>
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
                <Paper sx={{ width: "100%" }}>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? "small" : "medium"}
                    >
                      <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={0}
                      />
                      <TableBody>
                        {stableSort(allUser, getComparator(order, orderBy))
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map(
                            (
                              user: {
                                dob: null;
                                fullName:
                                  | string
                                  | number
                                  | boolean
                                  | ReactElement<
                                      any,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | ReactPortal
                                  | PromiseLikeOfReactNode
                                  | null
                                  | undefined;
                                email:
                                  | string
                                  | number
                                  | boolean
                                  | ReactElement<
                                      any,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | ReactPortal
                                  | PromiseLikeOfReactNode
                                  | null
                                  | undefined;
                                phoneNumber:
                                  | string
                                  | number
                                  | boolean
                                  | ReactElement<
                                      any,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | ReactPortal
                                  | PromiseLikeOfReactNode
                                  | null
                                  | undefined;
                                campus_name:
                                  | string
                                  | number
                                  | boolean
                                  | ReactElement<
                                      any,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | ReactPortal
                                  | PromiseLikeOfReactNode
                                  | null
                                  | undefined;
                                address:
                                  | string
                                  | number
                                  | boolean
                                  | ReactElement<
                                      any,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | ReactPortal
                                  | PromiseLikeOfReactNode
                                  | null
                                  | undefined;
                                role: number;
                                status: number;
                              },
                              index: number
                            ) => {
                              const num = page * rowsPerPage + index + 1;
                              return (
                                <TableRow hover tabIndex={-1} key={index}>
                                  <TableCell>
                                    <Typography variant="body1">
                                      {num}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="left">
                                    <Typography variant="body1">
                                      {user.fullName}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="left">
                                    <Typography variant="body1">
                                      {user.email}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="left">
                                    <Typography variant="body1">
                                      {user.phoneNumber}
                                    </Typography>
                                  </TableCell>

                                  <TableCell align="left">
                                    <Typography variant="body1">
                                      {displayRoleText(user.role)}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Typography variant="body1">
                                      {displayActive(user.status)}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Typography variant="body1">
                                      <div className="flex gap-[10px]">
                                        <Button
                                          type="primary"
                                          style={{ color: "black" }}
                                          onClick={() => {
                                            showModal(user);
                                            // console.log("t nè", user);
                                          }}
                                        >
                                          Update
                                        </Button>

                                        <Button type="primary" danger>
                                          Ban
                                        </Button>
                                      </div>
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={allUser.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Card>
            </Box>
          </div>
        </div>
      </div>
      {/* Modal Update Role */}
      <Modal
        destroyOnClose={true}
        title={`Update role for ${userName?.fullName}`}
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form.Item></Form.Item>
      </Modal>
    </>
  );
}

function descendingComparator(
  a: {
    fullName: any;
    role: any;
    // status: any;
    // birthDate: string | null;
    // birthday: string | number | Date;
  },
  b: {
    fullName: any;
    role: any;
    // status: any;
    // birthDate: string | null;
    // birthday: string | number | Date;
  },
  orderBy: string
) {
  if (orderBy === "name") {
    return compareStrings(a.fullName, b.fullName);
  }
  if (orderBy === "role") {
    return compareStrings(a.role, b.role);
  }
  // if (orderBy === "status") {
  //   return compareStrings(a.status, b.status);
  // }
  // if (orderBy === "birthday") {
  //   if (a.birthDate === null) {
  //     a.birthDate = "20/3/2001";
  //   }
  //   if (b.birthDate === null) {
  //     b.birthDate = "20/3/2001";
  //   }
  //   const dateA = new Date(a.birthday);
  //   const dateB = new Date(b.birthday);
  //   return dateA.getTime() - dateB.getTime();
  // }
  // if (b[orderBy] < a[orderBy]) {
  //   return -1;
  // }
  // if (b[orderBy] > a[orderBy]) {
  //   return 1;
  // }

  return 0;
}

function getComparator(order: string, orderBy: string) {
  if (orderBy === "no") {
    return (a: { no: number }, b: { no: number }) => {
      return order === "desc" ? b.no - a.no : a.no - b.no;
    };
  }
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function compareStrings(a: any, b: any) {
  return a.localeCompare(b);
}

function stableSort(
  array: any[],
  comparator: { (a: any, b: any): any; (arg0: any, arg1: any): any }
) {
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: number[], b: number[]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any[]) => el[0]);
}

const headCells = [
  {
    id: "no",
    numeric: false,
    label: "No.",
  },
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    label: "Email Contact",
  },
  {
    id: "phone",
    numeric: false,
    label: "Phone",
  },
  // {
  //   id: "birthday",
  //   numeric: true,
  //   label: "Birth Day",
  // },
  // {
  //   id: "campus",
  //   numeric: true,
  //   label: "Campus",
  // },
  // {
  //   id: "address",
  //   numeric: true,
  //   label: "Address",
  // },
  {
    id: "role",
    numeric: false,
    label: "Role",
  },
  {
    id: "status",
    numeric: true,
    label: "Activity",
  },
  {
    id: "action",
    numeric: true,
    label: "Action",
  },
];

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableHead(props: {
  order: any;
  orderBy: any;
  onRequestSort: any;
}) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: any) => {
    onRequestSort(event, property);
  };

  //Table

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) =>
          headCell.label === "Phone" ||
          headCell.label === "Activity" ||
          headCell.label === "Role" ||
          headCell.label === "Action" ||
          headCell.label === "Email Contact" ? (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "center" : "left"}
              padding="normal"
            >
              <Typography variant="inherit">{headCell.label}</Typography>
            </TableCell>
          ) : (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding="normal"
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.id === "no" ? (
                <Typography variant="inherit">{headCell.label}</Typography>
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  <Typography variant="inherit">{headCell.label}</Typography>
                </TableSortLabel>
              )}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}
