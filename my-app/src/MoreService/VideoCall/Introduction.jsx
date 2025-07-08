import React from "react";
import doctorBanner from "../../Image/videocall.png"; // ảnh bác sĩ
import { CheckCircle, PhoneCall } from "lucide-react";

const Introduction = () => {
  return (
    <div className="bg-[#eaf7ff] px-4 py-8 md:px-10">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        {/* Left: Nội dung */}
        <div className="flex-1 text-base text-black space-y-3">
          <h2 className="text-xl font-bold text-[#1e40af] mb-4 uppercase">
            Gọi video với bác sĩ
          </h2>

          <p>
            <CheckCircle size={18} className="inline text-green-600 mr-1" />
            Khám/tư vấn sức khỏe từ xa với 100+ bác sĩ từ 30+ chuyên khoa
          </p>
          <p>
            <CheckCircle size={18} className="inline text-green-600 mr-1" />
            Được nhắn tin với bác sĩ trước, trong và sau buổi khám
          </p>
          <p>
            <CheckCircle size={18} className="inline text-green-600 mr-1" />
            Được tư vấn với bác sĩ tối thiểu 15 phút
          </p>
          <p>
            <CheckCircle size={18} className="inline text-green-600 mr-1" />
            Đặt lịch linh hoạt – hỗ trợ dời lịch, hoàn tiền khi hủy phiếu
          </p>
          <p>
            <CheckCircle size={18} className="inline text-green-600 mr-1" />
            Bảo mật thông tin khám chữa bệnh theo quy định y tế
          </p>

          <div className="mt-4 text-[15px] flex flex-wrap items-center">
            Liên hệ <strong className="mx-1">chuyên gia</strong> để tư vấn
            <a href="tel:19002115" className="ml-2 inline-flex items-center text-[#1e40af] font-bold">
              <PhoneCall size={18} className="mr-1" />19002115
            </a>
            <span className="ml-2">hoặc</span>
            <button
              onClick={() => window.dispatchEvent(new Event("open-chat"))}
              className="ml-2 bg-orange-400 text-white rounded-full px-4 py-1 hover:bg-orange-500 transition-all font-semibold"
            >
              Chat ngay
            </button>
          </div>
        </div>

        {/* Right: Hình bác sĩ */}
        <div className="flex-1">
          <img
            src={doctorBanner}
            alt="Doctor"
            className="w-[500px] mx-auto p-2 bg-white rounded-tr-2xl rounded-br-2xl shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
