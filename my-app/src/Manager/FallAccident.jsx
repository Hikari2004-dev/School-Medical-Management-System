import React, { useState, useEffect } from "react";

const FallAccident = () => {
  const [incident, setIncident] = useState({
    event_type: "",
    event_date: new Date().toISOString().slice(0, 10),
    description: "",
    student_id: "",
    nurse_id: "",
    status: "Pending",
    approved_by: "",
  });
  const [nurseName, setNurseName] = useState("");

  useEffect(() => {
    const nurseId = localStorage.getItem("userId") || "";
    const nurseName = localStorage.getItem("userName") || ""; // Đúng key
    setIncident((prev) => ({ ...prev, nurse_id: nurseId }));
    setNurseName(nurseName);
  }, []);

  const handleChange = (field, value) => {
    setIncident({ ...incident, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu sự cố đã lưu:", incident);
    alert("Đã lưu sự cố (xem console)!");
    // TODO: Gửi dữ liệu lên API nếu cần
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-blue-700 mb-6 flex items-center">
          <span className="text-2xl mr-2">🩹</span>
          Ghi nhận sự cố của học sinh
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Loại sự cố (event_type)"
              value={incident.event_type}
              onChange={(e) => handleChange("event_type", e.target.value)}
              className="border border-gray-300 p-3 rounded-lg"
              required
            />
            <input
              type="date"
              value={incident.event_date}
              onChange={(e) => handleChange("event_date", e.target.value)}
              className="border border-gray-300 p-3 rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="ID học sinh (student_id)"
              value={incident.student_id}
              onChange={(e) => handleChange("student_id", e.target.value)}
              className="border border-gray-300 p-3 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Tên y tá"
              value={nurseName}
              disabled
              className="border border-gray-300 p-3 rounded-lg bg-gray-100"
            />
            <input
              type="hidden"
              value={incident.nurse_id}
              name="nurse_id"
            />
            <input
              type="text"
              placeholder="Người duyệt (approved_by, có thể để trống)"
              value={incident.approved_by}
              onChange={(e) => handleChange("approved_by", e.target.value)}
              className="border border-gray-300 p-3 rounded-lg"
            />
            <select
              value={incident.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="border border-gray-300 p-3 rounded-lg"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="font-semibold text-gray-700 mb-2 block">
              📝 Mô tả sự cố (description)
            </label>
            <textarea
              placeholder="Chi tiết sự cố..."
              value={incident.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-full h-28"
              required
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              💾 Lưu sự cố
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FallAccident;
