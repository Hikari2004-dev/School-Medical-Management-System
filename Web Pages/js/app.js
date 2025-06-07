import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

function StudentProfile() {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img
          src="https://i.imgur.com/0y0y0y0.png"
          alt="Avatar"
          className="avatar"
        />
        <div className="profile-info">
          <h2>Nguyễn Đoàn Duy Khánh</h2>
          <p>Lớp 12A1 | GVCN: Lâm Phương Thúy</p>
          <p>Chiều cao: 170cm | Cân nặng: 60kg</p>
          <p>Giới tính: Nam/Nữ</p>
        </div>
      </div>

      <div className="tabs">
        <div className="tab active">Thông tin cá nhân</div>
        <div className="tab">Đơn thuốc</div>
        <div className="tab">Lịch sử tiêm chủng</div>
        <div className="tab">Hồ sơ sức khỏe</div>
      </div>

      <div className="profile-body">
        <div className="column">
          <p><strong>Mẹ:</strong> Nguyễn Thị A</p>
          <p><strong>Điện thoại:</strong> 0901 123 456</p>
          <p><strong>Ba:</strong> Nguyễn Văn B</p>
          <p><strong>Điện thoại:</strong> 0902 654 321</p>
        </div>
        <div className="column">
          <p><strong>Email:</strong> khanh@gmail.com</p>
          <p><strong>Địa chỉ:</strong> 123 Nguyễn Trãi, Quận 1</p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<StudentProfile />, document.getElementById("root"));
