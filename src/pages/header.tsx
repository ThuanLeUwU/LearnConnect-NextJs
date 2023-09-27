"use client";
import Image from "next/image";
import headerStyles from "./styles/styles.module.scss";
import "../app/./globals.css";
import Link from "next/link";
import React, { useState } from "react";
import { CourseDropDown } from "../app/test/CourseDropdown";
import { UserAuth } from "@/app/context/AuthContext";

const Header = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const { user, googleSignIn, logOut } = UserAuth();

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

  const handleClick = () => setClick(!click);

  const course = [
    {
      href: "/",
      title: "All Course",
    },
    {
      href: "/",
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
                  All course 28% off for <a href="#">Liberian people’s.</a>
                </p>
              </div>
              {/* <!-- Header Top Left End --> */}

              {/* <!-- Header Top Medal Start --> */}
              <div className={`${headerStyles.header_top_medal}`}>
                <div className={`${headerStyles.top_info}`}>
                  <p>
                    <i className="flaticon-phone-call"></i>{" "}
                    <a href="tel:9702621413">(970) 262-1413</a>
                  </p>
                  <p>
                    <i className="flaticon-email"></i>{" "}
                    <a href="mailto:address@gmail.com">address@gmail.com</a>
                  </p>
                </div>
              </div>
              {/* <!-- Header Top Medal End --> */}

              {/* <!-- Header Top Right Start --> */}
              <div className={`${headerStyles.header_top_right}`}>
                <ul className={`${headerStyles.header_top_right_social}`}>
                  <li>
                    <a href="#">
                      <i className="flaticon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="flaticon-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="flaticon-skype"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="flaticon-instagram"></i>
                    </a>
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
            {/* <!-- Login Header Wrapper Start --> */}
            <div className="login-header-wrapper navbar navbar-expand">

                {/* <!-- Header Logo Start --> */}
                <div className="login-header-logo">
                    <a href="index.html"><img src="assets/images/logo-icon.png" alt="Logo"/></a>
                </div>
                {/* <!-- Header Logo End --> */}

                {/* <!-- Header Action Start --> */}
                <div className="login-header-action ml-auto">
                    <div className="dropdown">
                        <button className="action notification" data-bs-toggle="dropdown">
                            <i className="flaticon-notification"></i>
                            <span className="active"></span>
                        </button>
                        <div className="dropdown-menu dropdown-notification">
                            <ul className="notification-items-list">
                                <li className="notification-item">
                                    <span className="notify-icon bg-success text-white"><i className="icofont-ui-user"></i></span>
                                    <div className="dropdown-body">
                                        <a href="#">
                                            <p><strong>Martin</strong> has added a <strong>customer</strong> Successfully
                                            </p>
                                        </a>
                                    </div>
                                    <span className="notify-time">3:20 am</span>
                                </li>
                                <li className="notification-item">
                                    <span className="notify-icon bg-success text-white"><i className="icofont-shopping-cart"></i></span>
                                    <div className="dropdown-body">
                                        <a href="#">
                                            <p><strong>Jennifer</strong> purchased Light Dashboard 2.0.</p>
                                        </a>
                                    </div>
                                    <span className="notify-time">3:20 am</span>
                                </li>
                                <li className="notification-item">
                                    <span className="notify-icon bg-danger text-white"><i className="icofont-book-mark"></i></span>
                                    <div className="dropdown-body">
                                        <a href="#">
                                            <p><strong>Robin</strong> marked a <strong>ticket</strong> as unsolved.
                                            </p>
                                        </a>
                                    </div>
                                    <span className="notify-time">3:20 am</span>
                                </li>
                                <li className="notification-item">
                                    <span className="notify-icon bg-success text-white"><i className="icofont-heart-alt"></i></span>
                                    <div className="dropdown-body">
                                        <a href="#">
                                            <p><strong>David</strong> purchased Light Dashboard 1.0.</p>
                                        </a>
                                    </div>
                                    <span className="notify-time">3:20 am</span>
                                </li>
                                <li className="notification-item">
                                    <span className="notify-icon bg-success text-white"><i className="icofont-image"></i></span>
                                    <div className="dropdown-body">
                                        <a href="#">
                                            <p><strong> James.</strong> has added a<strong>customer</strong> Successfully
                                            </p>
                                        </a>
                                    </div>
                                    <span className="notify-time">3:20 am</span>
                                </li>
                            </ul>
                            <a className="all-notification" href="#">See all notifications <i className="icofont-simple-right"></i></a>
                        </div>
                    </div>

                    <a className="action author" href="#">
                        <img src="assets/images/author/author-07.jpg" alt="Author"/>
                    </a>

                    <div className="dropdown">
                        <button className="action more" data-bs-toggle="dropdown">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="" href="#"><i className="icofont-user"></i> Profile</a></li>
                            <li><a className="" href="#"><i className="icofont-inbox"></i> Inbox</a></li>
                            <li><a className="" href="#"><i className="icofont-logout"></i> Sign Out</a></li>
                        </ul>
                    </div>
                </div>
                {/* <!-- Header Action End --> */}

            </div>
            {/* <!-- Login Header Wrapper End --> */}
        </div>
      )}

      {/* <!-- Header Top End --> */}

      {/* <!-- Header Main Start --> */}
      <div className="header-main ">
        <div className="container">
          {/* <!-- Header Main Start --> */}
          <div className={`${headerStyles.header_main_wrapper}`}>
            {/* <!-- Header Logo Start --> */}
            <div className={`${headerStyles.header_logo}`}>
              <a href="index.html">Image</a>
            </div>
            {/* <!-- Header Logo End --> */}

            {/* <!-- Header Menu Start --> */}
            <div className={`${headerStyles.header_menu}`}>
              <ul className={`${headerStyles.nav_menu}`}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <a href="#">All Course</a>
                  <ul className={`${headerStyles.sub_menu}`}>
                    {course.map((item, index) => (
                      <li key={index}>
                        <Link href={item.href}>{item.title}</Link>
                      </li>
                    ))}
                    {/* <li><a href="courses.html">Courses</a></li>
                                        <li><a href="courses-details.html">Courses Details</a></li> */}
                  </ul>
                </li>
                <li>
                  <a href="#">Pages </a>
                  <ul className={`${headerStyles.sub_menu}`}>
                    <li>
                      <a href="about.html">About</a>
                    </li>
                    <li>
                      <a href="register.html">Register</a>
                    </li>
                    <li>
                      <Link href="/login">Login</Link>
                    </li>
                    <li>
                      <a href="faq.html">FAQ</a>
                    </li>
                    <li>
                      <a href="404-error.html">404 Error</a>
                    </li>
                    <li>
                      <a href="after-enroll.html">After Enroll</a>
                    </li>
                    <li>
                      <a href="courses-admin.html">
                        Instructor Dashboard (Course List)
                      </a>
                    </li>
                    <li>
                      <a href="overview.html">
                        Instructor Dashboard (Performance)
                      </a>
                    </li>
                    <li>
                      <a href="students.html">Students</a>
                    </li>
                    <li>
                      <a href="reviews.html">Reviews</a>
                    </li>
                    <li>
                      <a href="engagement.html">Course engagement</a>
                    </li>
                    <li>
                      <a href="traffic-conversion.html">Traffic & conversion</a>
                    </li>
                    <li>
                      <a href="messages.html">Messages</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Blog</a>
                  <ul className={`${headerStyles.sub_menu}`}>
                    <li>
                      <a href="#">Blog</a>
                      <ul className={`${headerStyles.sub_menu}`}>
                        <li>
                          <a href="blog-grid.html">Blog</a>
                        </li>
                        <li>
                          <a href="blog-left-sidebar.html">Blog Left Sidebar</a>
                        </li>
                        <li>
                          <a href="blog-right-sidebar.html">
                            Blog Right Sidebar
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Blog Details</a>
                      <ul className={`${headerStyles.sub_menu}`}>
                        <li>
                          <a href="blog-details-left-sidebar.html">
                            Blog Details Left Sidebar
                          </a>
                        </li>
                        <li>
                          <a href="blog-details-right-sidebar.html">
                            Blog Details Right Sidebar
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            {/* <!-- Header Menu End --> */}
            {!user ? (
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
            ) : (
              <div>
                <p className="text-black ">Wellcome, {user.displayName}</p>
                <a
                  onClick={handleSignOut}
                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-white text-[#309255] hover:bg-[#309255] btn-outline w-full border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                >
                  Logout
                </a>
              </div>
            )}
            {/* <!-- Header Sing In & Up Start --> */}

            {/* <!-- Header Sing In & Up End --> */}

            {/* <!-- Header Mobile Toggle Start --> */}
            <div className="header-toggle d-lg-none">
              <a className="menu-toggle" href="javascript:void(0)">
                <span></span>
                <span></span>
                <span></span>
              </a>
            </div>
            {/* <!-- Header Mobile Toggle End --> */}
          </div>
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
