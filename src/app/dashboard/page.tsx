"use client";
import React, { useEffect, useState } from "react";

import InstructorCourseStyle from "./styles/style.module.scss";
import Link from "next/link";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { http } from "@/api/http";
import { Breadcrumb, Select, Tooltip as TooltipANT } from "antd";
import { UserAuth } from "../context/AuthContext";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { TotalStatistic } from "../revenue/page";
import { format } from "date-fns";

// Load ReactApexChart dynamically to avoid server-side rendering issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

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

interface ListUser {
  statisticsByDate: any;

  date: string;
  newUser: number;
}

interface CourseData {
  id: number;
  name: string;
  // ... (rest of the properties)
  status: number;
}

const Dashboard = () => {
  const { id, userData } = UserAuth();

  const menuItem = [
    // {
    //   image: "/menu-icon/icon-1.png",
    //   href: "/instructorcourses",
    // },
    {
      image: "/images/user.png",
      title: "Users",
      href: "/user-manage",
    },
    {
      image: "/images/chart-user.png",
      title: "Dashboard",
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
          "https://learnconnectserver.azurewebsites.net/api/course"
        );
        const data: CourseData[] = response.data;
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userData]);

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

  const [listUser, setListUser] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get("/user");
        setListUser(response.data);
        const data: UserData[] = response.data;
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userData]);

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

  const chartOptions = {
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  const [columnChart, setColumnChart] = useState<{
    options: ApexOptions;
    series: { name: string; data: number[] }[];
  }>({
    options: {
      chart: {
        id: "column-chart",
        type: "bar",
      },
      xaxis: {
        categories: [] as string[],
        labels: {
          rotate: -45,
        },
      },
      yaxis: {
        title: {
          text: "Number",
        },
      },
    },
    series: [
      {
        name: "Number",
        data: [] as number[],
      },
    ],
  });

  const [newUser, setNewUser] = useState<ListUser[]>([]);

  const [totalStatistic, setTotalStatistic] = useState<TotalStatistic>();

  const [selected2, setSelected2] = useState<string>("Last Day");

  const handleChangeSelected2 = (e: any) => {
    setSelected2(e);
  };

  const { Option } = Select;
  const timeLine = [
    { title: "Last Day", value: "day" },
    { title: "Last Week", value: "week" },
    { title: "Last Month", value: "month" },
  ];

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectserver.azurewebsites.net/api/payment-transaction/statistic-staff?filterType=${
            selected2 === "Last Day" ? "day" : selected2
          }`
        )
        .then((res) => {
          setTotalStatistic(res.data[0].totalStatisticInfo);
        });
    } catch (e) {
      console.error(e);
    }
  }, [selected2, id]);

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectserver.azurewebsites.net/api/payment-transaction/statistic-admin?filterType=${
            selected2 === "Last Day" ? "day" : selected2
          }`
        )
        .then((res) => {
          setNewUser(res.data.statisticsByDate);
        });
    } catch (e) {
      console.error(e);
    }
  }, [userData, selected2]);

  useEffect(() => {
    // Mô phỏng dữ liệu từ API
    // const apiData: ListUser[] = [
    //   { date: "2023-01-01", user: 10 },
    //   { date: "2023-01-02", user: 15 },
    //   { date: "2023-01-03", user: 20 },
    //   { date: "2023-01-04", user: 25 },
    //   { date: "2023-01-05", user: 18 },
    // ];

    const categories = newUser.map((entry) =>
      format(new Date(entry.date), "MMM dd")
    );
    const data = newUser.map((entry) => entry.newUser);

    setColumnChart({
      ...chartData,
      options: {
        ...columnChart.options,
        xaxis: {
          categories: categories,
          labels: {
            rotate: -45,
          },
        },
      },
      series: [
        {
          ...columnChart.series[0],
          data: data,
        },
      ],
    });
  }, [newUser]);

  return (
    <div className="w-full">
      <div className={`${InstructorCourseStyle.content_wrapper}`}>
        <div className={`${InstructorCourseStyle.sidebar_wrapper}`}>
          <div className={`${InstructorCourseStyle.sidebar_list}`}>
            {menuItem.map((item, index) => {
              return (
                <TooltipANT title={item.title} key={index}>
                  <Link
                    href={item.href}
                    className={`${InstructorCourseStyle.sidebar_active}`}
                  >
                    <img src={item.image} alt="image"></img>
                  </Link>
                </TooltipANT>
              );
            })}
          </div>
        </div>
        <div className={`${InstructorCourseStyle.body_wrapper}`}>
          {/* DashBoard */}
          <div className={`${InstructorCourseStyle.course_tab} bg-[#e7f8ee]`}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <div className="text-start font-semibold text-2xl my-5 px-4">
                  Statistic
                </div>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="mt-10 mx-10 flex flex-row gap-4 justify-between">
              {/* <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row w-[480px] min-h-[200px] justify-between">
              <div className="flex flex-col gap-4">
                <div className="text-2xl">User</div>
                <div className="text-5xl">5252</div>
              </div>
              <div className="flex items-center">
                <img src="/images/social.png" className="w-[128px] h-[128px]" />
              </div>
            </div> */}
              <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row w-[480px] min-h-[200px] justify-between">
                <div className="flex flex-col gap-4">
                  <div className="text-2xl">Revenue (in VND)</div>
                  <div className="text-5xl">
                    {totalStatistic?.totalRevenue &&
                      totalStatistic?.totalRevenue.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <img
                    src="/images/gross-profit.png"
                    className="w-[128px] h-[128px]"
                  />
                </div>
              </div>
              {/* <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row w-[480px] min-h-[200px] justify-between">
              <div className="flex flex-col gap-4">
                <div className="text-2xl">Profit Margin</div>
                <div className="text-9xl flex items-center justify-center">
                  5%
                </div>
              </div>
              <div className="flex items-center justify-end">
                <img
                  src="/images/gross-profit.png"
                  className="w-[128px] h-[128px]"
                />
              </div>
            </div> */}
              <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] w-[480px] min-h-[200px] ">
                <div className="flex flex-row justify-between ">
                  <div>
                    <h2 className="text-2xl">Number of Users</h2>
                    <div className="text-5xl">{listUser.length}</div>
                  </div>
                  <div className=" w-[250px] h-[250px]">
                    <Doughnut
                      className=""
                      data={chartDataFormatted}
                      options={chartOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-lg border-solid border-2 mx-10 p-10 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-semibold mb-0 leading-5 flex items-center">
                  New User
                </div>
                <Select
                  size="large"
                  defaultValue={selected2}
                  onChange={handleChangeSelected2}
                  // style={{ width: 120 }}
                  className="mx-5 w-[150px]"
                >
                  {timeLine.map((option, index) => (
                    <Option key={option.title} value={option.value}>
                      {option.title}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <ReactApexChart
                  options={columnChart.options}
                  series={columnChart.series}
                  type="bar"
                  height={350}
                />
              </div>
              {/* <div className="relative flex justify-center">
                  <Bar data={chartData} options={options}></Bar>
                </div> */}
            </div>
          </div>

          {/* <div className=""></div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
