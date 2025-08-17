import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const UnifiedDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserIdAndData();
  }, []);

  const fetchUserIdAndData = async () => {
    try {
      // Lấy userId và token từ localStorage
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (!token || !userId) {
        console.error('Không tìm thấy token hoặc userId trong localStorage');
        setLoading(false);
        return;
      }

      // Fetch packages
      const packagesResponse = await fetch(`http://localhost:8080/api/payment/user/${userId}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      let packagesData = {};
      if (packagesResponse.ok) {
        packagesData = await packagesResponse.json();
        if (packagesData.success && Array.isArray(packagesData.packages)) {
          setPackages(packagesData.packages);
        } else {
          setPackages([]); // Đảm bảo luôn là mảng
        }
      } else {
        setPackages([]); // Đảm bảo luôn là mảng
        console.error('Không lấy được dữ liệu packages');
      }

      // XÓA hoặc COMMENT đoạn này nếu không có API statistics
      // Fetch statistics
      const statsResponse = await fetch(`http://localhost:8080/api/payment/user/${userId}/statistics`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      let statsData = {};
      if (statsResponse.ok) {
        statsData = await statsResponse.json();
        if (statsData.success) {
          setStatistics(statsData);
        }
      } else {
        console.error('Không lấy được dữ liệu statistics');
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Đã lấy userId từ API nên không cần hàm này nữa

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Đang sử dụng";
      case "expired":
        return "Hết hạn";
      case "cancelled":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
        </div>
        <Footer />
      </div>
    );
  }

  // Tính toán thống kê từ mảng packages
  const totalTransactions = Array.isArray(packages) ? packages.length : 0;
  const totalPackagesSold = Array.isArray(packages) ? packages.length : 0;
  const activePackages = Array.isArray(packages)
    ? packages.filter(pkg => pkg.status === "active" || pkg.status === "SUCCESS").length
    : 0;
  const totalRevenue = Array.isArray(packages)
    ? packages.reduce((sum, pkg) => sum + (pkg.amount || 0), 0)
    : 0;

  const filteredPackages = Array.isArray(packages)
    ? packages.filter(pkg => {
      const matchesFilter = filter === 'all' || pkg.status === filter;
      const matchesSearch = pkg.packageName?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Gói Dịch Vụ Đã Mua</h1>
          <p className="text-blue-100">Theo dõi và quản lý tất cả các gói dịch vụ bạn đã mua</p>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Giao Dịch Mua Gói */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalTransactions}</h3>
            <p className="text-gray-600 text-sm">Giao Dịch Mua Gói</p>
          </div>

          {/* Tổng Gói Đã Mua */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalPackagesSold}</h3>
            <p className="text-gray-600 text-sm">Tổng Gói Đã Mua</p>
          </div>

          {/* Gói Đang Sử Dụng */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{activePackages}</h3>
            <p className="text-gray-600 text-sm">Gói Đang Sử Dụng</p>
          </div>

          {/* Tổng Giá Trị */}
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 3H3m4 10v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(totalRevenue)}</h3>
            <p className="text-gray-600 text-sm">Tổng Giá Trị</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 pb-8">
        {/* Filter and Search */}
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm gói..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả</option>
            <option value="active">Đang sử dụng</option>
            <option value="expired">Hết hạn</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(filteredPackages) && filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{pkg.packageName}</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {pkg.packageId}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(pkg.status)}`}>
                    {getStatusText(pkg.status)}
                  </span>
                </div>

                <div className="text-sm bg-gray-50 p-3 rounded mb-4">
                  <p><strong>Mã giao dịch:</strong> {pkg.txnRef}</p>
                  <p><strong>Mã VNPay:</strong> {pkg.vnpTransactionNo}</p>
                </div>

                <div className="text-sm space-y-1 mb-4">
                  <p><strong>Ngày mua:</strong> {pkg.createdAt}</p>
                  <p><strong>Hết hạn:</strong> {pkg.expiryDate}</p>
                  <p><strong>Thông tin đơn hàng:</strong> {pkg.orderInfo}</p>
                </div>

                <div className="mb-4">
                  <p className="font-medium mb-1">Giá trị gói:</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded border">
                      {formatCurrency(pkg.amount)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-lg font-bold text-blue-600">{formatCurrency(pkg.amount)}</span>
                  <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-8">Không có gói dịch vụ nào.</div>
          )}
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default UnifiedDashboard;