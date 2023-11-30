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
  const [selected2, setSelected2] = useState<string>("");

  const handleChangeSelected2 = (e: any) => {
    setSelected2(e);
  };
  const [selected3, setSelected3] = useState<string>("");

  const handleChangeSelected3 = (e: any) => {
    setSelected3(e);
  };

  const { Option } = Select;

  const timeLine = [
    { title: "Daily" },
    { title: "Weekly" },
    { title: "Monthly" },
  ];

  // useEffect(() => {
  //   setLoading(false);
  //   // Fetch data from your API using Axios
  //   http
  //     .get<RevenueEntry[]>(
  //       `https://learnconnectapitest.azurewebsites.net/api/payment-transaction/revenue-web-by-week`
  //     )
  //     .then((response) => {
  //       const data = response.data;
  //       setListDate(data);

  //       const sortedData = data.sort(
  //         (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  //       );

  //       const labels = sortedData.map((entry) => {
  //         const entryDateInVN = moment(entry.date).tz("Asia/Ho_Chi_Minh");
  //         const currentDateInVN = moment().tz("Asia/Ho_Chi_Minh");
  //         return entryDateInVN.format("YYYY-MM-DD") ===
  //           currentDateInVN.format("YYYY-MM-DD")
  //           ? "Today"
  //           : entryDateInVN.format("YYYY-MM-DD");
  //       });

  //       const total = sortedData.map((entry) => entry.totalRevenue);
  //       const profits = sortedData.map((entry) => entry.totalRevenue * 0.05);

  //       setChartData({
  //         ...chartData,
  //         labels: labels,
  //         datasets: [
  //           {
  //             ...chartData.datasets[1],
  //             data: total,
  //             label: "Profit",
  //             backgroundColor: "#309255", // Màu cho Revenue
  //             borderColor: "#e7f8ee",
  //             borderWidth: 1,
  //             barPercentage: 0.4,
  //             z: 1,
  //           },
  //           {
  //             ...chartData.datasets[0],
  //             data: profits,
  //             label: "Revenue",
  //             backgroundColor: "#e7f8ee", // Màu cho Profit
  //             borderColor: "#309255",
  //             borderWidth: 1,
  //             barPercentage: 0.4,
  //             z: 0,
  //           },
  //         ],
  //       });
  //       setLoading(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, [selected]);

  // const options = {
  //   type: "bar",
  //   scales: {
  //     y: {
  //       label: true,
  //       beginAtZero: true,
  //       // max: Math.max(...chartData.datasets[0].data) + 10000, // Adjust max value for better visualization
  //       ticks: {
  //         callback: function (value) {
  //           return value.toLocaleString() + " VND"; // Format y-axis ticks as needed
  //         },
  //         stepSize: 100000,
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

  const [incomeChart, setIncomeChart] = useState<Array<Array<string | number>>>(
    []
  );
  // const [maxRevenue, setMaxRevenue] = useState<number>(0);
  useEffect(() => {
    // Dữ liệu giả định
    const sampleData: RevenueEntry[] = [
      { date: "Ngày 1", totalRevenue: 150500 },
      { date: "Ngày 2", totalRevenue: 300400 },
      { date: "Course A", totalRevenue: 180600 },
      { date: "Course A", totalRevenue: 202000 },
      { date: "Course A", totalRevenue: 215000 },
      { date: "Course A", totalRevenue: 432000 },
      { date: "Course A", totalRevenue: 356000 },
    ];

    // Xử lý dữ liệu
    const processedData: Array<Array<string | number>> = [
      ["Course", "Revenue"],
    ];
    let localMaxRevenue = 0;

    sampleData.forEach((course) => {
      processedData.push([course.date, course.totalRevenue]);
      // localMaxRevenue = Math.max(localMaxRevenue, course.revenue);
    });

    // setMaxRevenue(localMaxRevenue);
    setIncomeChart(processedData);
  }, []);

  const [mixedChart, setMixChart] = useState({
    options: {
      chart: {
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 2, 4],
      },
      title: {
        text: "Dual Y-Axis Chart",
        align: "left" as "left",
        offsetX: 110,
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
            color: "#008FFB",
          },
          labels: {
            style: {
              colors: "#008FFB",
            },
          },
          title: {
            text: "Profit (in USD)",
            style: {
              color: "#008FFB",
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#00E396",
          },
          labels: {
            style: {
              colors: "#00E396",
            },
          },
          title: {
            text: "Participants",
            style: {
              color: "#00E396",
            },
          },
        },
      ],
    },
    series: [
      {
        name: "Profit",
        type: "column",
        data: [] as number[],
      },
      {
        name: "Participants",
        type: "line",
        data: [] as number[],
      },
    ],
  });

  useEffect(() => {
    // Simulated data
    const simulatedData: ChartData[] = [
      { date: "2023-01-01", profit: 5000, participants: 100 },
      { date: "2023-01-02", profit: 7000, participants: 120 },
      { date: "2023-01-03", profit: 6000, participants: 90 },
      { date: "2023-01-04", profit: 8000, participants: 110 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
      { date: "2023-01-05", profit: 9000, participants: 130 },
    ];

    const categories = simulatedData.map((entry) => entry.date);

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
          data: simulatedData.map((entry) => entry.profit),
        },
        {
          ...mixedChart.series[1],
          data: simulatedData.map((entry) => entry.participants),
        },
      ],
    });
  }, []);

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
          text: "Số lượng course",
        },
      },
    },
    series: [
      {
        name: "Miễn phí",
        data: [] as number[], // Dữ liệu số lượng course miễn phí
      },
      {
        name: "Trả Phí",
        data: [] as number[], // Dữ liệu tổng số lượng course trừ đi số lượng course miễn phí
      },
    ],
  });

  useEffect(() => {
    // Simulated data
    const simulatedData: StackChartData[] = [
      { date: "2023-01-01", freeCourses: 20, totalCourses: 50 },
      { date: "2023-01-02", freeCourses: 25, totalCourses: 60 },
      { date: "2023-01-03", freeCourses: 18, totalCourses: 55 },
      // ... Add more data ...
    ];

    const categories = simulatedData.map((entry) => entry.date);
    const freeCoursesData = simulatedData.map((entry) => entry.freeCourses);
    const totalCoursesData = simulatedData.map(
      (entry) => entry.totalCourses - entry.freeCourses
    );

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
          data: totalCoursesData,
        },
      ],
    });
  }, []);

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
    const simulatedData: DonutChartData[] = [
      { label: "Active", value: 30 },
      { label: "Pending", value: 20 },
      { label: "Reject", value: 10 },
      { label: "Ban", value: 5 },
    ];

    const labels = simulatedData.map((entry) => entry.label);
    const values = simulatedData.map((entry) => entry.value);

    setDonutChart({
      ...donutChart,
      options: {
        ...donutChart.options,
        labels: labels,
      },
      series: values,
    });
  }, []);

  return (
    <>
      {!userData ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex">
          <LeftNavbar
            page1={"/staff-page"}
            page2={"/staff-page/staff-rating"}
            page3={"/staff-page/staff-report"}
            page4={"/staff-page/moderation"}
            page5={"/staff-page/list-major"}
            page6={"#"}
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
                <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row w-[360px] min-h-[200px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="text-xl font-medium">Toal Courses</div>
                    <div className="text-3xl">200,000,000 </div>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="/images/online-learning.png"
                      className="w-[96px] h-[96px]"
                    />
                  </div>
                </div>
                <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row w-[360px] min-h-[200px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="text-xl font-medium">Total Mentors</div>
                    <div className="text-3xl">200,000,000 VND</div>
                  </div>
                  <div className="flex items-center">
                    <img
                      src="/images/mentor.png"
                      className="w-[96px] h-[96px]"
                    />
                  </div>
                </div>
                <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row w-[360px] min-h-[200px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="text-xl font-medium">Total Enrollments</div>
                    <div className="text-3xl">Tổng Thu Nhập</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <img
                      src="/images/enroll.png"
                      className="w-[96px] h-[96px]"
                    />
                  </div>
                </div>
                <div className="p-5 rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-row w-[360px] min-h-[200px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="text-xl font-medium">
                      Tổng Lợi Nhuận (VND)
                    </div>
                    <div className="text-3xl">200,000,000 </div>
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
                    style={{ width: 120 }}
                    className="mx-5 w-[120px]"
                  >
                    {timeLine.map((option, index) => (
                      <Option key={option.title} value={option.title}>
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
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-semibold mb-0 leading-5 flex items-center">
                    Course Statistics
                  </div>
                  <Select
                    size="large"
                    defaultValue={selected3}
                    onChange={handleChangeSelected3}
                    style={{ width: 120 }}
                    className="mx-5 w-[120px]"
                  >
                    {timeLine.map((option, index) => (
                      // <div key={index}>hahaha {option.date}</div>
                      <Option key={option.title} value={option.title}>
                        {option.title}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-row gap-10">
                  <div className="flex-auto w-6/12">
                    <ReactApexChart
                      options={stackedChart.options}
                      series={stackedChart.series}
                      type="bar"
                      height={350}
                    />
                  </div>
                  <div className="flex-1">
                    <ReactApexChart
                      options={donutChart.options}
                      series={donutChart.series}
                      type="pie"
                      height={350}
                    />
                  </div>
                </div>
                {/* <div className="relative flex justify-center">
                  <Bar data={chartData} options={options}></Bar>
                </div> */}
              </div>
            </div>
            <div className="text-center font-semibold text-5xl pb-5 pl-5">
              Table Details
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
