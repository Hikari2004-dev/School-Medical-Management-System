// src/Member/SubscriptionHero.jsx
import React from 'react';
import MemberIllustration from '../Image/banner.png';

export default function SubscriptionHero() {
  return (
    <section className="relative bg-[#677be6] text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        {/* Left: Breadcrumb + Title + Subtitle */}
        <div className="md:w-1/2 space-y-4">
          <span className="inline-block bg-[#554fc1] px-4 py-1 rounded-full text-sm">
            Trang Chủ &gt;&gt; Hội Viên
          </span>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight">
            Gói đăng ký quản<br className="md:hidden" /> lý sức khỏe học sinh
          </h1>
          <p className="text-lg md:text-xl">
            Chọn gói phù hợp với trường học của bạn
          </p>
        </div>

        {/* Right: Illustration */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src={MemberIllustration}
            alt="Illustration"
            className="w-80 md:w-[400px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
