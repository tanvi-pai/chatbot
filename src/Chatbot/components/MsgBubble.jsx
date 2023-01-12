const MsgBubble = (props) => {
  return (
    <>
      {props.msgStore.map((msg, id) => {
        return (
          <div key={id} className="message-container">
              <div className={msg.type === "bot" ? "bot-message" : "user-message"}>
              {msg.text}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default MsgBubble;
