"use client";
import RegisInstructor from "@/components/registerInstructor/Register";
import ".././globals.css";

const About = () => {
  return (
    <>
      <div className="container">
        <div className="grid cols-2 lg:grid-cols-12 pt-[30px]">
          <div className="lg:col-span-6 px-[15px]">
            <div className="about-image">
              <div className="images">
                <img
                  src="./about.jpg"
                  alt="About"
                  className="rounded-lg mt-[45px] w-full"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 px-[15px]">
            <div className="about-content ml-10 mt-[45px]">
              <h5 className="text-[20px] pb-5 text-[#309255]">
                Welcome to Edule.
              </h5>
              <h2 className="text-[40px] font-normal pb-6 leading-snug">
                You can join with Edule and upgrade your skill for your{" "}
                <span className="text-[#309255]">bright future.</span>
              </h2>
              <p className="mt-[25px] font-extralight">
                Lorem Ipsum has been the industr&apos;s standard dummy text ever
                since unknown printer took galley type and scmbled make type
                specimen book. It has survived not only five centuries.
              </p>
              <div className="mt-10">
                <a
                  href="#"
                  className=" text-white px-[35px] bg-[#309255] w-36 py-5 rounded-lg"
                >
                  Start A Course
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[30px] grid cols-3 lg:grid-cols-12 my-[30px]">
          <div className="lg:col-span-4 border-[#E7F8EE] border border-solid rounded-lg p-[30px] mx-[15px] hover:border-[#309255] group">
            <div className="about-item">
              <div className="flex mx-auto text-center items-center justify-center h-20">
                <div className="item-icon h-20 w-20 bg-[#E7F8EE] rounded-full group-hover:bg-[#309255] group-hover:text-[#fff]">
                  <i className="">icon</i>
                </div>
                <div className="item-title">
                  <h3 className="text-[22px] pl-4">Top Instructors</h3>
                </div>
              </div>
              <p className="mt-[25px] text-[15px] font-extralight">
                Lorem Ipsum has been the industry&apos;s standard dumy text
                since the when took and scrambled to make type specimen book has
                survived.
              </p>
              <p className="mt-[25px] text-[15px] font-extralight">
                Lorem Ipsum has been the industry&apos;s standard dumy text
                since the when took and scrambled make.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 border-[#E7F8EE] border border-solid rounded-lg p-[30px] mx-[15px] hover:border-[#309255] group">
            <div className="about-item">
              <div className="flex mx-auto text-center items-center justify-center h-20">
                <div className="item-icon h-20 w-20 bg-[#E7F8EE] rounded-full group-hover:bg-[#309255] group-hover:text-[#fff]">
                  <i className="">icon</i>
                </div>
                <div className="item-title">
                  <h3 className="text-[22px] pl-4">Top Instructors</h3>
                </div>
              </div>
              <p className="mt-[25px] text-[15px] font-extralight">
                Lorem Ipsum has been the industry&apos;s standard dumy text
                since the when took and scrambled to make type specimen book has
                survived.
              </p>
              <p className="mt-[25px] text-[15px] font-extralight">
                Lorem Ipsum has been the industry&apos;s standard dumy text
                since the when took and scrambled make.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 border-[#E7F8EE] border border-solid rounded-lg p-[30px] mx-[15px] hover:border-[#309255] group">
            <div className="about-item">
              <div className="flex mx-auto text-center items-center justify-center h-20">
                <div className="item-icon h-20 w-20 bg-[#E7F8EE] rounded-full group-hover:bg-[#309255] group-hover:text-[#fff]">
                  <i className="">icon</i>
                </div>
                <div className="item-title">
                  <h3 className="text-[22px] pl-4">Top Instructors</h3>
                </div>
              </div>
              <p className="mt-[25px] text-[15px] font-extralight">
                Lorem Ipsum has been the industry&apos;s standard dumy text
                since the when took and scrambled to make type specimen book has
                survived.
              </p>
              <p className="mt-[25px] text-[15px] font-extralight">
                Lorem Ipsum has been the industry&apos;s standard dumy text
                since the when took and scrambled make.
              </p>
            </div>
          </div>
        </div>
        <RegisInstructor/>
        {/* <div className="mt-20 mb-20 pt-5 px-20 pb-[50px] bg-[#E7F8EE]">
        <div className="container">
          <div className="grid cols-2 lg:grid-cols-12">
            <div className="lg:col-span-6 mt-[25px]">
              <div className="section-title shape-02">
                <h5 className="sub-title">Become A Instructor</h5>
                <h2 className="main-title">
                  You can join with Edule as <span>a instructor?</span>
                </h2>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="call-to-action-btn float-right h-[60px]">
                <a
                  className=" text-white px-[35px] bg-[#309255] w-36 py-5 rounded-lg"
                  href="contact.html"
                >
                  Drop Information
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      </div>
    </>
  );
};

export default About;
