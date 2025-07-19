// src/pages/HealthFormApp.js
import React, { useState, useEffect } from "react";
import { useNavigate }            from "react-router-dom";
import Header                     from "../../components/Header/Header";
import Footer                     from "../../components/Footer/Footer";
import "./healthForm.css";

export default function HealthFormApp() {
  const [classes, setClasses]       = useState([]);
  const [loadError, setLoadError]   = useState("");
  const [formData, setFormData]     = useState({
    fullName:        "",
    dob:             "",
    gender:          "",
    classId:         "",
    // health info
    allergy:         "",
    chronicDisease:  "",
    medicalHistory:  "",
    vision:          "",
    hearing:         "",
    height:          "",
    weight:          "",
    bmi:             ""
  });
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const navigate = useNavigate();

  // 1) Fetch danh sách lớp
  useEffect(() => {
    fetch("/api/classes")
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => setClasses(data))
      .catch(err => setLoadError("Không thể tải danh sách lớp: " + err.message));
  }, []);

  // 2) Generic handler
  const handleChange = (field, value) =>
    setFormData(fd => ({ ...fd, [field]: value }));

  // 3) Khi chọn lớp: tự derive grade, lưu classId
  const handleClassSelect = (value) => {
    const cls = classes.find(c => c.id === Number(value));
    const grade = cls?.className.match(/^(\d+)/)?.[1] || "";
    setFormData(fd => ({
      ...fd,
      classId: value,
      // nếu bạn cần grade ở formData thì thêm ở đây
      grade
    }));
  };

  // 4) Submit form
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // 4.1) Tạo student trước
      const studentPayload = {
        name:       formData.fullName,
        dateOfBirth: formData.dob,
        gender:     formData.gender,
        // derive grade nếu cần backend
        grade:      formData.grade,
        classId:    Number(formData.classId)
      };
      const studentRes = await fetch("/api/students/save", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(studentPayload)
      });
      if (!studentRes.ok) {
        const errText = await studentRes.text();
        throw new Error(errText || studentRes.statusText);
      }
      const studentResult = await studentRes.json();
      // giả sử backend trả về { success:true, data: { studentId: 123 } }
      const studentId = studentResult.data?.studentId;
      if (!studentId) throw new Error("Không lấy được studentId");

      // 4.2) Gửi health info kèm student_id
      const healthPayload = {
        studentId:      studentId,
        allergy:        formData.allergy,
        chronicDisease: formData.chronicDisease,
        medicalHistory: formData.medicalHistory,
        vision:         formData.vision,
        hearing:        formData.hearing,
        height:         parseFloat(formData.height),
        weight:         parseFloat(formData.weight),
        bmi:            parseFloat(formData.bmi)
      };
      const healthRes = await fetch("/api/healthinfo", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(healthPayload)
      });
      if (!healthRes.ok) {
        const errText = await healthRes.text();
        throw new Error(errText || healthRes.statusText);
      }

      setSubmitMessage("Lưu thành công!");
      setTimeout(() => navigate("/vaccineForm"), 1200);

    } catch (err) {
      console.error(err);
      setSubmitMessage("Có lỗi: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName:        "",
      dob:             "",
      gender:          "",
      classId:         "",
      allergy:         "",
      chronicDisease:  "",
      medicalHistory:  "",
      vision:          "",
      hearing:         "",
      height:          "",
      weight:          "",
      bmi:             ""
    });
    setSubmitMessage("");
  };

  return (
    <>
      <Header />
      <div className="health-form-bg">
        <div className="health-form-card">
          <h1 className="form-title">
            PHIẾU NHẬP THÔNG TIN SỨC KHỎE HỌC SINH
          </h1>
          {loadError && <p className="form-message error">{loadError}</p>}

          <form onSubmit={handleSubmit} className="health-form">
            {/* THÔNG TIN CÁ NHÂN */}
            <fieldset>
              <legend>Thông tin cá nhân</legend>
              <div className="form-row">
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => handleChange("fullName", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Ngày sinh</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={e => handleChange("dob", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Giới tính</label>
                  <select
                    required
                    value={formData.gender}
                    onChange={e => handleChange("gender", e.target.value)}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* CHỌN LỚP */}
            <fieldset>
              <legend>Chọn lớp</legend>
              <div className="form-group">
                <label>Lớp</label>
                <select
                  required
                  value={formData.classId}
                  onChange={e => handleClassSelect(e.target.value)}
                >
                  <option value="">-- Chọn lớp --</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.className} – {c.room} (ID: {c.id})
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>

            {/* CHỈ SỐ CƠ THỂ */}
            <fieldset>
              <legend>Chỉ số cơ thể</legend>
              <div className="form-row">
                <div className="form-group">
                  <label>Chiều cao (cm)</label>
                  <input
                    type="number"
                    required
                    value={formData.height}
                    onChange={e => handleChange("height", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Cân nặng (kg)</label>
                  <input
                    type="number"
                    required
                    value={formData.weight}
                    onChange={e => handleChange("weight", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>BMI</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.bmi}
                    onChange={e => handleChange("bmi", e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            {/* DỊ ỨNG */}
            <fieldset>
              <legend>Dị ứng</legend>
              <textarea
                value={formData.allergy}
                onChange={e => handleChange("allergy", e.target.value)}
              />
            </fieldset>

            {/* BỆNH MÃN TÍNH */}
            <fieldset>
              <legend>Bệnh mãn tính</legend>
              <textarea
                value={formData.chronicDisease}
                onChange={e => handleChange("chronicDisease", e.target.value)}
              />
            </fieldset>

            {/* TIỀN SỬ BỆNH */}
            <fieldset>
              <legend>Tiền sử bệnh</legend>
              <textarea
                value={formData.medicalHistory}
                onChange={e => handleChange("medicalHistory", e.target.value)}
              />
            </fieldset>

            {/* THỊ LỰC & THÍNH LỰC */}
            <fieldset>
              <legend>Thị lực & Thính lực</legend>
              <div className="form-row">
                <div className="form-group">
                  <label>Thị lực</label>
                  <input
                    type="text"
                    value={formData.vision}
                    onChange={e => handleChange("vision", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Thính lực</label>
                  <input
                    type="text"
                    value={formData.hearing}
                    onChange={e => handleChange("hearing", e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            <div className="form-actions">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                LƯU THÔNG TIN
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="reset-btn"
              >
                LÀM LẠI
              </button>
            </div>

            {submitMessage && (
              <p className="form-message">{submitMessage}</p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
