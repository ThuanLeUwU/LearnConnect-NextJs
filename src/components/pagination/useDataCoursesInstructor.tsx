import { http } from "@/api/http";
import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";

export type ListCourse = {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  price: string;
  totalEnrollment: number;
  lectureCount: number;
  contentLength: number;
  averageRating: number;
  createDate: string;
  status: number;
  categoryId: number;
  mentorId: number;
  categoryName: string;
  totalRatingCount: number;
};

const useDataCoursesInstructor = () => {
  const refetchList = async () => {
    const page = Math.min(currentPage + 1, totalPages);
    if (id) {
      const responseUser = await http.get(
        `/course/get-courses-by-mentorUserId?userId=${id}&currentPage=${page}&pageSize=${pagesize}`
      );
      setListCourseInstructor(responseUser?.data.courses);
    }
  };

  const { id } = UserAuth();
  const [listCourseInstructor, setListCourseInstructor] = useState<
    ListCourse[]
  >([]);
  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      try {
        const responseData = await http.get(
          `/course/get-courses-by-mentorUserId?userId=${id}&currentPage=${page}&pageSize=${pagesize}`
        );
        setListCourseInstructor(responseData?.data.courses);
        setTotalPages(responseData?.data.paginationData.totalPages);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
      // console.log("má", responseData?.data.courses);
    };
    fetchData();
  }, [currentPage, id]);
  return {
    loading,
    listCourseInstructor,
    totalPages,
    currentPage,
    setCurrentPage,
    refetchList,
  };
};

export default useDataCoursesInstructor;
