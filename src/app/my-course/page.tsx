"use client";
import ".././globals.css";
import CourseItem from "@/components/course-item/course";
import Paginate from "@/components/pagination/pagination";
import useDataUserFetcher from "@/components/pagination/useDataUserFetcher";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { Breadcrumb, Empty, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyCourse() {
  const { role } = UserAuth();
  const router = useRouter();
  useEffect(() => {
    if (role === 0) {
      router.push(`/user-manage`);
    }
    if (role === 1) {
      router.push(`/staff-page`);
    }
    if (role === 2) {
      router.push(`/instructorcourses`);
    }
    // if (role === 3) {
    //   router.push(`/`);
    // }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });
  const { loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataUserFetcher();
  const { jwtToken, id } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  // console.log("jwtToken", jwtToken);
  // console.log("user id: ", id);
  const breadcrumbsHome = () => {
    router.push("/");
  };

  return (
    <>
      <div className="bg-[#e7f8ee]">
        <div
          className="bg-no-repeat flex flex-row justify-between"
          style={{
            backgroundImage: "url('/images/shape-23.png')",
            backgroundPosition: "bottom left",
          }}
        >
          <div>
            <div className="-translate-y-9 px-40">
              <img
                className="animation-round "
                src="/images/shape-8.png"
                alt="Shape"
              ></img>
            </div>
            <Breadcrumb className="font-semibold text-3xl pb-5 pl-36 -translate-y-3">
              <Breadcrumb.Item>
                <button onClick={breadcrumbsHome}>Home</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>My Courses</span>
              </Breadcrumb.Item>
            </Breadcrumb>{" "}
          </div>
          <div
            className="w-2/5 bg-auto bg-no-repeat bg-right-top"
            style={{
              backgroundImage: "url('/images/shape-24.png')",
            }}
          />
        </div>
      </div>
      <div className="container">
        {loading ? (
          <div className="text-center text-5xl mt-5">
            <Spin size="large" />
          </div>
        ) : (
          <div className="min-h-[1000px]">
            {courses.length === 0 ? (
              <div className="text-center text-2xl mt-8 items-center justify-center">
                <Empty description={false} />
                You don&apos;t have any courses.
              </div>
            ) : (
              <div className="grid cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-12 pt-[30px]">
                {courses.map((item) => (
                  <CourseItem
                    mentorId={item.mentorId}
                    percentComplete={item.percentComplete}
                    mentorName={""}
                    mentorProfilePictureUrl={""}
                    key={item.course.id}
                    {...item.course}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {courses.length > 0 && (
          <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
