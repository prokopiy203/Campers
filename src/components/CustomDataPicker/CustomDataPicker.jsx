import styles from "./CustomDataPicker.module.css";

import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <input
    type="text"
    onClick={onClick}
    ref={ref}
    placeholder="Booking date*"
    value={value || ""}
    readOnly
    className={styles.formDataPicker}
  />
));

export default function CustomDatePicker({ selectedDate, onDateChange }) {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 14);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      minDate={today}
      maxDate={maxDate}
      dateFormat="dd.MM.yyyy"
      showPopperArrow={false}
      customInput={<CustomInput />}
      calendarClassName={styles.reactDatepicker}
      dayClassName={() => styles.reactDatepicker__day} //
      wrapperClassName={styles.wrapper}
      shouldCloseOnSelect={true}
    />
  );
}
