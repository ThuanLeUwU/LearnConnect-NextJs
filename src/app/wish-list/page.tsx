"use client";
import ".././globals.css";
import CourseItem from "@/components/course-item/course";
import Courses from "@/components/courses/courses";
import Paginate from "@/components/pagination/pagination";
import useDataFavoritesFetcher from "@/components/pagination/useDataFavoritesFetcher";

const MyCourse = () => {
  const { loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataFavoritesFetcher();

  return (
    <div className="container">
      {loading ? (
        <div className="text-center text-5xl">loading...</div>
      ) : (
        <div>
          <div className="grid cols-2 lg:grid-cols-3 pt-[30px] gap-5">
            {courses.map((item) => {
              courses.forEach((courses) => {
                console.log("course favorite is : ", courses.favorite);
              });
              return (
                <>
                  <Courses
                    favoriteId={item.favorite.id}
                    // imageUrl={""}
                    // name={""}
                    // description={""}
                    // id={""}
                    // price={""}
                    // totalEnrollment={""}
                    // contentLength={""}
                    // averageRating={0}
                    mentorId={0}
                    mentorProfilePictureUrl={""}
                    totalRatingCount={0}
                    lectureCount={""}
                    categoryName={""}
                    key={item.course.id}
                    {...item.course}
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
