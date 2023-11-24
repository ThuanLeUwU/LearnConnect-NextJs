"use client";
import React, { useEffect, useState } from "react";
import LeftNavbar from "@/components/left-navbar/page";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { GrFormPrevious } from "react-icons/gr";
import { toast } from "sonner";

interface Report {
  id: number;
  reportType: string;
  description: string;
  timeStamp: string;
  imageUrl: string;
  reportByNavigation: {
    fullName: string;
    profilePictureUrl: string;
  };
}

const StaffReportID = ({ params }: any) => {
  const searchParam = useSearchParams();
  const [reportData, setReportData] = useState<Report[]>([]);
  const idCourse = params.id;
  const target = searchParam?.get("target");
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const router = useRouter();
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleBanClick = () => {
    setConfirmationModalOpen(true);
  };

  const handleCancelBan = () => {
    setConfirmationModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/report/get-reports?targetId=${idCourse}&reportType=${target}`
        );
        console.log("API Response:", response.data);
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idCourse]);

  const handleBack = () => {
    router.push(`/staff-page/staff-report`);
  };

  const fetchData = async () => {
    try {
      let apiUrl;

      if (target === "course") {
        apiUrl = `https://learnconnectapitest.azurewebsites.net/api/course/ban-course?courseId=${idCourse}&status=true`;
      }

      const response = await axios.post(apiUrl);
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleConfirmBan = async () => {
    try {
      await fetchData();
      setConfirmationModalOpen(false);
      handleBack();
      toast.success(`Successfully banned ${target}`);
    } catch (error) {
      console.error("Error banning course:", error);
      toast.error("Failed to ban course. Please try again.");
    }
  };

  return (
    <div className="flex">
      <LeftNavbar
        page1={"/staff-page"}
        page2={"/staff-page/staff-rating"}
        page3={"/staff-page/staff-report"}
        page4={"/staff-page/moderation"}
        page5={"/staff-page/list-major"}
      />

      <div className="w-full">
        <div className="flex">
          <div className="">
            <button
              className="mx-5 my-3 px-5 py-3 rounded-lg text-black bg-[#e7f8ee]"
              onClick={handleBack}
            >
              <GrFormPrevious className="text-2xl" />
            </button>
          </div>
          <div className="ml-auto">
            <button
              className="mx-5 my-3 px-5 py-3 bg-red-500 rounded-lg text-white"
              onClick={handleBanClick}
            >
              Ban this {target}
            </button>
          </div>
          <Modal
            open={isConfirmationModalOpen}
            onClose={handleCancelBan}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="bg-white p-8 w-96 rounded-md">
              <p className="text-xl mb-4">
                Are you sure you want to ban this {target}?
              </p>
              <div className="flex justify-end">
                <button
                  className="mx-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={handleConfirmBan}
                >
                  Confirm
                </button>
                <button
                  className="mx-2 px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={handleCancelBan}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </div>

        {Array.isArray(reportData) && reportData.length > 0 ? (
          reportData.map((report) => (
            <div
              key={report.id}
              className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-5 rounded-md mx-5 h-[250px]"
            >
              <div className="review-author flex justify-between">
                <div className="flex flex-row mb-3">
                  <div className="author-thumb p-2 rounded-full">
                    <img
                      src={report.reportByNavigation.profilePictureUrl}
                      alt="Author"
                      className="w-24 h-24 rounded-full border border-opacity-20 border-[#309255]"
                    />
                  </div>
                  <div className="author-content pl-4 flex flex-col">
                    <div className=" font-bold text-xl">
                      {report.reportByNavigation.fullName}
                    </div>
                    <span className=" text-[#309255] font-light">
                      {report.timeStamp
                        ? new Date(report.timeStamp).toLocaleTimeString("en-US")
                        : ""}{" "}
                      {report.timeStamp
                        ? new Date(report.timeStamp).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : ""}{" "}
                    </span>
                    <div className="mt-5">
                      <p>Reason: {report.reportType}</p>
                      <p>{report.description}</p>
                    </div>
                  </div>
                </div>
                <Modal
                  open={selectedReportId !== null}
                  onClose={() => setSelectedReportId(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="bg-white p-8 w-3/4 h-3/4 max-w-full max-h-full overflow-auto">
                    {selectedReportId !== null && (
                      <img
                        src={
                          reportData.find(
                            (report) => report.id === selectedReportId
                          )?.imageUrl || ""
                        }
                        alt="Larger Report img"
                        className="w-full h-auto"
                      />
                    )}
                  </div>
                </Modal>
                {report.imageUrl && (
                  <img
                    src={report.imageUrl}
                    alt="Report img"
                    className="w-52 h-52 border border-opacity-20 border-[#309255] rounded-lg"
                    onClick={() => setSelectedReportId(report.id)}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No reports available.</p>
        )}
      </div>
    </div>
  );
};

export default StaffReportID;
