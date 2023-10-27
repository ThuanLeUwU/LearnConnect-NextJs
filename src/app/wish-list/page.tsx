"use client";
import ".././globals.css";
import CourseItem from "@/components/course-item/course";
import Courses from "@/components/courses/courses";
import Paginate from "@/components/pagination/pagination";
import useDataFetcher from "@/components/pagination/useDataFetcher";

const MyCourse = () => {
  const { loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataFetcher();

  return (
    <div className="container">
      {loading ? (
        <div className="text-center text-5xl">loading...</div>
      ) : (
        <div>
          <div className="grid cols-2 lg:grid-cols-3 pt-[30px] gap-5">
            {courses.map((item) => {
              return (
                <>
                  <Courses
                    mentorId={0}
                    mentorProfilePictureUrl={""}
                    totalRatingCount={0}
                    lectureCount={""}
                    categoryName={""}
                    key={item.id}
                    {...item}
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
