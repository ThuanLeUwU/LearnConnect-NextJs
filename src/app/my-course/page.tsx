"use client";
import ".././globals.css";
import CourseItem from "@/components/course-item/course";
import Paginate from "@/components/pagination/pagination";
import useDataUserFetcher from "@/components/pagination/useDataUserFetcher";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";

const MyCourse = () => {
  const { loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataUserFetcher();
  const { jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  return (
    <div className="container">
      {loading ? (
        <div className="text-center text-5xl">loading...</div>
      ) : (
        <div className="min-h-[60vh]">
          {courses.length === 0 ? (
            <div className="text-center text-2xl mt-8 items-center justify-center">
              You don&apos;t have any courses.
            </div>
          ) : (
            <div className="grid cols-2 lg:grid-cols-12 pt-[30px]">
              {courses.map((item) => (
                <CourseItem
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
  );
};

export default MyCourse;
