import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import './Notification.css'; // Thêm dòng này

// Thêm hàm cn thay thế import từ utils
function cn(...args) {
    return args.filter(Boolean).join(' ');
}

// Thêm biến defaultData thay thế import từ data.js
const defaultData = {
    announcements: [],
    events: []
};

const NavIcons = {
    Home: () => (
        <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.5 2.25L24.75 10.125V22.5C24.75 23.5 23.75 24.5 22.5 24.5H18V15H9V24.5H4.5C3.25 24.5 2.25 23.5 2.25 22.5V10.125L13.5 2.25Z"
                fill="white"
            />
        </svg>
    ),
    Stethoscope: () => (
        <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="18.5" cy="10.5" r="2" stroke="white" strokeOpacity="0.97" />
            <circle cx="18.5" cy="10.5" r="0.5" fill="white" fillOpacity="0.97" />
            <circle cx="8.5" cy="13.5" r="1.5" fill="white" fillOpacity="0.97" />
            <path
                d="M8.5 13.5C12.0935 13.5 13.2658 8.65754 13.4669 5.49813C13.502 4.94696 13.0523 4.5 12.5 4.5H11.5"
                stroke="white"
                strokeOpacity="0.97"
                strokeLinecap="round"
            />
            <path
                d="M8.5 13.5C4.9065 13.5 3.73423 8.65754 3.53308 5.49813C3.49799 4.94696 3.94772 4.5 4.5 4.5H5.5"
                stroke="white"
                strokeOpacity="0.97"
                strokeLinecap="round"
            />
            <path
                d="M14 13V15C14 17.7614 11.7614 20 9 20V20C6.23858 20 4 17.7614 4 15V14"
                stroke="white"
                strokeOpacity="0.97"
                strokeLinecap="round"
            />
        </svg>
    ),
    News: () => (
        <svg
            width="23"
            height="20"
            viewBox="0 0 23 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.5192 19H2C1.44772 19 1 18.5523 1 18V5C1 2.79086 2.79086 1 5 1H17.25C19.4591 1 21.25 2.79086 21.25 5V9.30769"
                stroke="white"
                strokeOpacity="0.94"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Package: () => (
        <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.5 14.625V22.7229C13.5 23.1218 13.5 23.3212 13.3712 23.3926C13.2424 23.464 13.0733 23.3583 12.735 23.1469L5.44 18.5875C4.98048 18.3003 4.75072 18.1567 4.62536 17.9305C4.5 17.7043 4.5 17.4334 4.5 16.8915V9M13.5 14.625L4.5 9M13.5 14.625L19.7864 10.696C21.0043 9.93483 21.6132 9.55425 21.6132 9C21.6132 8.44575 21.0043 8.06517 19.7864 7.304L14.56 4.0375C14.0445 3.71533 13.7868 3.55425 13.5 3.55425C13.2132 3.55425 12.9555 3.71533 12.44 4.0375L4.5 9"
                stroke="#FFF8F8"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Archive: () => (
        <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3.375 7.375C3.375 5.48938 3.375 4.54657 3.96079 3.96079C4.54657 3.375 5.48938 3.375 7.375 3.375H19.625C21.5106 3.375 22.4534 3.375 23.0392 3.96079C23.625 4.54657 23.625 5.48938 23.625 7.375V19.625C23.625 21.5106 23.625 22.4534 23.0392 23.0392C22.4534 23.625 21.5106 23.625 19.625 23.625H7.375C5.48938 23.625 4.54657 23.625 3.96079 23.0392C3.375 22.4534 3.375 21.5106 3.375 19.625V7.375Z"
                stroke="white"
                strokeWidth="2"
            />
            <path
                d="M3.375 11.25V11.25C3.375 12.5356 3.375 13.1785 3.65954 13.6532C3.82863 13.9353 4.06469 14.1714 4.34679 14.3405C4.82153 14.625 5.46435 14.625 6.75 14.625H7.55848C8.2542 14.625 8.60206 14.625 8.86395 14.8138C9.12584 15.0025 9.23584 15.3325 9.45585 15.9925L9.66915 16.6325C9.88916 17.2925 9.99916 17.6225 10.261 17.8112C10.5229 18 10.8708 18 11.5665 18H15.4335C16.1292 18 16.4771 18 16.739 17.8112C17.0008 17.6225 17.1108 17.2925 17.3308 16.6325L17.5442 15.9925C17.7642 15.3325 17.8742 15.0025 18.136 14.8138C18.3979 14.625 18.7458 14.625 19.4415 14.625H20.25C21.5356 14.625 22.1785 14.625 22.6532 14.3405C22.9353 14.1714 23.1714 13.9353 23.3405 13.6532C23.625 13.1785 23.625 12.5356 23.625 11.25V11.25"
                stroke="white"
                strokeWidth="2"
            />
        </svg>
    ),
    Campaign: () => (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_611_3981)">
                <path
                    d="M29.9997 18.3334V21.6667H36.6663V18.3334H29.9997ZM26.6663 29.3501C28.2663 30.5334 30.3497 32.1001 31.9997 33.3334C32.6663 32.4501 33.333 31.5501 33.9997 30.6667C32.3497 29.4334 30.2663 27.8667 28.6663 26.6667C27.9997 27.5667 27.333 28.4667 26.6663 29.3501ZM33.9997 9.33341C33.333 8.45008 32.6663 7.55008 31.9997 6.66675C30.3497 7.90008 28.2663 9.46675 26.6663 10.6667C27.333 11.5501 27.9997 12.4501 28.6663 13.3334C30.2663 12.1334 32.3497 10.5834 33.9997 9.33341ZM6.66634 15.0001C4.83301 15.0001 3.33301 16.5001 3.33301 18.3334V21.6667C3.33301 23.5001 4.83301 25.0001 6.66634 25.0001H8.33301V31.6667H11.6663V25.0001H13.333L21.6663 30.0001V10.0001L13.333 15.0001H6.66634ZM25.833 20.0001C25.833 17.7834 24.8663 15.7834 23.333 14.4167V25.5667C24.8663 24.2167 25.833 22.2167 25.833 20.0001Z"
                    fill="#323232"
                />
            </g>
            <defs>
                <clipPath id="clip0_611_3981">
                    <rect width="40" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    Calendar: () => (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_611_3982)">
                <path
                    d="M31.6667 5.00002H30V1.66669H26.6667V5.00002H13.3333V1.66669H10V5.00002H8.33333C6.5 5.00002 5 6.50002 5 8.33335V31.6667C5 33.5 6.5 35 8.33333 35H31.6667C33.5 35 35 33.5 35 31.6667V8.33335C35 6.50002 33.5 5.00002 31.6667 5.00002ZM31.6667 31.6667H8.33333V15H31.6667V31.6667ZM8.33333 11.6667V8.33335H31.6667V11.6667H8.33333ZM17.6 29.1L27.4833 19.2167L25.7167 17.45L17.6 25.5667L14.0833 22.05L12.3167 23.8167L17.6 29.1Z"
                    fill="#323232"
                />
            </g>
            <defs>
                <clipPath id="clip0_611_3982">
                    <rect width="40" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
};

const ContentCard = ({
    title,
    content,
    date,
    showContent = true,
}) => (
    <div className="relative w-full max-w-[420px] mx-auto group cursor-pointer">
        <div className="w-3 h-[200px] bg-schomed-card-blue rounded-xl absolute left-0 top-0 transition-all duration-300 group-hover:w-4" />
        <div className="ml-3 bg-schomed-card-bg rounded-xl p-5 md:p-6 flex flex-col justify-center min-h-[200px] transition-all duration-300 group-hover:shadow-lg group-hover:ml-4 group-hover:transform group-hover:-translate-y-1">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-black font-['Montagu_Slab'] text-lg md:text-xl font-medium flex-1 leading-snug group-hover:text-schomed-blue transition-colors duration-300">
                    {title}
                </h3>
                <span className="text-sm text-gray-500 ml-3 whitespace-nowrap bg-gray-100 px-3 py-1 rounded-full">
                    {new Date(date).toLocaleDateString('vi-VN')}
                </span>
            </div>
            {showContent && (
                <p className="text-schomed-text-gray font-['Montagu_Slab'] text-base md:text-lg leading-6 group-hover:text-gray-700 transition-colors duration-300">
                    {content}
                </p>
            )}
        </div>
    </div>
);

const LoadingSkeleton = () => (
    <div className="relative w-full max-w-[280px] mx-auto">
        <div className="w-2 h-[140px] bg-gray-200 rounded-xl absolute left-0 top-0 animate-pulse" />
        <div className="ml-2 bg-gray-100 rounded-xl p-3 md:p-4 flex flex-col justify-center min-h-[140px] animate-pulse">
            <div className="flex justify-between items-start mb-2">
                <div className="h-4 bg-gray-300 rounded flex-1 mr-2"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
        </div>
    </div>
);

const ErrorMessage = ({ message, onRetry }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-700 mb-3">{message}</p>
        <button
            onClick={onRetry}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
            Thử lại
        </button>
    </div>
);

const EmptyState = ({ type }) => (
    <div className="text-center py-8">
        <div className="text-6xl mb-4">
            {type === 'announcements' ? '📢' : '📅'}
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
            {type === 'announcements' ? 'Chưa có thông báo nào' : 'Chưa có sự kiện nào'}
        </h3>
        <p className="text-gray-500">
            {type === 'announcements'
                ? 'Các thông báo mới sẽ xuất hiện tại đây'
                : 'Các sự kiện sắp tới sẽ xuất hiện tại đây'
            }
        </p>
    </div>
);

const NavigationControls = ({
    currentPage,
    totalPages,
    onPageChange,
    activeFilter,
    onFilterChange
}) => (
    <div className="mb-6">
        {/* Filter buttons - separated row */}
        <div className="flex items-center gap-3 mb-4">
            <button
                onClick={() => onFilterChange('newest')}
                className={cn(
                    "px-6 py-3 rounded-lg font-['Montagu_Slab'] text-sm font-semibold transition-all duration-200 transform hover:scale-105 whitespace-nowrap border-2 shadow-md",
                    activeFilter === 'newest'
                        ? "bg-blue-600 text-white shadow-lg border-blue-600"
                        : "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 border-gray-300"
                )}
                title="Hiển thị thông báo/sự kiện mới nhất"
            >
                📅 Mới nhất
            </button>
            <button
                onClick={() => onFilterChange('oldest')}
                className={cn(
                    "px-6 py-3 rounded-lg font-['Montagu_Slab'] text-sm font-semibold transition-all duration-200 transform hover:scale-105 whitespace-nowrap border-2 shadow-md",
                    activeFilter === 'oldest'
                        ? "bg-blue-600 text-white shadow-lg border-blue-600"
                        : "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 border-gray-300"
                )}
                title="Hiển thị thông báo/sự kiện cũ nhất"
            >
                📜 Cũ nhất
            </button>
        </div>

        {/* Navigation arrows - separated row, right aligned */}
        <div className="flex justify-end">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className={cn(
                        "p-3 rounded-lg transition-all duration-200 transform border-2 shadow-md min-h-[44px] min-w-[44px]",
                        currentPage === 0
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300"
                            : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg border-blue-600"
                    )}
                    title="Trang trước"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="flex items-center bg-white rounded-lg px-4 py-3 min-w-[80px] border-2 border-gray-300 shadow-md min-h-[44px]">
                    <span className="text-sm font-semibold text-gray-800 text-center w-full">
                        {currentPage + 1} / {Math.max(1, totalPages)}
                    </span>
                </div>

                <button
                    onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage >= totalPages - 1}
                    className={cn(
                        "p-3 rounded-lg transition-all duration-200 transform border-2 shadow-md min-h-[44px] min-w-[44px]",
                        currentPage >= totalPages - 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300"
                            : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg border-blue-600"
                    )}
                    title="Trang sau"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
);

const ExportData = ({ data }) => {
    const handleExport = () => {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `schomed-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tải về JSON
        </button>
    );
};

const FileUpload = ({ onDataLoaded, currentData }) => {
    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const result = e.target?.result;
                    const jsonData = JSON.parse(result);

                    // Validate data structure
                    if (jsonData.announcements && jsonData.events) {
                        onDataLoaded(jsonData);
                        alert('Dữ liệu JSON đã được tải thành công!');
                    } else {
                        alert('File JSON không đúng định dạng. Cần có "announcements" và "events".');
                    }
                } catch (error) {
                    alert('Lỗi khi đọc file JSON. Vui lòng kiểm tra định dạng file.');
                }
            };
            reader.readAsText(file);
        } else {
            alert('Vui lòng chọn file JSON.');
        }
    };

    return (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-medium text-blue-800">
                    📁 Quản lý dữ liệu JSON
                </h3>
                <ExportData data={currentData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="font-medium text-blue-700 mb-2">Tải lên file JSON</h4>
                    <input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                        Chọn file JSON chứa dữ liệu thông báo và sự kiện
                    </p>
                </div>
                <div>
                    <h4 className="font-medium text-blue-700 mb-2">Tải xuống dữ liệu</h4>
                    <p className="text-sm text-gray-600">
                        Tải xuống dữ liệu hiện tại dưới dạng file JSON để sao lưu hoặc chia sẻ
                    </p>
                </div>
            </div>
        </div>
    );
};

// Configuration for different server environments
const ServerConfig = {
    // Auto-detect server type based on environment
    getApiBaseUrl: () => {
        const hostname = window.location.hostname;
        const port = window.location.port;
        const protocol = window.location.protocol;

        // If running on Tomcat (typically port 8080)
        if (port === '8080' || hostname.includes('tomcat')) {
            return `${protocol}//${hostname}:${port}/schomed-api`;
        }

        // Default to current origin for Node.js/Express
        return '';
    },

    // API endpoints
    endpoints: {
        data: '/api/data',
        ping: '/api/ping'
    }
};

