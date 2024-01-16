"use client";
import React, { useEffect, useState } from "react";
import "../../app/./globals.css";
import HIWStyle from "./styles/style.module.scss";
import Image from "next/image";
import { Mentor } from "../pagination/useDataMentorFetcher";
import { http } from "@/api/http";
import { Avatar } from "antd";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
// import { Avatar } from "@mui/material";

export type TopMentor = {
  mentorInfo: any;
  mentorId: number;
  mentorName: string;
  mentorImage: string;
  averageRating: number;
  mentorUserId: number;
};

const HowItWork = () => {
  const [topMentors, setTopMentors] = useState<TopMentor[]>([]);

  const router = useRouter();

  const onClickMentor = (data) => {
    // console.log("tao nè", data);
    router.push(`/profile-mentor/${data.mentorInfo.mentorUserId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await http.get(
        `https://learnconnectapifpt.azurewebsites.net/api/mentor/top-3-mentors`
      );
      setTopMentors(responseData.data);
      // const sortedMentors = responseData.data.sort(
      //   (a, b) => b.averageRating - a.averageRating
      // );
      // const top3Mentors = sortedMentors.slice(0, 3);
      // setTopMentors(top3Mentors);
    };

    fetchData();
  }, []);
  const contents = [
    {
      title: "Find Your Course",
      content: "It has survived not only centurie also leap into electronic.",
    },
    {
      title: "Find Your Course",
      content: "It has survived not only centurie also leap into electronic.",
    },
    {
      title: "Find Your Course",
      content: "It has survived not only centurie also leap into electronic.",
    },
  ];

  return (
    <div className="section section-padding mt-n1">
      <div className="container">
        <>
          <div className="section-title shape-03 text-center">
            <h2 className="main-title">
              Top 3 Mentors has <span> Highest Rating </span>
            </h2>
          </div>
          <div className={`${HIWStyle.how_it_work_wrapper}`}>
            {/* <div className="flex flex-row w-[400px] justify-center"> */}
            {topMentors.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-5 justify-center items-center"
                >
                  <button className="p-5 rounded-full border border-solid border-green-500 border-opacity-20 hover:transition-all duration-300 ease-in-out">
                    <Avatar
                      src={item.mentorInfo.mentorImage}
                      // className="w-[100px] "
                      size={120}
                      className="border-[#e7f8ee] border "
                    />
                  </button>
                  <div className="flex flex-col items-center">
                    <Rating
                      size="medium"
                      name="half-rating-read"
                      max={5}
                      precision={0.1}
                      readOnly
                      value={item.mentorInfo.averageRating}
                    />
                    {/* {item.mentorInfo.averageRating} */}
                  </div>
                  <button
                    onClick={() => {
                      onClickMentor(item);
                    }}
                    className="font-medium"
                  >
                    {item.mentorInfo.mentorName}
                  </button>
                  {/* <div>Specialzie</div> */}
                  {/* <div className={`${HIWStyle.single_work}`}>
                    <Avatar
                      src={item.profilePictureUrl}
                      className={`${HIWStyle.single_work_img}`}
                    ></Avatar>
                    <div className={`${HIWStyle.single_work_content}`}>
                      <h3 className={`${HIWStyle.single_work_title}`}>
                        Find Your Course
                      </h3>
                      <p>
                        It has survived not only centurie also leap into
                        electronic.
                      </p>
                    </div>
                  </div> */}
                </div>
              );
            })}
          </div>
          {/* </div> */}
          {/* <!-- How it Work Wrapper Start --> */}
        </>
      </div>
    </div>
  );
};

export default HowItWork;
