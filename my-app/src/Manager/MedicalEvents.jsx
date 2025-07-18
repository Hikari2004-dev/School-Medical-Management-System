// src/Manager/MedicalEvents.jsx
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClinicMedical } from 'react-icons/fa';

export default function MedicalEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/event-batches')
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        const contentType = r.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return r.json();
        } else {
          throw new Error("API không trả về JSON");
        }
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setEvents(data.data);
        } else {
          setEvents([]);
        }
      })
      .catch((e) => {
        setError('Không tải được sự kiện. Kiểm tra lại API.');
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (batchId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/event-batches/${batchId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('Approve failed');
      // Sau khi duyệt, cập nhật lại danh sách sự kiện
      // Có thể gọi lại API hoặc cập nhật trạng thái local
      setEvents(events.map(evt =>
        evt.batchId === batchId ? { ...evt, status: 'Approved' } : evt
      ));
      alert('Đã duyệt thành công!');
    } catch (err) {
      alert('Duyệt thất bại!');
      console.error(err);
    }
  };

  const handleUnapprove = async (batchId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/event-batches/${batchId}/resend `, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('Unapprove failed');
      setEvents(events.map(evt =>
        evt.batchId === batchId ? { ...evt, status: 'Pending' } : evt
      ));
      alert('Chuyển về trạng thái đợi duyệt thành công!');
    } catch (err) {
      alert('Chuyển trạng thái thất bại!');
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Đang tải sự kiện…</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-full space-y-10">
      <h2 className="text-3xl font-bold text-center text-blue-800">
        Sự kiện Y tế
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((evt) => (
          <div
            key={evt.batchId}
            className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="absolute -top-6 left-8 bg-blue-600 p-3 rounded-full shadow-md">
              <FaClinicMedical className="text-white text-2xl" />
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-2xl font-semibold">{evt.title}</h3>
              <div className="flex items-center text-gray-500">
                <FaCalendarAlt className="mr-2" />
                <span>{evt.eventDate || "Không có ngày"}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{evt.description}</p>
              <div className="text-sm text-gray-400">
                Loại: {evt.batchType || "Không có dữ liệu"} | Người tạo: {evt.createdBy || "Không có dữ liệu"}
              </div>
              <div className="text-sm text-gray-400">
                Trạng thái:
                {evt.status === 'Approved' ? (
                  <span className="text-green-600 font-semibold ml-1">Đã duyệt</span>
                ) : (
                  <span className="text-yellow-600 font-semibold ml-1">Đợi duyệt</span>
                )}
              </div>
              <div className="flex space-x-4 pt-4 border-t">
                <button className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  Xem chi tiết
                </button>
                {evt.status !== 'Approved' && (
                  <button
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => handleApprove(evt.batchId)}
                  >
                    Đồng ý
                  </button>
                )}
                {evt.status === 'Approved' && (
                  <button
                    className="flex-1 py-2 bg-yellow-400 text-yellow-900 border border-yellow-500 rounded-lg hover:bg-yellow-300 transition"
                    onClick={() => handleUnapprove(evt.batchId)}
                  >
                    Chuyển về đợi duyệt
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
