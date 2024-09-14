import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import React, { useState, useEffect } from "react";
import { addLocale } from "primereact/api";

const MyCalendar = () => {
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    setDates([today, tomorrow]);
  }, []);

  addLocale("vi", {
    firstDayOfWeek: 1,
    dayNames: [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ],
    dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    monthNames: [
      "Tháng một",
      "Tháng hai",
      "Tháng ba",
      "Tháng tư",
      "Tháng năm",
      "Tháng sáu",
      "Tháng bảy",
      "Tháng tám",
      "Tháng chín",
      "Tháng mười",
      "Tháng mười một",
      "Tháng mười hai",
    ],
    monthNamesShort: [
      "Th1",
      "Th2",
      "Th3",
      "Th4",
      "Th5",
      "Th6",
      "Th7",
      "Th8",
      "Th9",
      "Th10",
      "Th11",
      "Th12",
    ],
    today: "Hôm nay",
    clear: "Xóa",
  });

  return (
    <Calendar
      value={dates}
      onChange={(e) => setDates(e.value)}
      numberOfMonths={2}
      showIcon
      selectionMode="range"
      readOnlyInput
      locale="vi"
      showButtonBar
    />
  );
};

export default MyCalendar;
