import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { CourseItem } from "./useDataFetcher";
import { http } from "@/api/http";
import { ListCourse } from "./useDataCoursesInstructor";

const useDataModeration = (status: number) => {
  const refetchList = async () => {
    const page = Math.min(currentPage + 1, totalPages);
    if (id) {
      const responseData = await http.get(
        `/course/get-courses-pending?currentPage=${page}&pageSize=${pagesize}`
      );
      setListCourseModeration(responseData?.data.courses);
    }
  };

  const { id } = UserAuth();
  const [listCourseModeration, setListCourseModeration] = useState<
    ListCourse[]
  >([]);
  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log("2");
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      try {
        const responseData = await http.get(
          `/course/get-courses-pending?currentPage=${page}&pageSize=${pagesize}&courseStatus=${status}`
        );
        setListCourseModeration(responseData?.data.courses);
        setTotalPages(responseData?.data.paginationData.totalPages);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
      // console.log("má", responseData?.data.courses);
    };
    fetchData();
  }, [currentPage, id]);

  useEffect(() => {
    setCurrentPage(0);
    console.log("1");
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      try {
        const responseData = await http.get(
          `/course/get-courses-pending?currentPage=1&pageSize=${pagesize}&courseStatus=${status}`
        );
        setListCourseModeration(responseData?.data.courses);
        setTotalPages(responseData?.data.paginationData.totalPages);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
      // console.log("má", responseData?.data.courses);
    };
    fetchData();
  }, [status]);

  return {
    loading,
    listCourseModeration,
    totalPages,
    currentPage,
    setCurrentPage,
    refetchList,
  };
};

export default useDataModeration;
