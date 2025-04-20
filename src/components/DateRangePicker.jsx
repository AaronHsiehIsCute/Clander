import React, { useState } from "react";
import "../styles/DateRangePicker.css";

const DateRangePicker = ({ initialYear, initialMonth, onSelectRange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const today = new Date();
  const defaultYear = today.getFullYear();
  const defaultMonth = today.getMonth();

  const year = initialYear !== undefined ? initialYear : defaultYear;
  const month = initialMonth !== undefined ? initialMonth : defaultMonth;
  const showMonth = month + 1;

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  /*
  Sunday: 2, Monday: 1 
  calendarStartDay(日曆變數)
  有鑑於需求(題目)在2022年7月的日曆是「一、二、三、四、五、六、日」排序類似亞洲的日曆，所以帶入變數2
  如果是要「日、一、二、三....六」以禮拜日為開頭，類似Windows排序的日曆，則帶入變數1
  */
  const calendarStartDay = 2;

  const days = [];

  // 填滿上個月的日曆
  for (let i = firstDayOfMonth - calendarStartDay; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthDays - i),
      currentMonth: false,
    });
  }

  // 本月天數
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      currentMonth: true,
    });
  }

  // 填充下個月的日曆
  while (days.length % 7 !== 0) {
    const nextDay =
      days.length - (firstDayOfMonth + daysInMonth) + calendarStartDay;
    days.push({
      date: new Date(year, month + 1, nextDay),
      currentMonth: false,
    });
  }

  const isSameDay = (d1, d2) =>
    d1 && d2 && d1.toDateString() === d2.toDateString();

  const isInRange = (date) => {
    return startDate && endDate && date > startDate && date < endDate;
  };

  const handleClick = (day) => {
    if (!day.currentMonth) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(day.date);
      setEndDate(null);
      if (onSelectRange) {
        onSelectRange({ start: day.date, end: null });
      }
    } else if (day.date < startDate) {
      setStartDate(day.date);
      setEndDate(null);
      if (onSelectRange) {
        onSelectRange({ start: day.date, end: null });
      }
    } else {
      setEndDate(day.date);
      if (onSelectRange) {
        onSelectRange({ start: startDate, end: day.date });
      }
    }
  };

  return (
    <div className="date-picker">
      <div className="header">
        <button className="month-btn" disabled>
          &lt;
        </button>
        <div className="month-title">
          {year}年{showMonth}月
        </div>
        <button className="month-btn" disabled>
          &gt;
        </button>
      </div>
      <div className="days-grid">
        {days.map((day) => {
          let classes = "day";
          if (!day.currentMonth) classes += " non-current";
          if (isSameDay(day.date, today)) classes += " today";
          if (isSameDay(day.date, startDate) || isSameDay(day.date, endDate))
            classes += " selected";
          if (isInRange(day.date)) classes += " in-range";

          return (
            <div
              key={`${day.date.getTime()}-${day.currentMonth}`}
              className={classes}
              onClick={() => handleClick(day)}
            >
              {day.date.getDate()}日
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateRangePicker;
