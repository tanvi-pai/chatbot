import { Card, Form, Stack, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import MsgBubble from "./MsgBubble";
import axios from "axios"
import Dashboard from "../../Dashboard/dashboard";
import "./ChatHome.css"

const ChatHome = () => {
  const [msgStore, setMsgStore] = useState([
    { text: "how may i help", type: "bot", data: [] },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    formatTableData(["3.1.15","3.1.16","3.1.19","3.1.18","3.1.17"], ["0.89","0.89","0.87","0.87","0.87"])

  },[])
  
  const onUserInput = (event) => {
    setUserInput(event.target.value);
  };
  
  const onSend = (event) => {
    event.preventDefault()
    setMsgStore((prev) => [...prev, { text: userInput, type: "user", data: [] }]);
    setUserInput("")
    setLoading(true)
    getAPI();
  };

  const getAPI = () => {
    axios.get("http://192.168.9.83:5000/wpc?cei_count=5").then((response) => {
      console.log("resppp", response.data, JSON.stringify(response.data))
      let string = ""

      switch(response.data.type){
        case "worst_perfoming": {
          string = `${response.data.cei_code[0]}` + " is the worst perfoming CEI with " + `${response.data.failure_count[0] * 100}%` + "assets failuring this control."
        setMsgStore((prev) => [...prev, {text : string, type: "bot", data: []}])
        break;
        }
        case "top_5": {
          string = "Below listed are the worst performing CEIs"
          setMsgStore((prev) => [...prev, {text : string, type: "bot", data: formatTableData(response.data.cei_code, response.data.failure_count)}])
          break;
        }
        case "cei_status": {
          string = ""
           // setMsgStore((prev) => [...prev, {text : string, type: "bot", data: []}])
          break
        }
        case "vulnerable_asset": {
          string = ""
           // setMsgStore((prev) => [...prev, {text : string, type: "bot", data: []}])
          break;
        }
        default : {
          string = "Can you try again"
          // setMsgStore((prev) => [...prev, {text : string, type: "bot", data: []}])
      }
        
      }

    })
    formatTableData(["3.1.15","3.1.16","3.1.19","3.1.18","3.1.17"], ["0.89","0.89","0.87","0.87","0.87"])
    // setLoading(false)
  }

  const formatTableData = (cei,failure_count) => {
    let arr = []

    cei.map((item, index) => {
      console.log("item", item, index)
      let obj = {
        "cei": cei[index],
        "failure": failure_count[index]
      }
      arr.push(obj)
    })

    console.log("arr", arr, JSON.stringify(arr))

    return arr
  }


  return (
    <Stack direction="horizontal">
      <Col xs={6}>
        <div className="d-flex justify-content-center">
          <Card className="loading-banner">
            <Card.Header>CHATBOT</Card.Header>
            <Card.Body className="msg-body dark-scroll">
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
        {/* <Dashboard /> */}
      </Col>
    </Stack>
  );
};

export default ChatHome;
