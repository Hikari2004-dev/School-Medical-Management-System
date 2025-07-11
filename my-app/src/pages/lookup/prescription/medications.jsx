import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Medications.css";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";

const Medications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("🧭 location.state =", location.state); // 👈 Dòng debug này

  const previousPage = location.state?.from || "/patient-search";


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const tabRoutes = {
    "/patient-search": "Thông tin cá nhân",
    "/medications": "Đơn thuốc",
    "/vaccinations": "Lịch sử tiêm chủng",
    "/health-record": "Hồ sơ sức khỏe",
  };

  const activeTab = tabRoutes[location.pathname] || "Đơn thuốc";

  const handleTabClick = (label) => {
    const path = Object.keys(tabRoutes).find((key) => tabRoutes[key] === label);
    if (path && location.pathname !== path) navigate(path, { state: { from: location.pathname } });
  };

  const [medications, setMedications] = useState([
    {
      name: "Paracetamol",
      dose: "500 mg",
      timesPerDay: 3,
      startDate: "10/05/2025",
      note: "Hạ sốt"
    }
  ]);

  const handleAdd = () => {
    const newMed = {
      name: prompt("Tên thuốc:"),
      dose: prompt("Liều dùng:"),
      timesPerDay: prompt("Số lần/ngày:"),
      startDate: prompt("Ngày bắt đầu:"),
      note: prompt("Ghi chú:")
    };
    if (newMed.name) {
      setMedications([...medications, newMed]);
    }
  };

  const handleDelete = (index) => {
    const updated = medications.filter((_, i) => i !== index);
    setMedications(updated);
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
          <button onClick={() => navigate("/patient-search")} className={location.pathname === "/patient-search" ? "active" : ""}>🏠 Trang chủ</button>
          <button onClick={() => navigate("/medications")} className={location.pathname === "/medications" ? "active" : ""}>💊 Đơn thuốc</button>
          <button onClick={() => navigate("/vaccinations")} className={location.pathname === "/vaccinations" ? "active" : ""}>💉 Sổ vaccine</button>
          <button onClick={() => navigate("/health-record")} className={location.pathname === "/health-record" ? "active" : ""}>📁 Hồ sơ sức khỏe</button>
          <button onClick={() => navigate("/reports")} className={location.pathname === "/reports" ? "active" : ""}>📊 Báo cáo</button>
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
              <h2>Nguyễn Đoàn Duy Khánh</h2>
              <p>Lớp 12A1</p>
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
            <div className="add-button-container">
              <button className="add-button" onClick={handleAdd}>+ Thêm mới</button>
            </div>
            <table className="medications-table">
              <thead>
                <tr>
                  <th>Tên thuốc</th>
                  <th>Liều dùng</th>
                  <th>Số lần/Ngày</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ghi chú</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {medications.map((med, index) => (
                  <tr key={index}>
                    <td>{med.name}</td>
                    <td>{med.dose}</td>
                    <td>{med.timesPerDay}</td>
                    <td>{med.startDate}</td>
                    <td>{med.note}</td>
                    <td>
                      <button className="delete-button" onClick={() => handleDelete(index)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Medications;
