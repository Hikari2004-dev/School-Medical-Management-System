import React, { useState, useEffect } from 'react';
import './ApiStatus.css';

const ApiStatus = () => {
    const [status, setStatus] = useState({
        isOnline: false,
        message: 'Checking...',
        lastCheck: null
    });

    const checkApiStatus = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/health', {
                method: 'GET',
                timeout: 3000
            });

            if (response.ok) {
                const data = await response.json();
                setStatus({
                    isOnline: true,
                    message: data.message || 'API Server Online',
                    lastCheck: new Date().toLocaleTimeString('vi-VN')
                });
            } else {
                throw new Error('Server returned error');
            }
        } catch (error) {
            setStatus({
                isOnline: false,
                message: 'API Server Offline - Using mock data',
                lastCheck: new Date().toLocaleTimeString('vi-VN')
            });
        }
    };

    useEffect(() => {
        checkApiStatus();
        const interval = setInterval(checkApiStatus, 30000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`api-status ${status.isOnline ? 'online' : 'offline'}`}>
            <div className="status-indicator">
                <span className="status-dot"></span>
                <span className="status-text">{status.message}</span>
            </div>
            {status.lastCheck && (
                <span className="last-check">
                    Last check: {status.lastCheck}
                </span>
            )}
        </div>
    );
};

export default ApiStatus;
