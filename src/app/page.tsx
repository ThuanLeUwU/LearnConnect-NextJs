"use client";
import BrandSupport from "@/components/brand/brand";
import Courses from "@/components/courses/courses";
import HowItWork from "@/components/howItWorks/HowItWork";
import RegisInstructor from "@/components/registerInstructor/Register";
import Image from "next/image";
import React from "react";
import useDataFetcher from "@/components/pagination/useDataFetcher";
import Paginate from "@/components/pagination/pagination";
import useDataHomeFetcher from "@/components/pagination/useDataHomeFetcher";
import Search from "@/components/search/search";

export default function Home() {
  const { loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataHomeFetcher();
  return (
    <>
      <div className="container">
        <Search />
        {loading ? (
          <div className="text-center text-5xl">loading...</div>
        ) : (
          <div>
            <div className="grid cols-2 lg:grid-cols-3 py-[30px] gap-5">
              {courses.map((item, index) => {
                return (
                  <div key={index}>
                    <Courses
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
        <div className="flex items-center justify-center mt-4">
          <button className="bg-[#309255] hover:bg-black text-white font-bold py-2 px-4 rounded-lg">
            <a href="/courses">Show more</a>
          </button>
        </div>
      </div>

      <RegisInstructor />
      <HowItWork />
      <BrandSupport />
    </>
  );
}
