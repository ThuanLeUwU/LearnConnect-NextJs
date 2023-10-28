import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
export type CourseItem = {
  percentComplete: any;
  course: {
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
const useDataFavoritesFetcher = () => {
  const { id } = UserAuth();
  const [courses, setCourses] = useState<CourseItem[]>([]);

  const API_URL = `https://learnconnectapitest.azurewebsites.net/api/favorite-course/get-favorite-courses-by-user?userId=`;
  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await axios.get(
        `${API_URL}${id}&currentPage=${page}&pageSize=${pagesize}`
        // `${API_URL}`
      );
      // setCourses(result?.data.listCourse);
      setCourses(result?.data.listFavoriteCourses);
      setTotalPages(result?.data.paginationData.totalPages);
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

export default useDataFavoritesFetcher;
