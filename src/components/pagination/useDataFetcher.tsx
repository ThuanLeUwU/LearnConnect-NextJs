import { http } from "@/api/http";
import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
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
const useDataFetcher = (
  minPrice: any,
  maxPrice: any,
  specializationId: any,
  refresh: boolean,
  rate: any,
  searchQuery: string
) => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const { userData, id, jwtToken } = UserAuth();
  const [courseFilter, setCourseFilter] = useState<CourseItem[]>([]);
  const router = useRouter();
  // const [searchQuery, setSearchQuery] = useState("");
  let API_URL = `https://learnconnectserver.azurewebsites.net/api/course/courses-with-favorite-and-filter?userId=${id}&currentPage=`;

  if (!id) {
    API_URL = `https://learnconnectserver.azurewebsites.net/api/course/get-courses-paging-with-filter?currentPage=`;
  }

  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setCurrentPage(0);
    setTotalPages(1);
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await axios.get(
        `${API_URL}${page}&pageSize=${pagesize}&orderByLatestCreationDate=true&orderByEnrollmentCount=false`
      );
      setCourses(result?.data.listCourse);
      setTotalPages(result?.data.paginationData?.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [reload, id]);

  useEffect(() => {}, [id]);

  useEffect(() => {
    setCurrentPage(0);
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages + 1);
      const result = await axios.get(
        `${API_URL}${page}&pageSize=${pagesize}&specializationId=${specializationId}&priceMin=${minPrice}&priceMax=${maxPrice}&minAverageRating=${rate}&orderByLatestCreationDate=true&orderByEnrollmentCount=true&searchQuery=${searchQuery}`
      );
      setCourses(result?.data.listCourse);
      setTotalPages(result?.data.paginationData?.totalPages);
      setLoading(false);
      setReload(false);
    };
    fetchData();
  }, [minPrice, rate, specializationId, searchQuery, maxPrice]);

  useEffect(() => {
    setTotalPages(1);
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await axios.get(
        `${API_URL}${page}&pageSize=${pagesize}&specializationId=${specializationId}&priceMin=${minPrice}&priceMax=${maxPrice}&minAverageRating=${rate}&orderByLatestCreationDate=true&orderByEnrollmentCount=false&searchQuery=${searchQuery}`
      );
      setCourses(result?.data.listCourse);
      setTotalPages(result?.data.paginationData?.totalPages);
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
    setReload,
  };
};

export default useDataFetcher;
