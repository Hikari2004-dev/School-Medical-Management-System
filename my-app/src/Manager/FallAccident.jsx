import React, { useState } from "react";

const FallAcident = () => {
  const [incident, setIncident] = useState({
    fullName: "",
    studentClass: "",
    date: new Date().toISOString().slice(0, 10),
    address: "",
    details: "",
    typeOfInjury: "",
    severity: "",
    medications: [{ name: "", amount: "" }],
  });

  const handleChange = (field, value) => {
    setIncident({ ...incident, [field]: value });
  };

  const handleMedicationChange = (index, field, value) => {
    const newMeds = [...incident.medications];
    newMeds[index][field] = value;
    setIncident({ ...incident, medications: newMeds });
  };

  const addMedication = () => {
    setIncident({
      ...incident,
      medications: [...incident.medications, { name: "", amount: "" }],
    });
  };

  const removeMedication = (index) => {
    const newMeds = incident.medications.filter((_, i) => i !== index);
    setIncident({ ...incident, medications: newMeds });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu sự cố đã lưu:", incident);
    alert("Đã lưu sự cố (xem console)!");
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-blue-700 mb-6 flex items-center">
          <span className="text-2xl mr-2">🩹</span>
          Ghi nhận sự cố của học sinh
        </h2>

        {/* Thông tin học sinh */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Họ và tên học sinh"
            value={incident.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Lớp"
            value={incident.studentClass}
            onChange={(e) => handleChange("studentClass", e.target.value)}
            className="border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="date"
            value={incident.date}
            onChange={(e) => handleChange("date", e.target.value)}
            min={new Date().toISOString().split("T")[0]} // 👈 giới hạn không cho chọn ngày quá khứ
            className="border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Địa điểm xảy ra"
            value={incident.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="border border-gray-300 p-3 rounded-lg"
          />
        </div>

        {/* Mô tả */}
        <div className="mt-6">
          <label className="font-semibold text-gray-700 mb-2 block">
            📝 Mô tả sự cố
          </label>
          <textarea
            placeholder="Chi tiết sự cố..."
            value={incident.details}
            onChange={(e) => handleChange("details", e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full h-28"
          />
        </div>

        {/* Loại chấn thương & mức độ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <input
            type="text"
            placeholder="Loại chấn thương"
            value={incident.typeOfInjury}
            onChange={(e) => handleChange("typeOfInjury", e.target.value)}
            className="border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Mức độ nghiêm trọng"
            value={incident.severity}
            onChange={(e) => handleChange("severity", e.target.value)}
            className="border border-gray-300 p-3 rounded-lg"
          />
        </div>

        {/* Danh sách thuốc */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">💊 Thuốc đã sử dụng</h3>
          {incident.medications.map((med, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3 items-center"
            >
              <input
                type="text"
                placeholder="Tên thuốc"
                value={med.name}
                onChange={(e) =>
                  handleMedicationChange(index, "name", e.target.value)
                }
                className="border p-2 rounded col-span-2"
              />
              <input
                type="text"
                placeholder="Liều lượng"
                value={med.amount}
                onChange={(e) =>
                  handleMedicationChange(index, "amount", e.target.value)
                }
                className="border p-2 rounded col-span-2"
              />
              <button
                type="button"
                onClick={() => removeMedication(index)}
                className="text-red-600 hover:underline"
              >
                ❌ Xóa
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addMedication}
            className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
          >
            ➕ Thêm thuốc
          </button>
        </div>

        {/* Nút lưu */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            💾 Lưu sự cố
          </button>
        </div>
      </div>
    </div>
  );
};

export default FallAcident;
