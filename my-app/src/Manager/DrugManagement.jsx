import React, { useState } from "react";

const DrugManagement = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    amount: "",
    unit: "",
    date: new Date().toISOString().split("T")[0],
    minStock: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Thuốc được thêm:", form);
    alert("Thuốc đã được thêm vào kho (xem console)!");
  };

  return (
    <div className="p-6">
      <div className="bg-gray-100 rounded-xl p-6 max-w-4xl mx-auto shadow">
        <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
          <span className="mr-2 text-2xl">🧪</span>
          Quản lý thuốc y tế
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Tên thuốc"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border p-3 rounded"
          />

          <select
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="border p-3 rounded"
          >
            <option value="">Loại thuốc</option>
            <option value="pill">Viên</option>
            <option value="syrup">Dung dịch</option>
            <option value="injection">Tiêm</option>
          </select>

          <input
            type="number"
            placeholder="Số lượng"
            value={form.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            className="border p-3 rounded"
          />

          <select
            value={form.unit}
            onChange={(e) => handleChange("unit", e.target.value)}
            className="border p-3 rounded"
          >
            <option value="">Đơn vị</option>
            <option value="viên">Viên</option>
            <option value="ml">ml</option>
            <option value="ống">Ống</option>
            <option value="hộp">Hộp</option>
          </select>

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Tồn kho tối thiểu"
            value={form.minStock}
            onChange={(e) => handleChange("minStock", e.target.value)}
            className="border p-3 rounded"
          />
        </form>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200"
          >
            + Thêm thuốc vào kho
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrugManagement;
