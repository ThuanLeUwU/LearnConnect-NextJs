import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
export type Notification = {
  id: string | number;
  title: string;
  description: string;
  isRead: boolean;
  timeStamp: string;
  userId: number;
};
const useDataNotificationsFetcher = () => {
  const { id } = UserAuth();
  const [notificationContent, setNotificationContent] = useState<
    Notification[]
  >([]);

  const API_URL = `
https://learnconnectapi.azurewebsites.net/api/notification/byUserId-pagination/`;
  const pagesize = 5;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      try {
        const result = await axios.get(
          `${API_URL}${id}?currentPage=${page}&pageSize=${pagesize}`
          // `${API_URL}`
        );
        // setCourses(result?.data.listCourse);
        setNotificationContent(result?.data.notifications);
        setTotalPages(result?.data.paginationData.totalPages);
        // console.log("total page", totalPages);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentPage, id]);
  return {
    loading,
    notificationContent,
    totalPages,
    currentPage,
    setCurrentPage,
  };
};

export default useDataNotificationsFetcher;
