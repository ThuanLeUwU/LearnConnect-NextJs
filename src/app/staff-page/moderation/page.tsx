"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { Course } from "@/components/courses/courses";
import LeftNavbar from "@/components/left-navbar/page";
import useDataModeration from "@/components/pagination/useDataModeration";
import Paginate from "@/components/pagination/pagination";
import StaffRatingTable from "@/components/staff-rating-table/page";
import { useState } from "react";
import { Tag } from "antd";
import { useRouter } from "next/navigation";

const ModerationContent = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { id, userData } = UserAuth();
  const {
    loading,
    listCourseModeration,
    currentPage,
    totalPages,
    setCurrentPage,
    refetchList,
  } = useDataModeration();

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
      />
      {/* <StaffRatingTable />
       */}
      <div className="container mt-4">
        <div className="text-center font-semibold text-5xl pb-5">
          List Course{" "}
        </div>

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
                <div className="">{item.mentorId}</div>
                <div className="">{item.specializationName}</div>
                <div className="items-center flex">
                  {item.status === 1 ? (
                    <Tag color="grey" style={{ border: "1px solid green" }}>
                      Pending
                    </Tag>
                  ) : (
                    item.status
                  )}
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div>
                    {item.createDate
                      ? new Date(item.createDate).toLocaleTimeString("en-US")
                      : ""}{" "}
                  </div>
                  <div>
                    {item.createDate
                      ? new Date(item.createDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
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
