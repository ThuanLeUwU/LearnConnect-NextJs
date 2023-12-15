"use client";
import Link from "next/link";
import InstructorCourseStyle from "./styles.module.scss";
import { Tooltip } from "antd";
import { useState } from "react";

const LeftNavbar = ({ page1, page2, page3, page4, page5, page6, page7 }) => {
  const [activeMenu, setActiveMenu] = useState<number>();
  const menuItem = [
    {
      image: "/menu-icon/form.png",
      title: "Specialize Request",
      href: `${page1}`,
    },
    {
      image: "/menu-icon/course.png",
      title: "Courses",
      href: `${page4}`,
    },
    {
      image: "/menu-icon/star.png",
      title: "Ratings",
      href: `${page2}`,
    },
    {
      image: "/menu-icon/flag-alt (2).png",
      title: "Reports",
      href: `${page3}`,
    },
    {
      image: "/menu-icon/book-bookmark.png",
      title: "Major&Specialization",
      href: `${page5}`,
    },
    {
      image: "/menu-icon/stats.png",
      title: "Revenue",
      href: `${page6}`,
    },
    {
      image: "/menu-icon/receipt.png",
      title: "Transaction History",
      href: `${page7}`,
    },
  ];

  return (
    <div>
      <div className="bg-[#309255] w-28 flex justify-center items-start gap-2.5 h-full min-h-[1000px]">
        <div>
          {menuItem.map((item, index) => (
            <Tooltip key={index} title={item.title}>
              <Link
                href={item.href}
                className={`${InstructorCourseStyle.sidebar_active} mt-5`}
              >
                <img src={item.image} alt={`icon-${index + 1}`} />

                {/* <span className="text-white">{item.title}</span> */}
              </Link>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
