"use client";
import React, { useEffect, useState } from "react";

import InstructorCourseStyle from "./styles/style.module.scss";
import Link from "next/link";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { http } from "@/api/http";

ChartJs.register(ArcElement, Tooltip, Legend);

interface UserData {
  id: number;
  password: string;
  email: string;
  role: number;
  fullName: string;
  dob?: string | null;
  phoneNumber?: string | null;
  gender?: number | null;
  registrationDate: string;
  lastLoginDate?: string | null;
  bioDescription?: string | null;
  profilePictureUrl: string;
  status: number;
}

interface CourseData {
  id: number;
  name: string;
  // ... (rest of the properties)
  status: number;
}

const Dashboard = () => {
  const menuItem = [
    // {
    //   image: "/menu-icon/icon-1.png",
    //   href: "/instructorcourses",
    // },
    {
      image: "/menu-icon/icon-2.png",
      href: "/user-manage",
    },
    {
      image: "/menu-icon/icon-3.png",
      href: "/dashboard",
    },
    // {
    //   image: "/menu-icon/icon-4.png",
    //   href: "/instructorcourses",
    // },
  ];

  const [chartData, setChartData] = useState<UserData[]>([]);
  const [courseData, setCourseData] = useState<CourseData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(
          "https://learnconnectapitest.azurewebsites.net/api/course"
        );
        const data: CourseData[] = response.data;
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const mapStatusToLabel = (roleId: number): string => {
    switch (roleId) {
      case 0:
        return "Active";
      case 1:
        return "Inactive";
      default:
        return "Unknown Role";
    }
  };

  const statusCounts: Record<number, number> = {};
  courseData.forEach((course) => {
    const roleLabel = mapStatusToLabel(course.status);
    statusCounts[roleLabel] = (statusCounts[roleLabel] || 0) + 1;
  });

  const chartDataFormatted2 = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00FF00"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00FF00"],
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get("/user");
        const data: UserData[] = response.data;
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const mapRoleIdToLabel = (roleId: number): string => {
    switch (roleId) {
      case 0:
        return "Admin";
      case 1:
        return "Staff";
      case 2:
        return "Mentor";
      case 3:
        return "Student";
      default:
        return "Unknown Role";
    }
  };

  const roleCounts: Record<string, number> = {};
  chartData.forEach((user) => {
    const roleLabel = mapRoleIdToLabel(user.role);
    roleCounts[roleLabel] = (roleCounts[roleLabel] || 0) + 1;
  });

  const chartDataFormatted = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        data: Object.values(roleCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#00FF00",
          "#FF4500",
          "#8A2BE2",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#00FF00",
          "#FF4500",
          "#8A2BE2",
        ],
      },
    ],
  };

  return (
    <div className={`${InstructorCourseStyle.content_wrapper}`}>
      <div className={`${InstructorCourseStyle.sidebar_wrapper}`}>
        <div className={`${InstructorCourseStyle.sidebar_list}`}>
          {menuItem.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.href}
                className={`${InstructorCourseStyle.sidebar_active}`}
              >
                <img src={item.image} alt="image"></img>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={`${InstructorCourseStyle.body_wrapper}`}>
        {/* DashBoard */}
        <div className={`${InstructorCourseStyle.body_container}`}>
          <div>
            <h2>Number of Users</h2>
            <Doughnut data={chartDataFormatted} />
          </div>
          <div>
            <h2>Number of Courses</h2>
            <Doughnut data={chartDataFormatted2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
