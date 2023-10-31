"use client";
import ".././globals.css";
import CourseItem from "@/components/course-item/course"; // Make sure the import path is correct
import Paginate from "@/components/pagination/pagination";
import useDataUserFetcher from "@/components/pagination/useDataUserFetcher";

const MyCourse = () => {
  const { loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataUserFetcher();

  return (
    <div className="container">
      {/* <Search /> */}
      {loading ? (
        <div className="text-center text-5xl">loading...</div>
      ) : (
        <div>
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
