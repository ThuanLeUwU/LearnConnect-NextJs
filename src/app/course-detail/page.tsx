import Image from "next/image";
import styles from "../login/styles.module.scss";

export default function CourseDetailPage() {
  return (
    <div className="contain-wrapper">
      <div className="bg-[#fff]">
        <div className="grid cols-3 lg:grid-cols-3">
          <div className="lg:cols-span-2">
            <div>
              <img src="./courses-details.jpg" alt="course-detail" />
            </div>
          </div>
          <div className="lg:cols-span-1">
            <div className="border rounded-lg border-solid border-opacity-20 border-green-600 rounded-10 bg-[#e7f8ee] pt-7 pl-7 pr-7 pb-9">
              <div className="sidebar-widget widget-information">
                <div className="text-center py-3.5">
                  <span className="text-[#309255] text-3xl font-bold">
                    $420.38
                  </span>
                </div>
                <div className=" text-black">
                  <ul className="py-15">
                    <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                      <i className="icofont-man-in-glasses"></i>{" "}
                      <strong className="text-[#212832] text-base font-medium">
                        Instructor
                      </strong>{" "}
                      <span className="text-[#52565b] float-right text-base font-normal">
                        Pamela Foster
                      </span>
                    </li>
                    <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                      <i className="icofont-clock-time"></i>{" "}
                      <strong className="text-[#212832] text-base font-medium">
                        Duration
                      </strong>{" "}
                      <span className="text-[#52565b] float-right text-base font-normal">
                        08 hr 15 mins
                      </span>
                    </li>
                    <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                      <i className="icofont-ui-video-play"></i>{" "}
                      <strong className="text-[#212832] text-base font-medium">
                        Lectures
                      </strong>{" "}
                      <span className="text-[#52565b] float-right text-base font-normal">
                        29
                      </span>
                    </li>
                    <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                      <i className="icofont-bars"></i>{" "}
                      <strong className="text-[#212832] text-base font-medium">
                        Level
                      </strong>{" "}
                      <span className="text-[#52565b] float-right text-base font-normal">
                        Secondary
                      </span>
                    </li>
                    <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                      <i className="icofont-book-alt"></i>{" "}
                      <strong className="text-[#212832] text-base font-medium">
                        Language
                      </strong>{" "}
                      <span className="text-[#52565b] float-right text-base font-normal">
                        English
                      </span>
                    </li>
                    <li className="border-b border-solid border-[#d1e6d9] py-3.5">
                      <i className="icofont-certificate-alt-1"></i>{" "}
                      <strong className="text-[#212832] text-base font-medium">
                        Certificate
                      </strong>{" "}
                      <span className="text-[#52565b] float-right text-base font-normal">
                        Yes
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <a
                    href="#"
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-2xl py-4 px-3 leading-normal no-underline bg-[#309255] text-white hover:bg-black btn-outline w-44 border-[#a9f9c8] hover:text-white transition-all duration-300 ease-in-out delay-0 my-2"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>
            <div className="sidebar-widget">
              <h4 className="widget-title">Share Course:</h4>

              <ul className="social">
                <li>
                  <a href="#">
                    <i className="flaticon-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="flaticon-linkedin"></i>
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
  );
}
