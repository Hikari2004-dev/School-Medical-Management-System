import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./healthForm.css";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// Định nghĩa base URL cho backend API (thiết lập trong .env)
const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

export default function HealthFormApp() {
  const { studentId: paramId } = useParams();
  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    gender: "",
    grade: "",
    classId: "",
    allergy: "",
    chronicDisease: "",
    medicalHistory: "",
    vision: "",
    hearing: "",
    height: "",
    weight: "",
    bmi: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const navigate = useNavigate();

  // Load existing data if editing
  useEffect(() => {
    if (!paramId) return;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/health-form/${paramId}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || res.statusText);
        }
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error('Invalid JSON: ' + text);
        }
        const data = await res.json();
        setFormData({
          studentName: data.studentName || "",
          dob: data.dob || "",
          gender: data.gender || "",
          grade: data.grade || "",
          classId: data.classId?.toString() || "",
          allergy: data.allergy || "",
          chronicDisease: data.chronicDisease || "",
          medicalHistory: data.medicalHistory || "",
          vision: data.vision || "",
          hearing: data.hearing || "",
          height: data.height?.toString() || "",
          weight: data.weight?.toString() || "",
          bmi: data.bmi?.toString() || ""
        });
      } catch (error) {
        console.error('Error loading form:', error);
        setSubmitMessage('Không thể tải thông tin ban đầu. ' + error.message);
      }
    })();
  }, [paramId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const endpoint = paramId ? `/api/health-form/${paramId}` : '/api/health-form';
    try {
      const payload = {
        ...formData,
        classId: Number(formData.classId),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        bmi: parseFloat(formData.bmi)
      };

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: paramId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error('Invalid JSON: ' + text);
      }

      const result = await res.json();
      if (result.success) {
        setSubmitMessage('Thông tin đã được lưu thành công!');
        setTimeout(() => navigate('/vaccineForm'), 1200);
      } else {
        setSubmitMessage(result.message || 'Lỗi từ server');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Lỗi khi gửi dữ liệu: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      studentName: "",
      dob: "",
      gender: "",
      grade: "",
      classId: "",
      allergy: "",
      chronicDisease: "",
      medicalHistory: "",
      vision: "",
      hearing: "",
      height: "",
      weight: "",
      bmi: ""
    });
    setSubmitMessage("");
  };

  return (
    <>
      <Header />
      <div className="health-form-bg">
        <div className="health-form-card">
          <div className="form-header big-header">
            <span className="form-header-icon big-icon"></span>
            <div>
              <h1 className="form-title big-title">
                PHIẾU NHẬP THÔNG TIN SỨC KHỎE<br/>HỌC SINH
              </h1>
              <p className="form-desc big-desc">
                Vui lòng điền đầy đủ và chính xác thông tin sức khỏe của học sinh
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="health-form">
            {/* THÔNG TIN CÁ NHÂN */}
            <fieldset>
              <legend className="section-title">THÔNG TIN CÁ NHÂN</legend>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Họ và tên học sinh</label>
                  <input
                    type="text"
                    placeholder="Nhập họ và tên đầy đủ"
                    value={formData.studentName}
                    onChange={e => handleInputChange('studentName', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Ngày sinh</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={e => handleInputChange('dob', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Giới tính</label>
                  <select
                    value={formData.gender}
                    onChange={e => handleInputChange('gender', e.target.value)}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Lớp</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 5"
                    value={formData.grade}
                    onChange={e => handleInputChange('grade', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Mã lớp</label>
                  <input
                    type="number"
                    placeholder="Nhập mã lớp"
                    value={formData.classId}
                    onChange={e => handleInputChange('classId', e.target.value)}
                  />
                </div>
              </div>
            </fieldset>
            {/* CHỈ SỐ CƠ THỂ */}
            <fieldset>
              <legend className="section-title">CHỈ SỐ CƠ THỂ</legend>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Chiều cao (cm)</label>
                  <input
                    type="number"
                    placeholder="Ví dụ: 150.5"
                    value={formData.height}
                    onChange={e => handleInputChange('height', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Cân nặng (kg)</label>
                  <input
                    type="number"
                    placeholder="Ví dụ: 45.2"
                    value={formData.weight}
                    onChange={e => handleInputChange('weight', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">BMI</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ví dụ: 19.9"
                    value={formData.bmi}
                    onChange={e => handleInputChange('bmi', e.target.value)}
                  />
                </div>
              </div>
            </fieldset>
            {/* THÔNG TIN SỨC KHỎE */}
            <fieldset>
              <legend className="section-title">Thông tin sức khỏe</legend>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Dị ứng</label>
                  <textarea
                    placeholder="Nhập các loại dị ứng nếu có"
                    value={formData.allergy}
                    onChange={e => handleInputChange('allergy', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Bệnh mãn tính</label>
                  <textarea
                    placeholder="Nhập các bệnh mãn tính nếu có"
                    value={formData.chronicDisease}
                    onChange={e => handleInputChange('chronicDisease', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tiền sử bệnh</label>
                  <textarea
                    placeholder="Nhập tiền sử bệnh, điều trị..."
                    value={formData.medicalHistory}
                    onChange={e => handleInputChange('medicalHistory', e.target.value)}
                  />
                </div>
              </div>
            </fieldset>
            {/* KHÁM THỊ LỰC & THÍNH LỰC */}
            <fieldset>
              <legend className="section-title">Khám thị lực & thính lực</legend>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Thị lực (ví dụ: 10/10)</label>
                  <input
                    type="text"
                    placeholder="Nhập kết quả thị lực"
                    value={formData.vision}
                    onChange={e => handleInputChange('vision', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Thính lực</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Tốt"
                    value={formData.hearing}
                    onChange={e => handleInputChange('hearing', e.target.value)}
                  />
                </div>
              </div>
            </fieldset>
            <div className="form-note">
              <span>Thông tin sức khỏe của bạn sẽ được bảo mật và chỉ sử dụng cho mục đích chăm sóc sức khỏe tại trường.</span>
            </div>
            <div className="form-actions">
              <button type="submit" disabled={isSubmitting} className="submit-btn">
                {paramId ? 'CẬP NHẬT' : 'LƯU THÔNG TIN'}
              </button>
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
