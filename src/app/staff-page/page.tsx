"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import {
  Box,
  Card,
  Link,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import InstructorCourseStyle from "./styles.module.scss";
import { toast } from "sonner";
import { Spin } from "antd";
import LeftNavbar from "@/components/left-navbar/page";
import MentorRequest from "@/components/mentor-request/page";
import CourseDetail from "../courses/[id]/page";
const StaffPage = () => {
  const [selectedComponent, setSelectedComponent] = useState("MentorRequest");

  return (
    <div className="flex w-full">
      <LeftNavbar
        page1={"#"}
        page2={"/staff-page/staff-rating"}
        page3={"/staff-page/staff-report"}
        page4={"/staff-page/moderation"}
        page5={"/staff-page/list-major"}
      />
      <MentorRequest />
    </div>
  );
};

export default StaffPage;
