import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";      // ← thêm useNavigate
import "./vaccineForm.css";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const VaccineApp = () => {
  // Thêm state cho danh sách học sinh nếu trả về nhiều học sinh
  const [studentList, setStudentList] = useState([]);
  const navigate = useNavigate();                     // ← khởi tạo navigate

  // Thông tin học sinh lấy từ API
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentId, setStudentId] = useState("");

  // Ghi chú chung
  const [generalNote, setGeneralNote] = useState("");

  // Dữ liệu vaccine
  const [vaccineRecords, setVaccineRecords] = useState([]);
  const [vaccineFormData, setVaccineFormData] = useState({
    vaccineName: "",
    vaccineDate: "2025-06-11",
    batchNumber: "",
    doseNumber: "Mũi 1",
  });
  const [isChecked, setIsChecked] = useState(false);

  // Lấy thông tin học sinh từ API nếu có userId
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8080/api/students/my-children?userId=${userId}`, {
        headers: {
          "Authorization": token ? `Bearer ${token}` : ""
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("Không lấy được thông tin học sinh");
          return res.json();
        })
        .then(resData => {
          // Debug dữ liệu trả về
          console.log("Dữ liệu học sinh trả về:", resData);
          if (resData && Array.isArray(resData.data) && resData.data.length > 0) {
            setStudentList(resData.data);
            const student = resData.data[0];
            setStudentName(student.name || "");
            setStudentId(student.id || "");
            if (student.dateOfBirth) {
              console.log("dateOfBirth:", student.dateOfBirth);
              const birthYear = new Date(student.dateOfBirth).getFullYear();
              console.log("birthYear:", birthYear);
              setStudentAge(new Date().getFullYear() - birthYear);
            } else {
              setStudentAge("");
            }
          }
        })
        .catch((err) => {
          console.log("Lỗi lấy học sinh:", err);
          // fallback lấy từ localStorage nếu có
          const name = localStorage.getItem("studentName") || "";
          const birthYear = localStorage.getItem("studentBirthYear");
          if (birthYear) {
            setStudentAge(new Date().getFullYear() - parseInt(birthYear, 10));
          }
          setStudentName(name);
        });
    } else {
      // fallback lấy từ localStorage nếu không có userId
      const name = localStorage.getItem("studentName") || "";
      const birthYear = localStorage.getItem("studentBirthYear");
      if (birthYear) {
        setStudentAge(new Date().getFullYear() - parseInt(birthYear, 10));
      }
      setStudentName(name);
    }
    const saved = localStorage.getItem("schomed_vaccine_records");
    if (saved) setVaccineRecords(JSON.parse(saved));
  }, []);

  // save khi records thay đổi
  useEffect(() => {
    localStorage.setItem("schomed_vaccine_records", JSON.stringify(vaccineRecords));
  }, [vaccineRecords]);

  const handleAddVaccine = () => {
    if (!vaccineFormData.vaccineName || !vaccineFormData.batchNumber || !isChecked) {
      alert("Vui lòng điền đủ thông tin và xác nhận.");
      return;
    }
    const newRec = {
      id: Date.now().toString(),
      ...vaccineFormData,
      notes: generalNote,
    };
    setVaccineRecords(prev => [...prev, newRec]);
    // reset form
    setVaccineFormData({
      vaccineName: "",
      vaccineDate: "2025-06-11",
      batchNumber: "",
      doseNumber: "Mũi 1",
    });
    setGeneralNote("");
    setIsChecked(false);
    alert("Đã thêm vaccine");
  };

  const handleDeleteRecord = id => {
    setVaccineRecords(prev => prev.filter(r => r.id !== id));
    alert("Đã xóa vaccine");
  };

  const handleExport = () => {
    let csv = "data:text/csv;charset=utf-8,";
    csv += "Tên Vaccine,Ngày tiêm,Số lô,Mũi tiêm,Nơi tiêm,Bác sĩ,Ghi chú\n";
    vaccineRecords.forEach(r => {
      csv += `${r.vaccineName},${r.vaccineDate},${r.batchNumber},${r.doseNumber},, ,${r.notes || ""}\n`;
    });
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "vaccine_records.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ← Định nghĩa handleSubmit và dùng navigate
  const handleSubmit = () => {
    // Chuẩn bị dữ liệu gửi lên API mới
    const payload = {
      studentId: studentId ? parseInt(studentId, 10) : (localStorage.getItem("studentId") ? parseInt(localStorage.getItem("studentId"), 10) : 3),
      vaccineName: vaccineFormData.vaccineName,
      declaredDate: new Date().toISOString().slice(0, 10),
      notes: generalNote || "",
      status: "PENDING",
      doseNumber: vaccineFormData.doseNumber ? parseInt(vaccineFormData.doseNumber, 10) : 1,
      vaccineLot: vaccineFormData.batchNumber,
      consentVerified: isChecked
    };
    const token = localStorage.getItem("token");
    console.log("Token gửi đi:", token);
    fetch("http://localhost:8080/api/vaccination-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token // token lấy từ localStorage
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error("Lỗi gửi dữ liệu");
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        }
        return res.text();
      })
      .then(data => {
        alert("Đã nộp khai báo lên hệ thống!");
        navigate("/vaccinations");
      })
      .catch(err => {
        alert("Gửi dữ liệu thất bại: " + err.message);
      });
  };

  const handleReset = () => {
    setVaccineRecords([]);
    setVaccineFormData({
      vaccineName: "",
      vaccineDate: "2025-06-11",
      batchNumber: "",
      doseNumber: "Mũi 1",
    });
    setGeneralNote("");
    setIsChecked(false);
    localStorage.removeItem("schomed_vaccine_records");
    alert("Đã làm mới biểu mẫu");
  };

  return (
    <div className="vaccine-app">
      <Header />
      <main className="main-content">
        {/* Personal Info */}
        <section className="personal-info-section">
          <div className="section-header">
            <div className="section-icon">👨‍🎓</div>
            <h2 className="section-title">THÔNG TIN CÁ NHÂN</h2>
          </div>
          <div className="section-divider" />
          <div className="form-row">
            <div className="form-field">
              <label>Họ và tên học sinh</label>
              {studentList.length > 1 ? (
                <select
                  className="form-input"
                  value={studentId}
                  onChange={e => {
                    const selected = studentList.find(s => String(s.id) === e.target.value);
                    setStudentId(e.target.value);
                    setStudentName(selected ? selected.name : "");
                    if (selected && selected.dateOfBirth) {
                      const birthYear = new Date(selected.dateOfBirth).getFullYear();
                      setStudentAge(new Date().getFullYear() - birthYear);
                    } else {
                      setStudentAge("");
                    }
                  }}
                >
                  {studentList.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              ) : studentList.length === 1 ? (
                <input value={studentList[0].name} readOnly className="form-input" />
              ) : (
                <input value={studentName} readOnly className="form-input" />
              )}
            </div>
            <div className="form-field">
              <label>Tuổi</label>
              <input value={studentAge} readOnly className="form-input" />
            </div>
          </div>
        </section>

        {/* Vaccine Declaration + Ghi chú */}
        <section className="vaccine-declaration-section">
          <h2 className="section-title">KÊ KHAI VACCINE ĐÃ TIÊM</h2>
          <div className="section-divider" />

          {/* Ghi chú chung */}
          <div className="form-row">
            <div className="form-field" style={{ flex: 1 }}>
              <label className="field-label-simple">Ghi chú chung</label>
              <textarea
                className="form-input"
                style={{ height: 80, resize: "vertical" }}
                value={generalNote}
                onChange={e => setGeneralNote(e.target.value)}
                placeholder="Nhập ghi chú..."
              />
            </div>
          </div>

          {/* Vaccine inputs */}
          <div className="form-row">
            <div className="form-field">
              <label className="field-label-simple">Tên vaccine</label>
              <input
                className="form-input"
                value={vaccineFormData.vaccineName}
                onChange={e =>
                  setVaccineFormData(prev => ({ ...prev, vaccineName: e.target.value }))
                }
              />
            </div>
            <div className="form-field">
              <label className="field-label-simple">Ngày tiêm</label>
              <input
                type="date"
                className="form-input"
                value={vaccineFormData.vaccineDate}
                onChange={e =>
                  setVaccineFormData(prev => ({ ...prev, vaccineDate: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="field-label-simple">Số lô vaccine</label>
              <input
                className="form-input"
                placeholder="Nhập số lô (nếu có)"
                value={vaccineFormData.batchNumber}
                onChange={e =>
                  setVaccineFormData(prev => ({ ...prev, batchNumber: e.target.value }))
                }
              />
            </div>
            <div className="form-field">
              <label className="field-label-simple">Số mũi tiêm</label>
              <input
                className="form-input"
                value={vaccineFormData.doseNumber}
                onChange={e =>
                  setVaccineFormData(prev => ({ ...prev, doseNumber: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="checkbox-section">
            <input
              type="checkbox"
              className="checkbox-input"
              checked={isChecked}
              onChange={e => setIsChecked(e.target.checked)}
            />
            <span className="checkbox-label">
              Tôi xác nhận thông tin vaccine trên là chính xác
            </span>
          </div>

          <div className="add-button-container">
            <button onClick={handleAddVaccine} className="add-vaccine-button">
              THÊM VACCINE VÀO DANH SÁCH
            </button>
          </div>
        </section>

        {/* Table */}
        <section className="vaccine-records-section">
          <div className="records-header">
            <h2 className="section-title">DANH SÁCH VACCINE ĐÃ KÊ KHAI</h2>
            {vaccineRecords.length > 0 && (
              <button onClick={handleExport} className="export-button">
                📥 Xuất danh sách
              </button>
            )}
          </div>
          <div className="section-divider" />
          <div className="table-header">
            <div className="table-cell">Tên Vaccine</div>
            <div className="table-cell">Ngày tiêm</div>
            <div className="table-cell">Số mũi</div>
            <div className="table-cell">Số lô</div>
            <div className="table-cell">Tình trạng</div>
            <div className="table-cell">Ghi chú</div>
            <div className="table-cell">Xác nhận</div>
          </div>
          <div className="table-content">
            {vaccineRecords.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">💉</div>
                <div className="empty-title">
                  Chưa có vaccine nào được thêm
                </div>
              </div>
            ) : (
              <div className="table-rows">
                {vaccineRecords.map(r => (
                  <div key={r.id} className="table-row">
                    <div className="table-cell">{r.vaccineName}</div>
                    <div className="table-cell">{r.vaccineDate}</div>
                    <div className="table-cell">{r.doseNumber}</div>
                    <div className="table-cell">{r.batchNumber}</div>
                    <div className="table-cell">Đã tiêm</div>
                    <div className="table-cell">{r.notes || "-"}</div>
                    <div className="table-cell">
                      <button
                        onClick={() => handleDeleteRecord(r.id)}
                        className="delete-button"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Action Buttons */}
        <section className="action-buttons-section">
          <button onClick={handleSubmit} className="submit-button">
            HOÀN THÀNH KHAI BÁO
          </button>
          <button onClick={handleReset} className="reset-button">
            LÀM MỚI BIỂU MẪU
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VaccineApp;
