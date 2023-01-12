import { Card, Form } from "react-bootstrap";
import { useState } from "react";
const ChatHome = () => {
  const [msgStore, setMsgStore] = useState([
    { text: "how may i help", type: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const onUserInput = (event) => {
    console.log(event);
    setUserInput(event.target.value);
    console.log(msgStore);
  };
  const onSend = (event) => {
    event.preventDefault()
    setMsgStore((prev) => [...prev, { text: userInput, type: "user" }]);
    setUserInput("")
    console.log(msgStore,"hm")
  };
  return (
    <div className="d-flex justify-content-center">
      <Card className="loading-banner">
        <Card.Header>Hello</Card.Header>
        <Card.Body>
          
        </Card.Body>
        <Card.Footer className="px-0">
          <div className="admin-cei-edit-style">
            <Form    onSubmit={onSend}>
            <Form.Control
            className="user-input rounded-0"
              type="text"
              placeholder="Type your question"
              onChange={onUserInput}
           
            />
            </Form>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ChatHome;
