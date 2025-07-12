import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StudentProfile.css";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";

const Tab = ({ active, children, ...props }) => (
  <button
    className={`tab-btn${active ? " active" : ""}`}
    {...props}
  >
    {children}
  </button>
);

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

  const handleTabClick = (label) => {
    const path = Object.keys(tabRoutes).find((key) => tabRoutes[key] === label);
    if (path && location.pathname !== path) {
      navigate(path, { state: { from: location.pathname } });
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    mother: "Trần Thị Hoa",
    motherPhone: "0909 123 456",
    father: "Nguyễn Văn B",
    fatherPhone: "0908 654 321",
    email: "duy.khanh@example.com",
    address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch("/data/student.json")
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, []);

  if (!student) {
    return <div>Loading...</div>;
  }

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

      {/* Main Content */}
      <main className="main-content">
        <div className="header">
          <div className="header-left">
            <img src={student.avatarUrl} alt="Avatar" className="avatar" />
            <div className="info">
              <h1 className="name">{student.name}</h1>
              <p>Lớp: {student.className} | GVCN: {student.teacher}</p>
              <p>Chiều cao: {student.height}cm | Cân nặng: {student.weight}kg</p>
              <p>Giới tính: {student.gender}</p>
            </div>
          </div>
          <button className="add-btn">
            <span className="plus">+</span> Thêm mới
          </button>
        </div>

        <div className="content-card">
          <div className="tabs">
            <Tab active>Thông tin cá nhân</Tab>
            <Tab>Đơn thuốc</Tab>
            <Tab>Lịch sử tiêm chủng</Tab>
            <Tab>Hồ sơ sức khỏe</Tab>
          </div>

          <div className="personal-section">
            <div className="personal-row">
              <div>
                <strong>Mẹ:</strong><br />
                <strong>Điện Thoại:</strong>
              </div>
              <div>
                <strong>Email:</strong><br />
                <strong>Địa chỉ:</strong>
              </div>
            </div>
            <div className="personal-row">
              <div>
                <strong>Ba:</strong><br />
                <strong>Điện Thoại:</strong>
              </div>
              <div style={{ visibility: 'hidden' }}>
                {/* Empty space to maintain layout */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
