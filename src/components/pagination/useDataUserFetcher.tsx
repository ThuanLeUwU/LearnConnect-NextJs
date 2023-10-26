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
  console.log("id của tau nè: ", id)
  const [courses, setCourses] = useState<CourseItem[]>([]);
  console.log("my course", courses)
  const API_URL =
    `https://learnconnectapitest.azurewebsites.net/api/course/get-courses-by-userid?userId=${id}`;
  const pagesize = 6;
  const totalPages = 10;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await axios.get(
        `${API_URL}&currentPage=${page}&pageSize=${pagesize}`
      );
      setCourses(result?.data.listCourse);
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
