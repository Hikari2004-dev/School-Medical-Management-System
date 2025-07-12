import React, { useState } from "react";
import { UserCircle, CreditCard, CheckCircle } from "lucide-react";
// Đổi thành file logo/ảnh thực tế nếu có
import vietQRLogo from "../../Image/banner.png";
import bankLogo from "../../Image/banner.png";
import vnpayLogo from "../../Image/banner.png";
import vietinbankLogo from "../../Image/banner.png";
import qrVietQR from "../../Image/banner.png";
import qrBank from "../../Image/qrbasic.jpg";
import qrVNPAY from "../../Image/banner.png";

const steps = [
  { icon: <UserCircle size={28} />, label: "Điền thông tin" },
  { icon: <CreditCard size={28} />, label: "Chọn phương thức" },
  { icon: <CheckCircle size={28} />, label: "Thanh toán" },
];

const paymentMethods = [
  {
    key: "vietqr",
    logo: vietQRLogo,
    name: "Quét mã chuyển khoản VietQR",
    desc: (
      <>
        Áp dụng cho tất cả các ngân hàng.
        <br />
        Để được cộng nhận tiền ngay và hỗ trợ về lỗi vui lòng chọn{" "}
        <b>ngân hàng số 4</b> và nhập số tài khoản.
      </>
    ),
    qr: qrVietQR,
    label: "Quét mã VietQR",
    info: {
      owner: "NGUYEN THUC KHANH TRINH",
      account: "109876664571",
      bank: "VietinBank: CN BINH PHUOC - PGD HON QUAN",
      amount: "550,000 VND",
      content: '"Đăng kí gói hội viên"'
    }
  },
  {
    key: "bank",
    logo: bankLogo,
    name: "Tài khoản ngân hàng",
    desc: "Chấp nhận bởi MB Bank, VIB Bank, SCB Bank, SHINHAN Bank, PVcom Bank, BV Bank",
    qr: qrBank,
    label: "Chuyển khoản ngân hàng",
    info: {
      owner: "NGUYEN THUC KHANH TRINH",
      account: "10987666457138",
      bank: "VietinBank: CN BINH PHUOC - PGD HON QUAN",
      amount: "550,000 VND",
      content: '"Đăng kí gói hội viên"'
    }
  },
  {
    key: "vnpay",
    logo: vnpayLogo,
    name: "VNPAY QR",
    desc: null,
    qr: qrVNPAY,
    label: "Thanh toán qua VNPAY QR",
    info: {
      owner: "NGUYEN THUC KHANH TRINH",
      account: "1122334455",
      bank: "VietinBank: CN BINH PHUOC - PGD HON QUAN",
      amount: "550,000 VND",
      content: '"Đăng kí gói hội viên"'
    }
  }
];

