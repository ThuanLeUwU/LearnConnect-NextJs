"use client";
import React, { useEffect, useState } from "react";
import LeftNavbar from "@/components/left-navbar/page";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { useSearchParams } from "next/navigation";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://learnconnectapitest.azurewebsites.net/api/report/get-reports?targetId=${idCourse}&reportType=${target}`
        );
        setReportData(response.data);
        console.log("idCourse", idCourse);
        console.log("Data", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idCourse]);

  return (
    <div className="flex">
      <LeftNavbar
        page1={"/staff-page"}
        page2={"/staff-page/staff-rating"}
        page3={"/staff-page/staff-report"}
        page4={"/staff-page/moderation"}
        page5={"/staff-page/moderation-lecture"}
      />

      <div className="w-full">
        <div className="flex justify-end">
          <button className="mx-5 my-3 px-5 py-3 bg-red-500 rounded-lg text-white">
            Ban this {target}
          </button>
        </div>
        {reportData.length > 0 ? (
          reportData.map((report) => (
            <div
              key={report.id}
              className="single-review mt-3.5 border border-opacity-20 border-[#309255] p-5 rounded-md mx-5 h-[250px]"
            >
              <div className="review-author flex justify-between">
                <div className="flex flex-row">
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
                {/* <div>
                  <button
                    className="bg-[#309255] px-5 py-3 text-white rounded-lg w-[100px]"
                    onClick={() => setSelectedReportId(report.id)}
                  >
                    View
                  </button>
                </div> */}
                {/* <Modal
                  open={selectedReportId === report.id}
                  onClose={() => setSelectedReportId(null)}
                >
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-md">
                      <h2 className="text-2xl font-semibold mb-4">
                        Are you sure you want to hide this comment?
                      </h2>
                      
                    </div>
                  </div>
                </Modal> */}

                {/* <div>
                  <img
                    src={report.imageUrl}
                    alt="ImgReport"
                    className="w-72 h-72 rounded-lg"
                  />
                </div> */}
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
