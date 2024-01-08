import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
export type Transaction = {
  paymentTransactions: any;
  id: string | number;
  total: number;
  transactionId: number;
  transactionError: string;
  createDate: string;
  successDate: string;
  paymentUrl: string;
  status: number;
  userId: number;
  courseName: string;
  courseId: number;
};
const useDataPaymentFetcher = () => {
  const { id } = UserAuth();
  // console.log("id của tau nè: ", id);
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  // console.log("my transaction", transaction);

  const API_URL = `https://learnconnectserver.azurewebsites.net/api/payment-transaction/by-user/`;
  const pagesize = 6;
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
        setTransaction(result?.data.paymentTransactions);
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
    transaction,
    totalPages,
    currentPage,
    setCurrentPage,
  };
};

export default useDataPaymentFetcher;
