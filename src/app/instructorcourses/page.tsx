"use client";
import React, { useEffect, useState } from "react";
import InstructorCourseStyle from "./styles/style.module.scss";
import Link from "next/link";
import { CreateCourse } from "@/components/createCourse";
// import { Button } from "react-bootstrap";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import ReactStars from "react-stars";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useDataCoursesInstructor, {
  ListCourse,
} from "@/components/pagination/useDataCoursesInstructor";
import Paginate from "@/components/pagination/pagination";
import { toast } from "sonner";
import { Course } from "@/components/courses/courses";

export type Category = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
};

const InstructorCourse = () => {
  const { id, user } = UserAuth();
  console.log("id", id);
  // console.log("id", user);
  const [visible, setVisible] = useState(false);

  // console.log("set", listCourseInstructor);
  const {
    loading,
    listCourseInstructor,
    currentPage,
    totalPages,
    setCurrentPage,
    refetchList,
  } = useDataCoursesInstructor();

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

  const [dashboardCourse, setDashboardCourse] = useState("");

  const router = useRouter();
  const handleClick = (idcourse) => {
    setDashboardCourse(idcourse);
    router.push(`/instructorcourses/${idcourse.id}`);
  };

  // if(listCourseInstructor?.status)
  const displayActive = (status: number) => {
    if (status === 0) {
      return <p style={{ color: "green" }}>Active</p>;
    } else if (status === 1) {
      return <p style={{ color: "red" }}>Inactive</p>;
    }
  };

  //Modal Create
  const [isModal, setIsModal] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModal(true);
  };

  const handleCancel = () => {
    setUpdateModal(false);
    setIsModal(false);
    form.resetFields();
    setImage(undefined);
    setUpdateImage(course?.imageUrl);
  };

  const handleSubmit = async (data: any) => {
    setIsModal(false);
    const formData = new FormData();
    formData.append("courseName", data.name);
    formData.append("description", data.description);
    formData.append("shortDescription", data.shortDes);
    formData.append("price", data.price);
    formData.append("lectureCount", data.lecture);
    formData.append("categoryId", selected || "1");
    if (formDataImage !== undefined) {
      formData.append("courseImage", formDataImage);
    }
    try {
      await axios.post(
        `https://learnconnectapitest.azurewebsites.net/api/course/create-new-course?userId=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleCancel();
      refetchList();
      setTimeout(() => {
        toast.success("Create Course successful");
      });
    } catch (err) {
      setTimeout(() => {
        toast.error("Create Course fail");
      });
    }
    form.resetFields();
  };

  //upload image course
  const [formDataImage, setFormDataImage] = useState();
  const [image, setImage] = useState<string>();
  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

      setFormDataImage(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setImage(url);
        setUpdateImage(url);
      });
    }
  };

  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  //List category
  const [selected, setSelected] = useState(null);
  const { Option } = Select;
  const [listCategory, setListCategory] = useState<Category[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await axios.get(
          "https://learnconnectapitest.azurewebsites.net/api/category"
        );
        setListCategory(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleChangeCate = (value: React.SetStateAction<null>) => {
    setSelected(value);
  };

  //Update information of course
  const [updateModal, setUpdateModal] = useState(false);
  const [course, setCourse] = useState<Course>();

  console.log("course,", course);
  // const [previousCate, setPreviousCate] = useState(course?.categoryId);
  const [updateCate, setUpdateCate] = useState(course?.categoryId);
  const [updateImage, setUpdateImage] = useState(course?.imageUrl);
  // const {preivousImage} = useState(course?.imageUrl);

  const showUpdateModal = (data: any) => {
    setUpdateModal(true);
    setCourse(data);
    setUpdateImage(data.imageUrl);
  };

  const handleUpdateCate = (
    value: React.SetStateAction<string | number | undefined>
  ) => {
    setUpdateCate(value);
  };

  const handleUpdate = async (data: any) => {
    const formData = new FormData();
    formData.append("courseName", data.name);
    formData.append("description", data.description);
    formData.append("shortDescription", data.shortDes);
    formData.append("price", data.price);
    formData.append("lectureCount", data.lecture);
    formData.append("categoryId", selected || "1");
    if (formDataImage !== undefined) {
      formData.append("courseImage", formDataImage);
    }
    try {
      await axios.put(
        `https://learnconnectapitest.azurewebsites.net/api/course/update/${course?.id}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleCancel();
      refetchList();
      setTimeout(() => {
        toast.success("Create Course successful");
      });
    } catch (err) {
      setTimeout(() => {
        toast.error("Create Course fail");
      });
    }
  };

  //Delete Course
  const [open, setOpen] = useState(false);

  const handleDelete = async (data: any) => {
    try {
      await axios.put(
        `https://learnconnectapitest.azurewebsites.net/api/course/update-course-status?courseId=${data.id}&status=1`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleClose();
      refetchList();
      setTimeout(() => {
        toast.success("Delete Course successful");
      });
    } catch (err) {
      setTimeout(() => {
        toast.error("Delete Course fail");
      });
    }
    handleClose();
  };

  const handleClickOpen = (data: any) => {
    setCourse(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!id) return <p>Loading</p>;

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
        {/* <div className={`${InstructorCourseStyle.body_container}`}>
          <div className={`${InstructorCourseStyle.body_message}`}>
            <div className={`${InstructorCourseStyle.message_icon}`}>
              <img src="/menu-icon/icon-6.png" alt="image" />
            </div>
            <div className={`${InstructorCourseStyle.message_content}`}>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry &apos s standard
                dummy text ever since the 1500s when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic.
              </p>
            </div>
          </div>
        </div> */}
        <div className={`${InstructorCourseStyle.course_tab}`}>
          <h3 className={`${InstructorCourseStyle.course_tab_title}`}>
            Course
          </h3>
          <div className={`${InstructorCourseStyle.course_tab_btn}`}>
            {/* <Button
              onClick={() => {
                Modal.confirm({
                  title: "Create New Course",
                  content: (
                    <CreateCourse
                      visible={visible}
                      setVisible={setVisible}
                      onCancel={() => {
                        setVisible(false);
                      }}
                      isEdit={false}
                    />
                  ),
                });
              }}
              className={`${InstructorCourseStyle.create_btn}`}
            >
              <span className=""> New Course</span>
            </Button> */}
            <Button
              type="default"
              className={`${InstructorCourseStyle.create_btn}`}
              onClick={showModal}
            >
              New Course
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-5xl">loading...</div>
        ) : (
          <div className={`${InstructorCourseStyle.course_list_wrapper}`}>
            {listCourseInstructor.map((item, index) => {
              return (
                <div key={index}>
                  <div className={`${InstructorCourseStyle.course_item}`}>
                    <div className="flex">
                      <div>
                        <Link href="#">
                          <img src={item.imageUrl} alt="Image" />
                        </Link>
                      </div>
                      <div
                        className={`${InstructorCourseStyle.course_item_title}`}
                      >
                        <h2>
                          <a
                            onClick={() => {
                              handleClick(item);
                            }}
                          >
                            {item.name}
                          </a>
                        </h2>
                      </div>
                    </div>
                    <div className={`${InstructorCourseStyle.course_tracker}`}>
                      <div
                        className={`${InstructorCourseStyle.course_tracker_1}`}
                      >
                        <p>Status</p>
                        <span
                          className={`${InstructorCourseStyle.course_tracker_count}`}
                        >
                          <span>{displayActive(item.status)}</span>
                        </span>
                      </div>
                      <div
                        className={`${InstructorCourseStyle.course_tracker_2}`}
                      >
                        <p>Enrollments</p>
                        <span
                          className={`${InstructorCourseStyle.course_tracker_count}`}
                        >
                          {item.totalEnrollment}
                        </span>
                      </div>
                      <div
                        className={`${InstructorCourseStyle.course_tracker_3}`}
                      >
                        <p>Course Rating</p>
                        <span
                          className={`${InstructorCourseStyle.course_tracker_count}`}
                        >
                          {item.averageRating}
                          {/* <ReactStars count={1} color2={"#ffd700"}></ReactStars> */}
                          <span>
                            <Rating
                              size="small"
                              name="half-rating-read"
                              defaultValue={item.averageRating}
                              precision={0.1}
                              readOnly
                            />
                          </span>
                        </span>
                      </div>
                      <div
                        className={`${InstructorCourseStyle.course_tracker_4}`}
                      >
                        <p className="flex justify-center">Action </p>
                        <span className="flex  gap-2">
                          <Button
                            // type="primary"
                            style={{ color: "black", backgroundColor: "" }}
                            onClick={() => {
                              showUpdateModal(item);
                              // console.log("t nè", user);
                            }}
                          >
                            Update
                          </Button>
                          <Button
                            danger
                            type="primary"
                            style={{ color: "black" }}
                            onClick={() => handleClickOpen(item)}
                          >
                            Delete
                          </Button>
                        </span>
                      </div>
                      {/* <div>
                      <p>Status</p>
                      <span>{displayActive(item.status)}</span>
                    </div> */}
                    </div>
                  </div>
                </div>
              );
            })}
            <Paginate
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
      <Modal
        destroyOnClose={true}
        title="Create New Course Form"
        open={isModal}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          className="mt-5"
          style={{ width: 600 }}
          onFinish={handleSubmit}
        >
          <div style={{ display: "flex" }} className="flex px-[130px]">
            <Image width={200} height={200} src={image} />
          </div>
          <div
            className="flex px-[190px] pt-2 pb-2"
            style={{ display: "flex" }}
          >
            <Upload
              accept="image/png, image/jpeg"
              onChange={handleChange}
              beforeUpload={beforeUpload}
              // headers={{ Authorization: authorization }}
              action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
            >
              <Button>Upload</Button>
            </Upload>
          </div>
          <Form.Item
            rules={[{ required: true, message: "Please input Name!" }]}
            label="Name"
            name="name"
          >
            <Input placeholder="Name Course" />
          </Form.Item>
          <Form.Item label="Category">
            <Select onChange={handleChangeCate}>
              {listCategory.map((option) => {
                return (
                  <Option key={option.id} value={option.id}>
                    {option.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Mentor" name="mentor">
            {`${user?.displayName}`}
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please estimate the time!" }]}
            label="Length(mins)"
            name="length"
          >
            <InputNumber
              placeholder="Input estimate the time!"
              min={0}
              className="w-[290px]"
              controls={false}
              // formatter={(value) => `${value} mins`}
              // parser={(value) => value!.replace("mins", "")}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please estimate number of lectures!",
              },
            ]}
            label="Lectures"
            name="lecture"
          >
            <InputNumber className="w-[200px]" min={0} controls={false} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Input Price",
              },
            ]}
            label="Price"
            name="price"
          >
            <InputNumber style={{ width: 200 }} min={0} controls={false} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Type Short Description",
              },
            ]}
            label="Intro"
            name="shortDes"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Space className="justify-end w-full pr-[150px]">
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
      {/* Modal update */}
      <Modal
        destroyOnClose={true}
        title={`Update Course Form ${user?.displayName}`}
        open={updateModal}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          className="mt-5"
          style={{ width: 600 }}
          onFinish={handleUpdate}
        >
          <div style={{ display: "flex" }} className="flex px-[130px]">
            <Image
              width={200}
              height={200}
              src={updateImage}
              // defaultValue={course?.imageUrl}
            />
          </div>
          <div
            className="flex px-[190px] pt-2 pb-2"
            style={{ display: "flex" }}
          >
            <Upload
              accept="image/png, image/jpeg"
              onChange={handleChange}
              beforeUpload={beforeUpload}
              // headers={{ Authorization: authorization }}
              action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
            >
              <Button>Upload</Button>
            </Upload>
          </div>
          <Form.Item
            rules={[{ required: true, message: "Please input Name!" }]}
            label="Name"
            name="name"
          >
            <Input placeholder="Name Course" defaultValue={course?.name} />
          </Form.Item>
          <Form.Item label="Category">
            <Select onChange={handleUpdateCate} defaultValue={updateCate}>
              {listCategory.map((option) => {
                return (
                  <Option key={option.id} value={option.id}>
                    {option.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {/* <Form.Item label="Mentor" name="mentor">
            {`${user?.displayName}`}
          </Form.Item> */}
          <Form.Item
            rules={[{ required: true, message: "Please estimate the time!" }]}
            label="Length(mins)"
            name="length"
          >
            <InputNumber
              defaultValue={course?.contentLength}
              type="number"
              placeholder="Input estimate the time!"
              min={0}
              className="w-[290px]"
              controls={false}
              // formatter={(value) => `${value} mins`}
              // parser={(value) => value!.replace("mins", "")}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please estimate number of lectures!",
              },
            ]}
            label="Lectures"
            name="lecture"
          >
            <InputNumber
              className="w-[200px]"
              min={0}
              controls={false}
              defaultValue={course?.lectureCount}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Input Price",
              },
            ]}
            label="Price"
            name="price"
          >
            <InputNumber
              style={{ width: 200 }}
              min={0}
              controls={false}
              defaultValue={course?.price}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Type Short Description",
              },
            ]}
            label="Intro"
            name="shortDes"
          >
            <Input defaultValue={course?.shortDescription} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} defaultValue={course?.description} />
          </Form.Item>
          <Space className="justify-end w-full pr-[150px]">
            <Form.Item className="mb-0">
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
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

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
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
              Do you want to Delete {`${course?.name}`} course?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Typography
            onClick={handleClose}
            sx={{
              marginRight: "12px",
              cursor: "pointer",
              ":hover": {
                textDecoration: "underline",
              },
            }}
          >
            cancel
          </Typography>

          <Button danger onClick={() => handleDelete(course)} type="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InstructorCourse;
