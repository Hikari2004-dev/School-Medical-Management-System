// src/HomePage/Event.jsx
import React from 'react';

const events = [
  { bgColor: 'bg-red-500', overlayColor: 'bg-red-700' },
  { bgColor: 'bg-blue-500', overlayColor: 'bg-blue-700' },
  { bgColor: 'bg-green-500', overlayColor: 'bg-green-700' },
];

export default function Event() {
  return (
    <section className="py-16 bg-[#1f0836]">
      {/* Section title */}
      <h2 className="text-center text-4xl text-white mb-12">Sự Kiện SchoMed</h2>

      {/* Event cards */}
      <div className="container mx-auto px-4 flex justify-center gap-8">
        {events.map((evt, idx) => (
          <div
            key={idx}
            className="relative w-[327px] h-[155px] rounded-lg overflow-hidden"
          >
            {/* Background block */}
            <div className={`absolute inset-0 ${evt.bgColor}`} />

            {/* Overlay "thời gian" block */}
            <div
              className={`absolute top-0 left-2 w-[109px] h-[139px] ${evt.overlayColor} rounded-lg flex items-center justify-center`}
            >
              <span className="text-white text-lg">thời gian</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
