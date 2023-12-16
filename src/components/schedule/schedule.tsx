import React, { useState } from "react";
import "../../app/./globals.css";
import type { Dayjs } from "dayjs";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar, Modal, Input, Button, Space, Form } from "antd";
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
  fetchSchedule: () => void;
};

const Schedule: React.FC<ScheduleData> = ({ scheduleData, fetchSchedule }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [editedNote, setEditedNote] = useState<string>("");
  const router = useRouter();
  const currentDate = format(new Date(), "MMMM d, yyyy");
  const { TextArea } = Input;
  const [editMode, setEditMode] = useState(0);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleEventClick = (event: any) => {
    console.log("Event", event);
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const DeleteEvent = async (id: any) => {
    await http
      .delete(`https://learnconnectserver.azurewebsites.net/api/schedule/${id}`)
      .then(() => {
        setOpen(true);
        toast.success("Delete Event Success");
        setModalVisible(false);
        fetchSchedule();
      });
  };

  const EditEvent = async (schedule) => {
    schedule.note = editedNote;
    await http
      .put(
        `https://learnconnectserver.azurewebsites.net/api/schedule/${schedule.id}`,
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
    setOpen(false);
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
          <div className=" border-t border-t-[#309255] px-4 py-2 mt-2">
            {selectedEvent.start.map((s, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      handleMoveToCourse(s?.courseId);
                    }}
                  >
                    {" "}
                    <p className="hover:underline text-xl font-bold mt-2">
                      {s?.courseName}
                    </p>
                  </button>
                  {index === 0 && (
                    <p className="border-[#309255] border py-1 px-2 font-normal rounded-lg text-[#309255] mt-2">
                      Start
                    </p>
                  )}
                </div>
                {editMode === s.id ? (
                  <div className="flex">
                    <TextArea
                      defaultValue={s?.note}
                      onChange={(e) => setEditedNote(e.target.value)}
                      className="w-11/12 flex my-2"
                      autoSize={{ minRows: 4, maxRows: 15 }}
                    />
                    <div className="flex-col flex justify-between">
                      <button
                        className="text-xl ml-2 text-red-500 my-2"
                        onClick={() => setEditMode(0)}
                      >
                        <AiOutlineClose />
                      </button>
                      <button
                        className="text-2xl ml-2 text-green-500 my-2"
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
                          setOpen(true);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )}
                <Modal
                  destroyOnClose={true}
                  title={
                    <div className="text-lg">Do you want to Delete Event?</div>
                  }
                  open={open}
                  // onOk={handleOk}
                  width="35%"
                  onCancel={() => {
                    setOpen(false);
                  }}
                  footer={false}
                  style={{
                    top: "30%",
                  }}
                >
                  <Form
                    autoComplete="off"
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    layout="horizontal"
                    className="mt-5"
                    style={{ width: "100%" }}
                    onFinish={() => {
                      DeleteEvent(s.id);
                      setOpen(false);
                    }}
                  >
                    <Space className="justify-end w-full">
                      <Form.Item className="mb-0">
                        <Space>
                          <Button
                            className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                            onClick={() => {
                              setOpen(false);
                            }}
                            style={{
                              // backgroundColor: "#4caf50",
                              // borderColor: "#4caf50",
                              border: "2px solid #E0E0E0",
                              color: "black",
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="hover:bg-[#67b46a] border border-[#4caf50] bg-[#4caf50] text-white transition duration-300 px-2 py-1"
                            htmlType="submit"
                            style={{
                              // backgroundColor: "#4caf50",
                              // borderColor: "#4caf50",
                              border: "2px solid #4caf50",
                              color: "#fff",
                            }}
                          >
                            Confirm
                          </Button>
                        </Space>
                      </Form.Item>
                    </Space>
                  </Form>
                </Modal>
              </div>
            ))}
          </div>
        )}
        {selectedEvent?.end && selectedEvent.end.length > 0 && (
          <div className=" border-t border-t-red-700 px-4 py-2 mt-2">
            {selectedEvent.end.map((s, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      handleMoveToCourse(s?.courseId);
                    }}
                  >
                    {" "}
                    <p className="hover:underline text-xl font-bold mt-2">
                      {s?.courseName}
                    </p>
                  </button>
                  {index === 0 && (
                    <p className="border-red-700 border py-1 px-2 font-normal rounded-lg text-red-700 mt-2">
                      Finish
                    </p>
                  )}
                </div>
                {editMode === -s.id ? (
                  <div className="flex">
                    <TextArea
                      defaultValue={s?.note}
                      onChange={(e) => setEditedNote(e.target.value)}
                      autoSize={{ minRows: 4, maxRows: 15 }}
                      className="w-11/12 flex my-2"
                    />
                    <div className="flex-col flex justify-between ">
                      <button
                        className="text-xl ml-2 text-red-500 my-2"
                        onClick={() => setEditMode(0)}
                      >
                        <AiOutlineClose />
                      </button>
                      <button
                        className="text-2xl ml-2 text-green-500 my-2"
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
                        onClick={() => setEditMode(-s.id)}
                      >
                        <CiEdit />
                      </button>
                      <button
                        className="bg-white min-w-[30px] text-black border border-[#E0E0E0] hover:border-red-500 rounded-lg hover:text-black transition duration-300 p-2 flex ml-2"
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )}
                <Modal
                  destroyOnClose={true}
                  title={
                    <div className="text-lg">Do you want to Delete Event?</div>
                  }
                  open={open}
                  // onOk={handleOk}
                  width="35%"
                  onCancel={() => {
                    setOpen(false);
                  }}
                  footer={false}
                  style={{
                    top: "30%",
                  }}
                >
                  <Form
                    autoComplete="off"
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    layout="horizontal"
                    className="mt-5"
                    style={{ width: "100%" }}
                    onFinish={() => {
                      DeleteEvent(s.id);
                      setOpen(false);
                    }}
                  >
                    <Space className="justify-end w-full">
                      <Form.Item className="mb-0">
                        <Space>
                          <Button
                            className="bg-white min-w-[60px] text-black border  hover:bg-gray-200 hover:text-black transition duration-300 px-2 py-1"
                            onClick={() => {
                              setOpen(false);
                            }}
                            style={{
                              // backgroundColor: "#4caf50",
                              // borderColor: "#4caf50",
                              border: "2px solid #E0E0E0",
                              color: "black",
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="hover:bg-[#67b46a] border border-[#4caf50] bg-[#4caf50] text-white transition duration-300 px-2 py-1"
                            htmlType="submit"
                            style={{
                              // backgroundColor: "#4caf50",
                              // borderColor: "#4caf50",
                              border: "2px solid #4caf50",
                              color: "#fff",
                            }}
                          >
                            Confirm
                          </Button>
                        </Space>
                      </Form.Item>
                    </Space>
                  </Form>
                </Modal>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};

export default Schedule;
