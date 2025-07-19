// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaBell,
//   FaCalendarAlt,
//   FaUserFriends,
//   FaNotesMedical
// } from "react-icons/fa";

// export default function MainPage() {
//   const [user, setUser] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Lấy thông tin người dùng, fallback nếu API lỗi
//     axios
//       .get("/api/account/me")
//       .then((res) => setUser(res.data))
//       .catch((err) => {
//         console.error("Không thể tải user:", err);
//         const fallbackName = localStorage.getItem("userName") || "Người dùng";
//         setUser({ name: fallbackName, role: "..." });
//       });

//     // Lấy tổng quan
//     axios
//       .get("/api/main/stats")
//       .then((res) => setStats(res.data))
//       .catch((err) => {
//         console.error("Không thể tải stats:", err);
//         setStats({ classCount: 0, studentsWithIssues: 0 });
//       });

//     // Lấy lịch hẹn hôm nay
//     axios
//       .get("/api/appointments/today")
//       .then((res) => setAppointments(res.data))
//       .catch((err) => {
//         console.error("Không thể tải appointments:", err);
//         setAppointments([]);
//       });

//     // Lấy thông báo mới nhất
//     axios
//       .get("/api/notifications?limit=3")
//       .then((res) => setNotifications(res.data))
//       .catch((err) => {
//         console.error("Không thể tải notifications:", err);
//         setNotifications([]);
//       });
//   }, []);

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-semibold mb-4">
//         👋 Xin chào, {user?.name || "..."}
//       </h2>
//       <p className="text-gray-600 mb-6">
//         Chào mừng bạn quay lại hệ thống quản lý y tế học đường.
//       </p>

//       {/* Thống kê nhanh */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatCard
//           icon={<FaUserFriends />}
//           title="Tổng số lớp"
//           value={stats?.classCount ?? "..."}
//         />
//         <StatCard
//           icon={<FaNotesMedical />}
//           title="HS cần theo dõi"
//           value={stats?.studentsWithIssues ?? "..."}
//         />
//         <StatCard
//           icon={<FaCalendarAlt />}
//           title="Lịch hẹn hôm nay"
//           value={appointments.length}
//         />
//         <StatCard
//           icon={<FaBell />}
//           title="Thông báo mới"
//           value={notifications.length}
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Lịch hẹn hôm nay */}
//         <div className="bg-white p-6 rounded-lg shadow col-span-2">
//           <h3 className="text-lg font-semibold mb-4">📅 Lịch hẹn hôm nay</h3>
//           {appointments.length === 0 ? (
//             <p className="text-gray-500 text-sm">
//               Không có lịch hẹn nào hôm nay.
//             </p>
//           ) : (
//             <ul className="space-y-3">
//               {appointments.map((a) => (
//                 <li key={a.id} className="border-b pb-2">
//                   <p className="font-medium">{a.title}</p>
//                   <p className="text-sm text-gray-500">
//                     {a.time} • {a.studentName}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Thông báo mới */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-4">🔔 Thông báo gần đây</h3>
//           {notifications.length === 0 ? (
//             <p className="text-gray-500 text-sm">Không có thông báo nào.</p>
//           ) : (
//             <ul className="space-y-3">
//               {notifications.map((n) => (
//                 <li key={n.id}>
//                   <p className="font-medium">{n.title}</p>
//                   <p className="text-sm text-gray-600">{n.message}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* Hành động nhanh */}
//       <div className="mt-10">
//         <h3 className="text-lg font-semibold mb-4">⚡ Hành động nhanh</h3>
//         <div className="flex flex-wrap gap-4">
//           <QuickAction label="Tạo thông báo" icon={<FaBell />} />
//           <QuickAction label="Thêm lịch hẹn" icon={<FaCalendarAlt />} />
//           <QuickAction label="Ghi nhận y tế" icon={<FaNotesMedical />} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ icon, title, value }) {
//   return (
//     <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
//       <div className="text-blue-600 text-2xl">{icon}</div>
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <p className="text-xl font-semibold">{value}</p>
//       </div>
//     </div>
//   );
// }

// function QuickAction({ label, icon }) {
//   return (
//     <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow text-sm">
//       <span className="mr-2">{icon}</span>
//       {label}
//     </button>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaCalendarAlt,
  FaUserFriends,
  FaNotesMedical,
} from "react-icons/fa";

export default function MainPage() {
  const [user, setUser] = useState(null);
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

        setUser({ name: "Nguyễn Văn A", role: "Quản trị viên" });

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
          👋 Xin chào, {user?.name || "Loading..."}
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
