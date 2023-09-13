import Image from "next/image";
import styles from "../login/styles.module.scss";

export default function LoginPage() {
  return (
    <div className={styles["main-wrapper"]}>
      <div className={styles["header-section"]}>
        <div className={styles["header-top"] + " hidden lg:block"}>
          <div className="container mx-auto sm:px-4">
            <div className={styles["header-top-wrapper"]}>
              <div className={styles["header-top-left"]}>
                <p>
                  All course 28% off for <a href="#">Liberian people’s.</a>
                </p>
              </div>

              <div className={styles["header-top-medal"]}>
                <div className={styles["top-info"]}>
                  <p>
                    <i className="flaticon-phone-call"></i>{" "}
                    <a href="tel:9702621413">(970) 262-1413</a>
                  </p>
                  <p>
                    <i className="flaticon-email"></i>{" "}
                    <a href="mailto:address@gmail.com">address@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className={styles["header-top-right"]}>
                <ul className={styles["social"]}>
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
            </div>
          </div>
        </div>
      </div>

      <div className={styles["mobile-menu"]}>
        <a className={styles["menu-close"]} href="javascript:void(0)">
          <i className="icofont-close-line"></i>
        </a>

        <div className="mobile-top">
          <p>
            <i className="flaticon-phone-call"></i>{" "}
            <a href="tel:9702621413">(970) 262-1413</a>
          </p>
          <p>
            <i className="flaticon-email"></i>{" "}
            <a href="mailto:address@gmail.com">address@gmail.com</a>
          </p>
        </div>

        <div className="mobile-sign-in-up">
          <ul>
            <li>
              <a className="sign-in" href="login.html">
                Sign In
              </a>
            </li>
            <li>
              <a className="sign-up" href="register.html">
                Sign Up
              </a>
            </li>
          </ul>
        </div>

        <div className="mobile-menu-items">
          <ul className="nav-menu">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="#">All Course</a>
              <ul className="sub-menu">
                <li>
                  <a href="courses.html">Courses</a>
                </li>
                <li>
                  <a href="courses-details.html">Courses Details</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Pages </a>
              <ul className="sub-menu">
                <li>
                  <a href="about.html">About</a>
                </li>
                <li>
                  <a href="register.html">Register</a>
                </li>
                <li>
                  <a href="login.html">Login</a>
                </li>
                <li>
                  <a href="faq.html">FAQ</a>
                </li>
                <li>
                  <a href="404-error.html">404 Error</a>
                </li>
                <li>
                  <a href="after-enroll.html">After Enroll</a>
                </li>
                <li>
                  <a href="courses-admin.html">
                    Instructor Dashboard (Course List)
                  </a>
                </li>
                <li>
                  <a href="overview.html">Instructor Dashboard (Performance)</a>
                </li>
                <li>
                  <a href="students.html">Students</a>
                </li>
                <li>
                  <a href="reviews.html">Reviews</a>
                </li>
                <li>
                  <a href="engagement.html">Course engagement</a>
                </li>
                <li>
                  <a href="traffic-conversion.html">Traffic & conversion</a>
                </li>
                <li>
                  <a href="messages.html">Messages</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Blog</a>
              <ul className="sub-menu">
                <li>
                  <a href="#">Blog</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="blog-grid.html">Blog</a>
                    </li>
                    <li>
                      <a href="blog-left-sidebar.html">Blog Left Sidebar</a>
                    </li>
                    <li>
                      <a href="blog-right-sidebar.html">Blog Right Sidebar</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Blog Details</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="blog-details-left-sidebar.html">
                        Blog Details Left Sidebar
                      </a>
                    </li>
                    <li>
                      <a href="blog-details-right-sidebar.html">
                        Blog Details Right Sidebar
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
          </ul>
        </div>

        <div className="mobile-social">
          <ul className="social">
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
      </div>

      <div className="overlay"></div>

      <div className="section page-banner">
        {/* <img
          className="shape-1 animation-round"
          src="assets/images/shape/shape-8.png"
          alt="Shape"
        /> */}

        {/* <img
          className="shape-2"
          src="assets/images/shape/shape-23.png"
          alt="Shape"
        /> */}

        <div className="">
          <div className="page-banner-content">
            <div className=" flex-wrap list-reset pt-3 pb-3 py-4 px-4 mb-4 bg-gray-200 ">
              <div className={styles["header-main"]}>
                <div className="">
                  <div className={styles["header-main-wrapper"]}>
                    <div className={styles["header-logo"]}>
                      <a href="index.html">
                        <img src="assets/images/logo.png" alt="Logo" />
                      </a>
                    </div>

                    <div className={styles["header-menu"]}>
                      <ul className="nav-menu">
                        <li className={styles["relative group"]}>
                          <a href="index.html">Home</a>
                        </li>
                        <li className={styles["relative group"]}>
                          <a href="#">All Course</a>
                          <ul className={styles["sub-menu"]}>
                            {/* Course List */}
                            <li className={styles["relative group"]}>
                              <a href="courses.html">Courses</a>
                            </li>

                            {/* Course Details */}
                            <li className={styles["relative group"]}>
                              <a href="courses-details.html">Courses Details</a>
                            </li>
                          </ul>
                        </li>
                        <li className={styles["relative group"]}>
                          <a href="#">Pages</a>
                          <ul className={styles["sub-menu"]}>
                            {/* About */}
                            <li className={styles["relative group"]}>
                              <a href="about.html">About</a>
                            </li>

                            {/* Register */}
                            <li className={styles["relative group"]}>
                              <a href="register.html">Register</a>
                            </li>

                            {/* Login */}
                            <li className={styles["relative group"]}>
                              <a href="login.html">Login</a>
                            </li>

                            {/* FAQ */}
                            <li className={styles["relative group"]}>
                              <a href="faq.html">FAQ</a>
                            </li>

                            {/* 404 Error */}
                            <li className={styles["relative group"]}>
                              <a href="404-error.html">404 Error</a>
                            </li>

                            {/* After Enroll */}
                            <li className={styles["relative group"]}>
                              <a href="after-enroll.html">After Enroll</a>
                            </li>

                            {/* Instructor Dashboard (Course List) */}
                            <li className={styles["relative group"]}>
                              <a href="courses-admin.html">
                                Instructor Dashboard (Course List)
                              </a>
                            </li>

                            {/* Instructor Dashboard (Performance) */}
                            <li className={styles["relative group"]}>
                              <a href="overview.html">
                                Instructor Dashboard (Performance)
                              </a>
                            </li>

                            {/* Students */}
                            <li className={styles["relative group"]}>
                              <a href="students.html">Students</a>
                            </li>

                            {/* Reviews */}
                            <li className={styles["relative group"]}>
                              <a href="reviews.html">Reviews</a>
                            </li>

                            {/* Course engagement */}
                            <li className={styles["relative group"]}>
                              <a href="engagement.html">Course engagement</a>
                            </li>

                            {/* Traffic & Conversion */}
                            <li className={styles["relative group"]}>
                              <a href="traffic-conversion.html">
                                Traffic &amp; conversion
                              </a>
                            </li>

                            {/* Messages */}
                            <li className={styles["relative group"]}>
                              <a href="messages.html">Messages</a>
                            </li>
                          </ul>
                        </li>
                        <li className={styles["relative group"]}>
                          <a href="#">Blog</a>
                          <ul className={styles["sub-menu"]}>
                            <li className={styles["relative group"]}>
                              <a href="#">Blog</a>
                              <ul className={styles["sub-menu"]}>
                                <li className={styles["relative group"]}>
                                  <a href="blog-grid.html">Blog</a>
                                </li>
                                <li className={styles["relative group"]}>
                                  <a href="blog-left-sidebar.html">
                                    Blog Left Sidebar
                                  </a>
                                </li>
                                <li className={styles["relative group"]}>
                                  <a href="blog-right-sidebar.html">
                                    Blog Right Sidebar
                                  </a>
                                </li>
                              </ul>
                            </li>

                            <li className={styles["relative group"]}>
                              <a href="#">Blog Details</a>
                              <ul className={styles["sub-menu"]}>
                                <li className={styles["relative group"]}>
                                  <a href="blog-details-left-sidebar.html">
                                    Blog Details Left Sidebar
                                  </a>
                                </li>

                                <li className={styles["relative group"]}>
                                  <a href="blog-details-right-sidebar.html">
                                    Blog Details Right Sidebar
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className={styles["relative group"]}>
                          <a href="contact.html">Contact</a>
                        </li>
                      </ul>
                    </div>
                    <div
                      className={
                        styles["header-sign-in-up"] + "hidden lg:block"
                      }
                    >
                      <ul>
                        <li>
                          <a className="sign-in" href="login.html">
                            Sign In
                          </a>
                        </li>
                        <li>
                          <a className="sign-up" href="register.html">
                            Sign Up
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className={styles["header-toggle"] + "lg:hidden"}>
                      <a
                        className={styles["menu-toggle"]}
                        href="javascript:void(0)"
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <h2 className="title">
              Login <span>Form</span>
            </h2> */}
          </div>
        </div>

        <div className="shape-icon-box">
          {/* <img
            className="icon-shape-1 animation-left"
            src="assets/images/shape/shape-5.png"
            alt="Shape"
          /> */}

          <div className="box-content">
            <div className="box-wrapper">
              <i className="flaticon-badge"></i>
            </div>
          </div>

          {/* <img
            className="icon-shape-2"
            src="assets/images/shape/shape-6.png"
            alt="Shape"
          /> */}
        </div>

        {/* <img
          className="shape-3"
          src="assets/images/shape/shape-24.png"
          alt="Shape"
        /> */}

        {/* <img
          className="shape-author"
          src="assets/images/author/author-11.jpg"
          alt="Shape"
        /> */}
      </div>

      <div className="section section-padding bg-gray-200 ">
        <div className="container mx-auto sm:px-4">
          <div className="register-login-wrapper">
            <div className="flex flex-wrap  items-center">
              <div className="lg:w-1/2 pr-4 pl-4">
                <div className="register-login-images">
                  <div className="shape-1">
                    {/* <img src="assets/images/shape/shape-26.png" alt="Shape" /> */}
                  </div>

                  <div className="images">
                    <img
                      src="assets/images/register-login.png"
                      alt="Register Login"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 pr-4 pl-4">
                <div className="register-login-form">
                  <h3 className="title">
                    Login <span>Now</span>
                  </h3>

                  <div className="form-wrapper">
                    <form action="#">
                      <div className="single-form">
                        <input type="email" placeholder="Username or Email" />
                      </div>
                      <div className="single-form">
                        <input type="password" placeholder="Password" />
                      </div>
                      <div className="single-form">
                        <button className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 btn-hover-dark w-full">
                          Login
                        </button>
                        <a
                          className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-gray-600 text-white hover:bg-gray-700 btn-outline w-full"
                          href="#"
                        >
                          Login with Google
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section section-padding download-section">
        <div className="app-shape-1"></div>
        <div className="app-shape-2"></div>
        <div className="app-shape-3"></div>
        <div className="app-shape-4"></div>

        <div className="container mx-auto sm:px-4">
          <div className="download-app-wrapper mt-n6">
            <div className="section-title section-title-white">
              <h5 className="sub-title">Ready to start?</h5>
              <h2 className="main-title">
                Download our mobile app. for easy to start your course.
              </h2>
            </div>

            {/* <img
              className="shape-1 animation-right"
              src="assets/images/shape/shape-14.png"
              alt="Shape"
            /> */}

            <div className="download-app-btn">
              <ul className="app-btn">
                <li>
                  <a href="#">
                    <img
                      src="assets/images/google-play.png"
                      alt="Google Play"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="assets/images/app-store.png" alt="App Store" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="section footer-section">
        <div className="footer-widget-section">
          {/* <img
            className="shape-1 animation-down"
            src="assets/images/shape/shape-21.png"
            alt="Shape"
          /> */}

          <div className="container mx-auto sm:px-4">
            <div className="flex flex-wrap ">
              <div className="lg:w-1/4 pr-4 pl-4 md:w-1/2 pr-4 pl-4 md:order-1 lg:order-1">
                <div className="footer-widget">
                  <div className="widget-logo">
                    <a href="#">
                      <img src="assets/images/logo.png" alt="Logo" />
                    </a>
                  </div>

                  <div className="widget-address">
                    <h4 className="footer-widget-title">Caribbean Ct</h4>
                    <p>Haymarket, Virginia (VA).</p>
                  </div>

                  <ul className="widget-info">
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

                  <ul className="widget-social">
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
              </div>
              <div className="lg:w-1/2 pr-4 pl-4 md:order-3 lg:order-2">
                <div className="footer-widget-link">
                  <div className="footer-widget">
                    <h4 className="footer-widget-title">Category</h4>

                    <ul className="widget-link">
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

                  <div className="footer-widget">
                    <h4 className="footer-widget-title">Quick Links</h4>

                    <ul className="widget-link">
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
                </div>
              </div>
              <div className="lg:w-1/4 pr-4 pl-4 md:w-1/2 pr-4 pl-4 md:order-2 lg:order-3">
                <div className="footer-widget">
                  <h4 className="footer-widget-title">Subscribe</h4>

                  <div className="widget-subscribe">
                    <p>
                      Lorem Ipsum has been them an industry printer took a
                      galley make book.
                    </p>

                    <div className="widget-form">
                      <form action="#">
                        <input type="text" placeholder="Email here" />
                        <button className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600 btn-hover-dark">
                          Subscribe Now
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <img
            className="shape-2 animation-left"
            src="assets/images/shape/shape-22.png"
            alt="Shape"
          /> */}
        </div>

        <div className="footer-copyright">
          <div className="container mx-auto sm:px-4">
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
          </div>
        </div>
      </div>

      <a href="#" className="back-to-top">
        <i className="icofont-simple-up"></i>
      </a>
    </div>
  );
}
