import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./healthForm.css";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function HealthFormApp() {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      studentClass: "",
      birthDate: "",
      studentId: "",
    },
    bodyMeasurements: {
      height: "",
      weight: "",
    },
    allergies: "",
    chronicDiseases: "",
    medicalHistory: "",
    visionScore: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: typeof prev[section] === "object"
        ? { ...prev[section], [field]: value }
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/health-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage("Thông tin đã được lưu thành công!");
        setTimeout(() => {
          navigate("/vaccineForm");
        }, 1200); // Chờ 1.2 giây để hiển thị thông báo trước khi chuyển trang
      } else {
        setSubmitMessage(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("Có lỗi xảy ra khi lưu thông tin");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVisionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      visionScore: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      personalInfo: {
        fullName: "",
        studentClass: "",
        birthDate: "",
        studentId: "",
      },
      bodyMeasurements: {
        height: "",
        weight: "",
      },
      allergies: "",
      chronicDiseases: "",
      medicalHistory: "",
      visionScore: "",
    });
    setSubmitMessage("");
  };

  return (
    <>
      <Header />
      <div className="health-form-bg">
        <div className="health-form-card">
          <div className="form-header big-header">
            <span className="form-header-icon big-icon">
              {/* Bạn có thể dùng icon SVG hoặc emoji hoặc FontAwesome */}

            </span>
            <div>
              <h1 className="form-title big-title">PHIẾU NHẬP THÔNG TIN SỨC KHỎE<br />HỌC SINH</h1>
              <p className="form-desc big-desc">Vui lòng điền đầy đủ và chính xác thông tin sức khỏe của học sinh</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="health-form">
            <fieldset>
              <legend className="section-title">
                THÔNG TIN CÁ NHÂN
              </legend>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <span className="input-icon">🆔</span> Họ và tên học sinh
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập họ và tên đầy đủ"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleInputChange("personalInfo", "fullName", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <span className="input-icon">🏫</span> Lớp
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 5A"
                    value={formData.personalInfo.studentClass}
                    onChange={(e) => handleInputChange("personalInfo", "studentClass", e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <span className="input-icon">📅</span> Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={formData.personalInfo.birthDate}
                    onChange={(e) => handleInputChange("personalInfo", "birthDate", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <span className="input-icon">🆔</span> Mã học sinh
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập mã học sinh"
                    value={formData.personalInfo.studentId}
                    onChange={(e) => handleInputChange("personalInfo", "studentId", e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="section-title">CHỈ SỐ CƠ THỂ</legend>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Chiều cao (cm)</label>
                  <input
                    type="number"
                    placeholder="Ví dụ: 150"
                    value={formData.bodyMeasurements.height}
                    onChange={(e) => handleInputChange("bodyMeasurements", "height", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Cân nặng (kg)</label>
                  <input
                    type="number"
                    placeholder="Ví dụ: 45"
                    value={formData.bodyMeasurements.weight}
                    onChange={(e) => handleInputChange("bodyMeasurements", "weight", e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="section-title">THÔNG TIN DỊ ỨNG</legend>
              <div className="form-group">
                <label className="form-label">
                  Dị ứng (thức ăn, thuốc, môi trường...)
                </label>
                <textarea
                  placeholder="Nhập các loại dị ứng nếu có"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", null, e.target.value)}
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="section-title">BỆNH MÃN TÍNH</legend>
              <div className="form-group">
                <label className="form-label">
                  Bệnh mãn tính (hen suyễn, tiểu đường, tim mạch...)
                </label>
                <textarea
                  placeholder="Nhập các bệnh mãn tính nếu có"
                  value={formData.chronicDiseases}
                  onChange={(e) => handleInputChange("chronicDiseases", null, e.target.value)}
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="section-title">THỊ LỰC</legend>
              <div className="form-group">
                <label className="form-label">
                  Đánh giá thị lực (1 - kém nhất, 10 - tốt nhất)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="Nhập điểm thị lực từ 1 đến 10"
                  value={formData.visionScore}
                  onChange={(e) => handleVisionChange(e.target.value)}
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="section-title">TIỀN SỬ BỆNH</legend>
              <div className="form-group">
                <label className="form-label">
                  Tiền sử bệnh và điều trị
                </label>
                <textarea
                  placeholder="Nhập tiền sử bệnh, các lần nhập viện, phẫu thuật..."
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange("medicalHistory", null, e.target.value)}
                />
              </div>
            </fieldset>

            <div className="form-note">
              <span>Thông tin sức khỏe của bạn sẽ được bảo mật và chỉ sử dụng cho mục đích chăm sóc sức khỏe tại trường. Vui lòng kiểm tra kỹ thông tin trước khi gửi.</span>
            </div>

            <div className="form-actions">
              <button type="submit" disabled={isSubmitting} className="submit-btn">LƯU THÔNG TIN</button>
              <button type="button" onClick={handleReset} className="reset-btn">LÀM LẠI</button>
            </div>
            {submitMessage && <p className="form-message">{submitMessage}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
