"use client";
import Courses from "@/components/courses/courses";
// import "../../.globals.css";
import useDataFetcher, {
  CourseItem,
} from "@/components/pagination/useDataFetcher";
import Search from "@/components/search/search";
import { useEffect, useState } from "react";
import axios from "axios";
import Paginate from "@/components/pagination/pagination";
const SearchCourse = () => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const API_URL =
    "https://learnconnectapitest.azurewebsites.net/api/course/search?searchQuery=";
  useEffect(() => {
    const url = window.location.href;
    const segments = url.split("/");

    const lastSegment = segments[segments.length - 1];
    if (lastSegment) {
      setSearchQuery(lastSegment);
    }
  }, []);
  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      try {
        const response = await axios.get(
          `${API_URL}${searchQuery}&currentPage=${page}&pageSize=${pagesize}`
        );
        setCourses(response?.data.listCourse);
        setTotalPages(response?.data.paginationData.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery, currentPage]);
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
                    favoriteId={""}
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

export default SearchCourse;
