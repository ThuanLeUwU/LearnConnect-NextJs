"use client";
import { UserAuth } from "@/app/context/AuthContext";
import LeftNavbar from "@/components/left-navbar/page";
import StaffReportTable from "@/components/staff-report-table/page";
import { Spin } from "antd";

const StaffRating = () => {
  const { id, userData } = UserAuth();
  return (
    <>
      {!userData ? (
        <div className="text-center text-5xl mt-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex w-full">
          <LeftNavbar
            page1={"#"}
            page2={"/staff-page/staff-rating"}
            page3={"/staff-page/staff-report"}
            page4={"/staff-page/moderation"}
            page5={"/staff-page/list-major"}
            page6={"/staff-page/staff-revenue"}
          />
          <StaffReportTable />
        </div>
      )}
    </>
  );
};

export default StaffRating;
