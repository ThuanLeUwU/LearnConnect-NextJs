"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ".././globals.css";
import { useRouter } from "next/navigation";
import { AiOutlineCheckCircle, AiFillExclamationCircle } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { http } from "@/api/http";

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
  courseName: string;
};

const AfterPayment = () => {
  const { id, jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  console.log("jwtToken", jwtToken);
  const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null);
  const [payment, setPayment] = useState<Payment>();
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setUrlParams(params);
    }
  }, []);

  useEffect(() => {
    if (urlParams) {
      const vnp_TxnRef = urlParams.get("vnp_TxnRef");
      const vnp_PayDate = urlParams.get("vnp_PayDate");
      // console.log("vnp_TxnRef", vnp_TxnRef);
      // console.log("vnp_PayDate", vnp_PayDate);

      const fetchData = async () => {
        try {
          const responseData = await http.get(
            `https://learnconnectapitest.azurewebsites.net/api/payment-transaction/query-vnpay-transaction?vnp_TxnRef=${vnp_TxnRef}&vnp_PayDate=${vnp_PayDate}`
          );
          setPayment(responseData?.data.paymentTransaction);
          setCourseId(responseData.data.courseId);
          setCourseName(responseData.data.courseName);
        } catch (error) {
          // Handle error here
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [urlParams]);
  const handleClickGotoCourse = () => {
    router.push(`/my-course/${courseId}`);
  };

  const handleClickBacktoCourse = () => {
    router.push(`/`);
  };
  // console.log("courseName", courseName);
  // console.log("payment", payment);
  // console.log("courseID", courseId);
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      {payment?.status === 0 ? (
        <div className="text-center">
          <AiOutlineCheckCircle className="text-6xl mx-auto text-[#309255]" />
          <h1 className="text-3xl font-bold mb-4">Payment successful</h1>
          <div className="text-center">
            <p className="text-lg text-gray-600">
              You have successfully enrolled{" "}
              <span className="text-[#309255] font-bold">{courseName}</span>
            </p>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Your Transaction is{" "}
              <span className="text-[#309255] font-bold">
                {payment?.transactionId}
              </span>
              , and the total amount is{" "}
              <span className="text-[#309255] font-bold">
                {" "}
                {payment?.total && payment?.total.toLocaleString()}
              </span>
              VND. You can review your transaction details at Transaction. If
              you need any further assistance, please don&apos;t hesitate to
              contact us.
            </p>

            <p className="text-lg text-gray-600 mb-4">ThankYou</p>
          </div>
          <button
            className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4"
            onClick={handleClickGotoCourse}
          >
            Go to Course
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleClickBacktoCourse}
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className="text-center">
          <AiFillExclamationCircle className="text-6xl mx-auto text-red-500" />
          <h1 className="text-3xl font-bold mb-4">Payment not successful</h1>
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Your payment was not successful. Please review your payment
              details and try again. If you need any assistance, please
              don&apos;t hesitate to contact us.
            </p>
          </div>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClickBacktoCourse}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default AfterPayment;
function setLectures(data: any) {
  throw new Error("Function not implemented.");
}
