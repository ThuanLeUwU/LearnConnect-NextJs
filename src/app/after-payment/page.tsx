"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ".././globals.css";
import { useRouter } from "next/navigation";

export type Payment = {
  id: string | number;
  total: number;
  transactionId: number;
  transactionError: string;
  createDate: string;
  successDate: string;
  paymentUrl: string;
  status: number;
  userId: number;
};

const AfterPayment = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const vnp_TxnRef = urlParams.get("vnp_TxnRef");
  const vnp_PayDate = urlParams.get("vnp_PayDate");
  const [payment, setPayment] = useState<Payment>();
  const [courseId, setCourseId] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/payment-transaction/query-vnpay-transaction?vnp_TxnRef=${vnp_TxnRef}&vnp_PayDate=${vnp_PayDate}`
      );
      setPayment(responseData.data.paymentTransction);
      setCourseId(responseData.data.courseId);
    };
    //total, transactionId, successDate neu thanh cong
    //total, transactionId, transactionError neu that bai
    fetchData();
  }, []);
  payment;
  const router = useRouter();
  const handleClickGotoCourse = () => {
    router.push(`/my-course/${courseId}`);
  };

  const handleClickBacktoCourse = () => {
    router.push(`/`);
  };
  console.log("payment", payment);
  console.log("vnp_TxnRef", vnp_TxnRef);
  console.log("vnp_PayDate", vnp_PayDate);
  console.log("courseID", courseId);
  return (
    <div className="container mx-auto mt-20 text-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Payment successful</h1>
      <p className="text-lg text-gray-600 mb-8">Status is {payment?.status}</p>
      <p className="text-lg text-gray-600 mb-8">total is {payment?.total}</p>
      <p className="text-lg text-gray-600 mb-8">
        transactionId is {payment?.transactionId}
      </p>
      <p className="text-lg text-gray-600 mb-8">Course is enrolled</p>
      <button
        className="bg-[#309255] text-white font-bold py-2 px-4 rounded mr-4"
        onClick={handleClickGotoCourse}
      >
        Go to Course
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClickBacktoCourse}
      >
        Back to Home
      </button>
    </div>
  );
};

export default AfterPayment;
function setLectures(data: any) {
  throw new Error("Function not implemented.");
}
