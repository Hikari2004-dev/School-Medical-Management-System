// src/Manager/Performance.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaChartBar, FaProjectDiagram, FaUsers, FaUser } from "react-icons/fa";

const data = [
  { thang: "T1", giaTri: 40 },
  { thang: "T2", giaTri: 60 },
  { thang: "T3", giaTri: 25 },
  { thang: "T4", giaTri: 55 },
  { thang: "T5", giaTri: 75 },
  { thang: "T6", giaTri: 30 },
  { thang: "T7", giaTri: 65 },
  { thang: "T8", giaTri: 70 },
  { thang: "T9", giaTri: 80 },
  { thang: "T10", giaTri: 58 },
  { thang: "T11", giaTri: 62 },
  { thang: "T12", giaTri: 78 },
];

export default function Performance() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Tổng quan Hiệu Suất</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow flex flex-col">
          <div className="flex items-center mb-2">
            <FaChartBar className="text-indigo-500 mr-2" size={24} />
            <span className="font-medium">Tháng này</span>
          </div>
          <div className="text-3xl font-bold">92%</div>
          <div className="text-sm text-gray-500">
            Tăng 4% so với tháng trước
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex flex-col">
          <div className="flex items-center mb-2">
            <FaProjectDiagram className="text-green-500 mr-2" size={24} />
            <span className="font-medium">Tiến độ Dự án</span>
          </div>
          <div className="text-3xl font-bold">Đúng tiến độ</div>
          <div className="text-sm text-gray-500">85% dự án đúng lịch</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex flex-col">
          <div className="flex items-center mb-2">
            <FaUsers className="text-purple-500 mr-2" size={24} />
            <span className="font-medium">Số lượt truy cập</span>
          </div>
          <div className="text-3xl font-bold">25.267</div>
          <div className="text-sm text-gray-500">+12% so với tháng trước</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex flex-col">
          <div className="flex items-center mb-2">
            <FaUser className="text-blue-500 mr-2" size={24} />
            <span className="font-medium">Số người dùng</span>
          </div>
          <div className="text-3xl font-bold">8.643</div>
          <div className="text-sm text-gray-500">+8% người dùng hoạt động</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Biểu đồ Hiệu Suất</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="thang" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="giaTri" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
