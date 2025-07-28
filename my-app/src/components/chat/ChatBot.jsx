import { useState, useEffect, useRef } from "react";
import { Bot } from "lucide-react";
import "./ChatBot.css";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messageEndRef = useRef(null);

  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  const callGeminiAPI = async (allMessages) => {
    const contents = allMessages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await res.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Xin lỗi, tôi chưa rõ câu hỏi."
    );
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const introPrompt = `
Bạn là trợ lý AI SchoMed, một chatbot hữu ích và thân thiện về y tế học đường tại Việt Nam. Hãy hướng dẫn phụ huynh sử dụng hệ thống SchoMed một cách rõ ràng, tự nhiên và ngắn gọn, bao gồm:

1. Đăng ký và đăng nhập hệ thống SchoMed:

Phụ huynh truy cập website hoặc ứng dụng SchoMed.
Đăng ký tài khoản bằng số điện thoại hoặc email, xác thực OTP.
Đăng nhập để sử dụng các chức năng quản lý sức khỏe học sinh.
2. Khai báo và tra cứu thông tin sức khỏe học sinh:

Vào mục “Khai báo sức khỏe” để nhập thông tin sức khỏe, tiền sử bệnh, tiêm chủng, chiều cao, cân nặng, dị ứng, v.v.
Xem lại hồ sơ sức khỏe, lịch sử khám, tiêm chủng của con tại mục “Tra cứu hồ sơ”.
3. Đăng ký dịch vụ y tế học đường:

Đặt lịch khám sức khỏe định kỳ cho học sinh tại trường.
Đăng ký tiêm chủng, theo dõi lịch tiêm và nhận nhắc nhở tự động.
Gửi đơn thuốc hoặc yêu cầu tư vấn sức khỏe trực tuyến với bác sĩ trường học.
4. Sử dụng các tiện ích khác:

Nhận thông báo về các chương trình y tế, tiêm chủng, phòng bệnh tại trường.
Xem báo cáo sức khỏe tổng hợp của học sinh.
Nhận hướng dẫn sơ cứu cơ bản (cầm máu, hạ sốt, hồi sức tim phổi, xử lý dị ứng, v.v.).
5. Đặt câu hỏi về các vấn đề sức khỏe học đường:

Bạn có thể hỏi về:
Lịch tiêm chủng, các loại vaccine cần thiết cho học sinh
Cách đăng ký khám sức khỏe, tư vấn trực tuyến
Hướng dẫn sử dụng phần mềm SchoMed
Xử lý các tình huống y tế thường gặp tại trường
Các dịch vụ y tế học đường khác
Nếu bạn cần hỗ trợ, hãy đặt câu hỏi cho tôi về bất kỳ vấn đề nào liên quan đến sức khỏe học sinh hoặc cách sử dụng hệ thống SchoMed!    `.trim();

    const userMsg = { role: "user", text: introPrompt + "\n\n" + input };
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setLoading(true);

    const reply = await callGeminiAPI([...messages, userMsg]);
    setMessages((prev) => [...prev, { role: "model", text: reply }]);
    setLoading(false);
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
    setHasGreeted(false);
  };

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setMessages([
        {
          role: "model",
          text: "Xin chào! 👋 Tôi là trợ lý AI SchoMed. Bạn cần hỗ trợ gì hôm nay?",
        },
      ]);
      setHasGreeted(true);
    }
  }, [isOpen, hasGreeted]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sự kiện mở từ bên ngoài
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener("open-chat", openHandler);
    return () => window.removeEventListener("open-chat", openHandler);
  }, []);

  return (
    <>
      {/* Nút chat nổi */}
      <button
        className="fixed bottom-4 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition z-50 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Mở trò chuyện"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Hộp chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[420px] bg-white rounded-xl shadow-xl flex flex-col z-40 border border-gray-300">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center rounded-t-xl">
            <span className="font-semibold">SchoMed AI</span>
            <div className="space-x-2">
              <button
                className="bg-white text-blue-600 text-xs px-2 py-1 rounded hover:bg-gray-100"
                onClick={handleReset}
              >
                Đoạn chat mới
              </button>
              <button
                className="bg-white text-blue-600 text-xs px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Đóng
              </button>
            </div>
          </div>

          {/* Tin nhắn */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-gray-200 text-gray-800 rounded-2xl px-4 py-2 text-sm">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messageEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
              placeholder="Nhập câu hỏi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 text-sm"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
