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
  const [selectedNurseId, setSelectedNurseId] = useState(""); // sửa lại lưu nurse_id
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [issue, setIssue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showSlotError, setShowSlotError] = useState(false);

  // Fetch nurse list
  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const res = await fetch("http://localhost:8080/api/nurses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Thêm token vào header
          },
        });
        if (res.status === 403) {
          setError("Bạn chưa được phép truy cập danh sách y tá.");
          setNurses([]);
          return;
        }
        const data = await res.json();
        const nursesData = data.map(n => ({
          id: n.id || n.firstName + n.lastName,
          name: `${n.firstName} ${n.lastName}`,
          email: n.email,
          phone: n.phone,
          address: n.address,
          specialty: n.roleName || "School Nurse",
          avatar: "/default-avatar.png",
        }));
        setNurses(nursesData);
      } catch (e) {
        setError("Không thể lấy danh sách y tá. Vui lòng thử lại.");
        console.error(e);
      }
    };
    fetchNurses();
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
  const occupied = booked[selectedNurseId]?.[selectedDate] || [];

  const reset = () => {
    setSelectedNurseId("");
    setSelectedDate("");
    setSelectedSlot("");
    setIssue("");
    setSubmitted(false);
    setError("");
  };

  // Hàm kiểm tra trùng lịch với nurseId, ngày và slot
  const checkDuplicateAppointment = async (nurseId, appointmentDate, appointmentSlot) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/appointments/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) return false;
      const result = await res.json();
      // Dữ liệu thực tế nằm trong result.data
      const data = Array.isArray(result.data) ? result.data : [];
      return data.some(app => {
        // app.appointmentDate dạng "2025-07-15T10:30:00"
        if (!app.appointmentDate || !app.nurseId) return false;
        const [date, time] = app.appointmentDate.split("T");
        return (
          Number(app.nurseId) === Number(nurseId) &&
          date === appointmentDate &&
          time.slice(0, 5) === appointmentSlot
        );
      });
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedNurseId || !selectedDate || !selectedSlot || !issue) {
      return setError("Vui lòng điền đầy đủ thông tin.");
    }
    if (
      selectedDate < today ||
      (selectedDate === today && selectedSlot <= now)
    ) {
      return setError("Chọn thời điểm hợp lệ.");
    }
    if (occupied.includes(selectedSlot)) {
      setShowSlotError(true);
      setTimeout(() => setShowSlotError(false), 3000);
      return;
    }

    const studentId = Number(localStorage.getItem("student_id")) || 1;
    const nurseId = Number(selectedNurseId);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Bạn chưa đăng nhập. Vui lòng đăng nhập để kiểm tra lịch.");
      return false;
    }

    const appointmentDate = `${selectedDate}T${selectedSlot}:00`;

    if (await checkDuplicateAppointment(nurseId, selectedDate, selectedSlot)) {
      setShowSlotError(true);
      setTimeout(() => setShowSlotError(false), 3000);
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/appointments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentId,
          nurseId,
          appointmentDate,
          reason: issue,
          status: "Pending",
        }),
      });
      if (res.status === 403) {
        setError("Bạn không có quyền đặt lịch. Vui lòng đăng nhập lại.");
        return;
      }
      if (!res.ok) {
        setError("Đặt lịch thất bại. Vui lòng thử lại.");
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setError("Đặt lịch thất bại. Vui lòng thử lại.");
    }
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
                  <CheckCircle /> Thành công với <strong>{nurses.find(n => n.id === Number(selectedNurseId))?.name}</strong>{" "}
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
                    value={selectedNurseId}
                    onChange={(e) => {
                      setSelectedNurseId(e.target.value);
                      setError("");
                    }}
                    className="oc-select"
                  >
                    <option value="">-- Chọn --</option>
                    {nurses.map((n) => (
                      <option key={n.id} value={n.id}>
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
                        const btnClass = `oc-slot-button ${disabledSlot ? "disabled" : isSelected ? "selected" : ""}`;
                        return (
                          <button
                            key={s}
                            type="button"
                            disabled={disabledSlot}
                            onClick={() => !disabledSlot && setSelectedSlot(s)}
                            className={btnClass}
                            style={isBooked ? { background: "#ffeaea", color: "#ff4d4f", border: "1px solid #ff4d4f" } : {}}
                            title={isBooked ? "Khung giờ đã được đặt" : ""}
                          >
                            {s}
                            {isBooked && (
                              <span style={{ marginLeft: 6, color: "#ff4d4f", fontSize: 14 }}>⏰</span>
                            )}
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

            {showSlotError && (
              <div
                style={{
                  position: "fixed",
                  top: "24px",
                  right: "24px",
                  zIndex: 9999,
                  background: "#fff",
                  border: "1px solid #ff4d4f",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  padding: "14px 28px",
                  color: "#ff4d4f",
                  fontWeight: "bold",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: 22 }}>⏰</span>
                Khung giờ đã được đặt
              </div>
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
            <table className="oc-nurse-table">
              <thead>
                <tr>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Vai trò</th>
                </tr>
              </thead>
              <tbody>
                {nurses.map((n) => (
                  <tr key={n.id}>
                    <td>{n.name}</td>
                    <td>{n.email}</td>
                    <td>{n.phone}</td>
                    <td>{n.address}</td>
                    <td>{n.specialty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default OnlineConsultationPage;
