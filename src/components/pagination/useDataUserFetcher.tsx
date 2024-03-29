import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { http } from "@/api/http";

import { useState, useEffect } from "react";
export type CourseItem = {
  mentorId: number;
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
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const API_URL = `https://learnconnectapifpt.azurewebsites.net/api/course/get-courses-by-userid?userId=`;
  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      try {
        const result = await http.get(
          `${API_URL}${id}&currentPage=${page}&pageSize=${pagesize}`
          // `${API_URL}`
        );
        // setCourses(result?.data.listCourse);
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
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

export default useDataUserFetcher;
