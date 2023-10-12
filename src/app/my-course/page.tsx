"use client";
import ".././globals.css";
import CourseItem from "@/components/course-item/course";
import Paginate from "@/components/pagination/pagination";
const MyCourse = () => {
  return (
    <div className="container">
      <div className="grid cols-2 lg:grid-cols-12 pt-[30px]">
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </div>
      <Paginate />
    </div>
  );
};

export default MyCourse;
