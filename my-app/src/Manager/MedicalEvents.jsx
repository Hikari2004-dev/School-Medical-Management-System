// // src/Manager/MedicalEvents.jsx
// import React, { useState, useEffect } from 'react';
// import { FaArrowRight, FaCalendarAlt, FaClinicMedical } from 'react-icons/fa';

// export default function MedicalEvents() {
//   const [events, setEvents]   = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState(null);

//   useEffect(() => {
//     fetch('/api/medical-events')
//       .then(r=>{ if(!r.ok) throw new Error(r.status); return r.json(); })
//       .then(d=>setEvents(d))
//       .catch(e=>{ console.error(e); setError('Không tải được sự kiện.'); })
//       .finally(()=>setLoading(false));
//   }, []);

//   if (loading) return <div className="p-8 text-gray-500">Đang tải sự kiện…</div>;
//   if (error)   return <div className="p-8 text-red-500">{error}</div>;

//   return (
//     <div className="p-8 bg-gray-50 min-h-full">
//       <h2 className="text-3xl font-bold text-center mb-10 text-blue-800">
//         Sự kiện Y tế
//       </h2>
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//         {events.map(evt=>(
//           <div key={evt.id}
//             className="relative bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
//           >
//             <div className="absolute -top-4 left-6 bg-blue-600 p-2 rounded-full">
//               <FaClinicMedical className="text-white text-lg"/>
//             </div>
//             <h3 className="mt-4 text-2xl font-semibold mb-3">{evt.title}</h3>
//             <div className="flex items-center text-gray-500 mb-4">
//               <FaCalendarAlt className="mr-2"/> {evt.date}
//             </div>
//             <p className="text-gray-700 mb-6">{evt.description}</p>
//             <div className="flex space-x-4">
//               <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
//                 Xem chi tiết
//               </button>
//               <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                 Đồng ý
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
// );
// }

// src/Manager/MedicalEvents.jsx
// src/Manager/MedicalEvents.jsx
import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaCalendarAlt, FaClinicMedical } from 'react-icons/fa';

const SAMPLE_EVENTS = [
  {
    id: 1,
    title: 'Khám sức khỏe định kỳ',
    date: '26/10/2024, 09:00 – 16:00',
    description:
      'Khám sức khỏe bắt buộc cho toàn bộ học sinh. Vui lòng nộp giấy đồng ý trước ngày 20/10.',
  },
  {
    id: 2,
    title: 'Tiêm phòng cúm mùa',
    date: '10/11/2024, 10:00 – 14:00',
    description:
      'Dịch vụ tiêm phòng cúm miễn phí cho học sinh và nhân viên. Cần đăng ký trước.',
  },
  {
    id: 3,
    title: 'Đào tạo sơ cứu cơ bản',
    date: '15/11/2024, 13:00 – 17:00',
    description:
      'Khóa đào tạo sơ cứu cho giáo viên và nhân viên y tế học đường. Cấp chứng nhận sau khóa học.',
  },
  {
    id: 4,
    title: 'Hội thảo tâm lý học đường',
    date: '05/12/2024, 09:30 – 12:00',
    description:
      'Chia sẻ về chăm sóc sức khỏe tinh thần và nhận biết dấu hiệu căng thẳng ở học sinh.',
  },
];

export default function MedicalEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(SAMPLE_EVENTS);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-full space-y-10">
      <h2 className="text-3xl font-bold text-center text-blue-800">
        Sự kiện Y tế
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-200"
          >
            {/* Icon lớn phía trên */}
            <div className="absolute -top-6 left-8 bg-blue-600 p-3 rounded-full shadow-md">
              <FaClinicMedical className="text-white text-2xl" />
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-2xl font-semibold">{evt.title}</h3>

              <div className="flex items-center text-gray-500">
                <FaCalendarAlt className="mr-2" />
                <span>{evt.date}</span>
              </div>

              <p className="text-gray-700 leading-relaxed">{evt.description}</p>

              <div className="flex space-x-4 pt-4 border-t">
                <button className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  Xem chi tiết
                </button>
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Đồng ý
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
