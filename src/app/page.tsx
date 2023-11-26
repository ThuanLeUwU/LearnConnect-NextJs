"use client";
import BrandSupport from "@/components/brand/brand";
import Courses from "@/components/courses/courses";
import HowItWork from "@/components/howItWorks/HowItWork";
import RegisInstructor from "@/components/registerInstructor/Register";
import Image from "next/image";
import React, { useEffect } from "react";
import useDataFetcher from "@/components/pagination/useDataFetcher";
import Paginate from "@/components/pagination/pagination";
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
  console.log("user token", jwtToken);
  return (
    <>
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
