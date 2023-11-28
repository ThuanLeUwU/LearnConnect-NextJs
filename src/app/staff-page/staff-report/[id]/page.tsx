"use client";
import React, { useEffect, useState } from "react";
import LeftNavbar from "@/components/left-navbar/page";
import axios from "axios";
// import Modal from "@mui/material/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { GrFormPrevious } from "react-icons/gr";
import { toast } from "sonner";
import { Breadcrumb, Button, Form, Modal, Space, Spin } from "antd";
import { UserAuth } from "@/app/context/AuthContext";
import { Course } from "@/components/courses/courses";

interface Report {
  id: number;
  reportType: string;
  description: string;
  timeStamp: string;
  imageUrl: string;
  reportByNavigation: {
    fullName: string;
    profilePictureUrl: string;
  };
}

const StaffReportID = ({ params }: any) => {
  const searchParam = useSearchParams();
  const [reportData, setReportData] = useState<Report[]>([]);
  const idCourse = params.id;
  const target = searchParam?.get("target");
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const router = useRouter();
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { id, userData } = UserAuth();

  const handleBanClick = () => {
    setConfirmationModalOpen(true);
  };

  const handleCancelBan = () => {
    setConfirmationModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/report/get-reports?targetId=${idCourse}&reportType=${target}`
        );
        console.log("API Response:", response.data);
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idCourse]);

  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/course/${idCourse}`
        );
        console.log("API Response:", response.data);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idCourse]);

  const handleBack = () => {
    router.push(`/staff-page/staff-report`);
  };

  const fetchData = async () => {
    try {
      let apiUrl;

      if (target === "course") {
        apiUrl = `https://learnconnectapitest.azurewebsites.net/api/course/ban-course?courseId=${idCourse}&status=true`;
      }

      const response = await axios.post(apiUrl);
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleConfirmBan = async () => {
    try {
      await fetchData();
      setConfirmationModalOpen(false);
      handleBack();
      toast.success(`Successfully banned ${target}`);
    } catch (error) {
      console.error("Error banning course:", error);
      toast.error("Failed to ban course. Please try again.");
    }
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
          />

          <div className="w-full mt-4">
            {/* <div className="flex"> */}
            <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
              <Breadcrumb className="text-start font-semibold text-4xl my-5 px-4">
                <Breadcrumb.Item>
                  <button onClick={handleBack}>Report</button>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{course?.name}</Breadcrumb.Item>
              </Breadcrumb>

              {/* <div className="">
              <button className="mx-5 my-3 px-5 py-3 rounded-lg text-black bg-[#e7f8ee]">
                <GrFormPrevious className="text-2xl" />
              </button>
            </div> */}
              <div className="ml-auto">
                <button
                  className="mx-5 my-3 px-5 py-3 bg-red-500 rounded-lg text-white"
                  onClick={handleBanClick}
                >
                  Ban this {target}
                </button>
              </div>
            </div>

            <Modal
              destroyOnClose={true}
              title={
                <div className="text-lg">
                  Are you sure you want to ban this {target}?
                </div>
              }
              open={isConfirmationModalOpen}
              width="35%"
              onCancel={handleCancelBan}
              footer={false}
              style={{
                top: "30%",
              }}
            >
              <Form
                autoComplete="off"
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                className="mt-5"
                style={{ width: "100%" }}
                onFinish={handleConfirmBan}
              >
                <Space className="justify-end w-full">
                  <Form.Item className="mb-0">
                    <Space>
                      <Button
                        className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                        onClick={handleCancelBan}
                        style={{
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
            {/* </div> */}
            {Array.isArray(reportData) && reportData.length > 0 ? (
              reportData.map((report) => (
                <div
                  key={report.id}
                  className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-5 rounded-md mx-5 h-[250px]"
                >
                  <div className="review-author flex justify-between">
                    <div className="flex flex-row mb-3">
                      <div className="author-thumb p-2 rounded-full">
                        <img
                          src={report.reportByNavigation.profilePictureUrl}
                          alt="Author"
                          className="w-24 h-24 rounded-full border border-opacity-20 border-[#309255]"
                        />
                      </div>
                      <div className="author-content pl-4 flex flex-col">
                        <div className=" font-bold text-xl">
                          {report.reportByNavigation.fullName}
                        </div>
                        <span className=" text-[#309255] font-light">
                          {report.timeStamp
                            ? new Date(report.timeStamp).toLocaleTimeString(
                                "en-US"
                              )
                            : ""}{" "}
                          {report.timeStamp
                            ? new Date(report.timeStamp).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : ""}{" "}
                        </span>
                        <div className="mt-5">
                          <p>Reason: {report.reportType}</p>
                          <p>{report.description}</p>
                        </div>
                      </div>
                    </div>
                    <Modal
                      visible={selectedReportId !== null}
                      onCancel={() => setSelectedReportId(null)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      width="80%"
                    >
                      <div className="bg-white p-8 w-3/4 h-3/4 max-w-full max-h-full overflow-auto flex items-center justify-center mx-auto">
                        {selectedReportId !== null && (
                          <img
                            src={
                              reportData.find(
                                (report) => report.id === selectedReportId
                              )?.imageUrl || ""
                            }
                            alt="Larger Report img"
                            className="max-w-full max-h-full"
                          />
                        )}
                      </div>
                    </Modal>
                    {report.imageUrl && (
                      <img
                        src={report.imageUrl}
                        alt="Report img"
                        className="w-52 h-52 border border-opacity-20 border-[#309255] rounded-lg"
                        onClick={() => setSelectedReportId(report.id)}
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No reports available.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StaffReportID;
