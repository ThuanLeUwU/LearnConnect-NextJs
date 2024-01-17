"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import InstructorCourseStyle from "../../styles/style.module.scss";
import { toast } from "sonner";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Modal,
  Space,
  Spin,
  Tag,
  Tooltip,
} from "antd";
import { UserAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { http } from "@/api/http";
import { Course } from "@/components/courses/courses";
import { Comment, Lecture } from "@/app/my-course/[id]/page";
import ProgressBar from "@ramonak/react-progress-bar";
import { ClockCircleOutlined } from "@ant-design/icons";
import { IoChatboxSharp } from "react-icons/io5";
import { VscEllipsis } from "react-icons/vsc";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

export type ModerationAI = {
  contentModeration: any;
  id: number;
  videoUrl: string;
  contentLength: number;
  percentExplicit: number;
  percentUnsafe: number;
  rejectReason: string;
  previewDate: string;
  status: number;
  previewBy: string;
  lectureId: number;
  flagDetails: any;
  flags: any;
};

export type Flag = {
  flags: any;
  id: number;
  title: string;
  description: string;
  atTime: number;
  contentModerationId: number;
};

const LectureDetail = ({ params }: any) => {
  const { id, userData } = UserAuth();
  const router = useRouter();

  const LectureId = params.lectureId;
  //   console.log("hh", LectureId);
  const [idCourse, setIdCourse] = useState<string>("");
  //   console.log("cou", idCourse);

  const [course, setCourse] = useState<Course>();
  //   console.log("cou", course);

  const [lecture, setLecture] = useState<Lecture>();
  //   console.log("lec", lecture);

  const [loading, setLoading] = useState(false);

  const menuItem = [
    {
      image: "/menu-icon/book-alt.png",
      title: "Courses",
      href: "/instructorcourses",
    },
    {
      image: "/menu-icon/file-edit.png",
      title: "Requests",
      href: "/request-history",
    },
    {
      image: "/menu-icon/feedback-review.png",
      title: "Reviews",
      href: "/review-mentor",
    },

    {
      image: "/menu-icon/receipt.png",
      title: "Transaction History",
      href: "/order-history",
    },
    {
      image: "/menu-icon/money-check-edit.png",
      title: "Statistics",
      href: "/revenue",
    },
  ];

  useEffect(() => {
    if (idCourse !== "") {
      try {
        http
          .get(
            `https://learnconnectapifpt.azurewebsites.net/api/lecture/by-course/${idCourse}/lecture/${LectureId}`
          )
          .then((res) => {
            setLecture(res.data);
            setLoading(true);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [LectureId, idCourse]);

  useEffect(() => {
    // Check if window is defined before using it
    if (typeof window !== "undefined") {
      const url = window.location.href;
      const parts = url.split("/");
      const value = parts[parts.length - 2];
      setIdCourse(value);
      console.log(value);
      http
        .get(
          `https://learnconnectapifpt.azurewebsites.net/api/course/get-course-by-mentor/mentorUserId/${id}/course/${value}`
        )
        .then((response) => {
          setCourse(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
      // Your window-dependent code here
    }
  }, [LectureId]);

  const breadcrumbNavigation = () => {
    router.push("/instructorcourses");
  };

  const courseNavigation = () => {
    router.push(`/instructorcourses/${idCourse}`);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return (
          <Tag color="green" className="text-lg">
            Active
          </Tag>
        );

      case 1:
        return (
          <Tag color="gray" className="text-lg">
            Pending
          </Tag>
        );
      case 2:
        return (
          <Tag color="#ffa04e" className="text-lg">
            Reject
          </Tag>
        );
      case 3:
        return (
          <Tag color="red" className="text-lg">
            Ban
          </Tag>
        );
      default:
        return "Unknown Status";
    }
  };

  const [comment, setComment] = useState<Comment[]>([]);

  useEffect(() => {
    if (idCourse !== "") {
      try {
        http
          .get(
            `https://learnconnectapifpt.azurewebsites.net/api/Comment/get-comments-by-lectureId/${LectureId}`
          )
          .then((res) => {
            setComment(res?.data.reverse());
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [LectureId, idCourse]);

  const [isAnswer, setIsAnswer] = useState(false);
  const [idDropDown, setIdDropdown] = useState<Number>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [replyComment, setReplyComment] = useState("");

  const AnswerMode = (data) => {
    setIsAnswer(!isAnswer);
    setIdDropdown(data);

    console.log("isanswer", isAnswer);
  };

  const toggleDropdown = (data: any) => {
    setIdDropdown(data);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const EditCommentMode = () => {
    setIsEditing(true);
  };

  const EditComment = async (comment: any) => {
    if (!editText) {
      toast.error("Comment cannot be empty.");
      return;
    }
    comment.comment1 = editText;
    await http
      .put(
        `https://learnconnectapifpt.azurewebsites.net/api/comment/${comment.id}`,
        comment
      )
      .then(() => {
        toast.success("Edit Comment Success");
        setIsEditing(false);
        http
          .get(
            `https://learnconnectapifpt.azurewebsites.net/api/Comment/get-comments-by-lectureId/${LectureId}`
          )
          .then((res) => {
            setComment(res?.data.reverse());
          });
      });
    setEditText("");
  };

  const ReplyComment = async (comment) => {
    if (!replyComment) {
      toast.error("Comment cannot be empty.");
      return;
    }
    const formData = new FormData();
    formData.append("comment", replyComment);
    await http
      .post(
        `https://learnconnectapifpt.azurewebsites.net/api/comment?userId=${userData?.id}&lectureId=${LectureId}&parentCommentId=${comment}`,
        formData
      )
      .then(() => {
        toast.success("Reply Comment Success");
        setIsAnswer(false);
        setReplyComment("");
        http
          .get(
            `https://learnconnectapifpt.azurewebsites.net/api/Comment/get-comments-by-lectureId/${LectureId}`
          )
          .then((res) => {
            setComment(res?.data.reverse());
          });
      });
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
            <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
              <Breadcrumb className="text-start font-semibold text-3xl my-5 px-4">
                <Breadcrumb.Item>
                  <button onClick={breadcrumbNavigation}>Course</button>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <button onClick={courseNavigation}>{course?.name}</button>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{lecture?.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div className="mx-5 flex flex-row gap-10">
              <div className="flex-1 border-2 p-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg">
                <div className="text-2xl flex flex-row justify-between">
                  <div className="text-3xl"> {lecture?.title}</div>{" "}
                  <div> {getStatusText(lecture?.status)}</div>
                </div>
                {lecture?.contentUrl && (
                  <div className="py-10 w-full">
                    {" "}
                    <video
                      width="full"
                      height="full"
                      controls
                      id="courseVideo"
                      controlsList="nodownload"
                    >
                      <source src={lecture?.contentUrl} type="video/mp4" />
                    </video>
                  </div>
                )}
                <div className="text-xl">
                  <div>{lecture?.content}</div>
                </div>
              </div>
              <div className="flex-1 border-2 p-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg flex flex-col gap-4">
                <Space className="flex justify-end">
                  {/* {lecture?.status === 0 && (
                    <Button
                      danger
                      // onClick={() => handleBanLecture(record)}
                    >
                      Ban
                    </Button>
                  )} */}
                  {lecture?.status === 2 && (
                    <div className="text-xl ">
                      Reason : {lecture.rejectReason}
                    </div>
                  )}
                  {/* {lecture?.status === 3 && <Button>Unban</Button>} */}
                </Space>
                <div className="flex justify-center text-3xl">Comments</div>
                {comment &&
                  comment.map((item, index) => (
                    <div
                      className="py-7 px-5 border-t border-[#30925533]"
                      key={index}
                    >
                      <div className="flex">
                        <img
                          alt="CommentImg"
                          src={item?.user.userImage}
                          className="w-[70px] h-[70px] rounded-full"
                        />
                        <div className="my-auto pl-5">
                          <p className="font-bold text-xl">
                            {item?.user.userName}
                          </p>
                          <p className="font-light text-[#8e9298]">
                            {moment(item?.comment.commentTime).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )}
                          </p>
                        </div>

                        <div className="flex ml-auto">
                          <button
                            className=" my-auto bg-[#d6e9dd] ml-auto px-5 max-h-[40px] flex item-center rounded-lg border border-[#30925533] w-full py-1 hover:text-[#fff] hover:bg-[#309255]"
                            onClick={() => {
                              AnswerMode(item.comment.id);
                            }}
                          >
                            <span className="my-auto pr-1">
                              <IoChatboxSharp />
                            </span>
                            Answer
                          </button>
                          {item?.user.userId === userData?.id && (
                            <button
                              className="w-full flex my-auto ml-2 border border-[#30925533] p-2 rounded-lg hover:text-[#000] hover:bg-[#30925533]"
                              onClick={() => {
                                toggleDropdown(item?.comment.id);
                              }}
                            >
                              <VscEllipsis />
                              {isDropdownOpen &&
                                item?.comment.id === idDropDown && (
                                  <div
                                    id="dropdown-menu"
                                    className="modal-overlay absolute mt-[30px] z-50"
                                  >
                                    <div className="bg-white border border-gray-300 rounded shadow-lg">
                                      <div className="p-2 text-black flex flex-col">
                                        <button
                                          className="px-3 py-2 mb-1 hover:bg-[#e7f8ee]"
                                          onClick={EditCommentMode}
                                        >
                                          Edit Comment
                                        </button>
                                        <button
                                          className="px-3 py-2 hover:bg-[#e7f8ee]"
                                          onClick={() => {
                                            // DeleteComment(
                                            //   item?.comment.id
                                            // );
                                            setIdDelete(item?.comment.id);
                                            setIsConfirmationModalOpen(true);
                                          }}
                                        >
                                          Delete Comment
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="py-5">
                        {isEditing && item?.comment.id === idDropDown ? (
                          <div>
                            <TextArea
                              placeholder="Edit Comment"
                              autoSize={{
                                minRows: 7,
                                maxRows: 15,
                              }}
                              className="w-full"
                              defaultValue={item?.comment.comment1}
                              onChange={(e) => setEditText(e.target.value)}
                            />
                            <div className="py-5 flex justify-end">
                              <button
                                className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg hover:border-red-500"
                                onClick={() => {
                                  setIsEditing(false);
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg text-[#309255] hover:bg-[#309255] hover:text-[#fff]"
                                onClick={() => {
                                  EditComment(item.comment);
                                }}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p>{item?.comment.comment1}</p>
                        )}
                      </div>
                      {isAnswer && item?.comment.id === idDropDown && (
                        <div className="py-7 px-5 ml-[110px] border-t border-[#30925533]">
                          <div className="flex">
                            <img
                              alt="CommentImg"
                              src={userData?.profilePictureUrl}
                              className="w-[70px] h-[70px] rounded-full"
                            />
                            <div className="my-auto pl-5">
                              <p className="font-bold text-xl">
                                {userData?.fullName}
                              </p>
                            </div>
                          </div>
                          <div className="pt-5">
                            <TextArea
                              placeholder="Post Comment"
                              autoSize={{
                                minRows: 7,
                                maxRows: 15,
                              }}
                              className="w-full"
                              value={replyComment}
                              // defaultValue={item?.comment.comment1}
                              onChange={(e) => setReplyComment(e.target.value)}
                            />
                          </div>
                          <div className="pt-5 flex justify-end">
                            <button
                              className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg hover:border-red-500"
                              onClick={() => {
                                setIsAnswer(false);
                                setReplyComment("");
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg text-[#309255] hover:bg-[#309255] hover:text-[#fff]"
                              onClick={() => {
                                ReplyComment(item.comment.id);
                              }}
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      )}
                      {item.reply.map((replyItem, replyIndex) => (
                        <div
                          className="py-7 px-5 ml-[110px] border-t border-[#30925533]"
                          key={replyIndex}
                        >
                          <div className="flex">
                            <img
                              alt="CommentImg"
                              src={replyItem.user.userImage}
                              className="w-[70px] h-[70px] rounded-full"
                            />

                            <div className="my-auto pl-5">
                              {replyItem.user && (
                                <div>
                                  <p className="font-bold text-xl">
                                    {replyItem.user.userName}
                                  </p>
                                  <p className="font-light text-[#8e9298]">
                                    {moment(
                                      replyItem?.comment.commentTime
                                    ).format("DD/MM/YYYY HH:mm:ss")}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="flex ml-auto">
                              {replyItem?.user.userId === userData?.id && (
                                <button
                                  className="w-full flex my-auto ml-2 border border-[#30925533] p-2 rounded-lg hover:text-[#000] hover:bg-[#30925533]"
                                  onClick={() => {
                                    toggleDropdown(replyItem?.comment.id);
                                  }}
                                >
                                  <VscEllipsis />
                                  {isDropdownOpen &&
                                    replyItem?.comment.id === idDropDown && (
                                      <div
                                        id="dropdown-menu"
                                        className="modal-overlay absolute mt-[30px] z-50"
                                      >
                                        <div className="bg-white border border-gray-300 rounded shadow-lg">
                                          <div className="p-2 text-black flex flex-col">
                                            <button
                                              className="px-3 py-2 mb-1 hover:bg-[#e7f8ee]"
                                              onClick={EditCommentMode}
                                            >
                                              Edit Comment
                                            </button>
                                            <button
                                              className="px-3 py-2 hover:bg-[#e7f8ee]"
                                              onClick={() => {
                                                // DeleteComment(
                                                //   replyItem
                                                //     ?.comment.id
                                                // );
                                                setIdDelete(
                                                  replyItem?.comment.id
                                                );
                                                setIsConfirmationModalOpen(
                                                  true
                                                );
                                              }}
                                            >
                                              Delete Comment
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="py-5">
                            {isEditing &&
                            replyItem?.comment.id === idDropDown ? (
                              <div>
                                <TextArea
                                  placeholder="Edit Comment"
                                  autoSize={{
                                    minRows: 7,
                                    maxRows: 15,
                                  }}
                                  className="w-full"
                                  defaultValue={replyItem?.comment.comment1}
                                  onChange={(e) => setEditText(e.target.value)}
                                />
                                <div className="py-5 flex justify-end">
                                  <button
                                    className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg hover:border-red-500"
                                    onClick={() => {
                                      setIsEditing(false);
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="border border-[#309255] px-[35px] mx-1 py-2 rounded-lg text-[#309255] hover:bg-[#309255] hover:text-[#fff]"
                                    onClick={() => {
                                      EditComment(replyItem.comment);
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p> {replyItem.comment.comment1}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LectureDetail;
