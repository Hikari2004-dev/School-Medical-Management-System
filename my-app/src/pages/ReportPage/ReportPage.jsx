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

  // Lấy danh sách báo cáo
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setReports(data);
        }
      } catch (err) {
        console.error("Lỗi khi lấy danh sách báo cáo:", err);
      }
    };
    fetchReports();
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Gửi báo cáo lỗi mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const payload = {
      errorType: formData.errorType,
      description: formData.errorDetails,
      resultExpected: formData.expectedResult,
      fileAttachment: formData.file?.name || "",
      userId,
      status: "Pending",
    };

    try {
      const res = await fetch("http://localhost:8080/api/reports/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const newReport = {
          reportId: Math.random().toString(36).substring(2),
          createdAt: new Date().toISOString().split("T")[0],
          ...payload,
        };
        setReports((prev) => [newReport, ...prev]);
        setFormData({
          errorType: "",
          errorDetails: "",
          expectedResult: "",
          file: null,
        });
        setShowReportForm(false);
        alert("✅ Báo cáo đã gửi thành công!");
      } else {
        alert("❌ Gửi báo cáo thất bại.");
      }
    } catch (err) {
      console.error("Gửi báo cáo thất bại:", err);
      alert("⚠️ Có lỗi khi gửi báo cáo.");
    }
  };

  // Cập nhật báo cáo
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/api/reports/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reportId: editReportId, ...editData }),
      });

      if (res.ok) {
        alert("✅ Cập nhật thành công!");
        setReports((prev) =>
          prev.map((r) =>
            r.reportId === editReportId ? { ...r, ...editData } : r
          )
        );
        setEditReportId(null);
      } else {
        alert("❌ Cập nhật thất bại.");
      }
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("⚠️ Lỗi khi cập nhật báo cáo.");
    }
  };

  // Xóa báo cáo
  const handleDeleteReport = async (reportId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Bạn có chắc muốn xóa báo cáo này?")) return;
    try {
      const res = await fetch(
        `http://localhost:8080/api/reports/delete/${reportId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        setReports((prev) => prev.filter((r) => r.reportId !== reportId));
        alert("✅ Đã xóa thành công!");
      } else {
        alert("❌ Xóa thất bại.");
      }
    } catch (err) {
      console.error("Lỗi xóa báo cáo:", err);
      alert("⚠️ Có lỗi xảy ra khi xóa.");
    }
  };

  // Click chỉnh sửa
  const handleEditClick = (report) => {
    setEditReportId(report.reportId);
    setEditData({
      errorType: report.errorType,
      description: report.description,
      resultExpected: report.resultExpected,
      status: report.status,
    });
  };

  // Xử lý form edit
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
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
              <p className="no-report">Chưa có báo cáo lỗi nào.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Ngày tạo</th>
                    <th>Loại lỗi</th>
                    <th>Mô tả</th>
                    <th>Kết quả mong muốn</th>
                    <th>File</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.reportId}>
                      <td>{r.createdAt}</td>
                      <td>
                        {editReportId === r.reportId ? (
                          <select
                            name="errorType"
                            value={editData.errorType}
                            onChange={handleEditChange}
                          >
                            <option value="frontend">Giao diện</option>
                            <option value="backend">Hệ thống</option>
                            <option value="khac">Khác</option>
                          </select>
                        ) : (
                          r.errorType
                        )}
                      </td>
                      <td>
                        {editReportId === r.reportId ? (
                          <textarea
                            name="description"
                            value={editData.description}
                            onChange={handleEditChange}
                          />
                        ) : (
                          r.description
                        )}
                      </td>
                      <td>
                        {editReportId === r.reportId ? (
                          <textarea
                            name="resultExpected"
                            value={editData.resultExpected}
                            onChange={handleEditChange}
                          />
                        ) : (
                          r.resultExpected
                        )}
                      </td>
                      <td>
                        {r.fileAttachment ? (
                          <a
                            href={r.fileAttachment}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Xem file
                          </a>
                        ) : (
                          "Không có"
                        )}
                      </td>
                      <td>
                        {editReportId === r.reportId ? (
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
                              fontWeight: 600,
                              color:
                                r.status === "Pending"
                                  ? "#eab308"
                                  : r.status === "Resolved"
                                  ? "#22c55e"
                                  : "#ef4444",
                            }}
                          >
                            {r.status}
                          </span>
                        )}
                      </td>
                      <td>
                        {editReportId === r.reportId ? (
                          <>
                            <button
                              className="submit-btn"
                              onClick={handleEditSubmit}
                            >
                              Lưu
                            </button>
                            <button
                              className="submit-btn"
                              style={{ background: "#ef4444" }}
                              onClick={() => setEditReportId(null)}
                            >
                              Hủy
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="submit-btn"
                              onClick={() => handleEditClick(r)}
                            >
                              Sửa
                            </button>
                            <button
                              className="submit-btn"
                              style={{ background: "#ef4444" }}
                              onClick={() => handleDeleteReport(r.reportId)}
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
          onClick={() => setShowReportForm((prev) => !prev)}
        >
          {showReportForm ? "Đóng biểu mẫu" : "Gửi báo cáo lỗi mới"}
        </button>

        {showReportForm && (
          <form className="report-form" onSubmit={handleSubmit}>
            <h3 className="section-title">Chi tiết lỗi</h3>
            <div className="input-group">
              <label>Loại lỗi</label>
              <select
                name="errorType"
                value={formData.errorType}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn loại lỗi --</option>
                <option value="frontend">Giao diện</option>
                <option value="backend">Hệ thống</option>
                <option value="khac">Khác</option>
              </select>
            </div>
            <div className="input-group">
              <label>
                Mô tả lỗi <span className="required">*</span>
              </label>
              <textarea
                name="errorDetails"
                value={formData.errorDetails}
                onChange={handleChange}
                required
                placeholder="Chi tiết lỗi bạn gặp..."
              />
            </div>
            <div className="input-group">
              <label>Kết quả mong muốn</label>
              <textarea
                name="expectedResult"
                value={formData.expectedResult}
                onChange={handleChange}
                placeholder="Bạn mong muốn hệ thống xử lý ra sao?"
              />
            </div>
            <div className="input-group file-upload">
              <label>
                Đính kèm file{" "}
                <span className="file-info-icon" title="Chấp nhận hình ảnh/PDF">
                  ℹ️
                </span>
              </label>
              <div className="upload-box">
                <input
                  type="file"
                  name="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleChange}
                />
                <span>📎 Kéo thả hoặc chọn file</span>
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
