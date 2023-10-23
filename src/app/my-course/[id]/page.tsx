"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import AccordionItem from "@/components/dropdown/Dropdown";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Course } from "@/components/courses/courses";
import Image from "next/image";
// import { Button } from "react-bootstrap";
import { Button, Form, Input, Modal, Select, Space, Upload } from "antd";
// import { Option } from "antd/es/mentions";

export default function AfterEnroll({ params }: any) {
  const [activeTab, setActiveTab] = useState("tab1");
  const [form] = Form.useForm();
  const [selected, setSelected] = useState(null);
  const { Option } = Select;
  const { TextArea } = Input;
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

  const idCourse = params.id;
  // console.log("id is", idCourse);
  //   const id = router.query.id;
  //   console.log("id", id);
  const [videoSrc, setVideoSrc] = useState(
    "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&profile_id=119"
  );
  const changeVideoSource = (newSrc: React.SetStateAction<string>) => {
    setVideoSrc(newSrc);
    const videoElement = document.getElementById(
      "courseVideo"
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.load();
    }
  };
  const [courses, setCourses] = useState<Course>();
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/course/${idCourse}`
      );
      setCourses(responseData?.data);
    };

    fetchData();
  }, []);

  console.log("course123", courses);

  return (
    <div className="container">
      <div className="grid cols-2 lg:grid-cols-12 mt-[40px]">
        <div className="lg:col-span-8">
          <video width="full" height="full" controls id="courseVideo">
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div>
            <div className="px-3">
              <div className="flex justify-between">
                <h2 className="text-[25px] leading-normal text-[#212832] font-medium mt-2.5">
                  {courses?.name}
                </h2>
                <a onClick={showModal}>
                  <Image
                    width={40}
                    height={40}
                    src="/menu-icon/flag-icon.jpg"
                    alt="flag"
                  />
                </a>
                <Modal
                  title={`Report ${courses?.name} của ai`}
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
                        defaultValue={selected}
                        onChange={handleChangeReason}
                      >
                        {Reasons.map((option) => {
                          return (
                            <Option key={option.id} value={option.id}>
                              {option.name}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Comment">
                      <TextArea rows={4} />
                    </Form.Item>
                    {/* <Form.Item
                      label="Capture"
                      // valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload action="/upload.do" listType="picture-card">
                        <div>
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item> */}
                    <Space className="justify-end w-full pr-[150px]">
                      <Form.Item className="mb-0">
                        <Space >
                          <Button onClick={handleCancel} >Cancel</Button>
                          <Button type="primary" htmlType="submit" style={{color: "black"}}>Report</Button>
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
                      lecture
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
                              Course Details
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
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
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
                                            Pamela Foster
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
                                            2,16
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
                              lecture
                            </h4>
                          </div>
                        </div>
                        <div className="lg:col-span-8">
                          <AccordionItem
                            header="Lesson-01: Mindful Growth & the Creative Journey, Find
                      Your Spark & Map Your Future"
                            time="01 hour 48 minutes"
                            timevideo="08 minutes"
                            onLinkClick={changeVideoSource}
                          />
                          <AccordionItem
                            header="Lesson-02: Mindful Growth & the Creative Journey, Find
                      Your Spark & Map Your Future"
                            time="01 hour 48 minutes"
                            timevideo="08 minutes"
                            onLinkClick={changeVideoSource}
                          />
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
              80 Lessons ({courses?.contentLength} m)
            </span>
          </div>
          <div className="video-playlist bg-[#eefbf3] text-black">
            <div className="accordion" id="videoPlaylist">
              <nav className="vids">
                <a
                  className={`link ${
                    videoSrc ===
                    "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&profile_id=119"
                      ? "active text-[#309255] "
                      : ""
                  }`}
                  href="#"
                  onClick={() =>
                    changeVideoSource(
                      "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&profile_id=119"
                    )
                  }
                >
                  <div className="pl-20 py-2 pr-[30px]">
                    <p>01. The Complete Medicine Masterclass</p>
                    <span
                      className={`total-duration text-[#848886] text-[13px] mt-1.5`}
                    >
                      08 minutes
                    </span>
                  </div>
                </a>
                <a
                  className={`link ${
                    videoSrc ===
                    "https://player.vimeo.com/external/207590826.hd.mp4?s=6a918d074abf8f3add7858018855524d384f6934&amp;profile_id=119"
                      ? "active text-[#309255]"
                      : ""
                  }`}
                  href="#"
                  onClick={() =>
                    changeVideoSource(
                      "https://player.vimeo.com/external/207590826.hd.mp4?s=6a918d074abf8f3add7858018855524d384f6934&amp;profile_id=119"
                    )
                  }
                >
                  <div className="pl-20 py-2 pr-[30px]">
                    <p>02. The Complete Medicine Masterclass</p>
                    <span
                      className={`total-duration text-[#848886] text-[13px] mt-1.5`}
                    >
                      08 minutes
                    </span>
                  </div>
                </a>
              </nav>
            </div>
          </div>
          <div className="video-playlist bg-[#eefbf3] text-black">
            <div className="accordion" id="videoPlaylist"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
