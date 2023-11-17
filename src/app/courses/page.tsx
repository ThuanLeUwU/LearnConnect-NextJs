"use client";
import Courses from "@/components/courses/courses";
import ".././globals.css";
import useDataFetcher from "@/components/pagination/useDataFetcher";
import Paginate from "@/components/pagination/pagination";
import Search from "@/components/search/search";
import { Spin } from "antd";
const ListCourse = () => {
  const { loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataFetcher();
  return (
    <div className="container">
      <Search searchQueryData={""} />
      {loading ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="min-h-[60vh]">
          {courses.length === 0 ? (
            <div className="text-center text-2xl mt-8 items-center justify-center">
              You don&apos;t have any favorite courses.
            </div>
          ) : (
            <div className="grid cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-[30px] gap-5">
              {courses.map((item) => {
                return (
                  <Courses
                    enrolled={false}
                    // favoriteId={""}
                    totalRatingCount={0}
                    mentorProfilePictureUrl={""}
                    mentorId={0}
                    lectureCount={""}
                    categoryName={""}
                    key={item.id}
                    {...item}
                  />
                );
              })}
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

export default ListCourse;
