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
  const { user } = UserAuth();
  const [allUser, setAllUser] = useState<User[]>([]);
  console.log("all user", allUser);

  //Table
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [mounted, setMounted] = useState(false);

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
      setAllUser(response?.data);
      setMounted(true);
    };
    fetchData();
  }, []);

  const menuItem = [
    {
      image: "/menu-icon/icon-1.png",
      href: "/instructorcourses",
    },
    {
      image: "/menu-icon/icon-2.png",
      href: "/user-manage",
    },
    {
      image: "/menu-icon/icon-3.png",
      href: "/dashboard",
    },
    {
      image: "/menu-icon/icon-4.png",
      href: "/instructorcourses",
    },
  ];

  // if (allUser == []) {
  //   return (
  //     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
  //       <CircularProgress />
  //     </div>
  //   )
  // }

  const displayRoleText = (role: number) => {
    if (role === 0) {
      return "Admin";
    } else if (role === 1) {
      return "Staff";
    } else if (role === 2) {
      return "Mentor";
    } else {
      return "Student";
    }
  };

  const displayActive = (status: number) => {
    if (status === 0) {
      return "Active";
    } else if (status === 1) {
      return "Inactive";
    }
  };

  // if (!mounted)
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
          {/* DashBoard */}
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
                    Table Of all user
                  </Typography>
                </Box>

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

                                  <TableCell align="right">
                                    <Typography variant="body1">
                                      {displayRoleText(user.role)}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Typography variant="body1">
                                      {displayActive(user.status)}
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
            {/* <div className={`${InstructorCourseStyle.body_message}`}>
        <div className={`${InstructorCourseStyle.message_icon}`}>
          <img src="/menu-icon/icon-6.png" alt="image" />
        </div>
        <div className={`${InstructorCourseStyle.message_content}`}>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry &apos s standard
            dummy text ever since the 1500s when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It
            has survived not only five centuries, but also the leap into
            electronic.
          </p>
        </div>
      </div> */}
          </div>
          {/* <div className={`${InstructorCourseStyle.course_tab}`}>
      <h3 className={`${InstructorCourseStyle.course_tab_title}`}>
        Course
      </h3>
      <div className={`${InstructorCourseStyle.course_tab_btn}`}>
        <Button
          onClick={() => {
            Modal.confirm({
              title: "Create New Course",
              content: (
                <CreateCourse
                  visible={visible}
                  setVisible={setVisible}
                  onCancel={() => {
                    setVisible(false);
                  }}
                  isEdit={false}
                />
              ),
            });
          }}
          className={`${InstructorCourseStyle.create_btn}`}
        >
          <h6> New Course</h6>
        </Button>
      </div>
    </div>
    <div className={`${InstructorCourseStyle.course_list_wrapper}`}>
      <div className={`${InstructorCourseStyle.course_item}`}>
        <div>
          <Link href="#">
            <img src="/images/admin-courses-01.jpg" alt="Image" />
          </Link>
        </div>
        <div className={`${InstructorCourseStyle.course_item_title}`}>
          <h2>
            <Link href="#">
              Build An eCommerce Site With WooCommerce and WooLentor.
            </Link>
          </h2>
        </div>
        <div className={`${InstructorCourseStyle.course_tracker}`}>
          <div className={`${InstructorCourseStyle.course_tracker_1}`}>
            <p>Earned</p>
            <span
              className={`${InstructorCourseStyle.course_tracker_count}`}
            >
              $5,68.00
            </span>
          </div>
          <div className={`${InstructorCourseStyle.course_tracker_2}`}>
            <p>Enrollments</p>
            <span
              className={`${InstructorCourseStyle.course_tracker_count}`}
            >
              1,500
            </span>
          </div>
          <div className={`${InstructorCourseStyle.course_tracker_3}`}>
            <p>Course Rating</p>
            <span
              className={`${InstructorCourseStyle.course_tracker_count}`}
            >
              4.5
              <ReactStars count={1} color2={"#ffd700"}></ReactStars>
            </span>
          </div>
        </div>
      </div>
      <div className={`${InstructorCourseStyle.course_item}`}></div>
      <div className={`${InstructorCourseStyle.course_item}`}></div>
    </div> */}
        </div>
      </div>
    </>
  );

  // return (
  //   <div className="bg-[#fff]">
  //     <div className="grid cols-2 lg:grid-cols-12">
  //       <div className="lg:cols-span-1 bg-[#309255]">
  //         <div className={styles["sidebar-wrapper"]}>
  //           <div className={styles["menu-list"]}>
  //             <Link className={styles["active"]} href="#">
  //               <img src="./menu-icon/icon-1.png" alt="Icon" />
  //             </Link>
  //             <Link href="#">
  //               <img src="./menu-icon/icon-2.png" alt="Icon" />
  //             </Link>
  //             <Link href="#">
  //               <img src="./menu-icon/icon-3.png" alt="Icon" />
  //             </Link>
  //             <Link href="#">
  //               <img src="./menu-icon/icon-4.png" alt="Icon" />
  //             </Link>
  //             <Link href="#">
  //               <img src="./menu-icon/icon-5.png" alt="Icon" />
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="lg:col-span-11">
  //         <div className="content-wrapper text-[#212832] w-full">
  //           <div className="flex flex-col">
  //             <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
  //               <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
  //                 <div className="overflow-hidden">
  //                   <table className="min-w-full text-center text-sm font-light">
  //                     <thead className="border-b font-medium dark:border-neutral-500">
  //                       <tr>
  //                         <th scope="col" className="px-6 py-4">
  //                           Class
  //                         </th>
  //                         <th scope="col" className="px-6 py-4">
  //                           Heading
  //                         </th>
  //                         <th scope="col" className="px-6 py-4">
  //                           Heading
  //                         </th>
  //                       </tr>
  //                     </thead>
  //                     <tbody>
  //                       <tr className="border-b dark:border-neutral-500">
  //                         <td className="whitespace-nowrap px-6 py-4 font-medium">
  //                           Default
  //                         </td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                       </tr>
  //                       <tr className="border-b border-primary-200 bg-primary-100 text-neutral-800">
  //                         <td className="whitespace-nowrap px-6 py-4 font-medium">
  //                           Primary
  //                         </td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                       </tr>
  //                       <tr className="border-b border-secondary-200 bg-secondary-100 text-neutral-800">
  //                         <td className="whitespace-nowrap px-6 py-4 font-medium">
  //                           Secondary
  //                         </td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                       </tr>
  //                       <tr className="border-b border-success-200 bg-success-100 text-neutral-800">
  //                         <td className="whitespace-nowrap px-6 py-4 font-medium">
  //                           Success
  //                         </td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                       </tr>
  //                       <tr className="border-b border-danger-200 bg-danger-100 text-neutral-800">
  //                         <td className="whitespace-nowrap px-6 py-4 font-medium">
  //                           Danger
  //                         </td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                       </tr>
  //                       <tr className="border-b border-warning-200 bg-warning-100 text-neutral-800">
  //                         <td className="whitespace-nowrap px-6 py-4 font-medium">
  //                           Warning
  //                         </td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                       </tr>
  //                       <tr className="border-b border-info-200 bg-info-100 text-neutral-800">
  //                         <td className="whitespace-nowrap px-6 py-4 font-medium">
  //                           Info
  //                         </td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                       </tr>
  //                       <tr className="border-b border-neutral-100 bg-neutral-50 text-neutral-800 dark:bg-neutral-50">
  //                         <td className="whitespace-nowrap px-6 py-4 font-medium">
  //                           Light
  //                         </td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                       </tr>
  //                       <tr className="border-b border-neutral-700 bg-neutral-800 text-neutral-50 dark:border-neutral-600 dark:bg-neutral-700">
  //                         <td className="whitespace-nowrap px-6 py-4 font-medium">
  //                           Dark
  //                         </td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                         <td className="whitespace-nowrap px-6 py-4">Cell</td>
  //                       </tr>
  //                     </tbody>
  //                   </table>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

function descendingComparator(
  a: {
    fullName: any;
    campus_name: any;
    // birthDate: string | null;
    // birthday: string | number | Date;
  },
  b: {
    fullName: any;
    campus_name: any;
    // birthDate: string | null;
    // birthday: string | number | Date;
  },
  orderBy: string
) {
  if (orderBy === "name") {
    return compareStrings(a.fullName, b.fullName);
  }
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
    numeric: true,
    label: "Role",
  },
  {
    id: "status",
    numeric: true,
    label: "Activity",
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
          headCell.label === "Address" ||
          headCell.label === "Role" ||
          headCell.label === "Email Contact" ? (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
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
