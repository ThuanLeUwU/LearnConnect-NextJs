"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import InstructorCourseStyle from "./styles.module.scss";
import { toast } from "sonner";
import { Breadcrumb, Spin, Tag } from "antd";
import LeftNavbar from "@/components/left-navbar/page";
import MentorRequest from "@/components/mentor-request/page";
import { UserAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { http } from "@/api/http";
import { Course } from "@/components/courses/courses";
import { Lecture } from "@/app/my-course/[id]/page";

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

const LectureModeration = ({ params }: any) => {
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

  useEffect(() => {
    if (idCourse !== "") {
      try {
        http
          .get(
            `https://learnconnectapitest.azurewebsites.net/api/lecture/by-course/${idCourse}/lecture/${LectureId}`
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

  const [moderationLecture, setModerationLecture] = useState<ModerationAI>();

  useEffect(() => {
    if (idCourse !== "") {
      try {
        http
          .get(
            `https://learnconnectapitest.azurewebsites.net/api/content-moderation/moderation?lectureId=${LectureId}`
          )
          .then((res) => {
            setModerationLecture(res.data);
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
          `https://learnconnectapitest.azurewebsites.net/api/course/get-course-pending/${value}`
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
    router.push("/staff-page/moderation");
  };

  const courseNavigation = () => {
    router.push(`/staff-page/moderation/${idCourse}`);
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

  return (
    <>
      {!userData ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex w-full">
          <LeftNavbar
            page1={"#"}
            page2={"/staff-page/staff-rating"}
            page3={"/staff-page/staff-report"}
            page4={"/staff-page/moderation"}
            page5={"/staff-page/list-major"}
            page6={"/staff-page/staff-revenue"}
            page7={"/staff-page/staff-transaction"}
          />
          {/* <MentorRequest /> */}
          <div className="w-full mt-4">
            <div className="flex justify-between items-center px-5 bg-[#e7f8ee] mb-5">
              <Breadcrumb className="text-start font-semibold text-4xl my-5 px-4">
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
                <div className="text-2xl">
                  Title: {lecture?.title} {getStatusText(lecture?.status)}
                </div>
                <div className="text-xl">Description: {lecture?.content}</div>
                {lecture?.contentUrl && (
                  <div className="pt-10">
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
              </div>
              <div className="flex-1 border-2 p-5 shadow-[5px_15px_25px_10px_rgba(0,0,0,0.15)] mt-2 rounded-lg">
                <div className="flex justify-center text-3xl">
                  Content moderation details
                </div>
                {!loading ? (
                  <Spin />
                ) : (
                  <div>
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-row justify-start items-center">
                        <span className="flex-1 text-2xl">Content Length:</span>
                        <span className="flex-1 text-xl">
                          {moderationLecture?.contentModeration.contentLength}
                        </span>
                      </div>
                      <div className="flex flex-row justify-start items-center">
                        <span className="flex-1 text-2xl">
                          Percent Explicit:
                        </span>
                        <span className="flex-1 text-xl">
                          {moderationLecture?.contentModeration.percentExplicit}
                        </span>
                      </div>
                      <div className="flex flex-row justify-start items-center">
                        <span className="flex-1 text-2xl">Percent Unsafe:</span>
                        <span className="flex-1 text-xl">
                          {moderationLecture?.contentModeration.percentUnsafe}
                        </span>
                      </div>
                      <div className="flex flex-row justify-start items-center">
                        <span className="flex-1 text-2xl">Reject Reason:</span>
                        <span className="flex-1 text-xl">
                          {moderationLecture?.contentModeration.rejectReason}
                        </span>
                      </div>
                      <div className="flex flex-row justify-start items-center">
                        <span className="flex-1 text-2xl">Preview Date:</span>
                        <span className="flex-1 text-xl">
                          {moderationLecture?.contentModeration.previewDate}
                        </span>
                      </div>
                      <div className="flex flex-row justify-start items-center">
                        <span className="flex-1 text-2xl">Status:</span>
                        <span className="flex-1 text-xl">
                          {moderationLecture?.contentModeration.status}
                        </span>
                      </div>
                      <div className="flex flex-row justify-start items-center">
                        <span className="flex-1 text-2xl">Preview By:</span>
                        <span className="flex-1 text-xl">
                          {moderationLecture?.contentModeration.previewBy}
                        </span>
                      </div>
                      <div className="flex flex-row justify-start items-center">
                        <span className="flex-1 text-2xl">Flag Details:</span>
                        {/* <ul>
        <!-- You can loop through flag details here if it's an array -->
      </ul> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <div>hehe</div> */}
        </div>
      )}
    </>
  );
};

export default LectureModeration;
