"use client";
import React from "react";
import "../../app/./globals.css";
import regisInstructorStyle from "./styles/style.module.scss";
import Link from "next/link";


const RegisInstructor = () => {
  return (
    // <!-- Call to Action Start -->
    <div className="section section-padding-02">
      <div className="container">
        {/* <!-- Call to Action Wrapper Start --> */}
        <div className={`${regisInstructorStyle.call_to_action_wrapper}`}>
          {/* <img className="cat-shape-01 animation-round" src="assets/images/shape/shape-12.png" alt="Shape">
                    <img className="cat-shape-02" src="assets/images/shape/shape-13.svg" alt="Shape">
                    <img className="cat-shape-03 animation-round" src="assets/images/shape/shape-12.png" alt="Shape"> */}

          <div className={`${regisInstructorStyle.call_to_action_grid}`}>
            <div className="">
              {/* <!-- Section Title Start --> */}
              <div className="section-title shape-02">
                <h5 className="sub-title">Become A Instructor</h5>
                <h2 className="main-title">
                  You can join with Edule as <span>a instructor?</span>
                </h2>
              </div>
              {/* <!-- Section Title End --> */}
            </div>
            <div className={`${regisInstructorStyle.call_to_action_row}`}>
              <button className={`${regisInstructorStyle.call_to_action_btn}`}>
                <Link
                  className={`${regisInstructorStyle.regis_btn}`}
                  href="/"
                >
                  Drop Information
                </Link>
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Call to Action Wrapper End --> */}
      </div>
    </div>
  );
};

export default RegisInstructor;
