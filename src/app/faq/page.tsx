"use client";
import React, { useState } from "react";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  return (
    <></>
//     <div className="py-20">
//   <div className="tab-content">
//     <div className="flex justify-center bg-[#e7f8ee] py-4 rounded-md">
//       <ul className="tabs flex space-x-5">
//         <li
//           className={`cursor-pointer rounded-md ${
//             activeTab === "tab1"
//               ? "bg-[#309255] text-white"
//               : "bg-white"
//           }`}
//           onClick={() => handleTabClick("tab1")}
//         >
//           <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
//             Curriculum:
//           </button>
//         </li>
//         <li
//           className={`cursor-pointer rounded-md ${
//             activeTab === "tab2"
//               ? "bg-[#309255] text-white"
//               : "bg-white"
//           }`}
//           onClick={() => handleTabClick("tab2")}
//         >
//           <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
//             Instructors
//           </button>
//         </li>
//         <li
//           className={`cursor-pointer rounded-md ${
//             activeTab === "tab3"
//               ? "bg-[#309255] text-white"
//               : "bg-white"
//           }`}
//           onClick={() => handleTabClick("tab3")}
//         >
//           <button className="w-32 h-11 text-center text-base font-medium border border-solid border-[#30925533] border-opacity-20 rounded-md hover:bg-[#309255]">
//             Reviews
//           </button>
//         </li>
//       </ul>
//     </div>
//     {activeTab === "tab1" && (
//       <div>
//         <p>content1</p>
//       </div>
//     )}
//     {activeTab === "tab2" && (
//       <div>
//         <p>content2</p>
//       </div>
//     )}
//     {activeTab === "tab3" && (
//       <div>
//         <p>content3</p>
//       </div>
//     )}
//   </div>
// </div>

  );
}
