import { useState } from "react";
// import ChatBot from "./ChatBot";
import ChatBot from './chatbot';

function ChatBotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* أيقونة الشات */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "rgba(14, 56, 47, 1)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        <i class="fa fa-commenting" aria-hidden="true"></i>
      </div>

      {/* الشات */}
      {open && (
        <div className=" border-0"
          style={{
            position: "fixed",
            background: "rgba(14, 56, 47, 1)",
             borderRadius: "5%",
            bottom: "65px",
            right: "20px",
            // boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <ChatBot />
        </div>
      )}
    </>
  );
}

export default ChatBotWidget;