// src/pages/notification/Notification.jsx

import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Notification.css";

// helper để nối className
function cn(...args) {
  return args.filter(Boolean).join(" ");
}

// Hard-code data để test
const defaultData = {
  announcements: [
    {
      id: "ann1",
      title: "📢 Thông báo nghỉ lễ",
      content: "Nhà trường sẽ nghỉ Tết từ ngày 01 đến 05/02.",
      date: "2025-02-01",
    },
    {
      id: "ann2",
      title: "📢 Thay đổi lịch học",
      content: "Lịch học buổi sáng ngày 20/03 sẽ được đẩy sang buổi chiều.",
      date: "2025-03-20",
    },
  ],
  events: [
    {
      id: "test1",
      title: "🚑 Khám sức khỏe định kỳ",
      content: "Mời phụ huynh xác nhận tham gia khám sức khỏe ngày 25/07.",
      date: "2025-07-25",
    },
    {
      id: "test2",
      title: "💉 Tiêm phòng cúm mùa",
      content: "Mời phụ huynh xác nhận cho bé tiêm phòng cúm vào ngày 30/07.",
      date: "2025-07-30",
    },
  ],
};

const NavIcons = {
  Campaign: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      {/* icon cho Thông báo */}
      <path d="M10 10h20v20H10z" stroke="#323232" strokeWidth="2" />
    </svg>
  ),
  Calendar: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      {/* icon cho Sự kiện */}
      <path
        d="M31.6667 5H30V1.6667H26.6667V5H13.3333V1.6667H10V5H8.33333C6.5 5 5 6.5 5 8.33333V31.6667C5 33.5 6.5 35 8.33333 35H31.6667C33.5 35 35 33.5 35 31.6667V8.33333C35 6.5 33.5 5 31.6667 5Z"
        stroke="#323232"
        strokeWidth="2"
      />
      <path
        d="M8.33333 11.6667V8.33333H31.6667V11.6667H8.33333Z"
        fill="#323232"
      />
      <path
        d="M17.6 29.1L27.4833 19.2167L25.7167 17.45L17.6 25.5667L14.0833 22.05L12.3167 23.8167L17.6 29.1Z"
        fill="#323232"
      />
    </svg>
  ),
};

// Card chung cho cả Announcements & Events
const ContentCard = ({ title, content, date, onClick }) => (
  <div
    onClick={onClick}
    className="relative w-full max-w-[420px] mx-auto cursor-pointer group mb-4"
  >
    <div className="w-3 h-[200px] bg-schomed-card-blue rounded-xl absolute left-0 top-0 transition-all duration-300 group-hover:w-4" />
    <div className="ml-3 bg-schomed-card-bg rounded-xl p-5 md:p-6 flex flex-col justify-center min-h-[200px] transition-all duration-300 group-hover:shadow-lg group-hover:ml-4 group-hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-black font-['Montagu_Slab'] text-lg md:text-xl font-medium leading-snug group-hover:text-schomed-blue transition-colors duration-300">
          {title}
        </h3>
        <span className="text-sm text-gray-500 ml-3 bg-gray-100 px-3 py-1 rounded-full">
          {new Date(date).toLocaleDateString("vi-VN")}
        </span>
      </div>
      <p className="text-schomed-text-gray font-['Montagu_Slab'] text-base md:text-lg leading-6 group-hover:text-gray-700 transition-colors duration-300">
        {content}
      </p>
    </div>
  </div>
);

// Điều khiển phân trang
const NavigationControls = ({ currentPage, totalPages, onPageChange }) => (
  <div className="mb-6 flex justify-end">
    <button
      onClick={() => onPageChange(Math.max(0, currentPage - 1))}
      disabled={currentPage === 0}
      className={cn(
        "p-3 rounded-lg transition-all duration-200 transform border-2 shadow-md min-h-[44px] min-w-[44px]",
        currentPage === 0
          ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300"
          : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg border-blue-600"
      )}
    >
      ←
    </button>
    <div className="mx-2 bg-white rounded-lg px-4 py-3 border-2 border-gray-300 shadow-md min-h-[44px]">
      {currentPage + 1} / {Math.max(1, totalPages)}
    </div>
    <button
      onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
      disabled={currentPage >= totalPages - 1}
      className={cn(
        "p-3 rounded-lg transition-all duration-200 transform border-2 shadow-md min-h-[44px] min-w-[44px]",
        currentPage >= totalPages - 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300"
          : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg border-blue-600"
      )}
    >
      →
    </button>
  </div>
);

