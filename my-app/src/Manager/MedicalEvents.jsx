// src/Manager/MedicalEvents.jsx
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClinicMedical } from 'react-icons/fa';

export default function MedicalEvents() {
  const username = localStorage.getItem('userName') || ''; // Đúng tên biến là userName

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    eventDate: '',
    endDate: '', // Thêm trường endDate
    description: '',
    batchType: '',
    status: 'Pending', // Thêm trường status mặc định
    createdBy: username // Tự động gán tên người tạo
  });

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

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Khi mở form, cập nhật lại createdBy từ localStorage
  const handleShowForm = () => {
    setNewEvent((prev) => ({
      ...prev,
      createdBy: localStorage.getItem('userId') || '',
      status: 'Pending' // Luôn đặt mặc định khi mở form
    }));
    setShowForm(true);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const eventToSend = { ...newEvent, createdBy: localStorage.getItem('userId') || '' }; // Sửa thành userId
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8080/api/event-batches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventToSend)
      });
      if (!res.ok) throw new Error('Tạo sự kiện thất bại');
      const data = await res.json();
      setEvents([data.data, ...events]);
      setShowForm(false);
      setNewEvent({
        title: '',
        eventDate: '',
        endDate: '', // Đặt lại trường endDate
        description: '',
        batchType: '',
        status: 'Pending', // Đặt lại trạng thái mặc định
        createdBy: localStorage.getItem('userId') || ''
      });
      alert('Tạo sự kiện thành công!');
    } catch (err) {
      alert('Tạo sự kiện thất bại!');
      console.error(err);
    }
  };

  const handleApprove = async (batchId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/event-batches/${batchId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('Approve failed');
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

  const handleReject = async (batchId) => {
    const token = (localStorage.getItem('token') || '').trim();
    try {
      const res = await fetch(`http://localhost:8080/api/event-batches/${batchId}/delete`, {
        method: 'PUT', // Đổi thành PUT
        headers: {
          'Content-Type': 'application/json', // Sửa lại đúng định dạng
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Từ chối sự kiện thất bại');
      setEvents(events.filter(evt => evt.batchId !== batchId));
      alert('Đã từ chối và xóa sự kiện!');
    } catch (err) {
      alert('Từ chối sự kiện thất bại!');
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Đang tải sự kiện…</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-full space-y-10">
      <div className="flex flex-col md:flex-row items-center justify-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-blue-800 text-center w-full">
          Sự kiện Y tế
        </h2>
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center"
          style={{ height: "48px" }}
          onClick={handleShowForm}
        >
          <span className="whitespace-nowrap">Thêm sự kiện</span>
        </button>
      </div>
      {showForm && (
        <form
          className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-4 mb-8"
          onSubmit={handleCreateEvent}
        >
          <h3 className="text-xl font-bold mb-4 text-blue-700 text-center">
            Thêm sự kiện y tế mới
          </h3>
          <label className="block font-semibold mb-1" htmlFor="title">
            Tiêu đề sự kiện
          </label>
          <input
            id="title"
            name="title"
            placeholder="Tiêu đề"
            className="w-full border p-2 rounded mb-2"
            value={newEvent.title}
            onChange={handleInputChange}
            required
          />
          <label className="block font-semibold mb-1" htmlFor="eventDate">
            Ngày bắt đầu
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            className="w-full border p-2 rounded mb-2"
            value={newEvent.eventDate}
            onChange={handleInputChange}
            required
          />
          <label className="block font-semibold mb-1" htmlFor="endDate">
            Ngày kết thúc
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            className="w-full border p-2 rounded mb-2"
            value={newEvent.endDate}
            onChange={handleInputChange}
            required
          />
          <label className="block font-semibold mb-1" htmlFor="batchType">
            Loại sự kiện
          </label>
          <input
            id="batchType"
            name="batchType"
            placeholder="Loại sự kiện"
            className="w-full border p-2 rounded mb-2"
            value={newEvent.batchType}
            onChange={handleInputChange}
          />
          <label className="block font-semibold mb-1" htmlFor="status">
            Trạng thái
          </label>
          <select
            id="status"
            name="status"
            className="w-full border p-2 rounded mb-2"
            value={newEvent.status}
            onChange={handleInputChange}
          >
            <option value="Pending">Đợi duyệt</option>
            <option value="Approved">Đã duyệt</option>
          </select>
          <label className="block font-semibold mb-1">
            Người tạo
          </label>
          <div className="w-full border p-2 rounded bg-gray-100 text-gray-600 mb-2">
            {username || 'Chưa đăng nhập'}
          </div>
          <label className="block font-semibold mb-1" htmlFor="description">
            Mô tả sự kiện
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Mô tả"
            className="w-full border p-2 rounded mb-2"
            value={newEvent.description}
            onChange={handleInputChange}
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Tạo sự kiện
            </button>
            <button
              type="button"
              className="flex-1 py-2 border border-gray-400 text-gray-600 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setShowForm(false)}
            >
              Hủy
            </button>
          </div>
        </form>
      )}
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
                <span>
                  {evt.eventDate || "Không có ngày"}
                  {evt.endDate ? ` - ${evt.endDate}` : ""}
                </span>
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
                {evt.status !== 'Approved' && (
                  <>
                    <button
                      className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      onClick={() => handleApprove(evt.batchId)}
                    >
                      Đồng ý
                    </button>
                    <button
                      className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      onClick={() => handleReject(evt.batchId)}
                    >
                      Từ chối
                    </button>
                  </>
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
