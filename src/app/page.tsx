"use client";
import BrandSupport from "@/components/brand/brand";
import Courses from "@/components/courses/courses";
import HowItWork from "@/components/howItWorks/HowItWork";
import RegisInstructor from "@/components/registerInstructor/Register";
import Image from "next/image";
import React, { useEffect } from "react";

import useDataHomeFetcher from "@/components/pagination/useDataHomeFetcher";
import Search from "@/components/search/search";
import { Spin } from "antd";
import { UserAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function Home() {
  const { jwtToken } = UserAuth();

  const router = useRouter();
  const { id, user, role } = UserAuth();
  useEffect(() => {
    if (role === 0) {
      router.push(`/user-manage`);
    }
    if (role === 1) {
      router.push(`/staff-page`);
    }
    if (role === 2) {
      router.push(`/instructorcourses`);
    }
    // if (role === 3) {
    //   router.push(`/`);
    // }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });

  const handleRouter = () => {
    router.push("/courses");
  };

  const { loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataHomeFetcher();
  // console.log("user token", jwtToken);
  return (
    <>
      <div className="bg-[#e7f8ee]">
        <div
          className="bg-no-repeat flex flex-row justify-between"
          style={{
            backgroundImage: "url('/images/shape-23.png')",
            backgroundPosition: "bottom left",
          }}
        >
          <div className="px-20">
            <h4 className="text-[#309255] font-medium text-lg mb-5">
              Start your favourite course
            </h4>
            <h2 className="leading-tight text-5xl font-medium pr-10">
              Now learning from anywhere, and build your{" "}
              <span>bright career.</span>
            </h2>
            {/* <p className="mt-12 text-lg font-normal pr-28">
              It has survived not only five centuries but also the leap into
              electronic typesetting.
            </p> */}
            <button
              className="mt-7 text-white text-2xl border-2 py-4 px-6 rounded-xl bg-[#309255]"
              onClick={handleRouter}
            >
              Start A Course
            </button>
          </div>
          <img className="w-3/6" src="/images/Background.png" alt="Shape" />
        </div>
      </div>
      <div className="container">
        {/* <Search /> */}
        {loading ? (
          <div className="text-center text-5xl mt-5">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <div className="text-[35px] font-medium leading-5 mt-10">
              {" "}
              Top 6 Courses Has{" "}
              <span className="text-[#309255]"> Highest Enrollments </span>
            </div>
            <div className="grid cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-[30px] gap-5">
              {courses.map((item, index) => {
                return (
                  <div key={index}>
                    <Courses
                      setIsFavorites={() => {}}
                      favorite={item.isFavorite}
                      enrolled={false}
                      totalRatingCount={0}
                      mentorProfilePictureUrl={""}
                      mentorId={0}
                      lectureCount={""}
                      categoryName={""}
                      key={item.id}
                      {...item}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex items-center justify-center mt-10">
          <button
            className="bg-[#309255] hover:bg-black text-white font-bold py-3 px-6 rounded-lg text-xl"
            onClick={() => {
              handleRouter();
            }}
          >
            <p>Show more</p>
          </button>
        </div>
      </div>

      {/* <RegisInstructor /> */}
      <HowItWork />
      {/* <BrandSupport /> */}
    </>
  );
}
