"use client";
import { Payment } from "@/components/payment";
import { Modal } from "antd";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Course } from "@/components/courses/courses";
import CourseDetailPage from "@/app/course-detail/page";

export default function CourseDetail({ params }: any) {
  return (
    <>
      <CourseDetailPage />
    </>
  );
}
