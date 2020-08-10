import {
    format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameDay,
    addMonths, subMonths, isSameMonth, endOfWeek, parse, addYears, subYears, isWednesday
} from "date-fns";
// import "./Cal.css";
import React, { useState, useEffect } from "react";
import CalModal from "./Calmodal";
import axios from "axios";
import { useSelector } from "react-redux";
import { makeStyles, Button, Typography, TextField, StyleRules } from "@material-ui/core";

const useStyles: Function = makeStyles((theme): StyleRules => ({
    calendar: {
        display: "block",
        position: "relative",
        width: "auto",
        background: "white",
        border: "1px solid lightgray",
        height: "auto",
        margin: "100px auto",
    },
    header: {
        fontWeight: 700,
        fontSize: "115%",
        padding: "1.5em 0",
        borderBottom: "1px solid lightgray",
    },
    icon: {
        display: "inline-block",
        margin: "auto",
        textAlign: "center",
        cursor: "pointer",
    },
    days: {
        textTransform: "uppercase",
        fontWeight: 400,
        color: "gray",
        fontSize: "70%",
        padding: ".75em 0",
        borderBottom: " 1px solid lightgray",
    },
    cell: {
        position: "relative",
        height: "6em",
        borderRight: "1px solid lightgray",
        overflow: "hidden",
        cursor: "pointer",
        background: "white",
        transition: "0.25s ease- out",
        // background: "whitesmoke",
        // transition: "0.5s ease-out",
        // borderRight: "none",
    },
    selected: {
        borderBottom: "10px solid #f26925",
        // backgroundColor: "#eeeeee",
    },
    row: {
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        borderBottom: "1px solid lightgray",
        // borderBottom: "none",
    },
    number: {
        position: "absolute",
        fontSize: "82.5%",
        lineHeight: 1,
        top: ".75em",
        right: ".75em",
        fontWeight: 700,
    },
    disabled: {
        color: "lightgray",
        pointerEvents: "none",
    },
    bg: {
        fontWeight: 700,
        lineHeight: 1,
        color: "#1affa0",
        opacity: 0,
        fontSize: "5em",
        position: "absolute",
        top: "-.2em",
        right: "-.05em",
        transition: ".25s ease- out",
        letterSpacing: "-.07em",
        // opacity: "0.2",
        // transition: ".5s ease-in",
    },
    column: {
        maxWidth: "100%",
        flexGrow: 0,
        flexBasis: "calc(100%/7)",
        width: "calc(100%/7)",
    },
    centerAlign: {
        margin: "auto",
        textAlign: "center"
    }


}));

interface styleINF {
    calendar: string,
    header: string,
    icon: string,
    days: string,
    cell: string,
    selected: string,
    row: string,
    number: string,
    disabled: string,
    bg: string,
    column: string,
    centerAlign: string
}
/**
 * Authors Armondo, Miki
 * Displays the intervents that is avaliable to the Admin
 */
export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const token = useSelector((state: any) => state.credReducer.token);
    const [allRequests, getAllRequests] = useState([]);

    const styles: styleINF = useStyles();

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
                console.log("all intvs", response.data)
                getAllRequests(response.data);
            })
            .catch((err) => console.log());
    }, []);
    /* Display the header that allows for moving Month and Year */
    const header = () => {
        const monthFormat = "MMMM";
        const yearFormat = "yyyy"
        return (
            <div className={`${styles.header} ${styles.row}`}>
                <div className={`${styles.column} ${styles.icon}`} onClick={prevMonth}>
                    <span className="chevron">&#60;</span>
                </div>
                <div className={`${styles.column} ${styles.centerAlign}`}>
                    <span>{format(currentDate, monthFormat)}</span>
                </div>
                <div className={`${styles.column} ${styles.icon}`} onClick={nextMonth}>
                    <span className="chevron">&#62;</span>
                </div>
                <div className={`${styles.column} ${styles.icon}`} onClick={prevYear}>
                    <span className="chevron">&#60;</span>
                </div>
                <div className={`${styles.column} ${styles.centerAlign}`}>
                    <span>{format(currentDate, yearFormat)}</span>
                </div>
                <div className={`${styles.column} ${styles.icon}`} onClick={nextYear}>
                    <span className="chevron">&#62;</span>
                </div>
            </div>
        );
    };
    /* Getting the days  */
    const days = () => {
        const dateFormat: string = "ddd";
        const days: Array<any> = [];
        const nameOfDays: Array<string> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // let startDate: Date = startOfWeek(currentDate);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className={`${styles.column} ${styles.centerAlign}`} key={i}>
                    {nameOfDays[i]}
                </div>
            );
        }
        return <div className={`${styles.days} ${styles.row}`}>{days}</div>;
    };
    /* Making the cells */
    const cells = () => {
        /* this is a long winded way to get the data we needed */
        const monthStart: Date = startOfMonth(currentDate);
        const monthEnd: Date = endOfMonth(monthStart);
        const startDate: Date = startOfWeek(monthStart);
        const endDate: Date = endOfWeek(monthEnd);
        const dateFormat: string = "d";
        const rows: Array<any> = [];
        let days: Array<any> = [];
        let day: Date = startDate;
        let formattedDate: string = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                /* Filters out any day that's not the cloneDay's current day 
                    by slicing off what isn't needed and checking with the startTime*/
                let properDays: any = allRequests.filter((event: any) => event.startTime.includes(cloneDay.toISOString().slice(0, 10)))
                /* a div cell begin pushed into the calendar to display the events */
                days.push(
                    <div
                        className={`${styles.column} ${styles.cell} ${!isSameMonth(day, monthStart)
                            ? `${styles.disabled}` : isSameDay(day, selectedDate)
                                ? `${styles.selected}` : ""}`}
                        key={day.toDateString()}

                        onClick={() => onDateClick(parse("", "", cloneDay))}
                        style={{ overflowY: "auto" }}
                    >
                        <span className={styles.number}>{formattedDate}</span>
                        <br />
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
                <div className={styles.row} key={day.toDateString()}> {days} </div>
            );
            days = [];
        }
        return <div>{rows}</div>;
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
    const onDateClick = (day: Date) => {
        setSelectedDate(day);

    }
    return (
        <div className={styles.calendar}>
            <h2 className={styles.centerAlign}>Intervention Calendar</h2>
            <br />
            <div>{header()}</div>
            <div>{days()}</div>
            <div>{cells()}</div>
        </div>
    );
}; 