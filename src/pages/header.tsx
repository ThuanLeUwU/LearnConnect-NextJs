"use client";
import Image from "next/image";
import headerStyles from "./styles/styles.module.scss";
import "../app/./globals.css";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { UserAuth, UserRole } from "@/app/context/AuthContext";
import { RegisterForm } from "@/components/registerForm";
import { Empty, Modal, Space, Button as ButtonAntd } from "antd";
import { useRouter } from "next/navigation";
import { AiFillBell } from "react-icons/ai";
import axios from "axios";
import { http } from "@/api/http";
import { Form, Input } from "antd";
import { toast } from "sonner";
import { Button } from "react-bootstrap";

export type Notification = {
  id: string | number;
  title: string;
  description: string;
  isRead: boolean;
  timeStamp: string;
  userId: number;
  notification: any;
  countUnRead: any;
};
const Header = () => {
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [visible, setVisible] = useState(false);
  const { userData, id, jwtToken, switchRole } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const [notificationContent, setNotificationContent] = useState<
    Notification[]
  >([]);
  const [notiUnread, setNotiUnread] = useState<number>(0);
  const refNoti = useRef(notiUnread);

  const [form] = Form.useForm();

  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  // const currentRoute = router.asPath;
  // console.log("Current Route:", currentRoute);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setNotification(false);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  const closeDropdownNotification = () => {
    setNotification(false);
  };
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const currentRoute = window.location.href;
    var contentUrl = currentRoute.split("/").reverse()[0];
    setActiveTab(contentUrl);
  }, []);

  const { role, user, googleSignIn, logOut } = UserAuth();

  // console.log("userrole", userData?.role);
  // const handleSignIn = async () => {
  //   try {
  //     await googleSignIn();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSignOut = async () => {
    try {
      logOut();
      closeDropdown();
      handleTabChange("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickSeeAll = () => {
    router.push(`/notifications`);
  };

  const handleClickBecomeMentor = () => {
    setActiveTab("alo");
    router.push("/become-mentor");
  };

  const returnHome = () => {
    switch (role) {
      case UserRole.Student:
        handleTabChange("");
        break;
      case UserRole.Mentor:
        router.push("/instructorcourses");
        break;
      case UserRole.Staff:
        router.push("/staff-page");
        break;
      case UserRole.Admin:
        router.push("/user-manage");
        break;
      default:
        handleTabChange("");
        break;
    }
  };

  // const [previousNotificationLength, setPreviousNotificationLength] =
  //   useState<number>(0);
  // console.log("hmmssmss", previousNotificationLength);
  // const [NotificationLength, setNotificationLength] = useState<number>(0);

  const fetchNotificationData = () => {
    http
      .get(`/notification/byUserId/${id}`)
      .then((response) => {
        setNotificationContent(response.data[0].notification);
        if (response.data[0].countUnRead > refNoti.current) {
          toast.info("You have new notification!");
          setNotiUnread(response.data[0].countUnRead);
          refNoti.current = response.data[0].countUnRead;
        }
        setNotiUnread(response.data[0].countUnRead);
      })
      .catch((err) => console.error(err));

    // setNotiUnread(response.data[0].countUnRead);

    // setNotificationLength(response.data[0].notification.length);
  };

  useEffect(() => {
    if (id) {
      fetchNotificationData();
      const intervalId = setInterval(() => {
        fetchNotificationData();
        // checkNotificationLengthChange();
      }, 3000);

      // Clear interval khi component unmount
      return () => clearInterval(intervalId);
    }
  }, [id, userData]);

  // const checkNotificationLengthChange = () => {
  //   console.log("hmmm", notificationContent.length);

  //   // Kiểm tra xem độ dài thông báo đã thay đổi hay không
  //   if (notificationContent.length !== previousNotificationLength) {
  //     // console.log("hmmmssss", previousNotificationLength);
  //     // Thông báo sự thay đổi bằng toast
  //     toast.success("Có thông báo mới!");
  //     // Cập nhật giá trị độ dài thông báo
  //     setPreviousNotificationLength(notificationContent.length);
  //   }
  // };

  const handleClickOutside = (event: MouseEvent) => {
    const dropdown = document.getElementById("dropdown-menu");
    const dropdownProfile = document.getElementById("dropdown-profile");

    if (dropdown && !dropdown.contains(event.target as Node)) {
      setNotification(false);
    }
    if (dropdownProfile && !dropdownProfile.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const currentRoute = window.location.href;
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdownNotification = () => {
    setNotification(!notification);
    setIsOpen(false);
  };

  const handleSwitchRole = () => {
    if (role === 3) {
      switchRole(2);
      router.push(`/instructorcourses`);
    }
    if (role === 2) {
      switchRole(3);
      handleTabChange("");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsLogin(false);
    router.push(`/${tab}`);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [formDataImage, setFormDataImage] = useState();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      await http.post(
        `https://learnconnectserver.azurewebsites.net/api/user/create-account-staff`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      form.resetFields();
      setIsModalVisible(false);
      setTimeout(() => {
        toast.success("Create Account successful");
      });
    } catch (error) {
      setTimeout(() => {
        toast.error("Create Account fail");
      });
    }
  };

  return (
    <div className={`${headerStyles.header_section}`}>
      {!userData ? (
        <div className={`${headerStyles.header_top}`}></div>
      ) : (
        <div className={`${headerStyles.header_login}`}>
          <div className={`${headerStyles.header_navbar}`}>
            <div className={`${headerStyles.header_login_left}`}>
              <button onClick={returnHome}>
                <Image
                  width={100}
                  height={40}
                  src="/images/LogoTextWhite.png"
                  alt="Logo"
                />
              </button>
            </div>
            <ul className={`${headerStyles.header_login_right} `}>
              {userData?.role === 2 ? (
                <button
                  onClick={handleSwitchRole}
                  className="text-black border-2 border-[#309255] shadow-lg hover:text-white hover:bg-[#309255] rounded-lg bg-[#fff] py-1 px-3"
                >
                  Switch role {role === 3 ? "mentor" : "student"}
                </button>
              ) : (
                <></>
              )}
              {userData?.role === 0 ? (
                <button
                  className="text-black border-2 border-[#309255] shadow-lg hover:text-white hover:bg-[#309255] rounded-lg bg-[#fff] py-1 px-3"
                  onClick={showModal}
                >
                  Create Account for staff
                </button>
              ) : (
                <></>
              )}
              <Modal
                title="Create Account for Staff"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={false}
              >
                {/* Form inside the modal */}
                <Form
                  autoComplete="off"
                  form={form}
                  labelCol={{ span: 6 }}
                  labelAlign={"left"}
                  wrapperCol={{ span: 18 }}
                  layout="horizontal"
                  className="mt-5"
                  style={{ width: "100%" }}
                  onFinish={handleFormSubmit}
                >
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name!",
                      },
                    ]}
                  >
                    <Input placeholder="Full Name" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email!" },
                    ]}
                  >
                    <Input type="email" placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Space className="justify-end w-full">
                    <Form.Item className="mb-0">
                      <Space>
                        <ButtonAntd
                          className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                          onClick={handleCancel}
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
                        {/* <button
                          onClick={handleCancel}
                          className="px-5 py-2 bg-red-400 rounded-lg text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#309255] rounded-lg text-white"
                        >
                          Create
                        </button> */}
                      </Space>
                    </Form.Item>
                  </Space>

                  {/* <Space>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button
                      key="submit"
                      type="primary"
                      onClick={handleFormSubmit}
                      style={{ color: "black" }}
                    >
                      Submit
                    </Button>
                  </Space> */}
                </Form>
              </Modal>
              <li className={`${headerStyles.header_notification}`}>
                <button
                  onClick={toggleDropdownNotification}
                  className="relative"
                >
                  {notiUnread !== 0 && (
                    <>
                      {notiUnread <= 9 ? (
                        <div className="absolute top-0 right-0 bg-red-500 w-5 h-5 text-white rounded-full text-[12px] px-1 flex items-center justify-center">
                          {notiUnread}
                        </div>
                      ) : (
                        <div className="absolute top-0 right-0 bg-red-500 w-5 h-5 text-white rounded-full text-[10px] px-1 flex items-center justify-center">
                          {/* {notiUnread?.countUnRead} */} 9+
                        </div>
                      )}
                    </>
                  )}

                  <AiFillBell />
                </button>
                {notification && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-[450px] rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
                    id="dropdown-menu"
                  >
                    {notificationContent && notificationContent.length > 0 ? (
                      <ul className="divide-y divide-gray-200 rounded-lg">
                        {notificationContent.slice(0, 7).map((item) => {
                          const date = new Date(item.timeStamp);
                          const now = Date.now();
                          const tmp = Math.round((now - date.getTime()) / 1000);

                          let timeString = `${tmp} second${
                            tmp > 1 ? "s" : ""
                          } ago`;
                          if (tmp > 604800) {
                            timeString = `${Math.floor(tmp / 604800)} week${
                              Math.floor(tmp / 604800) > 1 ? "s" : ""
                            } ago`;
                          } else if (tmp > 86400) {
                            timeString = `${Math.floor(tmp / 86400)} day${
                              Math.floor(tmp / 86400) > 1 ? "s" : ""
                            } ago`;
                          } else if (tmp > 3600) {
                            timeString = `${Math.floor(tmp / 3600)} hour${
                              Math.floor(tmp / 3600) > 1 ? "s" : ""
                            } ago`;
                          } else if (tmp > 60) {
                            timeString = `${Math.floor(tmp / 60)} minute${
                              Math.floor(tmp / 60) > 1 ? "s" : ""
                            } ago`;
                          }
                          return (
                            <li
                              key={item.id}
                              className="flex items-center py-4 px-[25px] hover:bg-[#e7f8ee] hover:rounded-tl-lg hover:rounded-tr-lg"
                            >
                              {/* <span>{item.id}</span> */}
                              <span className="text-white">
                                {item.isRead ? (
                                  <i className="bg-gray-400 rounded-full h-2 w-2 block"></i>
                                ) : (
                                  <i className="bg-[#309255] rounded-full h-2 w-2 block"></i>
                                )}
                              </span>
                              <div className="ml-3 text-sm">
                                <a href="#" className="text-gray-900">
                                  <p className="truncate max-w-[280px]">
                                    <strong>{item.title}</strong>{" "}
                                    {item.description}
                                  </p>
                                </a>
                              </div>
                              <span className="text-gray-500 ml-auto text-sm">
                                {timeString}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <div className="text-center text-[#000] text-xl mt-8 items-center justify-center min-h-[280px]">
                        <Empty description={false} />
                        You don&apos;t have any notification.
                      </div>
                    )}
                    <button
                      onClick={() => {
                        handleClickSeeAll();
                      }}
                      className="block text-center text-sm text-gray-700 py-2  bg-[#e7f8ee] rounded-br-lg rounded-bl-lg hover:rounded-bl-lg hover:rounded-br-lg w-full"
                    >
                      See all notifications
                    </button>
                  </div>
                )}
              </li>
              <li className={`${headerStyles.header_info_img}`}></li>
              <li>
                <div>
                  <button
                    className={`${headerStyles.header_more}`}
                    onClick={toggleDropdown}
                    // onMouseLeave={toggleDropdown}
                  >
                    <img
                      className={`${headerStyles.header_info_src}`}
                      src={
                        userData?.profilePictureUrl || "www.default.imageurl"
                      }
                      alt="author"
                    ></img>
                  </button>
                </div>
                {isOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[9999]"
                    id="dropdown-profile"
                  >
                    <ul
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {userData?.role !== 0 && userData?.role !== 1 && (
                        <>
                          <li>
                            <Link
                              href={
                                userData?.role === 2
                                  ? `/profile-mentor/${userData?.id}`
                                  : "/profile"
                              }
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-tl-lg rounded-tr-lg hover:rounded-bl-lg hover:rounded-br-lg"
                              onClick={closeDropdown}
                            >
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/transaction"
                              className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 rounded-tl-lg rounded-tr-lg hover:rounded-bl-lg hover:rounded-br-lg"
                              onClick={closeDropdown}
                            >
                              Transaction History
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/progress"
                              className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 rounded-tl-lg rounded-tr-lg hover:rounded-bl-lg hover:rounded-br-lg"
                              onClick={closeDropdown}
                            >
                              Progress
                            </Link>
                          </li>
                        </>
                      )}
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-bl-lg rounded-br-lg hover:rounded-tl-lg hover:rounded-tr-lg"
                          onClick={handleSignOut}
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="header-main ">
        {/* <div className="container "> */}
        {!userData ? (
          <div className="page-banner">
            <div className="container ">
              <div
                className={`${headerStyles.header_main_wrapper} mx-10 shadow-lg`}
              >
                <div className={`${headerStyles.header_logo}`}>
                  <button onClick={() => handleTabChange("")}>
                    <Image
                      width={120}
                      height={100}
                      src="/images/LogoRemoveBG.png"
                      alt="logo"
                    />
                  </button>
                </div>
                <div className={`${headerStyles.header_menu}`}>
                  <ul
                    className={`${headerStyles.nav_menu} text-base font-medium `}
                  >
                    <li
                      className={`${
                        activeTab === "" &&
                        !isLogin &&
                        "border-b-4 border-[#309255]"
                      }`}
                    >
                      <button onClick={() => handleTabChange("")}>Home</button>
                    </li>
                    <li
                      className={`${
                        activeTab === "courses" && "border-b-4 border-[#309255]"
                      }`}
                    >
                      <button onClick={() => handleTabChange("courses")}>
                        Courses
                      </button>
                    </li>
                    <li
                      className={`${
                        activeTab === "list-mentor" &&
                        "border-b-4 border-[#309255]"
                      }`}
                    >
                      <button onClick={() => handleTabChange("list-mentor")}>
                        Mentors
                      </button>
                    </li>
                  </ul>
                </div>
                <div className={`${headerStyles.header_sign_in_up}`}>
                  <ul>
                    <li>
                      <button
                        onClick={() => {
                          setActiveTab("");
                          setIsLogin(true);
                          router.push("/login");
                        }}
                        className={`${headerStyles.sign_up}`}
                      >
                        Sign In
                      </button>
                    </li>
                    <li>
                      {/* <Link
                      className={`${headerStyles.sign_up}`}
                      href="register.html"
                    >
                      Sign Up
                    </Link> */}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {role === 3 ? (
              <div className="page-banner ">
                <div className="container">
                  <div
                    className={`${headerStyles.header_main_wrapper} shadow-lg `}
                  >
                    <div className={`${headerStyles.header_logo}`}>
                      <button onClick={() => handleTabChange("")}>
                        <Image
                          width={100}
                          height={60}
                          src="/images/LogoRemoveBG.png"
                          alt="logo"
                        />
                      </button>
                    </div>
                    <div className={`${headerStyles.header_menu}`}>
                      <ul
                        className={`${headerStyles.nav_menu} text-base font-medium`}
                      >
                        <li
                          className={`${
                            activeTab === "" && "border-b-4 border-[#309255]"
                          }`}
                        >
                          <button onClick={() => handleTabChange("")}>
                            Home
                          </button>
                        </li>
                        <li
                          className={`${
                            activeTab === "courses" &&
                            "border-b-4 border-[#309255]"
                          }`}
                        >
                          <button onClick={() => handleTabChange("courses")}>
                            Courses
                          </button>
                        </li>
                        <li
                          className={`${
                            activeTab === "my-course" &&
                            "border-b-4 border-[#309255]"
                          }`}
                        >
                          <button onClick={() => handleTabChange("my-course")}>
                            My Courses{" "}
                          </button>
                        </li>
                        <li
                          className={`${
                            activeTab === "schedule" &&
                            "border-b-4 border-[#309255]"
                          }`}
                        >
                          <button onClick={() => handleTabChange("schedule")}>
                            My Schedule
                          </button>
                        </li>
                        <li
                          className={`${
                            activeTab === "list-mentor" &&
                            "border-b-4 border-[#309255]"
                          }`}
                        >
                          <button
                            onClick={() => handleTabChange("list-mentor")}
                          >
                            Mentors
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      {userData?.role == 3 ? (
                        <div className="border-2 border-[#309255] px-2 py-1 rounded-lg bg-[#fff] hover:bg-[#309255] hover:text-white mr-5">
                          <Button onClick={handleClickBecomeMentor}>
                            Become a Mentor
                          </Button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Header;
