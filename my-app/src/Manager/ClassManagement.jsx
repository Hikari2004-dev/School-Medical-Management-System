// src/Manager/ClassManagement.jsx
import React, { useState, useEffect } from "react";
import {
  FaUserPlus,
  FaArrowRight,
  FaChalkboardTeacher,
  FaTimes,
} from "react-icons/fa";

export default function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/students/all")
      .then((res) => res.json())
      .then((data) => setAllStudents(data))
      .catch(() => setAllStudents([]));
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
                  {allStudents.length === 0 ? (
                    <span className="text-gray-500">Đang tải học sinh...</span>
                  ) : (
                    allStudents.map((n) => (
                      <label key={n} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(n)}
                          onChange={() => toggleStudent(n)}
                          className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span className="text-gray-800">{n}</span>
                      </label>
                    ))
                  )}
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
