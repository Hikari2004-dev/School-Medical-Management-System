// src/HomePage/Reason.jsx
import React from 'react';

export default function Reason() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <h2 className="text-center text-4xl font-bold mb-8">
         Tại sao chọn SchoMed
        </h2>

        {/* Three equal cards */}
        <div className="grid grid-cols-3 gap-8">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="w-full h-64 bg-gray-200 rounded-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
