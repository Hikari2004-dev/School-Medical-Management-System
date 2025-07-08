// src/HomePage/HomePage.jsx
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ChatBox from '../../components/chat/ChatBot';
import { useNavigate } from 'react-router-dom';
import { newsData } from '../../data/newsData';

// Three Cards Section Component
function ThreeCardsSection() {
  const barColors = ['#34D399', '#2563EB', '#D946EF'];

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

// NewsSection Component
function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading news data
    setTimeout(() => {
      setNews(newsData);
      setLoading(false);
    }, 1000);

    // Try to fetch from API
    fetchNewsFromAPI();
  }, []);

  const fetchNewsFromAPI = async () => {
    try {
      // Thử API mới trước (nội dung đầy đủ)
      let response = await fetch('http://localhost:5000/api/news/full?limit=6');

      // Nếu API full không khả dụng, dùng API cơ bản
      if (!response.ok) {
        response = await fetch('http://localhost:5000/api/news?limit=6');
      }

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          const apiNews = data.data.slice(0, 6);
          console.log(`✅ HomePage: Đã tải ${apiNews.length} tin tức từ API (${apiNews.filter(n => n.fullContent).length} bài đầy đủ)`);
          setNews(apiNews);
        }
      }
    } catch (error) {
      console.log('API not available, using mock data');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Sức khỏe': 'linear-gradient(135deg, #10b981, #059669)',
      'Dinh dưỡng': 'linear-gradient(135deg, #f59e0b, #d97706)',
      'Mắt': 'linear-gradient(135deg, #ef4444, #dc2626)',
      'Y tế': 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      'An toàn': 'linear-gradient(135deg, #06b6d4, #0891b2)',
      'Vaccine': 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      'default': 'linear-gradient(135deg, #6b7280, #4b5563)'
    };
    return colors[category] || colors['default'];
  };

  const handleNewsClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  const highlightNews = news.find(item => item.isHighlight) || news[0];
  const regularNews = news.filter(item => !item.isHighlight).slice(0, 5);

  if (loading) {
    return (
      <section className="news-section">
        <div className="container">
          <div className="news-header">
            <div className="header-line"></div>
            <h2 className="news-title">Tin Tức Y Tế</h2>
            <div className="header-line"></div>
          </div>
          <div className="news-loading">
            <div className="loading-spinner"></div>
            <p>Đang tải tin tức...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="news-section">
      <div className="container">
        {/* Title with lines */}
        <div className="news-header">
          <div className="header-line"></div>
          <h2 className="news-title">Tin Tức Y Tế</h2>
          <div className="header-line"></div>
        </div>

        {/* Layout: grid with real news */}
        <div className="news-grid">
          {/* Left column - Highlight news */}
          <div className="news-left">
            {highlightNews && (
              <div
                className="news-large-card-1 news-card-interactive"
                onClick={() => handleNewsClick(highlightNews.id)}
              >
                <img src={highlightNews.image} alt={highlightNews.title} />
                <div className="news-overlay">
                  <span
                    className="news-category"
                    style={{ background: getCategoryColor(highlightNews.category) }}
                  >
                    {highlightNews.category}
                  </span>
                  <h3 className="news-card-title">{highlightNews.title}</h3>
                  <p className="news-card-summary">{highlightNews.summary}</p>
                  <div className="news-meta">
                    <span className="news-source">{highlightNews.source}</span>
                    <span className="news-date">{formatDate(highlightNews.publishDate)}</span>
                    {highlightNews.fullContent && (
                      <span className="full-content-indicator">
                        <i className="fas fa-check-circle"></i> Đầy đủ
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {regularNews[0] && (
              <div
                className="news-large-card-2 news-card-interactive"
                onClick={() => handleNewsClick(regularNews[0].id)}
              >
                <img src={regularNews[0].image} alt={regularNews[0].title} />
                <div className="news-overlay">
                  <span
                    className="news-category"
                    style={{ background: getCategoryColor(regularNews[0].category) }}
                  >
                    {regularNews[0].category}
                  </span>
                  <h4 className="news-card-title">{regularNews[0].title}</h4>
                  <div className="news-meta">
                    <span className="news-source">{regularNews[0].source}</span>
                    <span className="news-date">{formatDate(regularNews[0].publishDate)}</span>
                    {regularNews[0].fullContent && (
                      <span className="full-content-indicator">
                        <i className="fas fa-check-circle"></i> Đầy đủ
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column - Small news cards */}
          <div className="news-right">
            <div className="news-small-row">
              {regularNews[1] && (
                <div
                  className="news-small-card news-card-interactive"
                  onClick={() => handleNewsClick(regularNews[1].id)}
                >
                  <img src={regularNews[1].image} alt={regularNews[1].title} />
                  <div className="news-small-overlay">
                    <span
                      className="news-small-category"
                      style={{ background: getCategoryColor(regularNews[1].category) }}
                    >
                      {regularNews[1].category}
                    </span>
                    <h5 className="news-small-title">{regularNews[1].title}</h5>
                    <div className="news-small-meta">
                      <span className="news-small-date">{formatDate(regularNews[1].publishDate)}</span>
                      {regularNews[1].fullContent && (
                        <span className="full-content-indicator-small">
                          <i className="fas fa-check-circle"></i>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {regularNews[2] && (
                <div
                  className="news-small-card news-card-interactive"
                  onClick={() => handleNewsClick(regularNews[2].id)}
                >
                  <img src={regularNews[2].image} alt={regularNews[2].title} />
                  <div className="news-small-overlay">
                    <span
                      className="news-small-category"
                      style={{ background: getCategoryColor(regularNews[2].category) }}
                    >
                      {regularNews[2].category}
                    </span>
                    <h5 className="news-small-title">{regularNews[2].title}</h5>
                    <div className="news-small-meta">
                      <span className="news-small-date">{formatDate(regularNews[2].publishDate)}</span>
                      {regularNews[2].fullContent && (
                        <span className="full-content-indicator-small">
                          <i className="fas fa-check-circle"></i>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="news-divider"></div>

            <div className="news-small-row">
              {regularNews[3] && (
                <div
                  className="news-small-card news-card-interactive"
                  onClick={() => handleNewsClick(regularNews[3].id)}
                >
                  <img src={regularNews[3].image} alt={regularNews[3].title} />
                  <div className="news-small-overlay">
                    <span
                      className="news-small-category"
                      style={{ background: getCategoryColor(regularNews[3].category) }}
                    >
                      {regularNews[3].category}
                    </span>
                    <h5 className="news-small-title">{regularNews[3].title}</h5>
                    <span className="news-small-date">{formatDate(regularNews[3].publishDate)}</span>
                  </div>
                </div>
              )}

              {regularNews[4] && (
                <div
                  className="news-small-card news-card-interactive"
                  onClick={() => handleNewsClick(regularNews[4].id)}
                >
                  <img src={regularNews[4].image} alt={regularNews[4].title} />
                  <div className="news-small-overlay">
                    <span
                      className="news-small-category"
                      style={{ background: getCategoryColor(regularNews[4].category) }}
                    >
                      {regularNews[4].category}
                    </span>
                    <h5 className="news-small-title">{regularNews[4].title}</h5>
                    <span className="news-small-date">{formatDate(regularNews[4].publishDate)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* View More Button */}
        <div className="news-footer">
          <button
            onClick={() => navigate('/news')}
            className="view-more-btn"
          >
            <i className="fas fa-newspaper"></i>
            Xem tất cả tin tức
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

// Event Component
function Event() {
  const events = [
    { bgColor: 'bg-red-500', overlayColor: 'bg-red-700' },
    { bgColor: 'bg-blue-500', overlayColor: 'bg-blue-700' },
    { bgColor: 'bg-green-500', overlayColor: 'bg-green-700' },
  ];

  return (
    <section className="event-section">
      <h2 className="event-title">Sự Kiện SchoMed</h2>
      <div className="event-container">
        {events.map((evt, idx) => (
          <div key={idx} className="event-card">
            <div className={`event-bg ${evt.bgColor}`} />
            <div className={`event-overlay ${evt.overlayColor}`}>
              <span className="event-time-text">thời gian</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


// Reason Component
function Reason() {
  return (
    <section className="reason-section">
      <div className="container">
        <h2 className="reason-title">Tại sao chọn SchoMed</h2>
        <div className="reason-cards">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="reason-card" />
          ))}
        </div>
      </div>
    </section>
  );
}


// See Component
function See() {
  return (
    <section className="see-section">
      <div className="see-container">
        <h2 className="see-title">
          See SchoMed<br />in action...!
        </h2>
        <div className="see-content">
          <p className="see-description">
            Schedule a demo to see how you can make a difference to student health outcomes.
          </p>
          <button className="see-button">
            Tham gia với chúng tôi
          </button>
        </div>
      </div>
    </section>
  );
}

// Main HomePage Component
export default function HomePage() {
  return (
    <div className="homepage">
      <Header />
      <ThreeCardsSection />
      <NewsSection />
      <Event />
      <Reason />
      <See />
      <Footer />
      <ChatBox />
    </div>
  );
}
