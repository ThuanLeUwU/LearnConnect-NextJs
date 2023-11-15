"use client";
import React, { useState } from "react";
import ".././globals.css";
import useDataMentorFetcher from "@/components/pagination/useDataMentorFetcher";
import Paginate from "@/components/pagination/pagination";
import { useRouter } from "next/navigation";

export default function ListMentor() {
  const router = useRouter();
  const { loading, mentor, mentorID, totalPages, currentPage, setCurrentPage } =
    useDataMentorFetcher();
  const handleSwiperWrapperClick = (IdMentor) => {
    console.log("id mentor:", IdMentor);
    router.push(`/profile-mentor/${IdMentor}`);
  };
  console.log("mentor123:", mentor);
  return (
    <div className="container">
      {loading ? (
        <div className="text-center text-5xl">loading...</div>
      ) : (
        <div>
          <div className="tab-reviews">
            <h3 className="text-[#212832] text-2xl font-medium my-3"></h3>
            <div className="reviews-wrapper reviews-active">
              <div className="swiper-container">
                {mentor &&
                  mentor.length > 0 &&
                  mentor.map((mentorItem, index) => (
                    <div
                      className="swiper-wrapper mb-3 shadow-lg rounded-lg hover:border-[#309255] hover:bg-[#e7f8ee]"
                      key={mentorItem.id}
                      onClick={() =>
                        handleSwiperWrapperClick(mentorItem.mentorInfo.id)
                      }
                    >
                      <div className="single-review mt-3.5 border border-opacity-20 border-[#30925533] p-7 rounded-md">
                        <div className="review-author flex items-center ">
                          <div className="author-thumb border border-[#309255] rounded-full">
                            <img
                              src={mentorItem.userInfo.profilePictureUrl}
                              alt="Author"
                              className="w-24 h-24 rounded-full"
                            />
                            <i className="icofont-quote-left"></i>
                          </div>
                          <div className="author-content pl-4">
                            <h4 className="text-2xl font-medium">
                              {mentorItem.userInfo.fullName}
                            </h4>
                            <span className="text-sm text-[#309255] mt-1.5 font-light">
                              {mentorItem.userInfo.email}
                            </span>
                            <span className="rating-star">
                              <span className="rating-bar"></span>
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 font-light text-[#52565b] text-sm">
                          {mentorItem.userInfo.bioDescription}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
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
  );
}
