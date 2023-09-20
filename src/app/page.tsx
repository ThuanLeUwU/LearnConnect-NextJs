import HowItWork from "@/components/howItWorks/HowItWork";
import RegisInstructor from "@/components/registerInstructor/Register";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <>
      <RegisInstructor />
      <HowItWork />
    </>
  );
}
