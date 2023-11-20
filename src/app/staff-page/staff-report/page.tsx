import LeftNavbar from "@/components/left-navbar/page";
import StaffReportTable from "@/components/staff-report-table/page";

const StaffRating = () => {
  return (
    <div className="flex">
      <LeftNavbar
        page1={"/staff-page"}
        page2={"/staff-page/staff-rating"}
        page3={"#"}
        page4={"#"}
      />
      <StaffReportTable />
    </div>
  );
};

export default StaffRating;
