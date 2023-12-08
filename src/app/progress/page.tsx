"use client";
// import Transaction from "@/components/transaction/transaction";
import ".././globals.css";
import useDataPaymentFetcher from "@/components/pagination/useDataPaymentFetcher";
import Paginate from "@/components/pagination/pagination";
import axios from "axios";
import { Breadcrumb, Spin, Table, Tag, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { SortOrder } from "antd/es/table/interface";
import moment from "moment";
import { http } from "@/api/http";
import ProgressBar from "@ramonak/react-progress-bar";

export type Progress = {
  purchased: number;
  onGoing: number;
  done: number;
  courseInfo: any;
  courseName: string;
  courseImage: string;
  completion: string;
  grade: number;
  startDate: string;
  endDate: string;
  status: number;
};

const StudyProgress = () => {
  const router = useRouter();
  const { role, id, userData } = UserAuth();
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
    // if (role === 3) {
    //   router.push(`/`);
    // }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });
  const { loading, transaction, totalPages, currentPage, setCurrentPage } =
    useDataPaymentFetcher();
  const { jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

  const [progress, setProgress] = useState<Progress>();
  console.log("1", progress);
  const [detailProgress, setDetailProgress] = useState<Progress[]>([]);
  console.log("2", detailProgress);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await http.get(
          `https://learnconnectapitest.azurewebsites.net/api/learning-process/statistics-learning-process?userId=${id}`
        );
        setProgress(responseData.data);
        setDetailProgress(responseData.data.courseInfo);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userData]);

  const breadcrumbsHome = () => {
    router.push("/");
  };

  const getStatusText = (status) => {
    if (status === 0) {
      return <Tag color="blue">On-going </Tag>;
    } else if (status === 3) {
      return <Tag color="green">On-going </Tag>;
    }
    // Add more conditions as needed
    return "";
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      sorter: (a, b) => a.courseName.localeCompare(b.courseName),
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "% Completion",
      dataIndex: "completion",
      key: "completion",
      sorter: (a, b) => a.completion - b.completion,
      render: (text) => (
        <div className="">
          {/* <p className="text-[#52565b] text-[14px]">{text}% Complete</p> */}

          <div className="rating-progress-bar mt-2">
            <ProgressBar
              completed={text}
              bgColor="#309255"
              height="15px"
              // labelAlignment="outside"
              labelSize="12px"
            />
          </div>
        </div>
      ),
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      sorter: (a, b) => a.grade - b.grade,
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text) => moment(text).locale("en").format("LLL"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a, b) =>
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text) => {
        if (!text) {
          return <>-</>; // Trả về chuỗi trống nếu endDate là null
        } else {
          return moment(text).locale("en").format("LLL");
        }
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (status) => getStatusText(status),
    },
  ];

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Số dòng mỗi trang
  });

  const handlePageChange = (current, pageSize) => {
    setPagination({ current, pageSize });
  };

  return (
    <>
      <div className="bg-[#e7f8ee]">
        <div
          className="bg-no-repeat bg-auto flex flex-row justify-between"
          style={{
            backgroundImage: "url('/images/shape-23.png')",
          }}
        >
          <div>
            <Breadcrumb className="font-semibold text-3xl py-5 px-64 flex-auto">
              <Breadcrumb.Item>
                <button onClick={breadcrumbsHome}>Home</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>Studying Progress</span>
              </Breadcrumb.Item>
            </Breadcrumb>{" "}
          </div>
          <div
            className="w-2/5 bg-auto bg-no-repeat bg-right-top flex-1"
            style={{
              backgroundImage: "url('/images/shape-24.png')",
            }}
          />
        </div>
      </div>
      <div className="container py-8">
        <div className="grid grid-cols-3 gap-5 pb-20  ">
          <div className="flex flex-row justify-between p-5 items-center rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col ">
              <div className="p-4 text-4xl text-orange-400 font-semibold">
                Purchased
              </div>
              <div className="bg-white p-4 text-3xl">
                {progress?.purchased} Courses
              </div>
            </div>
            <div className="flex justify-center">
              <img src="/images/purchasing.png" className="w-[96px] h-[96px]" />
            </div>
          </div>
          <div className="flex flex-row justify-between p-5 items-center rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col ">
              <div className=" p-4 text-4xl text-[#6EC2F7]">On-going</div>
              <div className="bg-white p-4 text-3xl">
                {progress?.onGoing} Courses
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/loading-bar.png"
                className="w-[96px] h-[96px]"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between p-5 items-center rounded-lg border-solid border-2 shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col ">
              <div className="text-[#21D375] p-4 text-4xl">Done</div>
              <div className="bg-white p-4 text-3xl">
                {progress?.done} Course
              </div>
            </div>
            <div className="flex justify-center">
              <img src="/images/done.png" className="w-[96px] h-[96px]" />
            </div>
          </div>
        </div>
        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Transaction History
        </h2> */}
        {/* <p className="mb-6 text-gray-600">View your Transaction History</p> */}
        {loading ? (
          <div className="text-center text-2xl text-gray-600">
            <Spin size="large" />
          </div>
        ) : (
          <div className="w-full overflow-x-auto min-h-[300px] shadow-[5px_5px_30px_10px_rgba(0,0,0,0.15)] rounded-lg border-solid border-2">
            <Table
              dataSource={detailProgress}
              columns={columns}
              pagination={{ ...pagination, onChange: handlePageChange }}
            />
          </div>
        )}
        {/* <Paginate
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /> */}
      </div>
    </>
  );
};

export default StudyProgress;
