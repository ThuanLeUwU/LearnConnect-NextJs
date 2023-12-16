"use client";
import headerStyles from "./styles/styles.module.scss";
import React, { useState, useEffect } from "react";
import "../app/./globals.css";
import Link from "next/link";
import axios from "axios";

const Footer = () => {
  const [category, setCategory] = useState([]);

  // console.log("category", category);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const responseData = await axios.get(
  //       `https://learnconnectapi.azurewebsites.net/api/Category`
  //     );
  //     setCategory(responseData?.data);
  //   };
  //   fetchData();
  // }, []);

  return (
    // <!-- Footer Start  -->
    <div className={`${headerStyles.footer_section}`}>
      {/* <!-- Footer Widget Section Start --> */}
      <div className={`${headerStyles.footer_widget_section}`}>
        {/* <img
          className="shape-1 animation-down"
          src="/images/shape-21.png"
          alt="Shape"
        /> */}

        <div className="container">
          <div className="flex flex-row justify-between py-5">
            <div className={`flex flex-col justify-center gap-4`}>
              <div className={`${headerStyles.footer_widget_address}`}>
                <h4 className={`${headerStyles.footer_widget_title} `}>
                  LearnConnect
                </h4>
              </div>
              <div className="text-xl">
                <p className="flex flex-row items-center gap-2">
                  {/* <i className="flaticon-email"></i>{" "}
                   */}
                  <img src="/images/email.png" alt="logo" className="w-6 h-6" />
                  <a href="mailto:contact.learnconnect@gmail.com">
                    contact.learnconnect@gmail.com
                  </a>
                </p>
                <p className="flex flex-row items-center gap-2">
                  <img
                    src="/images/phone-call.png"
                    alt="logo"
                    className="w-6 h-6"
                  />
                  <a href="tel:0333892623">0333892623</a>{" "}
                </p>
              </div>
            </div>

            <div className=" flex items-center">
              <img
                src="/images/LogoRemoveBG.png"
                className={`${headerStyles.footer_widget} w-[200px]  float-right`}
                alt="logo"
              />
            </div>
          </div>
        </div>

        {/* <img className="shape-2 animation-left" src="assets/images/shape/shape-22.png" alt="Shape"/> */}
      </div>
    </div>
  );
};

export default Footer;
