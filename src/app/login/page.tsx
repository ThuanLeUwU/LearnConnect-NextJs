"use client";
import styles from "../login/styles.module.scss";
import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import jwt from "jsonwebtoken";

export default function LoginPage() {
  const { user, jwtToken, googleSignIn, logOut, setUserLogin } = UserAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

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

  const loginByEmail = async (email, password) => {
    try {
      const response = await axios.post(
        "https://learnconnectapitest.azurewebsites.net/api/user/login-by-email",
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const token = response.data.data;
      return token;
    } catch (error) {
      setErrorMessage("Email or Password is not correct!!!");
      console.error("An error occurred while logging in:", error);
      throw error;
    }
  };

  const handleSignInEmailPassword = async () => {
    if (!email) {
      setErrorMessage("Please Input Email");
    } else if (!password) {
      setErrorMessage("Please Input Password");
    } else {
      try {
        const response = await loginByEmail(email, password);
        const decodedToken = jwt.decode(response);
        let userData;
        const fetchUser = async (userId: string) => {
          const responseUser = await axios.get(
            `https://learnconnectapitest.azurewebsites.net/api/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${response}`,
              },
            }
          );
          userData = responseUser?.data;
        };
        await fetchUser(decodedToken?.Id);
        setUserLogin(userData, response);
      } catch (error) {
        console.error("An error occurred while logging in:", error);
      }
    }
  };
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
                  <form>
                    <div className={styles["single-form"]}>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />{" "}
                    </div>
                    <div className={styles["single-form"]}>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />{" "}
                    </div>
                    <div className="mt-5 text-red-500 text-lg">
                      {errorMessage}
                    </div>
                    <div className={styles["single-form"]}>
                      <a
                        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-[#309255] text-white hover:bg-black btn-hover-dark w-full transition-all duration-300 ease-in-out delay-0 my-2"
                        onClick={handleSignInEmailPassword}
                      >
                        Login
                      </a>

                      <a
                        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-white text-[#309255] hover:bg-[#309255] btn-outline w-full border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                        href="#"
                        onClick={handleSignIn}
                      >
                        Login with Google
                      </a>
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
