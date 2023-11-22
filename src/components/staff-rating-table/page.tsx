"use client";

import { http } from "@/api/http";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";
import Modal from "@mui/material/Modal";
import axios from "axios";

export type Rating = {
  ratingInfo: any;
  id: number;
  rating1: number;
  comment: string | null;
  timeStamp: string;
  status: number;
  ratingBy: number;
  courseId: number;
  mentorId: number;
  userRatingInfo: {
    fullName: string;
    imageUser: string;
  };
};

const StaffRatingTable = () => {
  const { jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const [activeTab, setActiveTab] = useState("tab2");
  const [selectedType, setSelectedType] = useState("course");
  const handleTabClick = (tabName: string, type: string) => {
    setActiveTab(tabName);
    setSelectedType(type);
  };
  const [rating, setRating] = useState<Rating[]>([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedRatingId, setSelectedRatingId] = useState(null);

  const fetchData = async () => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
      try {
        const responseData = await http.get(
          `https://learnconnectapitest.azurewebsites.net/api/rating/allListRatings?ratingType=${selectedType}`
        );
        setRating(responseData?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedType]);

  const handleRatingStatusUpdate = async (id, status) => {
    try {
      await axios.put(
        `https://learnconnectapitest.azurewebsites.net/api/rating/update-rating-status?id=${id}&status=${status}`
      );
      fetchData();
    } catch (error) {
      console.error("Error updating rating status:", error);
    }
  };

  const handleBanConfirmation = async (confirmed) => {
    setIsConfirmationModalOpen(false);

    if (confirmed) {
      try {
        await axios.put(
          `https://learnconnectapitest.azurewebsites.net/api/rating/update-rating-status?id=${selectedRatingId}&status=0`
        );
        fetchData();
      } catch (error) {
        console.error("Error updating rating status:", error);
      }
    }
  };

  return (
    <div className="w-full">
      <div>
        <div className=" text-[#212832] ">
          <div className="flex justify-center bg-[#e7f8ee] py-4 rounded-md">
            <ul className="tabs flex space-x-5 ">
              {/* <li
                className={`cursor-pointer rounded-md ${
                  activeTab === "tab1" ? "bg-[#309255] text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick("tab1", "all")}
              >
                <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                  All Ratings
                </button>
              </li> */}
              <li
                className={`cursor-pointer rounded-md ${
                  activeTab === "tab2" ? "bg-[#309255] text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick("tab2", "course")}
              >
                <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                  Courses Ratings
                </button>
              </li>
              <li
                className={`cursor-pointer rounded-md ${
                  activeTab === "tab3" ? "bg-[#309255] text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick("tab3", "mentor")}
              >
                <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
                  Mentors Ratings
                </button>
              </li>
            </ul>
          </div>

          <div className="tab-content">
            {/* {activeTab === "tab1" && (
              <div className="tab-reviews pb-3">
                <div className="reviews-wrapper reviews-active">
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      {rating &&
                        rating.length > 0 &&
                        rating.map((item) => {
                          return (
                            <>
                              <div
                                key={item.ratingInfo.id}
                                className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-7 rounded-md mx-5"
                              >
                                <div className="review-author flex justify-between">
                                  <div className="flex flex-row">
                                    <div className="author-thumb p-2 rounded-full">
                                      <img
                                        src={item.userRatingInfo.imageUser}
                                        alt="Author"
                                        className="w-16 h-16 rounded-full"
                                      />
                                    </div>
                                    <div className="author-content pl-4 flex flex-col justify-center">
                                      <div className=" font-bold text-xl">
                                        {item.userRatingInfo.fullName}
                                      </div>
                                      <span className=" text-[#309255] font-light">
                                        {item.ratingInfo.timeStamp
                                          ? new Date(
                                              item.ratingInfo.timeStamp
                                            ).toLocaleTimeString("en-US")
                                          : ""}{" "}
                                        {item.ratingInfo.timeStamp
                                          ? new Date(
                                              item.ratingInfo.timeStamp
                                            ).toLocaleDateString("en-GB", {
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric",
                                            })
                                          : ""}{" "}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="items-center">
                                    <Rating
                                      size="large"
                                      name="half-rating-read"
                                      max={5}
                                      precision={0.1}
                                      readOnly
                                      value={item.ratingInfo.rating1}
                                      className="flex items-center text-center justify-center mx-auto"
                                    />
                                    <div className="flex justify-center">
                                      {item.ratingInfo.status === 0 ? (
                                        <button
                                          onClick={() =>
                                            handleRatingStatusUpdate(
                                              item.ratingInfo.id,
                                              1
                                            )
                                          }
                                          className="px-5 py-3 mx-2 bg-[#309255] w-[100px] text-white rounded-lg"
                                        >
                                          Display
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            setSelectedRatingId(
                                              item.ratingInfo.id
                                            );
                                            setIsConfirmationModalOpen(true);
                                          }}
                                          className="px-5 py-3 mx-2 bg-red-500 w-[100px] text-white rounded-lg"
                                        >
                                          Hidden
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {item.ratingInfo.comment == "null" ? (
                                  <></>
                                ) : (
                                  <p className="mt-3 font-semibold text-[#52565b] ">
                                    {item.ratingInfo.comment}
                                  </p>
                                )}
                              </div>
                            </>
                          );
                        })}
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>
                </div>
              </div>
            )} */}
            {activeTab === "tab2" && (
              <div className="tab-reviews ">
                <div className="reviews-wrapper reviews-active">
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      {rating &&
                        rating.length > 0 &&
                        rating.map((item) => {
                          return (
                            <>
                              <div className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-7 rounded-md mx-5 h-[200px]">
                                <div className="review-author flex justify-between">
                                  <div className="flex flex-row">
                                    <div className="author-thumb p-2 rounded-full">
                                      <img
                                        src={item.userRatingInfo.imageUser}
                                        alt="Author"
                                        className="w-16 h-16 rounded-full"
                                      />
                                    </div>
                                    <div className="author-content pl-4 flex flex-col justify-center">
                                      <div className=" font-bold text-xl">
                                        {item.userRatingInfo.fullName}
                                      </div>
                                      <span className=" text-[#309255] font-light">
                                        {item.ratingInfo.timeStamp
                                          ? new Date(
                                              item.ratingInfo.timeStamp
                                            ).toLocaleTimeString("en-US")
                                          : ""}{" "}
                                        {item.ratingInfo.timeStamp
                                          ? new Date(
                                              item.ratingInfo.timeStamp
                                            ).toLocaleDateString("en-GB", {
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric",
                                            })
                                          : ""}{" "}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="">
                                    <Rating
                                      size="large"
                                      name="half-rating-read"
                                      max={5}
                                      precision={0.1}
                                      readOnly
                                      value={item.ratingInfo.rating1}
                                    />
                                    <div className="flex justify-center">
                                      {item.ratingInfo.status === 0 ? (
                                        <button
                                          onClick={() =>
                                            handleRatingStatusUpdate(
                                              item.ratingInfo.id,
                                              1
                                            )
                                          }
                                          className="px-5 py-3 mx-2 bg-[#309255] w-[100px] text-white rounded-lg"
                                        >
                                          Display
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            setSelectedRatingId(
                                              item.ratingInfo.id
                                            );
                                            setIsConfirmationModalOpen(true);
                                          }}
                                          className="px-5 py-3 mx-2 bg-red-500 w-[100px] text-white rounded-lg"
                                        >
                                          Hidden
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {item.ratingInfo.comment == "null" ? (
                                  <></>
                                ) : (
                                  <p className="mt-3 font-semibold text-[#52565b] ">
                                    {item.ratingInfo.comment}
                                  </p>
                                )}
                              </div>
                            </>
                          );
                        })}
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "tab3" && (
              <div className="tab-reviews pb-3 ">
                <div className="reviews-wrapper reviews-active">
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      {rating &&
                        rating.length > 0 &&
                        rating.map((item) => {
                          return (
                            <>
                              <div className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-7 rounded-md mx-5">
                                <div className="review-author flex justify-between">
                                  <div className="flex flex-row">
                                    <div className="author-thumb p-2 rounded-full">
                                      <img
                                        src={item.userRatingInfo.imageUser}
                                        alt="Author"
                                        className="w-16 h-16 rounded-full"
                                      />
                                    </div>
                                    <div className="author-content pl-4 flex flex-col justify-center">
                                      <div className=" font-bold text-xl">
                                        {item.userRatingInfo.fullName}
                                      </div>
                                      <span className=" text-[#309255] font-light">
                                        {item.ratingInfo.timeStamp
                                          ? new Date(
                                              item.ratingInfo.timeStamp
                                            ).toLocaleTimeString("en-US")
                                          : ""}{" "}
                                        {item.ratingInfo.timeStamp
                                          ? new Date(
                                              item.ratingInfo.timeStamp
                                            ).toLocaleDateString("en-GB", {
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric",
                                            })
                                          : ""}{" "}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="">
                                    <Rating
                                      size="large"
                                      name="half-rating-read"
                                      max={5}
                                      precision={0.1}
                                      readOnly
                                      value={item.ratingInfo.rating1}
                                    />
                                    <div className="flex justify-center">
                                      {item.ratingInfo.status === 0 ? (
                                        <button
                                          onClick={() =>
                                            handleRatingStatusUpdate(
                                              item.ratingInfo.id,
                                              1
                                            )
                                          }
                                          className="px-5 py-3 mx-2 bg-[#309255] w-[100px] text-white rounded-lg"
                                        >
                                          Display
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            setSelectedRatingId(
                                              item.ratingInfo.id
                                            );
                                            setIsConfirmationModalOpen(true);
                                          }}
                                          className="px-5 py-3 mx-2 bg-red-500 w-[100px] text-white rounded-lg"
                                        >
                                          Hidden
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {item.ratingInfo.comment == "null" ? (
                                  <></>
                                ) : (
                                  <p className="mt-3 font-semibold text-[#52565b] ">
                                    {item.ratingInfo.comment}
                                  </p>
                                )}
                              </div>
                            </>
                          );
                        })}
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">
              Are you sure you want to Hidden this Comment?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => handleBanConfirmation(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Confirm
              </button>
              <button
                onClick={() => handleBanConfirmation(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StaffRatingTable;
