  import React from "react";

  const packages = [
    {
      title: "Gói Khám Cơ Bản",
      features: [
        "Khám tổng thể (thể lực, chiều cao, cân nặng)",
        "Kiểm tra huyết áp",
        "Đo thị lực cơ bản",
        "Tư vấn dinh dưỡng",
      ],
      price: "150.000₫/lần khám",
    },
    {
      title: "Gói Phổ Thông",
      features: [
        "Tất cả nội dung Gói Khám Cơ Bản",
        "Khám tai – mũi – họng",
        "Kiểm tra răng miệng",
        "Xét nghiệm máu tổng quát",
      ],
      price: "250.000₫/lần khám",
    },
    {
      title: "Gói Nâng Cao",
      features: [
        "Tất cả nội dung Gói Phổ Thông",
        "Siêu âm tim – phổi",
        "Đo loãng xương cơ bản",
        "Tư vấn sức khỏe tâm thần (trắc nghiệm ngắn)",
      ],
      price: "350.000₫/lần khám",
    },
    {
      title: "Gói Toàn Diện Học Đường",
      features: [
        "Tất cả nội dung Gói Nâng Cao",
        "Kiểm tra cột sống (phát hiện tư thế sai)",
        "Xét nghiệm nước tiểu",
        "Khám mắt chuyên sâu (đo khúc xạ)",
        "Báo cáo và tư vấn kết quả chi tiết",
      ],
      price: "500.000₫/lần khám",
    },
  ];

  const Form = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      // TODO: submit form
    };

    return (
      <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl overflow-hidden border border-gray-200 flex flex-col md:flex-row">
          {/* Left: Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-[#1e40af] mb-6">
              Đăng ký gói khám
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên học sinh"
                  required
                  className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ngày sinh <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  required
                  className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Gói khám <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    className="
          appearance-none
          w-full
          px-4 py-3
          pr-10              /* chừa chỗ cho icon */
          border-2 border-blue-300
          rounded-full
          bg-white
          focus:outline-none focus:border-blue-500
          transition
        "
                  >
                    <option value="">Chọn gói khám</option>
                    {packages.map((pkg) => (
                      <option key={pkg.title} value={pkg.title}>
                        {pkg.title} – {pkg.price}
                      </option>
                    ))}
                  </select>
                  {/* Arrow icon */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1e40af] hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Đăng ký ngay
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-200" />

          {/* Right: Các gói tham khảo */}
          <div className="w-full md:w-1/2 bg-[#f9fafb] p-8">
            <h3 className="text-2xl font-semibold text-[#1e40af] mb-4">
              Các gói khám tham khảo
            </h3>
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
              {packages.map((pkg) => (
                <div
                  key={pkg.title}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-[#1e40af]">
                      {pkg.title}
                    </span>
                    <span className="text-sm font-semibold text-gray-600">
                      {pkg.price}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-gray-700">
                    {pkg.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Form;
