import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";
import "./Medications.css";

const Medications = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabRoutes = {
    "/patient-search": "Thông tin cá nhân",
    "/medications": "Đơn thuốc",
    "/vaccinations": "Lịch sử tiêm chủng",
    "/health-record": "Hồ sơ sức khỏe",
  };
  const activeTab = tabRoutes[location.pathname] || "Đơn thuốc";

  const [children, setChildren] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    studentName: "",
    grade: "",
  });
  const [medications, setMedications] = useState([]);

  const token = localStorage.getItem("token");

  // 1. Lấy danh sách học sinh (my-children)
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/students/my-children", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setChildren(res.data);
          if (res.data.length > 0) {
            setSelectedStudentId(res.data[0].id);
          }
        }
      })
      .catch((err) => console.error("❌ Lỗi lấy danh sách học sinh:", err));
  }, [token]);

  // 2. Khi chọn học sinh → lấy thông tin
  useEffect(() => {
    if (!selectedStudentId || !token) return;

    fetch(`http://localhost:8080/api/students/${selectedStudentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudentInfo({
          studentName: data.studentName,
          grade: data.grade,
        });
      })
      .catch((err) => console.error("❌ Lỗi fetch thông tin học sinh:", err));
  }, [selectedStudentId, token]);

  // 3. Lấy đơn thuốc của tất cả học sinh → lọc theo studentId
  useEffect(() => {
    if (!token || !selectedStudentId) return;

    fetch("http://localhost:8080/api/medication-submissions/my-submissions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (med) => med.studentId === Number(selectedStudentId)
        );
        setMedications(filtered);
      })
      .catch((err) => console.error("❌ Lỗi fetch đơn thuốc:", err));
  }, [selectedStudentId, token]);

  const handleTabClick = (label) => {
    const path = Object.keys(tabRoutes).find((k) => tabRoutes[k] === label);
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
          <div className="profile-overview">
            <img src={AvatarImg} alt="avatar" className="avatar" />
            <div className="info-text">
              <h2>Đơn thuốc học sinh</h2>
              <label>Chọn học sinh:</label>
              <select
                value={selectedStudentId || ""}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.grade})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="profile-tabs">
            {Object.values(tabRoutes).map((label) => (
              <span
                key={label}
                className={`tab ${activeTab === label ? "active" : ""}`}
                onClick={() => handleTabClick(label)}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="profile-detail">
            {medications.length > 0 ? (
              <table className="medications-table">
                <thead>
                  <tr>
                    <th>Tên thuốc</th>
                    <th>Liều dùng</th>
                    <th>Tần suất</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((med) => (
                    <tr key={med.medicationId}>
                      <td>{med.medicationName}</td>
                      <td>{med.dosage}</td>
                      <td>{med.frequency}</td>
                      <td>{med.startDate}</td>
                      <td>{med.endDate}</td>
                      <td>{med.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="tab-placeholder">Chưa có đơn thuốc nào.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Medications;
