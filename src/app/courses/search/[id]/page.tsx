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
import { Empty } from "antd";
import { UserAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
const SearchCourse = () => {
  const router = useRouter();
  const { id, user, role } = UserAuth();
  useEffect(() => {
    if (role === 0) {
      router.push(`/user-manage`);
    }
    if (role === 1) {
      router.push(`/staff-page`);
    }
    if (role === 2) {
      router.push(`/instructorcourses`);
    }
    // if (role === 3) {
    //   router.push(`/`);
    // }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const API_URL =
    "https://learnconnectapi.azurewebsites.net/api/course/search?searchQuery=";
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
        if (response.status === 404) {
          setCourses([]);
          setTotalPages(0);
          setLoading(false);
          return;
        }

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
      {/* <Search searchQueryData={searchQuery} /> */}
      {loading ? (
        <div className="text-center text-2xl mt-5 min-h-[60vh]">
          <Empty description={false} className="text-6xl" />
          There are no courses matching your search!!!
        </div>
      ) : (
        <div>
          <div className="grid cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-[30px] gap-5">
            {courses.map((item) => (
              <Courses
                setIsFavorites={() => {}}
                favorite={item.isFavorite}
                enrolled={false}
                totalRatingCount={0}
                mentorProfilePictureUrl={""}
                mentorId={0}
                lectureCount={""}
                categoryName={""}
                key={item.id}
                {...item}
              />
            ))}
          </div>
          <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default SearchCourse;
