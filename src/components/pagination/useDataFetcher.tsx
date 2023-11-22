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
  minPrice: number,
  maxPrice: number,
  specializationId: number,
  refresh: boolean,
  rate: number
) => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const { userData, id, jwtToken } = UserAuth();
  const [courseFilter, setCourseFilter] = useState<CourseItem[]>([]);
  const [price, setPrice] = useState(minPrice);
  const router = useRouter();
  console.log("tau nì", price);
  let API_URL =
    "https://learnconnectapitest.azurewebsites.net/api/course/get-courses-paging?";
  if (minPrice !== 0 || specializationId !== 0) {
    API_URL =
      "https://learnconnectapitest.azurewebsites.net/api/course/get-courses-paging-with-filter?";
  } else if (id) {
    API_URL = `https://learnconnectapitest.azurewebsites.net/api/course/courses-with-favorite?userId=${id}&`;
  }
  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [reload, setReload] = useState(false);
  // const [refresh, setRefresh] = useState(false);

  // const page = Math.min(currentPage + 1, totalPages);
  useEffect(() => {
    setCurrentPage(0);
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await axios.get(
        `${API_URL}currentPage=${page}&pageSize=${pagesize}`
      );
      setCourses(result?.data.listCourse);
      setTotalPages(result?.data.paginationData.totalPages);
      // console.log("result", result);

      // console.log("toalpage", totalPages);
      setLoading(false);
      // console.log("totalPages", result);
    };
    fetchData();
  }, [reload]);
  const removeFilter = () => {
    setCurrentPage(0);
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await http.get(
        `${API_URL}currentPage=${page}&pageSize=${pagesize}`
      );
      setCourses(result?.data.listCourse);
      setTotalPages(result?.data.paginationData.totalPages);
      // console.log("result", result);

      // console.log("toalpage", totalPages);
      setLoading(false);
      // console.log("totalPages", result);
    };
    fetchData();

    // API_URL =
    //   "https://learnconnectapitest.azurewebsites.net/api/course/get-courses-paging?";
    // // console.log("price 3", price);
    // // const page = Math.min(currentPage + 1, totalPages);
  };

  useEffect(() => {
    setCurrentPage(0);
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      if (minPrice === 0) {
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}&priceMin=${minPrice}&priceMax=0&orderByLatestCreationDate=true&orderByEnrollmentCount=true`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      } else if (minPrice === 1) {
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}&priceMin=${minPrice}&priceMax=200000&orderByLatestCreationDate=true&orderByEnrollmentCount=true`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      } else if (minPrice === 200001) {
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}&priceMin=${minPrice}&priceMax=1000000&orderByLatestCreationDate=true&orderByEnrollmentCount=true`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      } else if (minPrice === 1000001) {
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}&priceMin=${minPrice}&orderByLatestCreationDate=true&orderByEnrollmentCount=true`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      }

      // console.log("result", result);

      // console.log("toalpage", totalPages);
      setLoading(false);
      setReload(false);
      // console.log("totalPages", result);
    };
    fetchData();
  }, [minPrice]);
  useEffect(() => {
    setCurrentPage(0);
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      if (specializationId !== -1) {
        console.log("page", page, currentPage);
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}&specializationId=${specializationId}&orderByLatestCreationDate=true&orderByEnrollmentCount=true`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      }

      // console.log("result", result);

      // console.log("toalpage", totalPages);
      setLoading(false);
      setReload(false);
      // console.log("totalPages", result);
    };
    fetchData();
  }, [specializationId]);

  useEffect(() => {
    setCurrentPage(0);
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      if (rate !== 0) {
        console.log("page", page, currentPage);
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}&minAverageRating=${rate}&orderByLatestCreationDate=true&orderByEnrollmentCount=true`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      }

      // console.log("result", result);

      // console.log("toalpage", totalPages);
      setLoading(false);
      setReload(false);
      // console.log("totalPages", result);
    };
    fetchData();
  }, [rate]);
  useEffect(() => {
    // setCurrentPage(0);
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      if (minPrice === 0) {
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}&priceMin=${minPrice}&priceMax=0&orderByLatestCreationDate=true&orderByEnrollmentCount=true`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      } else if (minPrice === 1) {
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}&priceMin=${minPrice}&priceMax=200000&orderByLatestCreationDate=true&orderByEnrollmentCount=true`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      } else if (minPrice === 200001) {
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}&priceMin=${minPrice}&priceMax=1000000&orderByLatestCreationDate=true&orderByEnrollmentCount=true`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      } else if (minPrice === 1000001) {
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}&priceMin=${minPrice}&orderByLatestCreationDate=true&orderByEnrollmentCount=true`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      } else if (specializationId !== -1) {
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}&specializationId=${specializationId}&orderByLatestCreationDate=true&orderByEnrollmentCount=true`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      } else if (rate !== 0) {
        console.log("page", page, currentPage);
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}&minAverageRating=${rate}&orderByLatestCreationDate=true&orderByEnrollmentCount=true`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      } else {
        const result = await axios.get(
          `${API_URL}currentPage=${page}&pageSize=${pagesize}`
        );
        setCourses(result?.data.listCourse);
        setTotalPages(result?.data.paginationData.totalPages);
      }

      // console.log("result", result);

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
    removeFilter,
    setReload,
  };
};

export default useDataFetcher;
