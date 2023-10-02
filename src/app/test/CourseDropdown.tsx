import Link from "next/link";
import React, { useState } from "react";
import './style.css';

export const CourseDropDown = () => {
  const MenuItem = [
    {
      href: "/",
      title: "Course",
    },
    {
      href: "/",
      title: "Course Details",
    },
  ];

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItem.map((item, index) => {
          return (
            <li key={index}>
              <Link
                href={item.href}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

