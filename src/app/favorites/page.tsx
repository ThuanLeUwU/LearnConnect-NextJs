"use client";
import ".././globals.css";
import CourseItem from "@/components/course-item/course";
import Courses from "@/components/courses/courses";
import Paginate from "@/components/pagination/pagination";
import useDataFavoritesFetcher from "@/components/pagination/useDataFavoritesFetcher";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { Empty } from "antd";

const MyCourse = () => {
  const { loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataFavoritesFetcher();
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
              <Empty description={false} />
              You don&apos;t have any favorite courses.
            </div>
          ) : (
            <div className="grid cols-2 lg:grid-cols-3 pt-[30px] gap-5">
              {courses.map((item) => (
                <Courses
                  enrolled={false}
                  favoriteId={item.favorite.id}
                  mentorId={0}
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
