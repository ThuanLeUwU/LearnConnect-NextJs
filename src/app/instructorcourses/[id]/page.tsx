"use client";
import React from "react";
import InstructorCourseStyle from ".././styles/style.module.scss";
import Link from "next/link";

const Dashboard = ({ params }: any) => {
  const idCourse = params.id;
  //   console.log(" idcourse", idCourse);

  const menuItem = [
    {
      image: "/menu-icon/icon-1.png",
      href: "/instructorcourses",
    },
    {
      image: "/menu-icon/icon-2.png",
      href: "/dashboard",
    },
    {
      image: "/menu-icon/icon-3.png",
      href: "/instructorcourses",
    },
    {
      image: "/menu-icon/icon-4.png",
      href: "/instructorcourses",
    },
  ];
  const data = [
    { name: "January", Total: 1200 },
    { name: "February", Total: 2100 },
    { name: "March", Total: 800 },
    { name: "April", Total: 1600 },
    { name: "May", Total: 900 },
    { name: "June", Total: 1700 },
  ];

  return (
    <div className={`${InstructorCourseStyle.content_wrapper}`}>
      <div className={`${InstructorCourseStyle.sidebar_wrapper}`}>
        <div className={`${InstructorCourseStyle.sidebar_list}`}>
          {menuItem.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.href}
                className={`${InstructorCourseStyle.sidebar_active}`}
              >
                <img src={item.image} alt="image"></img>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={`${InstructorCourseStyle.body_wrapper}`}>
        <div className={`${InstructorCourseStyle.featured}`}>
          <div className={`${InstructorCourseStyle.featured_top}`}>
            <h1 className={`${InstructorCourseStyle.featured_top_title}`}>
              Total Revenue
            </h1>
            {/* <MoreVertIcon fontSize="small" /> */}
          </div>
          <div className={`${InstructorCourseStyle.featured_bottom}`}>
            <div
              className={`${InstructorCourseStyle.featured_bottom_featuredChart}`}
            >
              {/* <CircularProgressbar value={70} text={"70%"} strokeWidth={5} /> */}
            </div>
            <p className={`${InstructorCourseStyle.featured_bottom_title}`}>
              Total sales made today
            </p>
            <p className={`${InstructorCourseStyle.featured_bottom_amount}`}>
              $420
            </p>
            <p className={`${InstructorCourseStyle.featured_bottom_desc}`}>
              Previous transactions processing. Last payments may not be
              included.
            </p>
            <div className={`${InstructorCourseStyle.featured_bottom_summary}`}>
              <div
                className={`${InstructorCourseStyle.featured_bottom_summary_item}`}
              >
                <div
                  className={`${InstructorCourseStyle.featured_bottom_summary_item_itemTitle}`}
                >
                  Target
                </div>
                <div
                  className={`${InstructorCourseStyle.featured_bottom_summary_item_itemTitle}`}
                >
                  {/* <KeyboardArrowDownIcon fontSize="small"/> */}
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
              <div
                className={`${InstructorCourseStyle.featured_bottom_summary_item}`}
              >
                <div
                  className={`${InstructorCourseStyle.featured_bottom_summary_item_itemTitle}`}
                >
                  Last Week
                </div>
                <div
                  className={`${InstructorCourseStyle.featured_bottom_summary_item_itemTitle}`}
                >
                  {/* <KeyboardArrowUpOutlinedIcon fontSize="small"/> */}
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Last Month</div>
                <div className="itemResult positive">
                  {/* <KeyboardArrowUpOutlinedIcon fontSize="small"/> */}
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
