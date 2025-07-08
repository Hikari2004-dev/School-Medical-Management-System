// StudentHealthProfile.jsx
import { useEffect, useState } from "react";
import {
  Activity,
  FileText,
  Calendar,
  BarChart3,
  UserPlus,
  Home,
} from "lucide-react";
import "./StudentHealthProfile.css";

export default function StudentHealthProfile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/student-profile") // Backend API endpoint
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div>Loading...</div>;

  const getBadgeClass = (status) => {
    switch (status) {
      case "bình thường":
        return "badge green";
      case "theo dõi":
        return "badge yellow";
      case "cần chú ý":
        return "badge red";
      case "nghiêm trọng":
        return "badge red";
      case "trung bình":
        return "badge yellow";
      default:
        return "badge gray";
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">SchoMed<br/><span>School Medical</span></div>
        <nav>
          <button className="active"><Home /> Trang chủ</button>
          <button><FileText /> Đơn thuốc</button>
          <button><Calendar /> Sổ vaccine</button>
          <button><Activity /> Hồ sơ sức khỏe</button>
          <button><BarChart3 /> Báo cáo</button>
          <button><UserPlus /> Tạo hồ sơ tư vấn</button>
        </nav>
      </aside>

      <main className="content">
        <div className="profile-header">
          <img src={data.avatar} alt="avatar" className="avatar" />
          <div>
            <h2>{data.name}</h2>
            <p>{data.class}</p>
          </div>
          <button className="btn-add">+ Thêm mới</button>
        </div>

        <div className="tabs">
          <button>Thông tin cá nhân</button>
          <button>Đơn thuốc</button>
          <button>Lịch sử tiêm chủng</button>
          <button className="active">Hồ sơ sức khỏe</button>
        </div>

        <div className="cards">
          <div className="card pink">
            <h4>Dị ứng</h4>
            <p>{data.summary.allergies}</p>
          </div>
          <div className="card blue">
            <h4>Thị lực</h4>
            <p>{data.summary.vision}</p>
          </div>
          <div className="card green">
            <h4>Chỉ số cơ thể</h4>
            <p>{data.summary.body}</p>
          </div>
          <div className="card orange">
            <h4>Chỉ số tổng quát</h4>
            <p>{data.summary.general}</p>
          </div>
        </div>

        <section>
          <h3>Lịch sử khám gần đây</h3>
          <table>
            <thead>
              <tr>
                <th>Ngày khám</th>
                <th>Loại khám</th>
                <th>Kết quả</th>
                <th>Bác sĩ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {data.recentRecords.map((r) => (
                <tr key={r.id}>
                  <td>{r.date}</td>
                  <td>{r.type}</td>
                  <td>{r.result}</td>
                  <td>{r.doctor}</td>
                  <td><span className={getBadgeClass(r.status)}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h3>Thông tin dị ứng chi tiết</h3>
          <table>
            <thead>
              <tr>
                <th>Chất gây dị ứng</th>
                <th>Loại dị ứng</th>
                <th>Mức độ</th>
                <th>Triệu chứng</th>
                <th>Ngày phát hiện</th>
              </tr>
            </thead>
            <tbody>
              {data.allergies.map((a) => (
                <tr key={a.id}>
                  <td>{a.allergen}</td>
                  <td>{a.type}</td>
                  <td><span className={getBadgeClass(a.severity)}>{a.severity}</span></td>
                  <td>{a.symptoms}</td>
                  <td>{a.discoveredDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h3>Theo dõi thị lực</h3>
          <table>
            <thead>
              <tr>
                <th>Ngày khám</th>
                <th>Mắt trái</th>
                <th>Mắt phải</th>
                <th>Ghi chú</th>
                <th>Bác sĩ</th>
              </tr>
            </thead>
            <tbody>
              {data.vitals.map((v) => (
                <tr key={v.id}>
                  <td>{v.date}</td>
                  <td>{v.systolic / 10}</td>
                  <td>{v.diastolic / 10}</td>
                  <td>{v.notes}</td>
                  <td>{v.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h3>Tiền sử bệnh án</h3>
          <table>
            <thead>
              <tr>
                <th>Bệnh</th>
                <th>Thời gian mắc</th>
                <th>Điều trị</th>
                <th>Tình trạng</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {data.medicalHistory.map((h) => (
                <tr key={h.id}>
                  <td>{h.condition}</td>
                  <td>{h.period}</td>
                  <td>{h.treatment}</td>
                  <td><span className={getBadgeClass(h.status)}>{h.status}</span></td>
                  <td>{h.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
