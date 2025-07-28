import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaCalendarAlt,
  FaUserFriends,
  FaNotesMedical,
} from "react-icons/fa";

export default function MainPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8080/api/dashboard/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu dashboard");

        const data = await res.json();

        setStats({
          totalUsers: data?.totalUsers ?? 0,
          medicationSubmissions: data?.medicationSubmissions ?? 0,
          newOrders: data?.newOrders ?? 0,
          newCustomers: data?.newCustomers ?? 0,
        });
      } catch (err) {
        console.error("❌ Lỗi gọi API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="bg-[#f9fafb] min-h-screen px-6 py-10 sm:px-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
          👋 Chào mừng bạn đến với hệ thống
        </h1>
        <p className="text-gray-600">
          Chào mừng bạn đến với{" "}
          <span className="font-medium text-blue-600">Hệ thống y tế học đường</span>.
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Tổng người dùng" value={loading ? "..." : stats?.totalUsers} icon={<FaUserFriends />} />
        <StatCard title="Đơn thuốc tháng này" value={loading ? "..." : stats?.medicationSubmissions} icon={<FaNotesMedical />} />
        <StatCard title="Lịch hẹn mới" value={loading ? "..." : stats?.newOrders} icon={<FaCalendarAlt />} />
        <StatCard title="Thông báo mới" value={loading ? "..." : stats?.newCustomers} icon={<FaBell />} />
      </section>

      {/* Content Blocks */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <InfoCard title="📅 Lịch hẹn hôm nay">
          <p className="text-gray-500 text-sm">Chức năng đang phát triển...</p>
        </InfoCard>
        <InfoCard title="🔔 Thông báo gần đây">
          <p className="text-gray-500 text-sm">Chức năng đang phát triển...</p>
        </InfoCard>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">⚡ Hành động nhanh</h3>
        <div className="flex flex-wrap gap-4">
          <QuickAction label="Tạo thông báo" icon={<FaBell />} />
          <QuickAction label="Thêm lịch hẹn" icon={<FaCalendarAlt />} />
          <QuickAction label="Ghi nhận y tế" icon={<FaNotesMedical />} />
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-200 flex items-center gap-4">
      <div className="text-blue-600 text-2xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
      <h4 className="text-base font-semibold text-gray-800 mb-3">{title}</h4>
      {children}
    </div>
  );
}

function QuickAction({ label, icon }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all shadow-sm">
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}
