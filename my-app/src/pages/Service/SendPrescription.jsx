import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { X } from "lucide-react";
import "./SendPrescription.css";

export default function SendPrescription() {
  const navigate = useNavigate();

  // 1) Lấy token JWT (hỗ trợ cả key "token" hoặc "jwt")
  const getToken = () =>
    localStorage.getItem("token") || localStorage.getItem("jwt");

  // 2) Lấy thông tin phụ huynh từ localStorage làm initial
  const [user, setUser] = useState({
    name: localStorage.getItem("userName") || "",
    id: parseInt(localStorage.getItem("userId") || "0", 10),
  });
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetch("http://localhost:8080/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((me) => {
        setUser({ name: me.name, id: me.id });
        localStorage.setItem("userName", me.name);
        localStorage.setItem("userId", me.id.toString());
      })
      .catch(console.error);
  }, []);

  // 3) State cho form, danh sách con, items, và message status
  const [form, setForm] = useState({
    selectedIndex: "",
    drugName: "",
    dose: "",
    note: "",
    startDate: today(),
    endDate: today(),
  });
  const [students, setStudents] = useState([]);
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  function today() {
    return new Date().toISOString().split("T")[0];
  }

  // Fetch children nếu đã login
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetch("http://localhost:8080/my-children", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setStudents(
          data.map((c) => ({
            studentId: c.studentId ?? c.id,
            studentName: c.studentName ?? c.name,
            parentName: c.parentName,
          }))
        );
      })
      .catch(console.error);
  }, []);

  // Xử lý form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => {
      const updated = { ...f, [name]: value };
      if (name === "startDate") {
        const minStart = today();
        if (value < minStart) updated.startDate = minStart;
        if (updated.endDate < updated.startDate)
          updated.endDate = updated.startDate;
      }
      if (name === "endDate" && value < updated.startDate) {
        updated.endDate = updated.startDate;
      }
      return updated;
    });
  };

  // Thêm hoặc cập nhật thuốc
  const handleAddOrUpdate = () => {
    if (
      !form.selectedIndex ||
      !form.drugName.trim() ||
      !form.dose.trim() ||
      !form.note.trim()
    )
      return;
    if (isNaN(Number(form.dose))) return;
    const note = form.note.trim();
    if (!/^[0-9]+\s*lần\/(ngày|tuần|tháng)$/.test(note)) return;

    const stu = students[Number(form.selectedIndex)];
    const entry = {
      studentId: stu.studentId,
      studentName: stu.studentName,
      medicationName: form.drugName.trim(),
      dosage: form.dose.trim() + "mg",
      frequency: note,
      startDate: form.startDate,
      endDate: form.endDate,
      parentName: stu.parentName,
      status: "PENDING",
      parentUserId: user.id,
    };

    if (editingIndex != null) {
      setItems((list) =>
        list.map((it, i) => (i === editingIndex ? entry : it))
      );
    } else {
      setItems((list) => [...list, entry]);
    }
    setForm((f) => ({ ...f, drugName: "", dose: "", note: "" }));
    setEditingIndex(null);
    setStatusMessage(""); // reset message khi chỉnh sửa hoặc thêm mới
  };

  // Bắt đầu chỉnh sửa item
  const handleEditItem = (idx) => {
    const it = items[idx];
    const foundIdx = students.findIndex((s) => s.studentId === it.studentId);
    setForm({
      selectedIndex: String(foundIdx),
      drugName: it.medicationName,
      dose: it.dosage.replace(/mg$/, ""),
      note: it.frequency,
      startDate: it.startDate,
      endDate: it.endDate,
    });
    setEditingIndex(idx);
    setStatusMessage("");
  };

  // Xóa item
  const removeItem = (idx) => {
    setItems((list) => list.filter((_, i) => i !== idx));
    if (editingIndex === idx) setEditingIndex(null);
    setStatusMessage("");
  };

  // Gửi thuốc
  const handleConfirmSend = async () => {
    if (!items.length) return;
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(
        "http://localhost:8080/api/medication-submissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(items),
        }
      );
      const text = await res.text();
      if (res.ok) {
        setItems([]);
        setStatusMessage(text || "Gửi đơn thuốc thành công!");
      } else {
        setStatusMessage(`Error ${res.status}: ${text}`);
      }
    } catch (err) {
      console.error("Lỗi gửi thuốc:", err);
      setStatusMessage("❌ Không gửi được đơn, vui lòng thử lại.");
    }
  };

  return (
    <>
      <Header />
      <div className="breadcrumb-container">
        <nav className="breadcrumb">
          <Link to="/">Trang chủ</Link> › <Link to="/services">Dịch vụ</Link> › Gửi đơn thuốc
        </nav>
      </div>
      <div className="send-prescription-page">
        <div className="send-prescription-content">
          <div className="form-column">
            {/* --- Form inputs --- */}
            <div className="field">
              <label>Tên học sinh</label>
              <select
                name="selectedIndex"
                value={form.selectedIndex}
                onChange={handleChange}
              >
                <option value="">-- Chọn học sinh --</option>
                {students.map((s, i) => (
                  <option key={s.studentId} value={String(i)}>
                    {s.studentName}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Người gửi</label>
              <input
                type="text"
                readOnly
                value={
                  students.length > 0
                    ? form.selectedIndex === ""
                      ? students[0].parentName
                      : students[Number(form.selectedIndex)].parentName
                    : user.name
                }
              />
            </div>
            <div className="two-fields">
              <div className="field">
                <label>Tên thuốc</label>
                <input
                  name="drugName"
                  value={form.drugName}
                  onChange={handleChange}
                  placeholder="Ví dụ: Paracetamol"
                />
              </div>
              <div className="field">
                <label>Liều lượng (mg)</label>
                <input
                  name="dose"
                  value={form.dose}
                  onChange={handleChange}
                  placeholder="Ví dụ: 500"
                />
              </div>
            </div>
            <div className="field">
              <label>Số lần uống</label>
              <input
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Ví dụ: 2 lần/ngày hoặc 3 lần/tuần hoặc 1 lần/tháng"
                required
                pattern="^[0-9]+\s*lần\/(ngày|tuần|tháng)$"
              />
            </div>
            <div className="two-fields">
              <div className="field">
                <label>Ngày bắt đầu</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  min={today()}
                />
              </div>
              <div className="field">
                <label>Ngày kết thúc</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  min={form.startDate || today()}
                />
              </div>
            </div>
            <button className="btn-add" onClick={handleAddOrUpdate}>
              {editingIndex != null ? "Cập nhật thuốc" : "Thêm thuốc"}
            </button>
          </div>

          <div className="items-column">
            <h3>Danh sách thuốc được gửi</h3>
            {items.map((it, idx) => (
              <div
                key={idx}
                className="prescription-item"
                onClick={() => handleEditItem(idx)}
              >
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(idx);
                  }}
                >
                  <X size={16} />
                </button>
                <h4>{it.medicationName}</h4>
                <p className="student-name">Học sinh: {it.studentName}</p>
                <p className="dose">Liều lượng (mg): {it.dosage}</p>
                <p className="note">Số lần uống: {it.frequency}</p>
                <p className="sender">Người gửi: {it.parentName}</p>
                <p className="meta">{it.startDate} → {it.endDate}</p>
              </div>
            ))}

            {items.length > 0 && (
              <button className="btn-confirm" onClick={handleConfirmSend}>
                Xác nhận gửi thuốc
              </button>
            )}

            {/* Thông báo kết quả */}
            {statusMessage && (
              <div
                className={`status-alert ${
                  statusMessage.startsWith("Error") || statusMessage.startsWith("❌")
                    ? "error"
                    : "success"
                }`}
              >
                {statusMessage}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
