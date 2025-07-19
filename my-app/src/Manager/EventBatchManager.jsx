import React, { useState, useEffect, useRef } from "react";

export default function EventBatchManager() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [batchType, setBatchType] = useState("Vaccination");
  const [batches, setBatches] = useState([]);

  // toast = { text: string, type: "success"|"error" }
  const [toast, setToast] = useState({ text: "", type: "success" });
  const toastTimer = useRef(null);

  const token = localStorage.getItem("token");
  const createdBy = parseInt(localStorage.getItem("userId"), 10);

  // Hiển thị toast, tự ẩn sau 5s
  const showToast = (text, type = "success") => {
    setToast({ text, type });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast({ text: "", type });
    }, 5000);
  };

  // Hủy timer nếu component unmount
  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  // Utility: chỉ parse JSON nếu đúng content-type
  const safeJson = async (res) => {
    const ct = res.headers.get("content-type") || "";
    return ct.includes("application/json") ? await res.json() : {};
  };

  // Lấy danh sách batch
  const fetchBatches = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/event-batches", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await safeJson(res);
        setBatches(data.data || data);
      } else {
        showToast("Không thể tải danh sách batch.", "error");
      }
    } catch (err) {
      showToast("Lỗi tải danh sách batch: " + err.message, "error");
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // Tạo batch mới
  const handleCreate = async () => {
    if (!createdBy) {
      showToast("⚠️ Vui lòng đăng nhập lại.", "error");
      return;
    }
    const payload = { title, description, eventDate, batchType, createdBy };
    try {
      const res = await fetch("http://localhost:8080/api/event-batches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await safeJson(res);
      if (res.ok && result.success) {
        showToast("Tạo batch thành công!", "success");
        fetchBatches();
        // reset form
        setTitle("");
        setDescription("");
        setEventDate("");
        setBatchType("Vaccination");
      } else {
        showToast(result.message || "Tạo batch thất bại.", "error");
      }
    } catch (err) {
      showToast("Tạo batch thất bại: " + err.message, "error");
    }
  };

  // Phê duyệt batch
  const handleApprove = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/event-batches/${id}/approve`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await safeJson(res);
      if (res.ok && result.success) {
        showToast("Phê duyệt thành công!", "success");
        fetchBatches();
      } else {
        showToast(result.message || "Phê duyệt thất bại.", "error");
      }
    } catch (err) {
      showToast("Lỗi khi phê duyệt batch: " + err.message, "error");
    }
  };

  // Gửi lại batch
  const handleResend = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/event-batches/${id}/resend`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await safeJson(res);
      if (res.ok && result.success) {
        showToast("Gửi lại thành công!", "success");
        fetchBatches();
      } else {
        showToast(result.message || "Gửi lại thất bại.", "error");
      }
    } catch (err) {
      showToast("Lỗi khi gửi lại batch: " + err.message, "error");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 relative">
      {/* Toast */}
      {toast.text && (
        <div
          className={
            "fixed top-4 right-4 flex items-center space-x-2 px-4 py-2 rounded shadow-lg text-white " +
            (toast.type === "success" ? "bg-green-600" : "bg-red-600")
          }
        >
          <span className="font-medium">{toast.text}</span>
          <button
            onClick={() => setToast({ text: "", type: toast.type })}
            className="text-xl leading-none focus:outline-none"
          >
            &times;
          </button>
        </div>
      )}

      <div className="max-w-screen-lg mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Quản lý Batch sự kiện</h2>

        {/* Form tạo batch */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Tiêu đề"
            className="border p-2 rounded focus:ring focus:ring-blue-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded focus:ring focus:ring-blue-200"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <select
            className="border p-2 rounded focus:ring focus:ring-blue-200"
            value={batchType}
            onChange={(e) => setBatchType(e.target.value)}
          >
            <option value="Vaccination">Tiêm chủng</option>
            <option value="HealthCheck">Khám sức khỏe</option>
          </select>
          <input
            type="text"
            placeholder="Mô tả"
            className="border p-2 rounded focus:ring focus:ring-blue-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition mb-8"
        >
          Tạo batch mới
        </button>

        {/* Bảng danh sách batch */}
        <h3 className="text-xl font-semibold mb-4">Danh sách Batch đã tạo</h3>
        <div className="overflow-x-auto">
          <table className="table-fixed w-full text-sm border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/12 px-4 py-2">ID</th>
                <th className="w-2/12 px-4 py-2">Tiêu đề</th>
                <th className="w-3/12 px-4 py-2">Mô tả</th>
                <th className="w-2/12 px-4 py-2">Loại</th>
                <th className="w-2/12 px-4 py-2">Ngày</th>
                <th className="w-2/12 px-4 py-2 whitespace-nowrap">
                  Trạng thái
                </th>
                <th className="w-2/12 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {batches.map((batch) => (
                <tr key={batch.batchId} className="hover:bg-gray-50">
                  <td className="align-middle px-4 py-2 text-center">
                    {batch.batchId}
                  </td>
                  <td className="align-middle px-4 py-2 truncate">
                    {batch.title}
                  </td>
                  <td className="align-middle px-4 py-2 break-words">
                    {batch.description}
                  </td>
                  <td className="align-middle px-4 py-2">
                    {batch.batchType}
                  </td>
                  <td className="align-middle px-4 py-2">
                    {batch.eventDate}
                  </td>
                  <td className="align-middle px-4 py-2 whitespace-nowrap">
                    {batch.status}
                  </td>
                  <td className="align-middle px-4 py-2">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleApprove(batch.batchId)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Phê duyệt
                      </button>
                      <button
                        onClick={() => handleResend(batch.batchId)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Từ chối 
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {batches.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-6 text-center text-gray-500 align-middle"
                  >
                    Chưa có batch nào được tạo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
