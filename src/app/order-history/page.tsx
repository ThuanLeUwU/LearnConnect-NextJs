"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Avatar,
  Breadcrumb,
  Button,
  DatePicker,
  Modal,
  Select,
  Spin,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { UserAuth } from "@/app/context/AuthContext";
import { SortOrder } from "antd/es/table/interface";
import { http } from "@/api/http";
import InstructorCourseStyle from "./styles/style.module.scss";
import moment from "moment";
import "moment/locale/vi";
import dayjs from "dayjs";
import Link from "next/link";
import { Revenue } from "../revenue/page";
// import ReactApexChart from "react-apexcharts";
import { TotalStatistic } from "@/app/revenue/page";
import { format } from "date-fns";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface StatisticData {
  statisticsByDate: any;
  date: string;
  newCoursesFee: number;
  newCoursesFree: number;
  newMentors: number;
  newEnrollments: number;
  newRevenue: number;
}

interface StatisticStatusData {
  totalCourseStatusStatistic: any;
  coursesActive: number;
  coursesPending: number;
  coursesReject: number;
  coursesBan: number;
}

export type Transaction = {
  userBuy: string;
  courseName: string;
  price: number;
  transactionId: number;
  createDate: string;
  successDate: string;
  transactionError: string;
  status: number;
  mentorPay: string;
  amount: number;
};

