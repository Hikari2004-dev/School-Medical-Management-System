import { useState, FormEvent } from "react";
import "./healthForm.css"; // File CSS tùy chỉnh

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
    vision: {
      leftEye: "",
      rightEye: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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
      vision: {
        leftEye: "",
        rightEye: "",
      },
    });
    setSubmitMessage("");
  };

  return (
    <div className="health-form-container">
      <h1 className="form-title">
        PHIẾU NHẬP THÔNG TIN SỨC KHỎE HỌC SINH
      </h1>
      <form onSubmit={handleSubmit} className="health-form">
        <fieldset>
          <legend>Thông tin cá nhân</legend>
          <input type="text" placeholder="Họ và tên" value={formData.personalInfo.fullName} onChange={(e) => handleInputChange("personalInfo", "fullName", e.target.value)} />
          <input type="text" placeholder="Lớp" value={formData.personalInfo.studentClass} onChange={(e) => handleInputChange("personalInfo", "studentClass", e.target.value)} />
          <input type="date" placeholder="Ngày sinh" value={formData.personalInfo.birthDate} onChange={(e) => handleInputChange("personalInfo", "birthDate", e.target.value)} />
          <input type="text" placeholder="Mã học sinh" value={formData.personalInfo.studentId} onChange={(e) => handleInputChange("personalInfo", "studentId", e.target.value)} />
        </fieldset>

        <fieldset>
          <legend>Thông tin thể chất</legend>
          <input type="number" placeholder="Chiều cao (cm)" value={formData.bodyMeasurements.height} onChange={(e) => handleInputChange("bodyMeasurements", "height", e.target.value)} />
          <input type="number" placeholder="Cân nặng (kg)" value={formData.bodyMeasurements.weight} onChange={(e) => handleInputChange("bodyMeasurements", "weight", e.target.value)} />
        </fieldset>

        <fieldset>
          <legend>Tiền sử y tế</legend>
          <textarea placeholder="Dị ứng" value={formData.allergies} onChange={(e) => handleInputChange("allergies", null, e.target.value)} />
          <textarea placeholder="Bệnh mãn tính" value={formData.chronicDiseases} onChange={(e) => handleInputChange("chronicDiseases", null, e.target.value)} />
          <textarea placeholder="Tiền sử bệnh tật" value={formData.medicalHistory} onChange={(e) => handleInputChange("medicalHistory", null, e.target.value)} />
        </fieldset>

        <fieldset>
          <legend>Thị lực</legend>
          <input type="text" placeholder="Mắt trái" value={formData.vision.leftEye} onChange={(e) => handleInputChange("vision", "leftEye", e.target.value)} />
          <input type="text" placeholder="Mắt phải" value={formData.vision.rightEye} onChange={(e) => handleInputChange("vision", "rightEye", e.target.value)} />
        </fieldset>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>Gửi</button>
          <button type="button" onClick={handleReset}>Làm lại</button>
        </div>

        {submitMessage && <p className="form-message">{submitMessage}</p>}
      </form>
    </div>
  );
}
