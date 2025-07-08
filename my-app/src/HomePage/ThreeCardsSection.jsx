// src/ThreeCardsSection.jsx
import React from 'react';

export default function ThreeCardsSection() {
  // 3 màu lần lượt cho các khung
  const barColors = ['#34D399', '#2563EB', '#D946EF'];

  return (
    <section className="bg-gray-200 py-8">
      <div className="container mx-auto px-4 flex justify-center gap-8">
        {barColors.map((color, idx) => (
          <div
            key={idx}
            className="w-[350px] bg-white rounded shadow overflow-hidden"
          >
            {/* Thanh màu cao gấp 3 lần h-2 */}
            <div
              className="h-6 w-full"
              style={{ backgroundColor: color }}
            />
            {/* Phần nội dung trắng */}
            <div className="h-[100px]" />
          </div>
        ))}
      </div>
    </section>
  );
}
