// File: ReportPage.jsx
import React from "react";
import "./ReportPage.css";

export default function ReportPage() {
    return (
        <div className="report-container">
            <div className="sidebar">
                <div className="logo-section">
                    <img src="/logo192.png" alt="logo" className="logo-img" />
                    <div className="logo-text">
                        <div className="main">SchoMed</div>
                        <div className="sub">School Medical</div>
                    </div>
                </div>
                <nav className="nav-items">
                    <NavItem icon="🏠" text="Trang chủ" link="/" />
                    <NavItem icon="💊" text="Đơn thuốc" link="/medications" />
                    <NavItem icon="💉" text="Sổ vaccine" link="/vaccination" />
                    <NavItem icon="📋" text="Hồ sơ sức khỏe" link="/student-profile"/>
                    <NavItem icon="📄" text="Báo cáo" link="/report" active />
                </nav>
            </div>

            <main className="main-content">
                <div className="header">
                    <h1>Báo cáo sức khỏe</h1>
                </div>
                <div className="content">
                    <p>Trang báo cáo đang được phát triển...</p>
                </div>
            </main>
        </div>
    );
}

export function NavItem({ icon, text, link, active }) {
    return (
        <a href={link} className={`nav-item ${active ? "active" : ""}`}>
            <span className="icon">{icon}</span>
            <span>{text}</span>
        </a>
    );
}
