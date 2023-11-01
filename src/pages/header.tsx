"use client";
import Image from "next/image";
import headerStyles from "./styles/styles.module.scss";
import "../app/./globals.css";
import Link from "next/link";
import React, { useState } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import { Button } from "react-bootstrap";
import { RegisterForm } from "@/components/registerForm";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

const Header = () => {
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const { role, user, googleSignIn, logOut } = UserAuth();

  console.log("user", role);

  // console.log("tui ne", user?.photoURL);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      closeDropdown();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user);

  // const onMouseEnter = () => {
  //   if (window.innerWidth < 960) {
  //     setDropdown(false);
  //   } else {
  //     setDropdown(true);
  //   }
  // };

  // const onMouseLeave = () => {
  //   if (window.innerWidth < 960) {
  //     setDropdown(false);
  //   } else {
  //     setDropdown(false);
  //   }
  // };
  const handleClickTransaction = () => {
    router.push("/transaction");
  };

  const handleClick = () => setClick(!click);

  const course = [
    {
      href: "/",
      title: "All Course",
    },
    {
      href: "/course-detail",
      title: "Course Details",
    },
  ];

  return (
    // <!-- Header Section Start -->
    <div className={`${headerStyles.header_section}`}>
      {/* <!-- Header Top Start --> */}
      {!user ? (
        <div className={`${headerStyles.header_top}`}>
          <div className="container">
            {/* <!-- Header Top Wrapper Start --> */}
            <div className={`${headerStyles.header_top_wrapper}`}>
              {/* <!-- Header Top Left Start --> */}
              <div className={`${headerStyles.header_top_left}`}>
                <p>
                  All course 28% off for{" "}
                  <Link href="#">Liberian people’s.</Link>
                </p>
              </div>
              {/* <!-- Header Top Left End --> */}

              {/* <!-- Header Top Medal Start --> */}
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
              {/* <!-- Header Top Medal End --> */}

              {/* <!-- Header Top Right Start --> */}
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
              {/* <!-- Header Top Right End --> */}
            </div>
            {/* <!-- Header Top Wrapper End --> */}
          </div>
        </div>
      ) : (
        <div className={`${headerStyles.header_login}`}>
          <div className={`${headerStyles.header_navbar}`}>
            <div className={`${headerStyles.header_login_left}`}>
              <Link href="/">
                <Image
                  width={60}
                  height={40}
                  src="/images/logo (2).png"
                  alt="Logo"
                />
              </Link>
            </div>
            <ul className={`${headerStyles.header_login_right}`}>
              <li className={`${headerStyles.header_notification}`}>
                <Image
                  width={32}
                  height={32}
                  src="/images/notification.png"
                  alt={"Logo"}
                />
              </li>
              <li className={`${headerStyles.header_info_img}`}></li>
              <li>
                <button
                  className={`${headerStyles.header_more}`}
                  onClick={toggleDropdown}
                >
                  <img
                    className={`${headerStyles.header_info_src}`}
                    src={user?.photoURL || "www.default.imageurl"}
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
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-bl-lg rounded-br-lg hover:rounded-tl-lg hover:rounded-tr-lg"
                          onClick={() => {
                            closeDropdown();
                            handleClickTransaction();
                          }}
                        >
                          Transaction
                        </a>
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

      {/* <!-- Header Top End --> */}

      {/* <!-- Header Main Start --> */}
      <div className="header-main ">
        <div className="container">
          {/* <!-- Header Main Start --> */}
          {!user ? (
            <div className={`${headerStyles.header_main_wrapper}`}>
              {/* <!-- Header Logo Start --> */}
              <div className={`${headerStyles.header_logo}`}>
                <Link href="/">
                  <Image
                    width={120}
                    height={100}
                    src="/images/logo (2).png"
                    alt="logo"
                  />
                </Link>
              </div>
              {/* <!-- Header Logo End --> */}

              {/* <!-- Header Menu Start --> */}
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
                    {/* <ul className={`${headerStyles.sub_menu}`}>
                    <li>
                      <Link href="#">Blog</Link>
                      <ul className={`${headerStyles.sub_menu}`}>
                        <li>
                          <Link href="blog-grid.html">Blog</Link>
                        </li>
                        <li>
                          <Link href="blog-left-sidebar.html">
                            Blog Left Sidebar
                          </Link>
                        </li>
                        <li>
                            <Link href="blog-right-sidebar.html">
                              Blog Right Sidebar
                            </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="#">Blog Details</Link>
                      <ul className={`${headerStyles.sub_menu}`}>
                        <li>
                            <Link href="blog-details-left-sidebar.html">
                              Blog Details Left Sidebar
                            </Link>
                        </li>
                        <li>
                            <Link href="blog-details-right-sidebar.html">
                              Blog Details Right Sidebar
                            </Link>
                        </li>
                      </ul>
                    </li>
                  </ul> */}
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
              {/* <!-- Header Menu End --> */}
              {/* <!-- Header Sing In & Up Start --> */}

              {/* <!-- Header Sing In & Up End --> */}

              {/* <!-- Header Mobile Toggle Start --> */}
              {/* <div className="header-toggle d-lg-none">
              <Link className="menu-toggle" href="javascript:void(0)">
                <span></span>
                <span></span>
                <span></span>
              </Link>
            </div> */}
              {/* <!-- Header Mobile Toggle End --> */}
            </div>
          ) : (
            <>
              {role == 3 ? (
                <div className={`${headerStyles.header_main_wrapper}`}>
                  {/* <!-- Header Logo Start --> */}
                  <div className={`${headerStyles.header_logo}`}>
                    <Link href="/">
                      <Image
                        width={60}
                        height={60}
                        src="/images/logo (2).png"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  {/* <!-- Header Logo End --> */}

                  {/* <!-- Header Menu Start --> */}
                  <div className={`${headerStyles.header_menu}`}>
                    <ul className={`${headerStyles.nav_menu}`}>
                      <li>
                        <Link href="/">Home</Link>
                      </li>
                      <li>
                        <Link href="/courses">Courses</Link>
                        {/* <ul className={`${headerStyles.sub_menu}`}>
                      {course.map((item, index) => (
                        <li key={index}>
                          <Link href={item.href}>{item.title}</Link>
                        </li>
                      ))}
                    </ul> */}
                      </li>
                      <li>
                        <Link href="/my-course">My Courses </Link>
                      </li>
                      <li>
                        <Link href="/favorites">Favorites</Link>
                        {/* <ul className={`${headerStyles.sub_menu}`}>
                      <li>
                        <Link href="#">Contact</Link>
                        <ul className={`${headerStyles.sub_menu}`}>
                          <li>
                            <Link href="blog-grid.html">Blog</Link>
                          </li>
                          <li>
                            <Link href="blog-left-sidebar.html">
                              Blog Left Sidebar
                            </Link>
                          </li>
                          <li>
                            <Link href="blog-right-sidebar.html">
                              Blog Right Sidebar
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="#">Blog Details</Link>
                        <ul className={`${headerStyles.sub_menu}`}>
                          <li>
                            <Link href="blog-details-left-sidebar.html">
                              Blog Details Left Sidebar
                            </Link>
                          </li>
                          <li>
                            <Link href="blog-details-right-sidebar.html">
                              Blog Details Right Sidebar
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul> */}
                      </li>
                      <li>
                        <Link href="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- Header Menu End --> */}
                  {/* <!-- Header Sing In & Up Start --> */}

                  <div className={`${headerStyles.regis_btn}`}>
                    {/* <Button
                  onClick={() => {
                    Modal.confirm({
                      title: "Register Mentor Form",
                      content: (
                        <RegisterForm
                          visible={visible}
                          setVisible={setVisible}
                          onCancel={() => {
                            setVisible(false);
                          }}
                          isEdit={true}
                        />
                      ),
                    });
                  }}
                >
                  Become a Mentor
                </Button> */}
                    <Button
                      // danger
                      // type="primary"
                      onClick={() => setVisible(true)}
                    >
                      {/* <Image
                    width={40}
                    height={40}
                    src="/menu-icon/flag-icon.jpg"
                    alt="flag"
                  /> */}
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
                  {/* <!-- Header Sing In & Up End --> */}

                  {/* <!-- Header Mobile Toggle Start --> */}
                  {/* <div className="header-toggle d-lg-none">
                <Link className="menu-toggle" href="javascript:void(0)">
                  <span></span>
                  <span></span>
                  <span></span>
                </Link>
              </div> */}
                  {/* <!-- Header Mobile Toggle End --> */}
                </div>
              ) : (
                <></>
              )}
            </>
          )}
          {/* <!-- Header Main End --> */}
        </div>
      </div>
      {/* <!-- Header Main End --> */}
      {/* <!-- Overlay Start --> */}
      {/* <div className="overlay"></div> */}
      {/* <!-- Overlay End --> */}
    </div>
  );
};

export default Header;
