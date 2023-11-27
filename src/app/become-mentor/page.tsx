"use client";

import { RegisterForm } from "@/components/registerForm";
import { useRouter } from "next/navigation";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Breadcrumb } from "antd";

export default function EditProfile() {
  const router = useRouter();
  const { role } = UserAuth();
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

  const breadcrumbsHome = () => {
    router.push("/");
  };

  return (
    <>
      <div className="bg-[#e7f8ee]">
        <div
          className="bg-no-repeat flex flex-row justify-between"
          style={{
            backgroundImage: "url('/images/shape-23.png')",
            backgroundPosition: "bottom left",
          }}
        >
          <div>
            <div className="-translate-y-9 px-40">
              <img
                className="animation-round "
                src="/images/shape-8.png"
                alt="Shape"
              ></img>
            </div>
            <Breadcrumb className="font-semibold text-3xl pb-5 pl-36 -translate-y-3">
              <Breadcrumb.Item>
                <button onClick={breadcrumbsHome}>Home</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>Become A Mentor</span>
              </Breadcrumb.Item>
            </Breadcrumb>{" "}
          </div>
          <div
            className="w-2/5 bg-auto bg-no-repeat bg-right-top"
            style={{
              backgroundImage: "url('/images/shape-24.png')",
            }}
          />
        </div>
      </div>
      <RegisterForm />
    </>
  );
}
