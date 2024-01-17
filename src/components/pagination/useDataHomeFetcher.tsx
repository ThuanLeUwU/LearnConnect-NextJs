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
const useDataHomeFetcher = () => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const { id } = UserAuth();
  let API_URL =
    "https://learnconnectapifpt.azurewebsites.net/api/course/get-top-enrolled-courses";
  if (id) {
    API_URL = `https://learnconnectapifpt.azurewebsites.net/api/course/get-top-enrolled-courses?userId=${id}`;
  }
  // const API_URL =
  //   "https://learnconnectapifpt.azurewebsites.net/api/course/get-top-enrolled-courses";
  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await axios.get(`${API_URL}`);
      setCourses(result?.data);
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

export default useDataHomeFetcher;
