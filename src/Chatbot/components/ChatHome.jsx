import { Card, Form, Stack, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import MsgBubble from "./MsgBubble";
import axios from "axios"
import Dashboard from "../../Dashboard/dashboard";
import "./ChatHome.css"
import {AiOutlineSend} from "react-icons/ai"

const ChatHome = () => {
  const [msgStore, setMsgStore] = useState([
    { text: "Hello, welcome to Chatbot", type: "bot", data: [], list: [], table: "", data2: [] },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false)
  const [welcome, setWelcome] = useState(true)

  useEffect(() => {
    let msg = [...msgStore]
    msgStore.push({text: "I can answer questions about your evidence table. What can I help you with?", type:"bot"})
    setMsgStore([...msg])
  }, [])
  
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
    "Could you check it and try again?", 
    "I'm sorry, this question is too difficult for me.",
    "Could you reformulate it so I can try answering it again?",
    "Sorry, I'm still learning and I can't help you with that right now.", 
    "Apologies! I can't help you with that. Instead, try searching for worst performing CEIs, most vulnerable assets etc...",
    "We're sorry, we are unable to process your question"
  ]
  
  const getAPI = () => {
    axios.post("http://192.168.9.83:5000/home", {question:userInput}).then((response) => {
      let string = ""
      let data = []
      let data2 = []
      let table = ""

      switch(response.data.type){
        case "worst_performer": {
          string = `${response.data.response.cei_code[0]}` + " is the worst perfoming CEI with " + `${response.data.response.failure_count[0] * 100}%` + " assets failuring this control."
        break;
        }
        case "top_5": {
          string = "Below listed are the worst performing CEIs"
          table = "top_5"
          data = formatTableData(response.data.cei_code, response.data.failure_count, "cei", "failure")
          break;
        }
        case "cei_status": {
          string = "This CEI says that " + `${response.data.response.cei_description}` + "." + "This CEI has " + `${response.data.response.cei_severity}` + " severity with failure percentage of " + `${Math.round(response.data.response.failure_ratio*100)}%`
          break
        }
        case "asset_status": {
          let count = Math.round(response.data.response.failure_ratio*100)
          string = "This asset is a " + `${response.data.response.asset_type}` + " which belongs to Asset class : " + `${response.data.response.asset_class}` + "." + "This asset has failed in " + `${response.data.response.failure_count}` + " CEIs with a failure ratio of " + count + "%"
          table = "asset_status"
          data = formatTableData(response.data.response.cei_severity, response.data.response.cei_severity_count, "severity", "count")
          data2 = formatTableData(response.data.response.controls, response.data.response.controls_failed, "controls", "controls_failed")
          break
        }
        case "vulnerable_asset": {
          string = "Based on asset and CEI criticalities, the asset " + `${response.data.response.worst_asset[0]}` + " is the most vulnerable asset."
          break;
        }
        case "desc" : {
          string= ""
          table = "desc"
          data = formatTableData(response.data.response.cei_code, response.data.response.description, "cei", "description")
          break;
        }
        case "cei_overall" : {
          string=""
          table = "cei"
          data = formatTableData(response.data.cei_overall_key, response.data.cei_overall_desc, "cei","desc")
          break;
        }
        case "unknown" : {
          string= errorStr[Math.floor((Math.random() * 6))]
          break;
        }
        default : {
          string = "Can you try again"
      }        
      }
      setMsgStore((prev) => [...prev, {text : string, type: "bot", data: data, table: table, data2: data2}])
      setLoading(false)
    })
  }

  const formatTableData = (cei,failure_count, key1, key2) => {
    let arr = []

    cei.map((item, index) => {
      let obj = {
        [key1]: cei[index],
        [key2]: failure_count[index]
      }
      arr.push(obj)
    })

    return arr
  }

  return (
        <div className="h100 d-flex justify-content-center">
          <Card className="loading-banner m-5">
            <Card.Header style={{fontSize: "20px"}}>CHATBOT</Card.Header>
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
                  // readOnly={loading}        
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
