// src/MoreService/VideoCall/OnlineConsultation.jsx
import React, { useState, useMemo, useEffect } from "react";
import {
  PhoneCall,
  Users,
  CalendarCheck,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import avatar from "../../Image/banner.png";

export default function OnlineConsultation() {
  const [nurses, setNurses] = useState([]);
  const [selectedNurse, setSelectedNurse] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [issue, setIssue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Gọi API để lấy danh sách y tá
    const fetchNurses = async () => {
      try {
        const response = await fetch("https://your-api-endpoint.com/api/nurses");
        const data = await response.json();
        setNurses(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách y tá:", error);
      }
    };
    fetchNurses();
  }, []);

  const bookedSlots = useMemo(() => ({
    "Y tá A": {
      "2025-07-01": ["08:30"]
    },
    "Y tá B": {
      "2025-07-01": ["09:30"]
    }
  }), []);

  const allSlots = useMemo(() => {
    const slots = [];
    for (let h = 8; h <= 16; h++) {
      ["00", "30"].forEach(m => slots.push(`${String(h).padStart(2, "0")}:${m}`));
    }
    return slots;
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const nowTime = new Date().toTimeString().slice(0, 5);
  const occupied = bookedSlots[selectedNurse]?.[selectedDate] || [];

  const handleSubmit = e => {
    e.preventDefault();
    setErrorMsg("");

    if (!selectedNurse || !selectedDate || !selectedSlot || !issue.trim()) {
      setErrorMsg("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (selectedDate < today) {
      setErrorMsg("Ngày chọn đã qua. Vui lòng chọn lại.");
      return;
    }

    if (selectedDate === today && selectedSlot <= nowTime) {
      setErrorMsg("Khung giờ đã qua. Vui lòng chọn lại.");
      return;
    }

    if (occupied.includes(selectedSlot)) {
      setErrorMsg("Khung giờ này đã được đặt. Vui lòng chọn khung khác.");
      return;
    }

    setSubmitted(true);
  };

  const resetAll = () => {
    setSelectedNurse("");
    setSelectedDate("");
    setSelectedSlot("");
    setIssue("");
    setSubmitted(false);
    setErrorMsg("");
  };

  return (
    <section className="bg-[#eaf7ff] py-8 px-4 md:px-16">
      <nav className="text-[#1e40af] mb-6">
        Trang chủ &gt; Dịch vụ &gt; <span className="font-semibold">Tư vấn sức khỏe trực tuyến</span>
      </nav>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-[#1e40af] flex items-center gap-2">
            <CalendarCheck size={24} /> Đặt lịch tư vấn
          </h2>

          {submitted ? (
            <div className="space-y-4">
              <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
                <CheckCircle size={20} />
                Đặt lịch thành công với <strong>{selectedNurse}</strong> vào <strong>{selectedDate} {selectedSlot}</strong>.
              </div>
              <button onClick={resetAll}
                className="bg-white border border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50"
              >Đặt lịch khác</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-700">Chọn y tá</label>
                <select value={selectedNurse} required
                  onChange={e => {
                    setSelectedNurse(e.target.value);
                    setSelectedDate("");
                    setSelectedSlot("");
                    setErrorMsg("");
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">-- Chọn y tá --</option>
                  {nurses.map(d => (
                    <option key={d.id} value={d.name}>
                      {d.name} – {d.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Chọn ngày</label>
                <input type="date" min={today} value={selectedDate} required
                  onChange={e => {
                    setSelectedDate(e.target.value);
                    setSelectedSlot("");
                    setErrorMsg("");
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {selectedDate && (
                <div>
                  <label className="block mb-1 text-gray-700">Chọn khung giờ</label>
                  <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                    {allSlots.map(slot => {
                      const booked = occupied.includes(slot);
                      const past = selectedDate === today && slot <= nowTime;
                      const disabled = booked || past;
                      const sel = slot === selectedSlot;
                      return (
                        <button key={slot} type="button"
                          onClick={() => !disabled && setSelectedSlot(slot)}
                          disabled={disabled}
                          className={`px-2 py-1 rounded-lg text-sm ${disabled
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                            : sel
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-700 hover:bg-blue-100"}`}
                        >{slot}</button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <label className="block mb-1 text-gray-700">Mô tả vấn đề</label>
                <textarea rows={4} value={issue} required
                  onChange={e => setIssue(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
                  placeholder="Ví dụ: bé hay bị đau đầu..."
                />
              </div>

              {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}

              <button type="submit"
                className="w-full bg-[#1e40af] hover:bg-blue-800 text-white font-semibold py-2 rounded-lg text-base flex items-center justify-center gap-2"
              >
                <CalendarCheck size={20} /> Đặt lịch ngay
              </button>
            </form>
          )}

          <div className="mt-6 text-gray-600 space-y-2">
            <p className="flex items-center gap-2"><MessageCircle className="text-blue-500" /> Tư vấn video/chat.</p>
            <p className="flex items-center gap-2"><PhoneCall className="text-blue-500" /> Bảo mật thông tin.</p>
            <p className="flex items-center gap-2"><Users className="text-blue-500" /> Chuyên gia uy tín.</p>
          </div>
        </div>

        <div className="md:w-1/2 bg-white rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[800px]">
          <h2 className="text-2xl font-bold text-[#1e40af] flex items-center gap-2 mb-4">
            <Users size={24} /> Danh sách y tá
          </h2>
          {nurses.map(doc => {
            const locked = submitted && doc.name !== selectedNurse;
            return (
              <div key={doc.id}
                onClick={() => {
                  if (!submitted) {
                    setSelectedNurse(doc.name);
                    setSelectedDate("");
                    setSelectedSlot("");
                    setErrorMsg("");
                  }
                }}
                className={`flex items-center p-4 mb-2 rounded-lg border ${
                  selectedNurse === doc.name ? "border-blue-500 bg-blue-50" : "border-gray-300"
                } ${locked ? "opacity-50 cursor-not-allowed" : "hover:shadow cursor-pointer"}`}
              >
                <img src={doc.avatar} alt={doc.name}
                  className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold">{doc.name}</h3>
                  <p className="text-sm">{doc.specialty}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}