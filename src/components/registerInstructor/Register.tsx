"use client";
import React, { useState } from "react";
import "../../app/./globals.css";
import regisInstructorStyle from "./styles/style.module.scss";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { RegisterForm } from "../registerForm";
import { Modal } from "antd";
import { UserAuth } from "@/app/context/AuthContext";

const RegisInstructor = () => {
  const [visible, setVisible] = useState(false);

  const { user, googleSignIn, logOut } = UserAuth();

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
                  You can join with LearnConnect as <span>a instructor?</span>
                </h2>
              </div>
              {/* <!-- Section Title End --> */}
            </div>
            <div className={`${regisInstructorStyle.call_to_action_row}`}>
              <div className={`${regisInstructorStyle.call_to_action_btn}`}>
                {!user ? (
                  <Link
                    className={`${regisInstructorStyle.regis_btn}`}
                    href="/login"
                  >
                    Drop Information
                  </Link>
                ) : (
                  <Button
                    className={`${regisInstructorStyle.regis_btn}`}
                    onClick={() => {
                      Modal.confirm({
                        title: "Register Mentor Form",
                        content: (
                          <RegisterForm
                            visible={visible}
                            setVisible={setVisible}
                            onCancel={() => {
                              setVisible(false);
                            }}
                            isEdit={false}
                          />
                        ),
                      });
                    }}
                  >
                    Drop Information
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Call to Action Wrapper End --> */}
      </div>
    </div>
  );
};

export default RegisInstructor;
