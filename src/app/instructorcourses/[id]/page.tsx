"use client";
import React, { useEffect, useState } from "react";
import InstructorCourseStyle from ".././styles/style.module.scss";
import Link from "next/link";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Typography,
  Upload,
} from "antd";
import { UserAuth } from "@/app/context/AuthContext";
import { Lecture } from "@/app/my-course/[id]/page";
import axios from "axios";
import { http } from "@/api/http";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast } from "sonner";
import { Course } from "@/components/courses/courses";

const Dashboard = ({ params }: any) => {
  const idCourse = params.id;
  console.log("param", params);
  const { id, userData, jwtToken } = UserAuth();

  //   console.log(" idcourse", idCourse);

  //create lecture
  const [loading, setLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModal(true);
  };

  const handleCancel = () => {
    setIsModal(false);
    form.resetFields();
  };

  //update
  const [updateVisible, setUpdateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [oneLecture, setOneLecture] = useState<Lecture>();

  const handleUpdateModal = (record: any) => {
    setSelectedItem(record);
    setOneLecture(record);
    setUpdateVisible(true);
  };

  const handleDeleteModal = (record: any) => {
    setSelectedItem(record);
    setOneLecture(record);
    setDeleteVisible(true);
  };

  //Get This Course
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(
        `https://learnconnectapitest.azurewebsites.net/api/course/user/${id}/course/${idCourse}`
      )
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("contentType", type || "1");
    if (formDataSource !== undefined) {
      formData.append("contentUrl", formDataSource);
    }

    try {
      await http
        .put(
          `/lecture/update/${idCourse}/${id}?lectureId=${oneLecture?.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          handleCancel();
          toast.success("update Lecture Successfully");
          http.get(`/lecture/by-course/${idCourse}`).then((response) => {
            setLectures(response.data);
            setLoading(false);
            form.resetFields();
          });
        });
    } catch (err) {
      setTimeout(() => {
        toast.error("Update Lecture fail");
      });
    }
    // Implement your update logic here
    // You can use selectedItem to identify the item to update
    setUpdateVisible(false);
  };

  const handleDelete = () => {
    // Implement your delete logic here
    // You can use selectedItem to identify the item to delete
    setDeleteVisible(false);
  };

  const handleUpdateCancel = () => {
    setUpdateVisible(false);
    form.resetFields();
  };

  const handleDeleteCancel = () => {
    setDeleteVisible(false);
  };

  const handleSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("contentType", type || "1");
    if (formDataSource !== undefined) {
      formData.append("contentUrl", formDataSource);
    }

    try {
      await http
        .post(
          `https://learnconnectapitest.azurewebsites.net/api/lecture/create-new-lecture?userId=${id}&courseId=${idCourse}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          handleCancel();
          toast.success("Create Lecture Successfully");
          http
            .get(
              `https://learnconnectapitest.azurewebsites.net/api/lecture/by-course/${idCourse}`
            )
            .then((response) => {
              setLectures(response.data);
              setLoading(false);
              form.resetFields();
            });
        });
    } catch (err) {
      setTimeout(() => {
        toast.error("Create Lecture fail");
      });
    }
  };

  //get list lecture
  const [lectures, setLectures] = useState<Lecture[]>([]);
  console.log("lecture", lectures);
  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(
        `https://learnconnectapitest.azurewebsites.net/api/lecture/by-course/${idCourse}`
      )
      .then((response) => {
        setLectures(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  //type
  const [type, setType] = useState(null);
  const { Option } = Select;
  console.log("type", type);

  const Type = [
    { id: 1, title: "Video" },
    { id: 2, title: "Document" },
  ];

  const handleChangeType = (value: React.SetStateAction<null>) => {
    setType(value);
  };

  //video upload
  // const inputRef = React.useRef();
  const [formDataSource, setFormDataSource] = useState();
  const [source, setSource] = React.useState<string>();

  const handleFileChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

      setFormDataSource(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setSource(url);
        // setUpdateImage(url);
      });
    }
  };

  const handleDocChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

      setFormDataSource(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setSource(url);
        // setUpdateImage(url);
      });
    }
  };

  const getBase64 = (src: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(src);
  };
  // const handleChoose = (event) => {
  //   inputRef.current.click();
  // };

  //table lecture
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
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
          <Button onClick={() => handleUpdateModal(record)}>Update</Button>
          <Button danger onClick={() => handleDeleteModal(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: number, record: any) => {
        return text === 1 ? (
          <div className="text-red-500 text-lg">Inactive</div>
        ) : (
          <div className="text-green-500 text-lg">Active</div>
        );
      },
    },
  ];

  const menuItem = [
    {
      image: "/menu-icon/icon-1.png",
      href: "/instructorcourses",
    },
    {
      image: "/menu-icon/icon-2.png",
      href: "/dashboard",
    },
    {
      image: "/menu-icon/icon-3.png",
      href: "/instructorcourses",
    },
    {
      image: "/menu-icon/icon-4.png",
      href: "/instructorcourses",
    },
  ];

  return (
    <div className={`${InstructorCourseStyle.content_wrapper}`}>
      <div className={`${InstructorCourseStyle.sidebar_wrapper}`}>
        <div className={`${InstructorCourseStyle.sidebar_list}`}>
          {menuItem.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.href}
                className={`${InstructorCourseStyle.sidebar_active}`}
              >
                <img src={item.image} alt="image"></img>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={`${InstructorCourseStyle.body_wrapper}`}>
        <div className={`${InstructorCourseStyle.featured}`}>
          <div className={`${InstructorCourseStyle.featured_top}`}>
            <h1 className={`${InstructorCourseStyle.featured_top_title}`}>
              Total Revenue
            </h1>
            {/* <MoreVertIcon fontSize="small" /> */}
          </div>
          <div className={`${InstructorCourseStyle.featured_bottom}`}>
            <div
              className={`${InstructorCourseStyle.featured_bottom_featuredChart}`}
            >
              {/* <CircularProgressbar value={70} text={"70%"} strokeWidth={5} /> */}
            </div>
            <p className={`${InstructorCourseStyle.featured_bottom_title}`}>
              Total sales made today
            </p>
            <p className={`${InstructorCourseStyle.featured_bottom_amount}`}>
              $420
            </p>
            <p className={`${InstructorCourseStyle.featured_bottom_desc}`}>
              Previous transactions processing. Last payments may not be
              included.
            </p>
            <div className={`${InstructorCourseStyle.featured_bottom_summary}`}>
              <div
                className={`${InstructorCourseStyle.featured_bottom_summary_item}`}
              >
                <div
                  className={`${InstructorCourseStyle.featured_bottom_summary_item_itemTitle}`}
                >
                  Target
                </div>
                <div
                  className={`${InstructorCourseStyle.featured_bottom_summary_item_itemTitle}`}
                >
                  {/* <KeyboardArrowDownIcon fontSize="small"/> */}
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
              <div
                className={`${InstructorCourseStyle.featured_bottom_summary_item}`}
              >
                <div
                  className={`${InstructorCourseStyle.featured_bottom_summary_item_itemTitle}`}
                >
                  Last Week
                </div>
                <div
                  className={`${InstructorCourseStyle.featured_bottom_summary_item_itemTitle}`}
                >
                  {/* <KeyboardArrowUpOutlinedIcon fontSize="small"/> */}
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Last Month</div>
                <div className="itemResult positive">
                  {/* <KeyboardArrowUpOutlinedIcon fontSize="small"/> */}
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${InstructorCourseStyle.lecture}`}>
          <div className="flex justify-between mb-5">
            <span className="text-lg">List of Lectures</span>
            <Button onClick={showModal}> New Lectures</Button>
          </div>
          {loading ? (
            <Spin size="large" />
          ) : (
            <Table dataSource={lectures} columns={columns} />
          )}
        </div>
      </div>
      <Modal
        destroyOnClose={true}
        title={`Create Lecture for Course by ${userData?.fullName}`}
        open={isModal}
        // onOk={handleOk}
        width={600}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          className="mt-5"
          style={{ width: 600 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            rules={[{ required: true, message: "Please input Name!" }]}
            label="Title"
            name="title"
          >
            <Input placeholder="Input Title" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please input Name!" }]}
            label="Content"
            name="content"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Type">
            <Select onChange={handleChangeType} defaultValue={type}>
              {Type.map((option) => {
                return (
                  <Option key={option.id} value={option.id}>
                    {option.title}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {type === 1 ? (
            // <Form.Item label="Video">
            <div>
              <div style={{ display: "flex" }} className="flex justify-center">
                {/* <video width={200} height={200} src={source} /> */}
                <video width={400} height={300} src={source} controls />
              </div>
              <div
                className="flex justify-center pt-2 pb-2"
                style={{ display: "flex" }}
              >
                <Upload
                  // accept="image/png, image/jpeg"
                  // ref={inputRef}
                  accept=".mov,.mp4"
                  // accept=".docx"
                  onChange={handleFileChange}
                  // beforeUpload={beforeUpload}
                  // headers={{ Authorization: authorization }}
                  action="https://learnconnectapitest.azurewebsites.net/api/Upload/video"
                >
                  <Button>Upload</Button>
                </Upload>
              </div>
            </div>
          ) : (
            // </Form.Item>
            <Form.Item label="Document"></Form.Item>
          )}
          <Space className="justify-end w-full pr-[90px]">
            <Form.Item className="mb-0">
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ color: "black" }}
                >
                  Create
                </Button>
              </Space>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
      {/* update lecture */}
      <Modal
        destroyOnClose={true}
        title={`Update lecture ${oneLecture?.title} `}
        open={updateVisible}
        // onOk={handleUpdateOk}
        width={600}
        onCancel={handleUpdateCancel}
        footer={false}
      >
        {/* Add your update form here */}
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          className="mt-5"
          style={{ width: 600 }}
          onFinish={handleUpdate}
        >
          <Form.Item
            // rules={[{ required: true, message: "Please input Name!" }]}
            label="Title"
            name="title"
          >
            <Input defaultValue={oneLecture?.title} />
          </Form.Item>
          <Form.Item
            // rules={[{ required: true, message: "Please input Name!" }]}
            label="Content"
            name="content"
          >
            <Input.TextArea rows={4} defaultValue={oneLecture?.content} />
          </Form.Item>
          <Form.Item label="Category">
            <Select onChange={handleChangeType} defaultValue={type}>
              {Type.map((option) => {
                return (
                  <Option key={option.id} value={option.id}>
                    {option.title}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {type === 1 ? (
            // <Form.Item label="Video">
            <div>
              <div style={{ display: "flex" }} className="flex justify-center">
                {/* <video width={200} height={200} src={source} /> */}
                <video width={400} height={300} src={source} controls />
              </div>
              <div
                className="flex justify-center pt-2 pb-2"
                style={{ display: "flex" }}
              >
                <Upload
                  // accept="image/png, image/jpeg"
                  // ref={inputRef}
                  accept=".mov,.mp4"
                  // accept=".docx"
                  onChange={handleFileChange}
                  // beforeUpload={beforeUpload}
                  // headers={{ Authorization: authorization }}
                  action="https://learnconnectapitest.azurewebsites.net/api/Upload/video"
                >
                  <Button>Upload</Button>
                </Upload>
              </div>
            </div>
          ) : (
            // </Form.Item>
            <Form.Item label="Document"></Form.Item>
          )}
          <Space className="justify-end w-full pr-[90px]">
            <Form.Item className="mb-0">
              <Space>
                <Button onClick={handleUpdateCancel}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ color: "black" }}
                >
                  Update
                </Button>
              </Space>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
      {/* Delete Lecture */}
      {/* <Modal
        title="Delete Item"
        open={deleteVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal> */}

      {/* Dialog */}
      <Dialog
        open={deleteVisible}
        onClose={handleDeleteCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{ backgroundColor: "#ff0000", fontSize: "20px", color: "white" }}
        >
          {" "}
          WARNING!!!{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Do you want to Delete the Lecture {oneLecture?.title}?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Typography onClick={handleDeleteCancel}>cancel</Typography>

          <Button
            danger
            onClick={() => handleDeleteModal(oneLecture)}
            type="primary"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
