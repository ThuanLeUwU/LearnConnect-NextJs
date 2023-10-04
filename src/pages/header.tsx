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
  const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

  const { user, googleSignIn, logOut } = UserAuth();

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
                  All course 28% off for <Link href="#">Liberian people’s.</Link>
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
                    <Link href="mailto:address@gmail.com">address@gmail.com</Link>
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
        // <div className={`${headerStyles.header_login}`}>
        //     {/* <!-- Login Header Wrapper Start --> */}
        //     <div className="login-header-wrapper navbar navbar-expand">

        //         {/* <!-- Header Logo Start --> */}
        //         <div className="login-header-logo">
        //             <Link href="index.html">
        //               {/* <img src="assets/images/logo-icon.png" alt="Logo"/> */}
        //               </Link>
        //         </div>
        //         {/* <!-- Header Logo End --> */}

        //         {/* <!-- Header Action Start --> */}
        //         <div className="login-header-action ml-auto">
        //             <div className="dropdown">
        //                 <button className="action notification" data-bs-toggle="dropdown">
        //                     <i className="flaticon-notification"></i>
        //                     <span className="active"></span>
        //                 </button>
        //                 <div className="dropdown-menu dropdown-notification">
        //                     <ul className="notification-items-list">
        //                         <li className="notification-item">
        //                             <span className="notify-icon bg-success text-white"><i className="icofont-ui-user"></i></span>
        //                             <div className="dropdown-body">
        //                                 <Link href="#">
        //                                     <p><strong>Martin</strong> has added a <strong>customer</strong> Successfully
        //                                     </p>
        //                                 </Link>
        //                             </div>
        //                             <span className="notify-time">3:20 am</span>
        //                         </li>
        //                         <li className="notification-item">
        //                             <span className="notify-icon bg-success text-white"><i className="icofont-shopping-cart"></i></span>
        //                             <div className="dropdown-body">
        //                                 <Link href="#">
        //                                     <p><strong>Jennifer</strong> purchased Light Dashboard 2.0.</p>
        //                                 </Link>
        //                             </div>
        //                             <span className="notify-time">3:20 am</span>
        //                         </li>
        //                         <li className="notification-item">
        //                             <span className="notify-icon bg-danger text-white"><i className="icofont-book-mark"></i></span>
        //                             <div className="dropdown-body">
        //                                 <Link href="#">
        //                                     <p><strong>Robin</strong> marked a <strong>ticket</strong> as unsolved.
        //                                     </p>
        //                                 </Link>
        //                             </div>
        //                             <span className="notify-time">3:20 am</span>
        //                         </li>
        //                         <li className="notification-item">
        //                             <span className="notify-icon bg-success text-white"><i className="icofont-heart-alt"></i></span>
        //                             <div className="dropdown-body">
        //                                 <Link href="#">
        //                                     <p><strong>David</strong> purchased Light Dashboard 1.0.</p>
        //                                 </Link>
        //                             </div>
        //                             <span className="notify-time">3:20 am</span>
        //                         </li>
        //                         <li className="notification-item">
        //                             <span className="notify-icon bg-success text-white"><i className="icofont-image"></i></span>
        //                             <div className="dropdown-body">
        //                                 <Link href="#">
        //                                     <p><strong> James.</strong> has added a<strong>customer</strong> Successfully
        //                                     </p>
        //                                 </Link>
        //                             </div>
        //                             <span className="notify-time">3:20 am</span>
        //                         </li>
        //                     </ul>
        //                     <Link className="all-notification" href="#">See all notifications <i className="icofont-simple-right"></i></Link>
        //                 </div>
        //             </div>

        //             <Link className="action author" href="#">
        //                 <img src="assets/images/author/author-07.jpg" alt="Author"/>
        //             </Link>

        //             <div className="dropdown">
        //                 <button className="action more" data-bs-toggle="dropdown">
        //                     <span></span>
        //                     <span></span>
        //                     <span></span>
        //                 </button>
        //                 <ul className="dropdown-menu">
        //                     <li><Link className="" href="#"><i className="icofont-user"></i> Profile</Link></li>
        //                     <li><Link className="" href="#"><i className="icofont-inbox"></i> Inbox</Link></li>
        //                     <li><Link className="" href="#"><i className="icofont-logout"></i> Sign Out</Link></li>
        //                 </ul>
        //             </div>
        //         </div>
        //         {/* <!-- Header Action End --> */}

        //     </div>
        //     {/* <!-- Login Header Wrapper End --> */}
        // </div>
        <div className={`${headerStyles.header_login}`}>
          <div className={`${headerStyles.header_navbar}`}>
            <div className={`${headerStyles.header_login_left}`}>
              <Link href="/">
                <img src=""/>
              </Link>
            </div>
          <ul className={`${headerStyles.header_login_right}`}>
              <li className={`${headerStyles.header_notification}`}>hehe</li>
              <li className={`${headerStyles.header_info_img}`}> 
                <img className={`${headerStyles.header_info_src}`} 
                src={user?.photoURL || 'www.default.imageurl'}
                 alt="author"></img>
              </li>
              <li>
                  <button className={`${headerStyles.header_more}`} onClick={toggleDropdown}/>
                  {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}
                                >
                                    Option 2
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
          <div className={`${headerStyles.header_main_wrapper}`}>
            {/* <!-- Header Logo Start --> */}
            <div className={`${headerStyles.header_logo}`}>
              <Link href="/">Image</Link>
            </div>
            {/* <!-- Header Logo End --> */}

            {/* <!-- Header Menu Start --> */}
            <div className={`${headerStyles.header_menu}`}>
              <ul className={`${headerStyles.nav_menu}`}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="#">All Course</Link>
                  <ul className={`${headerStyles.sub_menu}`}>
                    {course.map((item, index) => (
                      <li key={index}>
                        <Link href={item.href}>{item.title}</Link>
                      </li>
                    ))}
                    {/* <li><Link href="courses.html">Courses</Link></li>
                                        <li><Link href="courses-details.html">Courses Details</Link></li> */}
                  </ul>
                </li>
                <li>
                  <Link href="#">Pages </Link>
                  <ul className={`${headerStyles.sub_menu}`}>
                    <li>
                      <Link href="about.html">About</Link>
                    </li>
                    <li>
                      <Link href="register.html">Register</Link>
                    </li>
                    <li>
                      <Link href="/login">Login</Link>
                    </li>
                    <li>
                      <Link href="faq.html">FAQ</Link>
                    </li>
                    <li>
                      <Link href="404-error.html">404 Error</Link>
                    </li>
                    <li>
                      <Link href="after-enroll.html">After Enroll</Link>
                    </li>
                    <li>
                      <Link href="courses-admin.html">
                        Instructor Dashboard (Course List)
                      </Link>
                    </li>
                    <li>
                      <Link href="overview.html">
                        Instructor Dashboard (Performance)
                      </Link>
                    </li>
                    <li>
                      <Link href="students.html">Students</Link>
                    </li>
                    <li>
                      <Link href="reviews.html">Reviews</Link>
                    </li>
                    <li>
                      <Link href="engagement.html">Course engagement</Link>
                    </li>
                    <li>
                      <Link href="traffic-conversion.html">Traffic & conversion</Link>
                    </li>
                    <li>
                      <Link href="messages.html">Messages</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="#">Blog</Link>
                  <ul className={`${headerStyles.sub_menu}`}>
                    <li>
                      <Link href="#">Blog</Link>
                      <ul className={`${headerStyles.sub_menu}`}>
                        <li>
                          <Link href="blog-grid.html">Blog</Link>
                        </li>
                        <li>
                          <Link href="blog-left-sidebar.html">Blog Left Sidebar</Link>
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
              <Link className="menu-toggle" href="javascript:void(0)">
                <span></span>
                <span></span>
                <span></span>
              </Link>
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
