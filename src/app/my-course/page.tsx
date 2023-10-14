"use client";
import ".././globals.css";
import CourseItem from "@/components/course-item/course";
import Paginate from "@/components/pagination/pagination";
import useDataFetcher from "@/components/pagination/useDataFetcher";
import ProgressBar from "@ramonak/react-progress-bar";

import { useEffect } from "react";
const MyCourse = () => {
  const { loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataFetcher();
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
                  <CourseItem
                    key={item.id}
                    {...item}
                    item={{
                      id: "1",
                      name: "alo",
                      description: "123",
                      shortDescription: "",
                      difficultyLevel: "",
                      imageUrl: "",
                      price: 0,
                      totalEnrollment: 0,
                      contentLength: 0,
                      averageRating: 0,
                      status: 0,
                      categoryId: 0,
                    }}
                  />
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
