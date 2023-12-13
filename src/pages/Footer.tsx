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
          <div className="flex flex-row justify-between">
            <div className={`flex flex-col justify-center py-5`}>
              <div className={`${headerStyles.footer_widget_address}`}>
                <h4 className={`${headerStyles.footer_widget_title} `}>
                  FPT University HCMC
                </h4>

                <p className="text-lg">
                  Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                  Thành phố Hồ Chí Minh
                </p>
              </div>
              <div className="text-xl">
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
