"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { Course } from "@/components/courses/courses";
import LeftNavbar from "@/components/left-navbar/page";
import useDataModeration from "@/components/pagination/useDataModeration";
import Paginate from "@/components/pagination/pagination";
import StaffRatingTable from "@/components/staff-rating-table/page";
import { use, useEffect, useState } from "react";
import {
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import { useRouter } from "next/navigation";
import { Lecture } from "@/app/my-course/[id]/page";
import { http } from "@/api/http";
import { Category } from "@/app/instructorcourses/page";
import { Specialization } from "@/components/mentor-request/page";
import { toast } from "sonner";
import { DeleteOutlined } from "@ant-design/icons";

const ModerationLecture = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { id, userData } = UserAuth();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [lectures, setLectures] = useState<Lecture[]>([]);

  const [majors, setMajors] = useState<Category[]>([]);
  const [major, setMajor] = useState<Category>();
  const [majorId, setMajorId] = useState<number>(0);
  const [majorName, setMajorName] = useState<string>("");

  const [statusMajor, setStatusMajor] = useState<number>(0);

  const [specializations, setSpecializations] = useState<Specialization[]>([]);

  const [tableSpecialize, setTableSpecialize] = useState(false);

  const [form] = Form.useForm();

  const [formCreateMajor, setFormCreateMajor] = useState(false);
  const [formUpdateMajor, setFormUpdateMajor] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Số dòng mỗi trang
  });

  const handlePageChange = (current, pageSize) => {
    setPagination({ current, pageSize });
  };
  // console.log("lecture", lectures);
  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(
        `https://learnconnectapitest.azurewebsites.net/api/specialization/by-major/${majorId}`
      )
      .then((response) => {
        setSpecializations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [majorId]);

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(`https://learnconnectapitest.azurewebsites.net/api/major`)
      .then((response) => {
        setMajors(response.data);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: <div className="flex justify-center">Action</div>,
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button onClick={() => handleUpdateMajor(record)}>Update</Button>
          {record.isActive === true ? (
            // <Button danger onClick={() => handleDisableMajor(record)}>
            //   Disable
            // </Button>
            <Popconfirm
              title="Are you sure you want to delete this item?"
              onConfirm={() => {
                handleDisableMajor(record), setStatusMajor(1);
              }}
              okText="Yes"
              okButtonProps={{
                style: {
                  background: "red",
                  borderColor: "red",
                  color: "#fff",
                },
              }}
              cancelText="No"
            >
              <button
                className="bg-white text-black border rounded-lg border-red-500 hover:bg-red-500 hover:text-white transition duration-300 px-6 py-2"
                // onClick={handleBan}
              >
                Ban
              </button>
            </Popconfirm>
          ) : (
            <button
              onClick={() => handleEnableMajor(record)}
              className="transition duration-300 ease-in-out bg-white text-black px-2 py-1 rounded-md border-2 border-solid border-green-500 hover:bg-green-500"
            >
              Enable
            </button>
          )}

          {/* <Button danger>Delete</Button> */}
          <button
            onClick={() => handleDeleteMajor(record)}
            // className="flex items-end"
            style={{
              backgroundColor: "red",
              color: "black",
              width: "40px", // Thiết lập chiều rộng mong muốn
              height: "30px",
              borderRadius: "5px", // Thiết lập chiều cao mong muốn
            }}
          >
            <DeleteOutlined />
          </button>
        </Space>
      ),
    },
  ];

  const columns2 = [
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: <div className="flex justify-center">Action</div>,
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button onClick={() => handleUpdateSpecialize(record)}>Update</Button>
          <Button danger onClick={() => handleDeleteSpecialize(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleCreateMajor = () => {
    setFormCreateMajor(true);
  };

  const handleCreateMajorClick = (data: any) => {
    try {
      http
        .post(
          "https://learnconnectapitest.azurewebsites.net/api/major",
          {
            name: data.name,
            description: data.description,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          toast.success("Add New Major Successfully!!!");
          setFormCreateMajor(false);
          form.resetFields();
          http
            .get(`https://learnconnectapitest.azurewebsites.net/api/major`)
            .then((response) => {
              setMajors(response.data);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
              setLoading(false);
            });
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateMajor = (data: any) => {
    setFormUpdateMajor(true);
    console.log("data", data);
    setMajor(data);
  };

  const handleUpdateMajorClick = (data: any) => {
    try {
      http
        .put(
          `https://learnconnectapitest.azurewebsites.net/api/major/${majorId}`,
          {
            name: data.name || major?.name,
            description: data.description || major?.description,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          toast.success("Update Major Successfully!!!");
          setFormUpdateMajor(false);
          form.resetFields();
          http
            .get(`https://learnconnectapitest.azurewebsites.net/api/major`)
            .then((response) => {
              setMajors(response.data);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
              setLoading(false);
            });
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDisableMajor = (data: any) => {};

  const handleEnableMajor = (data: any) => {};

  const handleDeleteMajor = (data: any) => {};

  const handleUpdateSpecialize = (data: any) => {
    setFormUpdateMajor(true);
  };

  const handleDeleteSpecialize = (data: any) => {};

  const handleRowClick = (record) => {
    setMajorId(record.id);
    setMajorName(record.name);
    setTableSpecialize(true);
    // Xử lý khi click vào một hàng (item)
    console.log("Clicked item:", record.id);
    // Thực hiện các hành động khác cần thiết
  };

  const handleCancel = () => {
    setFormCreateMajor(false);
    setFormUpdateMajor(false);
    form.resetFields();
  };

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
        <div className="flex flex-col pb-5 gap-2">
          <div className="text-center font-semibold text-5xl ">
            List of Majors
          </div>
          <div className="flex justify-end ">
            <button
              className="border-2 rounded-lg px-4 py-2"
              onClick={handleCreateMajor}
            >
              New Major
            </button>
          </div>
        </div>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={majors}
            columns={columns}
            pagination={{ ...pagination, onChange: handlePageChange }}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => handleRowClick(record), // Xử lý sự kiện click
              };
            }}
          />
        )}
        <div>
          {tableSpecialize && (
            <>
              <div className="flex flex-col pb-5 gap-2">
                <div className="text-center font-semibold text-3xl ">
                  All Specialization of {majorName}
                </div>
                <div className="flex justify-end ">
                  <button className="border-2 rounded-lg px-3 py-1">
                    Add More
                  </button>
                </div>
              </div>
              {specializations.length === 0 ? (
                <Empty />
              ) : (
                <Table
                  dataSource={specializations}
                  columns={columns}
                  pagination={{ ...pagination, onChange: handlePageChange }}
                />
              )}
            </>
          )}
        </div>
        {/* <div className="mt-10 rounded-lg border-solid border-2 mx-10 p-20">
        <div className="flex">
          <div className="text-2xl font-semibold mb-0 pt-4 leading-5">
            Total Revenue
          </div>
        </div>
        
      </div> */}
      </div>

      <Modal
        destroyOnClose={true}
        title={`Create New Major`}
        open={formCreateMajor}
        // onOk={handleOk}
        width="40%"
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 20 }}
          onFinish={handleCreateMajorClick}
          style={{ width: "100%", alignItems: "center", marginTop: 20 }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input Major name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input Major description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex gap-5 justify-end">
            {/* Thêm các trường dữ liệu khác cần thiết vào đây */}
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              style={{
                backgroundColor: "#4caf50",
                borderColor: "#4caf50",
                color: "#fff",
              }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        destroyOnClose={true}
        title={`Create New Major`}
        open={formUpdateMajor}
        // onOk={handleOk}
        width="40%"
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 20 }}
          onFinish={handleUpdateMajorClick}
          style={{ width: "100%", alignItems: "center", marginTop: 20 }}
        >
          <Form.Item name="name" label="Name">
            <Input defaultValue={major?.name} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} defaultValue={major?.description} />
          </Form.Item>

          <div className="flex gap-5 justify-end">
            {/* Thêm các trường dữ liệu khác cần thiết vào đây */}
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              style={{
                backgroundColor: "#4caf50",
                borderColor: "#4caf50",
                color: "#fff",
              }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ModerationLecture;