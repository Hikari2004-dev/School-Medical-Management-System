import React, { useEffect, useState } from "react";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("Tất cả");

  useEffect(() => {
    fetch("http://localhost:8080/api/students/all")
      .then((res) => res.json())
      .then((result) => setStudents(Array.isArray(result.data) ? result.data : []))
      .catch((err) => console.error("Lỗi khi tải danh sách học sinh:", err));
  }, []);

  // Lấy danh sách lớp duy nhất từ dữ liệu
  const gradeList = ["Tất cả", ...Array.from(new Set(students.map(s => s.grade)))];

  // Lọc danh sách học sinh theo lớp được chọn
  const filteredStudents = selectedGrade === "Tất cả"
    ? students
    : students.filter(s => s.grade === selectedGrade);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Danh sách học sinh</h2>
        <select
          className="border border-gray-300 rounded px-3 py-1 text-sm"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          {gradeList.map((grade, idx) => (
            <option key={idx} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-green-200">
            <tr>
              <th className="px-4 py-2 border">STT</th>
              <th className="px-4 py-2 border">Họ tên</th>
              <th className="px-4 py-2 border">Ngày sinh</th>
              <th className="px-4 py-2 border">Giới tính</th>
              <th className="px-4 py-2 border">Lớp</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student.id} className="hover:bg-green-50">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">{student.dateOfBirth}</td>
                <td className="px-4 py-2 border">{student.gender}</td>
                <td className="px-4 py-2 border">{student.grade}</td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-4 border text-center text-gray-500">
                  Không có học sinh nào trong lớp này.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
