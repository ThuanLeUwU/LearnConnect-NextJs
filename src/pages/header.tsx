"use client";
import Image from "next/image";
import headerStyles from "./styles/styles.module.scss";
import "../app/./globals.css";
import Link from "next/link";
import React, { useState } from "react";
import { CourseDropDown } from "../app/test/CourseDropdown";
// import { useClient } from 'next/client';

const Header = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);

  const course = [{
    href: "/",
    title: "All Course",
  }, 
  {
    href: "/",
    title: "Course Details"
  }
]

  return (
    // <!-- Header Section Start -->
    <div className={`${headerStyles.header_section}`}>
      {/* <!-- Header Top Start --> */}
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
      {/* <!-- Header Top End --> */}

      {/* <!-- Header Main Start --> */}
      <div className="header-main ">
        <div className="container">
          {/* <!-- Header Main Start --> */}
          <div className={`${headerStyles.header_main_wrapper}`}>
            {/* <!-- Header Logo Start --> */}
            <div className={`${headerStyles.header_logo}`}>
              <a href="index.html">
                Image
              </a>
            </div>
            {/* <!-- Header Logo End --> */}

            {/* <!-- Header Menu Start --> */}
            <div className={`${headerStyles.header_menu}`}>
                            <ul className={`${headerStyles.nav_menu}`}>
                                <li>
                                    <Link href="/about">Home</Link>
                                    </li>
                                <li>
                                    <a href="#">All Course</a>
                                    <ul className={`${headerStyles.sub_menu}`}>
                                      {course.map((item,index) => (
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
                                        <li><a href="about.html">About</a></li>
                                        <li><a href="register.html">Register</a></li>
                                        <li><Link href="/login">Login</Link></li>
                                        <li><a href="faq.html">FAQ</a></li>
                                        <li><a href="404-error.html">404 Error</a></li>
                                        <li><a href="after-enroll.html">After Enroll</a></li>
                                        <li><a href="courses-admin.html">Instructor Dashboard (Course List)</a></li>
                                        <li><a href="overview.html">Instructor Dashboard (Performance)</a></li>
                                        <li><a href="students.html">Students</a></li>
                                        <li><a href="reviews.html">Reviews</a></li>
                                        <li><a href="engagement.html">Course engagement</a></li>
                                        <li><a href="traffic-conversion.html">Traffic & conversion</a></li>
                                        <li><a href="messages.html">Messages</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">Blog</a>
                                    <ul className={`${headerStyles.sub_menu}`}>
                                        <li>
                                            <a href="#">Blog</a>
                                            <ul className={`${headerStyles.sub_menu}`}>
                                                <li><a href="blog-grid.html">Blog</a></li>
                                                <li><a href="blog-left-sidebar.html">Blog Left Sidebar</a></li>
                                                <li><a href="blog-right-sidebar.html">Blog Right Sidebar</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">Blog Details</a>
                                            <ul className={`${headerStyles.sub_menu}`}>
                                                <li><a href="blog-details-left-sidebar.html">Blog Details Left Sidebar</a></li>
                                                <li><a href="blog-details-right-sidebar.html">Blog Details Right Sidebar</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>

                        </div>
            {/* <!-- Header Menu End --> */}

            {/* <!-- Header Sing In & Up Start --> */}
            <div className={`${headerStyles.header_sign_in_up}`}>
              <ul>
                <li>
                  <Link className={`${headerStyles.sign_in}`} href="/login">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link className={`${headerStyles.sign_up}`} href="register.html">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
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
