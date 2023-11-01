import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
export type CourseItem = {
  favorite: {
    id: string | number;
    courseId: number;
    userId: number;
  };
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
export type Favorite = {
  id: string | number;
  courseId: number;
  userId: number;
};
const useDataFavoritesFetcher = () => {
  const { id, userData } = UserAuth();
  const [courses, setCourses] = useState<CourseItem[]>([]);
  // const [favorite, setFavorite] = useState<Favorite>();
  const API_URL = `https://learnconnectapitest.azurewebsites.net/api/favorite-course/get-favorite-courses-by-user?userId=`;
  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          // User ID is not available, set loading to false
          setLoading(false);
          return;
        }

        const page = Math.min(currentPage + 1, totalPages);
        const result = await axios.get(
          `${API_URL}${id}&currentPage=${page}&pageSize=${pagesize}`
        );

        setCourses(result?.data.listFavoriteCourses);
        setTotalPages(result?.data.paginationData.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, id, totalPages]);

  return {
    loading,
    courses,
    totalPages,
    currentPage,
    setCurrentPage,
  };
};

export default useDataFavoritesFetcher;
