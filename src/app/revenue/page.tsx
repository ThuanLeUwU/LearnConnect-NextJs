"use client";
import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Button } from "react-bootstrap";
import { Modal, Select, Space, Spin } from "antd";
import InstructorCourseStyle from "./styles/style.module.scss";
import Link from "next/link";
import { Rating } from "@mui/material";
import { http } from "@/api/http";
import { UserAuth } from "../context/AuthContext";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// export type Revenue = {
//   date: string;
//   dayOfWeek: string;
//   revenueDate: number;
//   revenueCourse: {
//     courseName: string;
//     totalEnroll: number;
//     totalRevenueCourse: string;
//   };
// };

interface RevenueEntry {
  date: string;
  revenueDate: number;
}

export type Revenue = {
  date: string;
  dayOfWeek: string;
  revenueDate: number;
  revenueCourse: any;
  courseName: string;
  totalEnroll: number;
  totalRevenueCourse: number;
};

const Revenue = () => {
  const { id, userData } = UserAuth();

  const [today, setToday] = useState<string>();
  const [listDate, setListDate] = useState<RevenueEntry[]>([]);
  console.log(listDate);

  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Revenue",
        data: [] as number[],
        backgroundColor: "#309255d9",
        borderColor: "black",
        borderWidth: 2,
        barPercentage: 0.6,
      },
    ],
  });

  useEffect(() => {
    // Fetch data from your API using Axios
    http
      .get<RevenueEntry[]>(
        `https://learnconnectapitest.azurewebsites.net/api/payment-transaction/revenue-mentor-by-week?mentorUserId=${id}`
      )
      .then((response) => {
        const data = response.data;
        // console.log("response");
        setToday(data[0].date);
        setListDate(data);
        // console.log("listdate", data);
        const sortedData = data.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        // setToday()
        // Extract data from the API response
        const labels = sortedData.map((entry) => {
          const entryDate = new Date(entry.date).toISOString().slice(0, 10);
          return entryDate === new Date().toISOString().slice(0, 10)
            ? "Today"
            : entryDate;
        });
        const values = sortedData.map((entry) => entry.revenueDate);

        // Update the chart data state
        setChartData({
          ...chartData,
          labels: labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: values,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "VND",
        data: [1000, 5000, 2000, 6000, 3000, 7000, 8000],
        backgroundColor: "#309255d9",
        borderColor: "black",
        borderWidth: 2,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...chartData.datasets[0].data) + 10000, // Adjust max value for better visualization
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // Format y-axis ticks as needed
          },
        },
      },
    },
  };

  const menuItem = [
    {
      image: "/menu-icon/icon-1.png",
      href: "/instructorcourses",
    },
    {
      image: "/menu-icon/icon-2.png",
      href: "/dashboard",
    },
    {
      image: "/menu-icon/icon-3.png",
      href: "/review-mentor",
    },
    {
      image: "/menu-icon/icon1.png",
      href: "/revenue",
    },
  ];

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState("Date");
  console.log("homnay", listDate);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { Option } = Select;

  const optionDate = ["Yesterday", "Today", "Tomorrow"];

  const [revenueEachCourse, setRevenueEachCourse] = useState<Revenue>();

  const [eachCourse, setEachCourse] = useState<Revenue[]>([]);

  console.log(" tao nè", revenueEachCourse);
  console.log(" tao  nuawx nnè", eachCourse);

  const handleFilterClick = (selectedDate) => {
    // Đặt logic xử lý cho việc lọc dữ liệu theo ngày ở đây
    console.log(`Filter by: ${selectedDate}`);
    setDate(selectedDate);

    http
      .get(
        `https://learnconnectapitest.azurewebsites.net/api/payment-transaction/revenue-mentor?mentorUserId=${id}&filterDate=${selectedDate}`
      )
      // setIsMenuOpen(false);
      .then((response) => {
        setRevenueEachCourse(response.data);
        setEachCourse(response.data[0].revenueCourse);
      })
      .catch((err) => {
        console.error("data fetch fail", err);
      });
  };
  const handleChange = (value) => {
    // Đặt logic xử lý cho việc lọc dữ liệu theo ngày ở đây
    console.log(`Filter by: ${value}`);
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
      {loading ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className={`${InstructorCourseStyle.body_wrapper}`}>
          <div className="mt-10 rounded-lg border-solid border-2 mx-10 p-20">
            <div className="flex">
              <div className="text-2xl font-semibold mb-0 pt-4 leading-5">
                Total Revenue
              </div>
            </div>
            <div className="relative">
              <Bar data={chartData} options={options}></Bar>
            </div>
          </div>
        </div>
      )}
      <div className={`${InstructorCourseStyle.body_wrapper}`}>
        <div className="mx-10">
          <div className="bg-[#e5f4eb] rounded-[10px] px-10 ">
            <div className="flex justify-between p-5 items-center text-center ">
              <div className="w-[300px]">Courses</div>
              {/* <div className="flex gap-[100px] justify-between"> */}
              <div className="w-[100px]">Revenue</div>
              <div>Enrollment</div>
              {/* </div> */}
              <Select
                defaultValue={date}
                onChange={handleFilterClick}
                style={{ width: 120 }}
              >
                {listDate.map((option, index) => (
                  // <div key={index}>hahaha {option.date}</div>
                  <Option key={option.date} value={option.date}>
                    {new Date(option.date).toISOString().slice(0, 10)}
                  </Option>
                ))}
              </Select>
            </div>{" "}
          </div>
          <div className=" flex flex-col">
            {eachCourse.map((item, index) => (
              <>
                <div className="flex mt-5 rounded-[10px] py-5 border-solid border-2 px-[60px] justify-between items-center text-center">
                  <div className="w-[300px]">{item.courseName}</div>
                  <div className="w-[100px]">{item.totalRevenueCourse}</div>
                  <div className="">{item.totalEnroll}</div>
                  <button className="rounded-[10px] border-solid border-2 p-2">
                    View Details
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
