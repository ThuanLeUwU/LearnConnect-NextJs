"use client";
import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Button } from "react-bootstrap";
import { Modal, Space, Spin } from "antd";
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

const Revenue = () => {
  const { id, userData } = UserAuth();

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
        max: 10000, // Đặt giá trị tối đa cho trục y
        ticks: {
          callback: function (value) {
            // if (value >= 1000) {
            //   return value / 1000 + "k";
            // }
            return value;
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
          <div className="mt-10 rounded-lg border-solid border-2 mx-10 p-15 px-30 pb-25">
            <div className="flex">
              <div className="text-2xl font-semibold mb-0 pt-4 leading-5">
                Total Revenue
              </div>
            </div>
            <div className="relative">
              <Bar data={data} options={options}></Bar>
            </div>
          </div>
        </div>
      )}
      <div className={`${InstructorCourseStyle.body_wrapper}`}>
        <div className="mx-10">
          <div className="bg-[#e5f4eb] rounded-[10px] px-10 ">
            <div className="flex justify-between p-5 items-stretch ">
              <div className="w-[300px]">Courses</div>
              {/* <div className="flex gap-[100px] justify-between"> */}
              <div className="w-[100px]">Revenue</div>
              <div>Time</div>
              {/* </div> */}
              <div>Day</div>
            </div>{" "}
          </div>
          <div className="mt-5 rounded-[10px] p-5 border-solid flex">
            <div>ádsad</div>
            <div>ádsad</div>
            <div>ádsad</div>
            <div>ádsad</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
