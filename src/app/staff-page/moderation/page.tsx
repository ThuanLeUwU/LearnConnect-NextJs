"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { Course } from "@/components/courses/courses";
import LeftNavbar from "@/components/left-navbar/page";
import useDataModeration from "@/components/pagination/useDataModeration";
import Paginate from "@/components/pagination/pagination";
import StaffRatingTable from "@/components/staff-rating-table/page";
import { useEffect, useState } from "react";
import { Breadcrumb, Empty, Spin, Tag } from "antd";
import { useRouter } from "next/navigation";

const ModerationContent = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  // console.log("hhhhha", activeTab);
  const handleTabClick = (tabName: number) => {
    setActiveTab(tabName);
  };
  const [page, setPage] = useState<number>(1);

  const { id, userData } = UserAuth();
  const {
    loading,
    listCourseModeration,
    currentPage,
    totalPages,
    setCurrentPage,
    refetchList,
  } = useDataModeration(activeTab);

  // useEffect(() => {
  //   setPage(currentPage);
  //   console.log("page", currentPage);
  // }, [listCourseModeration]);

  const router = useRouter();

  const DetailContent = (id) => {
    router.push(`/staff-page/moderation/${id}`);
  };

  return (
    <>
      {!userData ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex">
          <LeftNavbar
            page1={"/staff-page"}
            page2={"/staff-page/staff-rating"}
            page3={"/staff-page/staff-report"}
            page4={"/staff-page/moderation"}
            page5={"/staff-page/list-major"}
            page6={"/staff-page/staff-revenue"}
            page7={"/staff-page/staff-transaction"}
          />
          {/* <StaffRatingTable />
           */}
          <div className="w-full mt-4">
            <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <div className="text-start font-semibold text-2xl my-5 px-4">
                    Courses
                  </div>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="flex justify-evenly py-4 rounded-md mb-5">
              <ul className="tabs flex space-x-24">
                <li
                  className={`cursor-pointer rounded-md shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                    activeTab === 0 ? "bg-[#309255] text-white" : "bg-white"
                  }`}
                  onClick={() => handleTabClick(0)}
                >
                  <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                    Active
                  </button>
                </li>
                <li
                  className={`cursor-pointer rounded-md shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                    activeTab === 1 ? "bg-gray-500 text-white" : "bg-white"
                  }`}
                  onClick={() => handleTabClick(1)}
                >
                  <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-gray-500">
                    Pending
                  </button>
                </li>
                <li
                  className={`cursor-pointer rounded-md shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                    activeTab === 2 ? "bg-[#ffa04e] text-white" : "bg-white"
                  }`}
                  onClick={() => handleTabClick(2)}
                >
                  <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#ffa04e]">
                    Reject
                  </button>
                </li>
                <li
                  className={`cursor-pointer rounded-md shadow-[5px_5px_20px_10px_rgba(0,0,0,0.15)] ${
                    activeTab === 3 ? "bg-red-500 text-white" : "bg-white"
                  }`}
                  onClick={() => handleTabClick(3)}
                >
                  <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-red-500">
                    Banned
                  </button>
                </li>
              </ul>
            </div>
            {/* <div className="flex flex-col gap-5 pb-5">
          <div className="rounded-lg border-solid border-2 flex flex-row justify-between py-5 px-16 gap-5 border-[#48b544]">
            <div className="">Image</div>
            <div className="">Name Course</div>
            <div className="">Mentor</div>
            <div className="">Specialized</div>
            <div className="">Status</div>
            <div>Date</div>
          </div>
        </div> */}
            {listCourseModeration.length === 0 ? (
              <Empty />
            ) : (
              <>
                <div className="flex flex-col gap-5 mx-5">
                  {listCourseModeration.map((item) => (
                    <>
                      <button
                        onClick={() => {
                          DetailContent(item.id);
                        }}
                        className="flex rounded-lg border-solid border-2 justify-between items-center p-5 gap-5 hover:border-[#48b544] shadow-[10px_10px_20px_10px_rgba(0,0,0,0.15)] m-3 text-lg text-left"
                      >
                        <div className="w-1/12 font-bold border-gray-300 break-all">
                          <img
                            src={item.imageUrl}
                            className="h-[120px] w-[120px] rounded-lg"
                          />
                        </div>
                        <div className="w-4/12 bg-white p-4 font-semibold text-xl">
                          {item.name}
                        </div>
                        <div className="w-2/12 bg-white p-4">
                          {item.mentorName}
                        </div>
                        <div className="w-2/12 bg-white p-4">
                          {item.specializationName}
                        </div>
                        <div className="w-1/12 bg-white p-4">
                          {item.status === 0 && (
                            <Tag
                              color="#389E0D"
                              style={{ border: "2px solid #389E0D" }}
                            >
                              Active
                            </Tag>
                          )}
                          {item.status === 1 && (
                            <Tag
                              color="grey"
                              style={{ border: "2px solid grey" }}
                            >
                              Pending
                            </Tag>
                          )}
                          {item.status === 2 && (
                            <Tag
                              color="#FFA04E"
                              style={{ border: "2px solid rbg(255,160,78)" }}
                            >
                              Reject
                            </Tag>
                          )}
                          {item.status === 3 && (
                            <Tag
                              color="#cf1322"
                              style={{ border: "2px solid #cf1322" }}
                            >
                              Banned
                            </Tag>
                          )}
                        </div>
                        <div className="w-2/12 bg-white p-4 flex flex-col justify-center items-center">
                          <div>
                            {item.createDate
                              ? new Date(item.createDate).toLocaleTimeString(
                                  "en-US"
                                )
                              : ""}{" "}
                          </div>
                          <div>
                            {item.createDate
                              ? new Date(item.createDate).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )
                              : ""}{" "}
                          </div>
                        </div>
                      </button>
                    </>
                  ))}
                </div>
                <Paginate
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </div>
          {/* <div className="mt-10 rounded-lg border-solid border-2 mx-10 p-20">
        <div className="flex">
          <div className="text-2xl font-semibold mb-0 pt-4 leading-5">
            Total Revenue
          </div>
        </div>
        
      </div> */}
        </div>
      )}
    </>
  );
};

export default ModerationContent;
