import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
export type CourseItem = {
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
const useDataUserFetcher = () => {
  const { id } = UserAuth();
  const [courses, setCourses] = useState<CourseItem[]>([]);
  console.log("id", id);
  const API_URL =
    "https://learnconnectapitest.azurewebsites.net/api/course/get-courses-by-userid?userId=";
  const pagesize = 6;
  const totalPages = 10;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  // console.log("course fetchdata", courses);
  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await axios.get(
        `${API_URL}${id}&currentPage=${page}&pageSize=${pagesize}`
        // `https://learnconnectapitest.azurewebsites.net/api/course/get-courses-by-userid/${id}`
      );
      setCourses(result?.data);
      // console.log("result", result);
      // console.log("currentPage", page);
      setLoading(false);
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

export default useDataUserFetcher;
