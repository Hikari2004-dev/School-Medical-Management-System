# 🏥 School Medical Management System

Hệ thống quản lý y tế trường học với tính năng tin tức động và đầy đủ.

## 🚀 Bắt đầu nhanh

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy cả frontend và backend
```bash
# Sử dụng script tự động (Windows)
start-servers.bat

# Hoặc chạy từng cái riêng biệt
node src/server/ServerNew.js  # Terminal 1
npm start                     # Terminal 2
```

### 3. Truy cập ứng dụng
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)
- Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

## 📖 Tài liệu hướng dẫn

- 📰 [NEWS_GUIDE.md](NEWS_GUIDE.md) - Hướng dẫn sử dụng hệ thống tin tức
- 🔧 [API_FULL_CONTENT_GUIDE.md](API_FULL_CONTENT_GUIDE.md) - Hướng dẫn API đầy đủ
- 🧪 [TESTING_GUIDE.md](TESTING_GUIDE.md) - Hướng dẫn test hệ thống
- 📋 [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Tổng kết dự án
- 🐛 [DEBUG_GUIDE.md](DEBUG_GUIDE.md) - Hướng dẫn debug
- ⚠️ [ERROR_HANDLING_GUIDE.md](ERROR_HANDLING_GUIDE.md) - Xử lý lỗi

## 🎯 Tính năng chính

### 📰 Hệ thống tin tức
- ✅ Hiển thị tin tức động từ API
- ✅ Fallback data khi API offline
- ✅ Infinite scroll và phân trang
- ✅ Tìm kiếm và lọc tin tức
- ✅ Chi tiết bài viết với sidebar
- ✅ Tin tức liên quan
- ✅ Responsive design

### 🏠 Trang chủ
- ✅ Hiển thị tin tức nổi bật
- ✅ Layout đẹp và responsive
- ✅ Navigation mượt mà
- ✅ Loading states

### 🔄 API System
- ✅ RESTful API với Express.js
- ✅ Mock data đầy đủ
- ✅ Error handling
- ✅ CORS support
- ✅ Fallback ID handling

## 🛠️ Cấu trúc dự án

```
my-app/
├── src/
│   ├── components/          # Shared components
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── ApiStatus/
│   ├── pages/              # Page components
│   │   ├── HomePage/
│   │   ├── News/
│   │   └── NewsDetail/
│   ├── data/               # Mock data
│   │   └── newsData.js
│   ├── server/             # Backend server
│   │   └── ServerNew.js
│   └── App.js              # Main app
├── public/                 # Static assets
├── docs/                   # Documentation
└── start-servers.bat       # Auto-start script
```

## 📝 Available Scripts

### `npm start`
Chạy ứng dụng React ở chế độ development.
- Mở [http://localhost:3000](http://localhost:3000)
- Hot reload khi có thay đổi

### `node src/server/ServerNew.js`
Chạy backend server.
- API server tại [http://localhost:5000](http://localhost:5000)
- Auto-reload với nodemon

### `node test-fallback.js`
Test các API endpoints để đảm bảo hoạt động đúng.

### `npm run build`
Build ứng dụng cho production.
- Tối ưu hóa performance
- Minify code

## 🔧 Xử lý lỗi thường gặp

### ❌ "Failed to fetch" hoặc Network Error
```bash
# Kiểm tra server có chạy không
curl http://localhost:5000/api/health

# Khởi động server
node src/server/ServerNew.js
```

### ❌ Fallback ID không hoạt động
- Đảm bảo format ID đúng: `fallback-{round}-{index}`
- Kiểm tra logic trong NewsDetail.jsx và ServerNew.js

### ❌ Component không render
- Kiểm tra import paths
- Xem browser console logs
- Kiểm tra routing trong App.js

**Xem thêm:** [ERROR_HANDLING_GUIDE.md](ERROR_HANDLING_GUIDE.md)

## 🎨 Customization

### Thay đổi theme colors
```css
/* Trong các file CSS */
:root {
  --primary-color: #4285f4;
  --secondary-color: #34a853;
  --accent-color: #ea4335;
}
```

### Thêm tin tức mới
```javascript
// Trong src/data/newsData.js
export const newsData = [
  {
    id: 'new-id',
    title: 'Tiêu đề mới',
    // ... other properties
  }
];
```

### Thêm API endpoint mới
```javascript
// Trong src/server/ServerNew.js
app.get('/api/new-endpoint', (req, res) => {
  // Logic xử lý
});
```

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Performance Monitoring
- Chrome DevTools
- React DevTools
- Network tab

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra [ERROR_HANDLING_GUIDE.md](ERROR_HANDLING_GUIDE.md)
2. Xem browser console
3. Kiểm tra server logs
4. Thử restart server

---

*Cập nhật lần cuối: ${new Date().toLocaleDateString('vi-VN')}*

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
