"use client";
import React, { useState } from "react";
import ".././globals.css";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  return (
    <div className="py-20">
      <div className="tab-content container mx-auto">
        <div className="flex justify-center bg-[#e7f8ee] pt-10 pb-10 px-20 rounded-lg">
          <ul className="tabs flex space-x-5">
            <li
              className={`cursor-pointer rounded-md ${
                activeTab === "tab1"
                  ? " text-[#309255] bg-white border-[#309255] border border-solid"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("tab1")}
            >
              <button className="w-44 h-14 px-5 text-center text-base font-medium  border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#309255]">
                UI/UX Design
              </button>
            </li>
            <li
              className={`cursor-pointer rounded-md ${
                activeTab === "tab2"
                  ? "text-[#309255] bg-white border-[#309255] border border-solid"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("tab2")}
            >
              <button className="w-44 h-14 px-5 text-center text-base font-medium  border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#309255]">
                Development
              </button>
            </li>
            <li
              className={`cursor-pointer rounded-md ${
                activeTab === "tab3"
                  ? "text-[#309255] bg-white border-[#309255] border border-solid"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("tab3")}
            >
              <button className="w-44 h-14 px-5 text-center text-base font-medium   border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#309255]">
                Data Science
              </button>
            </li>
            <li
              className={`cursor-pointer rounded-md ${
                activeTab === "tab4"
                  ? "text-[#309255] bg-white border-[#309255] border border-solid"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("tab4")}
            >
              <button className="w-44 h-14 px-5 text-center text-base font-medium  border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#309255]">
                Business
              </button>
            </li>
            <li
              className={`cursor-pointer rounded-md ${
                activeTab === "tab5"
                  ? "text-[#309255] bg-white border-[#309255] border border-solid"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("tab5")}
            >
              <button className="w-44 h-14 px-5 text-center text-base font-medium border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#309255]">
                Financial
              </button>
            </li>
          </ul>
        </div>
        {activeTab === "tab1" && (
          <div className="max-w-6xl mx-auto pt-8">
            <div className="faq-wrapper">
              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the academic calendar for universities in the
                        United States?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>

                      <p className="leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the difference between a college and a
                        university?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the academic calendar for universities in the
                        United States?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        Is it possible to obtain a bachelor's degree and a
                        master's degree at the same time?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        How do you transfer from a community college to a four
                        year university?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "tab2" && (
          <div className="max-w-6xl mx-auto pt-8">
            <div className="faq-wrapper">
              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the academic calendar for universities in the
                        United States?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>

                      <p className="leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the difference between a college and a
                        university?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the academic calendar for universities in the
                        United States?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        Is it possible to obtain a bachelor's degree and a
                        master's degree at the same time?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        How do you transfer from a community college to a four
                        year university?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "tab3" && (
          <div className="max-w-6xl mx-auto pt-8">
            <div className="faq-wrapper">
              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the academic calendar for universities in the
                        United States?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>

                      <p className="leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the difference between a college and a
                        university?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the academic calendar for universities in the
                        United States?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        Is it possible to obtain a bachelor's degree and a
                        master's degree at the same time?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        How do you transfer from a community college to a four
                        year university?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "tab4" && (
          <div className="max-w-6xl mx-auto pt-8">
            <div className="faq-wrapper">
              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the academic calendar for universities in the
                        United States?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>

                      <p className="leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the difference between a college and a
                        university?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the academic calendar for universities in the
                        United States?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        Is it possible to obtain a bachelor's degree and a
                        master's degree at the same time?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        How do you transfer from a community college to a four
                        year university?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "tab5" && (
          <div className="max-w-6xl mx-auto pt-8">
            <div className="faq-wrapper">
              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the academic calendar for universities in the
                        United States?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>

                      <p className="leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the difference between a college and a
                        university?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        What is the academic calendar for universities in the
                        United States?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        Is it possible to obtain a bachelor's degree and a
                        master's degree at the same time?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-faq-item">
                <div className="grid cols-2 lg:grid-cols-12 border-[#309255] border border-solid rounded-lg pt-2.5 px-[70px] pb-[35px] hover:bg-[#e7f8ee] group mt-5">
                  <div className="lg:col-span-5 px-[15px] my-auto">
                    <div className="">
                      <h4 className="text-[20px] px-[15px] group-hover:text-[#309255]">
                        How do you transfer from a community college to a four
                        year university?
                      </h4>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
                      <p className="mb-4 leading-loose">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500 when un known
                        printer took make a type specimen typesetting industry
                        lorem Ipsum has been the industry's standard dummy text
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-12 text-center">
        <a
          className="bg-[#309255] text-[18px] px-[35px] py-[20px] rounded-lg text-[#fff] hover:bg-[#000] transition-all duration-300 ease-in-out delay-0"
          href="#"
        >
          Other’s Question
        </a>
      </div>
    </div>
  );
}
