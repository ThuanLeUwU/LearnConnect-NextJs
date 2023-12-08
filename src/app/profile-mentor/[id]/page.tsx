"use client";
import Link from "next/link";
import "../.././globals.css";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Breadcrumb, Empty, Spin } from "antd";
import { Tabs } from "antd";
import { GoDotFill } from "react-icons/go";
import { Rating } from "@mui/material";
import Paginate from "@/components/pagination/pagination";
import { http } from "@/api/http";

// import { User } from "firebase/auth";

export type User = {
  mentor: any;
  user: any;
  id: string | number;
  password: string;
  email: string;
  role: 1;
  fullName: string;
  phoneNumber: string;
  gender: number;
  bioDescription: string;
  profilePictureUrl: string;
  status: number;
  specialization: any;
};

export type User1 = {
  mentor: any;
  user: any;
  mentorInfo: any;
  userInfo: any;
  id: string | number;
  password: string;
  email: string;
  role: 0;
  fullName: string;
  phoneNumber: string;
  gender: 0;
  bioDescription: string;
  profilePictureUrl: string;
  status: number;
  MentorProfile: {
    id: string;
  };
};

export type CourseItemProfile = {
  id: string | number;
  name: string;
  description: string;
  shortDescription: string;
  difficultyLevel: string;
  imageUrl: string;
  price: number;
  totalEnrollment: number;
  contentLength: number;
  averageRating: number;
  status: number;
  categoryId: number;
  totalRatingCount: number;
};

