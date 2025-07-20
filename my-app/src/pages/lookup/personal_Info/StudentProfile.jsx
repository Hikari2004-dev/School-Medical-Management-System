// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./StudentProfile.css";
// import AvatarImg from "../../../image/hinhanh/avatar.png";
// import LogoImg from "../../../image/hinhanh/logoproject.png";

// const StudentProfile = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     address: "",
//   });

//   const tabRoutes = {
//     "/patient-search": "Thông tin cá nhân",
//     "/medications": "Đơn thuốc",
//     "/vaccinations": "Lịch sử tiêm chủng",
//     "/health-record": "Hồ sơ sức khỏe",
//   };

//   const activeTab = tabRoutes[location.pathname] || "Thông tin cá nhân";

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.error("⚠️ Không tìm thấy token trong localStorage");
//       return;
//     }

//     fetch("http://localhost:8080/api/parent-info/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("❌ Không thể lấy dữ liệu phụ huynh.");
//         return res.json();
//       })
//       .then((data) => {
//         console.log("✅ Dữ liệu phụ huynh:", data);
//         setProfile(data);
//       })
//       .catch((err) => {
//         console.error("Lỗi khi fetch:", err);
//       });
//   }, []);

//   const handleChange = (field, value) => {
//     setProfile((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleTabClick = (label) => {
//     const path = Object.keys(tabRoutes).find((key) => tabRoutes[key] === label);
//     if (path && location.pathname !== path) {
//       navigate(path);
//     }
//   };

//   return (
//     <div className="student-profile-page">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="brand-box">
//           <img src={LogoImg} alt="Logo" className="brand-icon" />
//           <div className="brand-text">
//             <h1>SchoMed</h1>
//             <p>School Medical</p>
//           </div>
//         </div>

//         <nav className="sidebar-nav">
//           <button
//             onClick={() => navigate("/patient-search")}
//             className={location.pathname === "/patient-search" ? "active" : ""}
//           >
//             🏠 Trang chủ
//           </button>
//           <button
//             onClick={() => navigate("/medications")}
//             className={location.pathname === "/medications" ? "active" : ""}
//           >
//             💊 Đơn thuốc
//           </button>
//           <button
//             onClick={() => navigate("/vaccinations")}
//             className={location.pathname === "/vaccinations" ? "active" : ""}
//           >
//             💉 Sổ vaccine
//           </button>
//           <button
//             onClick={() => navigate("/health-record")}
//             className={location.pathname === "/health-record" ? "active" : ""}
//           >
//             📁 Hồ sơ sức khỏe
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="profile-main">
//         <button className="home-button" onClick={() => navigate("/")}>
//           ⬅ Quay về trang chính
//         </button>

//         <div className="profile-card">
//           {/* Thông tin học sinh */}
//           <div className="profile-overview">
//             <img src={AvatarImg} alt="avatar" className="avatar" />
//             <div className="info-text">
//               <h2>Nguyễn Đoàn Duy Khánh</h2>
//               <p>Lớp 12A1 | GVCN: Lâm Phương Thúy</p>
//               <p>Chiều cao: 170cm | Cân nặng: 60 kg</p>
//               <p>Giới tính: Nam/Nữ</p>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="profile-tabs">
//             {Object.values(tabRoutes).map((label) => (
//               <span
//                 key={label}
//                 className={`tab ${activeTab === label ? "active" : ""}`}
//                 onClick={() => handleTabClick(label)}
//               >
//                 {label}
//               </span>
//             ))}
//           </div>

//           {/* Chi tiết tab */}
//           <div className="profile-detail">
//             {activeTab === "Thông tin cá nhân" ? (
//               <>
//                 <div className="info-columns">
//                   <div className="contact-left">
//                     <p>
//                       <strong>Phụ huynh:</strong>{" "}
//                       {isEditing ? (
//                         <input
//                           className="input-line"
//                           value={profile.fullName}
//                           onChange={(e) => handleChange("fullName", e.target.value)}
//                         />
//                       ) : (
//                         profile.fullName
//                       )}
//                     </p>

//                     <p>
//                       <strong>Điện thoại:</strong>{" "}
//                       {isEditing ? (
//                         <input
//                           className="input-line"
//                           value={profile.phone}
//                           onChange={(e) => handleChange("phone", e.target.value)}
//                         />
//                       ) : (
//                         profile.phone
//                       )}
//                     </p>
//                   </div>

//                   <div className="contact-right">
//                     <p>
//                       <strong>Email:</strong>{" "}
//                       {isEditing ? (
//                         <input
//                           className="input-line"
//                           value={profile.email}
//                           onChange={(e) => handleChange("email", e.target.value)}
//                         />
//                       ) : (
//                         profile.email
//                       )}
//                     </p>

