"use client";
import { UserAuth } from "@/app/context/AuthContext";
import { Course } from "@/components/courses/courses";
import LeftNavbar from "@/components/left-navbar/page";

const DetailsContent = ({ params }: any) => {
  const idCourse = params.id;

  return (
    <div className="flex">
      <LeftNavbar
        page1={"/staff-page"}
        page2={"#"}
        page3={"/staff-page/staff-report"}
        page4={"/staff-page/moderation"}
      />
      {/* <StaffRatingTable />áhkfjaskf */}
      áafasfsaf
    </div>
  );
};

export default DetailsContent;
