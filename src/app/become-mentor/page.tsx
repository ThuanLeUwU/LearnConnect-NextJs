"use client";

import { RegisterForm } from "@/components/registerForm";
import { useRouter } from "next/navigation";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Breadcrumb } from "antd";
import Loading from "@/components/loading/loading";

export default function BecomeMentor() {
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
    if (role === -1) {
      router.push(`/`);
    }
  });

  const breadcrumbsHome = () => {
    router.push("/");
  };

  return !role ? (
    <Loading />
  ) : (
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
                <span>Become A Mentor</span>
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
      <RegisterForm />
    </>
  );
}
