"use client";

import { http } from "@/api/http";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserAuth } from "@/app/context/AuthContext";
import Modal from "@mui/material/Modal";
import { type } from "os";

// export type Report = {
//   reportInfo: any;
//   id: number;
//   rating1: number;
//   description: string | null;
//   timeStamp: string;
//   status: number;
//   ratingBy: number;
//   courseId: number;
//   mentorId: number;
//   reportType: any;
//   userReportInfo: {
//     fullName: string;
//     imageUser: string;
//   };
// };

interface Report {
  reportDetails: {
    id: number;
    reportType: string;
    description: string | null;
    imageUrl: string | null;
    timeStamp: string;
    reportBy: number;
    courseId: number | null;
    mentorId: number | null;
  };
  userReportInfo: {
    id: number;
    password: string;
    email: string;
    role: number;
    fullName: string;
    dob: string | null;
    phoneNumber: string;
    gender: number;
    registrationDate: string;
    lastLoginDate: string | null;
    bioDescription: string;
    profilePictureUrl: string;
    status: number;
  };
}

interface CourseInfo {
  courseDetails: {
    id: number;
    name: string;
    description: string;
    shortDescription: string;
    imageUrl: string;
    price: number;
    totalEnrollment: number;
    lectureCount: number;
    contentLength: number;
    averageRating: number;
    createDate: string;
    status: number;
    specializationId: number;
    mentorId: number | null;
  };
  reportCount: number;
  reports: Report[];
}

interface MentorInfo {
  mentorDetails: {
    id: number;
    description: string;
    averageRating: number;
    accountNumber: string;
    bankName: string;
    status: number;
    userId: number;
  };
  user: {
    id: number;
    password: string;
    email: string;
    role: number;
    fullName: string;
    dob: string | null;
    phoneNumber: string;
    gender: number;
    registrationDate: string;
    lastLoginDate: string | null;
    bioDescription: string;
    profilePictureUrl: string;
    status: number;
  };
  reportCount: number;
  reports: Report[];
}

interface ApiResponse {
  courseInfo: CourseInfo | null;
  mentorInfo: MentorInfo | null;
}

const StaffReportTable = () => {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("course");

  const handleTabClick = (tabName: string, type: string) => {
    setActiveTab(tabName);
    setSelectedType(type);
  };
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse[]>(
          `https://learnconnectapitest.azurewebsites.net/api/report/all-list-reports?reportType=${selectedType}`
        );
        setData(response.data);
        console.log("response.data", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedType]);

  return (
    <div className="w-full mt-4">
      <div className="text-start font-semibold text-5xl pb-5 pl-5">Reports</div>
      <div className="flex justify-center bg-[#e7f8ee] py-4 rounded-md">
        <ul className="tabs flex space-x-5">
          <li
            className={`cursor-pointer rounded-md ${
              activeTab === "tab1" ? "bg-[#309255] text-white" : "bg-white"
            }`}
            onClick={() => handleTabClick("tab1", "course")}
          >
            <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
              Course report
            </button>
          </li>
          <li
            className={`cursor-pointer rounded-md ${
              activeTab === "tab2" ? "bg-[#309255] text-white" : "bg-white"
            }`}
            onClick={() => handleTabClick("tab2", "mentor")}
          >
            <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
              Mentor report
            </button>
          </li>
          {/* <li
            className={`cursor-pointer rounded-md ${
              activeTab === "tab3" ? "bg-[#309255] text-white" : "bg-white"
            }`}
            onClick={() => handleTabClick("tab3")}
          >
            <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
              Reviews
            </button>
          </li> */}
        </ul>
      </div>

      <div className="tab-content">
        {activeTab === "tab1" && (
          <div className="tab-reviews">
            <div className="reviews-wrapper reviews-active">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <button className="w-full">
                    {data &&
                      data.length > 0 &&
                      data.map((item, index) => {
                        return (
                          <div key={index}>
                            {item.courseInfo && (
                              <div
                                className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-5 rounded-md mx-5 hover:bg-[#e7f8ee] shadow-lg"
                                onClick={() => {
                                  if (
                                    item.courseInfo &&
                                    item.courseInfo.courseDetails.id
                                  ) {
                                    router.push(
                                      `/staff-page/staff-report/${item.courseInfo.courseDetails.id}?target=course`
                                    );
                                  }
                                }}
                              >
                                <div className="review-author flex justify-between">
                                  <div className="flex flex-row">
                                    <div className="author-thumb p-2 rounded-full">
                                      <img
                                        src={
                                          item.courseInfo.courseDetails.imageUrl
                                        }
                                        alt="Author"
                                        className="w-32 h-32 rounded-lg"
                                      />
                                    </div>
                                    <div className="author-content pl-4 flex flex-col">
                                      <div className="font-bold text-xl">
                                        <p>
                                          {item.courseInfo.courseDetails.name}
                                        </p>
                                      </div>
                                      <div className="text-xl">
                                        <p className="flex">
                                          {item.courseInfo.reportCount} Reports
                                        </p>
                                      </div>

                                      {/* <span className="text-[#309255] font-light">
                                        {item.courseInfo.courseDetails.createDate
                                          ? new Date(
                                              item.courseInfo.courseDetails.createDate
                                            ).toLocaleTimeString("en-US")
                                          : ""}{" "}
                                        {item.courseInfo.courseDetails.createDate
                                          ? new Date(
                                              item.courseInfo.courseDetails.createDate
                                            ).toLocaleDateString("en-GB", {
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric",
                                            })
                                          : ""}
                                      </span> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </button>
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
                  <button className="w-full">
                    {data &&
                      data.length > 0 &&
                      data.map((item, index) => {
                        return (
                          <div key={index}>
                            {item.mentorInfo && (
                              <div
                                className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-5 rounded-md mx-5 hover:bg-[#e7f8ee]"
                                onClick={() => {
                                  if (
                                    item.mentorInfo &&
                                    item.mentorInfo.mentorDetails.id
                                  ) {
                                    router.push(
                                      `/staff-page/staff-report/${item.mentorInfo.mentorDetails.id}?target=mentor`
                                    );
                                  }
                                }}
                              >
                                <div className="review-author flex justify-between">
                                  <div className="flex flex-row">
                                    <div className="author-thumb p-2 rounded-full">
                                      <img
                                        src={
                                          item.mentorInfo.user.profilePictureUrl
                                        }
                                        alt="Author"
                                        className="w-32 h-32 rounded-full border border-opacity-20 border-[#309255] "
                                      />
                                    </div>
                                    <div className="author-content pl-4 flex flex-col">
                                      <div className="font-bold text-xl">
                                        {item.mentorInfo.user.fullName}
                                      </div>
                                      <div className="font-bold text-xl">
                                        {item.mentorInfo.user.email}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </button>
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "tab3" && <div className="tab-reviews"></div>}
      </div>
    </div>
  );
};

export default StaffReportTable;
