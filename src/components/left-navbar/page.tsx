import Link from "next/link";
import InstructorCourseStyle from "./styles.module.scss";

const LeftNavbar = ({ page1, page2, page3, page4 }) => {
  const menuItem = [
    {
      image: "/menu-icon/icon-1.png",
      href: `${page1}`,
    },
    {
      image: "/menu-icon/icon-2.png",
      href: `${page2}`,
    },
    {
      image: "/menu-icon/icon-3.png",
      href: `${page3}`,
    },
    {
      image: "/menu-icon/icon-4.png",
      href: `${page4}`,
    },
  ];

  return (
    <div>
      <div className="bg-[#309255] w-28 flex justify-center items-start gap-2.5 h-full min-h-[1000px]">
        <div>
          {menuItem.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`${InstructorCourseStyle.sidebar_active} mt-5`}
            >
              <img src={item.image} alt={`icon-${index + 1}`} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
