import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function HealthFormApp() {
  const [classes, setClasses] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    classId: "",
    relationship: "",
    allergy: "",
    chronicDisease: "",
    medicalHistory: "",
    vision: "",
    hearing: "",
    height: "",
    weight: "",
    bmi: "",
    grade: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      alert("Bạn cần đăng nhập để sử dụng chức năng này.");
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/api/classes")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => setClasses(data))
      .catch((err) =>
        setLoadError("Không thể tải danh sách lớp: " + err.message)
      );
  }, [navigate]);

  const handleChange = (field, value) =>
    setFormData((fd) => ({ ...fd, [field]: value }));

  const handleClassSelect = (value) => {
    const cls = classes.find((c) => c.id === Number(value));
    const grade = cls?.className.match(/^(\d+)/)?.[1] || "";
    setFormData((fd) => ({ ...fd, classId: value, grade }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const parentId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!parentId || isNaN(parentId)) {
        setSubmitMessage("Không tìm thấy tài khoản phụ huynh. Vui lòng đăng nhập lại.");
        setIsSubmitting(false);
        return;
      }

      if (!token) {
        setSubmitMessage("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        studentName: formData.fullName,
        dob: formData.dob,
        gender: formData.gender,
        grade: formData.grade,
        classId: Number(formData.classId),
        parentUserId: Number(parentId),
        relationship: formData.relationship,
        allergy: formData.allergy,
        chronicDisease: formData.chronicDisease,
        vision: formData.vision,
        hearing: formData.hearing,
        medicalHistory: formData.medicalHistory,
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        bmi: parseFloat(formData.bmi),
      };

      const res = await fetch("http://localhost:8080/api/students/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();

      if (!res.ok || text.toLowerCase().includes("lỗi")) {
        throw new Error(text || res.statusText);
      }

      setSubmitMessage("Lưu thành công!");
      setTimeout(() => navigate("/vaccine"), 1200);
    } catch (err) {
      console.error("❌ Lỗi gửi form:", err);
      setSubmitMessage("Có lỗi khi gửi: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      dob: "",
      gender: "",
      classId: "",
      relationship: "",
      allergy: "",
      chronicDisease: "",
      medicalHistory: "",
      vision: "",
      hearing: "",
      height: "",
      weight: "",
      bmi: "",
      grade: ""
    });
    setSubmitMessage("");
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 py-12 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            PHIẾU NHẬP THÔNG TIN SỨC KHỎE HỌC SINH
          </h1>
          {loadError && (
            <p className="text-red-600 text-center mb-4">{loadError}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="px-2 text-lg font-semibold text-gray-700">
                Thông tin cá nhân
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-gray-700">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    required
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-gray-700">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    required
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                  />
                </div>
                <div className="flex flex-col md:col-span-1">
                  <label className="mb-2 text-sm font-medium text-gray-700">
                    Giới tính
                  </label>
                  <select
                    required
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="px-2 text-lg font-semibold text-gray-700">
                Chọn lớp
              </legend>
              <div className="mt-4">
                <label className="mb-2 text-sm font-medium text-gray-700 block">
                  Lớp
                </label>
                <select
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.classId}
                  onChange={(e) => handleClassSelect(e.target.value)}
                >
                  <option value="">-- Chọn lớp --</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.className} – {c.room} 
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>

            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="px-2 text-lg font-semibold text-gray-700">
                Mối quan hệ với học sinh
              </legend>
              <div className="mt-4">
                <label className="mb-2 text-sm font-medium text-gray-700 block">
                  Quan hệ
                </label>
                <select
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.relationship}
                  onChange={(e) => handleChange("relationship", e.target.value)}
                >
                  <option value="">-- Chọn mối quan hệ --</option>
                  <option value="Father">Cha</option>
                  <option value="Mother">Mẹ</option>
                </select>
              </div>
            </fieldset>

            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="px-2 text-lg font-semibold text-gray-700">
                Chỉ số cơ thể
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-gray-700">
                    Chiều cao (cm)
                  </label>
                  <input
                    type="number"
                    required
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-gray-700">
                    Cân nặng (kg)
                  </label>
                  <input
                    type="number"
                    required
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-gray-700">
                    BMI
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.bmi}
                    onChange={(e) => handleChange("bmi", e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="px-2 text-lg font-semibold text-gray-700">
                Dị ứng
              </legend>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none mt-4 resize-none"
                value={formData.allergy}
                onChange={(e) => handleChange("allergy", e.target.value)}
              />
            </fieldset>

            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="px-2 text-lg font-semibold text-gray-700">
                Bệnh mãn tính
              </legend>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none mt-4 resize-none"
                value={formData.chronicDisease}
                onChange={(e) => handleChange("chronicDisease", e.target.value)}
              />
            </fieldset>

            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="px-2 text-lg font-semibold text-gray-700">
                Tiền sử bệnh
              </legend>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none mt-4 resize-none"
                value={formData.medicalHistory}
                onChange={(e) => handleChange("medicalHistory", e.target.value)}
              />
            </fieldset>

            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="px-2 text-lg font-semibold text-gray-700">
                Thị lực & Thính lực
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-gray-700">
                    Thị lực
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.vision}
                    onChange={(e) => handleChange("vision", e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-medium text-gray-700">
                    Thính lực
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.hearing}
                    onChange={(e) => handleChange("hearing", e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition"
              >
                LÀM LẠI
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50"
              >
                LƯU THÔNG TIN
              </button>
            </div>

            {submitMessage && (
              <p
                className={`mt-4 text-center font-medium ${
                  submitMessage.includes("Lưu thành công")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}