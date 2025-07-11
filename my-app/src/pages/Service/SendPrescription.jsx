// src/pages/Service/SendPrescription.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ArrowLeft, X } from "lucide-react";
import "./SendPrescription.css";

export default function SendPrescription() {
  // Hardcode thông tin người gửi
  const user = { name: 'Phạm Minh Khuê' };

  // State form và danh sách đơn thuốc
  const [form, setForm] = useState({
    patientName: '',
    drugName: '',
    dose: '',
    note: '',
    sendTime: '',
  });
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Tạo timestamp hiện tại
  const resetSendTime = () => {
    const now = new Date();
    return `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes().toString().padStart(2,'0')}`;
  };

  // Khởi tạo sendTime khi mount
  useEffect(() => {
    setForm(f => ({ ...f, sendTime: resetSendTime() }));
  }, []);

  // Xử lý input change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Thêm hoặc cập nhật thuốc
  const handleAddOrUpdate = () => {
    if (!form.drugName.trim() || !form.dose.trim() || !form.note.trim()) {
      alert("Vui lòng điền đủ Tên thuốc, Liều lượng và Ghi chú.");
      return;
    }
    if (isNaN(Number(form.dose.trim()))) {
      alert("Liều lượng phải là số (ví dụ: 10, 10.5).");
      return;
    }
    const entry = {
      name: form.drugName.trim(),
      dose: form.dose.trim(),
      note: form.note.trim(),
      sendTime: form.sendTime,
      sender: user.name
    };
    if (editingIndex !== null) {
      setItems(list => list.map((it,i) => i === editingIndex ? entry : it));
    } else {
      setItems(list => [...list, entry]);
    }
    // Chỉ reset phần thuốc, giữ tên bệnh nhân và thời gian
    setForm(f => ({ ...f, drugName:'', dose:'', note:'' }));
    setEditingIndex(null);
  };

  // Chỉnh sửa một mục
  const handleEditItem = idx => {
    const it = items[idx];
    setForm(f => ({
      ...f,
      drugName: it.name,
      dose: it.dose,
      note: it.note
    }));
    setEditingIndex(idx);
  };

  // Xóa một mục
  const removeItem = idx => {
    setItems(list => list.filter((_,i) => i !== idx));
    if (editingIndex === idx) {
      setForm(f => ({ ...f, drugName:'', dose:'', note:'' }));
      setEditingIndex(null);
    }
  };

  // Xác nhận gửi đơn
  const handleConfirmSend = () => {
    if (!form.patientName.trim()) {
      alert("Vui lòng nhập tên bệnh nhân trước khi gửi.");
      return;
    }
    const header =
      `Bạn sắp gửi đơn thuốc cho: ${form.patientName.trim()}\n` +
      `Thời gian: ${form.sendTime}\n` +
      `Người gửi: ${user.name}\n\nChi tiết:\n`;
    const list = items.map((it,i) =>
      `${i+1}. ${it.name} — ${it.dose} — ${it.note}`
    ).join("\n");
    if (!window.confirm(header + list + "\n\nXác nhận gửi?")) return;

    // TODO: gọi API gửi đơn...
    console.log("Gửi đơn:", { patientName: form.patientName, items });

    // Reset toàn bộ form và danh sách
    setForm({
      patientName: '',
      drugName: '',
      dose: '',
      note: '',
      sendTime: resetSendTime(),
    });
    setItems([]);
    setEditingIndex(null);
  };

  return (
    <>
      <Header />

      {/* Breadcrumb ngay dưới Header */}
      <div className="breadcrumb-container">
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Trang chủ</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to="/services" className="breadcrumb-link">Dịch vụ</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Gửi đơn thuốc</span>
        </nav>
      </div>

      <div className="send-prescription-page">
        <div className="send-prescription-content">
          {/* Form bên trái */}
          <div className="form-column">
            <div className="field">
              <label>Tên bệnh nhân</label>
              <input
                name="patientName"
                value={form.patientName}
                onChange={handleChange}
                placeholder="Ví dụ: Nguyễn Văn A"
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
                  placeholder="Ví dụ: 10"
                />
              </div>
            </div>

            <div className="field">
              <label>Ghi chú</label>
              <input
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Ví dụ: Uống sau khi ăn"
              />
            </div>

            <div className="field">
              <label>Thời gian gửi</label>
              <input type="text" value={form.sendTime} readOnly />
            </div>

            <div className="field">
              <label>Người gửi</label>
              <input type="text" value={user.name} readOnly />
            </div>

            <button
              type="button"
              className="btn-add"
              onClick={handleAddOrUpdate}
            >
              {editingIndex !== null ? 'Cập nhật thuốc' : 'Thêm thuốc'}
            </button>
          </div>

          {/* Danh sách thuốc bên phải */}
          <div className="items-column">
            <h3 className="items-heading">Danh sách thuốc được gửi</h3>
            {items.map((it, idx) => (
              <div
                key={idx}
                className="prescription-item"
                onClick={() => handleEditItem(idx)}
              >
                <button
                  className="remove-btn"
                  onClick={e => { e.stopPropagation(); removeItem(idx); }}
                >
                  <X size={16} />
                </button>
                <h4>{it.name}</h4>
                <p className="dose">{it.dose} mg</p>
                <p className="note">{it.note}</p>
                <p className="meta">{it.sendTime} • {it.sender}</p>
              </div>
            ))}

            {items.length > 0 && (
              <button
                className="btn-confirm"
                onClick={handleConfirmSend}
              >
                Xác nhận gửi thuốc
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
