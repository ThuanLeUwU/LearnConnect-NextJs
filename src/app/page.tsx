"use client";
import BrandSupport from "@/components/brand/brand";
import Courses from "@/components/courses/courses";
import HowItWork from "@/components/howItWorks/HowItWork";
import RegisInstructor from "@/components/registerInstructor/Register";
import Image from "next/image";
import React from "react";
import useDataFetcher from "@/components/pagination/useDataFetcher";
import Paginate from "@/components/pagination/pagination";

export default function Home() {
  const { loading, courses, totalPages, currentPage, setCurrentPage } =
    useDataFetcher();
  return (
    <>
      <div className="container">
        {loading ? (
          <div className="text-center text-5xl">loading...</div>
        ) : (
          <div>
            <div className="grid cols-2 lg:grid-cols-3 pt-[30px] gap-5">
              {courses.map((item, index) => {
                return (
                  <div key={index}>
                    <Courses categoryName={""} key={item.id} {...item} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <Paginate
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <RegisInstructor />
      <HowItWork />
      <BrandSupport />
    </>
  );
}
