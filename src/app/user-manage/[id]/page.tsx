"use client";
import Image from "next/image";
import Link from "next/link";
import InstructorCourseStyle from ".././styles/style.module.scss";
import { useEffect, useState } from "react";
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
import debounce from "lodash/debounce";
import { UserAuth } from "@/app/context/AuthContext";

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

export default function DetailUser({ params }: any) {
  const { user, jwtToken, userData } = UserAuth();
  const userId = params.id;

  const [detailUser, setDetailUser] = useState<User>();
  console.log("all user", userId);

  // console.log("sort,",allUser);
  // console.log("Admin Token", jwtToken);

  //update Role

  const [selected, setSelected] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>();
  console.log("tehe", searchResults);
  console.log("tehe", searchTerm);
  const handleSearch = () => {
    setSearchResults(searchTerm);
  };

  useEffect(() => {
    if (userData) {
      const fetchData = async () => {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/user/${userId}`
        );
        // const headers = {
        //   'Authorization': 'Bearer ' + getCookie('accessToken')
        // }
        // const response = await axios.get(`https://evenu.herokuapp.com/api/students`, {
        //   headers
        // })
        setDetailUser(response.data);

        // setMounted(true);
      };
      fetchData();
    }
  }, [userData, userId]);

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
                    <div className="text-start font-semibold text-4xl my-5 px-4">
                      Users Management
                    </div>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{detailUser?.fullName}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="pt-10"></div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Update Role */}
      {/* <Modal
        destroyOnClose={true}
        title={`Update role for ${userName?.fullName}`}
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form.Item></Form.Item>
      </Modal> */}
    </>
  );
}
