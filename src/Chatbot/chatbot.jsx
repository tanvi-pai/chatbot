import axios from "axios";
import React, { useEffect } from "react";
import { Table, Col, Stack } from "react-bootstrap";
import Dashboard from "../Dashboard/dashboard";

const Chatbot = () => {

  useEffect(() => {
    axios.get("http://192.168.9.83:5000/wpc").then((response) => {
      console.log("resppp", response)
    })
  })


  return <div>
 
  </div>
};

export default Chatbot;
