import React from "react";
import {
  Package,
  CalendarCheck,
  Heart,
  Video,
} from "lucide-react";

const services = [
  {
    icon: <Package size={32} className="text-[#1e40af]" />,
    title: "Gửi Đơn Thuốc",
    description:
      "Gửi đơn thuốc trực tuyến nhanh chóng & tiện lợi. Nhận kết quả trong vòng 24h.",
    button: "Gửi Đơn Thuốc",
  },
  {
    icon: <CalendarCheck size={32} className="text-[#1e40af]" />,
    title: "Đăng Ký Tiêm Vaccine",
    description:
      "Tìm lịch tiêm, nhận nhắc nhở & theo dõi lịch sử tiêm chủng đầy đủ.",
    button: "Đăng Ký Vaccine",
  },
  {
    icon: <Heart size={32} className="text-[#1e40af]" />,
    title: "Khám Sức Khỏe Định Kỳ",
    description:
      "Đặt lịch khám định kỳ với bác sĩ chuyên khoa và nhận báo cáo chi tiết.",
    button: "Đặt Lịch Khám",
  },
  {
    icon: <Video size={32} className="text-[#1e40af]" />,
    title: "Tư Vấn Trực Tuyến",
    description:
      "Tư vấn sức khỏe 24/7 qua chat hoặc video call với chuyên gia.",
    button: "Tư Vấn Ngay",
  },
];

export default function OurServices() {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Dịch Vụ Của Chúng Tôi
        </h2>
        <span className="block w-20 h-1 bg-[#1e40af] mx-auto mt-2 rounded-full"></span>
        <p className="mt-4 text-gray-600">
          Chất lượng hàng đầu, tiện lợi, nhanh chóng – đồng hành cùng sức khỏe của học sinh.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((svc, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-[#e0e7ff] rounded-full mb-6 mx-auto">
              {svc.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {svc.title}
            </h3>
            <p className="text-gray-600 flex-1 mb-6">{svc.description}</p>
            <button className="mt-auto inline-flex items-center justify-center bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-medium py-2 px-4 rounded-lg transition">
              {svc.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}