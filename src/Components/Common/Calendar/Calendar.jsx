import { format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameDay, addMonths, subMonths, isSameMonth, endOfWeek, parse } from "date-fns";
import "./Cal.css";
import Event from "./Event";
import React, { useState } from "react";
export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [allRequests, getAllRequests] = useState([]);



    const header = () => {
        const dateFormat = "MMMM yyyy"; return (
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
                /* Mock event data, we'll pull our own once functionality is done */
                const eventItem = [{
                    batchId: 1,
                    userId: "Adem",
                    startTime: 3,
                    endTime: 4,
                    isAllDay: 5,
                    status: "Pending",
                    requestType: 7,
                    description: 8

                },{
                    batchId: 1,
                    userId: "Yusef",
                    startTime: 3,
                    endTime: 4,
                    isAllDay: 5,
                    status: "Second",
                    requestType: 7,
                    description: 8

                },{
                    batchId: 1,
                    userId: "David",
                    startTime: 3,
                    endTime: 4,
                    isAllDay: 5,
                    status: "Thrid",
                    requestType: 7,
                    description: 8

                }]
                days.push(
                    /* a div cell begin pushed into the calendar to display the events */
                    <div
                        className={`column cell ${!isSameMonth(day, monthStart)
                            ? "disabled" : isSameDay(day, selectedDate)
                                ? "selected" : ""}`}
                        key={day}

                        onClick={() => onDateClick(parse("", "", cloneDay))}
                        style={{overflowY: "auto"}}
                    >
                        <span className="number">{formattedDate}</span>
                        {/* One line div, on click it'll parse though the events and display them */}
                        <div onClick ={() => ShowEvents(eventItem)}>{"You have " + eventItem.length}</div>
                        {/* This was used to set the rows of each event */}
                        {/* <SetEventRow eventItems ={eventItem}></SetEventRow> */}
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
    /* Testing to push the events into a modal */
    const ShowEvents = (e) =>{
        
        
    }
    /* Gets the events and map them to their own event elemtn */
    const SetEventRow = (props) =>{
        return(
            <React.Fragment>
                {(props.eventItems.map((event)=>
                <Event eventItem = {event}></Event>
                ))}

            </React.Fragment>
        )
    }
    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };
    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
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