"use client";
import React, { useEffect, useState } from "react";
import InstructorCourseStyle from "./styles/style.module.scss";
import Link from "next/link";
import { CreateCourse } from "@/components/createCourse";
// import { Button } from "react-bootstrap";
import {
  Button,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Spin,
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
import { http } from "@/api/http";
// import { getMessageToken } from "../firebase";

export type Specialize = {
  specId: number;
  specName: string;
};

export type Category = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
};

const InstructorCourse = () => {
  const router = useRouter();
  const { id, user, role } = UserAuth();
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
    if (role === 3) {
      router.push(`/`);
    }
    if (role === -1) {
      router.push(`/`);
    }
  });
  // getMessageToken();
  // console.log("id", id);
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
    // {
    //   image: "/menu-icon/icon-2.png",
    //   href: "/dashboard",
    // },
    {
      image: "/menu-icon/icon-3.png",
      href: "/review-mentor",
    },
    {
      image: "/menu-icon/icon1.png",
      href: "/revenue",
    },
    {
      image: "/menu-icon/icon2.png",
      href: "/request-history",
    },
  ];

  const [dashboardCourse, setDashboardCourse] = useState("");

  const handleClick = (idcourse) => {
    setDashboardCourse(idcourse);
    router.push(`/instructorcourses/${idcourse.id}`);
  };

  // if(listCourseInstructor?.status)
  const displayActive = (status: number) => {
    if (status === 0) {
      return <p style={{ color: "green" }}>Active</p>;
    } else if (status === 1) {
      return <p style={{ color: "grey" }}>Pending</p>;
    } else if (status === 2) {
      return <p style={{ color: "#b8ba5a" }}>Reject</p>;
    } else if (status === 3) {
      return <p style={{ color: "red" }}>Banned</p>;
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

  const [errorMassage, setErrorMessage] = useState("");

  const handleSubmit = async (data: any) => {
    if (formDataImage === undefined) {
      setErrorMessage("Please Input Image");
    } else {
      setIsModal(false);
      const formData = new FormData();
      formData.append("courseName", data.name);
      formData.append("description", data.description);
      formData.append("shortDescription", data.shortDes);
      formData.append("price", data.price);
      formData.append("lectureCount", data.lecture);
      formData.append("specializationId", selected.toString());
      if (formDataImage !== undefined) {
        formData.append("courseImage", formDataImage);
      }
      try {
        await http.post(`/course/create-new-course?userId=${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
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
    }
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
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      toast.error("Image must smaller than 20MB!");
    }
    return isJpgOrPng && isLt20M;
  };

  //List category
  // const [selected, setSelected] = useState(null);
  const [selected, setSelected] = useState<number>(0);
  const { Option } = Select;
  const [listCategory, setListCategory] = useState<Specialize[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await http.get(
          `/specialization-of-mentor/by-mentor/${id}`
        );
        setListCategory(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleChangeCate = (value: number) => {
    setSelected(value);
  };

  //Update information of course
  const [updateModal, setUpdateModal] = useState(false);
  const [course, setCourse] = useState<Course>();

  // console.log("course,", course);
  // const [previousCate, setPreviousCate] = useState(course?.categoryId);
  const [updateCate, setUpdateCate] = useState(course?.specializationId);
  // console.log("catebefore", course?.categoryId);
  // console.log("update", updateCate);
  const [updateImage, setUpdateImage] = useState(course?.imageUrl);
  // const {preivousImage} = useState(course?.imageUrl);

  const showUpdateModal = (data: any) => {
    setUpdateModal(true);
    setCourse(data);
    setUpdateCate(data.specializationId);
    setUpdateImage(data.imageUrl);
  };

  const handleUpdateCate = (value: number) => {
    setUpdateCate(value);
    setSelected(value);
  };

  const handleUpdate = async (data: any) => {
    const formData = new FormData();
    formData.append("courseName", data.name || course?.name);
    formData.append("description", data.description || course?.description);
    formData.append(
      "shortDescription",
      data.shortDes || course?.shortDescription
    );
    formData.append("contentLength", data.length || course?.contentLength);
    formData.append("price", data.price || course?.price);
    // console.log("price", data.price);
    formData.append("lectureCount", data.lecture || course?.lectureCount);
    formData.append("specializationId", selected.toString());
    if (formDataImage !== undefined) {
      formData.append("courseImage", formDataImage);
    }
    try {
      await http.put(`/course/update/${course?.id}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleCancel();
      refetchList();
      setTimeout(() => {
        toast.success("Update Course successful");
      });
    } catch (err) {
      setTimeout(() => {
        toast.error("Update Course fail");
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

  if (!id) return <Spin size="large" className="flex justify-center" />;

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
        <div className={`${InstructorCourseStyle.course_tab}`}>
          <h3 className={`${InstructorCourseStyle.course_tab_title}`}>
            Course
          </h3>
          <div className={`${InstructorCourseStyle.course_tab_btn}`}>
            <Button
              type="default"
              className={`${InstructorCourseStyle.create_btn}`}
              onClick={showModal}
            >
              New Course
            </Button>
          </div>
        </div>
        {listCourseInstructor.length === 0 ? (
          <Empty />
        ) : (
          <>
            {loading ? (
              <div className="text-center text-5xl mt-5">
                <Spin size="large" />
              </div>
            ) : (
              <div className={`${InstructorCourseStyle.course_list_wrapper}`}>
                {listCourseInstructor.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className={`${InstructorCourseStyle.course_item}`}>
                        <div className="flex">
                          <div>
                            <button
                              onClick={() => {
                                handleClick(item);
                              }}
                            >
                              <img src={item.imageUrl} alt="Image" />
                            </button>
                          </div>
                          <div
                            className={`${InstructorCourseStyle.course_item_title}`}
                          >
                            <h2>
                              <button
                                className="text-left hover:text-green-500 hover:underline "
                                onClick={() => {
                                  handleClick(item);
                                }}
                              >
                                {item.name}
                              </button>
                            </h2>
                          </div>
                        </div>
                        <div
                          className={`${InstructorCourseStyle.course_tracker}`}
                        >
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
                                  precision={0.1}
                                  readOnly
                                  value={item.averageRating}
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
          </>
        )}
      </div>
      <Modal
        destroyOnClose={true}
        title="Create New Course Form"
        open={isModal}
        // style={{ width: 800 }}
        width="35%"
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 6 }}
          labelAlign={"left"}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          className="mt-5"
          style={{ width: "100%" }}
          onFinish={handleSubmit}
        >
          <div style={{ display: "flex" }} className="flex">
            <Image
              width="100%"
              height={300}
              src={image}
              className="overflow-hidden"
            />

            {/* <video width={300} height={200} src={image} controls /> */}
          </div>
          <div
            className="flex flex-col items-center pt-2 pb-2"
            style={{ display: "flex" }}
          >
            <Upload
              accept="image/png, image/jpeg"
              onChange={handleChange}
              action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
            >
              <Button>Upload</Button>
              <span>{errorMassage}</span>
            </Upload>
          </div>
          <Form.Item
            rules={[{ required: true, message: "Please input Name!" }]}
            label="Name"
            name="name"
          >
            <Input placeholder="Name Course" />
          </Form.Item>
          <Form.Item label="Specialize">
            <Select onChange={handleChangeCate}>
              {listCategory.map((option) => {
                return (
                  <Option key={option.specId} value={option.specId}>
                    {option.specName}
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
            label="Price(VND):"
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
            label="Introduction"
            name="shortDes"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Space className="justify-end w-full">
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
        width="35%"
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          className="mt-5"
          style={{ width: "100%" }}
          onFinish={handleUpdate}
        >
          <div style={{ display: "flex" }} className="flex overflow-hidden">
            <Image
              width="100%"
              height={300}
              src={updateImage}
              className="overflow-hidden"
              // defaultValue={course?.imageUrl}
            />
          </div>
          <div
            className="flex justify-center items-center pt-2 pb-2"
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
          <Form.Item label="Name" name="name">
            <Input
              placeholder="Name Course"
              value={course?.name}
              defaultValue={course?.name}
            />
          </Form.Item>
          <Form.Item label="Specialize">
            <Select onChange={handleUpdateCate} defaultValue={updateCate}>
              {listCategory.map((option) => {
                return (
                  <Option key={option.specId} value={option.specId}>
                    {option.specName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {/* <Form.Item label="Mentor" name="mentor">
            {`${user?.displayName}`}
          </Form.Item> */}
          <Form.Item label="Length(mins)" name="length">
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
          <Form.Item label="Lectures" name="lecture">
            <InputNumber
              className="w-[200px]"
              min={0}
              controls={false}
              defaultValue={course?.lectureCount}
            />
          </Form.Item>
          <Form.Item label="Price(VND):" name="price">
            <InputNumber
              style={{ width: 200 }}
              min={0}
              controls={false}
              defaultValue={course?.price}
            />
          </Form.Item>
          <Form.Item label="Intro" name="shortDes">
            <Input defaultValue={course?.shortDescription} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} defaultValue={course?.description} />
          </Form.Item>
          <Space className="justify-end w-full">
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
