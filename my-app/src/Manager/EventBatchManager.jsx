import React, { useState } from "react";

function EventBatchManager() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [batchType, setBatchType] = useState("Vaccination");
  const [message, setMessage] = useState("");
  const [batches, setBatches] = useState([]);

  const createdBy = parseInt(localStorage.getItem("userId")); // Lấy user ID từ localStorage

  const handleCreate = async () => {
    const payload = {
      title,
      description,
      eventDate,
      batchType,
      createdBy, // Gửi đúng như yêu cầu backend
    };

    try {
      const res = await fetch("http://localhost:8080/api/event-batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setMessage(result.message);

      if (res.ok && result.success) {
        const newBatch = { ...result.data, id: Date.now() }; // gán id tạm thời
        setBatches([...batches, newBatch]);

        // reset form
        setTitle("");
        setDescription("");
        setEventDate("");
        setBatchType("Vaccination");
      }
    } catch (err) {
      setMessage("Tạo batch thất bại: " + err.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/event-batches/${id}/approve`, {
        method: "PUT",
      });
      const result = await res.json();
      setMessage(result.message);
    } catch {
      setMessage("Lỗi khi phê duyệt batch");
    }
  };

  const handleResend = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/event-batches/${id}/resend`, {
        method: "PUT",
      });
      const result = await res.json();
      setMessage(result.message);
    } catch {
      setMessage("Lỗi khi gửi lại batch");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý Batch sự kiện</h2>

      {message && (
        <div className="bg-blue-100 text-blue-800 p-2 mb-4 rounded">{message}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Tiêu đề"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={batchType}
          onChange={(e) => setBatchType(e.target.value)}
        >
          <option value="Vaccination">Tiêm chủng</option>
          <option value="HealthCheck">Khám sức khỏe</option>
        </select>
        <input
          type="text"
          placeholder="Mô tả"
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-6"
        onClick={handleCreate}
      >
        Tạo batch mới
      </button>

      <h3 className="text-xl font-semibold mb-2">Danh sách Batch đã tạo</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-green-100">
            <tr>
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Tiêu đề</th>
              <th className="border px-3 py-2">Loại</th>
              <th className="border px-3 py-2">Ngày</th>
              <th className="border px-3 py-2">Trạng thái</th>
              <th className="border px-3 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch, idx) => (
              <tr key={idx} className="hover:bg-green-50">
                <td className="border px-3 py-2 text-center">{batch.batchId || `#${idx + 1}`}</td>
                <td className="border px-3 py-2">{batch.title}</td>
                <td className="border px-3 py-2">{batch.batchType}</td>
                <td className="border px-3 py-2">{batch.eventDate}</td>
                <td className="border px-3 py-2">{batch.status}</td>
                <td className="border px-3 py-2 space-x-2">
                  <button
                    onClick={() => handleApprove(batch.batchId)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Phê duyệt
                  </button>
                  <button
                    onClick={() => handleResend(batch.batchId)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Gửi lại
                  </button>
                </td>
              </tr>
            ))}
            {batches.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Chưa có batch nào được tạo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventBatchManager;
