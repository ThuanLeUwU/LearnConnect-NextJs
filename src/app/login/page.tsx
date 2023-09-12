import Image from "next/image";

export default function LoginPage() {
  return (
    <main>
      <div className="main-wrapper">
        <div className="header-section">
          <div className="header-top d-none d-lg-block">
            <div className="container">
              <div className="header-top-wrapper">
                <div className="header-top-left">
                  <p>
                    All course 28% off for <a href="#">Liberian people’s.</a>
                  </p>
                </div>
                <div className="header-top-medal">
                  <div className="top-info">
                    <p>
                      <i className="flaticon-phone-call" />

                      <a href="tel:9702621413">(970) 262-1413</a>
                    </p>
                    <p>
                      <i className="flaticon-email" />

                      <a href="mailto:address@gmail.com">address@gmail.com</a>
                    </p>
                  </div>
                </div>
                <div className="header-top-right">
                  <ul className="social">
                    <li>
                      <a href="#">
                        <i className="flaticon-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="flaticon-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="flaticon-skype" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="flaticon-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="header-main">
            <div className="container">
              <div className="header-main-wrapper">
                <div className="header-logo">
                  <a href="index.html">
                    <Image
                      src="/register-login.png"
                      alt="Vercel Logo"
                      className="dark:invert"
                      width={100}
                      height={24}
                      priority
                    />
                  </a>
                </div>
                <div className="header-menu d-none d-lg-block">
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
                          <a href="overview.html">
                            Instructor Dashboard (Performance)
                          </a>
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
                          <a href="traffic-conversion.html">
                            Traffic &amp; conversion
                          </a>
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
                              <a href="blog-left-sidebar.html">
                                Blog Left Sidebar
                              </a>
                            </li>
                            <li>
                              <a href="blog-right-sidebar.html">
                                Blog Right Sidebar
                              </a>
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
                <div className="header-sign-in-up d-none d-lg-block">
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
                <div className="header-toggle d-lg-none">
                  <a className="menu-toggle" href="javascript:void(0)">
                    <span />
                    <span />
                    <span />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-menu">
          <a className="menu-close" href="javascript:void(0)">
            <i className="icofont-close-line" />
          </a>
          <div className="mobile-top">
            <p>
              <i className="flaticon-phone-call" />

              <a href="tel:9702621413">(970) 262-1413</a>
            </p>
            <p>
              <i className="flaticon-email" />

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
                    <a href="overview.html">
                      Instructor Dashboard (Performance)
                    </a>
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
                    <a href="traffic-conversion.html">
                      Traffic &amp; conversion
                    </a>
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
                  <i className="flaticon-facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="flaticon-twitter" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="flaticon-skype" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="flaticon-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="section page-banner">
          <img
            className="shape-1 animation-round"
            src="assets/images/shape/shape-8.png"
            alt="Shape"
          />
          <img
            className="shape-2"
            src="assets/images/shape/shape-23.png"
            alt="Shape"
          />
          <div className="container">
            <div className="page-banner-content">
              <ul className="breadcrumb">
                <li>
                  <a href="#">Home</a>
                </li>
                <li className="active">Login</li>
              </ul>
              <h2 className="title">
                Login <span>Form</span>
              </h2>
            </div>
          </div>
          <div className="shape-icon-box">
            <img
              className="icon-shape-1 animation-left"
              src="assets/images/shape/shape-5.png"
              alt="Shape"
            />
            <div className="box-content">
              <div className="box-wrapper">
                <i className="flaticon-badge" />
              </div>
            </div>
            <img
              className="icon-shape-2"
              src="assets/images/shape/shape-6.png"
              alt="Shape"
            />
          </div>
          <img
            className="shape-3"
            src="assets/images/shape/shape-24.png"
            alt="Shape"
          />
          <img
            className="shape-author"
            src="assets/images/author/author-11.jpg"
            alt="Shape"
          />
        </div>
        <div className="section section-padding">
          <div className="container">
            <div className="register-login-wrapper">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="register-login-images">
                    <div className="shape-1">
                      <img src="assets/images/shape/shape-26.png" alt="Shape" />
                    </div>
                    <div className="images">
                      <img
                        src="assets/images/register-login.png"
                        alt="Register Login"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
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
                          <button className="btn btn-primary btn-hover-dark w-100">
                            Login
                          </button>
                          <a
                            className="btn btn-secondary btn-outline w-100"
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
          <div className="app-shape-1" />
          <div className="app-shape-2" />
          <div className="app-shape-3" />
          <div className="app-shape-4" />
          <div className="container">
            <div className="download-app-wrapper mt-n6">
              <div className="section-title section-title-white">
                <h5 className="sub-title">Ready to start?</h5>
                <h2 className="main-title">
                  Download our mobile app. for easy to start your course.
                </h2>
              </div>
              <img
                className="shape-1 animation-right"
                src="assets/images/shape/shape-14.png"
                alt="Shape"
              />
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
            <img
              className="shape-1 animation-down"
              src="assets/images/shape/shape-21.png"
              alt="Shape"
            />
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 order-md-1 order-lg-1">
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
                          <i className="flaticon-email" />

                          <a href="mailto:address@gmail.com">
                            address@gmail.com
                          </a>
                        </p>
                      </li>
                      <li>
                        <p>
                          <i className="flaticon-phone-call" />

                          <a href="tel:9702621413">(970) 262-1413</a>
                        </p>
                      </li>
                    </ul>
                    <ul className="widget-social">
                      <li>
                        <a href="#">
                          <i className="flaticon-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="flaticon-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="flaticon-skype" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="flaticon-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 order-md-3 order-lg-2">
                  <div className="footer-widget-link">
                    <div className="footer-widget">
                      <h4 className="footer-widget-title">Category</h4>
                      <ul className="widget-link">
                        <li>
                          <a href="#">Creative Writing</a>
                        </li>
                        <li>
                          <a href="#">Film &amp; Video</a>
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
                          <a href="#">Terms &amp; Conditions</a>
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
                <div className="col-lg-3 col-md-6 order-md-2 order-lg-3">
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
                          <button className="btn btn-primary btn-hover-dark">
                            Subscribe Now
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              className="shape-2 animation-left"
              src="assets/images/shape/shape-22.png"
              alt="Shape"
            />
          </div>
          <div className="footer-copyright">
            <div className="container">
              <div className="copyright-wrapper">
                <div className="copyright-link">
                  <a href="#">Terms of Service</a>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Sitemap</a>
                  <a href="#">Security</a>
                </div>
                <div className="copyright-text">
                  <p>
                    © 2021 <span> Edule </span> Made with
                    <i className="icofont-heart-alt" /> by
                    <a href="#">Codecarnival</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="#" className="back-to-top">
          <i className="icofont-simple-up" />
        </a>
      </div>
    </main>
  );
}
