import React, { useEffect, useState } from "react";

const ConsentStudentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const resApp = await fetch("http://localhost:8080/api/notifications/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const appJson = await resApp.json();
        console.log("appJson:", appJson);
        const appointmentsArr = Array.isArray(appJson) ? appJson : [];

        const resStu = await fetch("http://localhost:8080/api/students/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const studentsArr = await resStu.json();
        const studentsList = Array.isArray(studentsArr) ? studentsArr : (Array.isArray(studentsArr.data) ? studentsArr.data : []);
        setStudents(studentsList);

        setAppointments(appointmentsArr);
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Appointments:", appointments);
    console.log("Students:", students);
  }, [appointments, students]);

  // Lọc danh sách notification đã chấp nhận tham gia sự kiện
  const acceptedNotifications = appointments.filter(
    (notif) => notif.confirmed === true
  );
  const vaccineNotifications = acceptedNotifications.filter(
    (notif) => notif.type && notif.type.toLowerCase() === "vaccine"
  );
  const checkupNotifications = acceptedNotifications.filter(
    (notif) => notif.type && notif.type.toLowerCase() === "checkup"
  );

  const [activeTab, setActiveTab] = useState("vaccine");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Danh sách học sinh đã chấp nhận tham gia sự kiện
      </h1>
      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-2 rounded-l-lg border border-blue-600 font-semibold ${activeTab === "vaccine" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
          onClick={() => setActiveTab("vaccine")}
        >
          Vaccine
        </button>
        <button
          className={`px-6 py-2 rounded-r-lg border border-blue-600 font-semibold ${activeTab === "checkup" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
          onClick={() => setActiveTab("checkup")}
        >
          Checkup
        </button>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : (
        <>
          {activeTab === "vaccine" ? (
            vaccineNotifications.length === 0 ? (
              <p className="text-center text-red-500 mb-6">Không có học sinh nào đã xác nhận sự kiện Vaccine.</p>
            ) : (
              <div className="overflow-x-auto shadow rounded-lg mb-8">
                <table className="min-w-full bg-white border border-gray-200 text-sm">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">STT</th>
                      <th className="py-3 px-4 text-left">Họ tên</th>
                      <th className="py-3 px-4 text-left">Lớp</th>
                      <th className="py-3 px-4 text-left">Nội dung</th>
                      <th className="py-3 px-4 text-center">Loại sự kiện</th>
                      <th className="py-3 px-4 text-center">Ngày gửi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccineNotifications.map((notif, index) => {
                      const student = students.find((stu) => String(stu.id) === String(notif.studentId));
                      return (
                        <tr key={notif.notificationId || index} className="border-t hover:bg-gray-50">
                          <td className="py-2 px-4">{index + 1}</td>
                          <td className="py-2 px-4">{student ? student.name : "Không rõ"}</td>
                          <td className="py-2 px-4">{student ? student.grade : ""}</td>
                          <td className="py-2 px-4">{notif.content}</td>
                          <td className="py-2 px-4 text-center">{notif.type}</td>
                          <td className="py-2 px-4 text-center">{notif.dateSent ? new Date(notif.dateSent).toLocaleString("vi-VN") : ""}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            checkupNotifications.length === 0 ? (
              <p className="text-center text-red-500 mb-6">Không có học sinh nào đã xác nhận sự kiện Checkup.</p>
            ) : (
              <div className="overflow-x-auto shadow rounded-lg mb-8">
                <table className="min-w-full bg-white border border-gray-200 text-sm">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">STT</th>
                      <th className="py-3 px-4 text-left">Họ tên</th>
                      <th className="py-3 px-4 text-left">Lớp</th>
                      <th className="py-3 px-4 text-left">Nội dung</th>
                      <th className="py-3 px-4 text-center">Loại sự kiện</th>
                      <th className="py-3 px-4 text-center">Ngày gửi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkupNotifications.map((notif, index) => {
                      const student = students.find((stu) => String(stu.id) === String(notif.studentId));
                      return (
                        <tr key={notif.notificationId || index} className="border-t hover:bg-gray-50">
                          <td className="py-2 px-4">{index + 1}</td>
                          <td className="py-2 px-4">{student ? student.name : "Không rõ"}</td>
                          <td className="py-2 px-4">{student ? student.grade : ""}</td>
                          <td className="py-2 px-4">{notif.content}</td>
                          <td className="py-2 px-4 text-center">{notif.type}</td>
                          <td className="py-2 px-4 text-center">{notif.dateSent ? new Date(notif.dateSent).toLocaleString("vi-VN") : ""}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default ConsentStudentPage;
