import LeftNavbar from "@/components/left-navbar/page";

const StaffRating = () => {
  return (
    <div className="flex">
      <LeftNavbar
        page1={"/staff-page"}
        page2={"#"}
        page3={"/staff-page/staff-report"}
        page4={"#"}
      />
      <p>Staff Rating</p>
    </div>
  );
};

export default StaffRating;
