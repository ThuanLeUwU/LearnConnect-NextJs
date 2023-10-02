"use client"
import BrandSupport from "@/components/brand/brand";
import Courses from "@/components/courses/courses";
import HowItWork from "@/components/howItWorks/HowItWork";
import RegisInstructor from "@/components/registerInstructor/Register";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <>
      <Courses/>
      <RegisInstructor />
      <HowItWork />
      <BrandSupport/>
    </>
  );
}
