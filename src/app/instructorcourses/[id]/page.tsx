"use client";
import React, { useEffect, useState } from "react";
import InstructorCourseStyle from ".././styles/style.module.scss";
import Link from "next/link";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Empty,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import UploadFirebase from "@/components/uploadfirebase/uploadfirebase";
import { UserAuth } from "@/app/context/AuthContext";
import { Lecture } from "@/app/my-course/[id]/page";
import axios from "axios";
import { http } from "@/api/http";
import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Rating,
} from "@mui/material";
import { toast } from "sonner";
import { Course } from "@/components/courses/courses";
// import { Test } from "@/app/my-course/test/[id]/page";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Test } from "@/components/test/test";
// import { Rating } from "@/app/course-detail/[id]/page";

export type TestTitle = {
  test: any;
  id: number;
  title: string;
  description: string;
  totalQuestion: number;
  createDate: string;
  status: number;
  courseId: number;
};

export type ABC = {
  id: number;
  status: boolean;
};

export type Rating = {
  userRatingInfo: any;
  ratingCourseInfo: any;
  id: number;
  rating1: number;
  comment: string;
  timeStamp: string;
  status: number;
  userId: number;
  courseId: number;
  mentorId: number;
};

const Dashboard = ({ params }: any) => {
  const idCourse = params.id;
  // console.log("param", params);
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
  const handleCreateCancel = () => {
    setIsModal(false);
  };

  const handleCancel = () => {
    setIsModal(false);
    form.resetFields();
    setTestTitleModal(false);
    setShowQuestionForm(false);
    setShowAnswerForm(false);
    handleSetIsChecked(false);
    setDeleteTestModal(false);
    setDeleteQuestionModal(false);
    setDeleteAnswerModal(false);
    setSource("");
    setUpdateTestModal(false);
  };

  //update
  const [updateVisible, setUpdateVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [oneLecture, setOneLecture] = useState<Lecture>();
  const [updateType, setUpdateType] = useState(oneLecture?.contentType);
  const [updateSrc, setUpdateSrc] = useState<string>("");

  const handleUpdateModal = (record: any) => {
    setSelectedItem(record);
    setOneLecture(record);
    setUpdateVisible(true);
    setUpdateType(record.contentType);
    setUpdateSrc(record.contentUrl);
  };

  const handleUpdateType = (data: number) => {
    setUpdateType(data);
    // setType(data);
  };

  const handleDeleteModal = (record: any) => {
    // console.log("record", record);
    setSelectedItem(record);
    setOneLecture(record);
    setDeleteVisible(true);
  };

  //Get This Course
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    http
      .get(
        `https://learnconnectapitest.azurewebsites.net/api/course/get-course-by-mentor/mentorUserId/${id}/course/${idCourse}`
      )
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [id]);

  // const [updateType, setUpdateType] = useState(oneLecture?.contentType);

  const handleUpdate = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title || oneLecture?.title);
    formData.append("content", data.content || oneLecture?.content);
    formData.append("contentType", type.toString());
    formData.append("contentUrl", updateSrc);
    // if (formDataSource !== undefined) {
    //   formData.append("contentUrl", formDataSource);
    // }

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
          toast.success("Update Lecture Successfully");
          http.get(`/lecture/by-course/${idCourse}`).then((response) => {
            setLectures(response.data);
            setLoading(false);
            // form.resetFields();
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
    setSource("");
    setUpdateVisible(false);
    form.resetFields();
  };

  const handleDeleteCancel = () => {
    setDeleteVisible(false);
  };

  const [isModerating, setIsModerating] = useState<boolean>();

  const handleSuccessModeration = () => {
    setTimeout(() => {
      // toast.info("Video is Moderating By")
      http
        .get(
          `https://learnconnectapitest.azurewebsites.net/api/lecture/by-course/${idCourse}`
        )
        .then((response) => {
          setLectures(response.data);
          setLoading(false);
          setIsModerating(true);
          form.resetFields();
          handleCreateCancel();
        });
    }, 3000);
  };

  useEffect(() => {
    if (isModerating === false) {
      toast.success("Moderation Video Complete!");
      console.log("moder", isModerating);
    } else if (isModerating === true) {
      toast.info("Create Lecture Successfully! Video is moderating ... ");
      // console.log("moder", isModerating);
    }
  }, [isModerating]);

  const handleSubmit = async (data: any) => {
    if (!source) {
      toast.error("Please Input Your Video Content!");
    } else {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("contentType", type.toString());
      formData.append("contentUrl", source);
      // if (formDataSource !== undefined) {
      //   formData.append("contentUrl", formDataSource);
      // }

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
            // form.resetFields();
            // handleCreateCancel();
            // toast.success("Create Lecture Successfully");
            // http
            //   .get(
            //     `https://learnconnectapitest.azurewebsites.net/api/lecture/by-course/${idCourse}`
            //   )
            //   .then((response) => {
            //     setLectures(response.data);
            //     setLoading(false);
            //   });
            // setLoading(false);
            setIsModerating(false);
          });
      } catch (err) {
        setTimeout(() => {
          toast.error("Create Lecture fail");
        });
      }
    }
  };

  //get list lecture
  const [lectures, setLectures] = useState<Lecture[]>([]);
  // console.log("lecture", lectures);
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
  const [type, setType] = useState<number>(1);
  const { Option } = Select;
  // console.log("type", type);

  const Type = [
    { id: 1, title: "Video" },
    { id: 0, title: "Document" },
  ];

  const handleChangeType = (value: number) => {
    setType(value);
  };

  //video upload
  // const inputRef = React.useRef();
  const [formDataSource, setFormDataSource] = useState();
  const [source, setSource] = useState<string>("");

  const handleFileChange = (info: any) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

      setFormDataSource(info.file.originFileObj);
      getBase64(info.file.originFileObj, (url) => {
        setSource(url);
        setUpdateSrc(url);
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

  // const beforeUpload = (file: any) => {
  //   const isJpgOrPng =
  //     file.type === "image/jpeg" ||
  //     file.type === "image/png" ||
  //     file.type === ".mp4";
  //   if (!isJpgOrPng) {
  //     toast.error("You can only upload JPG/PNG/Mp4 file!");
  //   }
  //   const isLt20M = file.size / 1024 / 1024 < 20;
  //   if (!isLt20M) {
  //     toast.error("Image must smaller than 20MB!");
  //   }
  //   return isJpgOrPng && isLt20M;
  // };
  // const handleChoose = (event) => {
  //   inputRef.current.click();
  // };

  //List Of Question
  // const [infoTest, setInfoTest] = useState<Test>();
  // console.log("test", infoTest);
  const [listQuestion, setListQuestion] = useState<Test[]>([]);
  const [allQuestions, setAllQuestions] = useState<Test[]>([]);
  // console.log("all", allQuestions);
  const [idTest, setIdTest] = useState<Test>();
  // console.log("list", idTest);

  // console.log("Questions", listQuestion);
  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(`/test/get-tests-by-course?courseId=${idCourse}`)
      .then((response) => {
        // setInfoTest(response.data.questions);
        setListQuestion(response.data);
        setAllQuestions(response.data[0].questions);
        setIdTest(response.data[0].test.id);
        // console.log("vải ò", response.data);
        listQuestion.forEach((item) => {
          const totalQuestion = item.test.totalQuestion;
          // console.log("Total Questions:", totalQuestion);
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

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
      title: <div className="text-center">Actions</div>,
      key: "actions",
      render: (text, record) => (
        <Space className="flex justify-center">
          <Button onClick={() => handleUpdateModal(record)}>Update</Button>
          <Button danger onClick={() => handleDeleteModal(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: "Note",
      dataIndex: "rejectReason",
      key: "rejectReason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "green"; // Màu xanh cho trạng thái Active
      case 1:
        return "gray"; // Màu đỏ cho trạng thái Pending
      case 2:
        return "volcano"; // Màu đỏ cam cho trạng thái Reject
      case 3:
        return "red"; // Màu đỏ hồng cho trạng thái Banned
      default:
        return "defaultColor"; // Màu mặc định nếu status không phù hợp với bất kỳ trạng thái nào
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Active";
      case 1:
        return "Pending";
      case 2:
        return "Reject";
      case 3:
        return "Banned";
      default:
        return "Unknown Status";
    }
  };

  const [listRating, setListRating] = useState<Rating[]>([]);

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng
    http
      .get(`/rating/listRatingOfCourse/${idCourse}`)
      .then((response) => {
        // setInfoTest(response.data.questions);
        setListRating(response.data);
        // console.log("rating", response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [idCourse]);

  const [test, setTest] = useState<TestTitle>();
  console.log("test", test);

  useEffect(() => {
    http
      .get(`/test/get-tests-by-course?courseId=${idCourse}`)
      .then((response) => {
        setTest(response.data[0].test);
      });
  }, []);

  const [testTitleModal, setTestTitleModal] = useState(false);

  const showTestTitleModal = () => {
    setTestTitleModal(true);
  };

  const handleCreateTestTitle = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    try {
      http
        .post(
          `https://learnconnectapitest.azurewebsites.net/api/test/create-test?courseId=${idCourse}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          toast.success("Create Test Successfully!");
          setTestTitleModal(false);
          http
            .get(`/test/get-tests-by-course?courseId=${idCourse}`)
            .then((response) => {
              setListQuestion(response.data);
              setAllQuestions(response.data[0].questions);
              setIdTest(response.data[0].test.id);
            });
        });
    } catch (err) {
      console.error(err);
    }
  };

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
      title: "Requests",
      href: "/order-history",
    },
  ];

  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const handleNewQuestionClick = () => {
    setShowQuestionForm(true);
  };

  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [mano, setmano] = useState<number>(0);
  // console.log("mano", mano);

  const handleNewAnswerClick = (data: any) => {
    setShowAnswerForm(true);
    setmano(data);
  };
  const [questionId, setQuestionId] = useState<number>(0);
  // console.log("question", questionId);
  // useEffect(() => {
  //   if (showAnswerForm && questionId !== 0) {
  //     http.get(
  //       `https://learnconnectapitest.azurewebsites.net/api/question/${questionId}`
  //     );
  //   }
  // }, [showAnswerForm, questionId]);
  const [showUpdateQuestion, setShowUpdateQuestion] = useState(false);
  const handleUpdateQuestionClick = (data: any) => {
    setShowUpdateQuestion(true);
    setmano(data);
  };

  const [showUpdateAnswer, setShowUpdateAnswer] = useState(false);
  const [AnswerId, setAnswerId] = useState<number>(0);
  // console.log("answer", AnswerId);

  const handleUpdateAnswerClick = (data: any) => {
    setShowUpdateAnswer(true);
    setmano(data);
  };

  const handleFormQuestionSubmit = (data: any) => {
    // Xử lý dữ liệu khi form được gửi
    const formDataQ = new FormData();
    formDataQ.append("questionText", data.question);
    const formDataA = new FormData();
    const formDataB = new FormData();
    const formDataC = new FormData();
    const formDataD = new FormData();

    try {
      http
        .post(
          `https://learnconnectapitest.azurewebsites.net/api/question/create-question?testId=${idTest}`,
          formDataQ,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          http
            .get(`/test/get-tests-by-course?courseId=${idCourse}`)
            .then((response) => {
              setListQuestion(response.data);
              setAllQuestions(response.data[0].questions);
              setIdTest(response.data[0].test.id);
            });
          // http.get();
          setShowQuestionForm(false);
          toast.success("create question successfully!");
        });
    } catch (err) {
      console.error(err);
    }
    // console.log("Received values:", values);
    // Đóng form sau khi xử lý
  };

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleSetIsChecked = (value: boolean) => {
    // console.log("CALL: ", value);
    setIsChecked(value);
  };
  // console.log("check", isChecked);

  const handleFormAnswerSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("answerText", data.answer);
    formData.append("isCorrect", isChecked.toString());
    // console.log("nani2", isChecked.toString());

    try {
      http
        .post(
          `https://learnconnectapitest.azurewebsites.net/api/answer/create-answer?questionId=${mano}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          http
            .get(`/test/get-tests-by-course?courseId=${idCourse}`)
            .then((response) => {
              setListQuestion(response.data);
              setAllQuestions(response.data[0].questions);
              setIdTest(response.data[0].test.id);
              setShowAnswerForm(false);
            });
          // http.get();
          form.resetFields();
          handleSetIsChecked(false);
          toast.success("Create Answer successfully!");
        });
    } catch (err) {
      toast.error("Create Answer Fail!");
    }
  };

  const handleCheckboxChange = (e) => {
    handleSetIsChecked(e.target.checked);
  };

  const [updateQuestion, setUpdateQuestion] = useState<string>("");
  const [hasChanged, setHasChanged] = useState(false);

  const handleInputChange = (event) => {
    // Xử lý sự kiện khi có sự thay đổi trong ô input
    setUpdateQuestion(event.target.value);
    // console.log("tehje", event.target.value);
    setHasChanged(true);
  };

  const handleAnswerChange = (event) => {
    setUpdateAnswer(event.target.value);

    // console.log("tehje", event.target.value);
    setHasChanged2(true);
  };

  const [updateAnswer, setUpdateAnswer] = useState<string>("");
  const [hasChanged2, setHasChanged2] = useState(false);

  const handleSaveData = (data: any) => {
    // console.log("tui nè má", data);
    // console.log("Data saved successfully:", updateQuestion);
    const formData = new FormData();
    formData.append("questionText", updateQuestion);
    try {
      http
        .put(
          `https://learnconnectapitest.azurewebsites.net/api/question/${data}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          http
            .get(`/test/get-tests-by-course?courseId=${idCourse}`)
            .then((response) => {
              setListQuestion(response.data);
              setAllQuestions(response.data[0].questions);
              setIdTest(response.data[0].test.id);
              // setShowAnswerForm(false);
              setQuestionId(0);
              setHasChanged(false);
              Modal.destroyAll();
            });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveData2 = (data: any, isCheckedCustom: boolean) => {
    // console.log("tui nè má", data);
    // setAnswerId(0);
    // console.log("nani", isCheckedCustom);
    const formData = new FormData();
    formData.append("answerText", updateAnswer);
    formData.append("isCorrect", isCheckedCustom.toString());
    try {
      http
        .put(
          `https://learnconnectapitest.azurewebsites.net/api/answer/${data}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          http
            .get(`/test/get-tests-by-course?courseId=${idCourse}`)
            .then((response) => {
              setListQuestion(response.data);
              setAllQuestions(response.data[0].questions);
              setIdTest(response.data[0].test.id);
              // setShowAnswerForm(false);
              setQuestionId(0);
              setAnswerId(0);
              setHasChanged2(false);
              Modal.destroyAll();
              // handleSetIsChecked(false);
            });
        });
    } catch (err) {
      toast.error("Update Fail !");
    }
    // setHasChanged(false);
    // Modal.destroyAll();
  };

  const handleBlur = (data: any) => {
    // console.log("tao nè", data);
    if (hasChanged) {
      Modal.confirm({
        title: "Confirm",
        content: "Do you want to save these changes?",
        okButtonProps: {
          style: {
            background: "#4caf50", // Màu nền của nút "OK"
            borderColor: "#4caf50", // Màu viền của nút "OK"
            color: "#fff", // Màu chữ của nút "OK"
          },
        },
        onOk: () => {
          handleSaveData(data);
        },
        onCancel: () => {
          setHasChanged(false);
          setQuestionId(0);
          setUpdateQuestion("");
        },
      });
    }
    setShowUpdateQuestion(false);
  };
  useEffect(() => {
    console.log("check", isChecked);
  }, [isChecked]);

  const handleBlur2 = (data: any) => {
    // console.log("DÈAULT: ", isChecked);
    let isCheckVal = isChecked;
    if (hasChanged2) {
      Modal.confirm({
        title: "Do you want to save these changes?",
        content: (
          <div>
            <p>Do you want to change option for this answer?</p>
            <Checkbox
              defaultChecked={isChecked}
              onChange={(e) => {
                handleCheckboxChange(e);
                isCheckVal = e.target.checked;
              }}
            >
              Correct
            </Checkbox>
          </div>
        ),
        okButtonProps: {
          style: {
            background: "#4caf50", // Màu nền của nút "OK"
            borderColor: "#4caf50", // Màu viền của nút "OK"
            color: "#fff", // Màu chữ của nút "OK"
          },
        },
        onOk: (...args: any[]) => {
          // console.log("SEND: ", isCheckVal);
          handleSaveData2(data, isCheckVal);
        },
        onCancel: () => {
          setHasChanged2(false);
          setQuestionId(0);
          setAnswerId(0);
          // setUpdateQuestion("");
          // handleSetIsChecked(false);
        },
      });
    }
    setShowUpdateAnswer(false);
  };

  const [deleteAnswerModal, setDeleteAnswerModal] = useState(false);
  const [aId, setAId] = useState<number>(0);

  const showDeleteAnswerModal = (data: any) => {
    setDeleteAnswerModal(true);
    setAId(data);
  };

  const handleDeleteAnswer = (data: any) => {
    // console.log("hehe", data);
    try {
      http
        .delete(
          `https://learnconnectapitest.azurewebsites.net/api/answer/${aId}`
        )
        .then(() => {
          toast.success("Delete Successfully!!");
          setDeleteAnswerModal(false);
          http
            .get(`/test/get-tests-by-course?courseId=${idCourse}`)
            .then((response) => {
              setListQuestion(response.data);
              setAllQuestions(response.data[0].questions);
              setIdTest(response.data[0].test.id);
              // setShowAnswerForm(false);
              // handleSetIsChecked(false);
            });
        });
    } catch (err) {
      toast.error("Delete Fail !");
    }
  };

  const [deleteQuestionModal, setDeleteQuestionModal] = useState(false);
  const [qId, setQId] = useState<number>(0);

  const showDeleteQuestionModal = (data: any) => {
    setDeleteQuestionModal(true);
    setQId(data);
  };

  const handleDeleteQuestion = (data: any) => {
    try {
      http
        .delete(
          `https://learnconnectapitest.azurewebsites.net/api/question/${qId}`
        )
        .then(() => {
          toast.success("Delete Successfully!!");
          setDeleteQuestionModal(false);
          http
            .get(`/test/get-tests-by-course?courseId=${idCourse}`)
            .then((response) => {
              setListQuestion(response.data);
              setAllQuestions(response.data[0].questions);
              setIdTest(response.data[0].test.id);
              // setShowAnswerForm(false);
              // handleSetIsChecked(false);
            });
        });
    } catch (err) {
      toast.error("Delete Fail !");
    }
  };

  const [deleteTestModal, setDeleteTestModal] = useState(false);
  const [testId, setTestId] = useState<number>(0);

  const showDeleteTestModal = (data: any) => {
    setDeleteTestModal(true);
    setTestId(data);
  };

  const handleDeleteTest = (data: any) => {
    try {
      http
        .delete(
          `https://learnconnectapitest.azurewebsites.net/api/test/${testId}`
        )
        .then(() => {
          toast.success("Delete Successfully !");
          setDeleteTestModal(false);
          http
            .get(`/test/get-tests-by-course?courseId=${idCourse}`)
            .then((response) => {
              setListQuestion(response.data);
              // setAllQuestions(response.data[0].questions);
              // setIdTest(response.data[0].test.id);
              // setShowAnswerForm(false);
              // handleSetIsChecked(false);
            });
        });
    } catch (err) {
      toast.error("Delete Fail !");
    }
  };

  const handleRowClick = (record) => {
    // Xử lý khi click vào một hàng (item)
    console.log("Clicked item:", record);
    // Thực hiện các hành động khác cần thiết
  };

  const handleDeleteLecture = (data: any) => {
    // console.log("má m", data.id);
    try {
      http
        .delete(
          `https://learnconnectapitest.azurewebsites.net/api/lecture/${data.id}`
        )
        .then(() => {
          handleDeleteCancel();
          toast.success("Delete Lecture Successfully !");
          http
            .get(
              `https://learnconnectapitest.azurewebsites.net/api/lecture/by-course/${idCourse}`
            )
            .then((response) => {
              setLectures(response.data);
              setLoading(false);
            });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [updateTestModal, setUpdateTestModal] = useState(false);

  const handleUpdateTestModal = (data: any) => {
    setUpdateTestModal(true);
    setTestId(data);
  };

  const handleUpdateTestClick = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title || test?.title);
    formData.append("description", data.description || test?.description);
    console.log("formdata", data.title, data.description);

    try {
      http
        .put(
          `https://learnconnectapitest.azurewebsites.net/api/test/${testId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          http
            .get(`/test/get-tests-by-course?courseId=${idCourse}`)
            .then((response) => {
              setListQuestion(response.data);
              setAllQuestions(response.data[0].questions);
              setIdTest(response.data[0].test.id);
              toast.success("Update Test Successfully");
              setUpdateTestModal(false);
            });
        });
    } catch (e) {
      console.error(e);
    }
  };

  const router = useRouter();

  const breadCrumbHome = () => {
    router.push("/instructorcourses");
  };

  return (
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
            <div className={`${InstructorCourseStyle.course_tab} bg-[#e7f8ee]`}>
              <Breadcrumb className="text-start font-semibold text-4xl my-5 px-4">
                <Breadcrumb.Item>
                  <button onClick={breadCrumbHome}>Courses</button>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span>{course?.name}</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className={`${InstructorCourseStyle.featured}`}>
              <div className="p-5 flex gap-5">
                <div className="flex-1">
                  <img
                    className="h-[300px] w-[400px] rounded-lg"
                    src={`${course?.imageUrl}`}
                    alt=""
                  />
                </div>
                <div className="flex-auto w-[36rem]">
                  <p
                    className={`${InstructorCourseStyle.featured_bottom_title}`}
                  >
                    <div className="flex flex-row justify-between items-center">
                      <div>{course?.name}</div>{" "}
                      <div className="flex justify-center items-center text-2xl">
                        <Tag
                          className="text-lg"
                          color={getStatusColor(course?.status)}
                        >
                          {getStatusText(course?.status)}
                        </Tag>
                      </div>
                    </div>
                  </p>
                  <p
                    className={`${InstructorCourseStyle.featured_bottom_cate}`}
                  >
                    {course?.specializationName}{" "}
                  </p>
                  <div className="flex flex-row justify-between">
                    <div>
                      <p
                        className={`${InstructorCourseStyle.featured_bottom_amount}`}
                      >
                        Price:
                        {course?.price === 0 ? (
                          <> Free</>
                        ) : (
                          <> {course?.price} VND</>
                        )}
                      </p>
                      <p
                        className={`${InstructorCourseStyle.featured_bottom_amount}`}
                      >
                        Enrollment: {course?.totalEnrollment}
                      </p>
                      <p
                        className={`${InstructorCourseStyle.featured_bottom_amount}`}
                      >
                        Lectures : {course?.lectureCount}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`${InstructorCourseStyle.featured_bottom_amount}`}
                      >
                        Total Rating: {course?.totalRatingCount}
                      </p>
                      <p
                        className={`${InstructorCourseStyle.featured_bottom_amount} flex items-center`}
                      >
                        Average Rating: {course?.averageRating}{" "}
                        <Rating
                          size="medium"
                          name="half-rating-read"
                          max={1}
                          readOnly
                          value={1}
                        />
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${InstructorCourseStyle.featured_bottom_amount}`}
                  >
                    <p>
                      <span className="">Create Date: </span>
                      {course?.createDate
                        ? new Date(course?.createDate).toLocaleTimeString(
                            "en-US"
                          )
                        : ""}{" "}
                      {course?.createDate
                        ? new Date(course?.createDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : ""}{" "}
                    </p>
                    <div className="bg-[#e5f4eb] rounded-[10px] px-10 h-[5px]"></div>
                    <div>
                      <span>Description:</span>
                      <br />
                      {course?.description}
                    </div>
                  </div>
                  <div>
                    {/* <span>Description: {course?.description}</span> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center bg-[#e7f8ee] py-4 rounded-md m-5">
              <ul className="tabs flex space-x-10 ">
                <li
                  className={`cursor-pointer rounded-md ${
                    activeTab === "tab1"
                      ? "bg-[#309255] text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleTabClick("tab1")}
                >
                  <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                    Lectures
                  </button>
                </li>
                <li
                  className={`cursor-pointer rounded-md ${
                    activeTab === "tab2"
                      ? "bg-[#309255] text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleTabClick("tab2")}
                >
                  <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                    Test
                  </button>
                </li>
                {course?.status === 0 && (
                  <li
                    className={`cursor-pointer rounded-md ${
                      activeTab === "tab3"
                        ? "bg-[#309255] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleTabClick("tab3")}
                  >
                    <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                      Reviews
                    </button>
                  </li>
                )}
              </ul>
            </div>
            {activeTab === "tab1" && (
              <div className={`${InstructorCourseStyle.lecture}`}>
                {/* {course?.lectureCount !== lectures.length ? (
                  <div className="flex justify-between mb-5">
                    <Button onClick={showModal}> New Lectures</Button>
                  </div>
                ) : ( */}
                <div className="flex justify-between mb-5">
                  <Button onClick={showModal}> New Lectures</Button>
                </div>
                {/* )} */}

                {loading ? (
                  <Spin size="large" />
                ) : (
                  <Table
                    className="shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] rounded-lg"
                    dataSource={lectures}
                    columns={columns}
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: () => handleRowClick(record), // Xử lý sự kiện click
                      };
                    }}
                  />
                )}
              </div>
            )}
            {activeTab === "tab2" && (
              <div className={`${InstructorCourseStyle.lecture}`}>
                {/* <div className="flex justify-between mb-5">
              <Button onClick={showModal}> New Question</Button>
            </div> */}
                {listQuestion.length === 0 ? (
                  <>
                    <div className="flex justify-between mb-5">
                      <Button onClick={showTestTitleModal}>
                        Create New Test
                      </Button>
                    </div>
                    <Empty />
                  </>
                ) : (
                  <>
                    {loading ? (
                      <Spin size="large" />
                    ) : (
                      <>
                        {listQuestion.map((item) => (
                          <div key={item.test.id} className="mb-4 mt-6">
                            <div className="flex flex-col">
                              <div className="flex flex-row justify-end gap-2">
                                <Button
                                  onClick={() => {
                                    handleUpdateTestModal(item.test.id);
                                  }}
                                  className="flex flex-row items-center"
                                >
                                  Update
                                </Button>
                                <button
                                  // className="flex items-end"
                                  style={{
                                    backgroundColor: "#fdc6c6",
                                    color: "black",
                                    width: "40px", // Thiết lập chiều rộng mong muốn
                                    height: "24px",
                                    borderRadius: "5px", // Thiết lập chiều cao mong muốn
                                  }}
                                  onClick={() => {
                                    showDeleteTestModal(item.test.id);
                                  }}
                                >
                                  <DeleteOutlined />
                                </button>
                              </div>
                              <h3 className="text-xl font-semibold mt-2 text-center ">
                                <div className=" flex flex-col items-center justify-center mb-2">
                                  <div className="flex justify-center items-center gap-2 ">
                                    <div className="text-3xl flex flex-col gap-2">
                                      <div>Title: {item.test.title} </div>
                                      <div className="flex justify-center ">
                                        <Tag
                                          className="text-2xl"
                                          color={getStatusColor(
                                            item.test.status
                                          )}
                                        >
                                          {getStatusText(item.test.status)}
                                        </Tag>
                                      </div>
                                    </div>
                                  </div>

                                  <br />
                                  <div>
                                    Description: {item.test.description}
                                  </div>
                                </div>
                              </h3>
                            </div>

                            {/* {item.questions.length == 0 ? <></> : <></>} */}
                            {item.questions.map((q, index) => (
                              <div
                                key={q.question.id}
                                className="mb-2 my-8 p-4 border-2 rounded-lg border-gray-200 shadow-[10px_10px_20px_10px_rgba(0,0,0,0.15)] "
                              >
                                <div className="mb-1 font-medium text-[18px] flex flex-row justify-between">
                                  <div className="flex flex-row gap-2">
                                    {index + 1}.{" "}
                                    {showUpdateQuestion &&
                                    questionId === q.question.id ? (
                                      <Input.TextArea
                                        autoSize={{ minRows: 1 }}
                                        cols={120}
                                        autoFocus
                                        defaultValue={q.question.questionText}
                                        value={updateQuestion}
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur(q.question.id)}
                                        className="w-full"
                                      />
                                    ) : (
                                      <div
                                        className="w-full"
                                        onClick={() => {
                                          handleUpdateQuestionClick(
                                            q.question.id
                                          );
                                          setQuestionId(q.question.id);
                                          setUpdateQuestion(
                                            q.question.questionText
                                          );
                                        }}
                                      >
                                        {q.question.questionText}
                                      </div>
                                    )}
                                  </div>
                                  <div className="gap-2 flex items-center">
                                    <Button
                                      onClick={() => {
                                        handleNewAnswerClick(q.question.id);
                                        setQuestionId(q.question.id);
                                      }}
                                      className="flex flex-row items-center"
                                    >
                                      {/* <div></div> */}
                                      <PlusOutlined /> Add Answer
                                    </Button>

                                    <button
                                      style={{
                                        backgroundColor: "#fdc6c6",
                                        color: "black",
                                        width: "40px", // Thiết lập chiều rộng mong muốn
                                        height: "24px",
                                        borderRadius: "5px",
                                        // Thiết lập chiều cao mong muốn
                                      }}
                                      onClick={() =>
                                        showDeleteQuestionModal(q.question.id)
                                      }
                                    >
                                      <DeleteOutlined />
                                    </button>
                                  </div>
                                </div>
                                {showAnswerForm &&
                                  questionId === q.question.id && (
                                    <Form
                                      onFinish={handleFormAnswerSubmit}
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
                                          onChange={handleCheckboxChange}
                                        >
                                          Correct Answer
                                        </Checkbox>
                                      </div>
                                      <div className="flex justify-end gap-2 mt-2">
                                        <Button onClick={handleCancel}>
                                          Cancel
                                        </Button>
                                        <Button
                                          style={{
                                            backgroundColor: "#4caf50",
                                            // borderColor: "#4caf50",
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
                                  {q.answers.map((answer, ansIndex) => (
                                    <>
                                      {showUpdateAnswer &&
                                      AnswerId === answer.id ? (
                                        <Input
                                          // autoFocus
                                          defaultValue={answer.answerText}
                                          value={updateAnswer}
                                          onChange={handleAnswerChange}
                                          onBlur={() => handleBlur2(answer.id)}
                                          key={answer.id}
                                          className={`mt-3 border-2 p-2 text-left rounded-lg ${
                                            answer.isCorrect === true
                                              ? "border-green-500 bg-green-100"
                                              : ""
                                          }`}
                                        />
                                      ) : (
                                        <div className="flex gap-2 justify-center align-middle items-center mt-3">
                                          <div
                                            className={` border-2 p-2 flex-auto text-left rounded-lg ${
                                              answer.isCorrect === true
                                                ? "border-green-500 bg-green-100"
                                                : ""
                                            }`}
                                            onClick={() => {
                                              handleUpdateAnswerClick(
                                                answer.id
                                              );
                                              setAnswerId(answer.id);
                                              setQuestionId(q.question.id);
                                              setUpdateAnswer(
                                                answer.answerText
                                              );
                                              handleSetIsChecked(
                                                answer.isCorrect
                                              );
                                            }}
                                          >
                                            {answer.answerText}
                                          </div>

                                          <button
                                            style={{
                                              backgroundColor: "#fdc6c6",
                                              color: "black",
                                              width: "24px", // Thiết lập chiều rộng mong muốn
                                              height: "24px",
                                              borderRadius: "5px", // Thiết lập chiều cao mong muốn
                                            }}
                                            onClick={() =>
                                              showDeleteAnswerModal(answer.id)
                                            }
                                          >
                                            <DeleteOutlined size={16} />
                                          </button>
                                        </div>
                                      )}
                                    </>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <>
                              {allQuestions.length === 0 ? (
                                <>
                                  <p className="font-medium text-lg text-center">
                                    Oh, it looks like you don&apos;t have any
                                    questions yet. Let&apos;s{" "}
                                    <button
                                      className="text-green-500 underline"
                                      onClick={handleNewQuestionClick}
                                    >
                                      create
                                    </button>{" "}
                                    a set of questions for your test
                                  </p>
                                </>
                              ) : (
                                <div className="flex justify-between mb-5 mt-10">
                                  <Button onClick={handleNewQuestionClick}>
                                    Add Question
                                  </Button>
                                </div>
                              )}

                              <div className=" flex justify-center">
                                {showQuestionForm && (
                                  <Form
                                    onFinish={handleFormQuestionSubmit}
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
                    )}
                  </>
                )}
              </div>
            )}
            {activeTab === "tab3" && (
              <div className={`${InstructorCourseStyle.lecture}`}>
                <div className="flex justify-between mb-5">
                  <span className="text-lg">Rating of Course</span>
                </div>
                {listRating.length === 0 ? (
                  <Empty />
                ) : (
                  <>
                    {loading ? (
                      <Spin size="large" />
                    ) : (
                      // <Table dataSource={listRating} columns={rating} />
                      <div className="reviews-wrapper reviews-active">
                        <div className="swiper-container">
                          <div className="swiper-wrapper">
                            {listRating.map((item) => {
                              return (
                                <>
                                  <div className="single-review mt-3.5 border border-opacity-20 border-[#30925533] p-7 rounded-md">
                                    <div className="review-author flex justify-between">
                                      <div className="flex flex-row">
                                        <div className="author-thumb p-2">
                                          <Avatar
                                            sx={{
                                              width: "100px",
                                              height: "100px",
                                              borderRadius: "100%",
                                            }}
                                            src={item.userRatingInfo.imageUser}
                                            alt="Author"
                                            // className="w-24 h-24 rounded-full"
                                          />
                                          <i className="icofont-quote-left"></i>
                                        </div>
                                        <div className="author-content pl-4">
                                          <h4 className="text-2xl font-medium">
                                            {item.userRatingInfo.fullName}
                                          </h4>
                                          <span className="text-lg text-[#309255] mt-1.5 font-light">
                                            {item.ratingCourseInfo.timeStamp
                                              ? new Date(
                                                  item.ratingCourseInfo.timeStamp
                                                ).toLocaleTimeString("en-US")
                                              : ""}{" "}
                                            {item.ratingCourseInfo.timeStamp
                                              ? new Date(
                                                  item.ratingCourseInfo.timeStamp
                                                ).toLocaleDateString("en-GB", {
                                                  day: "numeric",
                                                  month: "long",
                                                  year: "numeric",
                                                })
                                              : ""}{" "}
                                          </span>
                                          {item.ratingCourseInfo.comment ===
                                          "null" ? (
                                            <></>
                                          ) : (
                                            <p className="mt-3 font-medium text-[#52565b] text-lg">
                                              {item.ratingCourseInfo.comment}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="">
                                        <Rating
                                          size="large"
                                          name="half-rating-read"
                                          max={5}
                                          precision={0.1}
                                          readOnly
                                          value={item.ratingCourseInfo.rating1}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          <div className="swiper-pagination"></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
          {/* create Lecture */}
          <Modal
            destroyOnClose={true}
            title={`Create Lecture for Course by ${userData?.fullName}`}
            open={isModal}
            // onOk={handleOk}
            width={600}
            onCancel={handleCreateCancel}
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
              style={{ width: 600 }}
              onFinish={(e) => {
                handleSubmit(e);
                handleSuccessModeration();
              }}
            >
              <Form.Item
                rules={[{ required: true, message: "Please input Name!" }]}
                label="Title"
                name="title"
              >
                <Input placeholder="Input Title Lecture" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Please input Name!" }]}
                label="Content"
                name="content"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Input More Details Content"
                />
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
                <div>
                  <div
                    style={{ display: "flex" }}
                    className="flex justify-center"
                  >
                    {source && (
                      <video width={400} height={300} src={source} controls />
                    )}
                  </div>
                  <div
                    className="flex justify-center pt-2 pb-2"
                    style={{ display: "flex" }}
                  >
                    <UploadFirebase
                      fileName={`Course${idCourse}_Lecture${
                        lectures.length + 1
                      }_${Math.floor(
                        new Date().getTime() - new Date(2020, 0, 1).getSeconds()
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
                      onChange={handleFileChange}
                      // beforeUpload={beforeUpload}
                      // headers={{ Authorization: authorization }}
                      action="https://learnconnectapitest.azurewebsites.net/api/Upload/video"
                    >
                      <Button>Upload</Button>
                    </Upload>
                  </div>
                </Form.Item>
              )}
              <Space className="justify-end w-full pr-[90px]">
                <Form.Item className="mb-0">
                  <Space>
                    <Button
                      className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                      onClick={handleCreateCancel}
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
          {/* update lecture */}
          <Modal
            destroyOnClose={true}
            title={`Update lecture ${oneLecture?.title} `}
            open={updateVisible}
            // onOk={handleUpdateOk}
            width={600}
            onCancel={handleUpdateCancel}
            footer={false}
            style={{
              top: "30%",
            }}
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
              <Form.Item label="Type">
                <Select onChange={handleUpdateType} defaultValue={updateType}>
                  {Type.map((option) => {
                    return (
                      <Option key={option.id} value={option.id}>
                        {option.title}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              {updateType === 1 ? (
                // <Form.Item label="Video">
                <div>
                  <div
                    style={{ display: "flex" }}
                    className="flex justify-center"
                  >
                    {updateSrc && (
                      <video
                        width={400}
                        height={300}
                        src={updateSrc}
                        controls
                      />
                    )}
                  </div>
                  <div
                    className="flex justify-center pt-2 pb-2"
                    style={{ display: "flex" }}
                  >
                    <UploadFirebase
                      fileName={`Course${idCourse}_Lecture${
                        lectures.length + 1
                      }_${Math.floor(
                        new Date().getTime() - new Date(2020, 0, 1).getSeconds()
                      )}`}
                      returnUrl={setUpdateSrc}
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
                      onChange={handleFileChange}
                      // beforeUpload={beforeUpload}
                      // headers={{ Authorization: authorization }}
                      action="https://learnconnectapitest.azurewebsites.net/api/Upload/video"
                    >
                      <Button>Upload</Button>
                    </Upload>
                  </div>
                </Form.Item>
              )}
              <Space className="justify-end w-full pr-[90px]">
                <Form.Item className="mb-0">
                  <Space>
                    <Button
                      className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                      onClick={handleUpdateCancel}
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

          <Modal
            destroyOnClose={true}
            title={`Do you want to Delete the Lecture ${oneLecture?.title}?`}
            open={deleteVisible}
            // onOk={handleUpdateOk}
            width="40%"
            onCancel={handleDeleteCancel}
            footer={false}
            style={{
              top: "30%",
            }}
            // style={{ background: "#FFCCCC" }}
          >
            {/* Add your update form here */}
            <Form
              autoComplete="off"
              form={form}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
              layout="horizontal"
              className="mt-5"
              style={{ width: "100%" }}
              onFinish={() => handleDeleteLecture(oneLecture)}
            >
              <Space className="justify-end w-full">
                <Form.Item className="mb-0">
                  <Space>
                    <Button
                      className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                      onClick={handleDeleteCancel}
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

          {/* Test Title Modal */}
          <Modal
            destroyOnClose={true}
            title={`Information About Test (Title, Description) `}
            open={testTitleModal}
            // onOk={handleUpdateOk}
            width="40%"
            onCancel={handleCancel}
            footer={false}
            style={{
              top: "30%",
            }}
          >
            {/* Add your update form here */}
            <Form
              autoComplete="off"
              form={form}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
              layout="horizontal"
              className="mt-5"
              style={{ width: "100%" }}
              onFinish={handleCreateTestTitle}
            >
              <Form.Item
                rules={[
                  { required: true, message: "Please input Name ! " },
                  { max: 500, message: "Maximum 500 characters allowed!" },
                ]}
                label="Title"
                name="title"
              >
                <Input placeholder="Put title of Test here !" />
              </Form.Item>

              <Form.Item
                rules={[
                  { required: true, message: "Please input Name !" },
                  { max: 500, message: "Maximum 500 characters allowed !" },
                ]}
                label="Description"
                name="description"
              >
                <Input.TextArea placeholder="Type some description here !" />
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

          {/* Delete Test */}
          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Delete this Test?
              </div>
            }
            open={deleteTestModal}
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
              onFinish={handleDeleteTest}
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

          {/* Delete Question */}
          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Delete this Question?
              </div>
            }
            open={deleteQuestionModal}
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
              onFinish={handleDeleteQuestion}
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

          {/* Delete Answer */}
          <Modal
            destroyOnClose={true}
            title={
              <div className="text-lg">
                Are you sure you want to Delete this Answer?
              </div>
            }
            open={deleteAnswerModal}
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
              onFinish={handleDeleteAnswer}
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

          <Modal
            destroyOnClose={true}
            title={`Update test`}
            open={updateTestModal}
            // onOk={handleUpdateOk}
            width="40%"
            onCancel={handleCancel}
            footer={false}
            style={{
              top: "30%",
            }}
          >
            {/* Add your update form here */}
            <Form
              autoComplete="off"
              form={form}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              layout="horizontal"
              className="mt-5"
              style={{ width: "100%" }}
              onFinish={handleUpdateTestClick}
            >
              <Form.Item
                // rules={[{ required: true, message: "Please input Name!" }]}
                label="Title"
                name="title"
              >
                <Input defaultValue={test?.title} />
              </Form.Item>
              <Form.Item
                // rules={[{ required: true, message: "Please input Name!" }]}
                label="Description"
                name="description"
              >
                <Input.TextArea rows={4} defaultValue={test?.description} />
              </Form.Item>
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

export default Dashboard;
