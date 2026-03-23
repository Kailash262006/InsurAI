import { useState } from "react";

function AIChatbot() {

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am your InsurAI assistant. Ask me about insurance policies." }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {

    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    let botReply = "Sorry, I didn't understand. Please ask about policies or insurance.";

    const text = input.toLowerCase();

    if (text.includes("health")) {
      botReply = "Health Secure Plus is recommended for medical coverage up to ₹15,00,000.";
    }
    else if (text.includes("car") || text.includes("vehicle") || text.includes("motor")) {
      botReply = "Vehicle Protect plan covers accidents and damages up to ₹5,00,000.";
    }
    else if (text.includes("life")) {
      botReply = "Life Shield policy provides life coverage up to ₹20,00,000.";
    }
    else if (text.includes("family")) {
      botReply = "Family Health Shield is best for families with multiple members.";
    }

    const botMessage = { sender: "bot", text: botReply };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="app-card mt-4">

      <h5 className="fw-bold"> InsurAI Chat Assistant</h5>

      <div
        style={{
          height: "250px",
          overflowY: "auto",
          border: "1px solid #eee",
          padding: "10px",
          marginBottom: "10px"
        }}
      >

        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "8px"
            }}
          >
            <span
              style={{
                background: msg.sender === "user" ? "#007bff" : "#eee",
                color: msg.sender === "user" ? "white" : "black",
                padding: "8px 12px",
                borderRadius: "12px",
                display: "inline-block"
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}

      </div>

      <div className="d-flex">

        <input
          type="text"
          className="form-control"
          placeholder="Ask about insurance..."
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />

        <button
          className="btn btn-primary ms-2"
          onClick={sendMessage}
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default AIChatbot;