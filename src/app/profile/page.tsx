"use client";
import Link from "next/link";
import ".././globals.css";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "antd";
// import { User } from "firebase/auth";

export type User = {
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
  const { userData, id, jwtToken } = UserAuth();
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  // console.log("data:", userData?.fullName);
  // console.log("picture :", userData?.profilePictureUrl);
  const [DataUser, SetDataUser] = useState<User>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/user/${id}`
        );
        SetDataUser(response.data);
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
      <div className="container">
        {userData && (
          <section className="bg-gradient-to-b">
            <div className="py-5">
              <div className=" container">
                <div className="max-w-[1200px]">
                  <div className="bg-[#fff] rounded-lg shadow-lg">
                    <div className="bg-[#309255] text-white flex flex-col lg:flex-row rounded-t p-4 lg:p-8">
                      <div className="lg:mr-4 lg:mt-0 flex flex-col items-center w-full lg:w-36">
                        <img
                          src={
                            userData?.profilePictureUrl ||
                            "www.default.imageurl"
                          }
                          alt="Generic placeholder image"
                          className="w-36 h-36 rounded-full mt-4 mb-2"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-dark btn-sm bg-[#e7f8ee] rounded-lg text-black px-3 py-1 mt-1"
                        >
                          <Link href="/edit-profile">Edit profile</Link>
                        </button>
                      </div>
                      <div className="author-content pl-4 my-auto">
                        <h5 className="text-lg my-1">
                          Full Name: {DataUser?.fullName}
                        </h5>
                        <h5 className="text-lg my-1">
                          Email: {DataUser?.email}
                        </h5>
                        {DataUser?.gender !== null && (
                          <h5 className="text-lg my-1">
                            Gender: {displayGender(DataUser?.gender)}
                          </h5>
                        )}
                        {DataUser?.phoneNumber !== null && (
                          <p className="text-lg my-1">
                            Phone: {DataUser?.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="card-body p-4 text-black min-h-[1000px]">
                      <div className="mb-5">
                        <p className="font-semibold text-lg mb-2">Biography</p>
                        <div className="p-4 bg-gray-200">
                          <p className="italic mb-1">
                            {DataUser?.bioDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
