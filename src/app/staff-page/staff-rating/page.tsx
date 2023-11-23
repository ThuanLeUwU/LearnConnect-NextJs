import LeftNavbar from "@/components/left-navbar/page";
import StaffRatingTable from "@/components/staff-rating-table/page";

const StaffRating = () => {
  return (
    <div className="flex">
      <LeftNavbar
        page1={"/staff-page"}
        page2={"#"}
        page3={"/staff-page/staff-report"}
        page4={"/staff-page/moderation"}
        page5={"/staff-page/moderation-lecture"}
      />
      <StaffRatingTable />
    </div>
  );
};

export default StaffRating;