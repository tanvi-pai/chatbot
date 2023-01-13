import { Card, Form, Stack, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import MsgBubble from "./MsgBubble";
import axios from "axios"
import Dashboard from "../../Dashboard/dashboard";
import "./ChatHome.css"
import {AiOutlineSend} from "react-icons/ai"

const ChatHome = () => {
  const [msgStore, setMsgStore] = useState([
    { text: "how may i help", type: "bot", data: [] },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false)
  
  const onUserInput = (event) => {
    setUserInput(event.target.value);
  };
  
  const onSend = (event) => {
    event.preventDefault()
     if(userInput.trim() !== ""){      
      setMsgStore((prev) => [...prev, { text: userInput, type: "user", data: [] }]);
      setUserInput("")
      setLoading(true)
      getAPI();
    }else{
      setMsgStore((prev) => [...prev, {text: userInput, type:"user", data: []}, {text: "I did not receive a response / Can you try that again?", type:"bot", data: []}])
      setUserInput("")
    }   
  };
  
  const errorStr=[
    "Could you check it and try it again?", 
    "I'm sorry, this question is too difficult for me.",
    "Could you reformulate it so I can try answering it again?",
    "Sorry, I'm still learning and I can't help you with that right now.", 
    "Apologies! I can't help you with that. Instead, try searching for worst performing CEIs, most vulnerable assets etc...",
    "We're sorry, we are unable to process your question"
  ]
  
  const getAPI = () => {
    axios.post("http://192.168.9.83:5000/home", {question:userInput}).then((response) => {
      console.log("resppp", response, response.data)
      let string = ""
      let data = []

      switch(response.data.type){
        case "worst_performer": {
          string = `${response.data.result.cei_code[0]}` + " is the worst perfoming CEI with " + `${response.data.failure_count[0] * 100}%` + "assets failuring this control."
        break;
        }
        case "top_5": {
          string = "Below listed are the worst performing CEIs"
          data = formatTableData(response.data.cei_code, response.data.failure_count)
          break;
        }
        case "cei_status": {
          string = "hi"
          break
        }
        case "vulnerable_asset": {
          string = "hi"
          break;
        }
        case "welcome" : {
          string= errorStr[Math.floor((Math.random() * 6))]
          break;
        }
        default : {
          string = "Can you try again"
      }        
      }
      setMsgStore((prev) => [...prev, {text : string, type: "bot", data: data}])
      setLoading(false)
    })
  }

  const formatTableData = (cei,failure_count) => {
    let arr = []

    cei.map((item, index) => {
      let obj = {
        "cei": cei[index],
        "failure": failure_count[index]
      }
      arr.push(obj)
    })

    return arr
  }

  return (
        <div className="d-flex justify-content-center">
          <Card className="loading-banner">
            <Card.Header>CHATBOT</Card.Header>
            <Card.Body className="msg-body dark-scroll">
              <MsgBubble msgStore={msgStore}/>
              {loading && <MsgBubble msgStore={[{text:"...",type:"bot"}]} />}
            </Card.Body>
            <Card.Footer className="px-0">
              <div className="admin-cei-edit-style">
                <Form style={{position: "relative"}} onSubmit={onSend}>
                <Form.Control
                className="user-input rounded-0"
                  type="text"
                  placeholder="Type your question...."
                  onChange={onUserInput}
                  value={userInput}   
                  readOnly={loading}        
                />
                <div onClick={onSend} style={{position:"absolute", right: "10px", bottom: "6px", "cursor":"pointer"}}> <AiOutlineSend  color="white" size={25}/></div>
                </Form>
              </div>
            </Card.Footer>
          </Card>
        </div>

  );
};

export default ChatHome;
