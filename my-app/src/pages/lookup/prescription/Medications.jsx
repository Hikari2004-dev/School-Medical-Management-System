// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// import AvatarImg from "../../../image/hinhanh/avatar.png";
// import LogoImg from "../../../image/hinhanh/logoproject.png";
// import "./Medications.css"; // Dùng chung file CSS để giữ đồng bộ layout

// const Medications = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const tabRoutes = {
//     "/patient-search": "Thông tin cá nhân",
//     "/medications": "Đơn thuốc",
//     "/vaccinations": "Lịch sử tiêm chủng",
//     "/health-record": "Hồ sơ sức khỏe",
//   };

//   const activeTab = tabRoutes[location.pathname] || "Đơn thuốc";
//   const [medications, setMedications] = useState([]);

//   // Gọi API lấy danh sách đơn thuốc
//   useEffect(() => {
//     fetch("http://localhost:8080/api/medication-submissions/my-submissions", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Không lấy được dữ liệu đơn thuốc.");
//         return res.json();
//       })
//       .then((data) => setMedications(data))
//       .catch((err) => console.error("❌ Lỗi fetch thuốc:", err));
//   }, []);

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

//       {/* Main content */}
//       <main className="profile-main">
//         <button className="home-button" onClick={() => navigate("/")}>
//           ⬅ Quay về trang chính
//         </button>

//         <div className="profile-card">
//           {/* Header */}
//           <div className="profile-overview">
//             <img src={AvatarImg} alt="avatar" className="avatar" />
//             <div className="info-text">
//               <h2>Nguyễn Đoàn Duy Khánh</h2>
//               <p>Lớp 12A1</p>
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

//           {/* Chi tiết đơn thuốc */}
//           <div className="profile-detail">
//             {activeTab === "Đơn thuốc" ? (
//               medications.length > 0 ? (
//                 <table className="medications-table">
//                   <thead>
//                     <tr>
//                       <th>Tên thuốc</th>
//                       <th>Liều dùng</th>
//                       <th>Tần suất</th>
//                       <th>Ngày bắt đầu</th>
//                       <th>Ngày kết thúc</th>
//                       <th>Trạng thái</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {medications.map((med) => (
//                       <tr key={med.medicationId}>
//                         <td>{med.medicationName}</td>
//                         <td>{med.dosage}</td>
//                         <td>{med.frequency}</td>
//                         <td>{med.startDate}</td>
//                         <td>{med.endDate}</td>
//                         <td>{med.status}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p className="tab-placeholder">Chưa có đơn thuốc nào.</p>
//               )
//             ) : (
//               <p className="tab-placeholder">Hiện chưa có dữ liệu cho mục "{activeTab}".</p>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Medications;
// src/pages/lookup/prescription/Medications.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AvatarImg from "../../../image/hinhanh/avatar.png";
import LogoImg from "../../../image/hinhanh/logoproject.png";
import "./Medications.css";

const Medications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentId: paramId } = useParams();

  const tabRoutes = {
    "/patient-search": "Thông tin cá nhân",
    "/medications": "Đơn thuốc",
    "/vaccinations": "Lịch sử tiêm chủng",
    "/health-record": "Hồ sơ sức khỏe",
  };
  const activeTab = tabRoutes[location.pathname] || "Đơn thuốc";

  const [studentInfo, setStudentInfo] = useState({
    studentName: "",
    grade: "",
  });
  const [medications, setMedications] = useState([]);

  // 1) Lấy thông tin học sinh
  useEffect(() => {
    const id = paramId || localStorage.getItem("studentId");
    const token = localStorage.getItem("token");
    if (!id || !token) return;

    fetch(`http://localhost:8080/api/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Không lấy được thông tin học sinh");
        return res.json();
      })
      .then(data => {
        setStudentInfo({
          studentName: data.studentName,
          grade: data.grade,
        });
      })
      .catch(err => console.error("❌ Lỗi fetch học sinh:", err));
  }, [paramId]);

  // 2) Lấy đơn thuốc
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8080/api/medication-submissions/my-submissions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Không lấy được dữ liệu đơn thuốc.");
        return res.json();
      })
      .then(data => setMedications(data))
      .catch(err => console.error("❌ Lỗi fetch đơn thuốc:", err));
  }, []);

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
              <h2>{studentInfo.studentName || "—"}</h2>
              <p>Lớp {studentInfo.grade || "—"}</p>
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
            {activeTab === "Đơn thuốc" ? (
              medications.length > 0 ? (
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
                    {medications.map(med => (
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
              )
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

export default Medications;
