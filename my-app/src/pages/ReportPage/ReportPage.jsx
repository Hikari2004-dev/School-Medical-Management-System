    import React, { useState } from "react";
    import "./ReportPage.css";
    import LogoImg from '../../image/hinhanh/logoproject.png';

    const ReportPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // Handle submit logic (e.g., API)
    };

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
            <select name="errorType" onChange={handleChange}>
                <option value="">Chọn loại lỗi</option>
                <option value="frontend">Lỗi giao diện</option>
                <option value="backend">Lỗi hệ thống</option>
                <option value="khac">Khác</option>
            </select>
            </div>
            <div className="input-group">
            <label>Mô tả chi tiết lỗi <span className="required">*</span></label>
            <textarea
                name="errorDetails"
                placeholder="Vui lòng mô tả chi tiết lỗi bạn gặp phải, bao gồm các bước tái hiện lỗi và thông báo lỗi (nếu có)..."
                maxLength={1000}
                required
                onChange={handleChange}
            />
            <div className="char-limit">0/1000 ký tự</div>
            </div>
            <div className="input-group">
            <label>Kết quả mong muốn</label>
            <textarea
                name="expectedResult"
                placeholder="Mô tả kết quả bạn mong muốn thay vì lỗi hiện tại..."
                maxLength={500}
                onChange={handleChange}
            />
            <div className="char-limit">0/500 ký tự</div>
            </div>

            <h3 className="section-title">Tài liệu đính kèm</h3>
            <div className="input-group file-upload">
            <label>
                Đính kèm file
                <span className="file-info-icon" title="Chấp nhận các định dạng hình ảnh hoặc PDF"> ℹ️</span>
            </label>
            <div className="upload-box">
                <input type="file" name="file" onChange={handleChange} />
                <span>📎 Chọn hoặc kéo thả file vào đây</span>
            </div>
            </div>

            <button type="submit" className="submit-btn">Gửi báo cáo lỗi</button>
        </form>
        </div>
    );
    };

    export default ReportPage;
