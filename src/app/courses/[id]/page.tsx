"use client";
import { Payment } from "@/components/payment";
import { Modal } from "antd";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Course } from "@/components/courses/courses";
import CourseDetailPage from "@/app/course-detail/page";
import { UserAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CourseDetail({ params }: any) {
  const router = useRouter();
  const { id, user, role } = UserAuth();
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
      <CourseDetailPage />
    </>
  );
}
