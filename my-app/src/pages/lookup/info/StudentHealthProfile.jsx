import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentHealthProfile.css";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";

const StudentHealthProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [children, setChildren] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [profile, setProfile] = useState({
    allergy: "",
    chronicDisease: "",
    medicalHistory: "",
    vision: "",
    hearing: "",
  });

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const tabRoutes = {
    "/patient-search": "Thông tin cá nhân",
    "/medications": "Đơn thuốc",
    "/vaccinations": "Lịch sử tiêm chủng",
    "/health-record": "Hồ sơ sức khỏe",
  };
  const activeTab = tabRoutes[location.pathname] || "Hồ sơ sức khỏe";

  const handleTabClick = (label) => {
    const path = Object.keys(tabRoutes).find((k) => tabRoutes[k] === label);
    if (path && location.pathname !== path) navigate(path);
  };

  // 📌 Fetch danh sách học sinh của phụ huynh
  useEffect(() => {
    if (!userId || !token) return;

    fetch(`http://localhost:8080/api/students/by-parent/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setChildren(res.data);
          if (res.data.length > 0) {
            setSelectedStudentId(res.data[0].id); // mặc định học sinh đầu tiên
          }
        }
      })
      .catch((err) => console.error("❌ Lỗi lấy danh sách học sinh:", err));
  }, [userId, token]);

  // 📌 Fetch hồ sơ sức khỏe khi học sinh thay đổi
  useEffect(() => {
    if (!userId || !selectedStudentId || !token) return;

    fetch(`http://localhost:8080/api/students/healthinfo?userId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res)) {
          const health = res.find(
            (item) => item.studentId === Number(selectedStudentId)
          );
          if (health) {
            setProfile({
              allergy: health.allergy,
              chronicDisease: health.chronicDisease,
              medicalHistory: health.medicalHistory,
              vision: health.vision,
              hearing: health.hearing,
            });
          } else {
            setProfile({
              allergy: "",
              chronicDisease: "",
              medicalHistory: "",
              vision: "",
              hearing: "",
            });
          }
        }
      })
      .catch((err) => console.error("❌ Lỗi lấy hồ sơ sức khỏe:", err));
  }, [selectedStudentId, userId, token]);

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
        {/* ✅ Nút quay về */}
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
                <label><strong>Dị ứng:</strong></label>
                <p>{profile.allergy || "Không có thông tin"}</p>

                <label><strong>Bệnh mãn tính:</strong></label>
                <p>{profile.chronicDisease || "Không có thông tin"}</p>

                <label><strong>Lịch sử bệnh:</strong></label>
                <p>{profile.medicalHistory || "Không có thông tin"}</p>
              </div>

              <div className="contact-right">
                <label><strong>Thị lực:</strong></label>
                <p>{profile.vision || "Không có thông tin"}</p>

                <label><strong>Thính lực:</strong></label>
                <p>{profile.hearing || "Không có thông tin"}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentHealthProfile;
