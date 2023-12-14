"use client";
import { http } from "@/api/http";
import { UserAuth } from "@/app/context/AuthContext";
import InstructorCourseStyle from ".././styles/style.module.scss";
import {
  Modal,
  Form,
  Input,
  Space,
  Button,
  InputNumber,
  Upload,
  message,
  DatePicker,
  Tabs,
  Breadcrumb,
  Image,
  Tooltip,
  Spin,
  Table,
  Checkbox,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import "../../globals.css";
import { useRouter } from "next/navigation";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import FormItem from "antd/es/form/FormItem";
import Link from "next/link";
import { Specialize } from "../page";
import UploadFirebase from "@/components/uploadfirebase/uploadfirebase";
import { Lecture } from "@/app/my-course/[id]/page";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Test } from "@/components/test/test";
import { Course } from "@/components/courses/courses";
import { AiOutlineCheckCircle } from "react-icons/ai";

export type User = {
  id: string | number;
  password: string;
  email: string;
  role: number;
  fullName: string;
  dob: string | number | null;
  phoneNumber: string;
  gender: number;
  registrationDate: string | null;
  lastLoginDate: string | null;
  bioDescription: string;
  profilePictureUrl: string;
};

interface Major {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export type oneTest = {
  test: any;
  id: number;
  title: string;
  description: string;
  totalQuestion: number;
  status: number;
  courseId: number;
  questions: any;
};

export type Question = {
  questions: any;
  question: {
    id: number;
    questionText: string;
    questionType: number;
    status: number;
    testId: number;
  };
  answers: [
    {
      id: number;
      answerText: string;
      isCorrect: boolean;
      questionId: number;
    }
  ];
};

export default function CreateCourse() {
  const router = useRouter();
  const { id, userData } = UserAuth();
  const [form] = Form.useForm();

  const { Option } = Select;
  const [image, setImage] = useState<string>();
  const [inforCourse, setInforCourse] = useState(true);
  const [lectureTabs, setLectureTab] = useState(false);
  const [testTabs, setTestTab] = useState(false);
  const [courseId, setCourseId] = useState<number>(0);
  const [source, setSource] = useState<string>("");
  const [lectures, setLectures] = useState<Lecture[]>([]);
  console.log("tui ne", courseId);

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

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
    if (!file) {
      message.warning("Please upload an image!");
      return false;
    }
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      toast.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  ///////////
  const menuItem = [
    {
      image: "/menu-icon/book-alt.png",
      title: "Courses",
      href: "/instructorcourses",
    },
    // {
    //   image: "/menu-icon/icon-2.png",
    //   href: "/dashboard",
    // },
    {
      image: "/menu-icon/feedback-review.png",
      title: "Reviews",
      href: "/review-mentor",
    },
    {
      image: "/menu-icon/money-check-edit.png",
      title: "Revenues",
      href: "/revenue",
    },
    {
      image: "/menu-icon/file-edit.png",
      title: "Requests",
      href: "/request-history",
    },
    {
      image: "/menu-icon/receipt.png",
      title: "Transaction History",
      href: "/order-history",
    },
  ];

  const [selected, setSelected] = useState<number>(0);

  const routerCourses = () => {
    router.push("/instructorcourses");
  };

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
  }, [userData]);

  const handleChangeCate = (value: number) => {
    setSelected(value);
  };

  const [formDataImage, setFormDataImage] = useState();
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    http
      .get(
        `https://learnconnectapi.azurewebsites.net/api/course/get-course-by-mentor/mentorUserId/${id}/course/${courseId}`
      )
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [courseId]);

  console.log("j z toi", course);

  const handleSubmit = async (data: any) => {
    // console.log("anian", data.specialization);
    if (formDataImage === undefined) {
      toast.error("Please Input Image");
    } else if (selected === 0) {
      toast.error("Please Choose Specialization");
    } else {
      const formData = new FormData();
      formData.append("courseName", data.name);
      formData.append("description", data.description);
      formData.append("shortDescription", data.shortDes);
      formData.append("price", data.price);
      formData.append("contentLength", data.length);
      formData.append("lectureCount", "0");
      formData.append("specializationId", data.specialization);
      if (formDataImage !== undefined) {
        formData.append("courseImage", formDataImage);
      }
      try {
        await http
          .post(`/course/create-new-course?userId=${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setCourseId(res.data.id);
            setStep1Completed(true);
            setDisableButton(false);
            setCourse(res.data);
          });
        form.resetFields();
        setTimeout(() => {
          toast.success("Create Course successful");
        });
      } catch (err) {
        setTimeout(() => {
          toast.error("Create Course fail");
        });
      }
    }
  };

  const handleLecture = (data: any) => {
    // console.log("hehe", data.type);
    if (!source) {
      toast.error("Please Input Your Video Content!");
    } else {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("contentType", data.type);
      formData.append("contentUrl", source);
      // if (formDataSource !== undefined) {
      //   formData.append("contentUrl", formDataSource);
      // }

      try {
        http
          .post(
            `https://learnconnectapi.azurewebsites.net/api/lecture/create-new-lecture?userId=${id}&courseId=${courseId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(() => {
            setIsModerating(false);
          });
      } catch (err) {
        setTimeout(() => {
          toast.error("Create Lecture fail");
        });
      }
    }
  };

  const [type, setType] = useState<number>(1);
  const Type = [
    { id: 1, title: "Video" },
    { id: 0, title: "Document" },
  ];

  const handleChangeType = (value: number) => {
    setType(value);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <>
          {text.length > 20 ? (
            <>
              <span>{`${text.slice(0, 20)}...`}</span>
            </>
          ) : (
            text
          )}
        </>
      ),
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (text, record) => (
        <>
          {text.length > 20 ? (
            <>
              <span>{`${text.slice(0, 20)}...`}</span>
            </>
          ) : (
            text
          )}
        </>
      ),
    },
    {
      title: "Type",
      dataIndex: "contentType",
      key: "contentType",
      render: (text: number, record: any) => {
        return text === 1 ? "Video" : "Document";
      },
    },
  ];

  const [lecture, setLecture] = useState<Lecture>();

  const [visible, setVisible] = useState(false);

  const handleRowClick = (record) => {
    // Xử lý khi click vào một hàng (item)
    console.log("Clicked item:", record);
    setLecture(record);
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setShowQuestionForm(false);
    setShowAnswerForm(false);
  };

  const [isModerating, setIsModerating] = useState<boolean>();

  const handleSuccessModeration = () => {
    setTimeout(() => {
      // toast.info("Video is Moderating By")
      http
        .get(
          `https://learnconnectapi.azurewebsites.net/api/lecture/by-course/${courseId}`
        )
        .then((response) => {
          setLectures(response.data);
          setIsModerating(true);
          form.resetFields();
          setSource("");
        });
    }, 2000);
  };

  useEffect(() => {
    if (isModerating === false) {
      toast.success("Moderation Video Complete!");
    } else if (isModerating === true) {
      toast.info("Create Lecture Successfully! Video is moderating ... ");
    }
  }, [isModerating]);

  const [listQuestion, setListQuestion] = useState<oneTest>();
  const [allOfTest, setAllOffTest] = useState<Test[]>([]);
  const [allQuestions, setAllQuestions] = useState<Test[]>([]);
  console.log("hasdhajskdh", allQuestions);

  useEffect(() => {
    http
      .get(`/test/get-tests-by-course?courseId=${courseId}`)
      .then((response) => {
        setListQuestion(response.data);
        // setAllQuestions(response.data[0].questions);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const [titleTest, setTitleTest] = useState();

  const [titleFormTest, setTestTitleForm] = useState(true);
  const [testId, setTestId] = useState<number>(0);

  const handleCreateTestTitle = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    try {
      http
        .post(
          `https://learnconnectapi.azurewebsites.net/api/test/create-test?courseId=${courseId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log("TEst");
          setTestId(res.data.id);
          toast.success("Create Test Successfully!");
          setTestTitleForm(false);
          http
            .get(`/test/get-tests-by-course?courseId=${courseId}`)
            .then((response) => {
              setAllOffTest(response.data);
              // setAllQuestions(response.data[0].questions);
            });
        });
    } catch (err) {
      console.error(err);
    }
  };

  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const handleNewQuestionClick = () => {
    setShowQuestionForm(true);
  };

  const [questionId, setQuestionId] = useState<number>(0);

  const handleFormQuestionSubmit = (data: any) => {
    const formDataQ = new FormData();
    formDataQ.append("questionText", data.question);

    try {
      http
        .post(
          `https://learnconnectapi.azurewebsites.net/api/question/create-question?testId=${testId}`,
          formDataQ,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          http
            .get(`/test/get-tests-by-course?courseId=${courseId}`)
            .then((response) => {
              setAllOffTest(response.data);
              // setAllQuestions(response.data[0].questions)
            });

          setShowQuestionForm(false);
          toast.success("create question successfully!");
        });
    } catch (err) {
      console.error(err);
    }
  };

  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleSetIsChecked = (value: boolean) => {
    setIsChecked(value);
  };

  const handleNewAnswerClick = (data: any) => {
    setShowAnswerForm(true);
    setQuestionId(data);
  };

  const handleFormAnswerSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("answerText", data.answer);
    formData.append("isCorrect", isChecked.toString());

    try {
      http
        .post(
          `https://learnconnectapi.azurewebsites.net/api/answer/create-answer?questionId=${questionId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          http
            .get(`/test/get-tests-by-course?courseId=${courseId}`)
            .then((response) => {
              setAllOffTest(response.data);
              //   setAllQuestions(response.data[0].questions);
              setStep3Completed(true);
              setShowAnswerForm(false);
            });
          // http.get();
          form.resetFields();
          toast.success("Create Answer successfully!");
        });
    } catch (err) {
      toast.error("Create Answer Fail!");
    }
  };

  const handleCheckboxChange = (e) => {
    handleSetIsChecked(e.target.checked);
  };

  const [activeStep, setActiveStep] = useState(1);
  const [step1Completed, setStep1Completed] = useState(false);
  console.log("step", step1Completed);
  const [step3Completed, setStep3Completed] = useState(false);

  const [disableButton, setDisableButton] = useState(true);
  const [disableButton2, setDisableButton2] = useState(true);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const isStepActive = (step) => {
    if (!finishStep) {
      return step === activeStep;
    } else {
      return step === 0;
    }
  };
  const [finishStep, setFinishStep] = useState(false);
  const FinishForm = () => {
    setInforCourse(false);
    setLectureTab(false);
    setTestTab(false);
    setFinishStep(true);
  };

  const routerDetailCourse = () => {
    router.push(`/instructorcourses/${courseId}`);
  };

  const [selectedType, setSelectedType] = useState<number | null>(null);

  return (
    <>
      <>
        {!userData ? (
          <div className="text-center text-5xl mt-5">
            <Spin size="large" />
          </div>
        ) : (
          <div className={`${InstructorCourseStyle.content_wrapper}`}>
            <div className={`${InstructorCourseStyle.sidebar_wrapper}`}>
              <div className={`${InstructorCourseStyle.sidebar_list}`}>
                {menuItem.map((item, index) => {
                  return (
                    <Tooltip key={index} title={item.title}>
                      <Link
                        key={index}
                        href={item.href}
                        className={`${InstructorCourseStyle.sidebar_active} mt-5`}
                      >
                        <img src={item.image} alt="image"></img>
                      </Link>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
            <div className={`${InstructorCourseStyle.body_wrapper}`}>
              <div
                className={`${InstructorCourseStyle.course_tab} bg-[#e7f8ee]`}
              >
                <Breadcrumb className="text-start font-semibold text-4xl my-5 px-4">
                  <Breadcrumb.Item>
                    <button onClick={routerCourses}>Courses</button>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <span>New Course</span>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="flex flex-row gap-4 justify-evenly my-5">
                <div
                  className={`border-2 rounded-lg p-5 bg-gray-200 ${
                    isStepActive(1)
                      ? " shadow-lg transition-transform transform translate-y-[-16px]"
                      : ""
                  } ${
                    step1Completed && "bg-green-400 duration-300 transition"
                  }`}
                >
                  <div className="flex text-xl">Step 1:</div>
                  <div className="flex justify-center text-3xl">
                    Course Information
                  </div>
                </div>
                <div className="flex items-center">
                  <img src="/images/shape-17.png" />
                </div>
                <div
                  className={`border-2 rounded-lg p-5 bg-gray-200 ${
                    isStepActive(2)
                      ? " shadow-lg transition-transform transform duration-300 translate-y-[-16px]"
                      : ""
                  } ${
                    lectures.length >= 3
                      ? "bg-[#309255] duration-300 transition"
                      : ""
                  }`}
                >
                  <div className="flex text-xl">Step 2:</div>
                  <div className="flex justify-center text-3xl">
                    Lecture Information
                  </div>
                </div>
                <div className="flex items-center">
                  <img src="/images/shape-17.png" />
                </div>
                <div
                  className={`border-2 rounded-lg p-5 bg-gray-200 ${
                    isStepActive(3)
                      ? " shadow-lg transition-transform transform duration-300 translate-y-[-16px]"
                      : ""
                  } ${
                    step3Completed ? "bg-[#309255] duration-300 transition" : ""
                  }`}
                >
                  <div className="flex text-xl">Step 3:</div>
                  <div className="flex justify-center text-3xl">
                    Test Information
                  </div>
                </div>
              </div>
              <div className="">
                {!finishStep ? (
                  <div className="container border border-[#309255] my-3 rounded-lg mt-3">
                    {inforCourse === true && (
                      <>
                        {courseId !== 0 ? (
                          <Form
                            disabled
                            autoComplete="off"
                            form={form}
                            labelCol={{ span: 5 }}
                            labelAlign={"left"}
                            wrapperCol={{ span: 19 }}
                            layout="horizontal"
                            className="p-5"
                            style={{ width: "100%" }}
                          >
                            <div
                              style={{ display: "flex", marginBottom: "20px" }}
                              className="flex justify-center"
                            >
                              <Image
                                width="60%"
                                height={300}
                                src={course?.imageUrl}
                                className="overflow-hidden"
                              />
                            </div>
                            {/* <div
                            className="flex flex-col items-center pt-2 pb-2"
                            style={{ display: "flex" }}
                          >
                            <Upload
                              accept="image/png, image/jpeg"
                              onChange={handleChange}
                              action="https://learnconnectapi.azurewebsites.net/api/Upload/image"
                            >
                              <Button>Upload</Button>
                            </Upload>
                          </div> */}
                            <Form.Item
                              label={<div className="text-xl">Name</div>}
                            >
                              <Input value={course?.name} />
                            </Form.Item>
                            <Form.Item
                              label={
                                <div className="text-xl">Specialization</div>
                              }
                            >
                              <Input value={course?.specializationName} />
                            </Form.Item>
                            <Form.Item
                              label={
                                <div className="text-xl">Length (mins)</div>
                              }
                            >
                              <InputNumber
                                className="w-[290px]"
                                controls={false}
                                value={course?.contentLength}
                              />
                            </Form.Item>
                            <Form.Item
                              label={<div className="text-xl">Price (VND)</div>}
                            >
                              <InputNumber
                                style={{ width: 200 }}
                                controls={false}
                                value={course?.price}
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <div className="text-xl">Short Description</div>
                              }
                            >
                              <Input.TextArea
                                autoSize={{ minRows: 2 }}
                                value={course?.shortDescription}
                              />
                            </Form.Item>
                            <Form.Item
                              label={<div className="text-xl">Description</div>}
                            >
                              <Input.TextArea
                                autoSize={{ minRows: 4 }}
                                value={course?.description}
                              />
                            </Form.Item>
                          </Form>
                        ) : (
                          <Form
                            autoComplete="off"
                            form={form}
                            labelCol={{ span: 5 }}
                            labelAlign={"left"}
                            wrapperCol={{ span: 19 }}
                            layout="horizontal"
                            className="p-5"
                            style={{ width: "100%" }}
                            onFinish={handleSubmit}
                          >
                            <div
                              style={{ display: "flex" }}
                              className="flex justify-center"
                            >
                              <Image
                                width="60%"
                                height={300}
                                src={image}
                                className="overflow-hidden"
                              />
                            </div>
                            <div
                              className="flex flex-col items-center pt-2 pb-2"
                              style={{ display: "flex" }}
                            >
                              <Upload
                                accept="image/png, image/jpeg"
                                onChange={handleChange}
                                action="https://learnconnectapi.azurewebsites.net/api/Upload/image"
                              >
                                <Button>Upload</Button>
                              </Upload>
                            </div>
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: "Please input Name!",
                                },
                                {
                                  min: 6,
                                  max: 150,
                                  message:
                                    "Name must be between 6 and 150 characters",
                                },
                              ]}
                              label={<div className="text-xl">Name</div>}
                              name="name"
                            >
                              <Input placeholder="Name Course" />
                            </Form.Item>
                            <Form.Item
                              label={
                                <div className="text-xl">Specialization</div>
                              }
                              name="specialization"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select a Specialization!",
                                },
                              ]}
                            >
                              <Select
                                onChange={handleChangeCate}
                                placeholder="Select Specialization"
                              >
                                {listCategory.map((option) => {
                                  return (
                                    <Option
                                      key={option.specId}
                                      value={option.specId}
                                    >
                                      {option.specName}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: "Please estimate the time!",
                                },
                                {
                                  type: "number",
                                  min: 10,
                                  message: "At least 10 minutes",
                                },
                              ]}
                              label={
                                <div className="text-xl">Length (mins)</div>
                              }
                              name="length"
                            >
                              <InputNumber
                                placeholder="Input estimate the time!"
                                min={0}
                                className="w-[290px]"
                                controls={false}
                              />
                            </Form.Item>
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: "Please Input Price",
                                },
                              ]}
                              label={<div className="text-xl">Price (VND)</div>}
                              name="price"
                            >
                              <InputNumber
                                placeholder="Input Price!"
                                style={{ width: 200 }}
                                min={0}
                                controls={false}
                              />
                            </Form.Item>
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: "Please Type Short Description",
                                },
                              ]}
                              label={
                                <div className="text-xl">Short Description</div>
                              }
                              name="shortDes"
                            >
                              <Input.TextArea
                                // rows={2}
                                autoSize={{ minRows: 2 }}
                                placeholder="Input Some Short Description"
                              />
                            </Form.Item>
                            <Form.Item
                              label={<div className="text-xl">Description</div>}
                              name="description"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Input Short Description",
                                },
                              ]}
                            >
                              <Input.TextArea
                                // rows={4}
                                autoSize={{ minRows: 4 }}
                                placeholder="Input More Description"
                              />
                            </Form.Item>
                            <Space className="justify-end w-full">
                              <Form.Item className="mb-0">
                                <Space>
                                  <Button
                                    className="hover:bg-[#67b46a] border border-[#4caf50] bg-[#4caf50] text-white transition duration-300 px-2 py-1"
                                    htmlType="submit"
                                    style={{
                                      border: "2px solid #4caf50",
                                      color: "#fff",
                                    }}
                                  >
                                    Create
                                  </Button>
                                </Space>
                              </Form.Item>
                            </Space>
                          </Form>
                        )}

                        <div className="flex justify-center p-5">
                          <button
                            className="border-2 flex rounded-lg justify-center p-2 w-20 hover:bg-gray-200"
                            onClick={() => {
                              {
                                !disableButton && setInforCourse(false);
                                !disableButton && setLectureTab(true);
                                !disableButton && handleStepClick(2);
                              }
                              {
                                disableButton &&
                                  toast.warning(
                                    "Please Complete Course Information Form First"
                                  );
                              }
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </>
                    )}
                    {lectureTabs === true && (
                      <>
                        <div className="flex flex-col gap-2">
                          <div className="border-2 p-5 mt-5 rounded-xl flex flex-row gap-2 bg-gray-200">
                            <div className="w-8 h-8">
                              <img src="/menu-icon/info.png" />
                            </div>
                            <div className="flex flex-col text-lg">
                              <div>
                                - The course must have at least 3 lectures, each
                                lecture must contain video.
                              </div>
                              <div>- Maximum size for each video is 200MB.</div>
                            </div>
                          </div>
                          <div className="">
                            <div className="flex flex-row p-5">
                              <Form
                                autoComplete="off"
                                form={form}
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 18 }}
                                layout="horizontal"
                                labelAlign={"left"}
                                className="mt-5 text-2xl"
                                style={{ width: "60%" }}
                                onFinish={(e) => {
                                  handleLecture(e);
                                  handleSuccessModeration();
                                }}
                              >
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input Name!",
                                    },
                                  ]}
                                  label={<div className="text-xl">Title</div>}
                                  name="title"
                                >
                                  <Input placeholder="Input Title Lecture" />
                                </Form.Item>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input Name!",
                                    },
                                  ]}
                                  label={<div className="text-xl">Content</div>}
                                  name="content"
                                >
                                  <Input.TextArea
                                    // rows={4}
                                    placeholder="Input More Details Content"
                                    autoSize={{ minRows: 4 }}
                                  />
                                </Form.Item>
                                {/* <Form.Item
                                  label={<div className="text-xl">Type</div>}
                                >
                                  <Select
                                    onChange={handleChangeType}
                                    defaultValue={type}
                                  >
                                    {Type.map((option) => {
                                      return (
                                        <Option
                                          key={option.id}
                                          value={option.id}
                                        >
                                          {option.title}
                                        </Option>
                                      );
                                    })}
                                  </Select>
                                </Form.Item> */}
                                <Form.Item
                                  label={<div className="text-xl">Type</div>}
                                  name="type"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select a Type!",
                                    },
                                  ]}
                                >
                                  <Select
                                    onChange={(value) => setSelectedType(value)}
                                    placeholder="Select Type"
                                  >
                                    {Type.map((option) => {
                                      return (
                                        <Option
                                          key={option.id}
                                          value={option.id}
                                        >
                                          {option.title}
                                        </Option>
                                      );
                                    })}
                                  </Select>
                                </Form.Item>
                                {type === 1 ? (
                                  <div>
                                    <div
                                      style={{ display: "flex" }}
                                      className="flex justify-center"
                                    >
                                      {source && (
                                        <video
                                          width="90%"
                                          height={300}
                                          src={source}
                                          controls
                                        />
                                      )}
                                    </div>
                                    <div
                                      className="flex justify-center pt-2 pb-2"
                                      style={{ display: "flex" }}
                                    >
                                      <UploadFirebase
                                        fileName={`Course${courseId}_Lecture${
                                          lectures.length + 1
                                        }_${Math.floor(
                                          new Date().getTime() -
                                            new Date(2020, 0, 1).getSeconds()
                                        )}`}
                                        returnUrl={setSource}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  // </Form.Item>
                                  <Form.Item label="Document">
                                    <div
                                      className="flex justify-center pt-2 pb-2"
                                      style={{ display: "flex" }}
                                    >
                                      <Upload
                                        // accept="image/png, image/jpeg"
                                        // ref={inputRef}
                                        // accept=".mov,.mp4"
                                        accept=".pdf"
                                        // onChange={handleFileChange}
                                        // beforeUpload={beforeUpload}
                                        // headers={{ Authorization: authorization }}
                                        action="https://learnconnectapi.azurewebsites.net/api/Upload/video"
                                      >
                                        <Button>Upload</Button>
                                      </Upload>
                                    </div>
                                  </Form.Item>
                                )}
                                <Space className="justify-end w-full pr-[60px]">
                                  <Form.Item className="mb-0">
                                    <Space>
                                      <Button
                                        className="hover:bg-[#67b46a] border border-[#4caf50] bg-[#4caf50] text-white transition duration-300 px-2 py-1 flex items-center"
                                        htmlType="submit"
                                        style={{
                                          // backgroundColor: "#4caf50",
                                          // borderColor: "#4caf50",
                                          border: "2px solid #4caf50",
                                          color: "#fff",
                                        }}
                                      >
                                        <PlusOutlined /> Add Lecture
                                      </Button>
                                    </Space>
                                  </Form.Item>
                                </Space>
                              </Form>
                              <Table
                                className="flex-1"
                                dataSource={lectures}
                                columns={columns}
                                onRow={(record, rowIndex) => {
                                  return {
                                    onClick: () => handleRowClick(record), // Xử lý sự kiện click
                                  };
                                }}
                              />
                            </div>
                            <div className="flex justify-center p-2 gap-5">
                              <button
                                className="border-2 rounded-lg flex justify-center p-2 w-20 hover:bg-gray-200"
                                onClick={() => {
                                  setInforCourse(true);
                                  setLectureTab(false);
                                  handleStepClick(1);
                                }}
                              >
                                Previous
                              </button>
                              <button
                                className="border-2 flex rounded-lg justify-center p-2 w-20 hover:bg-gray-200"
                                onClick={() => {
                                  // setTestTab(true);
                                  // setLectureTab(false);
                                  // handleStepClick(3);
                                  {
                                    lectures.length >= 3 && setTestTab(true);
                                    lectures.length >= 3 &&
                                      setLectureTab(false);
                                    lectures.length >= 3 && handleStepClick(3);
                                  }
                                  {
                                    lectures.length < 3 &&
                                      toast.warning("Not enough Lectures!");
                                  }
                                }}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {testTabs === true && (
                      <>
                        <div>
                          <div className="border-2 p-5 mt-5 rounded-xl flex flex-row gap-2 bg-gray-200">
                            <div className="w-8 h-8">
                              <img src="/menu-icon/info.png" />
                            </div>
                            <div className="flex flex-col text-lg">
                              <div>
                                - Test must have at least 1 question, and a
                                question must have more than 1 answer.
                              </div>
                            </div>
                          </div>
                          <div>
                            {allOfTest.length === 0 ? (
                              <>
                                {titleFormTest === true && (
                                  <Form
                                    autoComplete="off"
                                    form={form}
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 18 }}
                                    layout="horizontal"
                                    labelAlign="left"
                                    className="mt-5"
                                    style={{ width: "100%" }}
                                    onFinish={handleCreateTestTitle}
                                  >
                                    <Form.Item
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please input Title ! ",
                                        },
                                        {
                                          max: 500,
                                          message:
                                            "Maximum 500 characters allowed!",
                                        },
                                      ]}
                                      label={
                                        <div className="text-xl">Title</div>
                                      }
                                      name="title"
                                    >
                                      <Input placeholder="Put title of Test here !" />
                                    </Form.Item>

                                    <Form.Item
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please input Description !",
                                        },
                                        {
                                          max: 500,
                                          message:
                                            "Maximum 500 characters allowed !",
                                        },
                                      ]}
                                      label={
                                        <div className="text-xl">
                                          Description
                                        </div>
                                      }
                                      name="description"
                                    >
                                      <Input.TextArea
                                        autoSize={{ minRows: 2 }}
                                        placeholder="Input some description here !"
                                      />
                                    </Form.Item>

                                    <Space className="justify-end w-full">
                                      <Form.Item className="mb-0">
                                        <Space>
                                          <Button
                                            className="hover:bg-[#67b46a] border border-[#4caf50] bg-[#4caf50] text-white transition duration-300 px-2 py-1 flex items-center"
                                            htmlType="submit"
                                            style={{
                                              border: "2px solid #4caf50",
                                              color: "#fff",
                                            }}
                                          >
                                            <PlusOutlined /> Add Test
                                          </Button>
                                        </Space>
                                      </Form.Item>
                                    </Space>
                                  </Form>
                                )}
                              </>
                            ) : (
                              <>
                                <>
                                  {allOfTest.map((item) => (
                                    <div
                                      key={item.test.id}
                                      className="mb-4 mt-6"
                                    >
                                      <div className="flex flex-col">
                                        <h3 className="text-xl font-semibold mt-2 text-center ">
                                          <div className=" flex flex-col items-center justify-center mb-2">
                                            <div className="flex justify-center items-center gap-2 ">
                                              <div className="text-3xl flex flex-col gap-2">
                                                <div>
                                                  Title: {item.test.title}{" "}
                                                </div>
                                              </div>
                                            </div>

                                            <br />
                                            <div>
                                              Description:{" "}
                                              {item.test.description}
                                            </div>
                                          </div>
                                        </h3>
                                      </div>
                                      {item.questions.map((q, index) => (
                                        <div
                                          key={q.question.id}
                                          className="mb-2 my-8 p-4 border-2 rounded-lg border-gray-200 shadow-[10px_10px_20px_10px_rgba(0,0,0,0.15)] "
                                        >
                                          <div className="mb-1 font-medium text-[18px] flex flex-row justify-between">
                                            <div className="flex flex-row gap-2">
                                              {index + 1}.{" "}
                                              <div className="w-full">
                                                {q.question.questionText}
                                              </div>
                                            </div>
                                            <div className="gap-2 flex items-center">
                                              <Button
                                                onClick={() => {
                                                  handleNewAnswerClick(
                                                    q.question.id
                                                  );
                                                }}
                                                className="flex flex-row items-center"
                                              >
                                                {/* <div></div> */}
                                                <PlusOutlined /> Add Answer
                                              </Button>
                                            </div>
                                          </div>
                                          {showAnswerForm &&
                                            questionId === q.question.id && (
                                              <Form
                                                onFinish={
                                                  handleFormAnswerSubmit
                                                }
                                                style={{
                                                  width: "80%",
                                                  alignItems: "start",
                                                }}
                                              >
                                                <div className="flex flex-col justify-end">
                                                  <Form.Item
                                                    name="answer"
                                                    label="Answer"
                                                    rules={[
                                                      {
                                                        required: true,
                                                        message:
                                                          "Please input your question!",
                                                      },
                                                    ]}
                                                  >
                                                    <Input
                                                      className={` border-2 p-2 text-left rounded-lg ${
                                                        isChecked
                                                          ? "border-green-500 bg-green-100"
                                                          : ""
                                                      }`}
                                                    />
                                                  </Form.Item>
                                                  <Checkbox
                                                    className="flex items-end justify-end"
                                                    checked={isChecked}
                                                    onChange={
                                                      handleCheckboxChange
                                                    }
                                                  >
                                                    Correct Answer
                                                  </Checkbox>
                                                </div>
                                                <div className="flex justify-end gap-2 mt-2">
                                                  <Button
                                                    onClick={handleCancel}
                                                  >
                                                    Cancel
                                                  </Button>
                                                  <Button
                                                    style={{
                                                      backgroundColor:
                                                        "#4caf50",
                                                      color: "#fff",
                                                    }}
                                                    type="primary"
                                                    htmlType="submit"
                                                  >
                                                    Submit
                                                  </Button>
                                                </div>
                                              </Form>
                                            )}
                                          <div className="px-4 grid grid-cols-2 gap-4">
                                            {q.answers.map(
                                              (answer, ansIndex) => (
                                                <>
                                                  <div className="flex gap-2 justify-center align-middle items-center mt-3">
                                                    <div
                                                      className={` border-2 p-2 flex-auto text-left rounded-lg ${
                                                        answer.isCorrect ===
                                                        true
                                                          ? "border-green-500 bg-green-100"
                                                          : ""
                                                      }`}
                                                    >
                                                      {answer.answerText}
                                                    </div>
                                                  </div>
                                                </>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                      <>
                                        <div className="flex justify-between mb-5 mt-10">
                                          <Button
                                            onClick={handleNewQuestionClick}
                                          >
                                            Add Question
                                          </Button>
                                        </div>

                                        <div className=" flex justify-center">
                                          {showQuestionForm && (
                                            <Form
                                              onFinish={
                                                handleFormQuestionSubmit
                                              }
                                              style={{
                                                width: "80%",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Form.Item
                                                name="question"
                                                label="Question"
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      "Please input your question!",
                                                  },
                                                ]}
                                              >
                                                <Input />
                                              </Form.Item>
                                              <div className="flex gap-5 justify-end">
                                                {/* Thêm các trường dữ liệu khác cần thiết vào đây */}
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
                                                    // backgroundColor: "#4caf50",
                                                    // borderColor: "#4caf50",
                                                    border: "2px solid #4caf50",
                                                    color: "#fff",
                                                  }}
                                                >
                                                  Submit
                                                </Button>
                                              </div>
                                            </Form>
                                          )}
                                        </div>
                                      </>
                                    </div>
                                  ))}
                                </>
                              </>
                            )}
                            <div className="flex justify-center p-2 gap-5">
                              <button
                                className="border-2 flex rounded-lg justify-center p-2 w-20 hover:bg-gray-200"
                                onClick={() => {
                                  setTestTab(false);
                                  setLectureTab(true);
                                  handleStepClick(2);
                                }}
                              >
                                Previous
                              </button>
                              <button
                                className="border-2 flex rounded-lg justify-center p-2 w-20 hover:bg-gray-200"
                                onClick={() => {
                                  {
                                    console.log(
                                      "huh",
                                      lectures.length,
                                      allOfTest.length
                                    );
                                    lectures.length < 3 ||
                                    allOfTest.length === 0
                                      ? toast.warning(
                                          "Questions or lectures does not enough"
                                        )
                                      : FinishForm();
                                  }
                                }}
                              >
                                Finish
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="text-center flex justify-center">
                      <div className="w-[500px]">
                        <AiOutlineCheckCircle className="text-6xl mx-auto text-[#309255]" />
                        <h1 className="text-3xl font-bold mb-4">
                          Create Course successfully !
                        </h1>
                        <div className="text-center">
                          <p className="text-lg text-gray-600">
                            You have successfully created{" "}
                            <span className="text-[#309255] font-bold">
                              {course?.name}
                            </span>{" "}
                            course. Please wait for the review results from our
                            system. Thank you for your contribution.
                            Additionally, you can update the course content
                            later by clicking on the course.
                          </p>
                        </div>
                        <div className="mt-5">
                          <button
                            className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4"
                            onClick={routerDetailCourse}
                          >
                            Go to Course
                          </button>
                          <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={routerCourses}
                          >
                            Back to Home
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </>
      <Modal
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="40%"
        // className="bg-gray-200"
        footer={false}
      >
        <div className="flex flex-col gap-5">
          <p className="text-2xl">Title: {lecture?.title}</p>
          <video width="full" height={400} src={lecture?.contentUrl} controls />
          <p className="text-xl">Description: {lecture?.content}</p>
        </div>
      </Modal>
    </>
  );
}
