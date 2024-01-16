"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { Course } from "@/components/courses/courses";
import LeftNavbar from "@/components/left-navbar/page";
import { use, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Empty,
  Form,
  Input,
  Modal,
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
  const { id, userData } = UserAuth();

  const [loading, setLoading] = useState(true);

  const [majors, setMajors] = useState<Category[]>([]);
  const [major, setMajor] = useState<Category>();
  const [majorId, setMajorId] = useState<number>(0);
  const [majorName, setMajorName] = useState<string>("");
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
    pageSize: 10, // Số dòng mỗi trang
  });

  const handlePageChange = (current, pageSize) => {
    setPagination({ current, pageSize });
  };
  // console.log("lecture", lectures);
  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(
        `https://learnconnectapifpt.azurewebsites.net/api/specialization/by-major/${majorId}`
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
      .get(`https://learnconnectapifpt.azurewebsites.net/api/major`)
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
      sorter: (a, b) => a.name.localeCompare(b.name),

      width: 300,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 1000,
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 200,
      sorter: (a, b) => (a.isActive ? 1 : -1) - (b.isActive ? 1 : -1),
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: <div>Action</div>,
      key: "actions",
      width: 200,
      render: (text, record) => (
        <Space>
          <Button onClick={() => handleUpdateMajor(record)}>Update</Button>
          {/* {record.isActive === true ? (
            <button
              className="bg-white text-black border rounded-md border-red-500 hover:bg-red-500 hover:text-white transition duration-300 px-2 py-1"
              onClick={() => {
                handleDisableMajorModal(record);
              }}
            >
              Disable
            </button>
          ) : (
            <button
              onClick={() => handleEnableMajorModal(record)}
              className="bg-white text-black border rounded-md border-green-500 hover:bg-green-500 hover:text-white transition duration-300 px-2 py-1"
            >
              Enable
            </button>
          )} */}

          {/* <button
            // className="flex items-end"
            style={{
              backgroundColor: "red",
              color: "black",
              width: "40px", // Thiết lập chiều rộng mong muốn
              height: "30px",
              borderRadius: "5px", // Thiết lập chiều cao mong muốn
            }}
            onClick={() => {
              handleDeleteMajorModal(record);
            }}
          >
            <DeleteOutlined className="item-center flex justify-center" />
          </button> */}
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
      title: <div>Action</div>,
      key: "actions",
      width: 200,
      render: (text, record) => (
        <Space>
          <Button onClick={() => handleUpdateSpecialize(record)}>Update</Button>
          {/* {record.isActive === true ? (
            // <Button danger onClick={() => handleDisableMajor(record)}>
            //   Disable
            // </Button>

            <button
              className="bg-white text-black border rounded-md border-red-500 hover:bg-red-500 hover:text-white transition duration-300 px-2 py-1"
              onClick={() => handleDisableSpecializeModal(record)}
            >
              Disable
            </button>
          ) : (
            <button
              onClick={() => handleEnableSpecializeModal(record)}
              className="bg-white text-black border rounded-md border-green-500 hover:bg-green-500 hover:text-white transition duration-300 px-2 py-1"
            >
              Enable
            </button>
          )} */}
          {/* <button
            // className="flex items-end"\
            onClick={() => handleDeleteSpecializeModal(record)}
            style={{
              backgroundColor: "red",
              color: "black",
              width: "40px", // Thiết lập chiều rộng mong muốn
              height: "30px",
              borderRadius: "5px", // Thiết lập chiều cao mong muốn
            }}
          >
            <DeleteOutlined className="item-center flex justify-center" />
          </button> */}
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
          "https://learnconnectapifpt.azurewebsites.net/api/major",
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
            .get(`https://learnconnectapifpt.azurewebsites.net/api/major`)
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
    // console.log("data", data);
    setMajor(data);
  };

  const handleUpdateMajorClick = (data: any) => {
    try {
      http
        .put(
          `https://learnconnectapifpt.azurewebsites.net/api/major/${majorId}`,
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
            .get(`https://learnconnectapifpt.azurewebsites.net/api/major`)
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

  const [disableMajorModal, setDisableMajorModal] = useState(false);

  const handleDisableMajorModal = (data: any) => {
    setMajorId(data.id);
    setDisableMajorModal(true);
  };

  const handleDisableMajor = (data: any) => {
    try {
      http
        .put(
          `https://learnconnectapifpt.azurewebsites.net/api/major/update-major-status?MajorId=${majorId}&status=0`
        )
        .then(() => {
          toast.success("Disable Major Successfully!!!");
          setDisableMajorModal(false);
          http
            .get(`https://learnconnectapifpt.azurewebsites.net/api/major`)
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

  const [enableMajorModal, setEnableMajorModal] = useState(false);

  const handleEnableMajorModal = (data: any) => {
    setMajorId(data.id);
    setEnableMajorModal(true);
  };

  const handleEnableMajor = (data: any) => {
    try {
      http
        .put(
          `https://learnconnectapifpt.azurewebsites.net/api/major/update-major-status?MajorId=${majorId}&status=1`
        )
        .then(() => {
          toast.success("Enable Major Successfully!!!");
          setEnableMajorModal(false);
          http
            .get(`https://learnconnectapifpt.azurewebsites.net/api/major`)
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

  const [deleteMajorModal, setDeleteMajorModal] = useState(false);

  const handleDeleteMajorModal = (data: any) => {
    setMajorId(data.id);
    setDeleteMajorModal(true);
  };

  const handleDeleteMajor = (data: any) => {
    try {
      http
        .delete(
          `https://learnconnectapifpt.azurewebsites.net/api/major/${data.id}`
        )
        .then(() => {
          toast.success("Delete Major Successfully!!!");
          setDeleteMajorModal(false);
          setTableSpecialize(false);
          http
            .get(`https://learnconnectapifpt.azurewebsites.net/api/major`)
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
          "https://learnconnectapifpt.azurewebsites.net/api/specialization",
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
              `https://learnconnectapifpt.azurewebsites.net/api/specialization/by-major/${majorId}`
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
    // console.log("t", data);
  };

  const handleUpdateSpecializeClick = (data: any) => {
    // console.log("nani", data);
    // setFormUpdateSpecialize(false);
    try {
      http
        .put(
          `https://learnconnectapifpt.azurewebsites.net/api/specialization/${specializeId}`,
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
              `https://learnconnectapifpt.azurewebsites.net/api/specialization/by-major/${majorId}`
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

  const [disableSpecializeModal, setDisableSpecializeModal] = useState(false);

  const handleDisableSpecializeModal = (data: any) => {
    setSpecializeId(data.id);
    setDisableSpecializeModal(true);
  };

  const handleDisableSpecialize = (data: any) => {
    try {
      http
        .put(
          `https://learnconnectapifpt.azurewebsites.net/api/specialization/update-specialization-status?specializationId=${specializeId}&status=0`
        )
        .then(() => {
          toast.success("Disable Specialization Successfully!!!");
          setDisableSpecializeModal(false);
          http
            .get(
              `https://learnconnectapifpt.azurewebsites.net/api/specialization/by-major/${majorId}`
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

  const [EnableSpecializeModal, setEnableSpecializeModal] = useState(false);

  const handleEnableSpecializeModal = (data: any) => {
    setSpecializeId(data.id);
    setEnableSpecializeModal(true);
  };

  const handleEnableSpecialize = (data: any) => {
    try {
      http
        .put(
          `https://learnconnectapifpt.azurewebsites.net/api/specialization/update-specialization-status?specializationId=${specializeId}&status=1`
        )
        .then(() => {
          toast.success("Enable Specialization Successfully!!!");
          setEnableSpecializeModal(false);
          http
            .get(
              `https://learnconnectapifpt.azurewebsites.net/api/specialization/by-major/${majorId}`
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

  const [deleteSpecializeModal, setDeleteSpecializeModal] = useState(false);

  const handleDeleteSpecializeModal = (data: any) => {
    setSpecializeId(data.id);
    setDeleteSpecializeModal(true);
  };

  const handleDeleteSpecialize = (data: any) => {
    try {
      http
        .delete(
          `https://learnconnectapifpt.azurewebsites.net/api/specialization/${data.id}`
        )
        .then(() => {
          toast.success("Delete Specialization Successfully!!!");
          // setTableSpecialize(false);
          setDeleteSpecializeModal(false);
          http
            .get(
              `https://learnconnectapifpt.azurewebsites.net/api/specialization/by-major/${majorId}`
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
    setDisableMajorModal(false);
    setEnableMajorModal(false);
    setDeleteMajorModal(false);
    setDisableSpecializeModal(false);
    setEnableSpecializeModal(false);
    setDeleteSpecializeModal(false);
    form.resetFields();
  };

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
            page6={"/staff-page/staff-revenue"}
            page7={"/staff-page/staff-transaction"}
          />
          {/* <StaffRatingTable />
           */}
          <div className="w-full mt-4">
            <div className="flex flex-col pb-5 gap-2">
              <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <div className="text-start font-semibold text-2xl my-5 px-4">
                      Majors
                    </div>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex justify-end ">
                  <button
                    className=" my-3 px-5 py-3 bg-[#eefbf3] text-[#309255] border-[#309255] border rounded-lg  flex justify-center items-center  hover:bg-[#309255] hover:border-[#309255] hover:text-[#e5ecff] focus:outline-none transition-all duration-300"
                    onClick={handleCreateMajor}
                  >
                    New Major
                  </button>
                </div>
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
                className="mx-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg"
              />
            )}
            <div>
              {tableSpecialize && (
                <>
                  <div className="flex flex-col pb-5 gap-2 mt-16">
                    <div className="text-center font-semibold text-3xl ">
                      All Specializations of {majorName}
                    </div>
                    <div className="flex justify-end px-5">
                      <button
                        className=" my-3 px-5 py-3 bg-[#eefbf3] text-[#309255] border-[#309255] border rounded-lg  flex justify-center items-center  hover:bg-[#309255] hover:border-[#309255] hover:text-[#e5ecff] focus:outline-none transition-all duration-300"
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
                      className="mx-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg  mb-20"
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

          {/* create Major */}
          <Modal
            destroyOnClose={true}
            title={<div className="text-lg">Create Major Form</div>}
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
              style={{
                width: "100%",
                alignItems: "center",
              }}
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
                <Input placeholder="Input Major Name" />
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
                <Input.TextArea rows={2} placeholder="Input Description" />
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

          {/* Update Major */}
          <Modal
            destroyOnClose={true}
            title={<div className="text-lg">Update Major Form</div>}
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

          {/* Disable major */}
          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Disable this Major?
              </div>
            }
            open={disableMajorModal}
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
              onFinish={handleDisableMajor}
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

          {/* enable major  */}
          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Enable this Major?
              </div>
            }
            open={enableMajorModal}
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
              onFinish={handleEnableMajor}
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

          {/* delete major  */}
          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Delete this Major?
              </div>
            }
            open={deleteMajorModal}
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
              onFinish={handleDeleteMajor}
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

          {/* Create Specialize  */}
          <Modal
            destroyOnClose={true}
            title={<div className="text-lg">Create Specialization Form</div>}
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
                <Input.TextArea rows={2} />
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
            title={<div className="text-lg">Update Specialization Form</div>}
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

          {/* Disable Specialize */}
          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Delete this Major?
              </div>
            }
            open={disableSpecializeModal}
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
              onFinish={handleDisableSpecialize}
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

          {/* Enable Specialize */}
          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Enable this Specialization?
              </div>
            }
            open={EnableSpecializeModal}
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
              onFinish={handleEnableSpecialize}
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

          {/* Delete Specialize */}
          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Delete this Specialization?
              </div>
            }
            open={deleteSpecializeModal}
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
              onFinish={handleDeleteSpecialize}
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

export default MajorSepcialize;
