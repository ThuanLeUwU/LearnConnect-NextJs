"use client";
import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Button } from "react-bootstrap";
import {
  Avatar,
  Breadcrumb,
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
// import {
//   Chart as ChartJs,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Legend,
//   Tooltip,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
import { Chart } from "react-google-charts";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";

// ChartJs.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

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
  // console.log(listDate);

  // const [chartData, setChartData] = useState({
  //   labels: [] as string[],
  //   datasets: [
  //     {
  //       label: "Revenue",
  //       data: [] as number[],
  //       backgroundColor: "#309255d9",
  //       borderColor: "black",
  //       borderWidth: 2,
  //       barPercentage: 0.6,
  //     },
  //   ],
  // });
  const moment = require("moment-timezone");

  // useEffect(() => {
  //   // Fetch data from your API using Axios
  //   http
  //     .get<RevenueEntry[]>(
  //       `https://learnconnectapitest.azurewebsites.net/api/payment-transaction/revenue-mentor-by-week?mentorUserId=${id}`
  //     )
  //     .then((response) => {
  //       const data = response.data;

  //       // console.log("response", data);
  //       setToday(data[0].date);
  //       setListDate(data);
  //       // console.log("listdate", data);
  //       const sortedData = data.sort(
  //         (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  //       );

  //       // setToday()
  //       // Extract data from the API response

  //       const labels = sortedData.map((entry) => {
  //         const entryDateInVN = moment(entry.date).tz("Asia/Ho_Chi_Minh");
  //         const currentDateInVN = moment().tz("Asia/Ho_Chi_Minh");
  //         return entryDateInVN.format("YYYY-MM-DD") ===
  //           currentDateInVN.format("YYYY-MM-DD")
  //           ? "Today"
  //           : entryDateInVN.format("YYYY-MM-DD");
  //         // const entryDate = new Date(entry.date).toISOString().slice(0, 10);
  //         // return entryDate === new Date().toISOString().slice(0, 10)
  //         //   ? "Today"
  //         //   : entryDate;
  //       });
  //       const values = sortedData.map((entry) => entry.revenueDate);

  //       // Update the chart data state
  //       setChartData({
  //         ...chartData,
  //         labels: labels,
  //         datasets: [
  //           {
  //             ...chartData.datasets[0],
  //             data: values,
  //           },
  //         ],
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, [id]);

  // const options = {
  //   scales: {
  //     x: {
  //       title: {
  //         display: true,
  //         text: "Day",
  //         position: "end",
  //       },
  //     },
  //     y: {
  //       beginAtZero: true,
  //       max: Math.max(...chartData.datasets[0].data) + 10000, // Adjust max value for better visualization
  //       ticks: {
  //         callback: function (value) {
  //           return value.toLocaleString(); // Đơn vị cho trục y
  //         },
  //       },
  //       title: {
  //         display: true,
  //         text: "VNĐ",
  //         position: "start",
  //       },
  //     },
  //   },
  //   responsive: true,
  //   // maintainAspectRatio: f,
  //   plugins: {
  //     legend: {
  //       display: false, // Ẩn hiển thị chú giải
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: (context) => {
  //           const label = context.dataset.label || "";
  //           const value = context.parsed.y || 0;

  //           // Format giá trị theo nhu cầu của bạn
  //           return value.toLocaleString();
  //         },
  //       },
  //     },
  //   },
  // };

  const menuItem = [
    {
      image: "/menu-icon/book-alt.png",
      title: "Courses",
      href: "/instructorcourses",
    },
    // {
    //   image: "/menu-icon/icon-2.png",
    //   href: "/dashboard",
    // },
    {
      image: "/menu-icon/feedback-review.png",
      title: "Reviews",
      href: "/review-mentor",
    },
    {
      image: "/menu-icon/money-check-edit.png",
      title: "Revenues",
      href: "/revenue",
    },
    {
      image: "/menu-icon/file-edit.png",
      title: "Requests",
      href: "/request-history",
    },
  ];
  const [selected1, setSelected1] = useState<string>("");
  const handleChangeSelected1 = (e: any) => {
    setSelected1(e);
  };
  const [selected2, setSelected2] = useState<string>("");
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
  // console.log("homnay", date);

  useEffect(() => {
    if (Array.isArray(listDate) && listDate.length > 0) {
      setDate(listDate[listDate.length - 1].date);
      // console.log("homnay1", listDate[listDate.length - 1].date);
      http
        .get(
          `https://learnconnectapitest.azurewebsites.net/api/payment-transaction/revenue-mentor?mentorUserId=${id}&filterDate=${new Date(
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
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { Option } = Select;

  const [revenueEachCourse, setRevenueEachCourse] = useState<Revenue>();

  const [eachCourse, setEachCourse] = useState<Revenue[]>([]);

  const handleFilterClick = (selectedDate) => {
    // Đặt logic xử lý cho việc lọc dữ liệu theo ngày ở đây
    // console.log(`Filter by: ${selectedDate}`);
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

  const [isModal, setIsModal] = useState(false);
  const [enrollList, setEnrollList] = useState<Revenue[]>([]);

  const detailsEnroll = (value) => {
    // Đặt logic xử lý cho việc lọc dữ liệu theo ngày ở đây
    // console.log(`Filter by: ${value}`);
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

  const [sortOrder, setSortOrder] = useState<string>("");

  const [clickCount, setClickCount] = useState(1);
  console.log(sortOrder, clickCount);

  const handleSort = () => {
    let newSortOrder;

    switch (clickCount % 3) {
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

    setSortOrder(newSortOrder);
    // onSort(newSortOrder);
    setClickCount(clickCount + 1);

    // Tăng số lần bấm
  };

  const getIcon = () => {
    if (sortOrder === "ascend") {
      return <CaretUpOutlined />;
    } else if (sortOrder === "descend") {
      return <CaretDownOutlined />;
    } else {
      return <SortAscendingOutlined />;
    }
  };

  const [totalStatistic, setTotalStatistic] = useState<TotalStatistic>();
  // console.log(totalStatistic);

  const [courseStatistic, setCourseStatistic] = useState<CourseData[]>([]);
  console.log(courseStatistic);

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectapitest.azurewebsites.net/api/payment-transaction/statistic-mentor?mentorUserId=${id}&filterType=${
            selected1 === "" ? "day" : selected1
          }&sortBy=revenue&sortOrder=${sortOrder}`
        )
        .then((res) => {
          setTotalStatistic(res.data[0].totalStatisticInfo);
          setCourseStatistic(res.data[0].courseStatistics);
        });
    } catch (e) {
      console.error(e);
    }
  }, [sortOrder, selected1, id]);

  useEffect(() => {
    const processedData: (string | number)[][] = [["Course", "Revenue"]];
    let localMaxRevenue = 0;

    courseStatistic.forEach((course) => {
      processedData.push([course.courseName, course.revenue]);
      localMaxRevenue = Math.max(localMaxRevenue, course.revenue);
    });

    setMaxRevenue(localMaxRevenue);
    setChartData(processedData);
  }, [courseStatistic]);

  useEffect(() => {
    // Dữ liệu giả định
    const sampleData: EnrollmentData[] = [
      { name: "Course A", enrollment: 5 },
      { name: "Course B", enrollment: 2 },
      { name: "Course C", enrollment: 6 },
      { name: "Course D", enrollment: 4 },
    ];

    // Xử lý dữ liệu
    const processedData: Array<Array<string | number>> = [
      ["Course", "Enrollment"],
    ];
    let localMaxRevenue = 0;

    sampleData.forEach((course) => {
      processedData.push([course.name, course.enrollment]);
      localMaxRevenue = Math.max(localMaxRevenue, course.enrollment);
    });

    setMaxEnrollment(localMaxRevenue);
    setChartEnroll(processedData);
  }, []);

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
                    <div className="text-start font-semibold text-4xl my-5 px-4">
                      Revenue
                    </div>
                  </Breadcrumb.Item>
                </Breadcrumb>
                {/* <Select
                  size="large"
                  defaultValue={selected}
                  onChange={handleChangeSelected}
                  style={{ width: 120 }}
                  className="mx-5 w-[120px]"
                >
                  {timeLine.map((option, index) => (
                    // <div key={index}>hahaha {option.date}</div>
                    <Option key={option.title} value={option.title}>
                      {option.title}
                    </Option>
                  ))}
                </Select> */}
              </div>

              <div className="mt-10 mx-10 flex flex-row gap-4 justify-between">
                <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row w-[480px] min-h-[200px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="text-xl">Tổng Lợi Nhuận (VND)</div>
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
                    <div className="text-xl">Tổng khóa học đang hoạt động</div>
                    <div className="text-3xl">
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
                    <div className="text-xl">Tổng học viên tham gia học</div>
                    <div className="text-3xl">
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
                  <Select
                    size="large"
                    defaultValue={selected1}
                    onChange={handleChangeSelected1}
                    style={{ width: 120 }}
                    className="mx-5 w-[120px]"
                  >
                    {timeLine.map((option, index) => (
                      // <div key={index}>hahaha {option.date}</div>
                      <Option key={option.title} value={option.value}>
                        {option.title}
                      </Option>
                    ))}
                  </Select>
                  <Button onClick={handleSort}>
                    <Space>
                      <span>Sort</span>
                    </Space>
                  </Button>
                </div>
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
                      title: "Course Income",
                      chartArea: { width: "60%" },
                      hAxis: {
                        title: "Income",
                        minValue: 0,
                        maxValue: maxRevenue,
                      },
                      vAxis: {
                        title: "Course",
                      },
                    }}
                  />
                </div>
                {/* <div className="relative flex justify-center">
                  <Bar data={chartData} options={options}></Bar>
                </div> */}
              </div>
              <div className="mt-10 rounded-lg border-solid border-2 mx-10 p-5 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-col gap-4 ">
                <div className="flex gap-5 justify-between">
                  <div className="text-2xl font-semibold mb-0 leading-5">
                    Number of Students Per Course
                  </div>
                  <Select
                    size="large"
                    defaultValue={selected2}
                    onChange={handleChangeSelected2}
                    style={{ width: 120 }}
                    className="mx-5 w-[120px]"
                  >
                    {timeLine.map((option, index) => (
                      // <div key={index}>hahaha {option.date}</div>
                      <Option key={option.title} value={option.value}>
                        {option.title}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div
                  style={{
                    width: "100%",
                    maxWidth: "1280px",
                    margin: "0 auto",
                  }}
                >
                  <Chart
                    width={"100%"}
                    height={"500px"}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={chartEnroll}
                    options={{
                      title: "Course Enrollment",
                      chartArea: { width: "80%" },
                      hAxis: {
                        title: "Enrollment",
                        minValue: 0,
                        maxValue: maxEnrollment,
                      },
                      vAxis: {
                        title: "Course",
                      },
                    }}
                  />
                </div>
                {/* <div className="relative flex justify-center">
                  <Bar data={chartData} options={options}></Bar>
                </div> */}
              </div>
            </div>
          )}
          <div className={`${InstructorCourseStyle.body_wrapper}`}>
            <div className="mx-10">
              <div className="bg-[#e5f4eb] rounded-[10px] px-10 ">
                <div className="flex justify-between p-5 items-center text-center ">
                  <div className="w-[350px]">Courses</div>
                  {/* <div className="flex gap-[100px] justify-between"> */}
                  <div className="w-[100px]">Revenue</div>
                  <div>Enrollment</div>
                  {/* </div> */}
                  {date ? (
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
                  ) : (
                    <></>
                  )}
                </div>{" "}
              </div>
              <div className=" flex flex-col">
                {eachCourse.map((item, index) => (
                  <>
                    <div className="flex mt-5 rounded-[10px] py-5 border-solid border px-[60px] hover:border-[#309255] justify-between items-center text-center shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)]">
                      <div className="w-[300px]">{item.courseName}</div>
                      <div className="w-[100px]">{item.totalRevenueCourse}</div>
                      <div className="">{item.totalEnroll}</div>
                      <button
                        className="rounded-[10px] border-solid border-2 p-2"
                        onClick={() => detailsEnroll(item.usersEnroll)}
                      >
                        View Details
                      </button>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <Modal
            title="List Enrollment"
            open={isModal}
            // style={{ width: 800 }}
            // width="35%"
            // onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
          >
            <Table columns={columns} dataSource={enrollList} />
          </Modal>
        </div>
      )}
    </>
  );
};

export default Revenue;
