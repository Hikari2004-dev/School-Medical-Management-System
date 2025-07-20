import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [eventNames, setEventNames] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [studentNameInput, setStudentNameInput] = useState("");
  const [accidentList, setAccidentList] = useState([]);
  const [showAccidentList, setShowAccidentList] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const nurseId = localStorage.getItem("userId") || "";
    const nurseName = localStorage.getItem("userName") || "";
    setIncident((prev) => ({ ...prev, nurse_id: nurseId }));
    setNurseName(nurseName);

    fetch("http://localhost:8080/api/event-batches")
      .then((res) => res.json())
      .then((data) => {
        const eventsArray = Array.isArray(data.data) ? data.data : [];
        setEventNames(eventsArray);
      })
      .catch(() => setEventNames([]));

    fetch("http://localhost:8080/api/students/all")
      .then((res) => res.json())
      .then((data) => {
        setStudentList(Array.isArray(data) ? data : []);
      })
      .catch(() => setStudentList([]));
  }, []);

  const handleChange = (field, value) => {
    setIncident({ ...incident, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!incident.student_id || !incident.approved_by) {
      alert("Vui lòng nhập đầy đủ thông tin học sinh và người duyệt!");
      return;
    }
    const payload = {
      eventType: incident.event_type,
      eventDate: incident.event_date,
      description: incident.description,
      studentId: Number(incident.student_id),
      nurseId: Number(incident.nurse_id),
      status: incident.status,
      approved_by: Number(incident.approved_by)
    };
    try {
      let response;
      if (isEditMode && editId) {
        response = await fetch(`http://localhost:8080/api/medical-events/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch("http://localhost:8080/api/medical-events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }
      if (!response.ok) {
        throw new Error("Gửi dữ liệu thất bại!");
      }

      // Gửi thông báo về cho phụ huynh qua API
      const student = studentList.find(s => s.id === Number(incident.student_id));
      const parentEmail = student?.parentEmail || "";
      const notificationPayload = {
        to: parentEmail,
        subject: `Thông báo sự cố tại trường cho học sinh ${student?.name || ""}`,
        message: `Xin chào phụ huynh,\n\nHọc sinh ${student?.name || ""} đã gặp sự cố: ${incident.event_type} vào ngày ${incident.event_date}.\nMô tả: ${incident.description}\n\nY tá phụ trách: ${nurseName}`
      };
      if (parentEmail) {
        await fetch("http://localhost:8080/api/notifications/sendone", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationPayload),
        });
      }

      alert(isEditMode ? "Đã cập nhật sự cố thành công!" : "Đã lưu sự cố thành công!");
      setIsEditMode(false);
      setEditId(null);
      setIncident({
        event_type: "",
        event_date: new Date().toISOString().slice(0, 10),
        description: "",
        student_id: "",
        nurse_id: localStorage.getItem("userId") || "",
        status: "Pending",
        approved_by: "",
      });
      setStudentNameInput("");
      fetchAccidentList();
    } catch (error) {
      alert(error.message);
    }
  };

  // Hàm lấy danh sách sự cố
  const fetchAccidentList = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/medical-events");
      const data = await res.json();
      setAccidentList(Array.isArray(data) ? data : data.data || []);
      setShowAccidentList(true);
    } catch (err) {
      alert("Lỗi lấy danh sách sự cố!");
      setAccidentList([]);
    }
  };

  const handleEditAccident = (accident) => {
    setIncident({
      event_type: accident.event_type || accident.eventType,
      event_date: accident.event_date || accident.eventDate,
      description: accident.description,
      student_id: accident.student_id || accident.studentId,
      nurse_id: accident.nurse_id || accident.nurseId,
      status: accident.status,
      approved_by: accident.approved_by || accident.approvedBy,
    });
    setStudentNameInput(studentList.find(s => s.id === (accident.student_id || accident.studentId))?.name || "");
    setIsEditMode(true);
    setEditId(accident.event_id || accident.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              type="text"
              placeholder="Nhập tên học sinh"
              value={studentNameInput}
              onChange={(e) => {
                setStudentNameInput(e.target.value);
                const found = studentList.find(s => s.name === e.target.value);
                handleChange("student_id", found ? found.id : "");
              }}
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
            <input type="hidden" value={incident.nurse_id} name="nurse_id" />
            <select
              value={incident.approved_by}
              onChange={(e) => handleChange("approved_by", e.target.value)}
              className="border border-gray-300 p-3 rounded-lg"
            >
              <option value="">Chọn người duyệt (tên sự kiện)</option>
              {eventNames.map((event) => (
                <option key={event.batchId} value={event.batchId}>
                  {event.title}
                </option>
              ))}
            </select>
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
          <div className="mt-8 flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              💾 Lưu sự cố
            </button>
            <button
              type="button"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
              onClick={fetchAccidentList}
            >
              📋 Xem danh sách sự cố
            </button>
          </div>
        </form>

        {showAccidentList && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Danh sách sự cố</h3>
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  {/* <th className="border px-2 py-1">ID</th> */}
                  <th className="border px-2 py-1">Loại sự cố</th>
                  <th className="border px-2 py-1">Ngày</th>
                  <th className="border px-2 py-1">Mô tả</th>
                  <th className="border px-2 py-1">Học sinh</th>
                  <th className="border px-2 py-1">Y tá</th>
                </tr>
              </thead>
              <tbody>
                {accidentList.map((accident) => {
                  const student = studentList.find(s => s.id === (accident.student_id || accident.studentId));
                  const nurse = accident.nurse_id || accident.nurseId;
                  return (
                    <tr key={accident.event_id || accident.id}>
                      {/* <td className="border px-2 py-1">{accident.event_id || accident.id}</td> */}
                      <td className="border px-2 py-1">{accident.event_type || accident.eventType}</td>
                      <td className="border px-2 py-1">{accident.event_date || accident.eventDate}</td>
                      <td className="border px-2 py-1">{accident.description}</td>
                      <td className="border px-2 py-1">{student ? student.name : (accident.student_id || accident.studentId)}</td>
                      <td className="border px-2 py-1">{nurseName}</td>
                      <td className="border px-2 py-1">
                        <button
                          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                          onClick={() => handleEditAccident(accident)}
                        >
                          ✏️ Chỉnh sửa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FallAccident;
