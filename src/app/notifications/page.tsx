"use client";
import ".././globals.css";
import { UserAuth, UserRole } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import useDataNotificationsFetcher from "@/components/pagination/useDataNotificationsFetcher";
import Paginate from "@/components/pagination/pagination";
import { http } from "@/api/http";
import { Breadcrumb, Spin } from "antd";
import { Empty } from "antd";
import { useRouter } from "next/navigation";
import moment from "moment";
// import { User } from "firebase/auth";

export default function ProfileUser() {
  const {
    loading,
    notificationContent,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useDataNotificationsFetcher();
  const { id, jwtToken, role } = UserAuth();
  // const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = currentPage * pageSize;
  // const currentNotifications = notificationContent.slice(startIndex, endIndex);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const router = useRouter();
  // console.log("notificationContent", notificationContent);
  const returnHome = () => {
    switch (role) {
      case UserRole.Student:
        router.push("/");
        break;
      case UserRole.Mentor:
        router.push("/instructorcourses");
        break;
      case UserRole.Staff:
        router.push("/staff-page");
        break;
      case UserRole.Admin:
        router.push("/user-manage");
        break;
      default:
        break;
    }
  };
  const breadcrumbsHome = () => {
    // router.push("/");
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
            <Breadcrumb className="font-semibold text-2xl py-5 px-64 flex-auto">
              <Breadcrumb.Item>
                <button onClick={returnHome}>Home</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>Notifications</span>
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
      <div className="container">
        {loading ? (
          <div className="text-center text-5xl mt-5">
            <Spin size="large" />
          </div>
        ) : (
          <div className="min-h-[60vh]">
            {notificationContent.length === 0 ? (
              <div className="text-center text-2xl mt-8 items-center justify-center">
                <Empty description={false} />
                You don&apos;t have any Notification.
              </div>
            ) : (
              <div className="flex justify-center items-center container">
                <div className="w-4/5 bg-[#f1f6f3] mt-10 rounded-lg">
                  {notificationContent
                    .sort((a, b) => Number(b.id) - Number(a.id))
                    .map((notification) => (
                      <div
                        className="notification-container my-5 border-2 border-green-600 p-4 rounded-lg hover:bg-[#e7f8ee] mx-10"
                        key={notification.id}
                      >
                        <h3 className="text-lg font-bold">
                          {notification.title}
                        </h3>
                        <p className="text-gray-800">
                          {notification.description}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {moment(notification.timeStamp)
                            .locale("en")
                            .format("LLL")}{" "}
                        </p>
                        <p
                          className={`text-sm ${
                            notification.isRead
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {/* {notification.isRead ? "Read" : "Unread"} */}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
        {notificationContent.length > 0 && (
          <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}
