"use client";
import Link from "next/link";
import ".././globals.css";
import { UserAuth } from "../context/AuthContext";
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
export default function ProfileUser() {
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
  const { TabPane } = Tabs;
  const { userData, id, jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  const [currentTab, setCurrentTab] = useState("1");
  const [averageRating, setAverageRating] = useState(0);
  const [paypalId, setPaypalId] = useState(0);
  const [paypalAddress, setPaypalAddress] = useState("");
  const [DataUser, SetDataUser] = useState<User>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await http.get(
          // `https://learnconnectapi.azurewebsites.net/api/user/${id}`
          `https://learnconnectapi.azurewebsites.net/api/mentor/get-info/${id}`
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
      <div className="min-h-[600px]">
        <div className="container grid cols-2 lg:grid-cols-12 gap-4">
          <div className="col-span-3 border rounded-lg my-5 shadow-lg">
            {userData && (
              <div className=" lg:mt-0 flex flex-col items-center w-full lg:w-36 mx-auto">
                <img
                  src={userData?.profilePictureUrl || "www.default.imageurl"}
                  alt="Generic placeholder image"
                  className="w-36 h-36 rounded-full mt-4 mb-2"
                />
                <h5 className="text-lg my-1">{userData?.fullName}</h5>
                {DataUser?.gender !== null && (
                  <h5 className="text-lg my-1">
                    Gender: {displayGender(userData?.gender)}
                  </h5>
                )}
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm bg-[#e7f8ee] rounded-lg text-black px-3 py-1 mt-1 mb-5"
                >
                  <Link href="/edit-profile">Edit profile</Link>
                </button>
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
                          {userData?.bioDescription}
                        </h5>
                      </div>
                    </TabPane>
                    <TabPane tab="Contact" key="2">
                      <div className="author-content pl-4 my-auto">
                        <p className="font-semibold text-lg mb-2">Contact</p>
                        <h5 className="text-lg my-1">
                          <span className="font-bold">Email:</span>{" "}
                          {userData?.email}
                        </h5>
                        {userData?.phoneNumber !== null && (
                          <p className="text-lg my-1">
                            <span className="font-bold">Phone: </span>
                            {userData?.phoneNumber}
                          </p>
                        )}
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
