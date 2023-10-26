"use client";
import ".././globals.css";
import CourseItem from "@/components/course-item/course";
import Paginate from "@/components/pagination/pagination";
import useDataUserFetcher from "@/components/pagination/useDataUserFetcher";
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect } from "react";
import { FC } from "react";
import { UserAuth } from "../context/AuthContext";

const MyCourse = () => {
  // const {id} = UserAuth();
  const {loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataUserFetcher();

  return (
    <div className="container">
      {loading ? (
        <div className="text-center text-5xl">loading...</div>
      ) : (
        <div>
          <div className="grid cols-2 lg:grid-cols-12 pt-[30px]">
            {courses.map((item) => {
              return (
                <>
                  <CourseItem key={item.id} {...item} />
                </>
              );
            })}
          </div>
        </div>
      )}
      <Paginate
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default MyCourse;