const OrderHistory = () => {
  const [selectedComponent, setSelectedComponent] = useState("MentorRequest");
  const { id, userData } = UserAuth();
  const { Option } = Select;

  const [selected2, setSelected2] = useState<string>("Last Week");
  const handleChangeSelected2 = (e: any) => {
    setSelected2(e);
  };
  const [activeTab, setActiveTab] = useState("revenue");
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  const timeLine = [
    { title: "Last Day", value: "day" },
    { title: "Last Week", value: "week" },
    { title: "Last Month", value: "month" },
  ];

  const [pagination, setPagination] = useState({
    showSizeChanger: false, // Ẩn tuỳ chọn chọn số lượng bản ghi trên mỗi trang
    showQuickJumper: false,
    current: 1,
    pageSize: 10, // Số dòng mỗi trang
  });

  const [isModal, setIsModal] = useState(false);
  const [enrollList, setEnrollList] = useState<Revenue[]>([]);

  const detailsEnroll = (value) => {
    // Đặt logic xử lý cho việc lọc dữ liệu theo ngày ở đây
    // console.log("vải", value.usersEnroll);
    setIsModal(true);
    setEnrollList(value.usersEnroll);
  };

  const handlePageChange = (current, pageSize) => {
    setPagination({
      showSizeChanger: false, // Ẩn tuỳ chọn chọn số lượng bản ghi trên mỗi trang
      showQuickJumper: false,
      current,
      pageSize,
    });
  };

  const [pagination2, setPagination2] = useState({
    showSizeChanger: false, // Ẩn tuỳ chọn chọn số lượng bản ghi trên mỗi trang
    showQuickJumper: false,
    current: 1,
    pageSize: 5, // Số dòng mỗi trang
  });

  const handlePageChange2 = (current, pageSize) => {
    setPagination2({
      showSizeChanger: false, // Ẩn tuỳ chọn chọn số lượng bản ghi trên mỗi trang
      showQuickJumper: false,
      current,
      pageSize,
    });
  };

  const today = dayjs();

  const [transaction, setTransaction] = useState<Transaction[]>([]);

  const [eachCourse, setEachCourse] = useState<Revenue[]>([]);
  const [date, setDate] = useState<any>("");
  console.log("date is:", date);

  const [totalStatistic, setTotalStatistic] = useState<TotalStatistic>();
  const [courseStatistic2, setCourseStatistic2] = useState<StatisticData[]>([]);
  const [totalStatusCourses, setTotalStatusCourse] =
    useState<StatisticStatusData>();
  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectserver.azurewebsites.net/api/payment-transaction/transaction-history-mentor?mentorUserId=${id}&filterDate=${date}`
        )
        .then((res) => {
          setEachCourse(res.data); // Update to use the provided data directly
        });
    } catch (e) {
      console.error(e);
    }
  }, [activeTab, userData, date]);

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectserver.azurewebsites.net/api/payment-transaction/statistic-revenue-mentor?mentorUserId=${id}&filterType=${
            selected2 === "Last Week" ? "week" : selected2
          }`
        )
        .then((res) => {
          setTotalStatistic(res.data.totalStatisticInfo);
          setCourseStatistic2(res.data.statisticsByDate);
          setTotalStatusCourse(res.data.totalCourseStatusStatistic);
        });
    } catch (e) {
      console.error(e);
    }
  }, [selected2, id]);

  useEffect(() => {
    const categories = courseStatistic2.map((entry) =>
      format(new Date(entry.date), "MMM dd")
    );

    setMixChart({
      ...mixedChart,
      options: {
        ...mixedChart.options,
        xaxis: {
          categories: categories,
        },
      },
      series: [
        {
          ...mixedChart.series[0],
          data: courseStatistic2.map((entry) => entry.newRevenue),
        },
        {
          ...mixedChart.series[1],
          data: courseStatistic2.map((entry) => entry.newEnrollments),
        },
      ],
    });
  }, [courseStatistic2]);

  const [mixedChart, setMixChart] = useState({
    options: {
      chart: {
        stacked: false,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: false,
          },
          export: {
            csv: {
              filename: "Revenue Statistics",
              columnDelimiter: ",",
              headerCategory: "Date",
              headerValue: "value",
            },
            svg: {
              filename: "Statistics",
            },
            png: {
              filename: "Statistics",
            },
          },
          autoSelected: "zoom" as "zoom",
        },
      },
      xaxis: {
        categories: [] as string[],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#309255",
          },
          labels: {
            style: {
              colors: "#309255",
            },
          },
          title: {
            text: "Revenue (in VND)",
            style: {
              color: "#309255",
            },
          },
          tooltip: {
            enabled: true,
          },
          fill: {
            colors: ["#309255"], // Màu của miền giá trị trục y
          },
        },
        {
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "rgba(254,176,25,1)",
          },
          labels: {
            style: {
              colors: "rgba(254,176,25,1)",
            },
          },
          title: {
            text: "Enrollments",
            style: {
              color: "rgba(254,176,25,1)",
            },
          },
          fill: {
            colors: ["rgba(254,176,25,1)"], // Màu của miền giá trị trục y
          },
        },
      ],
    },
    series: [
      {
        name: "Revenue",
        type: "column",
        data: [] as number[],
      },
      {
        name: "Enrollments",
        type: "line",
        data: [] as number[],
      },
    ],
  });

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
      title: "Statistics",
      href: "/revenue",
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "successDate",
      key: "successDate",
      width: 200,
      sorter: (a, b) => a.successDate.localeCompare(b.successDate),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
    },

    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      sorter: (a, b) => a.courseName.localeCompare(b.courseName),
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "User Enroll",
      dataIndex: "userEnrroll",
      key: "userEnrroll",
      width: 200,
      sorter: (a, b) => a.userEnrroll.localeCompare(b.userEnrroll),
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "Revenue (VND)",
      dataIndex: "amount",
      key: "amount",
      width: 160,
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (price) => (price === 0 ? <>Free</> : numberWithCommas(price)),
    },
    {
      title: "Transaction Code",
      dataIndex: "transactionId",
      key: "transactionId",
      width: 250,
      sorter: (a, b) => a.transactionId - b.transactionId,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text) => (text === null ? <>-</> : text),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      sorter: (a, b) => a.status - b.status,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "Note",
      dataIndex: "transactionError",
      key: "transactionError",
      sorter: (a, b) => {
        const errorA = a.transactionError || "";
        const errorB = b.transactionError || "";
        return errorA.localeCompare(errorB);
      },
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text) => (text === null ? <>-</> : text),
    },
  ];
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const disabledDate = (current: dayjs.Dayjs | null) => {
    return current ? current.isAfter(today) : false;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "green"; // Màu xanh cho trạng thái Active
      case 1:
        return "red"; // Màu đỏ hồng cho trạng thái Banned
      case 2:
        return "yellow"; // Màu yellow cho trạng thái Pending
      default:
        return "defaultColor"; // Màu mặc định nếu status không phù hợp với bất kỳ trạng thái nào
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Success";
      case 1:
        return "Error";
      case 2:
        return "Pending";
      default:
        return "gray";
    }
  };

  const handleDateChange = (date: any, dateString: string) => {
    // console.log("Selected Dates:", date.format("YYYY-MM-DD"));
    console.log("Formatted Dates:", dateString);
    setDate(dateString);
  };

  return (
    <>
      <>
        {!userData ? (
          <div className="text-center text-5xl mt-5">
            <Spin size="large" />
          </div>
        ) : (
          <div className={`${InstructorCourseStyle.content_wrapper} `}>
            <div className={`${InstructorCourseStyle.sidebar_wrapper}`}>
              <div className={`${InstructorCourseStyle.sidebar_list}`}>
                {menuItem.map((item, index) => {
                  return (
                    <Tooltip key={index} title={item.title}>
                      <Link
                        key={index}
                        href={item.href}
                        className={`${InstructorCourseStyle.sidebar_active} mt-5`}
                      >
                        <img src={item.image} alt="image"></img>
                      </Link>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
            <div className={`${InstructorCourseStyle.body_wrapper}`}>
              <div className="flex flex-col pb-5 gap-2">
                <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <div className="text-start font-semibold text-2xl my-5 px-4">
                        Transaction History
                      </div>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <DatePicker
                    onChange={handleDateChange}
                    format="YYYY-MM-DD"
                    // defaultValue={today}
                    disabledDate={disabledDate}
                    style={{ height: "40px" }}
                  />
                </div>
              </div>
              <div className="mx-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg">
                <Table
                  dataSource={eachCourse}
                  columns={columns}
                  pagination={{ ...pagination, onChange: handlePageChange }}
                />
              </div>
              <div className="mt-10 rounded-lg border-solid border-2 mx-5 p-10 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-semibold mb-0 leading-5 flex items-center">
                    Revenue
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
                    options={mixedChart.options}
                    series={mixedChart.series}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default OrderHistory;
