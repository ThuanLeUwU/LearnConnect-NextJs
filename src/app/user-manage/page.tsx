"use client";
import Image from "next/image";
import Link from "next/link";
import InstructorCourseStyle from "./styles/style.module.scss";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import {
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
import {
  Button,
  Form,
  Modal,
  Tag,
  Table as AntTable,
  Space,
  Breadcrumb,
  Tooltip,
  Input,
  Spin,
} from "antd";
import {
  EditOutlined,
  SearchOutlined,
  StopOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

export type User = {
  listUser: any;
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
  const { user, jwtToken, userData } = UserAuth();
  const [allUser, setAllUser] = useState<User[]>([]);
  // console.log("all user", allUser);

  //Table
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [mounted, setMounted] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // Số dòng mỗi trang
  });
  // console.log("sort,",allUser);
  // console.log("Admin Token", jwtToken);

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

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>();
  console.log("tehe", searchResults);
  console.log("tehe", searchTerm);
  const handleSearch = () => {
    setSearchResults(searchTerm);
  };
  const users = [
    { id: 1, username: "user1" },
    { id: 2, username: "user2" },
    { id: 3, username: "user3" },
    // Add more user data as needed
  ];

  useEffect(() => {
    if (userData) {
      const fetchData = async () => {
        const response = await axios.get(
          `https://learnconnectapi.azurewebsites.net/api/user/search?searchQuery=${searchTerm}&currentPage=1&pageSize=9999`
        );
        // const headers = {
        //   'Authorization': 'Bearer ' + getCookie('accessToken')
        // }
        // const response = await axios.get(`https://evenu.herokuapp.com/api/students`, {
        //   headers
        // })
        const sortedData = response.data.listUser.sort(
          (a, b) => a.role - b.role
        );
        // setUserData(sortedData);
        setAllUser(sortedData);

        setMounted(true);
      };
      fetchData();
    }
  }, [userData, searchTerm]);

  const menuItem = [
    // {
    //   image: "/menu-icon/icon-1.png",
    //   href: "/instructorcourses",
    // },
    {
      image: "/images/user.png",
      title: "Users",
      href: "/user-manage",
    },
    {
      image: "/images/chart-user.png",
      title: "Dashboard",
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
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Email Contact",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a, b) =>
        (a.phoneNumber || "").localeCompare(b.phoneNumber || ""),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => displayRoleText(role),
      sorter: (a, b) => {
        const roleA = String(a.role || "");
        const roleB = String(b.role || "");
        return roleA.localeCompare(roleB);
      },
    },
    {
      title: "Activity",
      dataIndex: "status",
      key: "status",
      render: (status) => displayActive(status),
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ color: "black" }}
            onClick={() => {
              detailsUser(record.id);
            }}
          >
            View Detail
          </Button>
          {/* Add more action buttons if needed */}
        </Space>
      ),
    },
  ];

  const handlePageChange = (current, pageSize) => {
    setPagination({ current, pageSize });
  };

  const router = useRouter();

  const detailsUser = (id) => {
    router.push(`/user-manage/${id}`);
  };

  return (
    <>
      {!userData ? (
        <Spin size="large" />
      ) : (
        <div className="w-full">
          <div className={`${InstructorCourseStyle.content_wrapper}`}>
            <div className={`${InstructorCourseStyle.sidebar_wrapper}`}>
              <div className={`${InstructorCourseStyle.sidebar_list}`}>
                {menuItem.map((item, index) => {
                  return (
                    <Tooltip title={item.title} key={index}>
                      <Link
                        href={item.href}
                        className={`${InstructorCourseStyle.sidebar_active}`}
                      >
                        <img src={item.image} alt="image"></img>
                      </Link>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
            <div className={`${InstructorCourseStyle.body_wrapper}`}>
              {/* DashBoard */}
              <div
                className={`${InstructorCourseStyle.course_tab} bg-[#e7f8ee]`}
              >
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <div className="text-start font-semibold text-2xl my-5 px-4">
                      Users Management
                    </div>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex flex-row justify-between gap-2">
                  <Input
                    className="w-[300px]"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button
                    type="primary"
                    className="bg-[#4096ff]"
                    onClick={handleSearch}
                  >
                    <SearchOutlined />
                  </Button>
                </div>
              </div>
              <div className="pt-10">
                <AntTable
                  columns={columns}
                  dataSource={allUser}
                  pagination={{ ...pagination, onChange: handlePageChange }}
                  className="mx-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg"

                  // pagination={{
                  //   pageSize: rowsPerPage,
                  //   current: page + 1,
                  //   total: allUser.length,
                  //   onChange: handleChangePage,
                  // }}
                />
              </div>

              {/* <div className=""></div> */}
            </div>
          </div>
        </div>
      )}

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
