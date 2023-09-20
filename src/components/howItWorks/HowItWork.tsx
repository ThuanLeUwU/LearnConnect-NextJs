"use client";
import React from "react";
import "../../app/./globals.css";
import HIWStyle from "./styles/style.module.scss";
import Image from "next/image";

const HowItWork = () => {
  const contents = [
    {
      title: "Find Your Course",
      content: "It has survived not only centurie also leap into electronic.",
    },
    {
      title: "Find Your Course",
      content: "It has survived not only centurie also leap into electronic.",
    },
    {
      title: "Find Your Course",
      content: "It has survived not only centurie also leap into electronic.",
    },
  ];

  return (
    <div className="section section-padding mt-n1">
      <div className="container">
        {/* <!-- Section Title Start --> */}
        <div className="section-title shape-03 text-center">
          <h5 className="sub-title">Over 1,235+ Course</h5>
          <h2 className="main-title">
            How It <span> Work?</span>
          </h2>
        </div>
        {/* <!-- Section Title End --> */}

        {/* <!-- How it Work Wrapper Start --> */}
        <div className={`${HIWStyle.how_it_work_wrapper}`}>
          {/* <!-- Single Work Start --> */}
          <div className={`${HIWStyle.single_work}`}>
            {/* <img className="shape-1" src="assets/images/shape/shape-15.png" alt="Shape"> */}

            <div className="work-icon">
              <i className="flaticon-transparency"></i>
            </div>
            <div className={`${HIWStyle.single_work_content}`}>
              <h3 className={`${HIWStyle.single_work_title}`}>
                Find Your Course
              </h3>
              <p>
                It has survived not only centurie also leap into electronic.
              </p>
            </div>
          </div>
          {/* <!-- Single Work End --> */}

          {/* <!-- Single Work Start --> */}
          <div className="work-arrow">
            <Image width={50}
             height={21} src="/images/shape-17.png" alt="Shape"/>
          </div>
          {/* <!-- Single Work End --> */}

          {/* <!-- Single Work Start --> */}
          <div className={`${HIWStyle.single_work}`}>
            {/* <img className="shape-1" src="assets/images/shape/shape-15.png" alt="Shape"> */}

            <div className="work-icon">
              <i className="flaticon-transparency"></i>
            </div>
            <div className={`${HIWStyle.single_work_content}`}>
              <h3 className={`${HIWStyle.single_work_title}`}>
                Find Your Course
              </h3>
              <p>
                It has survived not only centurie also leap into electronic.
              </p>
            </div>
          </div>
          {/* <!-- Single Work End --> */}

          {/* <!-- Single Work Start --> */}
          <div className="work-arrow">
            {/* <img className="arrow" src="assets/images/shape/shape-17.png" alt="Shape"> */}
          </div>
          {/* <!-- Single Work End --> */}

          {/* <!-- Single Work Start --> */}
          <div className={`${HIWStyle.single_work}`}>
            {/* <img className="shape-1" src="assets/images/shape/shape-15.png" alt="Shape"> */}

            <div className="work-icon">
              <i className="flaticon-transparency"></i>
            </div>
            <div className={`${HIWStyle.single_work_content}`}>
              <h3 className={`${HIWStyle.single_work_title}`}>
                Find Your Course
              </h3>
              <p>
                It has survived not only centurie also leap into electronic.
              </p>
            </div>
          </div>
          {/* <!-- Single Work End --> */}
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
