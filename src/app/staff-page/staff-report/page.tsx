import LeftNavbar from "@/components/left-navbar/page";

const StaffRating = () => {
  return (
    <div className="flex">
      <LeftNavbar
        page1={"/staff-page"}
        page2={"/staff-page/staff-rating"}
        page3={"#"}
        page4={"#"}
      />
      <p>Staff Report</p>
    </div>
  );
};

export default StaffRating;
