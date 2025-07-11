import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./vaccination.css";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";

const Vaccination = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabRoutes = {
    "/patient-search": "Thông tin cá nhân",
    "/medications": "Đơn thuốc",
    "/vaccinations": "Lịch sử tiêm chủng",
    "/health-record": "Hồ sơ sức khỏe",
  };

  const activeTab = tabRoutes[location.pathname] || "Lịch sử tiêm chủng";

  const handleTabClick = (label) => {
    const path = Object.keys(tabRoutes).find((key) => tabRoutes[key] === label);
    if (path && location.pathname !== path)
      navigate(path, { state: { from: location.pathname } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [vaccines, setVaccines] = useState([
    {
      name: "Covid-19",
      dose: "Mũi 1",
      date: "12/05/2025",
      note: "Không sốt",
      status: "Đã tiêm",
    },
    {
      name: "Viêm gan B",
      dose: "Mũi 2",
      date: "03/04/2025",
      note: "Tiêm lại sau 6 tháng",
      status: "Chưa tiêm",
    },
  ]);

  const handleAdd = () => {
    const name = prompt("Tên vaccine:");
    const dose = prompt("Mũi tiêm:");
    const date = prompt("Ngày tiêm:");
    const note = prompt("Ghi chú:");
    const status = prompt("Trạng thái (Đã tiêm / Chưa tiêm):");

    if (name && dose && date) {
      const newEntry = { name, dose, date, note, status };
      setVaccines([...vaccines, newEntry]);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá vaccine này không?")) {
      const updated = vaccines.filter((_, i) => i !== index);
      setVaccines(updated);
    }
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
              <p>Lớp 12A1 | GVCN: Lâm Phương Thúy</p>
              <p>Chiều cao: 170cm | Cân nặng: 60 kg</p>
              <p>Giới tính: Nam/Nữ</p>
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
            <div className="add-button-container" style={{ textAlign: "right", margin: "12px 0" }}>
              <button className="add-button" onClick={handleAdd}>+ Thêm vaccine</button>
            </div>

            <table className="medications-table">
              <thead>
                <tr>
                  <th>Tên vaccine</th>
                  <th>Mũi tiêm</th>
                  <th>Ngày tiêm</th>
                  <th>Ghi chú</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map((v, index) => (
                  <tr key={index}>
                    <td>{v.name}</td>
                    <td>{v.dose}</td>
                    <td>{v.date}</td>
                    <td>{v.note}</td>
                    <td>{v.status}</td>
                    <td>
                      <button className="delete-button" onClick={() => handleDelete(index)}>Xoá</button>
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

export default Vaccination;
