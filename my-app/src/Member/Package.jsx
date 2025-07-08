// src/HomePage/Package.jsx
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const plans = [
  {
    title: 'Cơ Bản',
    subtitle: 'Phổ thông',
    price: '550.000.000',
    period: 'VND/kỳ',
    headerGradient: 'bg-gradient-to-r from-green-300 to-blue-200',
    borderColor: 'border-blue-400',
    features: [
      'Sao lưu hồ sơ sức khỏe và vaccine',
      'thông báo phụ huynh',
      'Quản lý đơn thuốc do phụ huynh gửi',
      'Cập nhật sức khỏe học sinh ở trường',
      'Ghi lại tình trạng học sinh khi sử dụng thuốc',
      { text: 'Quản lý giới hạn tài khoản', warning: true },
    ],
    buttonGradient: 'bg-gradient-to-r from-green-300 to-blue-200',
  },
  {
    title: 'Mức Cao',
    subtitle: 'Cao cấp',
    price: '1.500.000.000',
    period: 'VND/Năm',
    headerGradient: 'bg-gradient-to-r from-pink-200 to-orange-200',
    borderColor: 'border-pink-400',
    features: [
      'Bao gồm các mức ở thường',
      'Cung cấp tư vấn viên 24/7',
      'Gửi thông báo phụ huynh về tình sức khỏe của con',
      'Cung cấp các mức thông báo tình hình phụ bằng hình ảnh',
      'Cung cấp các buổi training miễn phí',
      'Quản lý không giới hạn tài khoản',
    ],
    buttonGradient: 'bg-gradient-to-r from-pink-200 to-orange-200',
  },
];

export default function Package() {
  return (
    <section className="py-16 bg-[#677be6] flex justify-center gap-8">
      {plans.map((plan, idx) => (
        <div
          key={idx}
          className="w-[380px] bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col"
        >
          {/* 1. Header */}
          <div className={`${plan.headerGradient} p-6 border-b-4 ${plan.borderColor}`}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-4xl font-serif">{plan.title}</h2>
                <span className="text-sm ml-2">{plan.subtitle}</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold">{plan.price}</div>
                <div className="text-sm">{plan.period}</div>
              </div>
            </div>
          </div>

          {/* 2. Features */}
          <ul className="p-6 space-y-4 flex-grow">
            {plan.features.map((feat, i) => {
              const isWarning = typeof feat === 'object' && feat.warning;
              const text = typeof feat === 'object' ? feat.text : feat;
              return (
                <li key={i} className="flex items-start space-x-2">
                  {isWarning ? (
                    <AlertCircle className="w-6 h-6 text-yellow-400 mt-1" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  )}
                  <span className="text-sm">{text}</span>
                </li>
              );
            })}
          </ul>

          {/* 3. Button */}
          <div className="p-6 mt-auto">
            <button
              className={`${plan.buttonGradient} block w-full text-black py-4 rounded-full`}
            >
              Mua ngay
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
