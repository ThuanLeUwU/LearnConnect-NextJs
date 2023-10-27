"use client";
import Courses from "@/components/courses/courses";
// import "../../.globals.css";
import useDataFetcher, {
  CourseItem,
} from "@/components/pagination/useDataFetcher";
import Search from "@/components/search/search";
import { useEffect, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}${searchQuery}`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div className="container">
      <Search />
      <div className="grid cols-2 lg:grid-cols-3 pt-[30px] gap-5">
        {courses.length === 0 ? (
          <div className="mx-auto mt-20 text-center min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-4">No courses available.</h1>
          </div>
        ) : (
          courses.map((item) => (
            <Courses
              totalRatingCount={0}
              mentorProfilePictureUrl={""}
              mentorId={0}
              lectureCount={""}
              categoryName={""}
              key={item.id}
              {...item}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchCourse;
