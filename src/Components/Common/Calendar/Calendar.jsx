import {
    format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameDay,
    addMonths, subMonths, isSameMonth, endOfWeek, parse, addYears, subYears
} from "date-fns";
import "./Cal.css";
import React, { useState, useEffect } from "react";
import CalModal from "./Calmodal";
import axios from "axios";
import { useSelector } from "react-redux";

/**
 * Authors Armondo, Miki
 * Displays the intervents that is avaliable to the Admin
 */
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
          .then((response) => {
            getAllRequests(response.data);
          })
          .catch((err) => console.log());
      }, []);
/* Display the header that allows for moving Month and Year */
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
    /* Getting the days  */
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
    /* Making the cells */
    const cells = () => {
        /* this is a long winded way to get the data we needed */
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
                /* Filters out any day that's not the cloneDay's current day 
                    by slicing off what isn't needed and checking with the startTime*/
                let properDays = allRequests.filter(event => event.startTime.includes(cloneDay.toISOString().slice(0, 10)))
                /* a div cell begin pushed into the calendar to display the events */
                days.push(
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
                        {/*If there is one or more events display the Modal */}
                        {properDays.length > 0 &&
                        /* Loading in the array of events */
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