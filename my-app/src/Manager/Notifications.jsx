// import React, { useState, useEffect } from "react";
// import { FaCircle, FaTrash } from "react-icons/fa";

// export default function Notifications() {
//   const [notes, setNotes] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("/api/notifications")
//       .then((r) => {
//         if (!r.ok) throw new Error(r.status);
//         return r.json();
//       })
//       .then((d) => setNotes(d))
//       .catch((e) => {
//         console.error(e);
//         setError("Không tải được thông báo.");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const markRead = (id) =>
//     setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)));

//   const del = (id) => setNotes((ns) => ns.filter((n) => n.id !== id));

//   if (loading)
//     return <div className="p-8 text-gray-500">Đang tải thông báo…</div>;
//   if (error) return <div className="p-8 text-red-500">{error}</div>;

//   const filtered = notes.filter((n) => {
//     if (filter === "all") return true;
//     if (filter === "unread") return !n.read;
//     if (filter === "read") return n.read;
//   });

//   return (
//     <div className="p-8 bg-gray-50 min-h-full">
//       <h2 className="text-2xl font-semibold mb-6">Thông báo của Quản lý</h2>
//       <div className="flex space-x-2 mb-6">
//         {["all", "unread", "read"].map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className={`px-4 py-1 rounded-md font-medium ${
//               filter === f
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {f === "all" ? "Tất cả" : f === "unread" ? "Chưa đọc" : "Đã đọc"}
//           </button>
//         ))}
//       </div>
//       <div className="space-y-4">
//         {filtered.map((n) => (
//           <div
//             key={n.id}
//             className={`relative flex flex-col bg-white rounded-lg shadow p-4 border-l-4 ${
//               n.urgent ? "border-red-500" : "border-transparent"
//             }`}
//           >
//             <div className="flex justify-between items-start">
//               <div className="flex items-center space-x-2">
//                 {n.urgent && <FaCircle className="text-red-500 text-xs" />}
//                 <h3
//                   className={`${
//                     n.read ? "text-gray-500" : "text-gray-900"
//                   } font-semibold`}
//                 >
//                   {n.title}
//                 </h3>
//               </div>
//               <span className="text-sm text-gray-500">{n.timeAgo}</span>
//             </div>
//             <p className={`mt-2 text-gray-700 ${n.read ? "opacity-70" : ""}`}>
//               {n.message}
//             </p>
//             <div className="mt-3 flex space-x-3">
//               {!n.read && (
//                 <button
//                   onClick={() => markRead(n.id)}
//                   className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-sm"
//                 >
//                   Đánh dấu đã đọc
//                 </button>
//               )}
//               <button
//                 onClick={() => del(n.id)}
//                 className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50 text-sm inline-flex items-center"
//               >
//                 <FaTrash className="mr-1" /> Xóa
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { FaCircle, FaTrash } from 'react-icons/fa';

const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Kết quả khám sức khỏe',
    message: 'Kết quả khám sức khỏe định kỳ của lớp 101 đã được cập nhật.',
    timeAgo: '2 giờ trước',
    urgent: false,
    read: false,
  },
  {
    id: 2,
    title: 'Tiêm phòng uốn ván',
    message: 'Lịch tiêm phòng uốn ván cho học sinh khối 12: 10/11/2024.',
    timeAgo: '1 ngày trước',
    urgent: true,
    read: false,
  },
  {
    id: 3,
    title: 'Họp phụ huynh',
    message: 'Cuộc họp phụ huynh sẽ diễn ra vào 25/10/2024 lúc 17:00.',
    timeAgo: '3 ngày trước',
    urgent: false,
    read: true,
  },
  {
    id: 4,
    title: 'Workshop sơ cứu',
    message: 'Workshop sơ cứu cơ bản cho giáo viên vào 15/11/2024.',
    timeAgo: '1 tuần trước',
    urgent: false,
    read: true,
  },
];

export default function Notifications() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Dùng mock data để demo giao diện
    setNotes(SAMPLE_NOTIFICATIONS);
  }, []);

  const markRead = id =>
    setNotes(ns => ns.map(n => (n.id === id ? { ...n, read: true } : n)));

  const del = id => setNotes(ns => ns.filter(n => n.id !== id));

  const filtered = notes.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <h2 className="text-2xl font-semibold mb-6">Thông báo của Quản lý</h2>
      <div className="flex space-x-2 mb-6">
        {['all', 'unread', 'read'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-md font-medium ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {f === 'all' ? 'Tất cả' : f === 'unread' ? 'Chưa đọc' : 'Đã đọc'}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filtered.map(n => (
          <div
            key={n.id}
            className={`relative flex flex-col bg-white rounded-lg shadow p-4 border-l-4 ${
              n.urgent ? 'border-red-500' : 'border-transparent'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                {n.urgent && <FaCircle className="text-red-500 text-xs" />}
                <h3
                  className={`${
                    n.read ? 'text-gray-500' : 'text-gray-900'
                  } font-semibold`}
                >
                  {n.title}
                </h3>
              </div>
              <span className="text-sm text-gray-500">{n.timeAgo}</span>
            </div>
            <p className={`mt-2 text-gray-700 ${n.read ? 'opacity-70' : ''}`}>
              {n.message}
            </p>
            <div className="mt-3 flex space-x-3">
              {!n.read && (
                <button
                  onClick={() => markRead(n.id)}
                  className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-sm"
                >
                  Đánh dấu đã đọc
                </button>
              )}
              <button
                onClick={() => del(n.id)}
                className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50 text-sm inline-flex items-center"
              >
                <FaTrash className="mr-1" /> Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
