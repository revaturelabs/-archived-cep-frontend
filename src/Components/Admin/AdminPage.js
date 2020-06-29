import React, { useState } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import AdminList from './AdminList'

export default function AdminPage(){
    
    const [testData, setTestData] = useState([
        {
            companyName: "Test",
            firstName: "Johnny",
            lastName: "Test",
            technology: "Java-React",
            date: "Jan 11, 2020",
            descrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 1
        },
        {
            companyName: "Test",
            firstName: "Johnny",
            lastName: "Test",
            technology: "Java-React",
            date: "Jan 11, 2020",
            status: 2
        },
        {
            companyName: "Test",
            firstName: "Johnny",
            lastName: "Test",
            technology: "Java-React",
            date: "Jan 11, 2020",
            descrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            status: 1
        },
    ])
    
    return(
        <Container>
            {testData.map((data) =>{
                return(<AdminList data={data}/>)
            })}
        </Container>
    )
}