import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaRegEdit, FaTrash } from "react-icons/fa";

export default function ConsultationAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [newAppt, setNewAppt] = useState({
    date: "",
    time: "",
    type: "",
    notes: "",
  });

  // 1. Lấy danh sách từ API
  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setSelected(data[0] || null);
      })
      .catch(console.error);
  }, []);

  // 2. Cập nhật appointment
  const handleConfirm = async () => {
    try {
      const res = await fetch(`/api/appointments/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selected),
      });
      const updated = await res.json();
      setAppointments((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Tạo mới appointment
  const handleCreate = async () => {
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppt),
      });
      const created = await res.json();
      setAppointments((prev) => [...prev, created]);
      setNewAppt({ date: "", time: "", type: "", notes: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Xóa appointment
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      if (selected?.id === id) {
        setSelected(null);
        setEditMode(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewAppt((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelect = (appt) => {
    setSelected(appt);
    setEditMode(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full space-y-10">
      <h2 className="text-3xl font-bold text-center text-blue-800">
        Xác nhận lịch hẹn tư vấn
      </h2>

      {/* Appointment Info */}
      <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">
          Thông tin lịch hẹn
        </h3>
        {selected ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-36 font-medium">ID cuộc hẹn:</span>
              <span className="flex-1 text-gray-700">
                {selected.appointment_id}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-36 font-medium">ID học sinh:</span>
              <span className="flex-1 text-gray-700">{selected.student_id}</span>
            </div>
            <div className="flex items-center">
              <span className="w-36 font-medium">ID y tá:</span>
              <span className="flex-1 text-gray-700">{selected.nurse_id}</span>
            </div>
            <div className="flex items-center">
              <span className="w-36 font-medium">Ngày giờ hẹn:</span>
              <span className="flex-1 text-gray-700">
                {selected.appointment_date}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-36 font-medium">Lý do:</span>
              <span className="flex-1 text-gray-700">{selected.reason}</span>
            </div>
            <div className="flex items-center">
              <span className="w-36 font-medium">Trạng thái:</span>
              <span className="flex-1 text-gray-700">{selected.status}</span>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => setEditMode((v) => !v)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                {editMode ? "Hủy" : "Chỉnh sửa"}
              </button>
              {editMode && (
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Xác nhận
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Chưa có lịch hẹn được chọn.</p>
        )}
      </section>

      {/* Create New */}
      <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">
          Tạo lịch hẹn tư vấn mới
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-1 font-medium">Ngày</label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <FaCalendarAlt className="mr-2 text-gray-400" />
              <input
                type="date"
                name="date"
                value={newAppt.date}
                onChange={handleNewChange}
                className="w-full focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Giờ</label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              <FaClock className="mr-2 text-gray-400" />
              <input
                type="time"
                name="time"
                value={newAppt.time}
                onChange={handleNewChange}
                className="w-full focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Loại tư vấn</label>
          <input
            type="text"
            name="type"
            placeholder="Ví dụ: Tư vấn sức khỏe tổng quát"
            value={newAppt.type}
            onChange={handleNewChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Ghi chú</label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Thêm ghi chú..."
            value={newAppt.notes}
            onChange={handleNewChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleCreate}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Tạo lịch hẹn
        </button>
      </section>

      {/* Appointment List */}
      <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">
          Danh sách lịch hẹn
        </h3>
        <ul className="space-y-4">
          {appointments.map((a) => (
            <li
              key={a.id}
              className="flex justify-between items-center border-b pb-4 last:border-none"
            >
              <div>
                <p className="font-semibold">{a.type}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-1" /> {a.date}{" "}
                  <FaClock className="ml-4 mr-1" /> {a.time}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSelect(a)}
                  className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  <FaRegEdit className="mr-1" /> Chỉnh sửa
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <FaTrash className="mr-1" /> Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