export default function Notification() {
  // Thay vì dùng defaultData, dùng state để lưu thông báo từ API
  const [data, setData] = useState({ announcements: [], events: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    Promise.all([
      fetch("http://localhost:8080/api/event-batches", {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        }),
      fetch("http://localhost:8080/api/notifications/parent", {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        })
    ])
      .then(([announcementBatches, notifications]) => {
        console.log('event-batches:', announcementBatches);
        console.log('notifications/parent:', notifications);
        setData({
          announcements: Array.isArray(announcementBatches.data)
            ? announcementBatches.data.map(batch => ({
              id: batch.batchId,
              title: batch.title || "📢 Thông báo",
              content: batch.description || "",
              date: batch.eventDate || "",
            }))
            : [],
          events: Array.isArray(notifications)
            ? notifications.filter(n => n.type === "Vaccine").map(n => ({
              id: n.notificationId,
              title: "💉 Tiêm chủng",
              content: n.content,
              date: n.dateSent,
            }))
            : [],
        });
      })
      .catch((e) => {
        setError("Không tải được thông báo.");
      })
      .finally(() => setLoading(false));
  }, []);

  // phân trang announcements
  const [annPage, setAnnPage] = useState(0);
  const annTotal = Math.ceil(data.announcements.length / 3);
  const annToShow = data.announcements.slice(annPage * 3, annPage * 3 + 3);

  // phân trang events
  const [evPage, setEvPage] = useState(0);
  const evTotal = Math.ceil(data.events.length / 3);
  const evToShow = data.events.slice(evPage * 3, evPage * 3 + 3);

  // modal + toast cho events
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleResponse = async (choice) => {
    if (!selectedEvent) return;
    const consentStatus = choice === "accepted";
    try {
      const res = await fetch(
        `http://localhost:8080/api/notifications/consent/${selectedEvent.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            consentStatus: consentStatus,
            // Nếu cần truyền thêm parentUserId, studentId thì bổ sung ở đây
          }),
        }
      );
      if (!res.ok) throw new Error("Không thể xác nhận");
      setSelectedEvent(null);
      setToastMessage(
        consentStatus
          ? "✅ Bạn đã đồng ý tham gia"
          : "❌ Bạn đã từ chối tham gia"
      );
      setTimeout(() => setToastMessage(""), 6000);
    } catch (e) {
      setToastMessage("Có lỗi khi gửi phản hồi, vui lòng thử lại.");
      setTimeout(() => setToastMessage(""), 6000);
    }
  };

  return (
    <div className="notification-container">
      <Header />

      {/* Toast chung */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-lg z-50">
          {toastMessage}
        </div>
      )}

      <main className="notification-main space-y-8">
        {/* === PHẦN THÔNG BÁO === */}
        <section className="notification-section">
          <div className="notification-section-header">
            <div className="icon-scale">
              <NavIcons.Campaign />
            </div>
            <h2 className="notification-section-title">📅 Sự kiện</h2>
          </div>
          <NavigationControls
            currentPage={annPage}
            totalPages={annTotal}
            onPageChange={setAnnPage}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {annToShow.map((ann) => (
              <ContentCard
                key={ann.id}
                title={ann.title}
                content={ann.content}
                date={ann.date}
                // Thông báo không click mở modal
                onClick={null}
              />
            ))}
          </div>
        </section>

        {/* === PHẦN SỰ KIỆN === */}
        <section className="notification-section">
          <div className="notification-section-header">
            <div className="icon-scale">
              <NavIcons.Calendar />
            </div>
            <h2 className="notification-section-title">📢 Thông báo</h2>
          </div>
          <NavigationControls
            currentPage={evPage}
            totalPages={evTotal}
            onPageChange={setEvPage}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evToShow.map((ev) => (
              <ContentCard
                key={ev.id}
                title={ev.title}
                content={ev.content}
                date={ev.date}
                onClick={() => setSelectedEvent(ev)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal chỉ cho SỰ KIỆN */}
      {selectedEvent && (
        <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="modal-window bg-white rounded-2xl w-[90%] max-w-lg p-6 relative z-50">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-2">Xác nhận tham gia</h3>
            <p className="mb-4">
              <strong>Sự kiện:</strong> {selectedEvent.title}
            </p>
            <p className="mb-6">
              <strong>Ngày:</strong>{" "}
              {new Date(selectedEvent.date).toLocaleDateString("vi-VN")}
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleResponse("accepted")}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              >
                Đồng ý
              </button>
              <button
                onClick={() => handleResponse("declined")}
                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              >
                Không đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
