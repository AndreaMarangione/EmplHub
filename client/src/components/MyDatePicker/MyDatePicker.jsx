import React from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import './myDatePicker.css';

export default function MyDatePicker({ value, setValue, classStyle }) {
    const onChange = (date) => {
        setValue(() => date);
    }
    return (
        <div>
            <DatePicker
                className={classStyle}
                onChange={onChange}
                value={value}
                format="dd-MM-y" />
        </div>
    )
}
