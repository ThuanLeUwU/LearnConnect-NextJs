"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../globals.css";
import AccordionItem from "@/components/dropdown/Dropdown";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Course, Lectures } from "@/components/courses/courses";
import Image from "next/image";

// import { Button } from "react-bootstrap";
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
// import { Option } from "antd/es/mentions";
import { UserAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";
import { http } from "@/api/http";

export type Lecture = {
  id: string | number;
  title: string;
  content: string;
  contentUrl: string;
  contentType: number;
  rejectReason: string;
  status: number;
  courseId: number;
};

export type Performance = {
  id: string | number;
  score: number;
  timeSpent: number;
  userId: number;
  courseId: number;
};

export default function AfterEnroll({ params }: any) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tab1");
  const { id, user, jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const [form] = Form.useForm();

  const [image, setImage] = useState<string>();
  const [formDataImage, setFormDataImage] = useState();

  const [selected, setSelected] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const { Option } = Select;
  const { TextArea } = Input;
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  const [lectures, setLectures] = useState<Lectures>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const idCourse = params.id;
  const [courses, setCourses] = useState<Course>();
  // const [videoSrc, setVideoSrc] = useState(
  //   "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&profile_id=119"
  // );
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (data: any) => {
    // console.log(e)
    setIsModalOpen(false);
    const formdata = new FormData();
    formdata.append("reportReason", selected || "1");
    formdata.append("reportComment", data.comment);
    if (formDataImage !== undefined) {
      formdata.append("reportImage", formDataImage);
    }
    try {
      console.log("formDataImage1", formDataImage);
      console.log("image1", image);
      await axios.post(
        `https://learnconnectapitest.azurewebsites.net/api/report/report-course?userId=${id}&courseId=${idCourse}`,
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

    console.log("fomdata", selected);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModalRatingOpen(false);
    form.resetFields();
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

  const Reasons = [
    { id: "1", name: "Nội dung không phù hợp" },
    { id: "2", name: "Vi phạm bản quyền" },
    { id: "3", name: "Vi phạm tiêu chuẩn cộng đồng " },
  ];

  const handleChangeReason = (value: React.SetStateAction<null>) => {
    setSelected(value);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // const uploadImage = () => {
  //   const fetchImg= async () => {
  //     const res = await axios.post(`https://learnconnectapitest.azurewebsites.net/api/image`)
  //   }
  // }

  // console.log("id is", idCourse);
  //   const id = router.query.id;
  //   console.log("id", id);
  const [testVideo, setTestVideo] = useState<Lecture[]>([]);
  console.log("test", testVideo);
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/lecture/by-course/${idCourse}`
      );
      setTestVideo(responseData?.data);
    };

    fetchData();
    if (testVideo.length > 0) {
      setVideoSrc(testVideo[0].contentUrl);
      setActiveVideoIndex(0);
    }
  }, []);
  const [videoSrc, setVideoSrc] = useState("");
  const changeVideoSource = (newSrc: string, index: number) => {
    setVideoSrc(newSrc);
    setActiveVideoIndex(index);
    const videoElement = document.getElementById(
      "courseVideo"
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.load();
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await http.get(
        `https://learnconnectapitest.azurewebsites.net/api/course/${idCourse}`
      );
      setCourses(responseData?.data);
    };

    fetchData();
  }, []);

  console.log("course123", courses?.id);

  const handleClick = () => {
    router.push(`/test/${courses?.id}`);
  };
  const videoRef = useRef(null);

  //rating
  const [modalRating, setModalRatingOpen] = useState(false);
  const [value, setValue] = useState(0);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const showModalRating = () => {
    setModalRatingOpen(true);
  };

  const handleSubmit = async (data: any) => {
    const formdata = new FormData();
    formdata.append("reportReason", value.toString());
    formdata.append("reportComment", data.description);

    console.log("value", parseInt(value.toString()));
    console.log("value", data.description);

    setModalRatingOpen(false);
  };

  const [performance, setPerformance] = useState<Performance>();
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/learning-performance/user/${id}/course/${idCourse}`
      );
      setPerformance(responseData?.data);
      console.log("performance", performance);
    };

    fetchData();
  }, []);
  console.log("performance", performance?.score);
  const handleSeek = (e: any) => {
    // const video = videoRef.current;
    // if (video) {
    //   const currentTime = video.currentTime;
    //   // Hạn chế tua nhanh bằng cách đặt thời gian hiện tại của video
    //   if (currentTime < video.currentTime) {
    //     video.currentTime = currentTime;
    //   }
    // }
  };

  console.log("formDataImage", formDataImage);
  console.log("image", image);

  return (
    <div className="container">
      <div className="grid cols-2 lg:grid-cols-12 mt-[40px]">
        <div className="lg:col-span-8">
          {!videoSrc && (
            <img
              src={courses?.imageUrl}
              className="w-full object-cover h-[438px]"
            />
          )}
          {videoSrc && (
            <video
              width="full"
              height="full"
              controls
              id="courseVideo"
              onSeeking={handleSeek}
              ref={videoRef}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
          <div>
            <div className="px-3">
              <div className="flex justify-between mt-2.5">
                <h2 className="text-[25px] leading-normal text-[#212832] font-medium ">
                  {courses?.name}
                </h2>
                <div className=" flex gap-[10px]">
                  <Button
                    style={{ color: "black", background: "lightgreen" }}
                    type="primary"
                    onClick={showModalRating}
                  >
                    {/* <Image
                    width={40}
                    height={40}
                    src="/menu-icon/flag-icon.jpg"
                    alt="flag"
                  /> */}
                    Rating
                  </Button>

                  <Button danger type="primary" onClick={showModal}>
                    {/* <Image
                    width={40}
                    height={40}
                    src="/menu-icon/flag-icon.jpg"
                    alt="flag"
                  /> */}
                    Report
                  </Button>
                </div>
                <Modal
                  destroyOnClose={true}
                  title={`Rating ${courses?.name} by ${user?.displayName}`}
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
                      <Rate tooltips={desc} onChange={setValue} value={value} />
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
                <Modal
                  destroyOnClose={true}
                  title={`Report ${courses?.name} by ${user?.displayName}`}
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
                        // defaultValue={selected}
                        onChange={handleChangeReason}
                      >
                        {Reasons.map((option) => {
                          return (
                            <Option key={option.id} value={option.name}>
                              {option.name}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Comment" name="comment">
                      <Input.TextArea rows={4} />
                    </Form.Item>
                    {/* <Form.Item>
                      {/* <Image width={200} height={200} src={image} /> */}
                    {/* </Form.Item> */}
                    <Form.Item
                      label="Capture"
                      // valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        accept="image/png, image/jpeg"
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                        // headers={{ Authorization: authorization }}
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
              </div>
              <div className="flex justify-center bg-[#e7f8ee] p-3 rounded-lg mt-5">
                <ul className="tabs flex space-x-5">
                  <li
                    className={`cursor-pointer rounded-md ${
                      activeTab === "tab1"
                        ? " text-[#fff] bg-[#309255]"
                        : "bg-[#fff] "
                    }`}
                    onClick={() => handleTabClick("tab1")}
                  >
                    <button className="w-28 h-14 px-[15px] text-center text-sm font-medium  rounded-md hover:text-[#fff] hover:bg-[#309255]">
                      Overview
                    </button>
                  </li>
                  <li
                    className={`cursor-pointer rounded-md ${
                      activeTab === "tab2"
                        ? " text-[#fff] bg-[#309255]"
                        : "bg-[#fff] "
                    }`}
                    onClick={() => handleTabClick("tab2")}
                  >
                    <button className="w-28 h-14 px-[15px] text-center text-sm font-medium  border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#fff] hover:bg-[#309255]">
                      Lecture
                    </button>
                  </li>
                  <li
                    className={`cursor-pointer rounded-md ${
                      activeTab === "#"
                        ? " text-[#fff] bg-[#309255]"
                        : "bg-[#fff] "
                    }`}
                  >
                    <button className="w-28 h-14 px-[15px] text-center text-sm font-medium  border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#fff] hover:bg-[#309255]">
                      Share
                    </button>
                  </li>
                </ul>
              </div>
              {activeTab === "tab1" && (
                <div className="w-full mx-auto">
                  <div className="faq-wrapper">
                    <div className="single-faq-item">
                      <div className="grid cols-2 lg:grid-cols-12 border-[#dff0e6] border border-solid rounded-lg px-[70px] pb-[35px] mt-5">
                        <div className="lg:col-span-4 px-[15px]">
                          <div className="">
                            <h4 className="text-[25px] px-[15px] pt-5 text-[#212832]">
                              Details
                            </h4>
                          </div>
                        </div>
                        <div className="lg:col-span-8">
                          <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                            <p className="mb-4 leading-loose">
                              {courses?.description}{" "}
                            </p>
                            <div className="flex flex-col">
                              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                  <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                      <tbody>
                                        <tr className="border-b border-b-[#e7f8ee]">
                                          <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
                                            Instructor
                                          </td>
                                          <td className="whitespace-nowrap px-6 py-4">
                                            :
                                          </td>
                                          <td className="whitespace-nowrap px-6 py-4 text-[#52565b] text-[15px] font-normal">
                                            {/* {courses.} */}
                                            {courses?.mentorName}
                                          </td>
                                        </tr>
                                        <tr className="border-b border-b-[#e7f8ee]">
                                          <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
                                            Duration
                                          </td>
                                          <td className="whitespace-nowrap px-6 py-4">
                                            :
                                          </td>
                                          <td className="whitespace-nowrap px-6 py-4 text-[#52565b] text-[15px] font-normal">
                                            {courses?.contentLength}{" "}
                                            <span>min</span>
                                          </td>
                                        </tr>
                                        <tr className="border-b border-b-[#e7f8ee]">
                                          <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
                                            Lectures
                                          </td>
                                          <td className="whitespace-nowrap px-6 py-4">
                                            :
                                          </td>
                                          <td className="whitespace-nowrap px-6 py-4 text-[#52565b] text-[15px] font-normal">
                                            {courses?.lectureCount}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "tab2" && (
                <div className="w-full mx-auto">
                  <div className="faq-wrapper">
                    <div className="single-faq-item">
                      <div className="grid cols-2 lg:grid-cols-12 border-[#dff0e6] border border-solid rounded-lg px-[70px] pb-[35px] mt-5">
                        <div className="lg:col-span-4 px-[15px]">
                          <div className="">
                            <h4 className="text-[25px] px-[15px] pt-5 text-[#212832]">
                              Lectures
                            </h4>
                          </div>
                        </div>
                        <div className="lg:col-span-8">
                          {testVideo &&
                            testVideo.map((item, index) => (
                              <div key={index}>
                                <p className="mt-5 font-bold">
                                  Lecture-{index + 1} : {item.title}
                                </p>
                                <p className="mt-3.5 text-[#52565b] text-base font-extralight">
                                  {item?.content}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-[#dff0e6] px-[30px] pt-[15px] pb-[25px]">
            <h3 className="text-[22px] mt-2.5">{courses?.name}</h3>
            <span className="mt-2.5 text-[#309255] text-[18px]">
              {courses?.lectureCount} Lectures ({courses?.contentLength} m)
            </span>
          </div>
          <div className="video-playlist bg-[#eefbf3] text-black">
            <div className="accordion" id="videoPlaylist">
              <nav className="vids">
                {testVideo.map((item, index) => {
                  return (
                    <a
                      key={item.id}
                      className={`link ${
                        activeVideoIndex === index
                          ? "active text-[#309255]"
                          : ""
                      }`}
                      onClick={() => changeVideoSource(item.contentUrl, index)}
                    >
                      <div className="pl-20 py-2 pr-[30px]">
                        <p>
                          Lecture {index + 1} : {item.title}
                        </p>
                      </div>
                    </a>
                  );
                })}
                <div className="pl-10 py-2 pr-[30px] bg-[#dff0e6] flex">
                  <button
                    className="border-2 border-[#309255] px-5 py-1 rounded-lg hover:bg-[#309255] active:bg-[#75c989] hover:text-white"
                    onClick={handleClick}
                  >
                    Test
                  </button>
                  <p className="ml-auto my-auto">Score: {performance?.score}</p>
                </div>
              </nav>
            </div>
          </div>
          {/* <Button danger type="primary" onClick={handleClick}>
            Test
          </Button> */}
          <div className="video-playlist bg-[#eefbf3] text-black">
            <div className="accordion" id="videoPlaylist"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
