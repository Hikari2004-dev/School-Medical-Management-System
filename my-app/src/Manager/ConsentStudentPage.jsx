import React, { useEffect, useState } from "react";

const ConsentStudentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Lấy danh sách lịch hẹn
        const resApp = await fetch("http://localhost:8080/api/appointments/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const appJson = await resApp.json();
        const appointmentsArr = Array.isArray(appJson.data) ? appJson.data : [];

        // Lấy danh sách học sinh
        const resStu = await fetch("http://localhost:8080/api/students/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const studentsArr = await resStu.json();

        setAppointments(appointmentsArr);
        setStudents(studentsArr);
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Danh sách lịch hẹn tiêm chủng & khám sức khỏe
      </h1>
      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-red-500">Không có lịch hẹn nào.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full bg-white border border-gray-200 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">STT</th>
                <th className="py-3 px-4 text-left">Họ tên</th>
                <th className="py-3 px-4 text-left">Lớp</th>
                <th className="py-3 px-4 text-center">Tiêm chủng</th>
                <th className="py-3 px-4 text-center">Khám sức khỏe</th>
                <th className="py-3 px-4 text-center">Ngày hẹn</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app, index) => {
                const student = students.find((stu) => stu.id === app.studentId);
                return (
                  <tr key={app.appointmentId || index} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{student ? student.name : "Không rõ"}</td>
                    <td className="py-2 px-4">{student ? student.grade : ""}</td>
                    <td className="py-2 px-4 text-center">
                      {"vaccinationConsent" in app ? (
                        app.vaccinationConsent ? (
                          <span className="text-green-600 font-semibold">✅ Đồng ý</span>
                        ) : (
                          <span className="text-red-500">❌ Không</span>
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {"medicalCheckupConsent" in app ? (
                        app.medicalCheckupConsent ? (
                          <span className="text-green-600 font-semibold">✅ Đồng ý</span>
                        ) : (
                          <span className="text-red-500">❌ Không</span>
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {app.appointmentDate
                        ? new Date(app.appointmentDate).toLocaleString("vi-VN")
                        : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ConsentStudentPage;
