"use client";
import React, { useEffect, useState } from "react";
import ".././globals.css";
import useDataMentorFetcher from "@/components/pagination/useDataMentorFetcher";
import Paginate from "@/components/pagination/pagination";
import { useRouter } from "next/navigation";
import { Breadcrumb, Spin } from "antd";
import { UserAuth } from "../context/AuthContext";

export default function ListMentor() {
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
  const { loading, mentor, mentorID, totalPages, currentPage, setCurrentPage } =
    useDataMentorFetcher();
  const handleSwiperWrapperClick = (IdMentor) => {
    console.log("id mentor:", IdMentor);
    router.push(`/profile-mentor/${IdMentor}`);
  };
  console.log("mentor123:", mentor);

  const breadcrumbsHome = () => {
    router.push("/");
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
            <Breadcrumb className="font-semibold text-3xl py-5 pl-36 flex-auto">
              <Breadcrumb.Item>
                <button onClick={breadcrumbsHome}>Home</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>Mentors</span>
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
      </div>
      <div className="container min-h-[60vh]">
        {loading ? (
          <div className="text-center text-5xl mt-5">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <div className="tab-reviews">
              <h3 className="text-[#212832] text-2xl font-medium my-3"></h3>
              <div className="reviews-wrapper reviews-active">
                <>
                  <div className="swiper-container">
                    {mentor &&
                      mentor.length > 0 &&
                      mentor.map((mentorItem, index) => (
                        <button
                          className="swiper-wrapper mb-3 shadow-lg  w-full rounded-lg hover:border-[#309255] hover:bg-[#e7f8ee]"
                          key={mentorItem.id}
                          onClick={() =>
                            handleSwiperWrapperClick(mentorItem.mentorInfo.id)
                          }
                        >
                          <div className="single-review border border-opacity-20 border-[#30925533] p-7 rounded-md flex flex-col items-start">
                            <div className="review-author flex items-center ">
                              <div className="author-thumb border border-[#309255] rounded-full">
                                <img
                                  src={mentorItem.userInfo.profilePictureUrl}
                                  alt="Author"
                                  className="w-24 h-24 rounded-full"
                                />
                              </div>
                              <div className="author-content pl-4">
                                <h4 className="text-2xl font-medium">
                                  {mentorItem.userInfo.fullName}
                                </h4>
                                <span className="text-sm text-[#309255] mt-1.5 font-normal">
                                  {mentorItem.userInfo.email}
                                </span>
                                <span className="rating-star">
                                  <span className="rating-bar"></span>
                                </span>
                              </div>
                            </div>
                            <p className="mt-3 font-normal text-[#52565b] text-sm text-start">
                              {mentorItem.userInfo.bioDescription}
                            </p>
                          </div>
                        </button>
                      ))}
                  </div>
                </>
              </div>
            </div>

            {mentor && mentor.length > 0 && (
              <Paginate
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
