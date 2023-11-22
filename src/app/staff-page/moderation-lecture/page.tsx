"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { Course } from "@/components/courses/courses";
import LeftNavbar from "@/components/left-navbar/page";
import useDataModeration from "@/components/pagination/useDataModeration";
import Paginate from "@/components/pagination/pagination";
import StaffRatingTable from "@/components/staff-rating-table/page";
import { useEffect, useState } from "react";
import { Button, Space, Spin, Table, Tag } from "antd";
import { useRouter } from "next/navigation";
import { Lecture } from "@/app/my-course/[id]/page";
import { http } from "@/api/http";

const ModerationLecture = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { id, userData } = UserAuth();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [lectures, setLectures] = useState<Lecture[]>([]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // Số dòng mỗi trang
  });

  const handlePageChange = (current, pageSize) => {
    setPagination({ current, pageSize });
  };
  // console.log("lecture", lectures);
  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(`https://learnconnectapitest.azurewebsites.net/api/lecture`)
      .then((response) => {
        setLectures(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => {
        const currentIndex =
          (pagination.current - 1) * pagination.pageSize + index + 1;
        return currentIndex;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "title",
    },
    {
      title: "URL",
      dataIndex: "contentUrl",
      key: "contentUrl",
      render: (text, record) => {
        return (
          <a href={text} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "contentType",
      key: "contentType",
      render: (text: number, record: any) => {
        return text === 1 ? "Video" : "Document";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          {/* <Button onClick={() => handleUpdateModal(record)}>Update</Button>
          <Button danger onClick={() => handleDeleteModal(record)}>
            Delete
          </Button> */}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 1 ? "red" : "green"}>
          {status === 1 ? "Inactive" : "Active"}
        </Tag>
      ),
    },
  ];

  return (
    <div className="flex">
      <LeftNavbar
        page1={"/staff-page"}
        page2={"/staff-page/staff-rating"}
        page3={"/staff-page/staff-report"}
        page4={"/staff-page/moderation"}
        page5={"#"}
      />
      {/* <StaffRatingTable />
       */}
      <div className="container mt-4">
        <div className="text-center font-semibold text-5xl pb-5">
          Moderation Lecture{" "}
        </div>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={lectures}
            columns={columns}
            pagination={{ ...pagination, onChange: handlePageChange }}
          />
        )}
        <div className="flex flex-col gap-5"></div>
        {/* <div className="mt-10 rounded-lg border-solid border-2 mx-10 p-20">
        <div className="flex">
          <div className="text-2xl font-semibold mb-0 pt-4 leading-5">
            Total Revenue
          </div>
        </div>
        
      </div> */}
      </div>
    </div>
  );
};

export default ModerationLecture;
