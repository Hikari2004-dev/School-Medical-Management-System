import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./vaccination.css";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";

const Vaccination = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [children, setChildren] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentInfo, setStudentInfo] = useState({});
  const [vaccines, setVaccines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    vaccineName: "",
    doseNumber: "",
    declaredDate: "",
    notes: "",
    status: "",
    vaccineLot: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:8080/api/students/my-children", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          setChildren(res.data);
          if (res.data.length > 0) {
            setSelectedStudentId(res.data[0].id);
          }
        }
      })
      .catch(err => console.error("❌ Lỗi lấy học sinh:", err));
  }, [token]);

  useEffect(() => {
    if (!selectedStudentId || children.length === 0) return;
    const info = children.find(c => c.id === Number(selectedStudentId));
    if (info) setStudentInfo(info);
  }, [selectedStudentId, children]);

  useEffect(() => {
    if (!token || !selectedStudentId) return;
    fetch("http://localhost:8080/api/vaccination-history/my-children", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(v => v.studentId === Number(selectedStudentId));
        setVaccines(filtered);
      })
      .catch(err => console.error("❌ Lỗi fetch vaccine:", err));
  }, [token, selectedStudentId]);

  const handleDelete = id => {
    if (!token) return;
    if (window.confirm("Bạn có chắc chắn muốn xoá bản ghi này?")) {
      fetch(`http://localhost:8080/api/vaccination-history/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          if (!res.ok) throw new Error("Xoá thất bại");
          setVaccines(prev => prev.filter(v => v.id !== id));
        })
        .catch(err => alert("❌ Xoá thất bại: " + err.message));
    }
  };

  const handleAdd = () => {
    setEditId(null);
    setFormData({
      vaccineName: "",
      doseNumber: "",
      declaredDate: "",
      notes: "",
      status: "",
      vaccineLot: "",
    });
    setShowForm(true);
  };

  const handleEdit = vaccine => {
    setEditId(vaccine.id);
    setFormData({ ...vaccine });
    setShowForm(true);
  };

  const handleSubmit = () => {
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:8080/api/vaccination-history/${editId}`
      : `http://localhost:8080/api/vaccination-history`;

    const payload = {
      ...formData,
      studentId: Number(selectedStudentId),
    };

    fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Lỗi khi lưu");
        }
        return res.json().catch(() => null); // in case no response body
      })
      .then(() => {
        setShowForm(false);
        return fetch("http://localhost:8080/api/vaccination-history/my-children", {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(v => v.studentId === Number(selectedStudentId));
        setVaccines(filtered);
      })
      .catch(err => alert("❌ Không thể lưu: " + err.message));
  };

  const tabRoutes = {
    "/patient-search": "Thông tin cá nhân",
    "/medications": "Đơn thuốc",
    "/vaccinations": "Lịch sử tiêm chủng",
    "/health-record": "Hồ sơ sức khỏe",
  };

  const activeTab = tabRoutes[location.pathname] || "Lịch sử tiêm chủng";
  const handleTabClick = label => {
    const path = Object.keys(tabRoutes).find(k => tabRoutes[k] === label);
    if (path && location.pathname !== path) navigate(path);
  };

  return (
    <div className="student-profile-page">
      <aside className="sidebar">
        <div className="brand-box">
          <img src={LogoImg} alt="Logo" className="brand-icon" />
          <div className="brand-text">
            <h1>SchoMed</h1>
            <p>School Medical</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {Object.entries(tabRoutes).map(([path, label]) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={location.pathname === path ? "active" : ""}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="profile-main">
        <button className="home-button" onClick={() => navigate("/")}>
          ⬅ Quay về trang chính
        </button>

        <div className="profile-card">
          {/* Header */}
          <div className="profile-overview">
            <img src={AvatarImg} alt="avatar" className="avatar" />
            <div className="info-text">
              <h2>Lịch sử tiêm chủng học sinh</h2>
              <label>Chọn học sinh:</label>
              <select
                value={selectedStudentId || ""}
                onChange={e => setSelectedStudentId(e.target.value)}
              >
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.grade})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div className="profile-tabs">
            {Object.values(tabRoutes).map(label => (
              <span
                key={label}
                className={`tab ${activeTab === label ? "active" : ""}`}
                onClick={() => handleTabClick(label)}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Vaccine table */}
          <div className="profile-detail">
            <div style={{ textAlign: "right", marginBottom: "12px" }}>
              <button className="add-button" onClick={handleAdd}>➕ Thêm mới</button>
            </div>

            {vaccines.length > 0 ? (
              <table className="medications-table">
                <thead>
                  <tr>
                    <th>Tên vaccine</th>
                    <th>Mũi tiêm</th>
                    <th>Ngày khai báo</th>
                    <th>Ghi chú</th>
                    <th>Trạng thái</th>
                    <th>Lô vaccine</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccines.map(v => (
                    <tr key={v.id}>
                      <td>{v.vaccineName}</td>
                      <td>{v.doseNumber}</td>
                      <td>{v.declaredDate}</td>
                      <td>{v.notes}</td>
                      <td>{v.status}</td>
                      <td>{v.vaccineLot}</td>
                      <td>
                        <button onClick={() => handleEdit(v)}>✏️ Sửa</button>
                        <button className="delete-button" onClick={() => handleDelete(v.id)}>🗑 Xoá</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ padding: "12px", color: "gray" }}>
                Chưa có dữ liệu tiêm chủng.
              </p>
            )}
          </div>

          {/* Popup form */}
          {showForm && (
            <div className="popup-form">
              <h3>{editId ? "Sửa vaccine" : "Thêm vaccine"}</h3>
              <input type="text" placeholder="Tên vaccine" value={formData.vaccineName} onChange={e => setFormData({ ...formData, vaccineName: e.target.value })} />
              <input type="text" placeholder="Mũi tiêm" value={formData.doseNumber} onChange={e => setFormData({ ...formData, doseNumber: e.target.value })} />
              <input type="date" value={formData.declaredDate} onChange={e => setFormData({ ...formData, declaredDate: e.target.value })} />
              <input type="text" placeholder="Ghi chú" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
              <input type="text" placeholder="Trạng thái" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} />
              <input type="text" placeholder="Lô vaccine" value={formData.vaccineLot} onChange={e => setFormData({ ...formData, vaccineLot: e.target.value })} />
              <div style={{ marginTop: "10px" }}>
                <button onClick={handleSubmit}>💾 Lưu</button>
                <button onClick={() => setShowForm(false)} style={{ marginLeft: "8px" }}>❌ Huỷ</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Vaccination;
