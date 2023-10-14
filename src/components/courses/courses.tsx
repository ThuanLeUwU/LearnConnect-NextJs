"use client";
import React, { useEffect, useState } from "react";
import "../../app/./globals.css";
import CourseStyle from "./styles/style.module.scss";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Paginate from "../pagination/pagination";
import useDataFetcher from "../pagination/useDataFetcher";

export type Course = {
  id: string | number;
  name: string;
  description: string;
  shortDescription: string;
  difficultyLevel: string;
  imageUrl: string;
  price: number;
  rating: number;
  categoryId: number | string;
  contentLength: number;
};

const Courses = () => {
  // const [rating, setRating] = useState(0);
  // const handleStarClick = (nextValue, prevValue, name) => {
  //    setRating(nextValue);
  // }
  // const { loading, courses, totalPages, currentPage, setCurrentPage } =
  //   useDataFetcher();
  const [courses, setCourses] = useState<Course[]>([]);

  console.log("course", courses);
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await axios.get(
        `https://learnconnectapitest.azurewebsites.net/api/Course`
      );
      setCourses(responseData?.data);
    };
    fetchData();
  }, []);

  const courseMenu = [
    {
      id: 1,
      author: "Jason Williams",
      category: "Science",
      title: "Data Science and Machine Learning with Python - Hands On!",
      time: "08 hr 15 mins",
      lesson: "29 Lectures",
      price: "$440.00",
      sale: "$385.00",
      image: "/images/courses-01.jpg",
    },
    {
      id: 2,
      author: "Jason Williams",
      category: "Science",
      title: "Data Science and Machine Learning with Python - Hands On!",
      time: "08 hr 15 mins",
      lesson: "29 Lectures",
      price: "$440.00",
      sale: "$385.00",
      image: "/images/courses-01.jpg",
    },
    {
      id: 3,
      author: "Jason Williams",
      category: "Science",
      title: "Data Science and Machine Learning with Python - Hands On!",
      time: "08 hr 15 mins",
      lesson: "29 Lectures",
      price: "$440.00",
      sale: "$385.00",
      image: "/images/courses-01.jpg",
    },
  ];

  // console.log("coursetest,id",courseMenu)

  return (
    <div className="section section-padding-02">
      <div className="container">
        {/* <!-- All Courses Top Start --> */}
        <div className="courses-top">
          {/* <!-- Section Title Start --> */}
          <div className="section-title shape-01">
            <h2 className="main-title">
              All <span>Courses</span> of Edule
            </h2>
          </div>
          {/* <!-- Section Title End --> */}
        </div>
        {/* <!-- All Courses Top End --> */}

        {/* <!-- All Courses tab content Start --> */}
        {/* <div className="tab-content courses-tab-content"> */}
        {/* <div className="tab-pane fade show active" id="tabs1"> */}
        {/* <!-- All Courses Wrapper Start --> */}
        <div className={`${CourseStyle.courses_wrapper}`}>
          <div className={`${CourseStyle.courses_grid}`}>
            {/* {courses.map((item) => {
              return <div key={item.id}>{item.description}</div>;
            })} */}

            {courses.map((item) => {
              return (
                // <>
                <div key={item.id}>
                  {/* <!-- Single Courses Start --> */}
                  <div className={`${CourseStyle.single_courses}`}>
                    <div className={`${CourseStyle.single_courses_image}`}>
                      <Link href="/course-detail">
                        <Image
                          // width={100}
                          // height={100}
                          //   objectFit="contain"
                          layout="fill"
                          className={`${CourseStyle.single_courses_image_details}`}
                          src={item.imageUrl}
                          alt="Courses"
                        />
                      </Link>
                    </div>
                    <div className={`${CourseStyle.single_courses_content}`}>
                      <div className={`${CourseStyle.single_courses_author}`}>
                        <div className="author">
                          <div className="author-thumb">
                            <Link href="/course-detail">
                              {/* <img
                                  src="assets/images/author/author-01.jpg"
                                  alt="Author"
                                /> */}
                            </Link>
                          </div>
                          <div className="author-name">
                            <Link className="name" href="#">
                              {item.name}
                            </Link>
                          </div>
                        </div>
                        <div className={`${CourseStyle.single_courses_tag}`}>
                          <Link href="#">{item.categoryId}</Link>
                        </div>
                      </div>

                      <h4 className="title">
                        <Link
                          href="/course-detail"
                          className={`${CourseStyle.single_courses_title}`}
                        >
                          {item.description}
                        </Link>
                      </h4>
                      <div className={`${CourseStyle.single_courses_timeline}`}>
                        <span>
                          {" "}
                          {/* <i className="icofont-clock-time"></i>  */}
                          {item.difficultyLevel}
                        </span>
                        <span>
                          {" "}
                          <i className="icofont-read-book"></i>{" "}
                          {item.contentLength}{" "}
                        </span>
                      </div>
                      <div className={`${CourseStyle.single_courses_price}`}>
                        <div className="courses-price">
                          <span
                            className={`${CourseStyle.single_courses_price_sale}`}
                          >
                            {/* {item.sale} */}
                          </span>
                          <span className="old-parice">${item.price}</span>
                        </div>
                        <div className="courses-review">
                          {/* <span className="rating-count">4.9</span> */}
                          {/* <Rating
                            value={rating}
                            onStarClick={(nextValue, prevValue, name) =>
                              handleStarClick(nextValue, prevValue, name)
                            }
                            starCount={5}
                            starColor={"#ffb400"}
                            emptyStarColor={"#ccc"}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Single Courses End --> */}
                </div>
                // </>
              );
            })}
          </div>
          {/* <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          /> */}
        </div>
        {/* <!-- All Courses Wrapper End --> */}

        {/* <!-- All Courses BUtton Start --> */}
        <div className={`${CourseStyle.course_btn}`}>
          <Link
            href="/listCourses"
            className={`${CourseStyle.course_btn_more}`}
          >
            Show More
          </Link>
        </div>
        {/* <!-- All Courses BUtton End --> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Courses;
