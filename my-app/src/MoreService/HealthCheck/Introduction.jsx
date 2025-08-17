import React from "react";
import { CheckCircle } from "lucide-react";
import HealthCheck2 from "../../Image/HealthCheck2.png";
import { PhoneCall } from "lucide-react";

const Introduction = () => {
  return (
    <div className="bg-[#eaf7ff] py-6 px-4 md:px-10">
      <nav className="text-[#1e40af] font-medium text-lg mb-4">
        Trang chủ &gt; Dịch vụ &gt;{" "}
        <span className="font-semibold">Khám sức khỏe định kì</span>
      </nav>

      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 text-base text-black space-y-3 font-semibold">
          <p>
            <span className="text-green-600">
              <CheckCircle size={18} className="inline mr-1" />
            </span>
            Khám tổng quát 18 hạng mục (chiều cao, cân nặng, huyết áp, tim
            mạch…)
          </p>
          <p>
            <span className="text-green-600">
              <CheckCircle size={18} className="inline mr-1" />
            </span>
            Kiểm tra thị lực & thính lực sớm phát hiện cận – viễn thị, mất thính
            lực
          </p>
          <p>
            <span className="text-green-600">
              <CheckCircle size={18} className="inline mr-1" />
            </span>
            Khám tai – mũi – họng & răng hàm mặt phòng ngừa viêm VA, sâu răng
            học đường
          </p>
          <p>
            <span className="text-green-600">
              <CheckCircle size={18} className="inline mr-1" />
            </span>
            Đánh giá tâm thần & hành vi giúp phát hiện stress, tăng động, hỗ trợ
            bé tự tin
          </p>
          <p>
            <span className="text-green-600">
              <CheckCircle size={18} className="inline mr-1" />
            </span>
            Tư vấn dinh dưỡng – vận động cá nhân hóa theo lứa tuổi, lưu hồ sơ
            điện tử
          </p>

          <div className="mt-4 flex items-center gap-2 flex-wrap text-[15px] font-normal">
            Liên hệ <strong>chuyên gia</strong> để tư vấn
            <span className="text-[#1e40af] font-bold flex items-center">
              <PhoneCall className="inline text-[#1e40af] mr-1" size={20} />
              19002115
            </span>
            hoặc
            <button
              onClick={() => window.dispatchEvent(new Event("open-chat"))}
              className="bg-orange-400 text-white rounded-full px-4 py-1 hover:bg-orange-500 transition-all font-semibold"
            >
              Chat ngay
            </button>
          </div>
        </div>

        <div className="flex-1">
          <img
            src={HealthCheck2}
            alt="HealthCheck2"
            className="w-[500px] mx-auto p-2 bg-white rounded-tr-2xl rounded-br-2xl shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
