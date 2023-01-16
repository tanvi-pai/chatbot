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
              {
                msg.text !== "" &&
                <div className={msg.type === "bot" ? "bot-message" : "user-message"}>
                {msg.text}
                </div>
              }
              {
                msg.data && msg.data.length > 0 && msg.table === "top_5" &&
                <Table className="table" striped bordered hover size="sm" style={{marginLeft: "40px", border: "1px solid #27293e", width:"65%"}}>
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
              {
                msg.data && msg.data.length > 0 && msg.table === "asset_status" &&
                <Table className="table" striped bordered hover size="sm" style={{marginLeft: "40px", border: "1px solid #27293e", width:"65%"}}>
                  <thead>
                    <tr>
                      <th>Severity of CEI</th>
                      <th>No of failures</th>
                     </tr>
                  </thead>
                  <tbody>
                    {
                      msg.data.map((item,id) => {
                        return(
                          <tr key={id}>
                          <td>{item.severity}</td>
                          <td>{item.count}</td>
                        </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              }
              {
                msg.data2 && msg.data2.length > 0 && msg.table === "asset_status" &&
                <Table className="table" striped bordered hover size="sm" style={{marginLeft: "40px", marginTop:"10px", border: "1px solid #27293e", width:"65%"}}>
                  <thead>
                    <tr>
                      <th>Control name</th>
                      <th>No of failures</th>
                     </tr>
                  </thead>
                  <tbody>
                    {
                      msg.data2.map((item,id) => {
                        return(
                          <tr key={id}>
                          <td>{item.controls}</td>
                          <td>{item.controls_failed}</td>
                        </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              }
              {
                msg.data && msg.data.length > 0 && msg.table === "desc" &&
                <Table className="table" striped bordered hover size="sm" style={{marginLeft: "40px", border: "1px solid #27293e", width:"65%"}}>
                  <thead>
                    <tr>
                      <th>CEI</th>
                      <th>Description</th>
                     </tr>
                  </thead>
                  <tbody>
                    {
                      msg.data.map((item,id) => {
                        return(
                          <tr key={id}>
                          <td>{item.cei}</td>
                          <td>{item.description}</td>
                        </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              }
              {
                msg.data && msg.data.length > 0 && msg.table === "cei" &&
                <Table className="table" striped bordered hover size="sm" style={{marginLeft: "40px", border: "1px solid #27293e", width:"65%"}}>
                  <thead>
                    <tr>
                      <th>CEI</th>
                      <th>Description</th>
                     </tr>
                  </thead>
                  <tbody>
                    {
                      msg.data.map((item,id) => {
                        return(
                          <tr key={id}>
                          <td>{item.cei}</td>
                          <td>{item.desc}</td>
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
