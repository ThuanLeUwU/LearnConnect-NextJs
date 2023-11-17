import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
export type CourseItem = {
  favorite: {
    favoriteCourseId: number;
    id: string | number;
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
  favoriteCourseId: number;
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
      const page = Math.min(currentPage + 1, totalPages);
      try {
        const result = await axios.get(
          `${API_URL}${id}&currentPage=${page}&pageSize=${pagesize}`
          // `${API_URL}`
        );
        // setCourses(result?.data.listCourse);
        setCourses(result?.data.listFavoriteCourses);
        setTotalPages(result?.data.paginationData.totalPages);
        // setFavorite(
        //   result?.data.listFavoriteCourses.map((item: any) => item.favorite)
        // );
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
      // console.log("Favorite Courses Data:", result?.data.listFavoriteCourses);
    };
    fetchData();
  }, [currentPage, id]);
  return {
    loading,
    courses,
    totalPages,
    currentPage,
    setCurrentPage,
  };
};

export default useDataFavoritesFetcher;
