import axios from "axios";
import { type } from "os";
import { useState, useEffect } from "react";

export type Mentor = {
  userInfo: any;
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

export type MentorProfile = {
  id: string | number;
};
const useDataMentorFetcher = () => {
  const [mentor, setMentor] = useState<Mentor[]>([]);
  const [mentorID, setMentorId] = useState<MentorProfile[]>([]);
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

      setMentor(
        result?.data.listMentor
          .filter((mentor) => mentor.userInfo.role === 2)
          .map((mentor) => mentor)
      );
      setMentorId(
        result?.data.listMentor.map((mentor) => mentor.mentorInfo.id)
      );
      setTotalPages(result?.data.paginationData.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [currentPage]);
  return {
    loading,
    mentor,
    mentorID,
    totalPages,
    currentPage,
    setCurrentPage,
  };
};

export default useDataMentorFetcher;
