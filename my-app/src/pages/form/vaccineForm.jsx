import { useState, useEffect } from "react";
import "./vaccineForm.css";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const VaccineApp = () => {
    const [personalInfo, setPersonalInfo] = useState({
        studentName: "",
        studentClass: "",
        birthDate: "2025-06-11",
        studentId: "",
        parentName: "",
        phoneNumber: "",
        address: "",
        school: "",
    });

    const [vaccineRecords, setVaccineRecords] = useState([]);
    const [vaccineFormData, setVaccineFormData] = useState({
        vaccineName: "",
        vaccineDate: "2025-06-11",
        batchNumber: "",
        doseNumber: "Mũi 1",
    });
    const [isChecked, setIsChecked] = useState(false);

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedPersonalInfo = localStorage.getItem("schomed_personal_info");
        const savedVaccineRecords = localStorage.getItem("schomed_vaccine_records");

        if (savedPersonalInfo) {
            setPersonalInfo(JSON.parse(savedPersonalInfo));
        }
        if (savedVaccineRecords) {
            setVaccineRecords(JSON.parse(savedVaccineRecords));
        }
    }, []);

    // Save data to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem("schomed_personal_info", JSON.stringify(personalInfo));
    }, [personalInfo]);

    useEffect(() => {
        localStorage.setItem(
            "schomed_vaccine_records",
            JSON.stringify(vaccineRecords),
        );
    }, [vaccineRecords]);

    const handlePersonalInfoChange = (field, value) => {
        setPersonalInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddVaccine = () => {
        if (
            vaccineFormData.vaccineName &&
            vaccineFormData.batchNumber &&
            isChecked
        ) {
            const newRecord = {
                id: Date.now().toString(),
                ...vaccineFormData,
                vaccineCenter: "",
                doctorName: "",
                notes: "",
            };

            setVaccineRecords((prev) => [...prev, newRecord]);
            setVaccineFormData({
                vaccineName: "",
                vaccineDate: "2025-06-11",
                batchNumber: "",
                doseNumber: "Mũi 1",
            });
            setIsChecked(false);

            // Show success message (you can replace with your toast implementation)
            alert("Đã thêm vaccine vào danh sách");
        }
    };

    const handleDeleteRecord = (id) => {
        setVaccineRecords((prev) => prev.filter((record) => record.id !== id));
        alert("Đã xóa vaccine khỏi danh sách");
    };

    const handleSubmit = () => {
        alert("Đã nộp khai báo lên hệ thống");
    };

    const handleReset = () => {
        setPersonalInfo({
            studentName: "",
            studentClass: "",
            birthDate: "2025-06-11",
            studentId: "",
            parentName: "",
            phoneNumber: "",
            address: "",
            school: "",
        });
        setVaccineRecords([]);
        setVaccineFormData({
            vaccineName: "",
            vaccineDate: "2025-06-11",
            batchNumber: "",
            doseNumber: "Mũi 1",
        });
        setIsChecked(false);
        localStorage.removeItem("schomed_personal_info");
        localStorage.removeItem("schomed_vaccine_records");

        alert("Đã xóa toàn bộ dữ liệu");
    };

    const handleExport = () => {
        // Create CSV content
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Tên Vaccine,Ngày tiêm,Số lô,Mũi tiêm,Nơi tiêm,Bác sĩ,Ghi chú\n";

        vaccineRecords.forEach(record => {
            csvContent += `${record.vaccineName},${record.vaccineDate},${record.batchNumber},${record.doseNumber},${record.vaccineCenter || ''},${record.doctorName || ''},${record.notes || ''}\n`;
        });

        // Create download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "vaccine_records.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="vaccine-app">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="main-content">
                {/* Hero Content Inside */}
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            KHAI BÁO LỊCH SỬ TIÊM VACCINE HỌC SINH
                        </h1>
                        <p className="hero-subtitle">
                            Cập nhật đầy đủ thông tin các mũi tiêm để đảm bảo sức khỏe cho học sinh
                        </p>
                    </div>
                    <div className="decorative-circle-1"></div>
                    <div className="decorative-circle-2"></div>
                </div>

                {/* Personal Information Section */}
                <section className="personal-info-section">
                    <div className="section-header">
                        <div className="section-icon">👨‍🎓</div>
                        <h2 className="section-title">THÔNG TIN CÁ NHÂN</h2>
                    </div>
                    <div className="section-divider"></div>

                    {/* Form Fields Row 1 */}
                    <div className="form-row">
                        <div className="form-field">
                            <div className="field-label">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d248603585290f5fa82e602a36a97693c9502090?width=64"
                                    alt="Person"
                                    className="field-icon"
                                />
                                <label>Họ và tên học sinh</label>
                            </div>
                            <div className="input-wrapper">
                                <input
                                    placeholder="Nhập họ và tên đầy đủ"
                                    value={personalInfo.studentName}
                                    onChange={(e) =>
                                        handlePersonalInfoChange("studentName", e.target.value)
                                    }
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <div className="field-label">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/707124960a0a5bd7ba5a04135e5398549610d91a?width=64"
                                    alt="School"
                                    className="field-icon"
                                />
                                <label>Lớp</label>
                            </div>
                            <div className="input-wrapper">
                                <input
                                    placeholder="Ví dụ: 5A"
                                    value={personalInfo.studentClass}
                                    onChange={(e) =>
                                        handlePersonalInfoChange("studentClass", e.target.value)
                                    }
                                    className="form-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Fields Row 2 */}
                    <div className="form-row">
                        <div className="form-field">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee5567ffa09de3878e11a1998ce77be49e46ea30?width=64"
                                alt="Calendar"
                                className="calendar-icon"
                            />
                            <label className="field-label-simple">Ngày sinh</label>
                            <div className="input-wrapper date-wrapper">
                                <input
                                    type="date"
                                    value={personalInfo.birthDate}
                                    onChange={(e) =>
                                        handlePersonalInfoChange("birthDate", e.target.value)
                                    }
                                    className="form-input date-input"
                                />

                            </div>
                        </div>

                        <div className="form-field">
                            <div className="field-label">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/446903e0d4237bedba5684d26a2e09ae630b47d6?width=64"
                                    alt="Student ID"
                                    className="field-icon"
                                />
                                <label>Mã học sinh</label>
                            </div>
                            <div className="input-wrapper">
                                <input
                                    placeholder="Nhập mã học sinh"
                                    value={personalInfo.studentId}
                                    onChange={(e) =>
                                        handlePersonalInfoChange("studentId", e.target.value)
                                    }
                                    className="form-input"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vaccine Declaration Section */}
                <section className="vaccine-declaration-section">
                    <h2 className="section-title">KÊ KHAI VACCINE ĐÃ TIÊM</h2>
                    <div className="section-divider"></div>

                    {/* Vaccine Form Row 1 */}
                    <div className="form-row">
                        <div className="form-field">
                            <label className="field-label-simple">Tên vaccine</label>
                            <div className="input-wrapper">
                                <input
                                    value={vaccineFormData.vaccineName}
                                    onChange={(e) =>
                                        setVaccineFormData((prev) => ({
                                            ...prev,
                                            vaccineName: e.target.value,
                                        }))
                                    }
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <label className="field-label-simple">Ngày tiêm</label>
                            <div className="input-wrapper">
                                <input
                                    type="date"
                                    value={vaccineFormData.vaccineDate}
                                    onChange={(e) =>
                                        setVaccineFormData((prev) => ({
                                            ...prev,
                                            vaccineDate: e.target.value,
                                        }))
                                    }
                                    className="form-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vaccine Form Row 2 */}
                    <div className="form-row">
                        <div className="form-field">
                            <label className="field-label-simple">Số lô vaccine</label>
                            <div className="input-wrapper">
                                <input
                                    placeholder="Nhập số lô (nếu có)"
                                    value={vaccineFormData.batchNumber}
                                    onChange={(e) =>
                                        setVaccineFormData((prev) => ({
                                            ...prev,
                                            batchNumber: e.target.value,
                                        }))
                                    }
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <label className="field-label-simple">Số mũi tiêm</label>
                            <div className="input-wrapper">
                                <input
                                    value={vaccineFormData.doseNumber}
                                    onChange={(e) =>
                                        setVaccineFormData((prev) => ({
                                            ...prev,
                                            doseNumber: e.target.value,
                                        }))
                                    }
                                    className="form-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="checkbox-section">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="checkbox-input"
                        />
                        <span className="checkbox-label">
                            Tôi xác nhận thông tin vaccine trên là chính xác và đã được phụ
                            huynh kiểm tra
                        </span>
                    </div>

                    {/* Add Vaccine Button */}
                    <div className="add-button-container">
                        <button onClick={handleAddVaccine} className="add-vaccine-button">
                            <div className="plus-icon">
                                <div className="plus-vertical"></div>
                                <div className="plus-horizontal"></div>
                            </div>
                            THÊM VACCINE VÀO DANH SÁCH
                        </button>
                    </div>
                </section>

                {/* Vaccine Records Table */}
                <section className="vaccine-records-section">
                    <div className="records-header">
                        <h2 className="section-title">DANH SÁCH VACCINE ĐÃ KÊ KHAI</h2>
                        {vaccineRecords.length > 0 && (
                            <button onClick={handleExport} className="export-button">
                                📥 Xuất danh sách
                            </button>
                        )}
                    </div>
                    <div className="section-divider"></div>

                    {/* Table Header */}
                    <div className="table-header">
                        <div className="table-cell">Tên Vaccine</div>
                        <div className="table-cell">Ngày tiêm</div>
                        <div className="table-cell">Số mũi</div>
                        <div className="table-cell">Số lô</div>
                        <div className="table-cell">Tình trạng</div>
                        <div className="table-cell">Ghi chú</div>
                        <div className="table-cell">Xác nhận</div>
                    </div>

                    {/* Table Content */}
                    <div className="table-content">
                        {vaccineRecords.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">💉</div>
                                <div className="empty-title">
                                    Chưa có vaccine nào được thêm vào
                                </div>
                                <div className="empty-subtitle">
                                    Vui lòng thêm vaccine bằng nút "THÊM VACCINE VÀO DANH SÁCH"
                                    bên trên
                                </div>
                            </div>
                        ) : (
                            <div className="table-rows">
                                {vaccineRecords.map((record, index) => (
                                    <div key={record.id} className="table-row">
                                        <div className="table-cell">{record.vaccineName}</div>
                                        <div className="table-cell">{record.vaccineDate}</div>
                                        <div className="table-cell">{record.doseNumber}</div>
                                        <div className="table-cell">{record.batchNumber}</div>
                                        <div className="table-cell">Đã tiêm</div>
                                        <div className="table-cell">-</div>
                                        <div className="table-cell">
                                            <button
                                                onClick={() => handleDeleteRecord(record.id)}
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

            {/* Footer */}
            <Footer />
            
        </div>
    );
};

export default VaccineApp;
