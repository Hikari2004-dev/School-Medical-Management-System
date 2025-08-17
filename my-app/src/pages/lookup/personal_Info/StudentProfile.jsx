import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentProfile.css";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";

const StudentHealthProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabRoutes = {
    "/patient-search": "Thông tin cá nhân",
    "/medications": "Đơn thuốc",
    "/vaccinations": "Lịch sử tiêm chủng",
    "/health-record": "Hồ sơ sức khỏe",
  };
  const activeTab = tabRoutes[location.pathname] || "Hồ sơ sức khỏe";

  const [children, setChildren] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [profile, setProfile] = useState({
    allergy: "",
    chronicDisease: "",
    medicalHistory: "",
    vision: "",
    hearing: "",
    height: "",
    weight: "",
    name: "",
    gender: "",
  });

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !token) return;

    fetch(`http://localhost:8080/api/students/my-children`, {
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
      .catch((err) => console.error("❌ Lỗi lấy học sinh:", err));
  }, [userId, token]);

  useEffect(() => {
    if (!selectedStudentId || !userId || !token || children.length === 0) return;

    const student = children.find((s) => s.id === Number(selectedStudentId));

    fetch(`http://localhost:8080/api/students/healthinfo?userId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res)) {
          const info = res.find((h) => h.studentId === Number(selectedStudentId));
          setProfile({
            allergy: info?.allergy || "",
            chronicDisease: info?.chronicDisease || "",
            medicalHistory: info?.medicalHistory || "",
            vision: info?.vision || "",
            hearing: info?.hearing || "",
            height: info?.height || "",
            weight: info?.weight || "",
            name: student?.name || "",
            gender: student?.gender || "",
          });
        }
      })
      .catch((err) => console.error("❌ Lỗi lấy health info:", err));
  }, [selectedStudentId, userId, token, children]);

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
              <h2>Hồ sơ sức khỏe học sinh</h2>

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
            <div className="info-columns">
              <div className="contact-left">
                <p><strong>Họ tên:</strong> {profile.name}</p>
                <p><strong>Giới tính:</strong> {profile.gender}</p>
              </div>
              <div className="contact-right">
                <p><strong>Chiều cao:</strong> {profile.height} cm</p>
                <p><strong>Cân nặng:</strong> {profile.weight} kg</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentHealthProfile;
