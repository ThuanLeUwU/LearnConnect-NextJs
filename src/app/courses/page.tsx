"use client";
import Courses from "@/components/courses/courses";
import ".././globals.css";
import useDataFetcher from "@/components/pagination/useDataFetcher";
import Paginate from "@/components/pagination/pagination";
import Search from "@/components/search/search";
const ListCourse = () => {
  const { loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataFetcher();
  return (
    <div className="container">
      <Search />
      {loading ? (
        <div className="text-center text-5xl">loading...</div>
      ) : (
        <div>
          <div className="grid cols-2 lg:grid-cols-3 py-[30px] gap-5">
            {courses.map((item) => {
              return (
                <>
                  <Courses
                    totalRatingCount={0}
                    mentorProfilePictureUrl={""}
                    mentorId={0}
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

export default ListCourse;
