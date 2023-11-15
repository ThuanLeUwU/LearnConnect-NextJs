"use client";
import Link from "next/link";
import ".././globals.css";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
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
  // const [DataUser, SetDataUser] = useState<User>();
  // const [fetchedUserData, setFetchedUserData] = useState<User | null>(null);
  // useEffect(() => {
  //   // Fetch updated user data upon component mount
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://learnconnectapitest.azurewebsites.net/api/user/${id}`
  //       );
  //       console.log(
  //         `https://learnconnectapitest.azurewebsites.net/api/user/${id}`
  //       );
  //       setFetchedUserData(response.data);
  //     } catch (error) {
  //       // Handle error
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   fetchUserData();
  // }, [id]);
  // console.log("Gender", DataUser?.gender);

  const displayGender = (gender: number | undefined) => {
    if (gender === 1) {
      return "Male";
    } else if (gender === 2) {
      return "Female";
    } else if (gender === 3) {
      return "Other";
    } else {
      return "Not specified";
    }
  };

  return (
    <div className="container">
      {userData && (
        <section className="bg-gradient-to-b">
          <div className="py-5">
            <div className="flex justify-center items-center">
              <div className="max-w-[1200px]">
                <div className="bg-[#fff] rounded-lg shadow-lg">
                  <div className="bg-[#309255] text-white flex flex-col lg:flex-row rounded-t p-4 lg:p-8">
                    <div className="lg:mr-4 lg:mt-0 flex flex-col items-center w-full lg:w-36">
                      <img
                        src={
                          userData?.profilePictureUrl || "www.default.imageurl"
                        }
                        alt="Generic placeholder image"
                        className="w-36 h-36 rounded-full mt-4 mb-2"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                      >
                        <Link href="/edit-profile">Edit profile</Link>
                      </button>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ms-3">
                      <h5 className="text-lg my-1">
                        Full Name: {DataUser?.fullName}
                      </h5>
                      <h5 className="text-lg my-1">Email: {DataUser?.email}</h5>
                      <h5 className="text-lg my-1">
                        Gender: {displayGender(DataUser?.gender)}
                      </h5>
                      <p className="text-lg my-1">
                        Phone: {DataUser?.phoneNumber}
                      </p>
                      {/* <p>Role: {userData?.role}</p> */}
                      {/* <p>Bio: {userData?.bioDescription}</p> */}
                      {/* <p>Phone: {userData?.status}</p>
                      <p>Phone: {userData?.profilePictureUrl}</p> */}
                    </div>
                  </div>
                  {/* <div className="p-4 text-black bg-gray-200">
                    <div className="flex justify-center lg:justify-end text-center py-2 lg:py-1">
                      <div className="px-3">
                        <p className="mb-1 text-lg">253</p>
                        <p className="text-sm text-gray-500 mb-0">Photos</p>
                      </div>
                      <div className="px-3">
                        <p className="mb-1 text-lg">1026</p>
                        <p className="text-sm text-gray-500 mb-0">Followers</p>
                      </div>
                      <div className="px-3">
                        <p className="mb-1 text-lg">478</p>
                        <p className="text-sm text-gray-500 mb-0">Following</p>
                      </div>
                    </div>
                  </div> */}
                  <div className="card-body p-4 text-black">
                    <div className="mb-5">
                      <p className="font-semibold text-lg mb-2">
                        Bio Description
                      </p>
                      <div className="p-4 bg-gray-200">
                        <p className="italic mb-1">
                          {DataUser?.bioDescription}
                        </p>
                      </div>
                    </div>
                    {/* {/* <div className="flex justify-between items-center mb-4">
                      <p className="font-semibold text-lg mb-0">
                        Recent photos
                      </p>
                      <p className="mb-0">
                        <Link href="#!" className="text-gray-500">
                          Show all
                        </Link>
                      </p>
                    </div> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                          alt="image 1"
                          className="w-full rounded-lg"
                        />
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
  );
}
