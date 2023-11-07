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
        {/* <img className="shape-1 animation-down" src="assets/images/shape/shape-21.png" alt="Shape"/> */}

        <div className="container">
          <div className={`${headerStyles.grid}`}>
            <div className="">
              {/* <!-- Footer Widget Start --> */}
              <div className={`${headerStyles.footer_widget}`}>
                <div className={`${headerStyles.footer_widget_logo}`}>
                  <a href="#">
                    {/* <img src="assets/images/logo.png" alt="Logo" /> */}
                  </a>
                </div>

                <div className={`${headerStyles.footer_widget_address}`}>
                  <h4 className={`${headerStyles.footer_widget_title}`}>
                    FPT University HCMC
                  </h4>
                  <p>
                    Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                    Thành phố Hồ Chí Minh
                  </p>
                </div>
                <div>
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

                {/* <ul className={`${headerStyles.footer_widget_social}`}>
                  <li>
                    <a href="#">
                      <i className="flaticon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="flaticon-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="flaticon-skype"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="flaticon-instagram"></i>
                    </a>
                  </li>
                </ul> */}
              </div>
              {/* <!-- Footer Widget End --> */}
            </div>
            <div className="">
              <img
                src="/images/logo-1.png"
                className={`${headerStyles.footer_widget} w-[300px] float-right mt-0`}
                alt="logo"
              />
            </div>
            {/* <div className="">
              <div className={`${headerStyles.footer_widget}`}>
                <h4 className={`${headerStyles.footer_widget_title}`}>
                  Subscribe
                </h4>

                <div className={`${headerStyles.footer_widget_subscribe}`}>
                  <p>
                    Lorem Ipsum has been them an industry printer took a galley
                    make book.
                  </p>

                  <div
                    className={`${headerStyles.footer_widget_subscribe_form}`}
                  >
                    <form action="#">
                      <input type="text" placeholder="Email here" />
                      <button
                        className={`${headerStyles.footer_widget_subscribe_form_btn}`}
                      >
                        Subscribe Now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* <img className="shape-2 animation-left" src="assets/images/shape/shape-22.png" alt="Shape"/> */}
      </div>
      {/* <!-- Footer Widget Section End --> */}

      {/* <!-- Footer Copyright Start --> */}
      {/* <div className={`${headerStyles.footer_copyright}`}>
        <div className="container">
          <div className={`${headerStyles.copyright_wrapper}`}>
            <div className={`${headerStyles.copyright_link}`}>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Sitemap</Link>
              <Link href="#">Security</Link>
            </div>
            <div className={`${headerStyles.copyright_text}`}>
              <p>
                &copy; 2021 <span> LearnConnect </span> Made with{" "}
                <Link href="#">Codecarnival</Link>
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
