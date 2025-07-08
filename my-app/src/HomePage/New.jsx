// src/HomePage/News.jsx
import React from 'react';

export default function News() {
  // Mình tạo 3 dòng bên phải với 2 card/lần,
  // và 2 card lớn bên trái
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Tiêu đề với hai đường kẻ hai bên */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-black"></div>
          <h2 className="px-4 text-2xl font-bold">Tin Tức</h2>
          <div className="flex-1 border-t border-black"></div>
        </div>

        {/* Layout chính: grid 3 cột */}
        <div className="grid grid-cols-3 gap-6">
          {/* Cột trái (2 cards lớn) */}
          <div className="col-span-2 space-y-6">
            {/* Card lớn 1 */}
            <div className="h-48 bg-gray-200 rounded-lg"></div>
            {/* Card lớn 2 */}
            <div className="h-40 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Cột phải (3 hàng, mỗi hàng 2 cards nhỏ) */}
          <div className="space-y-6">
            {[0, 1, 2].map((_, row) => (
              <div key={row}>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 h-24 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 h-24 bg-gray-200 rounded-lg"></div>
                </div>
                {/* Sau hai hàng đầu, chèn đường kẻ */}
                {row < 2 && (
                  <div className="border-t border-gray-300 mb-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
