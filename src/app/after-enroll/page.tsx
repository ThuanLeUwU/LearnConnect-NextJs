// "use client";
// import React, { useState } from "react";
// import ".././globals.css";
// import AccordionItem from "@/components/dropdown/Dropdown";
// import { useRouter } from "next/router";

// // const AccordionItem = ({ header, time, text, onLinkClick }: any) => {
// //   const [active, setActive] = useState(false);

// //   const handleToggle = () => {
// //     event?.preventDefault();
// //     setActive(!active);
// //   };
// //   return (
// //     <div className="single-faq mb-8 w-full rounded-lg border border-[#eefbf3] bg-[#eefbf3] p-4 sm:p-8 lg:px-6 xl:px-8">
// //       <button
// //         className={`faq-btn flex w-full text-left`}
// //         onClick={() => handleToggle()}
// //       >
// //         <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary">
// //           <svg
// //             className={`duration-200 ease-in-out fill-primary stroke-primary ${
// //               active ? "rotate-180" : ""
// //             }`}
// //             width="17"
// //             height="10"
// //             viewBox="0 0 17 10"
// //             xmlns="http://www.w3.org/2000/svg"
// //           >
// //             <path
// //               d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
// //               fill=""
// //               stroke=""
// //             />
// //           </svg>
// //         </div>
// //         <div className="w-full">
// //           <p className="text-lg font-semibold text-black">{header}</p>
// //           <span>{time}</span>
// //         </div>
// //       </button>

// //       <div
// //         className={`pl-[62px] duration-200 ease-in-out ${
// //           active ? "block" : "hidden"
// //         }`}
// //       >
// //         <p className="py-3 text-base leading-relaxed text-body-color">{text}</p>
// //       </div>
// //       <div
// //         className={`pl-[62px] duration-200 ease-in-out ${
// //           active ? "block" : "hidden"
// //         }`}
// //       >
// //         <a
// //           className="link"
// //           href="#"
// //           onClick={(e) => {
// //             e.preventDefault();
// //             onLinkClick(
// //               "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&profile_id=119"
// //             );
// //           }}
// //         >
// //           <div className="w-3.5 h-3.5 bg-[#fff] rounded-full border-[3px] border-solid border-[#acd6bc]"></div>
// //           <div className="pl-20 py-2 pr-[30px]">
// //             <p>01. The Complete Medicine Masterclass</p>
// //             <span
// //               className={`total-duration text-[#848886] text-[13px] mt-1.5`}
// //             >
// //               08 minutes
// //             </span>
// //           </div>
// //         </a>
// //         <a
// //           className="link"
// //           href="#"
// //           onClick={(e) => {
// //             e.preventDefault();
// //             onLinkClick(
// //               "https://player.vimeo.com/external/207590826.hd.mp4?s=6a918d074abf8f3add7858018855524d384f6934&amp;profile_id=119"
// //             );
// //           }}
// //         >
// //           <div className="w-3.5 h-3.5 bg-[#309255] rounded-full"></div>
// //           <div className="pl-20 py-2 pr-[30px]">
// //             <p>02. Standard dummy text ever since the</p>
// //             <span
// //               className={`total-duration text-[#848886] text-[13px] mt-1.5`}
// //             >
// //               08 minutes
// //             </span>
// //           </div>
// //         </a>
// //       </div>
// //     </div>
// //   );
// // };
// export default function AfterEnroll({ id }: { id: { id: string } }) {
//   const [activeTab, setActiveTab] = useState("tab1");
//   const handleTabClick = (tabName: string) => {
//     setActiveTab(tabName);
//   };
//   const [videoSrc, setVideoSrc] = useState(
//     "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&profile_id=119"
//   );

//   const changeVideoSource = (newSrc: React.SetStateAction<string>) => {
//     setVideoSrc(newSrc);
//     const videoElement = document.getElementById(
//       "courseVideo"
//     ) as HTMLVideoElement;
//     if (videoElement) {
//       videoElement.load();
//     }
//   };

