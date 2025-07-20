import React, { useState, useEffect } from "react";

export default function ConsentForm() {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/users/all")
            .then((res) => {
                if (!res.ok) throw new Error("Không lấy được danh sách người dùng");
                return res.text();
            })
            .then((text) => {
                if (!text) return [];
                try {
                    const data = JSON.parse(text);
                    setUsers(Array.isArray(data) ? data : data.data || []);
                } catch {
                    setUsers([]);
                }
            })
            .catch(() => setUsers([]));
    }, []);

    const handleSend = async (e) => {
        e.preventDefault();
        setStatus("Đang gửi...");
        try {
            const token = localStorage.getItem("token");
            const recipients = users.map(u => u.email).filter(Boolean);
            const body = { subject, content, recipients };
            const res = await fetch("http://localhost:8080/api/notifications/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                setStatus("Gửi thành công!");
                setSubject("");
                setContent("");
            } else {
                setStatus("Gửi thất bại!");
            }
        } catch {
            setStatus("Có lỗi xảy ra!");
        }
    };

    return (
        <form
            className="max-w-lg mx-auto bg-white p-8 rounded shadow"
            onSubmit={handleSend}
        >
            <h2 className="text-xl font-bold mb-6 text-blue-700">
                Gửi thông báo qua Email
            </h2>
            <div className="mb-4">
                <label className="block mb-2 font-medium">Tiêu đề</label>
                <input
                    className="w-full border rounded px-3 py-2"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-medium">Nội dung</label>
                <textarea
                    className="w-full border rounded px-3 py-2"
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded font-semibold"
            >
                Gửi thông báo
            </button>
            {status && (
                <p className="mt-4 text-center text-green-600">{status}</p>
            )}
        </form>
    );
}
