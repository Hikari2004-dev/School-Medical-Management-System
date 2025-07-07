import React from "react";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {
  Package,
  CalendarCheck,
  Heart,
  Video,
} from "lucide-react";
import './OurServices.css';

const services = [
  {
    icon: <Package size={32} />,
    title: "Gửi Đơn Thuốc",
    description:
      "Gửi đơn thuốc trực tuyến nhanh chóng & tiện lợi. Nhận kết quả trong vòng 24h.",
    button: "Gửi Đơn Thuốc",
  },
  {
    icon: <CalendarCheck size={32} />,
    title: "Đăng Ký Tiêm Vaccine",
    description:
      "Tìm lịch tiêm, nhận nhắc nhở & theo dõi lịch sử tiêm chủng đầy đủ.",
    button: "Đăng Ký Vaccine",
  },
  {
    icon: <Heart size={32} />,
    title: "Khám Sức Khỏe Định Kỳ",
    description:
      "Đặt lịch khám định kỳ với bác sĩ chuyên khoa và nhận báo cáo chi tiết.",
    button: "Đặt Lịch Khám",
  },
  {
    icon: <Video size={32} />,
    title: "Tư Vấn Trực Tuyến",
    description:
      "Tư vấn sức khỏe 24/7 qua chat hoặc video call với chuyên gia.",
    button: "Tư Vấn Ngay",
  },
];

export default function OurServices() {
  return (
    <div>
      {/* Header Component */}
      <Header />

      {/* Main Services Section */}
      <section className="services-section">
        <div className="services-container">
          <h2 className="services-title">
            Dịch Vụ Của Chúng Tôi
          </h2>
          <span className="services-divider"></span>
          <p className="services-description">
            Chất lượng hàng đầu, tiện lợi, nhanh chóng – đồng hành cùng sức khỏe của học sinh.
          </p>
        </div>

        <div className="services-grid">
          {services.map((svc, idx) => (
            <div key={idx} className="service-card">
              <div className="service-icon-container">
                <div className="service-icon">
                  {svc.icon}
                </div>
              </div>
              <h3 className="service-title">
                {svc.title}
              </h3>
              <p className="service-description">{svc.description}</p>
              <button className="service-button">
                {svc.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}