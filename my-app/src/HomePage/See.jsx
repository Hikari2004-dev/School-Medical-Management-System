// src/HomePage/See.jsx
import React from 'react';

export default function See() {
  return (
    <section className="bg-blue-600 text-white rounded-lg mx-4 my-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Headline */}
        <h2 className="text-4xl md:text-5xl font-light leading-snug">
          See SchoMed<br />in action...!
        </h2>

        {/* Right: Description + Button */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <p className="max-w-md text-base md:text-lg">
            Schedule a demo to see how you can make a difference to student health outcomes.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded px-6 py-3">
            Tham gia với chúng tôi
          </button>
        </div>
      </div>
    </section>
  );
}
