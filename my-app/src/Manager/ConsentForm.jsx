import React, { useState } from "react";

const ConsentForm = () => {
    const [formData, setFormData] = useState({
        studentName: "",
        className: "",
        consent: "",
        note: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { studentName, className, consent, note } = formData;

        const content = `
      Họ tên học sinh: ${studentName}
      Lớp: ${className}
      Ý kiến phụ huynh: ${consent}
      Ghi chú thêm: ${note}
    `;

        try {
            const res = await fetch("http://localhost:8080/api/send-consent-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    subject: "Xác nhận tiêm vaccine",
                    content: content,
                    to: "school@example.com",
                }),
            });

            if (res.ok) {
                alert("Gửi xác nhận thành công!");
                setFormData({ studentName: "", className: "", consent: "", note: "" });
            } else {
                alert("Lỗi khi gửi email.");
            }
        } catch (error) {
            alert("Không thể kết nối đến máy chủ.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
                    Phiếu Xác Nhận Tiêm Vaccine
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Họ tên học sinh</label>
                        <input
                            type="text"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Lớp</label>
                        <input
                            type="text"
                            name="className"
                            value={formData.className}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Ý kiến phụ huynh</label>
                        <select
                            name="consent"
                            value={formData.consent}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">-- Chọn --</option>
                            <option value="Đồng ý tiêm">Đồng ý tiêm</option>
                            <option value="Không đồng ý tiêm">Không đồng ý tiêm</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Ghi chú thêm</label>
                        <textarea
                            name="note"
                            rows="4"
                            value={formData.note}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-medium transition"
                    >
                        Gửi xác nhận
                    </button>

                    <p className="text-sm text-gray-500 text-center">
                        Thông tin sẽ được gửi về nhà trường qua email.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ConsentForm;
