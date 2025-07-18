import React, { useState, useEffect } from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";

export default function ConsultationAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [newAppt, setNewAppt] = useState({
    student_id: "",
    nurse_id: "",
    appointment_date: "",
    reason: "",
  });

  const [nurseName, setNurseName] = useState("");
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [newStudentName, setNewStudentName] = useState("");

  // Lấy danh sách học sinh
  useEffect(() => {
    fetch("http://localhost:8080/api/students/all")
      .then((res) => res.json())
      .then((data) => {
        // Nếu data là mảng học sinh, dùng trực tiếp
        const list = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);
        setStudents(list);
        console.log("Danh sách học sinh đã set:", list); // Đặt log sau setStudents
      })
      .catch(console.error);
  }, []);

  // Hiển thị tên học sinh khi nhập ID ở form tạo mới
  useEffect(() => {
    if (newAppt.student_id) {
      const found = students.find((s) => s.id == newAppt.student_id); // dùng == để so sánh số và chuỗi
      setNewStudentName(found ? found.name : "");
    } else {
      setNewStudentName("");
    }
  }, [newAppt.student_id, students]);

  // Hiển thị tên học sinh khi nhập ID ở form chỉnh sửa
  useEffect(() => {
    if (selected && selected.studentId) {
      const found = students.find((s) => String(s.id) === String(selected.studentId));
      setStudentName(found ? found.name : "");
    } else {
      setStudentName("");
    }
  }, [selected?.studentId, students]);

  // Lấy danh sách lịch hẹn
  useEffect(() => {
    fetch("http://localhost:8080/api/appointments/all")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data.data) ? data.data : [];
        setAppointments(list);
        setSelected(list.length > 0 ? list[0] : null);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const nurseId = localStorage.getItem("userId") || "";
    const nurseName = localStorage.getItem("userName") || "";
    setNewAppt((prev) => ({ ...prev, nurse_id: nurseId }));
    setNurseName(nurseName);
  }, []);

  // Cập nhật appointment
  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      const updateData = {
        appointmentId: selected.appointmentId,
        studentId: selected.studentId,
        nurseId: selected.nurseId,
        appointmentDate: selected.appointmentDate,
        reason: selected.reason,
        status: selected.status,
      };
      const res = await fetch("http://localhost:8080/api/appointments/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        const errorText = await res.text();
        alert("Cập nhật lịch hẹn thất bại: " + errorText);
        return;
      }
      let updated;
      if (contentType && contentType.includes("application/json")) {
        updated = await res.json();
      } else {
        updated = selected;
      }
      setAppointments((prev) =>
        prev.map((a) => (a.appointmentId === updated.appointmentId ? updated : a))
      );
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi cập nhật lịch hẹn!");
    }
  };

  // Tạo mới appointment
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewAppt((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      let formattedDate = newAppt.appointment_date;
      if (formattedDate && formattedDate.length === 16) {
        formattedDate += ":00";
      }
      if (
        !newAppt.student_id ||
        !newAppt.nurse_id ||
        !formattedDate ||
        !newAppt.reason
      ) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }
      const apptData = {
        studentId: Number(newAppt.student_id),
        nurseId: Number(newAppt.nurse_id),
        appointmentDate: formattedDate,
        reason: newAppt.reason,
        status: "Pending",
      };
      const res = await fetch("http://localhost:8080/api/appointments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apptData),
      });
      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        const errorText = await res.text();
        alert("Tạo lịch hẹn thất bại: " + errorText);
        return;
      }
      if (contentType && contentType.includes("application/json")) {
        const created = await res.json();
        setAppointments((prev) => {
          const next = [...prev, created];
          console.log("Appointments sau khi thêm:", next);
          return next;
        });
      }
      setNewAppt({
        student_id: "",
        nurse_id: "",
        appointment_date: "",
        reason: "",
      });
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi gửi lịch hẹn!");
    }
  };

  // Xóa appointment
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để thực hiện thao tác này!");
        return;
      }
      console.log("Token gửi lên:", token);
      const res = await fetch(`http://localhost:8080/api/appointments/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        alert("Xóa lịch hẹn thất bại: " + errorText);
        return;
      }
      setAppointments((prev) => prev.filter((a) => a.appointmentId !== id));
      if (selected?.appointmentId === id) {
        setSelected(null);
        setEditMode(false);
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi xóa lịch hẹn!");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full space-y-10">
      <h2 className="text-3xl font-bold text-center text-blue-800">
        Xác nhận lịch hẹn tư vấn
      </h2>

      {/* Appointment Info */}
      {editMode && selected ? (
        <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">
            Thông tin lịch hẹn
          </h3>
          <div className="space-y-4">
            {/* ID học sinh */}
            <div className="flex items-center">
              <span className="w-36 font-medium">ID học sinh:</span>
              <input
                type="number"
                value={selected.studentId}
                onChange={e =>
                  setSelected(prev => ({ ...prev, studentId: e.target.value }))
                }
                className="flex-1 border rounded-lg px-3 py-2"
              />
            </div>
            {/* Tên học sinh */}
            <div className="flex items-center">
              <span className="w-36 font-medium">Tên học sinh:</span>
              <span className="flex-1 text-gray-700">{studentName}</span>
            </div>
            {/* ID y tá */}
            <div className="flex items-center">
              <span className="w-36 font-medium">ID y tá:</span>
              <input
                type="number"
                value={selected.nurseId}
                onChange={e =>
                  setSelected(prev => ({ ...prev, nurseId: e.target.value }))
                }
                className="flex-1 border rounded-lg px-3 py-2"
              />
            </div>
            {/* Ngày giờ hẹn */}
            <div className="flex items-center">
              <span className="w-36 font-medium">Ngày giờ hẹn:</span>
              <input
                type="datetime-local"
                value={selected.appointmentDate?.slice(0, 16)}
                onChange={e =>
                  setSelected(prev => ({
                    ...prev,
                    appointmentDate: e.target.value.length === 16
                      ? e.target.value + ":00"
                      : e.target.value
                  }))
                }
                className="flex-1 border rounded-lg px-3 py-2"
              />
            </div>
            {/* Lý do */}
            <div className="flex items-center">
              <span className="w-36 font-medium">Lý do:</span>
              <textarea
                value={selected.reason}
                onChange={e =>
                  setSelected(prev => ({ ...prev, reason: e.target.value }))
                }
                className="flex-1 border rounded-lg px-3 py-2"
              />
            </div>
            {/* Trạng thái */}
            <div className="flex items-center">
              <span className="w-36 font-medium">Trạng thái:</span>
              <input
                type="text"
                value={selected.status}
                onChange={e =>
                  setSelected(prev => ({ ...prev, status: e.target.value }))
                }
                className="flex-1 border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Đóng
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Create New */}
          <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Tạo lịch hẹn tư vấn mới
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block mb-1 font-medium">ID học sinh</label>
                <input
                  type="text" // đổi từ "number" sang "text"
                  name="student_id"
                  value={newAppt.student_id}
                  onChange={handleNewChange}
                  className="w-full border rounded-lg px-3 py-2"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Tên học sinh</label>
                <input
                  type="text"
                  value={newStudentName}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Y tá</label>
                <input
                  type="text"
                  value={nurseName}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Ngày giờ hẹn</label>
                <input
                  type="datetime-local"
                  name="appointment_date"
                  value={newAppt.appointment_date}
                  onChange={handleNewChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Lý do</label>
                <textarea
                  name="reason"
                  rows={2}
                  value={newAppt.reason}
                  onChange={handleNewChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
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
              {appointments.map((a) => {
                const student = students.find(s => s.id == a.studentId);
                const studentDisplayName = student ? student.name : a.studentId;
                // Nếu bạn có danh sách y tá, hãy tìm tên y tá tương tự như học sinh
                // Nếu chỉ có nurseName hiện tại, dùng luôn biến nurseName
                const nurseDisplayName = nurseName && a.nurseId == newAppt.nurse_id ? nurseName : a.nurseId;
                return (
                  <li
                    key={a.appointmentId}
                    className="flex justify-between items-center border-b pb-4 last:border-none"
                  >
                    <div>
                      <p className="text-sm text-gray-500">
                        <b>ID:</b> {a.appointmentId} | <b>Học sinh:</b> {studentDisplayName} |{" "}
                        <b>Y tá:</b> {nurseDisplayName}
                      </p>
                      <p className="text-sm text-gray-500">
                        <b>Ngày giờ:</b> {a.appointmentDate}
                      </p>
                      <p className="font-semibold">
                        <b>Lý do:</b> {a.reason}
                      </p>
                      <p className="text-sm text-gray-500">
                        <b>Trạng thái:</b> {a.status}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => { setSelected(a); setEditMode(true); }}
                        className="flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                      >
                        <FaRegEdit className="mr-1" /> Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleDelete(a.appointmentId)}
                        className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        <FaTrash className="mr-1" /> Xóa
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
