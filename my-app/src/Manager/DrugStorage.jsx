import React, { useState, useEffect } from "react";

const DrugStorage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [drugList, setDrugList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" }); // Thêm state thông báo
  const [toast, setToast] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/medicalsupply/all");
        if (!response.ok) throw new Error("Không thể lấy dữ liệu thuốc");
        const data = await response.json();
        setDrugList(data);
      } catch (error) {
        setMessage({ text: "Lỗi khi tải danh sách vật tư!", type: "error" });
        setDrugList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDrugs();
  }, []);

  // Hiện toast khi message thay đổi
  useEffect(() => {
    if (message.text) {
      setToast(message);
      const timer = setTimeout(() => setToast({ text: "", type: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const filteredDrugs = drugList.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (supplyId) => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const response = await fetch(`http://localhost:8080/api/medicalsupply/${supplyId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Xoá thất bại");
      setDrugList((prev) => prev.filter((item) => item.supplyId !== supplyId));
      setMessage({ text: "Xoá vật tư thành công!", type: "success" });
    } catch (error) {
      setMessage({ text: "Xoá vật tư thất bại!", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Hàm kiểm tra hết hạn
  const isExpired = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    return expDate < today;
  };

  return (
    <div className="p-6">
      {/* Toast thông báo góc phải */}
      {toast.text && (
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 9999,
            minWidth: 240,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
          className={`p-4 rounded transition-all ${
            toast.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span>{toast.text}</span>
          <button
            onClick={() => setToast({ text: "", type: "" })}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 18,
              fontWeight: "bold",
              cursor: "pointer",
              marginLeft: 8,
              color: "inherit",
            }}
            aria-label="Đóng thông báo"
          >
            ×
          </button>
        </div>
      )}

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
                <th className="px-4 py-2">Tên vật tư</th>
                <th className="px-4 py-2">Số lượng</th>
                <th className="px-4 py-2">Mô tả</th>
                <th className="px-4 py-2">Ngày kiểm tra</th>
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
                filteredDrugs.map((supply, index) => (
                  <tr key={supply.supplyId} className="border-t text-sm">
                    <td className="px-4 py-2">{supply.name}</td>
                    <td className="px-4 py-2">{supply.quantity}</td>
                    <td className="px-4 py-2">{supply.description}</td>
                    <td className="px-4 py-2">{supply.lastCheckedDate}</td>
                    <td className="px-4 py-2">{supply.expirationDate}</td>
                    <td className="px-4 py-2">
                      {isExpired(supply.expirationDate) ? "Hết hạn" : "Còn hạn"}
                    </td>
                    <td className="px-4 py-2 text-blue-600 cursor-pointer hover:underline">
                      Sửa /{" "}
                      <span
                        className="text-red-600 cursor-pointer hover:underline"
                        onClick={() => handleDelete(supply.supplyId)}
                      >
                        Xoá
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-4 text-center text-gray-500" colSpan={7}>
                    Không có vật tư phù hợp.
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
