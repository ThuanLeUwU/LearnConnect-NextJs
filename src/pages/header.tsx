"use client";
import Image from "next/image";
import headerStyles from "./styles/styles.module.scss";
import "../app/./globals.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import { Button } from "react-bootstrap";
import { RegisterForm } from "@/components/registerForm";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { AiFillBell } from "react-icons/ai";
import axios from "axios";

export type Notification = {
  id: string | number;
  title: string;
  description: string;
  isRead: boolean;
  timeStamp: string;
  userId: number;
};
const Header = () => {
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [visible, setVisible] = useState(false);
  const { userData, id } = UserAuth();
  const [notificationContent, setNotificationContent] = useState<
    Notification[]
  >([]);
  const router = useRouter();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setNotification(false);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };
  const toggleDropdownNotification = () => {
    setNotification(!notification);
    setIsOpen(false);
  };

  const closeDropdownNotification = () => {
    setNotification(false);
  };

  const { role, user, googleSignIn, logOut } = UserAuth();

  console.log("user", role);
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      logOut();
      closeDropdown();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickSeeAll = () => {
    router.push(`/notifications`);
  };

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/notification/byUserId/${id}`
        );
        setNotificationContent(response.data);
      } catch (error) {
        console.error("Error fetching Notification Data:", error);
      }
    };
    if (id) {
      fetchNotificationData();
    }
  }, [id]);
  console.log("id", id);
  console.log("notification data: ", notificationContent);

  return (
    <div className={`${headerStyles.header_section}`}>
      {!user ? (
        <div className={`${headerStyles.header_top}`}>
          <div className="container">
            <div className={`${headerStyles.header_top_wrapper}`}>
              <div className={`${headerStyles.header_top_left}`}>
                <p>
                  All course 28% off for{" "}
                  <Link href="#">Liberian people’s.</Link>
                </p>
              </div>
              <div className={`${headerStyles.header_top_medal}`}>
                <div className={`${headerStyles.top_info}`}>
                  <p>
                    <i className="flaticon-phone-call"></i>{" "}
                    <Link href="tel:9702621413">(970) 262-1413</Link>
                  </p>
                  <p>
                    <i className="flaticon-email"></i>{" "}
                    <Link href="mailto:learnconnect@gmail.com">
                      learnconnect@gmail.com
                    </Link>
                  </p>
                </div>
              </div>
              <div className={`${headerStyles.header_top_right}`}>
                <ul className={`${headerStyles.header_top_right_social}`}>
                  <li>
                    <Link href="#">
                      <i className="flaticon-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="flaticon-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="flaticon-skype"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="flaticon-instagram"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${headerStyles.header_login}`}>
          <div className={`${headerStyles.header_navbar}`}>
            <div className={`${headerStyles.header_login_left}`}>
              <Link href="/">
                <Image
                  width={100}
                  height={40}
                  src="/images/LogoRemoveBG.png"
                  alt="Logo"
                />
              </Link>
            </div>
            <ul className={`${headerStyles.header_login_right}`}>
              <li className={`${headerStyles.header_notification}`}>
                <button onClick={toggleDropdownNotification}>
                  <AiFillBell />
                </button>
                {notification && (
                  <div className="origin-top-right absolute right-0 mt-2 w-[360px] rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                    <ul className="divide-y divide-gray-200 rounded-lg">
                      {notificationContent &&
                        notificationContent.length > 0 && (
                          <div>
                            {notificationContent
                              .slice(-5)
                              .map((notification) => {
                                const date = new Date(notification.timeStamp);
                                const hours = String(date.getHours()).padStart(
                                  2,
                                  "0"
                                );
                                const minutes = String(
                                  date.getMinutes()
                                ).padStart(2, "0");
                                const timeString = `${hours}:${minutes}`;

                                return (
                                  <li
                                    key={notification.id}
                                    className="flex items-center py-4 px-[25px] hover:bg-[#e7f8ee] hover:rounded-tl-lg hover:rounded-tr-lg"
                                  >
                                    <span className="text-white">
                                      <i className="bg-gray-400 rounded-full h-2 w-2 block"></i>
                                    </span>
                                    <div className="ml-3 text-sm">
                                      <a href="#" className="text-gray-900">
                                        <p className="truncate max-w-[250px]">
                                          <strong>{notification.title}</strong>{" "}
                                          {notification.description}
                                        </p>
                                      </a>
                                    </div>
                                    <span className="text-gray-500 ml-auto text-sm">
                                      {timeString}
                                    </span>
                                  </li>
                                );
                              })}
                          </div>
                        )}
                    </ul>
                    <a
                      href="#"
                      onClick={() => {
                        handleClickSeeAll();
                        closeDropdownNotification();
                      }}
                      className="block text-center text-sm text-gray-700 py-2 bg-[#e7f8ee] hover:rounded-bl-lg hover:rounded-br-lg"
                    >
                      See all notifications
                    </a>
                  </div>
                )}
              </li>
              <li className={`${headerStyles.header_info_img}`}></li>
              <li>
                <button
                  className={`${headerStyles.header_more}`}
                  onClick={toggleDropdown}
                >
                  <img
                    className={`${headerStyles.header_info_src}`}
                    src={userData?.profilePictureUrl || "www.default.imageurl"}
                    alt="author"
                  ></img>
                </button>
                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[2]">
                    <ul
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <li>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-tl-lg rounded-tr-lg hover:rounded-bl-lg hover:rounded-br-lg"
                          onClick={closeDropdown}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/transaction"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-tl-lg rounded-tr-lg hover:rounded-bl-lg hover:rounded-br-lg"
                          onClick={closeDropdown}
                        >
                          Transaction
                        </Link>
                      </li>
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
        <div className="container">
          {!user ? (
            <div className={`${headerStyles.header_main_wrapper}`}>
              <div className={`${headerStyles.header_logo}`}>
                <Link href="/">
                  <Image
                    width={120}
                    height={100}
                    src="/images/LogoRemoveBG.png"
                    alt="logo"
                  />
                </Link>
              </div>
              <div className={`${headerStyles.header_menu}`}>
                <ul className={`${headerStyles.nav_menu}`}>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/courses">Courses</Link>
                  </li>
                  <li>
                    <Link href="/about">About </Link>
                  </li>
                  <li>
                    <Link href="/faq">FAQ</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div className={`${headerStyles.header_sign_in_up}`}>
                <ul>
                  <li>
                    <Link className={`${headerStyles.sign_in}`} href="/login">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${headerStyles.sign_up}`}
                      href="register.html"
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              {role == 3 ? (
                <div className={`${headerStyles.header_main_wrapper}`}>
                  <div className={`${headerStyles.header_logo}`}>
                    <Link href="/">
                      <Image
                        width={100}
                        height={60}
                        src="/images/LogoRemoveBG.png"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  <div className={`${headerStyles.header_menu}`}>
                    <ul className={`${headerStyles.nav_menu}`}>
                      <li>
                        <Link href="/">Home</Link>
                      </li>
                      <li>
                        <Link href="/courses">Courses</Link>
                      </li>
                      <li>
                        <Link href="/my-course">My Courses </Link>
                      </li>
                      <li>
                        <Link href="/favorites">Favorites</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                  <div className={`${headerStyles.regis_btn}`}>
                    <Button onClick={() => setVisible(true)}>
                      Become a Mentor
                    </Button>
                    <RegisterForm
                      visible={visible}
                      setVisible={setVisible}
                      onCancel={() => {
                        setVisible(false);
                      }}
                      isEdit={true}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
