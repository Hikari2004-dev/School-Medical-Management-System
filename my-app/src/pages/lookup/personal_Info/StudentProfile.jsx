import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentProfile.css";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";

const studentProfiles = [
  {
    name: "Nguyễn Đoàn Duy Khánh",
    class: "12A1",
    teacher: "Lâm Phương Thúy",
    height: "170cm",
    weight: "60 kg",
    gender: "Nam",
    mother: "Trần Thị Hoa",
    motherPhone: "0909 123 456",
    father: "Nguyễn Văn B",
    fatherPhone: "0908 654 321",
    email: "duy.khanh@example.com",
    address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
  },
  {
    name: "Nguyễn Đoàn Duy Minh",
    class: "10A2",
    teacher: "Nguyễn Văn C",
    height: "165cm",
    weight: "55 kg",
    gender: "Nam",
    mother: "Trần Thị Hoa",
    motherPhone: "0909 123 456",
    father: "Nguyễn Văn B",
    fatherPhone: "0908 654 321",
    email: "duy.minh@example.com",
    address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
  },
];

const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabRoutes = {
    "/patient-search": "Thông tin cá nhân",
    "/medications": "Đơn thuốc",
    "/vaccinations": "Lịch sử tiêm chủng",
    "/health-record": "Hồ sơ sức khỏe",
  };

  const activeTab = tabRoutes[location.pathname] || "Thông tin cá nhân";
  const [isEditing, setIsEditing] = useState(false);

  // Nếu muốn chỉnh sửa từng học sinh, bạn cần quản lý state riêng cho từng profile
  // Ở đây chỉ demo hiển thị nhiều học sinh cùng cha mẹ
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
        </nav>
      </aside>

      <main className="profile-main">
        <button className="home-button" onClick={() => navigate("/")}>
          ⬅ Quay về trang chính
        </button>

        {studentProfiles.map((profile, idx) => (
          <div className="profile-card" key={idx}>
            <div className="profile-overview">
              <img src={AvatarImg} alt="avatar" className="avatar" />
              <div className="info-text">
                <h2>{profile.name}</h2>
                <p>Lớp {profile.class} | GVCN: {profile.teacher}</p>
                <p>Chiều cao: {profile.height} | Cân nặng: {profile.weight}</p>
                <p>Giới tính: {profile.gender}</p>
              </div>
            </div>

            <div className="profile-tabs">
              {Object.values(tabRoutes).map((label) => (
                <span
                  key={label}
                  className={`tab ${activeTab === label ? "active" : ""}`}
                // onClick={() => handleTabClick(label)} // Nếu muốn chuyển tab cho từng học sinh, cần sửa lại logic
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="profile-detail">
              {activeTab === "Thông tin cá nhân" ? (
                <>
                  <div className="info-columns">
                    <div>
                      <p><strong>Mẹ:</strong> {profile.mother}</p>
                      <p><strong>Điện Thoại:</strong> {profile.motherPhone}</p>
                      <p><strong>Ba:</strong> {profile.father}</p>
                      <p><strong>Điện Thoại:</strong> {profile.fatherPhone}</p>
                    </div>
                    <div>
                      <p><strong>Email:</strong> {profile.email}</p>
                      <p><strong>Địa chỉ:</strong> {profile.address}</p>
                    </div>
                  </div>
                  {/* Nếu muốn chỉnh sửa, cần thêm logic riêng cho từng học sinh */}
                </>
              ) : (
                <p className="tab-placeholder">Hiện chưa có dữ liệu cho mục "{activeTab}".</p>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default StudentProfile;