import Image from "next/image";
import styles from "../login/styles.module.scss";
import React, { useState } from "react";

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState("tab-0");
  const changeTab = (tabId: string) => {
    // Specify the type of tabId as string
    setActiveTab(tabId); // Set the active tab when a tab is clicked
  };
  return (
    <div className="contain-wrapper">
      <div className="bg-[#fff]">
        <div className="container mx-auto max-w-screen-xl">
          <div className="grid cols-2 lg:grid-cols-12 py-20">
            <div className="lg:col-span-8 lg:cols-span-2 max-w-3xl px-6 mx-auto">
              <img
                src="./courses-details.jpg"
                alt="course-detail"
                className="rounded-md"
              />
              <h2 className="text-[#212832] mt-8 text-2xl font-medium">
                Finance & Investment Series: Learn to Budget and Calculate Your
                Net Worth.
              </h2>
              <div className="courses-details-admin text-[#212832] flex justify-between items-center pt-2.5">
                <div className="admin-author flex items-center">
                  <div className="w-12 h-12 ">
                    <img
                      src="./author-01.jpg"
                      alt="Author"
                      className="rounded-full"
                    />
                  </div>
                  <div className="author-content">
                    <a className="text-base pl-4 pb-1.5" href="#">
                      Pamela Foster
                    </a>
                    <span className="mx-5"></span>
                    <span className="text-sm font-normal text-[#309255]">
                      286 Enrolled Students
                    </span>
                  </div>
                </div>
                <div className="admin-rating">
                  <span className="font-medium text-sm">4.9</span>
                  <span className="rating-star">
                    <span className="rating-bar"></span>
                  </span>
                  <span className="text-sm text-[#52565b] font-normal">
                    (5,764 Rating)
                  </span>
                </div>
              </div>
              <div className="pt-7 text-[#212832] ">
                <ul
                  className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400"
                  id="tabList"
                >
                  <li className="mr-2">
                    <a
                      href="#"
                      className={`inline-block px-4 py-3 rounded-lg ${
                        activeTab === "tab-0"
                          ? "bg-blue-600 text-white"
                          : "text-white bg-blue-600 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                      }`}
                      aria-current={activeTab === "tab-0" ? "page" : undefined}
                      onClick={() => changeTab("tab-0")}
                    >
                      Tab 1
                    </a>
                  </li>
                  <li className="mr-2">
                    <a
                      href="#"
                      className={`inline-block px-4 py-3 rounded-lg ${
                        activeTab === "tab-1"
                          ? "bg-blue-600 text-white"
                          : "text-white bg-blue-600 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                      }`}
                      aria-current={activeTab === "tab-1" ? "page" : undefined}
                      onClick={() => changeTab("tab-1")}
                    >
                      Tab 2
                    </a>
                  </li>
                  {/* ... Add similar code for other tabs */}
                </ul>

                <div className="tab-content">
                  <div
                    className={`tab-pane ${
                      activeTab === "tab-0" ? "active" : ""
                    }`}
                    id="tab-0"
                  >
                    Content for Tab 1
                  </div>
                  <div
                    className={`tab-pane ${
                      activeTab === "tab-1" ? "active" : ""
                    }`}
                    id="tab-1"
                  >
                    Content for Tab 2
                  </div>
                  {/* ... Add similar code for other tab content */}
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 max-w-sm">
              <div className="border rounded-lg border-solid border-opacity-20 border-green-600 rounded-10 bg-[#e7f8ee] pt-7 pl-7 pr-7 pb-9">
                <div className="sidebar-widget widget-information">
                  <div className="text-center py-3.5">
                    <span className="text-[#309255] text-3xl font-bold">
                      $420.38
                    </span>
                  </div>
                  <div className=" text-black">
                    <ul className="py-15">
                      <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                        <i className="icofont-man-in-glasses"></i>{" "}
                        <strong className="text-[#212832] text-base font-medium">
                          Instructor
                        </strong>{" "}
                        <span className="text-[#52565b] float-right text-base font-normal">
                          Pamela Foster
                        </span>
                      </li>
                      <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                        <i className="icofont-clock-time"></i>{" "}
                        <strong className="text-[#212832] text-base font-medium">
                          Duration
                        </strong>{" "}
                        <span className="text-[#52565b] float-right text-base font-normal">
                          08 hr 15 mins
                        </span>
                      </li>
                      <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                        <i className="icofont-ui-video-play"></i>{" "}
                        <strong className="text-[#212832] text-base font-medium">
                          Lectures
                        </strong>{" "}
                        <span className="text-[#52565b] float-right text-base font-normal">
                          29
                        </span>
                      </li>
                      <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                        <i className="icofont-bars"></i>{" "}
                        <strong className="text-[#212832] text-base font-medium">
                          Level
                        </strong>{" "}
                        <span className="text-[#52565b] float-right text-base font-normal">
                          Secondary
                        </span>
                      </li>
                      <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                        <i className="icofont-book-alt"></i>{" "}
                        <strong className="text-[#212832] text-base font-medium">
                          Language
                        </strong>{" "}
                        <span className="text-[#52565b] float-right text-base font-normal">
                          English
                        </span>
                      </li>
                      <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                        <i className="icofont-certificate-alt-1"></i>{" "}
                        <strong className="text-[#212832] text-base font-medium">
                          Certificate
                        </strong>{" "}
                        <span className="text-[#52565b] float-right text-base font-normal">
                          Yes
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <a
                      href="#"
                      className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-[#309255] text-white hover:bg-black btn-outline w-44 border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                    >
                      Enroll Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="sidebar-widget">
                <h4 className="widget-title">Share Course:</h4>

                <ul className="social">
                  <li>
                    <a href="#">
                      <i className="flaticon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="flaticon-linkedin"></i>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
