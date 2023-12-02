import React from "react";
import "../../app/./globals.css";
import type { Dayjs } from "dayjs";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import { format } from "date-fns";

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
  if (!scheduleData) {
    return <Calendar />;
  }
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
    var start = scheduleData.find(
      (s) =>
        format(new Date(s.startDate), "dd/MM/yyyy") ===
        format(value.toDate(), "dd/MM/yyyy")
    )?.courseName;
    var end = scheduleData.find(
      (s) =>
        format(new Date(s.endDate), "dd/MM/yyyy") ===
        format(value.toDate(), "dd/MM/yyyy")
    )?.courseName;

    return (
      <ul className="events">
        {start && (
          <li>
            <Badge
              status={"success" as BadgeProps["status"]}
              text={`Start learn ${start}`}
            />
          </li>
        )}
        {end && (
          <li>
            <Badge
              status={"error" as BadgeProps["status"]}
              text={`Finish learn ${end}`}
            />
          </li>
        )}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default Schedule;
