"use client";
import ".././globals.css";
import CourseItem from "@/components/course-item/course";
import Courses from "@/components/courses/courses";
import Paginate from "@/components/pagination/pagination";
import useDataFavoritesFetcher from "@/components/pagination/useDataFavoritesFetcher";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { Empty, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MyCourse = () => {
  const { role } = UserAuth();
  const router = useRouter();
  useEffect(() => {
    if (role === 0) {
      router.push(`/user-manage`);
    }
    if (role === 1) {
      router.push(`/staff-page`);
    }
    // if (role === 2) {
    //   router.push(`/instructorcourses`);
    // }
    // if (role === 3) {
    //   router.push(`/`);
    // }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });
  const {
    loading,
    courses,
    totalPages,
    currentPage,
    setCurrentPage,
    setIsFavorites,
  } = useDataFavoritesFetcher();
  const { jwtToken } = UserAuth();

  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  return (
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
              You don&apos;t have any favorite courses.
            </div>
          ) : (
            <div className="grid cols-2 lg:grid-cols-3 pt-[30px] gap-5">
              {courses.map((item) => (
                <Courses
                  setIsFavorites={(isFavorites) => {
                    setIsFavorites(isFavorites);
                  }}
                  enrolled={false}
                  mentorId={0}
                  favorite={item.favorite ? true : false}
                  mentorProfilePictureUrl={""}
                  totalRatingCount={0}
                  lectureCount={""}
                  categoryName={""}
                  key={item.course.id.toString()}
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
  );
};

export default MyCourse;
