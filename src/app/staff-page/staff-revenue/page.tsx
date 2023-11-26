"use client";
import LeftNavbar from "@/components/left-navbar/page";
import { Button, Form, Modal, Space, Spin, Table } from "antd";
import { useEffect, useState } from "react";

import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { UserAuth } from "@/app/context/AuthContext";
import { http } from "@/api/http";
import { toast } from "sonner";

ChartJs.register(BarElement, CategoryScale, LinearScale, Legend);

interface RevenueEntry {
  date: string;
  totalRevenue: number;
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
};

const StaffRevenue = () => {
  const { id, userData } = UserAuth();
  const [form] = Form.useForm();

  const [rePayModal, setRePayModal] = useState(false);

  const handleRePayModal = (data: any) => {
    setRePayModal(true);
  };

  const handleRePay = () => {
    toast.success("Payment Successfully !!!");
    setRePayModal(false);
  };

  const handleCancel = () => {
    setRePayModal(false);
  };

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
  const moment = require("moment-timezone");
  const [today, setToday] = useState<string>();
  const [listDate, setListDate] = useState<RevenueEntry[]>([]);

  useEffect(() => {
    // Fetch data from your API using Axios
    http
      .get<RevenueEntry[]>(
        `https://learnconnectapitest.azurewebsites.net/api/payment-transaction/revenue-web-by-week`
      )
      .then((response) => {
        const data = response.data;
        setListDate(data);

        const sortedData = data.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const labels = sortedData.map((entry) => {
          const entryDateInVN = moment(entry.date).tz("Asia/Ho_Chi_Minh");
          const currentDateInVN = moment().tz("Asia/Ho_Chi_Minh");
          return entryDateInVN.format("YYYY-MM-DD") ===
            currentDateInVN.format("YYYY-MM-DD")
            ? "Today"
            : entryDateInVN.format("YYYY-MM-DD");
        });

        const values = sortedData.map((entry) => entry.totalRevenue);

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
  }, []);

  const options = {
    type: "bar",
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
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const currentValue = dataset.data[tooltipItem.index];
          return `Revenue: $${currentValue}`;
        },
      },
    },
  };

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

  const data = [
    {
      key: "1",
      mentorName: "John Doe",
      idNumber: "123456789",
      bank: "1234567890",
      revenue: 5000,
    },
    // Thêm dữ liệu cho các hàng khác nếu cần
  ];

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
    },
    {
      title: "Bank Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
    },
    {
      title: "Courses Revenue",
      dataIndex: "revenue",
      key: "revenue",
    },
    {
      title: "Amount To Pay",
      dataIndex: "amountToPay",
      key: "amountToPay",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            style={{ borderColor: "gray", color: "black" }}
            onClick={() => handleRePayModal(record)}
          >
            Pay
          </Button>
        </span>
      ),
    },
  ];

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
            page2={"#"}
            page3={"/staff-page/staff-report"}
            page4={"/staff-page/moderation"}
            page5={"/staff-page/list-major"}
            page6={"#"}
            // page6={"/staff-page/list-major"}
          />
          {/* <StaffRatingTable /> */}
          <div className="w-full my-8 ">
            <div className="mb-20">
              <div className="text-start font-semibold text-5xl pb-5 pl-5">
                Revenue
              </div>
              <div className="mt-5 rounded-lg border-solid border-2 mx-5 p-10 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)]">
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
                Are you sure you want to Pay for this Mentor?
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
