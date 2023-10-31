"use client";
import Image from "next/image";
import styles from "../login/styles.module.scss";
import { UserAuth } from "@/app/context/AuthContext";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "firebase/auth";

export default function LoginPage() {
  const { user, token, googleSignIn, logOut } = UserAuth();
  // console.log("token is :" , token);

  const router = useRouter();
  // let token = user && user.accessToken ? user.accessToken : null; //cho nay` eo loi do thg db ts
  // console.log("token nef", token);
  // console.log("User i4", user);
  // console.log("token", user); // Check if user exists before accessing accessToken

  const handleSignIn = async () => {
    try {
      googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user);
  return (
    <div className={styles["main-wrapper"]}>
      <div className="bg-[#fff]">
        <div className="container mx-auto max-w-screen-xl py-20">
          <div className="grid lg:grid-cols-2 pt-6 px-10 pb-16 border border-solid border-opacity-20 border-[#30925533] rounded-10">
            <div className="mx-auto pt-16">
              <img src="/register-login.png" alt="Shape" />
            </div>
            <div className="">
              <div className="mx-auto max-w-md">
                <h3 className="text-[30px] font-medium text-[#212832] px-10 pt-32">
                  Login <span className="text-[#309255]">Now</span>
                </h3>
                <div className="pt-8">
                  <form action="#">
                    <div className={styles["single-form"]}>
                      <input type="email" placeholder="Username or Email" />
                    </div>
                    <div className={styles["single-form"]}>
                      <input type="password" placeholder="Password" />
                    </div>
                    <div className={styles["single-form"]}>
                      <button className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-[#309255] text-white hover:bg-black btn-hover-dark w-full transition-all duration-300 ease-in-out delay-0 my-2">
                        Login
                      </button>
                      {!user ? (
                        <a
                          className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-white text-[#309255] hover:bg-[#309255] btn-outline w-full border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                          href="#"
                          onClick={handleSignIn}
                        >
                          Login with Google
                        </a>
                      ) : (
                        <div>
                          <a
                            onClick={handleSignOut}
                            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-white text-[#309255] hover:bg-[#309255] btn-outline w-full border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                          >
                            Logout
                          </a>
                          <p className="text-black ">
                            Wellcome, {user.displayName}
                          </p>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