const MethodDetail = ({ method }) => {
  if (!method) return null;
  return (
    <div className="w-[380px] min-h-[500px]">
      <div className="bg-[#f3f7fa] rounded-xl p-5 flex flex-col items-center shadow">
        {/* Logo, label (tuỳ chỉnh theo loại) */}
        {(method.key === "bank" || method.key === "vietqr") && (
          <div className="flex items-center justify-center mb-2 gap-2">
            <img src={vietinbankLogo} alt="VietinBank" className="h-7 w-auto" />
            <span className="font-semibold text-base text-[#1a4686]">napas 24/7</span>
            <span className="text-base text-[#e53535] font-bold ml-1">VietQR</span>
          </div>
        )}
        {/* QR code */}
        <div
          className="rounded-lg mb-3 flex items-center justify-center shadow"
          style={{
            width: 220,
            height: 220,
            background: "#f3f7fa"
          }}
        >
          <img
            src={method.qr}
            alt={method.label}
            className="max-w-full max-h-full rounded-lg"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              background: "#f3f7fa"
            }}
          />
        </div>
        {/* Thông tin dưới QR */}
        <div className="text-center mt-1 w-full">
          <div className="font-bold text-base text-[#1a4686] mb-1">{method.info.owner}</div>
          <div className="text-base tracking-wide mb-1">Tài khoản: <b>{method.info.account}</b></div>
          <div className="text-xs text-gray-600 mb-1">{method.info.bank}</div>
          <div className="font-bold text-lg text-[#1593c6] mt-2">{method.info.amount}</div>
          <div className="text-sm text-gray-700 mt-1">{method.info.content}</div>
          {method.key === "vietqr" && (
            <div className="text-xs text-gray-500 mt-2">
              Quét mã QR bằng app ngân hàng, điền đúng nội dung chuyển khoản
            </div>
          )}
          {method.key === "vnpay" && (
            <div className="text-xs text-gray-500 mt-2">
              Mở app VNPAY, chọn quét mã QR để thanh toán ngay
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StepTwo = () => {
  const [active, setActive] = useState("vietqr");
  const orderId = "ABCXYZ_1200099";
  const userName = "Anh Nguyễn Văn A";
  const content = "Đăng kí gói hội viên mức cơ bản";
  // Tìm phương thức đang chọn từ mảng
  const activeMethod = paymentMethods.find((m) => m.key === active);

  return (
    <div className="min-h-screen bg-[#eaf5fb]">
      {/* Steps Header */}
      <div className="bg-[#1593c6] rounded-b-3xl pt-0 pb-8 shadow">
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-0">
          <div className="flex items-center justify-between relative">
            {steps.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-full border-4 shadow transition-all duration-300
                      ${
                        idx === 1
                          ? "bg-white text-[#1593c6] border-[#35baf6] scale-110"
                          : "bg-[#e4f1fb] text-[#b0d5e7] border-[#b0d5e7]"
                      }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`mt-2 text-base font-semibold ${
                      idx === 1 ? "text-white" : "text-[#c6e6fa]"
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

      {/* Main Content: 2 columns */}
      <div className="w-full flex justify-center pt-8 pb-16">
        <div className="max-w-5xl w-full flex gap-8">
          {/* Left: Order info & chọn phương thức */}
          <div className="flex-1">
            {/* Back */}
            <div className="pt-2 pb-2">
              <button className="flex items-center gap-2 text-black text-lg font-semibold focus:outline-none">
                <span className="text-2xl">&larr;</span> Quay lại
              </button>
            </div>
            {/* Order Info */}
            <div className="bg-white rounded-xl shadow-md p-5 mb-8">
              <div className="text-base mb-2">
                <span className="font-bold text-gray-600">Mã đơn hàng:</span>{" "}
                <span className="font-semibold">{orderId}</span>
              </div>
              <div className="text-base mb-2">
                <span className="font-bold text-gray-600">Người mua :</span>{" "}
                <span className="font-semibold">{userName}</span>
              </div>
              <div className="text-base">
                <span className="font-bold text-gray-600">Nội dung :</span>{" "}
                <span className="font-semibold">{content}</span>
              </div>
            </div>
            <div className="font-semibold text-lg text-left mb-5">
              Chọn hình thức thanh toán
            </div>
            <div className="space-y-5">
              {paymentMethods.map((pm) => (
                <div
                  key={pm.key}
                  className={`flex items-center rounded-xl shadow-lg p-4 cursor-pointer border-2 transition
                    ${
                      active === pm.key
                        ? "border-[#35baf6] bg-[#eaf8ff]"
                        : "border-transparent bg-white hover:bg-[#f3faff]"
                    }`}
                  onClick={() => setActive(pm.key)}
                >
                  <div className="flex items-center justify-center rounded-full bg-white shadow-md w-14 h-14 mr-5">
                    <img
                      src={pm.logo}
                      alt={pm.name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-base mb-1">
                      {pm.name}
                    </div>
                    {pm.desc && (
                      <div className="text-xs text-gray-500 leading-5">
                        {pm.desc}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chi tiết QR, bank... */}
          <div className="flex-none">
            <MethodDetail method={activeMethod} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
