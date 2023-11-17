import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
export type CourseItem = {
  // course: any;
  // favorite: any;
  id: string | number;
  name: string;
  description: string;
  shortDescription: string;
  difficultyLevel: string;
  imageUrl: string;
  price: number;
  totalEnrollment: number;
  contentLength: number;
  averageRating: number;
  status: number;
  categoryId: number;
  isFavorite: boolean;
};
export type User = {
  id: string | number;
  password: string;
  email: string;
  role: 0;
  fullName: string;
  phoneNumber: string;
  gender: 0;
  bioDescription: string;
  profilePictureUrl: string;
  status: number;
};
const useDataFetcher = () => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const { userData, id, jwtToken } = UserAuth();

  // console.log("tau nì", courses);
  let API_URL =
    "https://learnconnectapitest.azurewebsites.net/api/course/get-courses-paging?";
  if (id) {
    API_URL = `https://learnconnectapitest.azurewebsites.net/api/course/courses-with-favorite?userId=${id}&`;
  }
  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await axios.get(
        `${API_URL}currentPage=${page}&pageSize=${pagesize}`
      );
      setCourses(result?.data.listCourse);
      // console.log("result", result);
      setTotalPages(result?.data.paginationData.totalPages);
      // console.log("toalpage", totalPages);
      setLoading(false);
      // console.log("totalPages", result);
    };
    fetchData();
  }, [currentPage]);
  return {
    loading,
    courses,
    totalPages,
    currentPage,
    setCurrentPage,
  };
};

export default useDataFetcher;