//   return (
//     <div className="container">
//       <div className="grid cols-2 lg:grid-cols-12 mt-[40px]">
//         <div className="lg:col-span-8">
//           <video width="full" height="full" controls id="courseVideo">
//             <source src={videoSrc} type="video/mp4" />
//           </video>
//           <div>
//             <div className="px-3">
//               <h2 className="text-[25px] leading-normal text-[#212832] font-medium mt-2.5">
//                 Finance & Investment Series: Learn to Budget and Calculate Your
//                 Net Worth.
//               </h2>
//               <div className="flex justify-center bg-[#e7f8ee] p-3 rounded-lg mt-5">
//                 <ul className="tabs flex space-x-5">
//                   <li
//                     className={`cursor-pointer rounded-md ${
//                       activeTab === "tab1"
//                         ? " text-[#fff] bg-[#309255]"
//                         : "bg-[#fff] "
//                     }`}
//                     onClick={() => handleTabClick("tab1")}
//                   >
//                     <button className="w-28 h-14 px-[15px] text-center text-sm font-medium  rounded-md hover:text-[#fff] hover:bg-[#309255]">
//                       Overview
//                     </button>
//                   </li>
//                   <li
//                     className={`cursor-pointer rounded-md ${
//                       activeTab === "tab2"
//                         ? " text-[#fff] bg-[#309255]"
//                         : "bg-[#fff] "
//                     }`}
//                     onClick={() => handleTabClick("tab2")}
//                   >
//                     <button className="w-28 h-14 px-[15px] text-center text-sm font-medium  border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#fff] hover:bg-[#309255]">
//                       Description
//                     </button>
//                   </li>
//                   {/* <li
//                     className={`cursor-pointer rounded-md ${
//                       activeTab === "tab3"
//                         ? " text-[#fff] bg-[#309255]"
//                         : "bg-[#fff] "
//                     }`}
//                     onClick={() => handleTabClick("tab3")}
//                   >
//                     <button className="w-28 h-14 px-[15px] text-center text-sm font-medium  border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#fff] hover:bg-[#309255]">
//                       Certificates
//                     </button>
//                   </li> */}
//                   <li
//                     className={`cursor-pointer rounded-md ${
//                       activeTab === "tab4"
//                         ? " text-[#fff] bg-[#309255]"
//                         : "bg-[#fff] "
//                     }`}
//                     onClick={() => handleTabClick("tab4")}
//                   >
//                     <button className="w-28 h-14 px-[15px] text-center text-sm font-medium  border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#fff] hover:bg-[#309255]">
//                       lecture
//                     </button>
//                   </li>
//                   <li
//                     className={`cursor-pointer rounded-md ${
//                       activeTab === "#"
//                         ? " text-[#fff] bg-[#309255]"
//                         : "bg-[#fff] "
//                     }`}
//                   >
//                     <button className="w-28 h-14 px-[15px] text-center text-sm font-medium  border-opacity-20 rounded-md hover:border-[#309255] hover:text-[#fff] hover:bg-[#309255]">
//                       Share
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//               {activeTab === "tab1" && (
//                 <div className="w-full mx-auto">
//                   <div className="faq-wrapper">
//                     <div className="single-faq-item">
//                       <div className="grid cols-2 lg:grid-cols-12 border-[#dff0e6] border border-solid rounded-lg px-[70px] pb-[35px] mt-5">
//                         <div className="lg:col-span-4 px-[15px]">
//                           <div className="">
//                             <h4 className="text-[25px] px-[15px] pt-5 text-[#212832]">
//                               Course Details
//                             </h4>
//                           </div>
//                         </div>
//                         <div className="lg:col-span-8">
//                           <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
//                             <p className="mb-4 leading-loose">
//                               Lorem Ipsum is simply dummy text of the printing
//                               and typesetting industry. Lorem Ipsum has been
//                               industry&apos;s standard dummy text ever since the
//                               1500s when andom unknown printer took a galley of
//                               type scrambled it to make a type specimen book. It
//                               has survived not&apos;s only and five centuries,
//                               but also the lea into electronic typesetting,
//                               remaining priting essentially unchanged. It was
//                               popularsed in the 1960 with containing Lorem Ipsum
//                               passages desktop publishing software.
//                             </p>

