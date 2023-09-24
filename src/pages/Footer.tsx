"use client";
import headerStyles from "./styles/styles.module.scss";
import React from "react";
import "../app/./globals.css";
import Link from "next/link";

const Footer = () => {
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
                    Caribbean Ct
                  </h4>
                  <p>Haymarket, Virginia (VA).</p>
                </div>

                <ul className={`${headerStyles.footer_widget_info}`}>
                  <li>
                    <p>
                      {" "}
                      <i className="flaticon-email"></i>{" "}
                      <a href="mailto:address@gmail.com">address@gmail.com</a>{" "}
                    </p>
                  </li>
                  <li>
                    <p>
                      {" "}
                      <i className="flaticon-phone-call"></i>{" "}
                      <a href="tel:9702621413">(970) 262-1413</a>{" "}
                    </p>
                  </li>
                </ul>

                <ul className={`${headerStyles.footer_widget_social}`}>
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
                </ul>
              </div>
              {/* <!-- Footer Widget End --> */}
            </div>
            <div className="">
              {/* <!-- Footer Widget Link Start --> */}
              <div className={`${headerStyles.footer_link}`}>
                {/* <!-- Footer Widget Start --> */}
                <div className={`${headerStyles.footer_widget}`}>
                  <h4 className={`${headerStyles.footer_widget_title}`}>
                    Category
                  </h4>

                  <ul className={`${headerStyles.footer_widget_link}`}>
                    <li>
                      <a href="#">Creative Writing</a>
                    </li>
                    <li>
                      <a href="#">Film & Video</a>
                    </li>
                    <li>
                      <a href="#">Graphic Design</a>
                    </li>
                    <li>
                      <a href="#">UI/UX Design</a>
                    </li>
                    <li>
                      <a href="#">Business Analytics</a>
                    </li>
                    <li>
                      <a href="#">Marketing</a>
                    </li>
                  </ul>
                </div>
                {/* <!-- Footer Widget End --> */}
              </div>
            </div>
            <div className="">
              <div className="">
                {/* <!-- Footer Widget Start --> */}
                <div className={`${headerStyles.footer_widget}`}>
                  <h4 className={`${headerStyles.footer_widget_title}`}>
                    Quick Links
                  </h4>

                  <ul className={`${headerStyles.footer_widget_link}`}>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Discussion</a>
                    </li>
                    <li>
                      <a href="#">Terms & Conditions</a>
                    </li>
                    <li>
                      <a href="#">Customer Support</a>
                    </li>
                    <li>
                      <a href="#">Course FAQ’s</a>
                    </li>
                  </ul>
                </div>
                {/* <!-- Footer Widget End --> */}
              </div>
              {/* <!-- Footer Widget Link End --> */}
            </div>
            <div className="">
              {/* <!-- Footer Widget Start --> */}
              <div className={`${headerStyles.footer_widget}`}>
                <h4 className={`${headerStyles.footer_widget_title}`}>Subscribe</h4>

                <div className={`${headerStyles.footer_widget_subscribe}`}>
                  <p>
                    Lorem Ipsum has been them an industry printer took a galley
                    make book.
                  </p>

                  <div className={`${headerStyles.footer_widget_subscribe_form}`}>
                    <form action="#">
                      <input type="text" placeholder="Email here" />
                      <button className={`${headerStyles.footer_widget_subscribe_form_btn}`}>
                        Subscribe Now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* <!-- Footer Widget End --> */}
            </div>
          </div>
        </div>

        {/* <img className="shape-2 animation-left" src="assets/images/shape/shape-22.png" alt="Shape"/> */}
      </div>
      {/* <!-- Footer Widget Section End --> */}

      {/* <!-- Footer Copyright Start --> */}
      <div className={`${headerStyles.footer_copyright}`}>
        <div className="container">
          {/* <!-- Footer Copyright Start --> */}
          <div className="copyright-wrapper">
            <div className="copyright-link">
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Sitemap</a>
              <a href="#">Security</a>
            </div>
            <div className="copyright-text">
              <p>
                &copy; 2021 <span> Edule </span> Made with{" "}
                <i className="icofont-heart-alt"></i> by{" "}
                <a href="#">Codecarnival</a>
              </p>
            </div>
          </div>
          {/* <!-- Footer Copyright End --> */}
        </div>
      </div>
      {/* <!-- Footer Copyright End --> */}
    </div>
  );
};

export default Footer;
