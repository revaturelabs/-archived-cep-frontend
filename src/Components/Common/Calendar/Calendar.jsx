import {
    format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameDay,
    addMonths, subMonths, isSameMonth, endOfWeek, parse, addYears, subYears
} from "date-fns";
import "./Cal.css";
import React, { useState, useEffect } from "react";
import CalModal from "./Calmodal";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const token = useSelector((state) => state.credReducer.token);
    const [allRequests, getAllRequests] = useState([]);

    useEffect(() => {
        axios
          .get(
            process.env.REACT_APP_ZUUL_ROUTE + "/interventions",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          //  .then(res=>res.json())
          .then((response) => {
            //Console.log used to check the fields to set up the adminItem for later
            getAllRequests(response.data);
          })
          .catch((err) => console.log());
      }, []);

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
                let properDays = allRequests.filter(event => event.startTime.includes(cloneDay.toISOString().slice(0, 10)))
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
                            <CalModal Events={properDays} />
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