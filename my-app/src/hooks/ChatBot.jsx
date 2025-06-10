import React, { useState } from "react";
import "./ChatBot.css";

function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Xin chào! Tôi là trợ lý y tế của SchoMed. Bạn cần giúp gì?" },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const keywordResponses = [
    {
      keywords: ["sốt", "nhiệt độ", "nóng"],
      response: "Bạn nên cho bé nghỉ ngơi, uống nhiều nước và hạ sốt bằng paracetamol nếu cần.",
    },
    {
      keywords: ["ho", "đờm", "viêm họng"],
      response: "Bạn nên cho bé uống nước ấm, tránh gió và có thể dùng siro ho thảo dược.",
    },
    {
      keywords: ["đau bụng", "đầy hơi", "tiêu hóa", "đi ngoài", "tiêu chảy"],
      response: "Bạn nên cho bé ăn nhẹ, uống men tiêu hóa và theo dõi triệu chứng. Nếu không cải thiện, hãy đi khám.",
    },
    {
      keywords: ["nôn", "ói", "mửa"],
      response: "Cho bé nghỉ ngơi, uống nước từ từ. Nếu nôn nhiều lần, bạn nên đưa bé đến cơ sở y tế.",
    },
    {
      keywords: ["bác sĩ", "chuyên khoa", "khám"],
      response: "Bạn có thể xem danh sách bác sĩ trong mục Dịch vụ hoặc Tra cứu trên hệ thống.",
    },
    {
      keywords: ["khám bệnh", "đặt lịch", "hẹn khám", "lịch khám"],
      response: "Vui lòng đặt lịch khám thông qua mục Dịch vụ hoặc gọi hotline 1900-1159.",
    },
    {
      keywords: ["sổ khám", "lịch sử", "bệnh án"],
      response: "Bạn có thể xem sổ khám và lịch sử bệnh án trong mục Tra cứu cá nhân.",
    },
    {
      keywords: ["vaccine", "tiêm phòng", "chích ngừa"],
      response: "Bạn nên theo dõi lịch tiêm chủng trong phần Tra cứu để biết mốc thời gian cụ thể.",
    },
    {
      keywords: ["trường học", "sức khỏe học sinh"],
      response: "SchoMed cung cấp dịch vụ theo dõi và quản lý sức khỏe học sinh toàn diện cho nhà trường.",
    },
    {
      keywords: ["dịch vụ", "gói", "cơ bản", "mức cao"],
      response: "Chúng tôi có 2 gói: Cơ Bản và Mức Cao. Bạn có thể xem chi tiết trong mục Dịch vụ.",
    },
    {
      keywords: ["cấp cứu", "khẩn cấp", "tai nạn"],
      response: "Hãy gọi ngay 115 hoặc hotline của chúng tôi: 1900-1159 để được hỗ trợ khẩn cấp.",
    },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };

    const lowerInput = input.toLowerCase();
    const found = keywordResponses.find(({ keywords }) =>
      keywords.some((keyword) => lowerInput.includes(keyword))
    );

    const botMsg = {
      from: "bot",
      text: found
        ? found.response
        : "Xin lỗi, tôi chưa hiểu rõ. Bạn có thể hỏi cách khác được không?",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className={`chatbox-container ${open ? "open" : ""}`}>
      <button className="chatbox-toggle" onClick={() => setOpen(!open)}>
        💬
      </button>
      {open && (
        <div className="chatbox">
          <div className="chatbox-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbox-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi tôi bất cứ điều gì..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
