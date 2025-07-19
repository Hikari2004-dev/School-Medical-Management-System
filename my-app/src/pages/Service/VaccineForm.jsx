import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './VaccineForm.css';

export default function VaccineForm() {
  const [minDate, setMinDate] = useState('');
  const [vaccines, setVaccines] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    studentName: "",
    age: "",
    vaccineName: "",
    vaccinationDate: "",
    vaccinationTime: "",
    location: "",
    notes: ""
  });

  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/vaccinations')
      .then(res => setVaccines(res.data))
      .catch(err => console.error('Lỗi khi lấy danh sách vaccine:', err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/parent-info/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        setUserInfo(res.data);
      })
      .catch(err => console.error("Lỗi khi lấy thông tin phụ huynh:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/students/by-parent/5", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        const studentList = res.data?.data || [];
        setStudents(studentList);

        if (studentList.length > 0) {
          const student = studentList[0];
          const dob = new Date(student.dateOfBirth);
          const today = new Date();
          let age = today.getFullYear() - dob.getFullYear();
          const m = today.getMonth() - dob.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
          }

          setFormData(prev => ({
            ...prev,
            studentName: student.name,
            age: age.toString()
          }));
        }
      })
      .catch(err => console.error("Lỗi khi lấy danh sách học sinh:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      vaccineName: formData.vaccineName,
      vaccinationDate: formData.vaccinationDate,
      status: "Pending",
      confirmed: false,
      studentId: students[0]?.id || null,
      declaredByParent: true,
      declaredDate: new Date().toISOString().split('T')[0],
      notes: formData.notes,
      batchId: 2
    };

    axios.post("http://localhost:8080/api/vaccinations", postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(() => {
        alert("Đăng ký tiêm vaccine thành công!");
        setFormData(prev => ({
          ...prev,
          vaccineName: "",
          vaccinationDate: "",
          vaccinationTime: "",
          location: "",
          notes: ""
        }));
      })
      .catch(err => {
        console.error("Lỗi khi gửi đăng ký:", err);
        alert("Đăng ký thất bại.");
      });
  };

  return (
    <>
      <Header />
      <div className="vaccine-page">
        <nav className="vaccine-breadcrumb">
          <Link to="/" className="breadcrumb-link">Trang chủ</Link>
          <span className="breadcrumb-sep">›</span>
          <Link to="/services" className="breadcrumb-link">Dịch vụ</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Đăng kí Vaccine</span>
        </nav>

        <h1 className="vaccine-main-title">Đặt Lịch Tiêm Vaccine</h1>
        <p className="vaccine-subtitle">Chỉ cần vài bước đơn giản, chúng tôi sẽ nhắc bạn đúng lịch.</p>

        <div className="vaccine-content">
          <div className="vaccine-form-wrapper">
            <form className="vaccine-form" onSubmit={handleSubmit}>
              <div className="vaccine-grid">
                <div className="vaccine-field">
                  <label>Tên học sinh <span className="required">*</span></label>
                  <input type="text" name="studentName" value={formData.studentName} readOnly />
                </div>

                <div className="vaccine-field">
                  <label>Tuổi <span className="required">*</span></label>
                  <input type="number" name="age" value={formData.age} readOnly />
                </div>

                <div className="vaccine-field">
                  <label>Số điện thoại <span className="required">*</span></label>
                  <input type="tel" value={userInfo?.phone || ""} readOnly />
                </div>

                <div className="vaccine-field">
                  <label>Email</label>
                  <input type="email" value={userInfo?.email || ""} readOnly />
                </div>

                <div className="vaccine-field">
                  <label>Loại vaccine <span className="required">*</span></label>
                  <select name="vaccineName" value={formData.vaccineName} onChange={handleChange}>
                    <option value="" disabled>Chọn loại vaccine</option>
                    {vaccines.map((v, i) => (
                      <option key={i} value={v.vaccineName || v.title}>
                        {v.vaccineName || v.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="vaccine-field">
                  <label>Ngày hẹn <span className="required">*</span></label>
                  <input type="date" name="vaccinationDate" min={minDate} value={formData.vaccinationDate} onChange={handleChange} />
                </div>

                <div className="vaccine-field">
                  <label>Giờ hẹn <span className="required">*</span></label>
                  <input type="time" name="vaccinationTime" value={formData.vaccinationTime} onChange={handleChange} />
                </div>

                <div className="vaccine-field">
                  <label>Địa điểm</label>
                  <select name="location" value={formData.location} onChange={handleChange}>
                    <option value="" disabled>Chọn địa điểm</option>
                    <option>Trường Học</option>
                  </select>
                </div>
              </div>

              <div className="vaccine-field full-width">
                <label>Ghi chú</label>
                <textarea name="notes" rows={3} value={formData.notes} onChange={handleChange} placeholder="Ghi chú đặc biệt (nếu có)..." />
              </div>

              <button type="submit" className="vaccine-submit">Đăng Ký Tiêm Vaccine</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
