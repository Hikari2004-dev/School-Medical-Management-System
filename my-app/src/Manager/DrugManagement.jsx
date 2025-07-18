import React, { useState } from "react";

const DrugManagement = () => {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    description: "",
    lastCheckedDate: new Date().toISOString().split("T")[0],
    expirationDate: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/medicalsupply/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Thêm vật tư thất bại");
      alert("Thêm vật tư thành công!");
      setForm({
        name: "",
        quantity: "",
        description: "",
        lastCheckedDate: new Date().toISOString().split("T")[0],
        expirationDate: "",
      });
    } catch (error) {
      alert("Thêm vật tư thất bại!");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-gray-100 rounded-xl p-6 max-w-4xl mx-auto shadow">
        <h2 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
          <span className="mr-2 text-2xl">🧪</span>
          Quản lý vật tư y tế
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-sm font-semibold mb-1">Tên vật tư</h2>
            <input
              type="text"
              placeholder="Tên vật tư"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border p-3 rounded w-full"
              required
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold mb-1">Số lượng</h2>
            <input
              type="number"
              placeholder="Số lượng"
              value={form.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
              className="border p-3 rounded w-full"
              required
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold mb-1">Mô tả</h2>
            <input
              type="text"
              placeholder="Mô tả"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="border p-3 rounded w-full"
              required
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold mb-1">Ngày kiểm tra</h2>
            <input
              type="date"
              value={form.lastCheckedDate}
              onChange={(e) => handleChange("lastCheckedDate", e.target.value)}
              className="border p-3 rounded w-full"
              required
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold mb-1">Ngày hết hạn</h2>
            <input
              type="date"
              value={form.expirationDate}
              onChange={(e) => handleChange("expirationDate", e.target.value)}
              className="border p-3 rounded w-full"
              required
            />
          </div>
        </form>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200"
          >
            + Thêm vật tư vào kho
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrugManagement;
