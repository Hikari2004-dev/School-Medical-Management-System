import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Notifications() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, apptRes] = await Promise.all([
          fetch("http://localhost:8080/api/event-batches"),
          fetch("http://localhost:8080/api/appointments/all"),
        ]);

        if (!eventRes.ok || !apptRes.ok)
          throw new Error("Lỗi khi lấy dữ liệu thông báo");

        const eventData = await eventRes.json();
        const apptData = await apptRes.json();

        const eventNotes = eventData.data.map((item) => ({
          id: "event-" + item.batchId,
          title: item.title,
          message: item.description,
          type: "event",
          urgent: item.status === "Repending",
          read: false,
        }));

        const apptNotes = apptData.data.map((item) => ({
          id: "appt-" + item.appointmentId,
          title: "Lịch hẹn y tế",
          message: item.reason,
          type: "appointment",
          urgent: item.status === "Pending",
          read: false,
        }));

        setNotes([...eventNotes, ...apptNotes]);
      } catch (error) {
        console.error("❌ Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);

  const markRead = (id) =>
    setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const del = (id) => setNotes((ns) => ns.filter((n) => n.id !== id));

  const filtered = notes.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <h2 className="text-2xl font-semibold mb-6">📢 Thông báo hệ thống</h2>

      {/* Bộ lọc */}
      <div className="flex space-x-2 mb-6">
        {["all", "unread", "read"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-md font-medium ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {f === "all" ? "Tất cả" : f === "unread" ? "Chưa đọc" : "Đã đọc"}
          </button>
        ))}
      </div>

      {/* Danh sách thông báo */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">Không có thông báo nào.</p>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              className={`relative flex flex-col bg-white rounded-lg shadow p-4 border-l-4 ${
                n.urgent ? "border-red-500" : "border-transparent"
              }`}
            >
              <div className="flex justify-between items-start">
                <h3
                  className={`${
                    n.read ? "text-gray-500" : "text-gray-900"
                  } font-semibold`}
                >
                  {n.title}
                </h3>
              </div>
              <p className={`mt-2 text-gray-700 ${n.read ? "opacity-70" : ""}`}>
                {n.message}
              </p>
              <div className="mt-3 flex space-x-3">
                {!n.read && (
                  <button
                    onClick={() => markRead(n.id)}
                    className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-sm"
                  >
                    Đánh dấu đã đọc
                  </button>
                )}
                {n.read && (
                  <button
                    onClick={() => del(n.id)}
                    className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50 text-sm inline-flex items-center"
                  >
                    <FaTrash className="mr-1" /> Xóa
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