export type Rating = {
  ratingMentorInfo: any;
  id: number;
  rating1: number;
  comment: string;
  timeStamp: string;
  status: number;
  ratingBy: number;
  courseId: number;
  mentorId: number;
  userRatingInfo: any;
  fullName: string;
  imageUser: string;
};
export default function ProfileUser({ params }: any) {
  const { role } = UserAuth();
  const router = useRouter();
  useEffect(() => {
    if (role === 0) {
      router.push(`/user-manage`);
    }
    if (role === 1) {
      router.push(`/staff-page`);
    }
    // if (role === 2) {
    //   router.push(`/instructorcourses`);
    // }
    // if (role === 3) {
    //   router.push(`/`);
    // }
    // if (role === -1) {
    //   router.push(`/`);
    // }
  });

  const idMentor = params.id;
  console.log("mentorid", idMentor);
  const { TabPane } = Tabs;
  const { userData, id, jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const [currentTab, setCurrentTab] = useState("1");
  const [currentTab1, setCurrentTab1] = useState("1");
  const [averageRating, setAverageRating] = useState(0);
  const [paypalId, setPaypalId] = useState(0);
  const [paypalAddress, setPaypalAddress] = useState("");
  const [courses, setCourses] = useState<CourseItemProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(10);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (idMentor === userData?.id + "") {
      setIsOwner(true);
    }
  }, [userData]);

  let API_URL =
    "https://learnconnectapitest.azurewebsites.net/api/course/get-courses-by-mentor?userId=";
  if (isOwner) {
    API_URL =
      "https://learnconnectapitest.azurewebsites.net/api/course/get-courses-by-mentorUserId?userId=";
  }

  const pagesize = 4;
  const [rating, setRating] = useState<Rating[]>([]);
  // console.log("data:", userData?.fullName);
  // console.log("picture :", userData?.profilePictureUrl);
  const [DataUser, SetDataUser] = useState<User>();
  // const [];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await http.get(
          // `https://learnconnectapitest.azurewebsites.net/api/user/${id}`
          `https://learnconnectapitest.azurewebsites.net/api/mentor/get-info/${idMentor}`
        );
        SetDataUser(response.data);
        setAverageRating(response.data.mentor.averageRating);
        setPaypalId(response.data.mentor.paypalId);
        setPaypalAddress(response.data.mentor.paypalAddress);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (id) {
      fetchUserData();
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await http.get(
        `https://learnconnectapitest.azurewebsites.net/api/rating/listRatingOfMentor/${idMentor}`
      );
      setRating(responseData?.data);
      console.log("rating", responseData?.data);
    };

    fetchData();
  }, []);

  const handleClickMoveToCourse = (courseId: string | number) => {
    router.push(`/course-detail/${courseId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await axios.get(
        `${API_URL}${idMentor}&currentPage=${page}&pageSize=${pagesize}`
      );
      setCourses(result?.data.courses);
      console.log("couyrse", result?.data.courses);
      setTotalPages(result?.data.paginationData.totalPages);
      setLoading(false);
    };
    fetchData();
  }, [currentPage]);

  const displayGender = (gender: number | undefined) => {
    if (gender === 1) {
      return "Male";
    } else if (gender === 2) {
      return "Female";
    } else if (gender === 3) {
      return "Other";
    } else {
      return null;
    }
  };

  const breadcrumbsHome = () => {
    router.push("/");
  };

  const handleTabChange = (key: string) => {
    setCurrentTab(key);
  };
  const handleTabChange1 = (key: string) => {
    setCurrentTab1(key);
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
            <Breadcrumb className="font-semibold text-3xl py-5 px-64 flex-auto">
              <Breadcrumb.Item>
                <button onClick={breadcrumbsHome}>Home</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>Profile</span>
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
      <div className="container grid cols-2 lg:grid-cols-12 gap-4">
        <div className="col-span-3 border rounded-lg my-5 shadow-lg">
          {DataUser && (
            <div className=" lg:mt-0 flex flex-col items-center w-full lg:w- mx-auto">
              <img
                src={DataUser?.user.profilePictureUrl || "www.default.imageurl"}
                alt="Generic placeholder image"
                className="w-36 h-36 rounded-full mt-4 mb-2 border"
              />
              <h5 className="text-lg my-1">{DataUser?.user.fullName}</h5>
              {DataUser?.gender !== null && (
                <h5 className="text-lg my-1">
                  Gender: {displayGender(DataUser?.user.gender)}
                </h5>
              )}
              <Rating
                size="large"
                name="half-rating-read"
                max={5}
                precision={0.1}
                readOnly
                value={averageRating}
                className="my-1"
              />
              {isOwner ? (
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm bg-[#e7f8ee] rounded-lg text-black px-3 py-1 mt-1 mb-5"
                >
                  <Link href="/edit-profile">Edit profile</Link>
                </button>
              ) : (
                <div className="mb-5"></div>
              )}
            </div>
          )}
        </div>
        <div className="col-span-9 border rounded-lg my-5 shadow-lg">
          {userData && (
            <div className="bg-[#fff] rounded-lg shadow-lg h-full">
              <div className="text-white flex flex-col lg:flex-row rounded-t px-4 lg:p-8">
                <Tabs
                  activeKey={currentTab}
                  onChange={handleTabChange}
                  className="h-auto"
                >
                  <TabPane tab="Biography" key="1">
                    <div className="author-content pl-4 my-auto text-black">
                      <p className="font-semibold text-lg mb-2">Biography</p>
                      <h5 className="text-lg my-1">
                        {DataUser?.user.bioDescription}
                      </h5>
                    </div>
                  </TabPane>
                  <TabPane tab="Specialization" key="2">
                    <div className="author-content pl-4 my-auto ">
                      <p className="font-semibold text-lg mb-2">
                        Specialization
                      </p>
                      {DataUser?.specialization &&
                        DataUser.specialization.map((spec, index) => (
                          <p key={index} className="text-lg my-1 text-black">
                            <div className="flex">
                              <GoDotFill className="flex my-auto mr-2" />
                              {spec.specName}
                            </div>
                          </p>
                        ))}
                    </div>
                  </TabPane>
                  <TabPane tab="Contact" key="3">
                    <div className="author-content pl-4 my-auto">
                      <p className="font-semibold text-lg mb-2">Contact</p>
                      <h5 className="text-lg my-1">
                        <span className="font-bold">Email:</span>{" "}
                        {DataUser?.user.email}
                      </h5>
                      {DataUser?.phoneNumber !== null && (
                        <p className="text-lg my-1">
                          <span className="font-bold">Phone: </span>
                          {DataUser?.user.phoneNumber}
                        </p>
                      )}
                    </div>
                  </TabPane>
                  {isOwner && (
                    <TabPane tab="Payment Information" key="4">
                      <div className="author-content pl-4 my-auto ">
                        <p className="text-lg my-1">
                          <span className="font-bold">PayPal ID: </span>
                          {paypalId}
                        </p>
                        <p className="text-lg my-1">
                          <span className="font-bold">PayPal Address: </span>
                          {paypalAddress}
                        </p>
                      </div>
                    </TabPane>
                  )}
                </Tabs>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <Tabs
          activeKey={currentTab1}
          onChange={handleTabChange1}
          className="h-auto border px-4 rounded-lg "
        >
          <TabPane tab="Course" key="1">
            <div className="text-black min-h-[1000px]">
              <div className="text-black rounded-lg mb-5">
                {loading ? (
                  <div className="text-center text-5xl mt-5">
                    <Spin size="large" />
                  </div>
                ) : (
                  <div className="min-h-[60vh]">
                    {courses.length === 0 ? (
                      <div className="text-center text-2xl mt-8 items-center justify-center">
                        <Empty description={false} />
                        Mentor don&apos;t have any courses.
                      </div>
                    ) : (
                      <div className="min-h-[1000px]">
                        {courses &&
                          courses.length > 0 &&
                          courses.map((item) => (
                            <div className="swiper-container" key={item.id}>
                              <button
                                className="swiper-wrapper mb-3 rounded-lg hover:border-[#309255] hover:bg-[#e7f8ee] w-full"
                                onClick={() => handleClickMoveToCourse(item.id)}
                              >
                                <div className="single-review border border-opacity-20 border-[#30925533] p-7 rounded-md flex flex-col items-start text-start">
                                  <div className="review-author flex ">
                                    <div className="author-thumb border border-[#309255]">
                                      <img
                                        src={item.imageUrl}
                                        alt="Author"
                                        className="w-60 h-44 object-cover min-w-[240px]"
                                      />
                                    </div>
                                    <div className="pl-4">
                                      <h4 className="text-2xl font-medium">
                                        {item.name}
                                      </h4>
                                      <div className="h-2/5 ">
                                        <span className="text-sm">
                                          {item.description}
                                        </span>
                                      </div>
                                      <div className="flex">
                                        <Rating
                                          name="half-rating-read"
                                          defaultValue={item.averageRating}
                                          precision={0.1}
                                          readOnly
                                        />
                                        <span className="">
                                          ({item.totalRatingCount} Reviews)
                                        </span>
                                        {/* <span>{item.totalRatingCount}</span> */}
                                      </div>
                                      <div>
                                        <span className="rating-bar">
                                          {item.totalEnrollment &&
                                            item.totalEnrollment.toLocaleString()}{" "}
                                          Students Joined
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-[#309255] mt-1.5 font-bold text-lg">
                                          {item.price === 0 ? (
                                            <p>Free</p>
                                          ) : (
                                            <>
                                              {item.price &&
                                                item.price.toLocaleString()}{" "}
                                              <span>VND</span>
                                            </>
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>
                          ))}
                        {courses.length > 0 && (
                          <Paginate
                            totalPages={totalPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Reviews" key="2" className="min-h-[1000px]">
            {rating &&
              rating.length > 0 &&
              rating.map((item) => {
                return (
                  <>
                    <div className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-7 rounded-md">
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
                              {item.ratingMentorInfo.timeStamp
                                ? new Date(
                                    item.ratingMentorInfo.timeStamp
                                  ).toLocaleTimeString("en-US")
                                : ""}{" "}
                              {item.ratingMentorInfo.timeStamp
                                ? new Date(
                                    item.ratingMentorInfo.timeStamp
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
                            value={item.ratingMentorInfo.rating1}
                          />
                        </div>
                      </div>
                      {item.ratingMentorInfo.comment === "null" ? (
                        <></>
                      ) : (
                        <p className="mt-3 font-semibold text-[#52565b] ">
                          {item.ratingMentorInfo.comment}
                        </p>
                      )}
                    </div>
                  </>
                );
              })}
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
