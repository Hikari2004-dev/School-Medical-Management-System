// src/pages/Service/OnlineConsultationPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import doctorBanner from "../../image/hinhanh/videocall.png";
import {
  CheckCircle,
  PhoneCall,
  CalendarCheck,
  MessageCircle,
  Users,
} from "lucide-react";
import "./OnlineConsultationPage.css";

const OnlineConsultationPage = () => {
  // State
  const [nurses, setNurses] = useState([]);
  const [selectedNurse, setSelectedNurse] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [issue, setIssue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Fetch nurse list
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://your-api-endpoint.com/api/nurses");
        setNurses(await res.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // Helpers
  const today = new Date().toISOString().split("T")[0];
  const now = new Date().toTimeString().slice(0, 5);
  const booked = useMemo(
    () => ({ "Y tá A": { [today]: ["08:30"] } }),
    [today]
  );
  const slots = useMemo(() => {
    const arr = [];
    for (let h = 8; h <= 16; h++) {
      ["00", "30"].forEach((m) =>
        arr.push(`${h.toString().padStart(2, "0")}:${m}`)
      );
    }
    return arr;
  }, []);
  const occupied = booked[selectedNurse]?.[selectedDate] || [];

  const reset = () => {
    setSelectedNurse("");
    setSelectedDate("");
    setSelectedSlot("");
    setIssue("");
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedNurse || !selectedDate || !selectedSlot || !issue) {
      return setError("Vui lòng điền đầy đủ thông tin.");
    }
    if (
      selectedDate < today ||
      (selectedDate === today && selectedSlot <= now)
    ) {
      return setError("Chọn thời điểm hợp lệ.");
    }
    if (occupied.includes(selectedSlot)) {
      return setError("Khung giờ đã được đặt.");
    }
    setSubmitted(true);
  };

  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <div className="oc-breadcrumb">
        <nav className="oc-breadcrumb-nav">
          <Link to="/">Trang chủ</Link>
          <span>&gt;</span>
          <Link to="/services">Dịch vụ</Link>
          <span>&gt;</span>
          <Link to="/online-consultation" className="active">
            Tư vấn trực tuyến
          </Link>
        </nav>
      </div>

      {/* Banner */}
      <div className="oc-banner">
        <div className="oc-banner-card">
          <div className="oc-banner-content">
            <h2 className="oc-banner-title">
              Gọi video trực tuyến với y tá
            </h2>
            {[
              "Y tá và trợ lý y tá chuyên trách trong trường, kinh nghiệm cao",
              "Hỗ trợ khám & chăm sóc y tế tại trường học",
              "Tư vấn sức khỏe cá nhân hóa",
              "Quy trình nhanh chóng, chuyên nghiệp",
              "Bảo mật thông tin tuyệt đối",
            ].map((txt, i) => (
              <p key={i} className="oc-feature-item">
                <CheckCircle className="oc-feature-icon" />
                {txt}
              </p>
            ))}
            <div className="oc-contact">
              <span>Liên hệ ngay qua <strong>số điện thoại</strong></span>
              <a href="tel:19002115" className="oc-hotline-link">
                <PhoneCall />
                19002115
              </a>
              hoặc
              <button
                onClick={() => window.dispatchEvent(new Event("open-chat"))}
                className="oc-chat-button"
              >
                Chat ngay
              </button>
            </div>
          </div>
          <div className="oc-banner-image">
            <img src={doctorBanner} alt="Doctor" />
          </div>
        </div>
      </div>

      {/* Consultation Form */}
      <section className="oc-consultation">
        <div className="oc-consultation-wrapper">
          {/* Left: Booking */}
          <div className="oc-booking">
            <h3 className="oc-booking-title">
              <CalendarCheck /> Đặt lịch tư vấn
            </h3>

            {submitted ? (
              <div className="oc-success">
                <div className="oc-success-message">
                  <CheckCircle /> Thành công với <strong>{selectedNurse}</strong>{" "}
                  ngày <strong>{selectedDate} {selectedSlot}</strong>
                </div>
                <button onClick={reset} className="oc-reset-button">
                  Đặt lại
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="oc-form">
                <div className="oc-form-group">
                  <label className="oc-label">Chọn y tá</label>
                  <select
                    value={selectedNurse}
                    onChange={(e) => {
                      setSelectedNurse(e.target.value);
                      setError("");
                    }}
                    className="oc-select"
                  >
                    <option value="">-- Chọn --</option>
                    {nurses.map((n) => (
                      <option key={n.id} value={n.name}>
                        {n.name} – {n.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="oc-form-group">
                  <label className="oc-label">Ngày</label>
                  <input
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setError("");
                    }}
                    className="oc-input"
                  />
                </div>

                {selectedDate && (
                  <div className="oc-form-group">
                    <label className="oc-label">Khung giờ</label>
                    <div className="oc-slots">
                      {slots.map((s) => {
                        const isPast = selectedDate === today && s <= now;
                        const isBooked = occupied.includes(s);
                        const disabledSlot = isPast || isBooked;
                        const isSelected = selectedSlot === s;
                        const btnClass = `oc-slot-button ${
                          disabledSlot ? "disabled" : isSelected ? "selected" : ""
                        }`;
                        return (
                          <button
                            key={s}
                            type="button"
                            disabled={disabledSlot}
                            onClick={() => !disabledSlot && setSelectedSlot(s)}
                            className={btnClass}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="oc-form-group">
                  <label className="oc-label">Mô tả</label>
                  <textarea
                    rows={3}
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="oc-textarea"
                    placeholder="Mô tả vấn đề..."
                  />
                </div>

                {error && <div className="oc-error">{error}</div>}

                <button type="submit" className="oc-submit-button">
                  <CalendarCheck /> Đặt lịch
                </button>
              </form>
            )}

            <div className="oc-info-list">
              <p className="oc-info-item">
                <MessageCircle className="oc-info-icon" />
                Tư vấn trực tuyến
              </p>
              <p className="oc-info-item">
                <PhoneCall className="oc-info-icon" />
                An toàn & bảo mật
              </p>
              <p className="oc-info-item">
                <Users className="oc-info-icon" />
                Y tá giàu kinh nghiệm
              </p>
            </div>
          </div>

          {/* Right: Nurse List */}
          <div className="oc-nurse-list">
            <h3 className="oc-nurse-list-title">
              <Users /> Danh sách y tá
            </h3>
            {nurses.map((n) => {
              const disabledCard = submitted && n.name !== selectedNurse;
              const selectedCard = selectedNurse === n.name;
              const cardClass = `oc-nurse-card ${
                selectedCard ? "selected" : ""
              } ${disabledCard ? "disabled" : ""}`;
              return (
                <div
                  key={n.id}
                  onClick={() => !submitted && setSelectedNurse(n.name)}
                  className={cardClass}
                >
                  <img
                    src={n.avatar}
                    alt={n.name}
                    className="oc-nurse-avatar"
                  />
                  <div className="oc-nurse-info">
                    <h4 className="oc-nurse-name">{n.name}</h4>
                    <p className="oc-nurse-specialty">{n.specialty}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default OnlineConsultationPage;
