import LeftNavbar from "@/components/left-navbar/page";
import StaffRatingTable from "@/components/staff-rating-table/page";

const StaffRating = () => {
  return (
    <div className="flex">
      <LeftNavbar
        page1={"/staff-page"}
        page2={"#"}
        page3={"/staff-page/staff-report"}
        page4={"#"}
      />
      <StaffRatingTable />
    </div>
  );
};

export default StaffRating;
