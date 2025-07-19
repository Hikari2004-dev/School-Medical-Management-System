import React, { useState, useEffect } from "react";
import "./ReportPage.css";
import LogoImg from "../../image/hinhanh/logoproject.png";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const ReportPage = () => {
  const [formData, setFormData] = useState({
    errorType: "",
    errorDetails: "",
    expectedResult: "",
    file: null,
  });
  const [reports, setReports] = useState([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [editReportId, setEditReportId] = useState(null);
  const [editData, setEditData] = useState({
    errorType: "",
    description: "",
    resultExpected: "",
    status: "",
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách báo cáo:", error);
      }
    };
    fetchReports();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // Tạo object JSON đúng cấu trúc backend yêu cầu
    const reportData = {
      description: formData.errorDetails,
      resultExpected: formData.expectedResult,
      fileAttachment: formData.file ? formData.file.name : "",
      errorType: formData.errorType,
      userId: localStorage.getItem("userId"), // Lấy userId động từ localStorage
      status: "Pending",
    };

    try {
      const response = await fetch("http://localhost:8080/api/reports/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        // Tạo object mới để thêm vào danh sách báo cáo
        const newReport = {
          reportId: Math.random().toString(36).slice(2), // Tạo id tạm thời (nếu backend không trả về)
          createdAt: new Date().toISOString().split("T")[0],
          errorType: formData.errorType,
          description: formData.errorDetails,
          resultExpected: formData.expectedResult,
          fileAttachment: formData.file ? formData.file.name : "",
          status: "Pending",
        };
        setReports((prev) => [newReport, ...prev]);
        setShowReportForm(false);
        setFormData({
          errorType: "",
          errorDetails: "",
          expectedResult: "",
          file: null,
        });
        alert("✅ Báo cáo đã gửi thành công!");
      } else {
        alert("❌ Gửi báo cáo thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      alert("⚠️ Đã xảy ra lỗi khi gửi báo cáo.");
    }
  };

  // Thêm hàm cập nhật báo cáo
  const handleUpdateReport = async (reportId, updatedData) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/api/reports/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reportId,
          ...updatedData,
        }),
      });
      if (response.ok) {
        alert("✅ Cập nhật báo cáo thành công!");
        // Cập nhật lại danh sách báo cáo nếu cần
        // Ví dụ: fetchReports();
      } else {
        alert("❌ Cập nhật báo cáo thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật báo cáo:", error);
      alert("⚠️ Đã xảy ra lỗi khi cập nhật báo cáo.");
    }
  };

  const handleDeleteReport = async (reportId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Bạn có chắc muốn xóa báo cáo này?")) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/reports/delete/${reportId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert("✅ Xóa báo cáo thành công!");
        setReports((prev) => prev.filter((r) => r.reportId !== reportId));
      } else {
        alert("❌ Xóa báo cáo thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa báo cáo:", error);
      alert("⚠️ Đã xảy ra lỗi khi xóa báo cáo.");
    }
  };

  const handleEditClick = (report) => {
    setEditReportId(report.reportId);
    setEditData({
      errorType: report.errorType,
      description: report.description,
      resultExpected: report.resultExpected,
      status: report.status,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateReport(editReportId, editData);
    setEditReportId(null);
    // Optionally update local state for instant UI feedback
    setReports((prev) =>
      prev.map((r) => (r.reportId === editReportId ? { ...r, ...editData } : r))
    );
  };

  return (
    <>
      <Header />
      <div className="report-wrapper">
        <div className="report-header">
          <img src={LogoImg} alt="Logo" className="report-logo" />
          <h1>Báo Cáo Lỗi</h1>
          <p>Giúp chúng tôi cải thiện chất lượng dịch vụ</p>
        </div>
        <div className="report-list">
          <h2>Danh sách báo cáo lỗi</h2>
          <div className="report-list-table">
            {reports.length === 0 ? (
              <div className="no-report">Chưa có báo cáo lỗi nào.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Ngày tạo</th>
                    <th>Loại lỗi</th>
                    <th>Mô tả</th>
                    <th>Kết quả mong muốn</th>
                    <th>File đính kèm</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.reportId}>
                      <td>{report.createdAt}</td>
                      <td>
                        {editReportId === report.reportId ? (
                          <select
                            name="errorType"
                            value={editData.errorType}
                            onChange={handleEditChange}
                          >
                            <option value="frontend">Lỗi giao diện</option>
                            <option value="backend">Lỗi hệ thống</option>
                            <option value="khac">Khác</option>
                            <option value="Software">Software</option>
                          </select>
                        ) : (
                          report.errorType
                        )}
                      </td>
                      <td>
                        {editReportId === report.reportId ? (
                          <textarea
                            name="description"
                            value={editData.description}
                            onChange={handleEditChange}
                          />
                        ) : (
                          report.description
                        )}
                      </td>
                      <td>
                        {editReportId === report.reportId ? (
                          <textarea
                            name="resultExpected"
                            value={editData.resultExpected}
                            onChange={handleEditChange}
                          />
                        ) : (
                          report.resultExpected
                        )}
                      </td>
                      <td>
                        {report.fileAttachment ? (
                          <a
                            href={report.fileAttachment}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Xem file
                          </a>
                        ) : (
                          "Không có"
                        )}
                      </td>
                      <td>
                        {editReportId === report.reportId ? (
                          <select
                            name="status"
                            value={editData.status}
                            onChange={handleEditChange}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        ) : (
                          <span
                            style={{
                              color:
                                report.status === "Pending"
                                  ? "#eab308"
                                  : report.status === "Resolved"
                                    ? "#22c55e"
                                    : "#ef4444",
                              fontWeight: 600,
                            }}
                          >
                            {report.status}
                          </span>
                        )}
                      </td>
                      <td>
                        {editReportId === report.reportId ? (
                          <>
                            <button
                              className="submit-btn"
                              style={{ marginRight: 8, padding: "4px 10px" }}
                              onClick={handleEditSubmit}
                            >
                              Lưu
                            </button>
                            <button
                              className="submit-btn"
                              style={{
                                background: "#ef4444",
                                color: "#fff",
                                padding: "4px 10px",
                              }}
                              onClick={() => setEditReportId(null)}
                              type="button"
                            >
                              Hủy
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="submit-btn"
                              style={{ padding: "4px 10px", marginRight: 8 }}
                              onClick={() => handleEditClick(report)}
                              type="button"
                            >
                              Sửa
                            </button>
                            <button
                              className="submit-btn"
                              style={{
                                background: "#ef4444",
                                color: "#fff",
                                padding: "4px 10px",
                              }}
                              onClick={() => handleDeleteReport(report.reportId)}
                              type="button"
                            >
                              Xóa
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <button
          className="submit-btn"
          style={{
            margin: "32px 0 20px 0",
            background: "#2563eb",
            color: "#fff",
          }}
          onClick={() => setShowReportForm((prev) => !prev)}
        >
          {showReportForm
            ? "Đóng biểu mẫu báo cáo lỗi"
            : "Gửi báo cáo lỗi mới"}
        </button>
        {showReportForm && (
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
                  {" "}
                  ℹ️
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
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReportPage;
