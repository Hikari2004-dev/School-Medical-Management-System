import React, { useState, useEffect } from "react";
import {
  FaDollarSign,
  FaUsers,
  FaUserPlus,
  FaShoppingCart,
  FaPrescriptionBottleAlt,
  FaListAlt,
  FaFileAlt,
} from "react-icons/fa";

const StatCard = ({ icon, title, value, description, color }) => (
  <div className="bg-white rounded-2xl shadow hover:shadow-xl transition-shadow p-6 flex flex-col">
    <div className="flex items-center mb-4">
      <div className={`p-3 bg-gray-100 rounded-full ${color} mr-4 text-white`}>
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
    <div className="mt-auto">
      <span className="text-3xl font-bold text-gray-900">{value}</span>
    </div>
  </div>
);

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState({});
  const [activeUsers, setActiveUsers] = useState(null);
  const [prescriptions, setPrescriptions] = useState(null);
  const [userList, setUserList] = useState(null);
  const [reportText, setReportText] = useState("");

  useEffect(() => {
    fetch("/api/account/me")
      .then((r) => r.json()).then(setUser).catch(() => setUser({ name: "Người dùng" }));
    fetch("/api/dashboard/summary")
      .then((r) => r.json()).then(setSummary).catch(() => {});
    fetch("/api/dashboard/active-users")
      .then((r) => r.json()).then((d) => setActiveUsers(d.count)).catch(() => {});
    fetch("/api/dashboard/prescriptions")
      .then((r) => r.json()).then((d) => setPrescriptions(d.count)).catch(() => {});
    fetch("/api/dashboard/users-list")
      .then((r) => r.json()).then((d) => setUserList(d.users.length)).catch(() => {});
    fetch("/api/dashboard/report")
      .then((r) => r.json()).then((d) => setReportText(d.text)).catch(() => {});
  }, []);

  const show = (v) => (v != null ? v : "—");

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen p-8 space-y-12">
      {/* Welcome banner */}
      <section className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Chào mừng quay lại, {user?.name || "..."}!
        </h1>
        <div className="mx-auto mt-2 w-24 h-1 bg-blue-600 rounded-full" />
        <p className="mt-4 text-gray-600">
          Xem nhanh tổng quan vận hành và sức khỏe học đường
        </p>
      </section>

      {/* Top summary cards */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaDollarSign />}
          color="bg-green-500"
          title="Thu nhập"
          value={`${show(summary.money)}₫`}
          description="Trong tháng này"
        />
        <StatCard
          icon={<FaUsers />}
          color="bg-indigo-500"
          title="Người dùng hôm nay"
          value={show(summary.todayUser)}
        />
        <StatCard
          icon={<FaUserPlus />}
          color="bg-purple-500"
          title="Khách mới"
          value={show(summary.newClient)}
        />
        <StatCard
          icon={<FaShoppingCart />}
          color="bg-red-500"
          title="Đơn hàng mới"
          value={show(summary.newOrder)}
        />
      </section>

      {/* Main statistics */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaUsers />}
          color="bg-indigo-600"
          title="Người dùng hoạt động"
          value={show(activeUsers)}
        />
        <StatCard
          icon={<FaPrescriptionBottleAlt />}
          color="bg-red-600"
          title="Đơn thuốc"
          value={show(prescriptions)}
        />
        <StatCard
          icon={<FaListAlt />}
          color="bg-green-600"
          title="Tổng người dùng"
          value={show(userList)}
        />
        <StatCard
          icon={<FaFileAlt />}
          color="bg-yellow-600"
          title="Báo cáo"
          value={show(reportText)}
        />
      </section>
    </div>
  );
}
