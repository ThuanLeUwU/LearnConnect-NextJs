"use client";
import Link from "next/link";
import ".././globals.css";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "firebase/auth";

export default function ProfileUser() {
  const { user, googleSignIn, logOut } = UserAuth();
  let token = user && user.accessToken ? user.accessToken : null; //cho nay` eo loi do thg db ts
  console.log("token nef", token);
  const [userToken, setUserToken] = useState<User>();
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.post(
        `https://learnconnectapitest.azurewebsites.net/api/user/login?accessToken=${token}`
      );
      setUserToken(responseData?.data);
      console.log("userToken", userToken);
      const api_token = userToken.data;
      var jwt = require("jsonwebtoken");
      var decoded = jwt.decode(api_token);
      console.log("decoded", decoded);
    };
    console.log("token ne", token);
    fetchData();
  }, []);
  console.log("token ne", token);
  console.log("userToken", userToken);

  return (
    <div className="container">
      <section className="bg-gradient-to-b">
        <div className="py-5">
          <div className="flex justify-center items-center">
            <div className="max-w-[1200px]">
              <div className="bg-[#fff] rounded-lg shadow-lg">
                <div className="bg-[#309255] text-white flex flex-col lg:flex-row rounded-t p-4 lg:p-8">
                  <div className="lg:mr-4 lg:mt-0 flex flex-col items-center w-full lg:w-36">
                    <img
                      src={user?.photoURL || "www.default.imageurl"}
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
                    <h5 className="text-lg">{user?.displayName}</h5>
                    <p>{user?.email}</p>
                  </div>
                </div>
                <div className="p-4 text-black bg-gray-200">
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
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="font-semibold text-lg mb-2">About</p>
                    <div className="p-4 bg-gray-200">
                      <p className="italic mb-1">Web Developer</p>
                      <p className="italic mb-1">Lives in New York</p>
                      <p className="italic mb-0">Photographer</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-lg mb-0">Recent photos</p>
                    <p className="mb-0">
                      <Link href="#!" className="text-gray-500">
                        Show all
                      </Link>
                    </p>
                  </div>
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
    </div>
  );
}
