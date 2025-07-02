import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./StudentHealthProfile.styles.js";

const StudentHealthProfile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get("/api/student/12A1")
      .then((res) => setStudent(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  if (!student) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>📘 SchoMed</h1>
        <nav className={styles.nav}>
          <a href="#">Trang chủ</a>
          <a href="#">Đơn thuốc</a>
          <a href="#">Sổ vaccine</a>
          <a href="#" className={styles.activeLink}>Sức khỏe học sinh</a>
          <a href="#">Báo cáo</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.profile}>
            <img src={student.avatar} alt="avatar" className={styles.avatar} />
            <div>
              <h2 className={styles.name}>{student.name}</h2>
              <p className={styles.classText}>Lớp {student.className}</p>
            </div>
          </div>
          <button className={styles.addButton}>+ Thêm mới</button>
        </div>

        {/* Health Summary */}
        <div className={styles.summaryGrid}>
          <div className={styles.cardRed}>
            <h3 className={styles.cardTitle}>Dị ứng</h3>
            {student.allergies.map((a, i) => <p key={i}>{a}</p>)}
          </div>
          <div className={styles.cardGreen}>
            <h3 className={styles.cardTitle}>Chỉ số cơ thể</h3>
            <p>Chiều cao: {student.bodyMetrics.height} cm</p>
            <p>Cân nặng: {student.bodyMetrics.weight} kg</p>
            <p>BMI: {student.bodyMetrics.bmi}</p>
          </div>
          <div className={styles.cardBlue}>
            <h3 className={styles.cardTitle}>Thị lực</h3>
            <p>Mắt trái: {student.vision.left} độ</p>
            <p>Mắt phải: {student.vision.right} độ</p>
            <p>Cần đeo kính: {student.vision.note}</p>
          </div>
          <div className={styles.cardPink}>
            <h3 className={styles.cardTitle}>Sức khỏe tổng quát</h3>
            <p>Huyết áp: {student.health.bloodPressure}</p>
            <p>Nhịp tim: {student.health.heartRate}</p>
            <p>Tình trạng: {student.health.status}</p>
          </div>
        </div>

        {/* Visit History */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Lịch sử khám gần đây</h3>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Ngày khám</th>
                <th className={styles.th}>Loại khám</th>
                <th className={styles.th}>Kết quả</th>
                <th className={styles.th}>Bác sĩ</th>
                <th className={styles.th}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {student.checkups.map((visit, i) => (
                <tr key={i} className={styles.tr}>
                  <td className={styles.td}>{visit.date}</td>
                  <td className={styles.td}>{visit.type}</td>
                  <td className={styles.td}>{visit.result}</td>
                  <td className={styles.td}>{visit.doctor}</td>
                  <td className={styles.td}>{visit.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Allergy Detail */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Thông tin dị ứng chi tiết</h3>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Chất gây dị ứng</th>
                <th className={styles.th}>Loại</th>
                <th className={styles.th}>Mức độ</th>
                <th className={styles.th}>Triệu chứng</th>
                <th className={styles.th}>Ngày phát hiện</th>
              </tr>
            </thead>
            <tbody>
              {student.allergyDetails.map((a, i) => (
                <tr key={i} className={styles.tr}>
                  <td className={styles.td}>{a.substance}</td>
                  <td className={styles.td}>{a.type}</td>
                  <td className={styles.td}>{a.level}</td>
                  <td className={styles.td}>{a.symptoms}</td>
                  <td className={styles.td}>{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Vision Tracking */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Theo dõi thị lực</h3>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Ngày khám</th>
                <th className={styles.th}>Mắt trái</th>
                <th className={styles.th}>Mắt phải</th>
                <th className={styles.th}>Ghi chú</th>
                <th className={styles.th}>Bác sĩ</th>
              </tr>
            </thead>
            <tbody>
              {student.visionTracking.map((v, i) => (
                <tr key={i} className={styles.tr}>
                  <td className={styles.td}>{v.date}</td>
                  <td className={styles.td}>{v.left}</td>
                  <td className={styles.td}>{v.right}</td>
                  <td className={styles.td}>{v.note}</td>
                  <td className={styles.td}>{v.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Medical History */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Tiền sử bệnh án</h3>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Bệnh</th>
                <th className={styles.th}>Thời gian mắc</th>
                <th className={styles.th}>Điều trị</th>
                <th className={styles.th}>Tình trạng</th>
                <th className={styles.th}>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {student.medicalHistory.map((m, i) => (
                <tr key={i} className={styles.tr}>
                  <td className={styles.td}>{m.disease}</td>
                  <td className={styles.td}>{m.duration}</td>
                  <td className={styles.td}>{m.treatment}</td>
                  <td className={styles.td}>{m.status}</td>
                  <td className={styles.td}>{m.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default StudentHealthProfile;
