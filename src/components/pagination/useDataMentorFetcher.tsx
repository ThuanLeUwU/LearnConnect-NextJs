import axios from "axios";
import { useState, useEffect } from "react";

export type Mentor = {
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
const useDataMentorFetcher = () => {
  const [mentor, setMentor] = useState<Mentor[]>([]);
  const API_URL =
    "https://learnconnectapitest.azurewebsites.net/api/mentor/get-mentors";
  const pagesize = 6;
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await axios.get(
        `${API_URL}?currentPage=${page}&pageSize=${pagesize}`
      );
      setMentor(result?.data.listMentor);
      setTotalPages(result?.data.paginationData.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [currentPage]);
  return {
    loading,
    mentor,
    totalPages,
    currentPage,
    setCurrentPage,
  };
};

export default useDataMentorFetcher;