//                             <div className="flex flex-col">
//                               <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
//                                 <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
//                                   <div className="overflow-hidden">
//                                     <table className="min-w-full text-left text-sm font-light">
//                                       <tbody>
//                                         <tr className="border-b border-b-[#e7f8ee]">
//                                           <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
//                                             Instructor
//                                           </td>
//                                           <td className="whitespace-nowrap px-6 py-4">
//                                             :
//                                           </td>
//                                           <td className="whitespace-nowrap px-6 py-4 text-[#52565b] text-[15px] font-normal">
//                                             Pamela Foster
//                                           </td>
//                                         </tr>
//                                         <tr className="border-b border-b-[#e7f8ee]">
//                                           <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
//                                             Duration
//                                           </td>
//                                           <td className="whitespace-nowrap px-6 py-4">
//                                             :
//                                           </td>
//                                           <td className="whitespace-nowrap px-6 py-4 text-[#52565b] text-[15px] font-normal">
//                                             08 hr 15 mins
//                                           </td>
//                                         </tr>
//                                         <tr className="border-b border-b-[#e7f8ee]">
//                                           <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
//                                             Lectures
//                                           </td>
//                                           <td className="whitespace-nowrap px-6 py-4">
//                                             :
//                                           </td>
//                                           <td className="whitespace-nowrap px-6 py-4 text-[#52565b] text-[15px] font-normal">
//                                             2,16
//                                           </td>
//                                         </tr>
//                                         {/* <tr className="border-b border-b-[#e7f8ee]">
//                                           <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
//                                             Level
//                                           </td>
//                                           <td className="whitespace-nowrap px-6 py-4">
//                                             :
//                                           </td>
//                                           <td className="whitespace-nowrap px-6 py-4 text-[#52565b] text-[15px] font-normal">
//                                             Secondary
//                                           </td>
//                                         </tr> */}
//                                         <tr className="border-b border-b-[#e7f8ee]">
//                                           <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
//                                             Language
//                                           </td>
//                                           <td className="whitespace-nowrap px-6 py-4">
//                                             :
//                                           </td>
//                                           <td className="whitespace-nowrap px-6 py-4 text-[#52565b] text-[15px] font-normal">
//                                             English
//                                           </td>
//                                         </tr>
//                                         <tr className="border-b border-b-[#e7f8ee]">
//                                           <td className="whitespace-nowrap px-6 py-4 text-[#212832] text-[15px] font-medium">
//                                             Caption&apos;s
//                                           </td>
//                                           <td className="whitespace-nowrap px-6 py-4">
//                                             :
//                                           </td>
//                                           <td className="whitespace-nowrap px-6 py-4">
//                                             Yes
//                                           </td>
//                                         </tr>
//                                       </tbody>
//                                     </table>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>

//                             <p className="leading-loose">
//                               Lorem Ipsum is simply dummy text of the printing
//                               and typesetting industry lorem Ipsum has been the
//                               industry&apos;s standard dummy text ever since the
//                               1500 when un known printer took make a type
//                               specimen
//                             </p>

