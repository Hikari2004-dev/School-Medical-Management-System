import React from 'react';

export default function VNPAYPaymentButton({ amount, orderInfo, className }) {
    const handlePay = async () => {
        const res = await fetch('http://localhost:8080/api/payment/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, orderInfo }),
        });
        if (!res.ok) {
            alert('Lỗi máy chủ hoặc không nhận được phản hồi hợp lệ!');
            return;
        }
        const data = await res.json();
        if (!data.paymentUrl) {
            alert('Không nhận được link thanh toán!');
            return;
        }
        window.location.href = data.paymentUrl;
    };

    return (
        <button className={className} onClick={handlePay}>
            Mua ngay
        </button>
    );
}