// Enhanced data loading with server detection
const loadDataWithServerDetection = async (setIsLoading, setError, setData) => {
    try {
        setIsLoading(true);
        setError(null);

        const baseUrl = ServerConfig.getApiBaseUrl();
        const response = await fetch(`${baseUrl}${ServerConfig.endpoints.data}`);

        if (response.ok) {
            const loadedData = await response.json();
            setData(loadedData);
        } else {
            throw new Error(`Server responded with status: ${response.status}`);
        }
    } catch (error) {
        console.error("Failed to load data:", error);
        if (error instanceof TypeError && error.message.includes('fetch')) {
            setError("Không thể kết nối đến server. Vui lòng kiểm tra server đang chạy.");
        } else {
            setError("Lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
        }
    } finally {
        setIsLoading(false);
    }
};

// Enhanced data saving with server detection  
const saveDataWithServerDetection = async (newData) => {
    try {
        const baseUrl = ServerConfig.getApiBaseUrl();
        const response = await fetch(`${baseUrl}${ServerConfig.endpoints.data}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
        });

        if (response.ok) {
            return true;
        } else {
            throw new Error(`Server responded with status: ${response.status}`);
        }
    } catch (error) {
        console.error("Failed to save data:", error);
        return false;
    }
};

const NavItem = ({ icon, text, active = false }) => (
    <div
        className={cn(
            "flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer flex-shrink-0 transform hover:scale-105",
            active
                ? "bg-white/20 shadow-md backdrop-blur-sm"
                : "hover:bg-white/10 hover:shadow-sm"
        )}
        title={text}
    >
        <div className="flex-shrink-0 scale-90 transition-transform duration-200 group-hover:scale-100">{icon}</div>
        <span className="text-schomed-text-nav font-['Montagu_Slab'] text-xs md:text-sm lg:text-base font-normal hidden md:inline whitespace-nowrap">
            {text}
        </span>
    </div>
);

export default function Index() {
    const [data, setData] = useState(defaultData);
    const [announcementFilter, setAnnouncementFilter] = useState('newest');
    const [eventFilter, setEventFilter] = useState('newest');
    const [announcementPage, setAnnouncementPage] = useState(0);
    const [eventPage, setEventPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const ITEMS_PER_PAGE = 3;

    const saveData = async (newData) => {
        const success = await saveDataWithServerDetection(newData);
        if (success) {
            setData(newData);
        } else {
            setError("Không thể lưu dữ liệu. Vui lòng thử lại.");
        }
    };

    const loadData = async () => {
        await loadDataWithServerDetection(setIsLoading, setError, setData);
    };

    useEffect(() => {
        loadData();
    }, []);

    // Helper functions for filtering and sorting
    const sortByDate = (items, order) => {
        return [...items].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return order === 'newest' ? dateB - dateA : dateA - dateB;
        });
    };

    const getFilteredAnnouncements = () => {
        const sorted = sortByDate(data.announcements, announcementFilter === 'oldest' ? 'oldest' : 'newest');
        const startIndex = announcementPage * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return sorted.slice(startIndex, endIndex);
    };

    const getFilteredEvents = () => {
        const sorted = sortByDate(data.events, eventFilter === 'oldest' ? 'oldest' : 'newest');
        const startIndex = eventPage * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return sorted.slice(startIndex, endIndex);
    };

    const getAnnouncementTotalPages = () => {
        return Math.ceil(data.announcements.length / ITEMS_PER_PAGE);
    };

    const getEventTotalPages = () => {
        return Math.ceil(data.events.length / ITEMS_PER_PAGE);
    };

    return (
        <div className="notification-container">
            {/* Header */}
            <Header />


            {/* Main Content */}
            <main className="notification-main space-y-8">
                {/* Announcements Section */}
                <section>
                    <div className="notification-section">
                        <div className="notification-section-header">
                            <div className="icon-scale">
                                <NavIcons.Campaign />
                            </div>
                            <h2 className="notification-section-title">
                                📢 Thông báo
                            </h2>
                        </div>
                        <NavigationControls
                            currentPage={announcementPage}
                            totalPages={getAnnouncementTotalPages()}
                            onPageChange={(page) => setAnnouncementPage(page)}
                            activeFilter={announcementFilter}
                            onFilterChange={(filter) => {
                                setAnnouncementFilter(filter);
                                setAnnouncementPage(0); // Reset to first page when filter changes
                            }}
                        />
                        {error ? (
                            <ErrorMessage message={error} onRetry={loadData} />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
                                {isLoading ? (
                                    // Loading skeletons
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <LoadingSkeleton key={`announcement-skeleton-${index}`} />
                                    ))
                                ) : getFilteredAnnouncements().length === 0 ? (
                                    <EmptyState type="announcements" />
                                ) : (
                                    getFilteredAnnouncements().map((announcement) => (
                                        <ContentCard
                                            key={announcement.id}
                                            title={announcement.title}
                                            content={announcement.content}
                                            date={announcement.date}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Events Section */}
                <section>
                    <div className="notification-section">
                        <div className="notification-section-header">
                            <div className="icon-scale">
                                <NavIcons.Calendar />
                            </div>
                            <h2 className="notification-section-title">
                                📅 Sự kiện
                            </h2>
                        </div>
                        <NavigationControls
                            currentPage={eventPage}
                            totalPages={getEventTotalPages()}
                            onPageChange={(page) => setEventPage(page)}
                            activeFilter={eventFilter}
                            onFilterChange={(filter) => {
                                setEventFilter(filter);
                                setEventPage(0); // Reset to first page when filter changes
                            }}
                        />
                        {error ? (
                            <ErrorMessage message={error} onRetry={loadData} />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
                                {isLoading ? (
                                    // Loading skeletons
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <LoadingSkeleton key={`event-skeleton-${index}`} />
                                    ))
                                ) : getFilteredEvents().length === 0 ? (
                                    <EmptyState type="events" />
                                ) : (
                                    getFilteredEvents().map((event) => (
                                        <ContentCard
                                            key={event.id}
                                            title={event.title}
                                            content={event.content}
                                            date={event.date}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
