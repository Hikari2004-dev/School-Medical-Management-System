import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./vaccination.css";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";

const Vaccination = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [vaccines, setVaccines] = useState([]);

  // Fetch vaccine data on mount
  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8080/api/vaccination-history/my-children", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tải danh sách vaccine");
        return res.json();
      })
      .then((data) => setVaccines(data))
      .catch((err) => console.error("❌ Lỗi fetch:", err));
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (window.confirm("Bạn có chắc chắn muốn xoá bản ghi này?")) {
      fetch(`http://localhost:8080/api/vaccination-history/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Xoá thất bại");
          setVaccines((prev) => prev.filter((v) => v.id !== id));
        })
        .catch((err) => alert("❌ Xoá thất bại: " + err.message));
    }
  };

  const tabRoutes = {
    "/patient-search": "Thông tin cá nhân",
    "/medications": "Đơn thuốc",
    "/vaccinations": "Lịch sử tiêm chủng",
    "/health-record": "Hồ sơ sức khỏe",
  };

  const activeTab = tabRoutes[location.pathname] || "Lịch sử tiêm chủng";

  const handleTabClick = (label) => {
    const path = Object.keys(tabRoutes).find((key) => tabRoutes[key] === label);
    if (path && location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <div className="student-profile-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand-box">
          <img src={LogoImg} alt="Logo" className="brand-icon" />
          <div className="brand-text">
            <h1>SchoMed</h1>
            <p>School Medical</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            onClick={() => navigate("/patient-search")}
            className={location.pathname === "/patient-search" ? "active" : ""}
          >
            🏠 Trang chủ
          </button>
          <button
            onClick={() => navigate("/medications")}
            className={location.pathname === "/medications" ? "active" : ""}
          >
            💊 Đơn thuốc
          </button>
          <button
            onClick={() => navigate("/vaccinations")}
            className={location.pathname === "/vaccinations" ? "active" : ""}
          >
            💉 Sổ vaccine
          </button>
          <button
            onClick={() => navigate("/health-record")}
            className={location.pathname === "/health-record" ? "active" : ""}
          >
            📁 Hồ sơ sức khỏe
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="profile-main">
        <button className="home-button" onClick={() => navigate("/")}>
          ⬅ Quay về trang chính
        </button>

        <div className="profile-card">
          {/* Header */}
          <div className="profile-overview">
            <img src={AvatarImg} alt="avatar" className="avatar" />
            <div className="info-text">
              <h2>Nguyễn Đoàn Duy Khánh</h2>
              <p>Lớp 12A1 | GVCN: Lâm Phương Thúy</p>
              <p>Chiều cao: 170cm | Cân nặng: 60 kg</p>
              <p>Giới tính: Nam/Nữ</p>
            </div>
          </div>

          {/* Tabs */}
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

          {/* Vaccine Table */}
          <div className="profile-detail">
            <table className="medications-table">
              <thead>
                <tr>
                  <th>Học sinh</th>
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
                {vaccines.map((v) => (
                  <tr key={v.id}>
                    <td>{v.studentName}</td>
                    <td>{v.vaccineName}</td>
                    <td>{v.doseNumber}</td>
                    <td>{v.declaredDate}</td>
                    <td>{v.notes}</td>
                    <td>{v.status}</td>
                    <td>{v.vaccineLot}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(v.id)}
                      >
                        🗑 Xoá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {vaccines.length === 0 && (
              <p style={{ padding: "12px", color: "gray" }}>
                Không có dữ liệu tiêm chủng.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Vaccination;
