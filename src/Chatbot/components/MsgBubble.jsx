import { Table } from "react-bootstrap";
import {FaRobot} from "react-icons/fa"

const MsgBubble = (props) => {

const data = [{"cei":"3.1.15","failure":"0.89"},{"cei":"3.1.16","failure":"0.89"},{"cei":"3.1.19","failure":"0.87"},{"cei":"3.1.18","failure":"0.87"},{"cei":"3.1.17","failure":"0.87"}]

  return (
    <>
      {props.msgStore.map((msg, id) => {
        return (
          <div key={id} style={{position:"relative"}} className="message-container">
              {
                msg.type === "bot" &&
                <FaRobot style={{position:"absolute", top:"15px", left: "0"}} color="white" size={30}/>
              }
              <div className={msg.type === "bot" ? "bot-message" : "user-message"}>
              {msg.text}
              </div>
              {
                msg.data && msg.data.length > 0 &&
                <Table className="table" striped bordered hover size="sm" style={{marginLeft: "5px"}}>
                  <thead>
                    <tr>
                      <th>CEI</th>
                      <th>Failure count</th>
                     </tr>
                  </thead>
                  <tbody>
                    {
                      msg.data.map((item,id) => {
                        return(
                          <tr key={id}>
                          <td>{item.cei}</td>
                          <td>{item.failure*100}%</td>
                        </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              }
          </div>
        );
      })}
    </>
  );
};
export default MsgBubble;
