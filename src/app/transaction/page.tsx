"use client";
// import Transaction from "@/components/transaction/transaction";
import ".././globals.css";
import useDataPaymentFetcher from "@/components/pagination/useDataPaymentFetcher";
import Paginate from "@/components/pagination/pagination";
import axios from "axios";
import { Breadcrumb, Spin, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

const Transaction = () => {
  const router = useRouter();
  const { role } = UserAuth();
  useEffect(() => {
    if (role === 0) {
      router.push(`/user-manage`);
    }
    if (role === 1) {
      router.push(`/staff-page`);
    }
    // if (role === 2) {
    //   router.push(`/instructorcourses`);
    // }
    // if (role === 3) {
    //   router.push(`/`);
    // }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });
  const { loading, transaction, totalPages, currentPage, setCurrentPage } =
    useDataPaymentFetcher();
  const { jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

  const breadcrumbsHome = () => {
    router.push("/");
  };

  return (
    <>
      <div className="bg-[#e7f8ee]">
        <div
          className="bg-no-repeat bg-auto flex flex-row justify-between"
          style={{
            backgroundImage: "url('/images/shape-23.png')",
          }}
        >
          <div>
            <Breadcrumb className="font-semibold text-3xl py-5 px-64 flex-auto">
              <Breadcrumb.Item>
                <button onClick={breadcrumbsHome}>Home</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>Order History</span>
              </Breadcrumb.Item>
            </Breadcrumb>{" "}
          </div>
          <div
            className="w-2/5 bg-auto bg-no-repeat bg-right-top flex-1"
            style={{
              backgroundImage: "url('/images/shape-24.png')",
            }}
          />
        </div>
      </div>
      <div className="container py-8">
        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Transaction History
        </h2> */}
        {/* <p className="mb-6 text-gray-600">View your Transaction History</p> */}
        {loading ? (
          <div className="text-center text-2xl text-gray-600">
            <Spin size="large" />
          </div>
        ) : (
          <div className="w-full overflow-x-auto min-h-[500px]">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Course Name</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-2 py-2">Transaction ID</th>
                  <th className="px-4 py-2">Create Date</th>
                  <th className="px-4 py-2">Success Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {transaction.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-[#e7f8ee]" : ""}
                  >
                    <td className="border px-4 py-3 font-bold">
                      {item.paymentTransaction.courseName}
                    </td>
                    <td className="border px-4 py-3 relative font-bold w-[175px]">
                      {item.paymentTransaction.total &&
                        item.paymentTransaction.total.toLocaleString()}{" "}
                      <span className="absolute right-4 text-gray-500 font-bold">
                        VND
                      </span>
                    </td>
                    <td className={`border px-4 py-3 text-center font-bold`}>
                      {item.paymentTransaction.status === 0 ? (
                        <div className="border border-[#309255] p-1 rounded-lg text-[#309255]">
                          Success
                        </div>
                      ) : item.paymentTransaction.status === 1 ? (
                        <Tooltip
                          title={item.paymentTransaction.transactionError}
                        >
                          <button className="border border-red-400 p-1 rounded-lg text-red-400 px-3">
                            Error
                          </button>
                        </Tooltip>
                      ) : item.paymentTransaction.status === 2 ? (
                        <div className="border border-yellow-400 p-1 rounded-lg text-yellow-400">
                          Pending
                        </div>
                      ) : (
                        <div className="border p-1">Unknown Status</div>
                      )}
                    </td>
                    <td className="border px-4 py-3 text-center font-bold">
                      {item.paymentTransaction.transactionId}
                    </td>
                    <td className="border px-4 py-3 text-center font-bold">
                      <div>
                        {item.paymentTransaction.createDate
                          ? new Date(
                              item.paymentTransaction.createDate
                            ).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : ""}
                      </div>
                      <div>
                        {item.paymentTransaction.createDate
                          ? new Date(
                              item.paymentTransaction.createDate
                            ).toLocaleTimeString("en-US")
                          : ""}
                      </div>
                    </td>
                    <td className="border px-4 py-3 text-center font-bold">
                      <div>
                        {item.paymentTransaction.successDate
                          ? new Date(
                              item.paymentTransaction.successDate
                            ).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : ""}
                      </div>
                      <div>
                        {item.paymentTransaction.successDate
                          ? new Date(
                              item.paymentTransaction.successDate
                            ).toLocaleTimeString("en-US")
                          : ""}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Paginate
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Transaction;
