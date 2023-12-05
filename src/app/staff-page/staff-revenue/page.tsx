"use client";
import LeftNavbar from "@/components/left-navbar/page";
import {
  Breadcrumb,
  Button,
  Form,
  Modal,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import { useEffect, useState } from "react";

// import {
//   Chart as ChartJs,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Legend,
//   Tooltip,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
import { UserAuth } from "@/app/context/AuthContext";
import { http } from "@/api/http";
import { toast } from "sonner";
import Chart from "react-google-charts";
// import ReactApexChart from "react-apexcharts";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { TotalStatistic } from "@/app/revenue/page";
import { format } from "date-fns";

// Load ReactApexChart dynamically to avoid server-side rendering issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// ChartJs.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

interface RevenueEntry {
  date: string;
  totalRevenue: number;
}

interface ChartData {
  date: string;
  profit: number;
  participants: number;
}

interface StackChartData {
  date: string;
  freeCourses: number;
  totalCourses: number;
}

interface DonutChartData {
  label: string;
  value: number;
}

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

export type RevenueMentor = {
  date: string;
  dayOfWeek: string;
  mentorUserId: number;
  mentorName: string;
  bank: string;
  accountNumber: string;
  revenue: number;
  amountToPay: number;
  isPaid: boolean;
};

const StaffRevenue = () => {
  const { id, userData } = UserAuth();
  const [form] = Form.useForm();

  const [rePayModal, setRePayModal] = useState(false);

  const [payToMentor, setPayToMentor] = useState<number>();
  const [mentor, setMentor] = useState<string>("");

  const handleRePayModal = (data: any) => {
    setPayToMentor(data.mentorUserId);
    setMentor(data.mentorName);
    setRePayModal(true);
  };

  const handleRePay = () => {
    try {
      http
        .post(
          `https://learnconnectapitest.azurewebsites.net/api/PayPal/pay-revenue?mentorId=${payToMentor}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          toast.success("Payment Successfully !!!");
          http
            .get(
              "https://learnconnectapitest.azurewebsites.net/api/payment-transaction/aoumt-to-pay-of-mentors-today"
            )
            .then((res) => {
              setRevenueOneMentor(res.data);
            });
        });
    } catch (e) {
      console.error(e);
    }

    setRePayModal(false);
  };

  const handleCancel = () => {
    setRePayModal(false);
  };

  // const [chartData, setChartData] = useState({
  //   labels: [] as string[],

  //   datasets: [
  //     {
  //       label: "Revenue",
  //       data: [] as number[],
  //       backgroundColor: "#309255",
  //       borderColor: "black",
  //       borderWidth: 1,
  //       barPercentage: 0.4,
  //       z: {} as number,
  //     },
  //   ],
  // });
  const moment = require("moment-timezone");
  const [today, setToday] = useState<string>();
  const [listDate, setListDate] = useState<RevenueEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const [selected1, setSelected1] = useState<string>("");

  const handleChangeSelected1 = (e: any) => {
    setSelected1(e);
  };
  const [selected2, setSelected2] = useState<string>("Last Day");

  const handleChangeSelected2 = (e: any) => {
    setSelected2(e);
  };
  const [selected3, setSelected3] = useState<string>("Last Day");

  const handleChangeSelected3 = (e: any) => {
    setSelected3(e);
  };

  const { Option } = Select;

  const timeLine = [
    { title: "Last Day", value: "day" },
    { title: "Last Week", value: "week" },
    { title: "Last Month", value: "month" },
  ];

  const [revenueOneMentor, setRevenueOneMentor] = useState<RevenueMentor[]>([]);

  useEffect(() => {
    try {
      http
        .get(
          "https://learnconnectapitest.azurewebsites.net/api/payment-transaction/aoumt-to-pay-of-mentors-today"
        )
        .then((res) => {
          setRevenueOneMentor(res.data);
        });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Số dòng mỗi trang
  });

  const handlePageChange = (current, pageSize) => {
    setPagination({ current, pageSize });
  };

  // const processedData = data.map((item) => ({
  //   ...item,
  //   amountToPay: item.revenue * 0.95, // Tính toán giá trị theo công thức
  // }));

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: 50,
      sorter: (a, b) => a.mentorName.localeCompare(b.mentorName),
      render: (text, record, index) => {
        const currentIndex =
          (pagination.current - 1) * pagination.pageSize + index + 1;
        return currentIndex;
      },
    },
    {
      title: "Mentor Name",
      dataIndex: "mentorName",
      key: "mentorName",
      sorter: (a, b) => a.accountNumber - b.accountNumber,
    },
    {
      title: "Bank Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      sorter: (a, b) => a.accountNumber - b.accountNumber,
    },
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
      sorter: (a, b) => a.bank.localeCompare(b.bank),
    },
    {
      title: "Courses Revenue",
      dataIndex: "revenue",
      key: "revenue",
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: "Amount To Pay",
      dataIndex: "amountToPay",
      key: "amountToPay",
      sorter: (a, b) => a.amountToPay - b.amountToPay,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          {!record.isPaid ? (
            <button
              className="border-2 px-2 py-1 text-sm rounded-md w-16 hover:border-[#309255] hover:text-white hover:bg-[#59b77d]"
              style={{ color: "black" }}
              onClick={() => handleRePayModal(record)}
            >
              Pay
            </button>
          ) : (
            <button
              disabled
              // color="green"
              className=" border-[#309255] bg-[#59b77d] text-white border-2 px-2 py-1 text-sm rounded-md w-16"
            >
              Paid
            </button>
          )}
        </span>
      ),
    },
  ];

  const [totalStatistic, setTotalStatistic] = useState<TotalStatistic>();
  const [courseStatistic2, setCourseStatistic2] = useState<StatisticData[]>([]);
  const [totalStatusCourses, setTotalStatusCourse] =
    useState<StatisticStatusData>();

  console.log("vv", courseStatistic2);

  const [mixedChart, setMixChart] = useState({
    options: {
      chart: {
        stacked: false,
        toolbar: {
          show: false,
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

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectapitest.azurewebsites.net/api/payment-transaction/statistic-staff?filterType=${
            selected2 === "Last Day" ? "day" : selected2
          }`
        )
        .then((res) => {
          setTotalStatistic(res.data[0].totalStatisticInfo);
          setCourseStatistic2(res.data[0].statisticsByDate);
          setTotalStatusCourse(res.data[0].totalCourseStatusStatistic);
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

  const [courseStatistic3, setCourseStatistic3] = useState<StatisticData[]>([]);
  console.log("yohoho", courseStatistic3);

  const [stackedChart, setStackedChart] = useState({
    options: {
      chart: {
        type: "bar" as "bar",
        stacked: true,
      },
      xaxis: {
        categories: [] as string[], // Dữ liệu ngày
      },
      yaxis: {
        title: {
          text: "Course",
        },
      },
    },
    series: [
      {
        name: "Fee",
        data: [] as number[], // Dữ liệu số lượng course miễn phí
      },
      {
        name: "Free",
        data: [] as number[], // Dữ liệu tổng số lượng course trừ đi số lượng course miễn phí
      },
    ],
  });

  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectapitest.azurewebsites.net/api/payment-transaction/statistic-staff?filterType=${
            selected3 === "Last Day" ? "day" : selected3
          }`
        )
        .then((res) => {
          setTotalStatistic(res.data[0].totalStatisticInfo);
          setCourseStatistic3(res.data[0].statisticsByDate);
          setTotalStatusCourse(res.data[0].totalCourseStatusStatistic);
        });
    } catch (e) {
      console.error(e);
    }
  }, [selected3, id]);

  useEffect(() => {
    // Simulated data

    const categories = courseStatistic3.map((entry) =>
      format(new Date(entry.date), "MMM dd")
    );
    const freeCoursesData = courseStatistic3.map(
      (entry) => entry.newCoursesFree
    );
    const feeCoursesData = courseStatistic3.map((entry) => entry.newCoursesFee);

    setStackedChart({
      ...stackedChart,
      options: {
        ...stackedChart.options,
        xaxis: {
          categories: categories,
        },
      },
      series: [
        {
          ...stackedChart.series[0],
          data: freeCoursesData,
        },
        {
          ...stackedChart.series[1],
          data: feeCoursesData,
        },
      ],
    });
  }, [courseStatistic3]);

  const [donutChart, setDonutChart] = useState({
    options: {
      labels: [] as string[],
      colors: ["#00E396", "#008FFB", "#FEB019", "#FF4560"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          size: 100, // Giảm kích thước phần bị cắt
        },
      } as ApexPlotOptions,
      legend: {
        position: "bottom", // Chỉnh label xuống phía dưới
      },
    } as ApexOptions,
    series: [] as number[],
  });

  useEffect(() => {
    // Simulated data
    const newLabels = ["Active", "Pending", "Reject", "Ban"];
    if (totalStatusCourses) {
      setDonutChart({
        ...donutChart,
        options: {
          ...donutChart.options,
          labels: newLabels,
        },
        series: Object.values(totalStatusCourses),
      });
    }
  }, [totalStatusCourses]);

  return (
    <>
      {!userData ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex w-full">
          <LeftNavbar
            page1={"/staff-page"}
            page2={"/staff-page/staff-rating"}
            page3={"/staff-page/staff-report"}
            page4={"/staff-page/moderation"}
            page5={"/staff-page/list-major"}
            page6={"#"}
            page7={"/staff-page/staff-transaction"}
            // page6={"/staff-page/list-major"}
          />
          {/* <StaffRatingTable /> */}
          <div className="w-full my-4 ">
            <div className="mb-20">
              <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <div className="text-start font-semibold text-4xl my-5 px-4">
                      Revenue
                    </div>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <div className="mt-10 mx-10 flex flex-row gap-4 justify-between">
                <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row max-w-[320px] min-h-[200px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="text-xl font-medium">Total Courses</div>
                    <div className="text-5xl">
                      {totalStatistic?.totalActiveCourses}{" "}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="/images/online-learning.png"
                      className="w-[96px] h-[96px]"
                    />
                  </div>
                </div>
                <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row max-w-[320px] min-h-[200px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="text-xl font-medium">Total Mentors</div>
                    <div className="text-5xl">
                      {totalStatistic?.totalMentors}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="/images/mentor.png"
                      className="w-[96px] h-[96px]"
                    />
                  </div>
                </div>
                <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row max-w-[320px] min-h-[200px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="text-xl font-medium">Total Enrollments</div>
                    <div className="text-5xl">
                      {totalStatistic?.totalEnrollments}
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <img
                      src="/images/enroll.png"
                      className="w-[96px] h-[96px]"
                    />
                  </div>
                </div>
                <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row max-w-[320px] min-h-[200px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="text-xl font-medium">Revenue (VND)</div>
                    <div className="text-3xl">
                      {totalStatistic?.totalRevenue &&
                        totalStatistic?.totalRevenue.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="/images/profits.png"
                      className="w-[96px] h-[96px]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-lg border-solid border-2 mx-10 p-10 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-col gap-4">
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
                {/* <div className="relative flex justify-center">
                  <Bar data={chartData} options={options}></Bar>
                </div> */}
              </div>
              <div className="mt-5 rounded-lg border-solid border-2 mx-10 p-10 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                  <div className="flex-auto w-6/12 ">
                    <div className="flex justify-between">
                      <div className="text-2xl font-semibold mb-0 leading-5 flex items-center">
                        New Course Statistics
                      </div>
                      <Select
                        size="large"
                        defaultValue={selected3}
                        onChange={handleChangeSelected3}
                        // style={{ width: 120 }}
                        className=" w-[150px]"
                      >
                        {timeLine.map((option, index) => (
                          // <div key={index}>hahaha {option.date}</div>
                          <Option key={option.title} value={option.value}>
                            {option.title}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div className="">
                      <ReactApexChart
                        options={stackedChart.options}
                        series={stackedChart.series}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-10">
                      <div className="text-2xl font-semibold mb-0 leading-5 flex items-center justify-center">
                        Course Status
                      </div>
                      <ReactApexChart
                        options={donutChart.options}
                        series={donutChart.series}
                        type="pie"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="relative flex justify-center">
                  <Bar data={chartData} options={options}></Bar>
                </div> */}
              </div>
            </div>
            <div className="text-center font-semibold text-5xl pb-5 pl-5">
              Income of mentors
            </div>
            <Table
              dataSource={revenueOneMentor}
              columns={columns}
              pagination={{ ...pagination, onChange: handlePageChange }}
              className="mx-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg"
            />
          </div>

          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Pay for {mentor}?
              </div>
            }
            open={rePayModal}
            // onOk={handleOk}
            width="35%"
            onCancel={handleCancel}
            footer={false}
            style={{
              top: "30%",
            }}
          >
            <Form
              autoComplete="off"
              form={form}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              layout="horizontal"
              className="mt-5"
              style={{ width: "100%" }}
              onFinish={handleRePay}
            >
              <Space className="justify-end w-full">
                <Form.Item className="mb-0">
                  <Space>
                    <Button
                      className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                      onClick={handleCancel}
                      style={{
                        // backgroundColor: "#4caf50",
                        // borderColor: "#4caf50",
                        border: "2px solid #E0E0E0",
                        color: "black",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="hover:bg-[#67b46a] border border-[#4caf50] bg-[#4caf50] text-white transition duration-300 px-2 py-1"
                      htmlType="submit"
                      style={{
                        // backgroundColor: "#4caf50",
                        // borderColor: "#4caf50",
                        border: "2px solid #4caf50",
                        color: "#fff",
                      }}
                    >
                      Confirm
                    </Button>
                  </Space>
                </Form.Item>
              </Space>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default StaffRevenue;