//                             <p className="leading-loose">
//                               Lorem Ipsum is simply dummy text of the printing
//                               and typesetting industry lorem Ipsum has been the
//                               industry&apos;s standard dummy text ever since the
//                               1500 when un known printer took make a type
//                               specimen
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === "tab2" && (
//                 <div className="w-full mx-auto">
//                   <div className="faq-wrapper">
//                     <div className="single-faq-item">
//                       <div className="grid cols-2 lg:grid-cols-12 border-[#dff0e6] border border-solid rounded-lg px-[70px] pb-[35px] mt-5">
//                         <div className="lg:col-span-4 px-[15px]">
//                           <div className="">
//                             <h4 className="text-[25px] px-[15px] pt-5 text-[#212832]">
//                               Course Details
//                             </h4>
//                           </div>
//                         </div>
//                         <div className="lg:col-span-8">
//                           <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
//                             <p className="mb-4 leading-loose">
//                               Lorem Ipsum is simply dummy text of the printing
//                               and typesetting industry. Lorem Ipsum has been
//                               industry&apos;s standard dummy text ever since the
//                               1500s when andom unknown printer took a galley of
//                               type scrambled it to make a type specimen book. It
//                               has survived not&apos;s only and five centuries,
//                               but also the lea into electronic typesetting,
//                               remaining priting essentially unchanged. It was
//                               popularsed in the 1960 with containing Lorem Ipsum
//                               passages desktop publishing software.
//                             </p>

//                             <p className="mb-4 leading-loose">
//                               “Lorem Ipsum is simply dummy text of the printing
//                               and typesetting industry. Lorem Ipsum has
//                               industry&apos;s standard dummy text ever since the
//                               1500s when andom unknown printer took a galley
//                               scrambled it to make a type specimen book.”
//                             </p>

//                             <p className="mb-4 leading-loose">
//                               Lorem Ipsum is simply dummy text of the printing
//                               and typesetting industry. Lorem Ipsum has been
//                               industry&apos;s standard dummy text ever since the
//                               1500s when andom unknown printer took a galley of
//                               type scrambled it to make a type specimen book. It
//                               has survived not&apos;s only and five centuries,
//                               but also the lea into electronic typesetting,
//                               remaining priting essentially unchanged. It was
//                               popularsed in the 1960 with containing Lorem Ipsum
//                               passages desktop publishing software.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === "tab3" && (
//                 <div className="w-full mx-auto">
//                   <div className="faq-wrapper">
//                     <div className="single-faq-item">
//                       <div className="grid cols-2 lg:grid-cols-12 border-[#dff0e6] border border-solid rounded-lg px-[70px] pb-[35px] mt-5">
//                         <div className="lg:col-span-4 px-[15px]">
//                           <div className="">
//                             <h4 className="text-[25px] px-[15px] pt-5 text-[#212832]">
//                               EduLe Certificates
//                             </h4>
//                           </div>
//                         </div>
//                         <div className="lg:col-span-8">
//                           <div className="text-[15px] font-extralight mt-[25px] px-[15px]">
//                             <p className="mb-4 leading-loose">
//                               Lorem Ipsum is simply dummy text of the printing
//                               and typesetting industry. Lorem Ipsum has been
//                               industry&apos;s standard dummy text ever since the
//                               1500s when andom unknown printer took a galley of
//                               type scrambled it to make a type specimen book. It
//                               has survived not&apos;s only and five centuries,
//                               but also the lea into electronic typesetting,
//                               remaining priting essentially unchanged. It was
//                               popularsed in the 1960 with containing Lorem Ipsum
//                               passages desktop publishing software.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === "tab4" && (
//                 <div className="w-full mx-auto">
//                   <div className="faq-wrapper">
//                     <div className="single-faq-item">
//                       <div className="grid cols-2 lg:grid-cols-12 border-[#dff0e6] border border-solid rounded-lg px-[70px] pb-[35px] mt-5">
//                         <div className="lg:col-span-4 px-[15px]">
//                           <div className="">
//                             <h4 className="text-[25px] px-[15px] pt-5 text-[#212832]">
//                               lecture
//                             </h4>
//                           </div>
//                         </div>
//                         <div className="lg:col-span-8">
//                           <AccordionItem
//                             header="Lesson-01: Mindful Growth & the Creative Journey, Find
//                       Your Spark & Map Your Future"
//                             time="01 hour 48 minutes"
//                             timevideo="08 minutes"
//                             onLinkClick={changeVideoSource}
//                           />
//                           <AccordionItem
//                             header="Lesson-02: Mindful Growth & the Creative Journey, Find
//                       Your Spark & Map Your Future"
//                             time="01 hour 48 minutes"
//                             timevideo="08 minutes"
//                             onLinkClick={changeVideoSource}
//                           />
//                           {/* <div className="flex flex-col">
//                             <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
//                               <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
//                                 <div className="overflow-hidden">
//                                   <div className="reviews-wrapper reviews-active">
//                                     <div className="swiper-container">
//                                       <div className="swiper-wrapper">
//                                         <div className="single-review mt-3.5 border-b-2 border-opacity-20 border-[#30925533] p-7">
//                                           <div className="review-author flex items-center ">
//                                             <div className="author-thumb p-2">
//                                               <img
//                                                 src="./author/author-06.jpg"
//                                                 alt="Author"
//                                                 className="w-24 h-24 rounded-full"
//                                               />
//                                               <i className="icofont-quote-left"></i>
//                                             </div>
//                                             <div className="author-content pl-4">
//                                               <h4 className="text-2xl font-medium">
//                                                 Sara Alexander
//                                               </h4>
//                                               <span className="text-sm text-[#309255] mt-1.5 font-light">
//                                                 Product Designer, USA
//                                               </span>
//                                               <span className="rating-star">
//                                                 <span className="rating-bar"></span>
//                                               </span>
//                                             </div>
//                                           </div>
//                                           <p className="mt-3 font-light text-[#52565b] text-sm">
//                                             Lorem Ipsum has been the
//                                             industry&apos;s standard dummy text
//                                             since the 1500 when unknown printer
//                                             took a galley of type and scrambled
//                                             to make type specimen book has
//                                             survived not five centuries but also
//                                             the leap into electronic type and
//                                             book.
//                                           </p>
//                                         </div>

//                                         <div className="single-review mt-3.5 border-b-2 border-opacity-20 border-[#30925533] p-7">
//                                           <div className="review-author flex items-center">
//                                             <div className="author-thumb p-2">
//                                               <img
//                                                 src="./author/author-07.jpg"
//                                                 alt="Author"
//                                                 className="w-24 h-24 rounded-full"
//                                               />
//                                               <i className="icofont-quote-left"></i>
//                                             </div>
//                                             <div className="author-content pl-4">
//                                               <h4 className="text-2xl font-medium">
//                                                 Karol Bachman
//                                               </h4>
//                                               <span className="text-sm text-[#309255] mt-1.5 font-light">
//                                                 Product Designer, USA
//                                               </span>
//                                               <span className="rating-star">
//                                                 <span className="rating-bar"></span>
//                                               </span>
//                                             </div>
//                                           </div>
//                                           <p className="mt-3 font-light text-[#52565b] text-sm">
//                                             Lorem Ipsum has been the
//                                             industry&apos;s standard dummy text
//                                             since the 1500 when unknown printer
//                                             took a galley of type and scrambled
//                                             to make type specimen book has
//                                             survived not five centuries but also
//                                             the leap into electronic type and
//                                             book.
//                                           </p>
//                                         </div>

//                                         <div className="single-review mt-3.5 border-b-2 border-opacity-20 border-[#30925533] p-7">
//                                           <div className="review-author flex items-center">
//                                             <div className="author-thumb p-2">
//                                               <img
//                                                 src="./author/author-03.jpg"
//                                                 alt="Author"
//                                                 className="w-24 h-24 rounded-full"
//                                               />
//                                               <i className="icofont-quote-left"></i>
//                                             </div>
//                                             <div className="author-content pl-4">
//                                               <h4 className="text-2xl font-medium">
//                                                 Gertude Culbertson
//                                               </h4>
//                                               <span className="text-sm text-[#309255] mt-1.5 font-light">
//                                                 Product Designer, USA
//                                               </span>
//                                               <span className="rating-star">
//                                                 <span className="rating-bar"></span>
//                                               </span>
//                                             </div>
//                                           </div>
//                                           <p className="mt-7 font-light text-[#52565b] text-sm">
//                                             Lorem Ipsum has been the
//                                             industry&apos;s standard dummy text
//                                             since the 1500 when unknown printer
//                                             took a galley of type and scrambled
//                                             to make type specimen book has
//                                             survived not five centuries but also
//                                             the leap into electronic type and
//                                             book.
//                                           </p>
//                                         </div>
//                                       </div>
//                                       <div className="swiper-pagination"></div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div> */}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="lg:col-span-4">
//           <div className="bg-[#dff0e6] px-[30px] pt-[15px] pb-[25px]">
//             <h3 className="text-[22px] mt-2.5">Course Content</h3>
//             <span className="mt-2.5 text-[#309255] text-[18px]">
//               80 Lessons (8h 15m)
//             </span>
//           </div>
//           <div className="video-playlist bg-[#eefbf3] text-black">
//             <div className="accordion" id="videoPlaylist">
//               <nav className="vids">
//                 <a
//                   className={`link ${
//                     videoSrc ===
//                     "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&profile_id=119"
//                       ? "active text-[#309255] "
//                       : ""
//                   }`}
//                   href="#"
//                   onClick={() =>
//                     changeVideoSource(
//                       "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&profile_id=119"
//                     )
//                   }
//                 >
//                   <div className="pl-20 py-2 pr-[30px]">
//                     <p>01. The Complete Medicine Masterclass</p>
//                     <span
//                       className={`total-duration text-[#848886] text-[13px] mt-1.5`}
//                     >
//                       08 minutes
//                     </span>
//                   </div>
//                 </a>
//                 <a
//                   className={`link ${
//                     videoSrc ===
//                     "https://player.vimeo.com/external/207590826.hd.mp4?s=6a918d074abf8f3add7858018855524d384f6934&amp;profile_id=119"
//                       ? "active text-[#309255]"
//                       : ""
//                   }`}
//                   href="#"
//                   onClick={() =>
//                     changeVideoSource(
//                       "https://player.vimeo.com/external/207590826.hd.mp4?s=6a918d074abf8f3add7858018855524d384f6934&amp;profile_id=119"
//                     )
//                   }
//                 >
//                   <div className="pl-20 py-2 pr-[30px]">
//                     <p>02. The Complete Medicine Masterclass</p>
//                     <span
//                       className={`total-duration text-[#848886] text-[13px] mt-1.5`}
//                     >
//                       08 minutes
//                     </span>
//                   </div>
//                 </a>
//               </nav>
//               {/* <AccordionItem
//                 header="Lesson-01: Mindful Growth & the Creative Journey, Find
//                       Your Spark & Map Your Future"
//                 time="01 hour 48 minutes"
//                 timevideo="08 minutes"
//                 onLinkClick={changeVideoSource}
//               />
//               <AccordionItem
//                 header="Lesson-02: Mindful Growth & the Creative Journey, Find
//                       Your Spark & Map Your Future"
//                 time="01 hour 48 minutes"
//                 timevideo="08 minutes"
//                 onLinkClick={changeVideoSource}
//               /> */}
//             </div>
//           </div>
//           <div className="video-playlist bg-[#eefbf3] text-black">
//             <div className="accordion" id="videoPlaylist"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// {
//   /* <div className="accordion-item">
//                 <button
//                   className={`collapsed ${
//                     isDropdownOpen ? "text-[#309255] bg-[#dff0e6]" : "active"
//                   }`}
//                   type="button"
//                   onClick={toggleDropdown}
//                 >
//                   <div className="pl-[30px] pr-[50px] py-2">
//                     <p>
//                       Lesson-01: Mindful Growth & the Creative Journey, Find
//                       Your Spark & Map Your Future
//                     </p>
//                     <span>01 hour 48 minutes</span>
//                   </div>
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="accordion-collapse" id="collapseOne">
//                     <nav className="vids">
//                       <a
//                         className={`link ${
//                           videoSrc ===
//                           "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&profile_id=119"
//                             ? "active text-[#309255] "
//                             : ""
//                         }`}
//                         href="#"
//                         onClick={() =>
//                           changeVideoSource(
//                             "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&profile_id=119"
//                           )
//                         }
//                       >
//                         <div className="w-3.5 h-3.5 bg-[#309255] rounded-full"></div>
//                         <div className="pl-20 py-2 pr-[30px]">
//                           <p>01. The Complete Medicine Masterclass</p>
//                           <span
//                             className={`total-duration text-[#848886] text-[13px] mt-1.5`}
//                           >
//                             08 minutes
//                           </span>
//                         </div>
//                       </a>
//                       <a
//                         className={`link ${
//                           videoSrc ===
//                           "https://player.vimeo.com/external/207590826.hd.mp4?s=6a918d074abf8f3add7858018855524d384f6934&amp;profile_id=119"
//                             ? "active text-[#309255]"
//                             : ""
//                         }`}
//                         href="#"
//                         onClick={() =>
//                           changeVideoSource(
//                             "https://player.vimeo.com/external/207590826.hd.mp4?s=6a918d074abf8f3add7858018855524d384f6934&amp;profile_id=119"
//                           )
//                         }
//                       >
//                         <div className="pl-20 py-2 pr-[30px]">
//                           <p>02. Standard dummy text ever since the</p>
//                           <span className="total-duration">08 minutes</span>
//                         </div>
//                       </a>
//                     </nav>
//                   </div>
//                 )}
//               </div> */
// }
// {
//   /* <div className="accordion-item">
//                 <button
//                   className={`collapsed ${isDropdownOpen ? "" : "active"}`}
//                   type="button"
//                   onClick={toggleDropdown}
//                 >
//                   <p>
//                     Lesson-02: Science Fiction & Fantasy: Creating Unique and
//                     Powerful Worlds
//                   </p>
//                   <span className="total-duration">01 hour 48 minutes</span>
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="accordion-collapse" id="collapseOne">
//                     <nav className="vids">
//                       <a
//                         className={`link ${
//                           videoSrc ===
//                           "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&amp;profile_id=119"
//                             ? "active"
//                             : ""
//                         }`}
//                         href="#"
//                         onClick={() =>
//                           changeVideoSource(
//                             "https://player.vimeo.com/external/215175080.hd.mp4?s=5b17787857fd95646e67ad0f666ea69388cb703c&amp;profile_id=119"
//                           )
//                         }
//                       >
//                         <p>01. The Complete Medicine Masterclass</p>
//                         <span className="total-duration">08 minutes</span>
//                       </a>
//                       <a
//                         className={`link ${
//                           videoSrc ===
//                           "https://player.vimeo.com/external/207590826.hd.mp4?s=6a918d074abf8f3add7858018855524d384f6934&amp;profile_id=119"
//                             ? "active"
//                             : ""
//                         }`}
//                         href="#"
//                         onClick={() =>
//                           changeVideoSource(
//                             "https://player.vimeo.com/external/207590826.hd.mp4?s=6a918d074abf8f3add7858018855524d384f6934&amp;profile_id=119"
//                           )
//                         }
//                       >
//                         <p>02. Standard dummy text ever since the</p>
//                         <span className="total-duration">08 minutes</span>
//                       </a>
//                     </nav>
//                   </div>
//                 )}
//               </div> */
// }
