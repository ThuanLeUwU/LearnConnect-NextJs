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

const MajorSepcialize = () => {
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

  // console.log("stats", setStatusMajor);

  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [specialization, setSpecialization] = useState<Specialization>();
  const [specializeId, setSpecializeId] = useState<number>(0);

  const [tableSpecialize, setTableSpecialize] = useState(false);

  const [form] = Form.useForm();

  const [formCreateMajor, setFormCreateMajor] = useState(false);
  const [formUpdateMajor, setFormUpdateMajor] = useState(false);

  const [formCreateSpecialize, setFormCreateSpecialize] = useState(false);
  const [formUpdateSpecialize, setFormUpdateSpecialize] = useState(false);

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
      width: 50,
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
      width: 300,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 1000,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 200,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: <div className="flex justify-center">Action</div>,
      key: "actions",
      width: 200,
      render: (text, record) => (
        <Space>
          <Button onClick={() => handleUpdateMajor(record)}>Update</Button>
          {record.isActive === true ? (
            // <Button danger onClick={() => handleDisableMajor(record)}>
            //   Disable
            // </Button>
            <Popconfirm
              title="Do you want to Disable this Major?"
              onConfirm={() => {
                handleDisableMajor(record);
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
                className="bg-white text-black border rounded-md border-red-500 hover:bg-red-500 hover:text-white transition duration-300 px-2 py-1"
                // onClick={handleBan}
              >
                Disable
              </button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Do you want to Enable this Major?"
              onConfirm={() => {
                handleEnableMajor(record);
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
              <button className="bg-white text-black border rounded-md border-green-500 hover:bg-green-500 hover:text-white transition duration-300 px-2 py-1">
                Enable
              </button>
            </Popconfirm>
          )}

          <Popconfirm
            title="Do you want to Delete this Major? "
            onConfirm={() => {
              handleDeleteMajor(record);
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
          </Popconfirm>
          {/* <Button danger>Delete</Button> */}
        </Space>
      ),
    },
  ];

  const columns2 = [
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 1000,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 200,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: <div className="flex justify-center">Action</div>,
      key: "actions",
      width: 200,
      render: (text, record) => (
        <Space>
          <Button onClick={() => handleUpdateSpecialize(record)}>Update</Button>
          {record.isActive === true ? (
            // <Button danger onClick={() => handleDisableMajor(record)}>
            //   Disable
            // </Button>
            <Popconfirm
              title="Do you want to Disable this Major?"
              onConfirm={() => {
                handleDisableSpecialize(record);
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
                className="bg-white text-black border rounded-md border-red-500 hover:bg-red-500 hover:text-white transition duration-300 px-2 py-1"
                // onClick={handleBan}
              >
                Disable
              </button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Do you want to Enable this Major?"
              onConfirm={() => {
                handleEnableSpecialize(record);
              }}
              okText="Yes"
              okButtonProps={{
                style: {
                  background: "green",
                  borderColor: "green",
                  color: "#fff",
                },
              }}
              cancelText="No"
            >
              <button className="bg-white text-black border rounded-md border-green-500 hover:bg-green-500 hover:text-white transition duration-300 px-2 py-1">
                Enable
              </button>
            </Popconfirm>
          )}

          <Popconfirm
            title="Do you want to Delete this Major? "
            onConfirm={() => {
              handleDeleteSpecialize(record);
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
          </Popconfirm>
          {/* <Button danger>Delete</Button> */}
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

  const handleDisableMajor = (data: any) => {
    try {
      http
        .put(
          `https://learnconnectapitest.azurewebsites.net/api/major/update-major-status?MajorId=${data.id}&status=0`
        )
        .then(() => {
          toast.success("Disable Major Successfully!!!");
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

  const handleEnableMajor = (data: any) => {
    try {
      http
        .put(
          `https://learnconnectapitest.azurewebsites.net/api/major/update-major-status?MajorId=${data.id}&status=1`
        )
        .then(() => {
          toast.success("Enable Major Successfully!!!");
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

  const handleDeleteMajor = (data: any) => {
    try {
      http
        .delete(
          `https://learnconnectapitest.azurewebsites.net/api/major/${data.id}`
        )
        .then(() => {
          toast.success("Enable Major Successfully!!!");
          setTableSpecialize(false);
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

  const handleCreateSpecialize = () => {
    setFormCreateSpecialize(true);
  };

  const handleCreateSpecializeClick = (data: any) => {
    try {
      http
        .post(
          "https://learnconnectapitest.azurewebsites.net/api/specialization",
          {
            majorId: majorId,
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
          toast.success("Create Specialization Successfully!!!");
          setFormCreateSpecialize(false);
          form.resetFields();
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
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSpecialize = (data: any) => {
    setFormUpdateSpecialize(true);
    setSpecialization(data);
    setSpecializeId(data.id);
    console.log("t", data);
  };

  const handleUpdateSpecializeClick = (data: any) => {
    // console.log("nani", data);
    // setFormUpdateSpecialize(false);
    try {
      http
        .put(
          `https://learnconnectapitest.azurewebsites.net/api/specialization/${specializeId}`,
          {
            majordId: majorId,
            name: data.name || specialization?.name,
            description: data.description || specialization?.description,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          toast.success("Update Specialization Successfully!!!");
          setFormUpdateSpecialize(false);
          form.resetFields();
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
        });
    } catch (err) {
      console.error(err);
    }
  };

  // const handleDeleteSpecialize = (data: any) => {};

  const handleDisableSpecialize = (data: any) => {
    try {
      http
        .put(
          `https://learnconnectapitest.azurewebsites.net/api/specialization/update-specialization-status?specializationId=${data.id}&status=0`
        )
        .then(() => {
          toast.success("Disable Specialization Successfully!!!");
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
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnableSpecialize = (data: any) => {
    try {
      http
        .put(
          `https://learnconnectapitest.azurewebsites.net/api/specialization/update-specialization-status?specializationId=${data.id}&status=1`
        )
        .then(() => {
          toast.success("Enable Specialization Successfully!!!");
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
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSpecialize = (data: any) => {
    try {
      http
        .delete(
          `https://learnconnectapitest.azurewebsites.net/api/specialization/${data.id}`
        )
        .then(() => {
          toast.success("Delete Specialization Successfully!!!");
          // setTableSpecialize(false);
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
        });
    } catch (err) {
      console.error(err);
    }
  };

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
    setFormCreateSpecialize(false);
    setFormUpdateSpecialize(false);
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
            dataSource={majors.reverse()}
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
                  <button
                    className="border-2 rounded-lg px-3 py-1"
                    onClick={handleCreateSpecialize}
                  >
                    Add More
                  </button>
                </div>
              </div>
              {specializations.length === 0 ? (
                <Empty />
              ) : (
                <Table
                  dataSource={specializations.reverse()}
                  columns={columns2}
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

      {/* create Modal */}
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

      {/* Update Modal */}
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

      {/* Create Specialize  */}
      <Modal
        destroyOnClose={true}
        title={`Create New Major`}
        open={formCreateSpecialize}
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
          onFinish={handleCreateSpecializeClick}
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

      {/* Update Specialize */}
      <Modal
        destroyOnClose={true}
        title={`Create New Major`}
        open={formUpdateSpecialize}
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
          onFinish={handleUpdateSpecializeClick}
          style={{ width: "100%", alignItems: "center", marginTop: 20 }}
        >
          <Form.Item name="name" label="Name">
            <Input defaultValue={specialization?.name} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              rows={4}
              defaultValue={specialization?.description}
            />
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

export default MajorSepcialize;
