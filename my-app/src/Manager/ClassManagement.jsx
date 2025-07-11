// import React, { useState, useEffect } from 'react';
// import {
//   FaUserPlus, FaArrowRight, FaChalkboardTeacher, FaTimes
// } from 'react-icons/fa';

// const SAMPLE_STUDENTS = [
//   'Nguyễn Văn A','Trần Thị B','Lê Văn C','Phạm Thị D','Hoàng Minh E',
// ];

// export default function ClassManagement() {
//   const [classes, setClasses]         = useState([]);
//   const [loading, setLoading]         = useState(true);
//   const [error,   setError]           = useState(null);
//   const [showModal, setShowModal]     = useState(false);
//   const [newClassName, setNewClassName]     = useState('');
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   useEffect(() => {
//     fetch('/api/classes')
//       .then(r=>{ if(!r.ok) throw new Error(r.status); return r.json(); })
//       .then(d=>setClasses(d))
//       .catch(e=>{ console.error(e); setError('Không tải được lớp.'); })
//       .finally(()=>setLoading(false));
//   }, []);

//   const toggleStudent = n =>
//     setSelectedStudents(prev =>
//       prev.includes(n) ? prev.filter(x=>x!==n) : [...prev,n]
//     );

//   const createClass = () => {
//     setClasses(prev=>[
//       ...prev, { id: prev.length+1, name: newClassName, students: selectedStudents }
//     ]);
//     setNewClassName(''); setSelectedStudents([]); setShowModal(false);
//   };

//   if (loading) return <div className="p-8 text-gray-500">Đang tải lớp…</div>;
//   if (error)   return <div className="p-8 text-red-500">{error}</div>;

//   return (
//     <div className="p-8 bg-gray-100 min-h-full">
//       <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
//         Quản lý Người dùng & Lớp học
//       </h2>

//       <div className="max-w-4xl mx-auto mb-6 flex justify-end">
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow flex items-center"
//           onClick={()=>setShowModal(true)}
//         >
//           <FaUserPlus className="mr-2"/> Thêm Lớp Mới
//         </button>
//       </div>

//       <div className="max-w-4xl mx-auto space-y-8">
//         {classes.map(cls=>(
//           <div key={cls.id}
//             className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
//           >
//             <div className="flex justify-between mb-4 items-center">
//               <div className="flex items-center space-x-3">
//                 <FaChalkboardTeacher className="text-blue-500 text-2xl"/>
//                 <div>
//                   <h3 className="text-xl font-semibold">{cls.name}</h3>
//                   <span className="text-sm text-gray-500">
//                     {cls.students.length} học sinh
//                   </span>
//                 </div>
//               </div>
//               <button
//                 className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 <FaUserPlus/> <span>Thêm học sinh</span>
//               </button>
//             </div>

//             <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
//               {cls.students.map((s,i)=>(
//                 <li key={i} className="bg-gray-100 px-3 py-1 rounded">
//                   {s}
//                 </li>
//               ))}
//             </ul>

//             <div className="text-right">
//               <button
//                 className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium"
//               >
//                 <span>Xem chi tiết</span> <FaArrowRight/>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold">Tạo Lớp Mới</h3>
//               <button onClick={()=>setShowModal(false)}>
//                 <FaTimes className="text-gray-500 hover:text-gray-700"/>
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm mb-1">Tên lớp</label>
//                 <input
//                   type="text" value={newClassName}
//                   onChange={e=>setNewClassName(e.target.value)}
//                   className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1">Chọn HS</label>
//                 <div className="max-h-40 overflow-auto border p-2 bg-gray-50 rounded">
//                   {SAMPLE_STUDENTS.map(n=>(
//                     <label key={n} className="flex items-center mb-1">
//                       <input
//                         type="checkbox"
//                         checked={selectedStudents.includes(n)}
//                         onChange={()=>toggleStudent(n)}
//                         className="mr-2"
//                       />
//                       {n}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                 onClick={()=>setShowModal(false)}
//               >
//                 Hủy
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 onClick={createClass}
//                 disabled={!newClassName || !selectedStudents.length}
//               >
//                 Tạo
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
// );
// }

// src/Manager/ClassManagement.jsx
import React, { useState, useEffect } from "react";
import {
  FaUserPlus,
  FaArrowRight,
  FaChalkboardTeacher,
  FaTimes,
} from "react-icons/fa";

const SAMPLE_CLASSES = [
  {
    id: 1,
    name: "Lớp 101 – Khối A",
    students: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D"],
  },
  {
    id: 2,
    name: "Lớp 202 – Khối B",
    students: ["Hoàng Minh E", "Phạm Thị F", "Vũ Văn G"],
  },
  {
    id: 3,
    name: "Lớp 303 – Khối C",
    students: ["Đặng Thị H", "Lý Văn I", "Trần Văn K", "Phan Thị L"],
  },
];

export default function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    setClasses(SAMPLE_CLASSES);
  }, []);

  const toggleStudent = (name) =>
    setSelectedStudents((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  const createClass = () => {
    setClasses((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newClassName,
        students: selectedStudents,
      },
    ]);
    setNewClassName("");
    setSelectedStudents([]);
    setShowModal(false);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-white to-gray-100 min-h-full">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-900 drop-shadow-sm">
        Quản lý Lớp học
      </h2>

      <div className="max-w-5xl mx-auto mb-8 flex justify-end">
        <button
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform transform hover:-translate-y-1"
          onClick={() => setShowModal(true)}
        >
          <FaUserPlus /> <span>Thêm Lớp Mới</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="absolute -top-6 left-8 bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full text-white shadow-lg">
              <FaChalkboardTeacher size={24} />
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {cls.name}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {cls.students.length} học sinh
              </p>
              <ul className="grid grid-cols-2 gap-4 mb-6">
                {cls.students.map((s, i) => (
                  <li
                    key={i}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-700"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between">
                <button className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 font-medium">
                  <span>Xem chi tiết</span> <FaArrowRight />
                </button>
                <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow transition-transform hover:-translate-y-1">
                  <FaUserPlus /> <span>Thêm HS</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Tạo Lớp Mới
              </h3>
              <button onClick={() => setShowModal(false)}>
                <FaTimes className="text-gray-500 hover:text-gray-800" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Tên lớp
                </label>
                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Nhập tên lớp..."
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Chọn học sinh mẫu
                </label>
                <div className="max-h-40 overflow-auto border border-gray-200 p-4 bg-gray-50 rounded-lg">
                  {[
                    "Nguyễn Văn A",
                    "Trần Thị B",
                    "Lê Văn C",
                    "Phạm Thị D",
                    "Hoàng Minh E",
                  ].map((n) => (
                    <label key={n} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(n)}
                        onChange={() => toggleStudent(n)}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-gray-800">{n}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
              >
                Hủy
              </button>
              <button
                onClick={createClass}
                disabled={!newClassName || !selectedStudents.length}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-transform hover:-translate-y-1 disabled:opacity-50"
              >
                Tạo lớp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
