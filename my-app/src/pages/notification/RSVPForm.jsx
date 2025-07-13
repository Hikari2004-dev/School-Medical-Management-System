import React, { useState } from "react";

export default function RSVPForm({ eventId, eventName, eventDate }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResponse = async (response) => {
    setLoading(true);
    try {
      await fetch(`/api/events/${eventId}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      });
      setStatus(response);
    } catch {
      alert("Có lỗi khi gửi phản hồi, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (status) {
    return (
      <p className="mt-3 text-sm font-medium text-center">
        {status === "accepted"
          ? "Bạn đã xác nhận tham gia ✅"
          : "Bạn đã từ chối tham gia ❌"}
      </p>
    );
  }

  return (
    <div className="rsvp-form mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="text-gray-700 mb-2">
        <strong>Sự kiện:</strong> {eventName}
      </div>
      <div className="text-gray-500 mb-4">
        <strong>Ngày:</strong> {new Date(eventDate).toLocaleDateString("vi-VN")}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleResponse("accepted")}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Đồng ý
        </button>
        <button
          onClick={() => handleResponse("declined")}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Không đồng ý
        </button>
      </div>
    </div>
);
}
