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
          `https://learnconnectapi.azurewebsites.net/api/user/${userId}`
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

  const displayRoleText = (role: any) => {
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

  const displayActive = (status: any) => {
    if (status === 0) {
      return <div className="text-green-500">Active</div>;
    } else if (status === 1) {
      return <div className="text-red-500">Inactive</div>;
    }
  };
  const router = useRouter();

  const breadcrumbNavigation = () => {
    router.push("/user-manage");
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
              <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
                <Breadcrumb className="text-start font-semibold text-4xl my-5 px-4">
                  <Breadcrumb.Item>
                    <button onClick={breadcrumbNavigation}>User</button>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{detailUser?.fullName}</Breadcrumb.Item>
                  {/* <Breadcrumb.Item>React</Breadcrumb.Item> */}
                </Breadcrumb>
              </div>
              <div className="pt-10 grid grid-cols-12 gap-4 mx-5">
                <div className="col-span-4 border-2 rounded-lg flex flex-col shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)]">
                  {/* Phần ảnh */}
                  <div className="bg-gray-200 p-5 text-3xl border-b-2 border-gray-300">
                    Avatar
                  </div>
                  <div className="p-5 flex justify-center">
                    <img
                      className="w-[300px] h-[300px]"
                      src={detailUser?.profilePictureUrl}
                    />{" "}
                  </div>
                </div>
                <div className="col-span-8 border-2 rounded-lg flex flex-col shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)]">
                  {/* Phần thông tin */}
                  <div className="bg-gray-200 p-5 text-3xl border-b-2 border-gray-300">
                    Account Information
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className=" p-4">
                        <h2 className="text-lg font-semibold mb-2">Name</h2>
                        {/* <Input disabled value={detailUser?.fullName} /> */}
                        <div className="border-2 rounded-lg border-gray-300 bg-gray-200">
                          <div className=" px-5 py-2 w-full">
                            {detailUser?.fullName}
                          </div>
                        </div>

                        {/* Thêm dữ liệu tên ở đây */}
                      </div>
                      <div className=" p-4">
                        <h2 className="text-lg font-semibold mb-2">Email</h2>
                        <div className="border-2 rounded-lg border-gray-300 bg-gray-200">
                          <div className=" px-5 py-2 w-full">
                            {detailUser?.email}
                          </div>
                        </div>
                        {/* Thêm dữ liệu email ở đây */}
                      </div>
                      <div className=" p-4">
                        <h2 className="text-lg font-semibold mb-2">Status</h2>
                        <div className="border-2 rounded-lg border-gray-300 bg-gray-200">
                          <div className=" px-5 py-2 w-full">
                            {displayActive(detailUser?.status)}
                          </div>
                        </div>
                        {/* Thêm dữ liệu trạng thái ở đây */}
                      </div>
                      <div className=" p-4">
                        <h2 className="text-lg font-semibold mb-2">Role</h2>
                        <div className="border-2 rounded-lg border-gray-300 bg-gray-200">
                          <div className=" px-5 py-2 w-full">
                            {displayRoleText(detailUser?.role)}
                          </div>
                        </div>
                        {/* Thêm dữ liệu vai trò ở đây */}
                      </div>
                    </div>

                    <button className="flex justify-center w-full border-2 mt-4 py-2 text-lg font-medium border-red-400 rounded-lg hover:bg-red-500 hover:text-white">
                      Deactivate This User
                    </button>
                  </div>
                </div>
              </div>
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
