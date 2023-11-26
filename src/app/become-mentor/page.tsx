"use client";

import { RegisterForm } from "@/components/registerForm";
import { useRouter } from "next/navigation";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";

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
  return (
    <>
      <RegisterForm />
    </>
  );
}
