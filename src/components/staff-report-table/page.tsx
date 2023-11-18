"use client";

import { http } from "@/api/http";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type Report = {
  reportInfo: any;
  id: number;
  rating1: number;
  description: string | null;
  timeStamp: string;
  status: number;
  ratingBy: number;
  courseId: number;
  mentorId: number;
  reportType: any;
  userReportInfo: {
    fullName: string;
    imageUser: string;
  };
};

const StaffReportTable = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedType, setSelectedType] = useState("all");
  const handleTabClick = (tabName: string, type: string) => {
    setActiveTab(tabName);
    setSelectedType(type);
  };
  const [report, setReport] = useState<Report[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await http.get(
        `https://learnconnectapitest.azurewebsites.net/api/report/allListReports?reportType=${selectedType}`
      );
      setReport(responseData?.data);
    };
    fetchData();
  }, [selectedType]);

  return (
    <div className="w-full">
      <div>
        <div className=" text-[#212832] ">
          <div className="flex justify-center bg-[#e7f8ee] py-4 rounded-md">
            <ul className="tabs flex space-x-5 ">
              <li
                className={`cursor-pointer rounded-md ${
                  activeTab === "tab1" ? "bg-[#309255] text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick("tab1", "all")}
              >
                <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                  All Reports
                </button>
              </li>
              <li
                className={`cursor-pointer rounded-md ${
                  activeTab === "tab2" ? "bg-[#309255] text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick("tab2", "course")}
              >
                <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                  Courses Reports
                </button>
              </li>
              <li
                className={`cursor-pointer rounded-md ${
                  activeTab === "tab3" ? "bg-[#309255] text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick("tab3", "mentor")}
              >
                <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                  Mentors Reports
                </button>
              </li>
            </ul>
          </div>

          <div className="tab-content">
            {activeTab === "tab1" && (
              <div className="tab-reviews">
                <div className="reviews-wrapper reviews-active">
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      {report &&
                        report.length > 0 &&
                        report.map((item) => {
                          return (
                            <>
                              <div
                                key={item.id}
                                className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-7 rounded-md mx-5"
                              >
                                <div className="review-author flex justify-between">
                                  <div className="flex flex-row">
                                    <div className="author-thumb p-2 rounded-full">
                                      <img
                                        src={item.userReportInfo.imageUser}
                                        alt="Author"
                                        className="w-16 h-16 rounded-full"
                                      />
                                    </div>
                                    <div className="author-content pl-4 flex flex-col justify-center">
                                      <div className=" font-bold text-xl">
                                        {item.userReportInfo.fullName}
                                      </div>
                                      <span className=" text-[#309255] font-light">
                                        {item.reportInfo.timeStamp
                                          ? new Date(
                                              item.reportInfo.timeStamp
                                            ).toLocaleTimeString("en-US")
                                          : ""}{" "}
                                        {item.reportInfo.timeStamp
                                          ? new Date(
                                              item.reportInfo.timeStamp
                                            ).toLocaleDateString("en-GB", {
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric",
                                            })
                                          : ""}{" "}
                                      </span>
                                      <div className=" font-normal text-lg">
                                        {item.reportInfo.reportType}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {item.reportInfo.description == "null" ? (
                                  <></>
                                ) : (
                                  <p className="mt-3 font-semibold text-[#52565b] ">
                                    {item.reportInfo.description}
                                  </p>
                                )}
                              </div>
                            </>
                          );
                        })}
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "tab2" && (
              <div className="tab-reviews">
                <div className="reviews-wrapper reviews-active">
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      {report &&
                        report.length > 0 &&
                        report.map((item) => {
                          return (
                            <>
                              <div className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-7 rounded-md mx-5">
                                <div className="review-author flex justify-between">
                                  <div className="flex flex-row">
                                    <div className="author-thumb p-2 rounded-full">
                                      <img
                                        src={item.userReportInfo.imageUser}
                                        alt="Author"
                                        className="w-16 h-16 rounded-full"
                                      />
                                    </div>
                                    <div className="author-content pl-4 flex flex-col justify-center">
                                      <div className=" font-bold text-xl">
                                        {item.userReportInfo.fullName}
                                      </div>
                                      <span className=" text-[#309255] font-light">
                                        {item.reportInfo.timeStamp
                                          ? new Date(
                                              item.reportInfo.timeStamp
                                            ).toLocaleTimeString("en-US")
                                          : ""}{" "}
                                        {item.reportInfo.timeStamp
                                          ? new Date(
                                              item.reportInfo.timeStamp
                                            ).toLocaleDateString("en-GB", {
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric",
                                            })
                                          : ""}{" "}
                                      </span>
                                      <div className=" font-normal text-lg">
                                        {item.reportInfo.reportType}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {item.reportInfo.description == "null" ? (
                                  <></>
                                ) : (
                                  <p className="mt-3 font-semibold text-[#52565b] ">
                                    {item.reportInfo.description}
                                  </p>
                                )}
                              </div>
                            </>
                          );
                        })}
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "tab3" && (
              <div className="tab-reviews">
                <div className="reviews-wrapper reviews-active">
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      {report &&
                        report.length > 0 &&
                        report.map((item) => {
                          return (
                            <>
                              <div className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-7 rounded-md mx-5">
                                <div className="review-author flex justify-between">
                                  <div className="flex flex-row">
                                    <div className="author-thumb p-2 rounded-full">
                                      <img
                                        src={item.userReportInfo.imageUser}
                                        alt="Author"
                                        className="w-16 h-16 rounded-full"
                                      />
                                    </div>
                                    <div className="author-content pl-4 flex flex-col justify-center">
                                      <div className=" font-bold text-xl">
                                        {item.userReportInfo.fullName}
                                      </div>
                                      <span className=" text-[#309255] font-light">
                                        {item.reportInfo.timeStamp
                                          ? new Date(
                                              item.reportInfo.timeStamp
                                            ).toLocaleTimeString("en-US")
                                          : ""}{" "}
                                        {item.reportInfo.timeStamp
                                          ? new Date(
                                              item.reportInfo.timeStamp
                                            ).toLocaleDateString("en-GB", {
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric",
                                            })
                                          : ""}{" "}
                                      </span>
                                      <div className=" font-normal text-lg">
                                        {item.reportInfo.reportType}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {item.reportInfo.description == "null" ? (
                                  <></>
                                ) : (
                                  <p className="mt-3 font-semibold text-[#52565b] ">
                                    {item.reportInfo.description}
                                  </p>
                                )}
                              </div>
                            </>
                          );
                        })}
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffReportTable;
