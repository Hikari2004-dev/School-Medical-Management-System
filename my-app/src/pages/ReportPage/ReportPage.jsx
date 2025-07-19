import React, { useState } from "react";
import "./ReportPage.css";
import LogoImg from "../../image/hinhanh/logoproject.png";

const ReportPage = () => {
  const [formData, setFormData] = useState({
    errorType: "",
    errorDetails: "",
    expectedResult: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("errorType", formData.errorType);
    data.append("errorDetails", formData.errorDetails);
    data.append("expectedResult", formData.expectedResult);
    if (formData.file) {
      data.append("file", formData.file);
    }

    // Lấy token từ localStorage với key "accessToken"
    const token = localStorage.getItem("token"); // Đổi từ "accessToken" sang "token"

    try {
      const response = await fetch("http://localhost:8080/api/reports/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        alert("✅ Báo cáo đã gửi thành công!");
        console.log("Server response:", result);
      } else {
        alert("❌ Gửi báo cáo thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      alert("⚠️ Đã xảy ra lỗi khi gửi báo cáo.");
    }
  };

  console.log(localStorage.getItem("token"));

  return (
    <div className="report-wrapper">
      <div className="report-header">
        <img src={LogoImg} alt="Logo" className="report-logo" />
        <h1>Báo Cáo Lỗi</h1>
        <p>Giúp chúng tôi cải thiện chất lượng dịch vụ</p>
      </div>
      <form className="report-form" onSubmit={handleSubmit}>
        <h3 className="section-title">Chi tiết lỗi</h3>

        <div className="input-group">
          <label>Loại lỗi</label>
          <select name="errorType" onChange={handleChange} required>
            <option value="">Chọn loại lỗi</option>
            <option value="frontend">Lỗi giao diện</option>
            <option value="backend">Lỗi hệ thống</option>
            <option value="khac">Khác</option>
          </select>
        </div>

        <div className="input-group">
          <label>
            Mô tả chi tiết lỗi <span className="required">*</span>
          </label>
          <textarea
            name="errorDetails"
            placeholder="Vui lòng mô tả chi tiết lỗi bạn gặp phải..."
            maxLength={1000}
            required
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Kết quả mong muốn</label>
          <textarea
            name="expectedResult"
            placeholder="Bạn mong muốn hệ thống xử lý ra sao?"
            maxLength={500}
            onChange={handleChange}
          />
        </div>

        <h3 className="section-title">Tài liệu đính kèm</h3>
        <div className="input-group file-upload">
          <label>
            Đính kèm file
            <span className="file-info-icon" title="Chấp nhận hình ảnh hoặc PDF">
              {" "}ℹ️
            </span>
          </label>
          <div className="upload-box">
            <input type="file" name="file" onChange={handleChange} />
            <span>📎 Chọn hoặc kéo thả file vào đây</span>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Gửi báo cáo lỗi
        </button>
      </form>
    </div>
  );
};

export default ReportPage;