//                     <p>
//                       <strong>Địa chỉ:</strong>{" "}
//                       {isEditing ? (
//                         <input
//                           className="input-line"
//                           value={profile.address}
//                           onChange={(e) => handleChange("address", e.target.value)}
//                         />
//                       ) : (
//                         profile.address
//                       )}
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   className="home-button"
//                   style={{ marginTop: "20px" }}
//                   onClick={handleEditToggle}
//                 >
//                   {isEditing ? "💾 Lưu lại" : "✏️ Chỉnh sửa"}
//                 </button>
//               </>
//             ) : (
//               <p className="tab-placeholder">
//                 Hiện chưa có dữ liệu cho mục "{activeTab}".
//               </p>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentProfile;
// src/pages/lookup/personal_Info/StudentProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";
import "./StudentProfile.css";

const StudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // nếu route là "/patient-search/:studentId"
  const { studentId: paramId } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    grade: "",
    teacherName: "",
    height: "",
    weight: "",
    gender: "",
  });

  const tabRoutes = {
    "/patient-search": "Thông tin cá nhân",
    "/medications": "Đơn thuốc",
    "/vaccinations": "Lịch sử tiêm chủng",
    "/health-record": "Hồ sơ sức khỏe",
  };
  const activeTab = tabRoutes[location.pathname] || "Thông tin cá nhân";

  useEffect(() => {
    // Lấy studentId: ưu tiên param, nếu không fallback localStorage
    const id = paramId || localStorage.getItem("studentId");
    if (!id) {
      console.warn("⚠️ Không có studentId để fetch thông tin học sinh");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("⚠️ Không tìm thấy token");
      return;
    }

    fetch(`http://localhost:8080/api/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Không thể lấy dữ liệu học sinh");
        return res.json();
      })
      .then(data => {
        // Giả sử API trả về { studentName, grade, teacherName, height, weight, gender }
        setProfile({
          fullName: data.studentName,
          grade: data.grade,
          teacherName: data.teacherName,
          height: data.height,
          weight: data.weight,
          gender: data.gender,
        });
      })
      .catch(err => console.error("❌ Lỗi khi fetch:", err));
  }, [paramId]);

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // khi đang ở chế độ edit và bấm lưu
      const id = paramId || localStorage.getItem("studentId");
      const token = localStorage.getItem("token");
      const payload = {
        studentName: profile.fullName,
        grade: profile.grade,
        teacherName: profile.teacherName,
        height: parseFloat(profile.height),
        weight: parseFloat(profile.weight),
        gender: profile.gender,
      };

      fetch(`http://localhost:8080/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
        .then(res => {
          if (!res.ok) throw new Error("Cập nhật thất bại");
          alert("Lưu thông tin thành công");
        })
        .catch(err => console.error("❌ Lỗi lưu thông tin:", err));
    }
  };

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
          <div className="profile-overview">
            <img src={AvatarImg} alt="avatar" className="avatar" />
            <div className="info-text">
              <h2>{profile.fullName || "—"}</h2>
              <p>
                Lớp {profile.grade || "—"} | GVCN: {profile.teacherName || "—"}
              </p>
              <p>
                Chiều cao: {profile.height || "-"} cm | Cân nặng:{" "}
                {profile.weight || "-"} kg
              </p>
              <p>Giới tính: {profile.gender || "—"}</p>
            </div>
          </div>

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

          <div className="profile-detail">
            {activeTab === "Thông tin cá nhân" ? (
              <>
                <div className="info-columns">
                  <div className="contact-left">
                    <p>
                      <strong>Họ và tên:</strong>{" "}
                      {isEditing ? (
                        <input
                          className="input-line"
                          value={profile.fullName}
                          onChange={e => handleChange("fullName", e.target.value)}
                        />
                      ) : (
                        profile.fullName
                      )}
                    </p>
                    <p>
                      <strong>GVCN:</strong>{" "}
                      {isEditing ? (
                        <input
                          className="input-line"
                          value={profile.teacherName}
                          onChange={e =>
                            handleChange("teacherName", e.target.value)
                          }
                        />
                      ) : (
                        profile.teacherName
                      )}
                    </p>
                  </div>
                  <div className="contact-right">
                    <p>
                      <strong>Chiều cao:</strong>{" "}
                      {isEditing ? (
                        <input
                          type="number"
                          className="input-line"
                          value={profile.height}
                          onChange={e => handleChange("height", e.target.value)}
                        />
                      ) : (
                        `${profile.height} cm`
                      )}
                    </p>
                    <p>
                      <strong>Cân nặng:</strong>{" "}
                      {isEditing ? (
                        <input
                          type="number"
                          className="input-line"
                          value={profile.weight}
                          onChange={e => handleChange("weight", e.target.value)}
                        />
                      ) : (
                        `${profile.weight} kg`
                      )}
                    </p>
                  </div>
                </div>

                <button
                  className="home-button"
                  style={{ marginTop: 20 }}
                  onClick={handleEditToggle}
                >
                  {isEditing ? "💾 Lưu lại" : "✏️ Chỉnh sửa"}
                </button>
              </>
            ) : (
              <p className="tab-placeholder">
                Hiện chưa có dữ liệu cho mục "{activeTab}".
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
