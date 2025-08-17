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

      {/* Banner giới thiệu và quote */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-8 flex flex-col justify-center items-center shadow">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
            alt="School Medical"
            className="w-32 h-32 mb-4"
          />
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Hệ thống quản lý y tế học đường</h2>
          <p className="text-gray-600 text-center max-w-xl">
            Nâng cao sức khỏe học sinh, hỗ trợ y tế kịp thời, quản lý thông tin hiệu quả và bảo vệ thế hệ tương lai.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow p-8">
          <span className="text-4xl mb-4">💡</span>
          <blockquote className="italic text-blue-700 text-center">
            "Sức khỏe là tài sản quý giá nhất của mỗi con người."
          </blockquote>
          <span className="mt-2 text-gray-400 text-sm">— Khuyết danh</span>
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
