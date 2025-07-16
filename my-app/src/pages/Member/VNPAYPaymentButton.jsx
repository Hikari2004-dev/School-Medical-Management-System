import React, { useState } from 'react';

export default function VNPAYPaymentButton({
    amount,
    orderInfo,
    className,
    userId,
    packageId,
    packageName
}) {
    const [isLoading, setIsLoading] = useState(false);

    const handlePay = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const paymentData = {
                amount,
                orderInfo,
                userId: userId || 1, // Fallback to user ID 1 for testing
                packageId: packageId || 'PKG_DEFAULT',
                packageName: packageName || orderInfo
            };

            console.log('Sending payment request:', paymentData);

            const res = await fetch('http://localhost:8080/api/payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Payment response:', data);

            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                throw new Error('No payment URL received');
            }

        } catch (error) {
            console.error('Payment error:', error);
            alert(`Lỗi thanh toán: ${error.message}`);
            setIsLoading(false);
        }
    };

    return (
        <button
            className={`${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handlePay}
            disabled={isLoading}
        >
            {isLoading ? 'Đang xử lý...' : 'Thanh toán VNPAY'}
        </button>
    );
}