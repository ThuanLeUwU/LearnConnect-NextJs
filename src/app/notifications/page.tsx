"use client";
import ".././globals.css";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import useDataNotificationsFetcher from "@/components/pagination/useDataNotificationsFetcher";
import Paginate from "@/components/pagination/pagination";
import { http } from "@/api/http";
// import { User } from "firebase/auth";

export default function ProfileUser() {
  const {
    loading,
    notificationContent,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useDataNotificationsFetcher();
  const { id, jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  console.log("notificationContent", notificationContent);

  return (
    <div className="container">
      {loading ? (
        <div className="text-center text-5xl">loading...</div>
      ) : (
        <div className="min-h-[60vh]">
          {notificationContent.length === 0 ? (
            <div className="text-center text-2xl mt-8 items-center justify-center">
              You don&apos;t have any courses.
            </div>
          ) : (
            <div className="container mx-auto p-4">
              {notificationContent
                .sort((a, b) => Number(b.id) - Number(a.id))
                .map((notification) => (
                  <div
                    className="notification-container mt-10 border-2 border-green-600 p-4 rounded-lg hover:bg-[#e7f8ee]"
                    key={notification.id}
                  >
                    <h3 className="text-lg font-bold">{notification.title}</h3>
                    <p className="text-gray-800">{notification.description}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(notification.timeStamp).toLocaleString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }
                      )}
                    </p>
                    <p
                      className={`text-sm ${
                        notification.isRead ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {notification.isRead ? "Read" : "Unread"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      User ID: {notification.userId}
                    </p>
                  </div>
                ))}
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
  );
}
