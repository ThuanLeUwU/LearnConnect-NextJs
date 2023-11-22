"use client";
import Link from "next/link";
import "../../globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserAuth } from "@/app/context/AuthContext";
import { CourseItem } from "@/components/pagination/useDataFavoritesFetcher";
import { Empty, Spin } from "antd";
import Paginate from "@/components/pagination/pagination";
import { Rating } from "@mui/material";
import { AiOutlineBars } from "react-icons/ai";
import { toast } from "sonner";
import {
  Button,
  Form,
  Input,
  Modal,
  Rate,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import { http } from "@/api/http";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type User = {
  id: string | number;
  password: string;
  email: string;
  role: 1;
  fullName: string;
  phoneNumber: string;
  gender: number;
  bioDescription: string;
  profilePictureUrl: string;
  status: number;
};
export type CourseItemProfile = {
  id: string | number;
  name: string;
  description: string;
  shortDescription: string;
  difficultyLevel: string;
  imageUrl: string;
  price: number;
  totalEnrollment: number;
  contentLength: number;
  averageRating: number;
  status: number;
  categoryId: number;
  totalRatingCount: number;
};

export default function ProfileUser({ params }: any) {
  const idMentor = params.id;
  const [DataMentor, SetDataMentor] = useState<User>();
  const [courses, setCourses] = useState<CourseItemProfile[]>([]);
  const API_URL =
    "https://learnconnectapitest.azurewebsites.net/api/course/get-courses-by-mentor?mentorId=";
  const pagesize = 4;
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { id, userData, jwtToken } = UserAuth();
  const [form] = Form.useForm();
  const [image, setImage] = useState<string>();
  const { Option } = Select;
  const [modalRating, setModalRatingOpen] = useState(false);
  const [value, setValue] = useState<number>(0);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const Reasons = [
    { id: "1", name: "Inappropriate content" },
    { id: "2", name: "Copyright violation" },
    { id: "3", name: "Community standards violation" },
  ];
  const handleChangeReason = (value: React.SetStateAction<null>) => {
    setSelected(value);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!jwtToken) {
      toast.error("You Must Login To add Favorites");
      router.push("/login");
      return;
    }
  };

  const handleClickMoveToCourse = (courseId: string | number) => {
    router.push(`/course-detail/${courseId}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const dropdown = document.getElementById("dropdown-menu");

    if (dropdown && !dropdown.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Attach event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formDataImage, setFormDataImage] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalRating = () => {
    setModalRatingOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModalRatingOpen(false);
    form.resetFields();
  };
  const handleRateChange = (newValue: number) => {
    setValue(newValue);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setFormDataImage(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setImage(url);
      });
    }
  };

  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleOk = async (data: any) => {
    setIsModalOpen(false);
    const formdata = new FormData();
    formdata.append("reportReason", selected || "1");
    formdata.append("reportComment", data.comment);
    if (formDataImage !== undefined) {
      formdata.append("reportImage", formDataImage);
    }
    try {
      await axios.post(
        `https://learnconnectapitest.azurewebsites.net/api/report/report-mentor?userId=${id}&mentorId=${idMentor}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleCancel();

      setTimeout(() => {
        toast.success("Report successful");
      });
    } catch (err) {
      setTimeout(() => {
        toast.error("Report fail");
      });
    }
  };

  const handleSubmit = async (data: any) => {
    // const numericValue = parseFloat(value);
    const formdata = new FormData();
    formdata.append("rating", value.toString());
    console.log("rate");
    formdata.append(
      "comment",
      data.description !== undefined ? data.description : null
    );

    try {
      // console.log("formDataImage1", formDataImage);
      // console.log("image1", image);
      await http.post(
        `https://learnconnectapitest.azurewebsites.net/api/rating/rating-mentor?userId=${id}&mentorId=${idMentor}`,
        // `/rating/rating-course?userId=${id}&courseId=${idCourse}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleCancel();

      setTimeout(() => {
        toast.success("Rating successful");
      });
    } catch (err) {
      setTimeout(() => {
        toast.error("Rating fail");
      });
    }
    // console.log("value", parseInt(value.toString()));
    // console.log("value", data.description);

    setModalRatingOpen(false);
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/mentor/${idMentor}`
        );
        SetDataMentor(response?.data.user);
        console.log("data mentor", response?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (idMentor) {
      fetchUserData();
    }
  }, [idMentor]);

  const displayGender = (gender: number | undefined) => {
    if (gender === 1) {
      return "Male";
    } else if (gender === 2) {
      return "Female";
    } else if (gender === 3) {
      return "Other";
    } else {
      return "Not specified";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await axios.get(
        `${API_URL}${idMentor}&currentPage=${page}&pageSize=${pagesize}`
      );
      setCourses(result?.data.courses);
      console.log("datacourse", result?.data.courses);
      setTotalPages(result?.data.paginationData.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [currentPage]);

  console.log("course", courses);

  return (
    <div className="container">
      {DataMentor && (
        <section className="bg-gradient-to-b">
          <div className="py-5">
            <div className="flex justify-center items-center">
              <div className="w-full">
                <div className="bg-[#fff] rounded-lg shadow-lg">
                  <div className="bg-[#309255] text-white flex lg:flex-row rounded-t p-4 lg:p-8 position">
                    <div className="lg:mr-4 lg:mt-0 flex flex-col items-center w-full lg:w-36">
                      <img
                        src={
                          DataMentor?.profilePictureUrl ||
                          "www.default.imageurl"
                        }
                        alt="Generic placeholder image"
                        className="w-36 h-36 rounded-full mt-4 mb-2"
                      />
                    </div>
                    <div className="author-content pl-4 my-auto">
                      <h5 className="text-lg my-1">
                        Full Name: {DataMentor?.fullName}
                      </h5>
                      <h5 className="text-lg my-1">
                        Email: {DataMentor?.email}
                      </h5>
                      <h5 className="text-lg my-1">
                        Gender: {displayGender(DataMentor?.gender)}
                      </h5>
                      <h5 className="text-lg my-1">
                        Phone: {DataMentor?.phoneNumber}
                      </h5>
                    </div>
                    <div className="ml-auto">
                      <button onClick={toggleDropdown}>
                        <AiOutlineBars
                          className="border border-opacity-20 border-[#fff] rounded-lg text-4xl"
                          onClick={toggleDropdown}
                        />
                      </button>
                      {isDropdownOpen && (
                        <div
                          id="dropdown-menu"
                          className="modal-overlay absolute"
                        >
                          <div className="bg-white border border-gray-300 rounded shadow-lg">
                            <div className="p-2 text-black flex flex-col">
                              <button
                                className="px-3 py-2 mb-1 hover:bg-[#e7f8ee]"
                                onClick={showModal}
                              >
                                Report
                              </button>
                              <button
                                className="px-3 py-2 hover:bg-[#e7f8ee]"
                                onClick={showModalRating}
                              >
                                Rating
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card-body p-4 text-black">
                    <div className="mb-5">
                      <p className="font-semibold text-lg mb-2">
                        Bio Description
                      </p>
                      <div className="p-4 bg-gray-200">
                        <p className="italic mb-1">
                          {DataMentor?.bioDescription}
                        </p>
                      </div>
                    </div>
                    {loading ? (
                      <div className="text-center text-5xl mt-5">
                        <Spin size="large" />
                      </div>
                    ) : (
                      <div className="min-h-[60vh]">
                        {courses.length === 0 ? (
                          <div className="text-center text-2xl mt-8 items-center justify-center">
                            <Empty description={false} />
                            Mentor don&apos;t have any courses.
                          </div>
                        ) : (
                          <div className="min-h-[1000px]">
                            {courses &&
                              courses.length > 0 &&
                              courses.map((item) => (
                                <div className="swiper-container" key={item.id}>
                                  <button
                                    className="swiper-wrapper mb-3 shadow-lg rounded-lg hover:border-[#309255] hover:bg-[#e7f8ee] w-full"
                                    onClick={() =>
                                      handleClickMoveToCourse(item.id)
                                    }
                                  >
                                    <div className="single-review border border-opacity-20 border-[#30925533] p-7 rounded-md flex flex-col items-start text-start">
                                      <div className="review-author flex ">
                                        <div className="author-thumb border border-[#309255]">
                                          <img
                                            src={item.imageUrl}
                                            alt="Author"
                                            className="w-60 h-44 object-cover min-w-[240px]"
                                          />
                                        </div>
                                        <div className="pl-4">
                                          <h4 className="text-2xl font-medium">
                                            {item.name}
                                          </h4>
                                          <div className="h-2/5 ">
                                            <span className="text-sm">
                                              {item.description}
                                            </span>
                                          </div>
                                          <div className="flex">
                                            <Rating
                                              name="half-rating-read"
                                              defaultValue={item.averageRating}
                                              precision={0.1}
                                              readOnly
                                            />
                                            <span className="">
                                              ({item.totalRatingCount} Reviews)
                                            </span>
                                            {/* <span>{item.totalRatingCount}</span> */}
                                          </div>
                                          <div>
                                            <span className="rating-bar">
                                              {item.totalEnrollment &&
                                                item.totalEnrollment.toLocaleString()}{" "}
                                              Students Joined
                                            </span>
                                          </div>
                                          <div>
                                            <span className="text-[#309255] mt-1.5 font-bold text-lg">
                                              {item.price === 0 ? (
                                                <p>Free</p>
                                              ) : (
                                                <>
                                                  {item.price &&
                                                    item.price.toLocaleString()}{" "}
                                                  <span>VND</span>
                                                </>
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Modal
                  destroyOnClose={true}
                  title={`Report ${DataMentor?.fullName} by ${userData?.fullName}`}
                  open={isModalOpen}
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
                    onFinish={handleOk}
                  >
                    <Form.Item label="Reason">
                      <Select
                        onChange={handleChangeReason}
                        // defaultValue={selected}  // You can set a default value if needed
                      >
                        {Reasons.map((option) => (
                          <Option key={option.id} value={option.name}>
                            {option.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Comment" name="comment">
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Capture" getValueFromEvent={normFile}>
                      <Upload
                        accept="image/png, image/jpeg"
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        action="https://learnconnectapitest.azurewebsites.net/api/Upload/image"
                        listType="picture-card"
                      >
                        Upload
                      </Upload>
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
                            Report
                          </Button>
                        </Space>
                      </Form.Item>
                    </Space>
                  </Form>
                </Modal>
                <Modal
                  destroyOnClose={true}
                  title={`Rating ${DataMentor?.fullName} by ${userData?.fullName}`}
                  open={modalRating}
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
                    <span className="flex pl-[140px] pb-5">
                      <Rate
                        tooltips={desc}
                        onChange={handleRateChange}
                        value={value}
                      />
                    </span>
                    <Form.Item label="Description" name="description">
                      <Input.TextArea rows={3} />
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
                            Rating
                          </Button>
                        </Space>
                      </Form.Item>
                    </Space>
                  </Form>
                </Modal>
              </div>
            </div>
            {courses.length > 0 && (
              <Paginate
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </section>
      )}
    </div>
  );
}
