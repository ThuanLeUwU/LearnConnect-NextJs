"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { Course } from "@/components/courses/courses";
import LeftNavbar from "@/components/left-navbar/page";
import useDataModeration from "@/components/pagination/useDataModeration";
import Paginate from "@/components/pagination/pagination";
import StaffRatingTable from "@/components/staff-rating-table/page";
import { useEffect, useState } from "react";
import { Empty, Tag } from "antd";
import { useRouter } from "next/navigation";

const ModerationContent = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  console.log("hhhhha", activeTab);
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
    <div className="flex">
      <LeftNavbar
        page1={"/staff-page"}
        page2={"/staff-page/staff-rating"}
        page3={"/staff-page/staff-report"}
        page4={"#"}
        page5={"/staff-page/moderation-lecture"}
      />
      {/* <StaffRatingTable />
       */}
      <div className="container mt-4">
        <div className="text-center font-semibold text-5xl pb-5">
          List Course{" "}
        </div>
        <div className="flex justify-evenly bg-[#e7f8ee] py-4 rounded-md mb-5 ">
          <ul className="tabs flex space-x-5 ">
            <li
              className={`cursor-pointer rounded-md ${
                activeTab === 0 ? "bg-[#309255] text-white" : "bg-white"
              }`}
              onClick={() => handleTabClick(0)}
            >
              <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                Active
              </button>
            </li>
            <li
              className={`cursor-pointer rounded-md ${
                activeTab === 1 ? "bg-[#9faaa8] text-white" : "bg-white"
              }`}
              onClick={() => handleTabClick(1)}
            >
              <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#9faaa8]">
                Pending
              </button>
            </li>
            <li
              className={`cursor-pointer rounded-md ${
                activeTab === 2 ? "bg-[#b8ba5a] text-white" : "bg-white"
              }`}
              onClick={() => handleTabClick(2)}
            >
              <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#b8ba5a]">
                Reject
              </button>
            </li>
            <li
              className={`cursor-pointer rounded-md ${
                activeTab === 3 ? "bg-[#d94242] text-white" : "bg-white"
              }`}
              onClick={() => handleTabClick(3)}
            >
              <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#d94242]">
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
            <div className="flex flex-col gap-5">
              {listCourseModeration.map((item) => (
                <>
                  <div className="rounded-lg border-solid border-2 flex flex-row justify-between p-5 gap-5 hover:border-[#48b544]">
                    <div className="">
                      <img
                        src={item.imageUrl}
                        className="h-[120px] w-[120px] rounded-lg"
                      />
                    </div>
                    <button
                      onClick={() => {
                        DetailContent(item.id);
                      }}
                      className="w-[400px] font-semibold text-xl text-left flex items-start"
                    >
                      {item.name}
                    </button>
                    <div className="items-center flex font-semibold">
                      {item.mentorName}
                    </div>
                    <div className="items-center flex font-semibold">
                      {item.specializationName}
                    </div>
                    <div className="items-center flex">
                      {item.status === 0 && (
                        <Tag
                          color="green"
                          style={{ border: "2px solid green" }}
                        >
                          Active
                        </Tag>
                      )}
                      {item.status === 1 && (
                        <Tag color="grey" style={{ border: "2px solid grey" }}>
                          Pending
                        </Tag>
                      )}
                      {item.status === 2 && (
                        <Tag color="red" style={{ border: "2px solid red" }}>
                          Reject
                        </Tag>
                      )}
                      {item.status === 3 && (
                        <Tag
                          color="black"
                          style={{ border: "2px solid black" }}
                        >
                          Banned
                        </Tag>
                      )}
                    </div>
                    <div className="flex flex-col justify-center items-center">
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
                  </div>
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
  );
};

export default ModerationContent;