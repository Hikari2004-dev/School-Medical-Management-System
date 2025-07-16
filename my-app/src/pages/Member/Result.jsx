import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function PaymentResult() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('Đang xử lý kết quả thanh toán...');

    useEffect(() => {
        const success = searchParams.get('success');
        const error = searchParams.get('error');
        const txnRef = searchParams.get('txnRef');
        const amount = searchParams.get('amount');
        const orderInfo = searchParams.get('orderInfo');

        if (success === 'true') {
            setStatus('success');
            setMessage(`Thanh toán thành công!\nMã giao dịch: ${txnRef}\nSố tiền: ${parseInt(amount) / 100} VND\nNội dung: ${orderInfo}`);
        } else if (success === 'false') {
            setStatus('failed');
            setMessage(`Thanh toán thất bại!\nMã giao dịch: ${txnRef}\nLỗi: ${error || 'Không xác định'}`);
        } else {
            setStatus('error');
            setMessage('Có lỗi xảy ra khi xử lý kết quả thanh toán!');
        }

        // Auto redirect after 5 seconds
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 5000);

        return () => clearTimeout(timer);
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg">
                {status === 'loading' && (
                    <div className="text-blue-600">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <h2 className="text-2xl font-bold mb-2">Đang xử lý...</h2>
                        <p>{message}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="text-green-600">
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-2xl font-bold mb-2">Thành công!</h2>
                        <pre className="whitespace-pre-wrap text-sm">{message}</pre>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="text-red-600">
                        <div className="text-6xl mb-4">❌</div>
                        <h2 className="text-2xl font-bold mb-2">Thất bại!</h2>
                        <pre className="whitespace-pre-wrap text-sm">{message}</pre>
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-yellow-600">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold mb-2">Lỗi!</h2>
                        <p>{message}</p>
                    </div>
                )}

                <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-4">
                        Bạn sẽ được chuyển về trang chủ trong 5 giây...
                    </p>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            Quay về trang chủ
                        </button>

                        {status === 'failed' && (
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                            >
                                Thử lại
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}