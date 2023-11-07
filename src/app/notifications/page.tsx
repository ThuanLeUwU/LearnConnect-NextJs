"use client";
import Link from "next/link";
import ".././globals.css";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
// import { User } from "firebase/auth";

export type Notification = {
  id: string | number;
  title: string;
  description: string;
  isRead: boolean;
  timeStamp: string;
  userId: number;
};
export default function ProfileUser() {
  const { id } = UserAuth();
  const [notificationContent, setNotificationContent] = useState<
    Notification[]
  >([]);

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/notification/byUserId/${id}`
        );
        setNotificationContent(response.data);
      } catch (error) {
        console.error("Error fetching Notification Data:", error);
      }
    };
    if (id) {
      fetchNotificationData();
    }
  }, [id]);

  return (
    <div className="container">
      {notificationContent.map((notification) => (
        <div className="mt-10" key={notification.id}>
          <h3>{notification.title}</h3>
          <p>{notification.description}</p>
          <p>{notification.timeStamp}</p>
          <p>{notification.isRead ? "Read" : "Unread"}</p>
          <p>User ID: {notification.userId}</p>
        </div>
      ))}
    </div>
  );
}
