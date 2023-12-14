"use client";
import styles from "../login/styles.module.scss";
import { UserAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import UnProtectWrapper from "@/components/wrapper/UnProtecWrapper";
import { http } from "@/api/http";
import { Breadcrumb, Spin } from "antd";
import { toast } from "sonner";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoginPage() {
  const { googleSignIn, logOut, setUserLogin, role } = UserAuth();
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleSignInLoading, setGoogleSignInLoading] = useState(false);
  // axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    } finally {
      setLoading(false);
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
    setIsFetching(true);
    try {
      setLoading(true);
      const response = await http.post(
        "https://learnconnectapi.azurewebsites.net/api/user/login-by-email",
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

  const [isFetching, setIsFetching] = useState(false);

  const handleSignInEmailPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please Input Email");
    } else if (!password) {
      setErrorMessage("Please Input Password");
    } else {
      try {
        setIsFetching(true);
        setLoading(true);
        const response = await loginByEmail(email, password);
        const decodedToken = jwt.decode(response);
        let userData;
        const fetchUser = async (userId: string) => {
          const responseUser = await axios.get(
            `https://learnconnectapi.azurewebsites.net/api/user/${userId}`,
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
        setErrorMessage("Email or Password is not correct!!!");
        console.error("An error occurred while logging in:", error);
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSignInEmailPassword(e);
  };
  return (
    <UnProtectWrapper>
      <>
        <div className="bg-[#e7f8ee]">
          <div
            className="bg-no-repeat bg-auto flex flex-row justify-between"
            style={{
              backgroundImage: "url('/images/shape-23.png')",
            }}
          >
            <div>
              <Breadcrumb className="font-semibold text-2xl py-5 px-64 flex-auto">
                <Breadcrumb.Item>
                  <span>{""}</span>
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
        <div className={styles["main-wrapper"]}>
          <div className="bg-[#fff]">
            <div className="container mx-auto max-w-screen-xl py-20">
              {/* {loading ? (
                <div className="text-center text-5xl mt-5">
                  <Spin size="large" />
                </div>
              ) : ( */}
              <div className="grid lg:grid-cols-2 pt-6 px-10 pb-16 border border-solid border-opacity-20 border-[#30925533] rounded-10">
                <div className="mx-auto pt-16">
                  <img src="/images/loginImage.png" alt="Shape" />
                </div>
                <div className="">
                  <div className="mx-auto max-w-md">
                    <h3 className="text-[30px] font-medium text-[#212832] px-10 pt-32">
                      Login <span className="text-[#309255]">Now</span>
                    </h3>
                    <div className="pt-8">
                      <form onSubmit={handleFormSubmit}>
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
                          {loading ? (
                            <button
                              className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-2 px-3 leading-normal no-underline bg-[#309255] text-white hover:bg-black btn-hover-dark w-full transition-all duration-300 ease-in-out delay-0 my-2"
                              onClick={handleSignInEmailPassword}
                              type="submit"
                              disabled={loading}
                            >
                              <Box
                                sx={{ display: "flex justify-center mx-auto" }}
                              >
                                <CircularProgress />
                              </Box>
                            </button>
                          ) : (
                            <button
                              className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-[#309255] text-white hover:bg-black btn-hover-dark w-full transition-all duration-300 ease-in-out delay-0 my-2"
                              onClick={handleSignInEmailPassword}
                              type="submit"
                              disabled={loading}
                            >
                              Login
                            </button>
                          )}
                        </div>
                      </form>
                      {loading ? (
                        <button
                          className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-2 px-3 leading-normal no-underline bg-white text-[#309255] hover:bg-[#309255] btn-outline w-full border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                          onClick={handleSignIn}
                        >
                          <Box sx={{ display: "flex justify-center mx-auto" }}>
                            <CircularProgress />
                          </Box>
                        </button>
                      ) : (
                        <button
                          className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-white text-[#309255] hover:bg-[#309255] btn-outline w-full border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                          onClick={handleSignIn}
                        >
                          Login with Google
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </>
    </UnProtectWrapper>
  );
}
