"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { format } from "date-fns";
import { UserAuth } from "@/app/context/AuthContext";
import { http } from "@/api/http";

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

export type TotalStatistic = {
  totalStatisticInfo: any;
  totalRevenue: number;
  totalActiveCourses: number;
  totalEnrollments: number;
  totalMentors: number;
};

const ChartRevenue = () => {
  const [selected2, setSelected2] = useState<string>("Last Week");
  const handleChangeSelected2 = (e: any) => {
    setSelected2(e);
  };
  const { Option } = Select;
  const { id, userData } = UserAuth();
  console.log("id usser", id);
  const timeLine = [
    { title: "Last Day", value: "day" },
    { title: "Last Week", value: "week" },
    { title: "Last Month", value: "month" },
  ];
  const [totalStatistic, setTotalStatistic] = useState<TotalStatistic>();
  const [courseStatistic2, setCourseStatistic2] = useState<StatisticData[]>([]);
  const [totalStatusCourses, setTotalStatusCourse] =
    useState<StatisticStatusData>();
  useEffect(() => {
    try {
      http
        .get(
          `https://learnconnectapifpt.azurewebsites.net/api/payment-transaction/statistic-revenue-mentor?mentorUserId=${id}&filterType=${
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
  return (
    <div className="mt-10 rounded-lg border-solid border-2 mx-10 p-10 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] flex flex-col gap-4">
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
  );
};

export default ChartRevenue;
