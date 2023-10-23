"use client";
import Courses from "@/components/courses/courses";
import ".././globals.css";
import CourseItem from "@/components/course-item/course";
const ListCourse = () => {
  return (
    // <div className="container">
    //   <div className="grid cols-2 lg:grid-cols-12 pt-[30px]">
    //     <CourseItem />
    //     <CourseItem />
    //     <CourseItem />
    //     <CourseItem />
    //     <CourseItem />
    //     <CourseItem />
    //     <CourseItem />
    //     <CourseItem />
    //     <CourseItem />
    //     <CourseItem />
    //     <CourseItem />
    //     <CourseItem />
    //     <CourseItem />
    //     <CourseItem />
    //   </div>
    // </div>
    <Courses imageUrl={""} name={""} description={""} id={""} />
  );
};

export default ListCourse;
