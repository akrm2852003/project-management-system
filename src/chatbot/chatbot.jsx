import { useState } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    const userMessage = { text: input, sender: "user" };

    let botReply = "مش فاهمة 🤔";
    if (input.toLowerCase().includes("hello")) {
      botReply = "أهلاً 👋";
    } else if (input.includes("ازيك")) {
      botReply = "تمام الحمد لله 😊";
    }else if (input.includes("can you tell me about your websuit?")) {
      botReply = "yes.sure";
    }else if (input.includes("what is  this websuit?")) {
      botReply = "yes.sure";
    }


    const botMessage = { text: botReply, sender: <i class="fa fa-user" aria-hidden="true"></i> };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="rounded-1" style={{ width: "300px", padding: "0px" }}>
      <h5 className="text-white p-3 px-2" style={{borderBottom : "1px solid gray"}}>Chat With Me</h5>

      <div className="p-2 text-black" style={{ height: "200px", overflowY: "auto", backgroundColor: "rgba(14, 56, 47, 1)" }}>
        {messages.map((msg, i) => (
          <p  key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" ,color : "white" }}>
            <b ></b> {msg.text}
          </p>
        ))}
      </div>

      <input className=" rounded-2 p-2 px-4 border-0 ms-2 mx-1 mb-2 text-white"
      style={{backgroundColor: "rgba(43, 76, 68, 1)", borderTop : "1px solid gray"}}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Massage..."
        
      />
      <button className="border-0 px-3 p-2 rounded-2 text-white" onClick={sendMessage}
      style={{backgroundColor: "rgba(239, 155, 40, 1)"}}
      ><i class="fa fa-paper-plane" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default ChatBot;