import {
    format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameDay,
    addMonths, subMonths, isSameMonth, endOfWeek, parse, addYears, subYears
} from "date-fns";
import "./Cal.css";
import Event from "./Event";
import React, { useState } from "react";
import Modal from "../Modal";
export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [allRequests, getAllRequests] = useState([]);

    /* Mock event data, we'll pull our own once functionality is done */
    const all = [{
        batchId: 1,
        userId: "Adem",
        startTime: new Date('8 Aug 2020 00:00:00 PDT').toUTCString(),
        endTime: 4,
        isAllDay: 5,
        status: "Pending",
        requestType: 7,
        description: 8

    }, {
        batchId: 1,
        userId: "Yusef",
        startTime: new Date('7 Aug 2020 00:00:00 PDT').toUTCString(),
        endTime: 4,
        isAllDay: 5,
        status: "Second",
        requestType: 7,
        description: 8

    }, {
        batchId: 1,
        userId: "David",
        startTime: new Date('6 Aug 2020 00:00:00 PDT').toUTCString(),
        endTime: 4,
        isAllDay: 5,
        status: "Thrid",
        requestType: 7,
        description: 8

    }]

    const header = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="header row flex-middle">
                <div className="column col-start">
                    <div className="icon" onClick={prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="column col-center">
                    <span>{format(currentDate, dateFormat)}</span>
                </div>
                <div className="column col-end">
                    <div className="icon" onClick={nextMonth}>
                        chevron_right
                    </div>
                </div>
                <div className="column col-start">
                    <div className="icon" onClick={prevYear}>
                        P
                    </div>
                </div>
                <div className="column col-center">
                    <span>{format(currentDate, dateFormat)}</span>
                </div>
                <div className="column col-end">
                    <div className="icon" onClick={nextYear}>
                        N
                    </div>
                </div>
            </div>
        );
    };
    const days = () => {
        const dateFormat = "ddd";
        const days = [];
        let startDate = startOfWeek(currentDate); for (let i = 0; i < 7; i++) {
            days.push(
                <div className="column col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    };
    const cells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                /* Filters out any day that's not the cloneDay's current day */
                let properDays = all.filter(event => event.startTime.includes(cloneDay.toUTCString().slice(0, 17)))
                days.push(
                    /* a div cell begin pushed into the calendar to display the events */
                    <div
                        className={`column cell ${!isSameMonth(day, monthStart)
                            ? "disabled" : isSameDay(day, selectedDate)
                                ? "selected" : ""}`}
                        key={day}


                        onClick={() => onDateClick(parse("", "", cloneDay))}
                        style={{ overflowY: "auto" }}
                    >
                        <span className="number">{formattedDate}</span>
                        <br/>
                        {/* The div for the modal to use for its onclick */}
                        {properDays.length > 0 &&
                            <div /* onClick={ModalEvent(properDays)} */ style= {{backgroundColor: "Black"}}>Events {properDays.length}</div>
                        }
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}> {days} </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }
    /**
     * On click of the Div bring up the modal and display the events
     * events is an array of requests
     * @param {any} events 
     */
    const ModalEvent = (events) => {
        return (
            <React.Fragment>
                {alert("You clicked")}
            </React.Fragment>
        )
    }
    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };
    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };
    const nextYear = () => {
        setCurrentDate(addYears(currentDate, 1));
    };
    const prevYear = () => {
        setCurrentDate(subYears(currentDate, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);

    }
    return (
        <div className="calendar">
            <div>{header()}</div>
            <div>{days()}</div>
            <div>{cells()}</div>
        </div>
    );
}; 