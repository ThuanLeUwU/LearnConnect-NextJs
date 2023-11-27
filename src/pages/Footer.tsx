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
  //       `https://learnconnectapitest.azurewebsites.net/api/Category`
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
          <div className={`${headerStyles.grid}`}>
            <div className="">
              <div className={`${headerStyles.footer_widget}`}>
                <div className={`${headerStyles.footer_widget_logo}`}>
                  <a href="#"></a>
                </div>

                <div className={`${headerStyles.footer_widget_address} `}>
                  <h4
                    className={`${headerStyles.footer_widget_title} absolute z-[1]`}
                  >
                    FPT University HCMC
                  </h4>
                  <img
                    className="shape-2 animation-down relative"
                    src="/images/shape-21.png"
                    alt="Shape"
                  />
                  <p className="relative z-[1] -translate-y-10">
                    Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                    Thành phố Hồ Chí Minh
                  </p>
                </div>
                <div className="-translate-y-10">
                  <p>
                    <i className="flaticon-email"></i>{" "}
                    <a href="mailto:learnconnect@gmail.com">
                      learnconnect@gmail.com
                    </a>
                  </p>
                  <p>
                    <i className="flaticon-phone-call"></i>{" "}
                    <a href="tel:02873005588">028 7300 5588</a>{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/logo-1.png"
                className={`${headerStyles.footer_widget} w-[300px] float-right mt-0 absolute translate-x-60`}
                alt="logo"
              />
              <img
                className="shape-2 animation-left relative float-right pt-32"
                src="/images/shape-22.png"
                alt="Shape"
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
