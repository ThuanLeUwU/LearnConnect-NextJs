"use client";
import React, { useState } from "react";
import "../../app/./globals.css";
import BrandStyle from "./styles/style.module.scss";
import Link from "next/link";
import Image from "next/image";

const BrandSupport = () => {
  const Logo = [
    {
      image: "/images/logo-1.png",
    },
    {
      image: "/images/logo-1.png",
    },
    {
      image: "/images/logo-1.png",
    },
    {
      image: "/images/logo-1.png",
    },
  ];

  return (
    <div className="section section-padding-02">
      <div className="container">
        {/* <!-- Brand Logo Wrapper Start --> */}
        <div className={`${BrandStyle.brand_logo_wrapper}`}>
          {/* <img
            className="shape-1"
            src="assets/images/shape/shape-19.png"
            alt="Shape"
          /> */}

          {/* <img
            className="shape-2 animation-round"
            src="assets/images/shape/shape-20.png"
            alt="Shape"
          /> */}

          {/* <!-- Section Title Start --> */}
          <div className="section-title shape-03">
            <h2 className="main-title">
              Best Supporter of <span> Edule.</span>
            </h2>
          </div>
          {/* <!-- Section Title End --> */}

          {/* <!-- Brand Logo Start --> */}
          <div className={`${BrandStyle.brand_logo}`}>
            <div className="swiper-container">
              <div className={`${BrandStyle.brand_grid}`}>
                {Logo.map((item, index) => {
                  return (
                    <div className={`${BrandStyle.single_brand}`} key={index}>
                      <Image
                        width={200}
                        height={60}
                        src={item.image}
                        alt="Brand"
                      />
                    </div>
                  );
                })}
                {/* <!-- Single Brand Start --> */}

                {/* <!-- Single Brand End --> */}
              </div>
            </div>
          </div>
          {/* <!-- Brand Logo End --> */}
        </div>
        {/* <!-- Brand Logo Wrapper End --> */}
      </div>
    </div>
  );
};

export default BrandSupport;
