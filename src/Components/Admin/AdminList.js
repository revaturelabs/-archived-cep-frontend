import React, { useState, useEffect } from 'react'
import AdminItem from './AdminItem'
import axios from 'axios'

//Show a list of requests
export default function AdminList(){
    
    const [realData, setRealData] = useState([])
    //Test Data
    const [testData] = useState([
        {
            companyName: "Test",
            firstName: "Johnny",
            lastName: "Test",
            technology: "Java-React",
            date: "Jan 11, 2020",
            descrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: "Pending"
        },
        {
            companyName: "Test",
            firstName: "Johnny",
            lastName: "Test",
            technology: "Java-React",
            date: "Jan 11, 2020",
            status: "Complete"
        },
    ])

    //Make an axios call to display the list of requests
    useEffect(() => {
        axios.get("http://localhost:8080/admin/request")
        .then((response) => {
            //Console.log used to check the fields to set up the adminItem for later
            console.log(response.data)
            setRealData(response.data)
        })
        .catch((err) => console.log())
    }, [])
    
    //Render the list of requests
    //Change "realData" to "testData" if you want to mock test with the ideal/test look of the request
    return(
        <div>
            {realData.map((data) =>{
                return(<AdminItem data={data} key={data.requestId}/>)
            })}
        </div>
    )
}