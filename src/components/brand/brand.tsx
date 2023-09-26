"use client";
import React, { useState } from "react";
import "../../app/./globals.css";
import BrandStyle from "./styles/style.module.scss";
import Link from "next/link";
import Image from "next/image";

const BrandSupport = () => {
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
          <div className="brand-logo brand-active">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {/* <!-- Single Brand Start --> */}
                <div className="single-brand swiper-slide">
                  <img src="assets/images/brand/brand-01.png" alt="Brand" />
                </div>
                {/* <!-- Single Brand End --> */}

                {/* <!-- Single Brand Start --> */}
                <div className="single-brand swiper-slide">
                  <img src="assets/images/brand/brand-02.png" alt="Brand" />
                </div>
                {/* <!-- Single Brand End --> */}

                {/* <!-- Single Brand Start --> */}
                <div className="single-brand swiper-slide">
                  <img src="assets/images/brand/brand-03.png" alt="Brand" />
                </div>
                {/* <!-- Single Brand End --> */}

                {/* <!-- Single Brand Start --> */}
                <div className="single-brand swiper-slide">
                  <img src="assets/images/brand/brand-04.png" alt="Brand" />
                </div>
                {/* <!-- Single Brand End --> */}

                {/* <!-- Single Brand Start --> */}
                <div className="single-brand swiper-slide">
                  <img src="assets/images/brand/brand-05.png" alt="Brand" />
                </div>
                {/* <!-- Single Brand End --> */}

                {/* <!-- Single Brand Start --> */}
                <div className="single-brand swiper-slide">
                  <img src="assets/images/brand/brand-06.png" alt="Brand" />
                </div>
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
