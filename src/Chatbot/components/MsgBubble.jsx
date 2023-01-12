const MsgBubble = (props) => {
  return (
    <>
      {props.msgStore.map((msg) => {
        return (
          <div className={msg.type === "bot" ? "bot-message" : "user-message"}>
            {msg.text}
          </div>
        );
      })}
    </>
  );
};
export default MsgBubble;
