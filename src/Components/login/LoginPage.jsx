import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { dispatchToken } from "../../redux/actions/userAction";
//import JWTD from "jwt-decode";
import Axios from "axios";

export default function LoginPage(props) {
  const [userCredentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [role, setRole] = useState("");
  const dispatch = useDispatch();

  // function getRole(token) {
  //   //Getting the role of the user to conditionally re-route to either 
  //   // admin page or my_batches page
  //   const username = JWTD(token).sub;
  //   Axios.get("http://13.58.157.19:8081/role/" + username, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((result) => {
  //       setRole(result.data);
  //     })
  //     .catch((err) => console.log("error username:" + err));
  // }

  function handleChange(event) {
    setCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    // event.preventDefault();

    // Authorize the user
    // fetch("http://13.58.157.19:8081/authenticate", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: userCredentials.username,
    //     password: userCredentials.password,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //     dispatch(dispatchToken(res.jwt)); //send jwt to store
    //     getRole(res.jwt); 
    //     //If statement to redirect based on user and admin
    //     if (role !== "admin"){
    //         props.history.push("/my_batches");
    //     }
    //     props.history.push("/admin");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  return (
    <div>
       <form onSubmit={handleSubmit}> 
        <br />
          <label htmlFor="username" onChange={handleChange}>User Name:
          <input
            type="text"
            placeholder="Enter user name"
            name="username"
            required
          />
          </label>

          <label htmlFor="password" onChange={handleChange}>Password:
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            required
          />
          </label>
        <button type="submit">
          Log In
        </button>
      </form>  
    </div>
  );
}
