import React, { useState } from "react";
import "../../app/./globals.css";
import type { Dayjs } from "dayjs";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar, Modal, Input } from "antd";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { http } from "@/api/http";
import { toast } from "sonner";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";

type ScheduleData = {
  scheduleData: {
    id: number;
    courseName: string;
    courseId: number;
    startDate: string;
    endDate: string;
    note: string;
    status: number;
    userId: number;
  }[];
};

const Schedule: React.FC<ScheduleData> = ({ scheduleData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [editedNote, setEditedNote] = useState<string>("");
  const router = useRouter();
  const currentDate = format(new Date(), "MMMM d, yyyy");
  const { TextArea } = Input;
  const [editMode, setEditMode] = useState(0);

  const handleEventClick = (event: any) => {
    console.log("Event", event);
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const DeleteEvent = async (id: any) => {
    await http
      .delete(
        `https://learnconnectapitest.azurewebsites.net/api/schedule/${id}`
      )
      .then(() => {
        toast.success("Delete Event Success");
        setModalVisible(false);
      });
  };

  const EditEvent = async (schedule) => {
    schedule.note = editedNote;
    await http
      .put(
        `https://learnconnectapitest.azurewebsites.net/api/schedule/${schedule.id}`,
        schedule
      )
      .then(() => {
        toast.success("Edit Event Success");
        setModalVisible(false);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
    setEditMode(0);
  };

  if (!scheduleData) {
    return <Calendar />;
  }

  const handleMoveToCourse = (id) => {
    router.push(`/course-detail/${id}`);
  };

  const monthCellRender = (value: Dayjs) => {
    for (const s of scheduleData) {
      if (
        value.month() === new Date(s.startDate).getUTCMonth() &&
        value.year() === new Date(s.startDate).getUTCFullYear()
      ) {
        return (
          <div className="notes-month" key={s.id}>
            <span>This month has a learning schedule</span>
          </div>
        );
      }
    }
    return null;
  };

  const dateCellRender = (value: Dayjs) => {
    var start = scheduleData.filter(
      (s) =>
        format(new Date(s.startDate), "dd/MM/yyyy") ===
        format(value.toDate(), "dd/MM/yyyy")
    );
    var end = scheduleData.filter(
      (s) =>
        format(new Date(s.endDate), "dd/MM/yyyy") ===
        format(value.toDate(), "dd/MM/yyyy")
    );

    return (
      <ul className="events">
        <button onClick={() => handleEventClick({ start: start, end: end })}>
          {start &&
            start.map((s, index) => (
              <li className="text-start" key={index}>
                <Badge
                  status={"success" as BadgeProps["status"]}
                  text={`Start learn ${s.courseName}`}
                />
              </li>
            ))}

          {end &&
            end.map((s, index) => (
              <li className="text-start" key={index}>
                <Badge
                  status={"error" as BadgeProps["status"]}
                  text={`end learn ${s.courseName}`}
                />
              </li>
            ))}
        </button>
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <Calendar cellRender={cellRender} />
      <Modal
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        centered
      >
        <div style={{ textAlign: "center" }}>
          <p className="font-bold text-2xl ">Event Details</p>
        </div>
        {selectedEvent?.start && selectedEvent.start.length > 0 && (
          <div className="border border-[] bg-[#e7f8ee] px-4 py-2 mt-2 rounded-lg">
            <p className="font-bold text-2xl mt-3">
              Start Today: <span className="font-normal">{currentDate}</span>
            </p>
            {selectedEvent.start.map((s, index) => (
              <div key={index}>
                <button
                  onClick={() => {
                    handleMoveToCourse(s?.courseId);
                  }}
                >
                  {" "}
                  <p className="hover:underline text-xl font-bold mt-1">
                    {s?.courseName}
                  </p>
                </button>
                {editMode === s.id ? (
                  <div className="flex">
                    <TextArea
                      defaultValue={s?.note}
                      onChange={(e) => setEditedNote(e.target.value)}
                      className="w-11/12 flex"
                    />
                    <div className="flex-col flex justify-between">
                      <button
                        className="text-xl ml-2 text-red-500"
                        onClick={() => setEditMode(0)}
                      >
                        <AiOutlineClose />
                      </button>
                      <button
                        className="text-2xl ml-2 text-green-500"
                        onClick={() => {
                          EditEvent(s);
                          setEditMode(0);
                        }}
                      >
                        <BiCheck />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="mt-1">{s?.note}</p>
                    <div className="flex">
                      <button
                        className="bg-white min-w-[30px] text-black border border-[#E0E0E0] hover:border-red-500 rounded-lg hover:text-black transition duration-300 p-2 flex ml-auto"
                        onClick={() => setEditMode(s.id)}
                      >
                        <CiEdit />
                      </button>
                      <button
                        className="bg-white min-w-[30px] text-black border border-[#E0E0E0] hover:border-red-500 rounded-lg hover:text-black transition duration-300 p-2 flex ml-2"
                        onClick={() => {
                          DeleteEvent(s.id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {selectedEvent?.end && selectedEvent.end.length > 0 && (
          <div className="border border-[] bg-[#edc4c2] px-4 py-2 mt-2 rounded-lg">
            <p className="font-bold text-2xl mt-3">
              Finish Today: <span className="font-normal">{currentDate}</span>
            </p>
            {selectedEvent.end.map((s, index) => (
              <div key={index}>
                <button
                  onClick={() => {
                    handleMoveToCourse(s?.courseId);
                  }}
                >
                  {" "}
                  <p className="hover:underline text-xl font-bold mt-1">
                    {s?.courseName}
                  </p>
                </button>
                {editMode === s.id ? (
                  <div className="flex">
                    <TextArea
                      defaultValue={s?.note}
                      onChange={(e) => setEditedNote(e.target.value)}
                      className="w-11/12 flex"
                    />
                    <div className="flex-col flex justify-between">
                      <button
                        className="text-xl ml-2 text-red-500"
                        onClick={() => setEditMode(0)}
                      >
                        <AiOutlineClose />
                      </button>
                      <button
                        className="text-2xl ml-2 text-green-500"
                        onClick={() => {
                          EditEvent(s);
                          setEditMode(0);
                        }}
                      >
                        <BiCheck />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="mt-1">{s?.note}</p>
                    <div className="flex">
                      <button
                        className="bg-white min-w-[30px] text-black border border-[#E0E0E0] hover:border-red-500 rounded-lg hover:text-black transition duration-300 p-2 flex ml-auto"
                        onClick={() => setEditMode(s.id)}
                      >
                        <CiEdit />
                      </button>
                      <button
                        className="bg-white min-w-[30px] text-black border border-[#E0E0E0] hover:border-red-500 rounded-lg hover:text-black transition duration-300 p-2 flex ml-2 "
                        onClick={() => {
                          DeleteEvent(s.id);
                        }}
                      >
                        <MdDelete />
                      </button>{" "}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};

export default Schedule;
