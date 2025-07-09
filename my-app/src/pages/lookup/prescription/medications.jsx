import { useEffect, useState } from "react";
import "./medications.css";

export default function App() {
    const [medications, setMedications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("prescription");

    useEffect(() => {
        fetch("/api/medications.json")
            .then((res) => res.json())
            .then((data) => {
                setMedications(data.medications);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">
                    <img
                        src="để hình ảnh"
                        alt="Logo"
                        className="logo-img"
                    />
                    <h1>SchoMed</h1>
                    <p>School Medical</p>
                </div>
                <nav className="nav">
                    <button onClick={() => setActiveTab("homepage")}>Trang chủ</button>
                    <button onClick={() => setActiveTab("personal")}>Thông tin cá nhân</button>
                    <button onClick={() => setActiveTab("prescription")}>Đơn thuốc</button>
                    <button onClick={() => setActiveTab("vaccination")}>Sổ vaccine</button>
                    <button onClick={() => setActiveTab("health")}>Hồ sơ sức khỏe</button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="content">
                <header className="header">
                    <img
                        src="để hình ảnh"
                        alt="Avatar"
                        className="avatar"
                    />
                    <div>
                        <h2>Nguyễn Đoàn Duy Khánh</h2>
                        <p>Lớp 12A1</p>
                    </div>
                </header>

                {/* Content based on tab */}
                <section className="tab-content">
                    {activeTab === "prescription" && (
                        <>
                            <h3>Đơn thuốc</h3>
                            {loading ? (
                                <p>Đang tải dữ liệu...</p>
                            ) : medications.length === 0 ? (
                                <p>Không có đơn thuốc</p>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Tên thuốc</th>
                                            <th>Liều dùng</th>
                                            <th>Số lần/ngày</th>
                                            <th>Ngày bắt đầu</th>
                                            <th>Ghi chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {medications.map((med) => (
                                            <tr key={med.id}>
                                                <td>{med.name}</td>
                                                <td>{med.dosage}</td>
                                                <td>{med.frequency}</td>
                                                <td>{med.startDate}</td>
                                                <td>{med.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}

                    {activeTab === "personal" && <p>Thông tin cá nhân sẽ được hiển thị ở đây.</p>}
                    {activeTab === "vaccination" && <p>Lịch sử tiêm chủng sẽ được hiển thị ở đây.</p>}
                    {activeTab === "health" && <p>Hồ sơ sức khỏe sẽ được hiển thị ở đây.</p>}
                </section>
            </main>
        </div>
    );
}
