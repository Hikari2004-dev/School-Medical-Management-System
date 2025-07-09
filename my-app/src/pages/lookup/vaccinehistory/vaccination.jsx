
import React, { useEffect, useState } from "react";
import {
  Check,
  X,
  Home,
  Pill,
  Syringe,
  FileText,
  User,
  Plus,
} from "lucide-react";
import "./vaccination.css"; // ✅ File CSS riêng

export default function VaccinationApp() {
  const [records, setRecords] = useState([]);

  const navigation = [
    { name: "Trang chủ", icon: Home, active: false },
    { name: "Đơn thuốc", icon: Pill, active: false },
    { name: "Sổ vaccine", icon: Syringe, active: true },
    { name: "Hồ sơ sức khỏe", icon: User, active: false },
    { name: "Báo cáo", icon: FileText, active: false },
  ];

  const tabs = [
    { name: "Thông tin cá nhân", active: false },
    { name: "Đơn thuốc", active: false },
    { name: "Lịch sử tiêm chủng", active: true },
    { name: "Hồ sơ sức khỏe", active: false },
  ];

  useEffect(() => {
    fetchVaccinationRecords();
  }, []);

  const fetchVaccinationRecords = async () => {
    try {
      const response = await fetch("/api/vaccinations");
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setRecords([
        {
          id: 1,
          medicineName: "Covid-19",
          dosage: "500 mg",
          timesPerDay: 1,
          startDate: "10/05/2025",
          notes: "Hạ sốt",
          approved: true,
        },
        {
          id: 2,
          medicineName: "Uốn ván",
          dosage: "500 mg",
          timesPerDay: 1,
          startDate: "10/05/2025",
          notes: "Uốn ván",
          approved: false,
        },
      ]);
    }
  };

  return (
    <div className="flex min-h-screen font-judson">
      {/* Sidebar */}
      <div className="w-64 bg-purple-sidebar text-white p-4">
        <div className="flex items-center mb-10 gap-4">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/8b3e23527786923c57ed545f79e93f8dfd4d59a8?width=214"
            className="w-12 h-12 rounded-full"
            alt="Logo"
          />
          <div>
            <h1 className="text-2xl">SchoMed</h1>
            <p className="text-sm text-white/90">School Medical</p>
          </div>
        </div>
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg mb-2 cursor-pointer transition ${
                item.active
                  ? "bg-white/10 text-white"
                  : "hover:bg-white/10 text-white/80"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>

      {/* Main */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center gap-4">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/2723c3e4c60d9a1d609fb00204102d84108a5216?width=400"
              className="w-20 h-20 rounded-full"
              alt="User"
            />
            <div>
              <h2 className="text-2xl">Nguyễn Đoàn Duy Khánh</h2>
              <p className="text-lg">Lớp 12A1</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 mt-4 sm:mt-0 bg-purple-active text-white rounded-xl hover:bg-purple-800">
            <Plus size={20} />
            Thêm mới
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <nav className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`py-2 border-b-2 ${
                  tab.active
                    ? "border-purple-active text-purple-active"
                    : "border-transparent text-gray-600 hover:text-purple-700"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Table (desktop) */}
        <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
          <div className="bg-purple-700 text-white px-6 py-4 grid grid-cols-6 gap-4">
            <div>Tên thuốc</div>
            <div>Liều dùng</div>
            <div>Số lần/Ngày</div>
            <div>Ngày bắt đầu</div>
            <div>Ghi chú</div>
            <div className="text-center">Chấp thuận</div>
          </div>
          {records.map((record, index) => (
            <div
              key={record.id}
              className={`grid grid-cols-6 gap-4 px-6 py-4 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div>{record.medicineName}</div>
              <div>{record.dosage}</div>
              <div className="text-center">{record.timesPerDay}</div>
              <div>{record.startDate}</div>
              <div className="italic">{record.notes}</div>
              <div className="flex justify-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    record.approved ? "bg-emerald-500" : "bg-red-500"
                  }`}
                >
                  {record.approved ? (
                    <Check size={18} className="text-white" />
                  ) : (
                    <X size={18} className="text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {records.map((record) => (
            <div
              key={record.id}
              className="bg-white shadow rounded-xl p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-purple-700 font-semibold text-lg">
                  {record.medicineName}
                </div>
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-full ${
                    record.approved ? "bg-emerald-500" : "bg-red-500"
                  }`}
                >
                  {record.approved ? (
                    <Check size={14} className="text-white" />
                  ) : (
                    <X size={14} className="text-white" />
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600 italic mb-2">
                {record.notes}
              </div>
              <div className="text-sm">
                <p>Liều dùng: {record.dosage}</p>
                <p>Số lần/Ngày: {record.timesPerDay}</p>
                <p>Ngày bắt đầu: {record.startDate}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-500 mt-6 text-right">
          Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
        </div>
      </div>
    </div>
  );
}
