// src/HomePage/HomePage.jsx
import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ChatBox from "../../components/chat/ChatBot";
import { useNavigate, Link } from "react-router-dom";
import { newsData } from "../../data/newsData";
import { HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
// ThreeCardsSection component
function ThreeCardsSection() {
  const barColors = ["#34D399", "#2563EB", "#D946EF"];

  return (
    <section className="three-cards-section">
      <div className="three-cards-container">
        {barColors.map((color, idx) => (
          <div key={idx} className="card-item">
            <div className="card-bar" style={{ backgroundColor: color }} />
            <div className="card-content" />
          </div>
        ))}
      </div>
    </section>
  );
}

// NewsSection component
function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setNews(newsData);
      setLoading(false);
    }, 1000);
    fetchNewsFromAPI();
  }, []);

  const fetchNewsFromAPI = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/news/full?limit=6");
      if (!response.ok) {
        response = await fetch("http://localhost:5000/api/news?limit=5");
      }
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          const apiNews = data.data.slice(0, 6);
          setNews(apiNews);
        }
      }
    } catch (error) {
      console.log("API not available, using mock data");
    }
  };

  const handleNewsClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  if (loading) {
    return (
      <section className="news-section">
        <div className="news-container">
          <div className="news-loading">
            <div className="loading-spinner"></div>
            <p>Đang tải tin tức...</p>
          </div>
        </div>
      </section>
    );
  }

  const mainNews = news[0];
  const sideNews = news.slice(1, 5);

  return (
    <section className="news-section">
      <div className="container">
        <div className="news-header">
          <h2 className="news-title">Tin Tức Y Tế</h2>
        </div>

        <div className="news-grid">{/* News content here */}</div>

        <div className="news-footer">
          <button onClick={() => navigate("/news")} className="view-more-btn">
            Xem thêm tin tức
          </button>
        </div>
      </div>
    </section>
  );
}

// Event component
function Event() {
  const events = [
    { bgColor: "bg-red-500", overlayColor: "bg-red-700" },
    { bgColor: "bg-blue-500", overlayColor: "bg-blue-700" },
    { bgColor: "bg-green-500", overlayColor: "bg-green-700" },
  ];

  return (
    <section className="event-section">
      {/* Section title */}
      <h2 className="event-title">Sự Kiện SchoMed</h2>

      {/* Event cards */}
      <div className="event-container">
        {events.map((evt, idx) => (
          <div key={idx} className="event-card">
            {/* Background block */}
            <div
              className={`event-bg event-${evt.bgColor.split("-")[1]}-${
                evt.bgColor.split("-")[2]
              }`}
            />

            {/* Overlay "thời gian" block */}
            <div
              className={`event-overlay event-overlay-${
                evt.overlayColor.split("-")[1]
              }-${evt.overlayColor.split("-")[2]}`}
            >
              <span className="event-time-text">thời gian</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
// Reason component
function Reason() {
  const reasons = [
    {
      icon: <HeartPulse size={32} />,
      title: "Cập nhật sức khỏe con bạn mọi lúc",
      desc: "Theo dõi y tế học sinh mọi lúc – mọi nơi, với cập nhật chi tiết và kịp thời khi có vấn đề phát sinh.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Bảo mật thông tin tuyệt đối",
      desc: "Toàn bộ dữ liệu được mã hóa và bảo vệ theo tiêu chuẩn quốc tế, đảm bảo an toàn và riêng tư.",
    },
    {
      icon: <Stethoscope size={32} />,
      title: "Giao tiếp nhanh với y tế học đường",
      desc: "Trao đổi trực tiếp với nhân viên y tế của trường, nhận thông báo và hướng dẫn xử lý tình huống y tế.",
    },
  ];

  return (
    <section className="reason-section">
      <div className="reason-container">
        <h2 className="reason-title text-slate-800 text-3xl font-bold text-center mb-10">
          Tại sao chọn SchoMed
        </h2>
        <div className="reason-cards">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="reason-card p-6 bg-white rounded-xl shadow-md flex flex-col items-start gap-4 transition duration-300 hover:shadow-xl"
            >
              <div className="service-icon-container">
                <div className="service-icon text-blue-600">{item.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// See component
function See() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/member");
  };

  return (
    <section className="see-section">
      <div className="see-container">
        <div className="see-content-wrapper">
          <h2 className="see-title">
            Trải nghiệm
            <br />
            SchoMed thực tế!
          </h2>
          <div className="see-content">
            <p className="see-description">
              Hãy trở thành hội viên để trải nghiệm đầy đủ các tính năng của
              SchoMed – từ theo dõi sức khỏe học sinh đến nhận tư vấn y tế trực
              tuyến.
            </p>
            <button className="see-button" onClick={handleClick}>
              Đăng ký trải nghiệm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="homepage">
      {/* ✅ Di chuyển nút login vào header thay vì để bên ngoài */}
      <Header />

      <ThreeCardsSection />
      <NewsSection />
      <Event />
      <Reason />
      <See />
      <Footer />
    </div>
  );
}
