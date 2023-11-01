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
const useDataUserFetcher = () => {
  const { id } = UserAuth();
  if (!id) {
    return {
      loading: false,
      courses: [],
      totalPages: 0,
      currentPage: 0,
      setCurrentPage: () => {},
    };
  }

  const [courses, setCourses] = useState<CourseItem[]>([]);
  const API_URL = `https://learnconnectapitest.azurewebsites.net/api/course/get-courses-by-userid?userId=`;
  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const page = Math.min(currentPage + 1, totalPages);
        const result = await axios.get(
          `${API_URL}${id}&currentPage=${page}&pageSize=${pagesize}`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
        setLoading(false);
      } catch (error) {
        // Handle errors here
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

export default useDataUserFetcher;
