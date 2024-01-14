"use client";
import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Button } from "react-bootstrap";
import {
  Avatar,
  Breadcrumb,
  Empty,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Tooltip as TooltipANT,
} from "antd";
import InstructorCourseStyle from "./styles/style.module.scss";
import Link from "next/link";
import { Rating } from "@mui/material";
import { http } from "@/api/http";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Chart } from "react-google-charts";
import {
  ArrowUpOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import ChartRevenue from "@/components/chart-revenue/page";
interface RevenueEntry {
  date: string;
  revenueDate: number;
}

interface CourseData {
  courseName: string;
  totalEnroll: number;
  revenue: number;
  courseStatistics: any;
}

interface EnrollmentData {
  name: string;
  enrollment: number;
}

export type TotalStatistic = {
  totalStatisticInfo: any;
  totalRevenue: number;
  totalActiveCourses: number;
  totalEnrollments: number;
  totalMentors: number;
};

export type Revenue = {
  date: string;
  dayOfWeek: string;
  revenueDate: number;
  revenueCourse: any;
  courseName: string;
  totalEnroll: number;
  totalRevenueCourse: number;
  usersEnroll: any;
  userId: number;
  userName: string;
  userImage: string;
  enrollmentDate: string;
};

const Revenue = () => {
  const { role } = UserAuth();
  const router = useRouter();
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
    if (role === 3) {
      router.push(`/`);
    }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });
  const { id, userData } = UserAuth();

  const [today, setToday] = useState<string>();
  const [listDate, setListDate] = useState<RevenueEntry[]>([]);
  const moment = require("moment-timezone");

  const menuItem = [
    {
      image: "/menu-icon/book-alt.png",
      title: "Courses",
      href: "/instructorcourses",
    },
    {
      image: "/menu-icon/file-edit.png",
      title: "Requests",
      href: "/request-history",
    },
    {
      image: "/menu-icon/feedback-review.png",
      title: "Reviews",
      href: "/review-mentor",
    },

    {
      image: "/menu-icon/receipt.png",
      title: "Transaction History",
      href: "/order-history",
    },
    {
      image: "/menu-icon/money-check-edit.png",
      title: "Statistic",
      href: "/revenue",
    },
  ];
  const [selected1, setSelected1] = useState<string>("Last Week");
  const handleChangeSelected1 = (e: any) => {
    setSelected1(e);
  };
  const [selected2, setSelected2] = useState<string>("Last Week");
  const handleChangeSelected2 = (e: any) => {
    setSelected2(e);
  };

  const timeLine = [
    { title: "Last Day", value: "day" },
    { title: "Last Week", value: "week" },
    { title: "Last Month", value: "month" },
  ];

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState<string | null>(null);
  useEffect(() => {
    if (Array.isArray(listDate) && listDate.length > 0) {
      setDate(listDate[listDate.length - 1].date);
      http
        .get(
          `https://learnconnectserver.azurewebsites.net/api/payment-transaction/revenue-mentor?mentorUserId=${id}&filterDate=${new Date(
            listDate[listDate.length - 1].date
          )
            .toISOString()
            .slice(0, 10)}`
        )
        .then((res) => {
          setEachCourse(res.data[0].revenueCourse);
        });
    }
  }, [listDate, id]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { Option } = Select;

  const [revenueEachCourse, setRevenueEachCourse] = useState<Revenue>();

  const [eachCourse, setEachCourse] = useState<Revenue[]>([]);

  const handleFilterClick = (selectedDate) => {
    // Đặt logic xử lý cho việc lọc dữ liệu theo ngày ở đây
    setDate(selectedDate);

    http
      .get(
        `https://learnconnectserver.azurewebsites.net/api/payment-transaction/revenue-mentor?mentorUserId=${id}&filterDate=${selectedDate}`
      )
      .then((response) => {
        setRevenueEachCourse(response.data);
        setEachCourse(response.data[0].revenueCourse);
      })
      .catch((err) => {
        console.error("data fetch fail", err);
      });
  };

  const [isModal, setIsModal] = useState(false);
  const [enrollList, setEnrollList] = useState<Revenue[]>([]);

  const detailsEnroll = (value) => {
    // Đặt logic xử lý cho việc lọc dữ liệu theo ngày ở đây
    setIsModal(true);
    setEnrollList(value);
  };

  const handleCancel = () => {
    setIsModal(false);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "userImage",
      key: "userImage",
      render: (userImage) => <Avatar src={userImage} />,
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Time",
      dataIndex: "enrollmentDate",
      key: "enrollmentDate",
      render: (enrollmentDate) => moment(enrollmentDate).format("HH:mm:ss"),
    },
  ];

  const [chartData, setChartData] = useState<Array<Array<string | number>>>([]);
  const [maxRevenue, setMaxRevenue] = useState<number>(0);

  const [chartEnroll, setChartEnroll] = useState<Array<Array<string | number>>>(
    []
  );
  const [maxEnrollment, setMaxEnrollment] = useState<number>(0);

  const [sortOrder1, setSortOrder1] = useState<string>("");

  const [clickCount1, setClickCount1] = useState(1);
  console.log(sortOrder1, clickCount1);

  const handleSort1 = () => {
    let newSortOrder;

    switch (clickCount1 % 3) {
      case 0:
        newSortOrder = ""; // Không sắp xếp
        console.log("tao 1");
        break;
      case 1:
        newSortOrder = "asc"; // Sắp xếp tăng dần
        console.log("tao 2");
        break;
      case 2:
        newSortOrder = "desc"; // Sắp xếp giảm dần
        console.log("tao 3");
        break;
      default:
        newSortOrder = "";
    }

    setSortOrder1(newSortOrder);
    // onSort(newSortOrder);
    setClickCount1(clickCount1 + 1);

    // Tăng số lần bấm
  };

  const getIcon1 = () => {
    if (sortOrder1 === "asc") {
      return <CaretUpOutlined style={{ fontSize: "24px" }} />;
    } else if (sortOrder1 === "desc") {
      return <CaretDownOutlined style={{ fontSize: "24px" }} />;
    } else {
      return <SortAscendingOutlined style={{ fontSize: "24px" }} />;
    }
  };

  const [totalStatistic, setTotalStatistic] = useState<TotalStatistic>();
  const [courseStatistic1, setCourseStatistic1] = useState<CourseData[]>([]);
  console.log(courseStatistic1);

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectserver.azurewebsites.net/api/payment-transaction/statistic-mentor?mentorUserId=${id}&filterType=${
            selected1 === "Last Week" ? "week" : selected1
          }&sortBy=revenue&sortOrder=${sortOrder1}`
        )
        .then((res) => {
          setTotalStatistic(res.data[0].totalStatisticInfo);
          setCourseStatistic1(res.data[0].courseStatistics);
        });
    } catch (e) {
      console.error(e);
    }
  }, [sortOrder1, selected1, id]);

  useEffect(() => {
    const processedData1: (string | number)[][] = [["Course", "Revenue"]];
    let localMaxRevenue = 0;
    courseStatistic1.forEach((course) => {
      processedData1.push([course.courseName, course.revenue]);
      localMaxRevenue = Math.max(localMaxRevenue, course.revenue);
    });

    setMaxRevenue(localMaxRevenue);
    setChartData(processedData1);
  }, [courseStatistic1]);

  const [courseStatistic2, setCourseStatistic2] = useState<CourseData[]>([]);
  const [sortOrder2, setSortOrder2] = useState<string>("");

  const [clickCount2, setClickCount2] = useState(1);
  console.log(sortOrder2, clickCount2);

  const handleSort2 = () => {
    let newSortOrder;

    switch (clickCount2 % 3) {
      case 0:
        newSortOrder = ""; // Không sắp xếp
        console.log("tao 1");
        break;
      case 1:
        newSortOrder = "asc"; // Sắp xếp tăng dần
        console.log("tao 2");
        break;
      case 2:
        newSortOrder = "desc"; // Sắp xếp giảm dần
        console.log("tao 3");
        break;
      default:
        newSortOrder = "";
    }

    setSortOrder2(newSortOrder);
    // onSort(newSortOrder);
    setClickCount2(clickCount2 + 1);
    // Tăng số lần bấm
  };

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectserver.azurewebsites.net/api/payment-transaction/statistic-mentor?mentorUserId=${id}&filterType=${
            selected2 === "Last Week" ? "week" : selected2
          }&sortBy=totalenroll&sortOrder=${sortOrder2}`
        )
        .then((res) => {
          setTotalStatistic(res.data[0].totalStatisticInfo);
          setCourseStatistic2(res.data[0].courseStatistics);
        });
    } catch (e) {
      console.error(e);
    }
  }, [sortOrder2, selected2, id]);

  useEffect(() => {
    const processedData2: (string | number)[][] = [["Course", "Enrollments"]];
    let localMaxRevenue = 0;

    courseStatistic2.forEach((course) => {
      processedData2.push([course.courseName, course.totalEnroll]);
      localMaxRevenue = Math.max(localMaxRevenue, course.totalEnroll);
    });

    setMaxRevenue(localMaxRevenue);
    setChartEnroll(processedData2);
  }, [courseStatistic2]);

  const getIcon2 = () => {
    if (sortOrder2 === "asc") {
      return <CaretUpOutlined style={{ fontSize: "24px" }} />;
    } else if (sortOrder2 === "desc") {
      return <CaretDownOutlined style={{ fontSize: "24px" }} />;
    } else {
      return <SortAscendingOutlined style={{ fontSize: "24px" }} />;
    }
  };

  return (
    <>
      {!userData ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className={`${InstructorCourseStyle.content_wrapper}`}>
          <div className={`${InstructorCourseStyle.sidebar_wrapper}`}>
            <div className={`${InstructorCourseStyle.sidebar_list}`}>
              {menuItem.map((item, index) => {
                return (
                  <TooltipANT key={index} title={item.title}>
                    <Link
                      key={index}
                      href={item.href}
                      className={`${InstructorCourseStyle.sidebar_active} mt-5`}
                    >
                      <img src={item.image} alt="image"></img>
                    </Link>
                  </TooltipANT>
                );
              })}
            </div>
          </div>
          {loading ? (
            <div className="text-center text-5xl mt-5">
              <Spin size="large" />
            </div>
          ) : (
            <div className={`${InstructorCourseStyle.body_wrapper} `}>
              <div
                className={`${InstructorCourseStyle.course_tab} bg-[#e7f8ee]`}
              >
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <div className="text-start font-semibold text-2xl my-5 px-4">
                      Statistics
                    </div>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <div className="mt-10 mx-10 flex flex-row gap-4 justify-between">
                <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row w-[480px] min-h-[200px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="text-xl">Total Income (VND)</div>
                    <div className="text-3xl">
                      {totalStatistic?.totalRevenue &&
                        totalStatistic?.totalRevenue.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="/images/profits.png"
                      className="w-[128px] h-[128px]"
                    />
                  </div>
                </div>
                <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row w-[480px] min-h-[200px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="text-xl">Courses Active</div>
                    <div className="text-5xl">
                      {totalStatistic?.totalActiveCourses}{" "}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="/images/social.png"
                      className="w-[128px] h-[128px]"
                    />
                  </div>
                </div>
                <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row w-[480px] min-h-[200px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="text-xl">Enrollments</div>
                    <div className="text-5xl">
                      {totalStatistic?.totalEnrollments}
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <img
                      src="/images/enroll.png"
                      className="w-[128px] h-[128px]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-lg border-solid border-2 mx-10 p-5 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-col gap-4 ">
                <div className="flex gap-5 justify-between">
                  <div className="text-2xl font-semibold mb-0 leading-5">
                    Income Of Each Course
                  </div>
                  <div>
                    <Select
                      size="large"
                      defaultValue={selected1}
                      onChange={handleChangeSelected1}
                      style={{ width: 150 }}
                      className="mx-5 "
                    >
                      {timeLine.map((option, index) => (
                        // <div key={index}>hahaha {option.date}</div>
                        <Option key={option.title} value={option.value}>
                          {option.title}
                        </Option>
                      ))}
                    </Select>
                    <Button className="w-10 h-10" onClick={handleSort1}>
                      {getIcon1()}
                    </Button>
                  </div>
                </div>
                {courseStatistic1.length === 0 ? (
                  <Empty />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "1280px",
                      margin: "0 auto",
                    }}
                  >
                    <Chart
                      width={"100%"}
                      height={"800px"}
                      chartType="BarChart"
                      loader={<div>Loading Chart</div>}
                      data={chartData}
                      options={{
                        chartArea: { width: "60%" },
                        hAxis: {
                          title: "Income",
                          minValue: 0,
                        },
                        vAxis: {
                          title: "Course",
                        },
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="mt-10 rounded-lg border-solid border-2 mx-10 p-5 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-col gap-4 ">
                <div className="flex gap-5 justify-between">
                  <div className="text-2xl font-semibold mb-0 leading-5">
                    Number of Students Per Course
                  </div>
                  <div>
                    <Select
                      size="large"
                      defaultValue={selected2}
                      onChange={handleChangeSelected2}
                      style={{ width: 150 }}
                      className="mx-5"
                    >
                      {timeLine.map((option, index) => (
                        <Option key={option.title} value={option.value}>
                          {option.title}
                        </Option>
                      ))}
                    </Select>
                    <Button className="w-10 h-10" onClick={handleSort2}>
                      {getIcon2()}
                    </Button>
                  </div>
                </div>
                {courseStatistic2?.length === 0 ? (
                  <Empty />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "1280px",
                      margin: "0 auto",
                    }}
                  >
                    <Chart
                      width={"100%"}
                      height={"800px"}
                      chartType="BarChart"
                      loader={<div>Loading Chart</div>}
                      data={chartEnroll}
                      options={{
                        chartArea: { width: "60%" },
                        hAxis: {
                          title: "Enrollment",
                          minValue: 0,
                        },
                        vAxis: {
                          title: "Course",
                        },
                      }}
                    />
                  </div>
                )}
              </div>
              <ChartRevenue />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Revenue;
