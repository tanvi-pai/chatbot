import { Card, Form, Stack, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import MsgBubble from "./MsgBubble";
import axios from "axios"
import Dashboard from "../../Dashboard/dashboard";
import "./ChatHome.css"

const ChatHome = () => {
  const [msgStore, setMsgStore] = useState([
    { text: "how may i help", type: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false)
  
  const onUserInput = (event) => {
    setUserInput(event.target.value);
  };
  
  const onSend = (event) => {
    event.preventDefault()
    setMsgStore((prev) => [...prev, { text: userInput, type: "user" }]);
    setUserInput("")
    setLoading(true)
    getAPI();
  };

  const getAPI = () => {
    axios.get("http://192.168.9.83:5000/wpc?cei_count=5").then((response) => {
      console.log("resppp", response.data)
      let string = ""
      if(response.data.cei_code.length > 1){

      }else{
        string = `${response.data.cei_code[0]}` + " is the worst perfoming CEI with " + `${response.data.failure_count[0] * 100}%` + "assets failuring this control."
      }
      setMsgStore((prev) => [...prev, {text : string, type: "bot"}])
    })
    // setLoading(false)
  }


  return (
    <Stack direction="horizontal">
      <Col xs={6}>
        <div className="d-flex justify-content-center">
          <Card className="loading-banner">
            <Card.Header>Hello</Card.Header>
            <Card.Body>
              {loading}
              <MsgBubble msgStore={msgStore}/>
            </Card.Body>
            <Card.Footer className="px-0">
              <div className="admin-cei-edit-style">
                <Form onSubmit={onSend}>
                <Form.Control
                className="user-input rounded-0"
                  type="text"
                  placeholder="Type your question"
                  onChange={onUserInput}
                  value={userInput}           
                />
                </Form>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Col>
      <Col xs={6}>
        <Dashboard />
      </Col>
    </Stack>
  );
};

export default ChatHome;
