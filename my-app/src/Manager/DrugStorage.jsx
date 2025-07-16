import React, { useState, useEffect } from "react";

const DrugStorage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [drugList, setDrugList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gọi API khi component mount
  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await fetch("https://your-api.com/api/drugs"); // 🔁 Đổi URL phù hợp backend
        const data = await response.json();
        setDrugList(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách thuốc:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrugs();
  }, []);

  const filteredDrugs = drugList.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="bg-gray-100 rounded-xl p-6 max-w-6xl mx-auto shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
          <span className="mr-2 text-2xl">📦</span>
          Medication Storage
        </h2>

        {/* Thanh tìm kiếm */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm tên thuốc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none"
          />
        </div>

        {/* Bảng danh sách thuốc */}
        <div className="overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-sm text-gray-700">
                <th className="px-4 py-2">Tên thuốc</th>
                <th className="px-4 py-2">Loại</th>
                <th className="px-4 py-2">Số lượng</th>
                <th className="px-4 py-2">Đơn vị</th>
                <th className="px-4 py-2">Ngày hết hạn</th>
                <th className="px-4 py-2">Trạng thái</th>
                <th className="px-4 py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-4 text-center text-gray-500" colSpan={7}>
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : filteredDrugs.length > 0 ? (
                filteredDrugs.map((drug, index) => (
                  <tr key={index} className="border-t text-sm">
                    <td className="px-4 py-2">{drug.name}</td>
                    <td className="px-4 py-2">{drug.type}</td>
                    <td className="px-4 py-2">{drug.amount}</td>
                    <td className="px-4 py-2">{drug.unit}</td>
                    <td className="px-4 py-2">{drug.expiryDate}</td>
                    <td className="px-4 py-2">{drug.status}</td>
                    <td className="px-4 py-2 text-blue-600 cursor-pointer hover:underline">
                      Sửa / Xoá
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-4 text-center text-gray-500" colSpan={7}>
                    Không có thuốc phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DrugStorage;
