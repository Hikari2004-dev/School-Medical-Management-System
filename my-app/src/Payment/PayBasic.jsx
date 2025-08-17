import React, { useState } from "react";
import { UserCircle, CreditCard, CheckCircle, Info } from "lucide-react";
import GoiCoBanImage from "../../Image/banner.png";

// Regex: Cho phép tên tiếng Việt, không dấu, hoa/thường, dấu cách, dấu nháy đơn, tối thiểu 3 ký tự
const NAME_REGEX = /^[a-zA-ZÀ-ỹà-ỹ\s']+$/u;
const PHONE_REGEX = /^0\d{9}$/;

const steps = [
  { icon: <UserCircle size={28} />, label: "Điền thông tin" },
  { icon: <CreditCard size={28} />, label: "Chọn phương thức" },
  { icon: <CheckCircle size={28} />, label: "Thanh toán" },
];

const PayBasic = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "Anh",
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [apiErr, setApiErr] = useState("");

  // Kiểm tra hợp lệ từng trường
  const validName =
    NAME_REGEX.test(form.name.trim()) && form.name.trim().length > 2;
  const validPhone = PHONE_REGEX.test(form.phone.trim());
  const validEmail = form.email.trim() !== ""; // Có thể thêm regex cho email

  const isValid = validName && validPhone && validEmail;

  // Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const showError = (key) => {
    if (!touched[key]) return false;
    if (key === "name")
      return form.name.trim() === "" || !validName;
    if (key === "phone")
      return form.phone.trim() === "" || !validPhone;
    if (key === "email")
      return form.email.trim() === "";
    return false;
  };

  // Submit handler (call API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg("");
    setApiErr("");
    if (!isValid) {
      setTouched({ name: true, phone: true, email: true });
      return;
    }
    setLoading(true);
    try {
      // Replace URL with your real API endpoint
      const res = await fetch("https://your-api-url.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Đăng ký thất bại");
      setServerMsg("Gửi thông tin thành công!");
      setForm({ name: "", phone: "", email: "", gender: "Anh" });
      setTouched({});
    } catch (err) {
      setApiErr("Gửi thông tin thất bại, vui lòng thử lại!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#eaf5fb]">
      {/* Steps Header */}
      <div className="bg-[#1593c6] rounded-b-3xl pt-0 pb-8">
        <div className="max-w-3xl mx-auto px-6 pt-8 pb-0">
          <div className="flex items-center justify-between relative">
            {steps.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-full border-4 shadow transition-all duration-300
                      ${
                        idx === 0
                          ? "bg-white text-[#1593c6] border-[#35baf6] scale-110"
                          : "bg-[#e4f1fb] text-[#b0d5e7] border-[#b0d5e7] hover:text-[#1593c6] hover:border-[#35baf6]"
                      }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`mt-2 text-base font-semibold ${
                      idx === 0 ? "text-white" : "text-[#c6e6fa]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {/* Connector */}
                {idx !== steps.length - 1 && (
                  <div className="flex-1 h-1 bg-[#83d2f7] mx-1"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-3 py-8">
        <div className="pt-2 pb-2">
          <button className="flex items-center gap-2 text-black text-lg font-semibold focus:outline-none">
            <span className="text-2xl">&larr;</span> Quay lại
          </button>
        </div>

        <div className="rounded-2xl shadow-2xl bg-white px-8 py-6">
          {/* Package Info */}
          <div className="bg-[#f6fbfd] rounded-lg px-4 py-3 mb-6">
            <div className="flex gap-4 items-center">
              <img
                src={GoiCoBanImage}
                alt="Gói cơ bản"
                className="w-24 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <div className="grid grid-cols-3 text-center items-center">
                  <div>
                    <div className="text-xs font-bold text-gray-500 mb-1">
                      Tên gói
                    </div>
                    <div className="font-semibold">Gói cơ bản (Phổ thông)</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 mb-1">
                      Số lượng
                    </div>
                    <div className="font-semibold">1</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 mb-1">
                      Đơn giá
                    </div>
                    <div className="font-semibold">550.000 VND</div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-2 border-[#e4ecef]" />
            <div className="text-right font-bold text-[18px]">
              Giá trị đơn hàng :{" "}
              <span className="text-[#e53535]">550.000 VND</span>
            </div>
          </div>

          {/* Customer Info */}
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="font-semibold text-lg mb-3">
              Thông tin khách hàng
            </div>
            <div className="flex items-center gap-5 mb-3">
              <label className="flex items-center gap-1 font-medium text-base">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === "Anh"}
                  onChange={() => setForm((f) => ({ ...f, gender: "Anh" }))}
                  className="accent-[#1593c6]"
                />{" "}
                Anh
              </label>
              <label className="flex items-center gap-1 font-medium text-base">
                <input
                  type="radio"
                  name="gender"
                  checked={form.gender === "Chị"}
                  onChange={() => setForm((f) => ({ ...f, gender: "Chị" }))}
                  className="accent-[#1593c6]"
                />{" "}
                Chị
              </label>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
              <div>
                <div className="flex items-center gap-1 mb-1 font-medium text-base">
                  Họ và tên <span className="text-red-500 text-lg">*</span>
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-md px-3 py-2 bg-[#f0f2f5] text-gray-700 border ${
                    showError("name") ? "border-red-400" : "border-[#e5e6e7]"
                  } focus:border-[#1593c6] outline-none placeholder-gray-400`}
                  required
                />
                {showError("name") && (
                  <span className="text-xs text-red-500">
                    Họ tên chỉ được chứa chữ cái, dấu cách, dấu nháy đơn, tối thiểu 3 ký tự.
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1 font-medium text-base">
                  Số điện thoại <span className="text-red-500 text-lg">*</span>
                </div>
                <input
                  name="phone"
                  type="text"
                  placeholder="0123456789"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={10}
                  className={`w-full rounded-md px-3 py-2 bg-[#f0f2f5] text-gray-700 border ${
                    showError("phone") ? "border-red-400" : "border-[#e5e6e7]"
                  } focus:border-[#1593c6] outline-none placeholder-gray-400`}
                  required
                />
                {showError("phone") && (
                  <span className="text-xs text-red-500">
                    Số điện thoại phải đủ 10 số và bắt đầu bằng 0
                  </span>
                )}
              </div>
            </div>
            <div className="mb-1">
              <div className="flex items-center gap-1 mb-1 font-medium text-base">
                Email <span className="text-red-500 text-lg">*</span>
              </div>
              <input
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-md px-3 py-2 bg-[#f0f2f5] text-gray-700 border ${
                  showError("email") ? "border-red-400" : "border-[#e5e6e7]"
                } focus:border-[#1593c6] outline-none placeholder-gray-400`}
                required
              />
              {showError("email") && (
                <span className="text-xs text-red-500">
                  Vui lòng nhập email
                </span>
              )}
            </div>
            <div className="flex items-center mt-1 mb-2">
              <Info className="text-[#4bb2f9] mr-2" size={18} />
              <span className="text-xs text-gray-600">
                Thông tin đơn hàng sẽ được gửi qua email. Nhà cung cấp sẽ liên hệ với bạn qua số điện thoại.
              </span>
            </div>
            {/* API messages */}
            {serverMsg && (
              <div className="text-green-600 text-center mb-2">{serverMsg}</div>
            )}
            {apiErr && (
              <div className="text-red-600 text-center mb-2">{apiErr}</div>
            )}
            {/* Button */}
            <div className="mt-7 text-center">
              <button
                className="bg-[#35baf6] hover:bg-[#1593c6] transition-all px-16 py-3 rounded-full text-white text-xl font-semibold shadow-md disabled:opacity-50"
                type="submit"
                disabled={!isValid || loading}
              >
                {loading ? "Đang gửi..." : "Tiếp Tục"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PayBasic;
