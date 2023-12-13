"use client";
import ".././globals.css";
import CourseItem from "@/components/course-item/course";
import Courses from "@/components/courses/courses";
import Paginate from "@/components/pagination/pagination";
import useDataFavoritesFetcher from "@/components/pagination/useDataFavoritesFetcher";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import {
  Breadcrumb,
  Empty,
  Spin,
  Table,
  Space,
  Form,
  Modal,
  Button,
  DatePicker,
  DatePickerProps,
  Select,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Schedule from "@/components/schedule/schedule";
import { http } from "@/api/http";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { toast } from "sonner";

export type Schedule = {
  id: number;
  courseId: number;
  startDate: string;
  endDate: string;
  note: string;
  status: number;
  userId: number;
};

const MyCourse = () => {
  const { role } = UserAuth();
  const router = useRouter();
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
    // if (role === 3) {
    //   router.push(`/`);
    // }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });
  const {
    loading,
    courses,
    totalPages,
    currentPage,
    setCurrentPage,
    setIsFavorites,
  } = useDataFavoritesFetcher();

  const { jwtToken, userData } = UserAuth();
  console.log("student token", jwtToken);
  const [form] = Form.useForm();
  const { Option } = Select;

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY/MM/DD";
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [scheduleData, setScheduleData] = useState<any>();
  const formData = new FormData();

  const handleCancel = () => {
    setIsConfirmationModalOpen(false);
    form.resetFields();
  };
  // const handle = () => {
  //   handleBanConfirmation(true);
  // };
  const breadcrumbsHome = () => {
    router.push("/");
  };
  const fetchDataSchedule = async () => {
    try {
      const response = await http.get(
        `https://learnconnectapi.azurewebsites.net/api/schedule/get-by-userid?userId=${userData?.id}`
      );
      setScheduleData(response.data);
      console.log("schedule data", response.data);
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  };

  useEffect(() => {
    fetchDataSchedule();
  }, []);

  const handleSubmit = async (values: any) => {
    const { note, course, selectedDate } = values;
    try {
      const url = `https://learnconnectapi.azurewebsites.net/api/schedule`;
      await http
        .post(
          url,
          {
            courseId: course,
            userId: userData?.id,
            startDate: selectedDate[0].toDate(),
            endDate: selectedDate[1].toDate(),
            note: note,
            courseName: "",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          toast.success("Submitted Success");
          form.resetFields();
          fetchDataSchedule();
        });
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsConfirmationModalOpen(false);
    }
  };

  return (
    <>
      <div className="bg-[#e7f8ee]">
        <div
          className="bg-no-repeat bg-auto flex flex-row justify-between"
          style={{
            backgroundImage: "url('/images/shape-23.png')",
          }}
        >
          <div>
            <Breadcrumb className="font-semibold text-3xl py-5 px-64 flex-auto">
              <Breadcrumb.Item>
                <button onClick={breadcrumbsHome}>Home</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>My Schedule</span>
              </Breadcrumb.Item>
            </Breadcrumb>{" "}
          </div>
          <div
            className="w-2/5 bg-auto bg-no-repeat bg-right-top flex-1"
            style={{
              backgroundImage: "url('/images/shape-24.png')",
            }}
          />
        </div>
      </div>{" "}
      <div className="container">
        <div className="mt-3">
          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">Add New personal learning schedule</div>
            }
            open={isConfirmationModalOpen}
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
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              layout="horizontal"
              className="mt-5"
              style={{ width: "100%" }}
              onFinish={handleSubmit}
              labelAlign="left"
            >
              <Form.Item
                label="Select Date"
                name="selectedDate"
                rules={[{ required: true, message: "Please select a date!" }]}
              >
                <RangePicker
                  defaultValue={[dayjs(), dayjs()]}
                  format={dateFormat}
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                />
              </Form.Item>

              <Form.Item
                label="Course"
                name="course"
                rules={[{ required: true, message: "Please select a course!" }]}
              >
                <Select
                  onChange={(value) => setSelectedCourse(value)}
                  placeholder="Select course"
                >
                  {courses.map((item) => (
                    <Option key={item.course.id} value={item.course.id}>
                      <div className="flex">
                        <img
                          className="w-8 h-[30px] mr-2"
                          src={item.course.imageUrl}
                          alt="imgcourse"
                        />{" "}
                        {item.course.name}
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Note" name="note">
                <TextArea
                  placeholder="Input Note"
                  autoSize={{ minRows: 5, maxRows: 6 }}
                />
              </Form.Item>
              <Space className="justify-end w-full">
                <Form.Item className="mb-0">
                  <Space>
                    <Button
                      className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                      onClick={handleCancel}
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
        </div>

        {loading ? (
          <div className="text-center text-5xl mt-5">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <button
              className="border border-[rgba(48, 146, 85, 0.2)] px-2 py-1 rounded-lg hover:border-[#309255] flex ml-auto"
              onClick={() => {
                setIsConfirmationModalOpen(true);
              }}
            >
              Add New
            </button>
            <div className="border border-[rgba(48, 146, 85, 0.2)] mt-2 px-2 rounded-lg">
              <Schedule
                scheduleData={scheduleData}
                fetchSchedule={() => {
                  fetchDataSchedule();
                }}
              />
            </div>
            <div className="min-h-[1000px]">
              {courses.length === 0 ? (
                <div className="text-center text-2xl mt-8 items-center justify-center">
                  <Empty description={false} />
                  You don&apos;t have any favorite courses.
                </div>
              ) : (
                <div className="grid cols-2 lg:grid-cols-3 pt-[30px] gap-5">
                  {courses.map((item) => (
                    <Courses
                      setIsFavorites={(isFavorites) => {
                        setIsFavorites(isFavorites);
                      }}
                      enrolled={false}
                      mentorId={0}
                      favorite={item.favorite ? true : false}
                      mentorProfilePictureUrl={""}
                      totalRatingCount={0}
                      lectureCount={""}
                      categoryName={""}
                      key={item.course.id.toString()}
                      {...item.course}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {courses.length > 0 && (
          <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default MyCourse;
