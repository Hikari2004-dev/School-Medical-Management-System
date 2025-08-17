# Hướng dẫn API Lấy Nội dung Đầy đủ Tin tức

## Tổng quan
Hệ thống đã được nâng cấp để có thể lấy **toàn bộ nội dung chi tiết** của các bài tin tức từ các nguồn tin tức trực tuyến, không chỉ dừng lại ở tiêu đề và tóm tắt.

## Các tính năng mới

### 1. API Lấy Nội dung Đầy đủ
- **Endpoint**: `/api/news/full`
- **Mô tả**: Lấy danh sách tin tức kèm theo nội dung chi tiết đầy đủ
- **Tham số**:
  - `page`: Số trang (mặc định: 1)
  - `limit`: Số bài viết mỗi trang (mặc định: 10)

**Ví dụ**:
```
GET http://localhost:5000/api/news/full?page=1&limit=10
```

### 2. API Tìm kiếm Tin tức
- **Endpoint**: `/api/news/search`
- **Mô tả**: Tìm kiếm tin tức theo từ khóa trong tiêu đề, tóm tắt và nội dung
- **Tham số**:
  - `q`: Từ khóa tìm kiếm (bắt buộc)
  - `category`: Lọc theo danh mục (tùy chọn)
  - `limit`: Số kết quả tối đa (mặc định: 10)

**Ví dụ**:
```
GET http://localhost:5000/api/news/search?q=vaccine&category=suc-khoe&limit=5
```

### 3. Cải tiến API Chi tiết Bài viết
- **Endpoint**: `/api/news/:id`
- **Mô tả**: Lấy nội dung chi tiết của một bài viết cụ thể
- **Tính năng mới**:
  - Tự động scrape nội dung từ URL gốc
  - Làm sạch HTML không cần thiết
  - Fallback sang mock data nếu không lấy được nội dung

## Nguồn tin tức được hỗ trợ

### Các trang web tin tức y tế
1. **VnExpress Sức khỏe** - https://vnexpress.net/suc-khoe
2. **Tuổi Trẻ Sức khỏe** - https://tuoitre.vn/suc-khoe.htm
3. **Báo Sức khỏe Đời sống** - https://suckhoedoisong.vn/
4. **Báo Dân trí Sức khỏe** - https://dantri.com.vn/suc-khoe.htm
5. **Báo Thanh niên Sức khỏe** - https://thanhnien.vn/suc-khoe/

## Cách thức hoạt động

### 1. Scraping Cơ bản
```javascript
// Lấy danh sách tin tức từ trang chủ
const articles = await scrapeNews(source);
```

### 2. Scraping Nội dung Chi tiết
```javascript
// Lấy nội dung đầy đủ từ URL bài viết
const content = await scrapeArticleContent(articleUrl);
```

### 3. Làm sạch Nội dung
- Loại bỏ script, style, iframe
- Xóa comment HTML
- Chuẩn hóa links và images
- Giữ lại format HTML cơ bản

## Cấu trúc Response

### Tin tức với nội dung đầy đủ
```json
{
  "success": true,
  "data": [
    {
      "id": "unique-id",
      "title": "Tiêu đề bài viết",
      "summary": "Tóm tắt ngắn gọn",
      "content": "<div>Nội dung HTML đầy đủ...</div>",
      "image": "URL hình ảnh",
      "category": "Danh mục",
      "publishDate": "2025-07-07",
      "source": "Nguồn tin",
      "author": "Tác giả",
      "tags": ["tag1", "tag2"],
      "readTime": "5 phút đọc",
      "views": 1234,
      "likes": 89,
      "fullContent": true,
      "link": "URL gốc"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Tích hợp Frontend

### News.jsx
- Sử dụng `/api/news/full` thay vì `/api/news`
- Hiển thị badge "Nội dung đầy đủ" cho các bài có `fullContent: true`
- Tăng timeout lên 15s để chờ scraping

### NewsDetail.jsx
- Tự động lấy nội dung chi tiết qua API
- Fallback sang local data nếu API không khả dụng
- Hiển thị thông tin tác giả và nguồn từ API

### HomePage.jsx
- Tích hợp API để lấy 6 bài tin tức mới nhất
- Hiển thị indicator cho các bài có nội dung đầy đủ

## Xử lý Lỗi

### Các trường hợp lỗi thường gặp
1. **Timeout**: Tăng timeout lên 15s
2. **Website chặn bot**: Sử dụng User-Agent thực tế
3. **Selector không đúng**: Fallback sang selector khác
4. **Network error**: Sử dụng mock data

### Fallback Strategy
```javascript
try {
  // Thử lấy từ API
  const response = await fetch('/api/news/full');
} catch (error) {
  // Fallback sang mock data
  const mockData = await import('./data/newsData.js');
}
```

## Hiệu năng

### Optimizations
- Giới hạn 5 bài viết mỗi nguồn
- Timeout 15s cho mỗi request
- Làm sạch HTML để giảm dung lượng
- Cache kết quả trong memory (có thể mở rộng)

### Monitoring
- Log chi tiết quá trình scraping
- Đếm số bài viết có nội dung đầy đủ
- Theo dõi thời gian response

## Hướng dẫn Sử dụng

### 1. Khởi động Server
```bash
cd my-app
npm run start-servers
```

### 2. Test API
```bash
# Lấy tin tức đầy đủ
curl "http://localhost:5000/api/news/full?page=1&limit=5"

# Tìm kiếm tin tức
curl "http://localhost:5000/api/news/search?q=vaccine"

# Lấy chi tiết bài viết
curl "http://localhost:5000/api/news/1"
```

### 3. Kiểm tra Frontend
- Truy cập: http://localhost:3000
- Vào trang News để xem tin tức với nội dung đầy đủ
- Click vào bài viết để xem chi tiết

## Lưu ý Quan trọng

1. **Tuân thủ robots.txt**: Đảm bảo không vi phạm quy định của các trang web
2. **Rate limiting**: Không gửi quá nhiều request cùng lúc
3. **Backup plan**: Luôn có mock data để fallback
4. **User experience**: Hiển thị loading state khi scraping

## Tương lai

### Các tính năng có thể mở rộng
- Cache Redis để tăng tốc
- Database để lưu trữ tin tức
- Scheduler để cập nhật tin tức định kỳ
- Machine learning để phân loại tin tức
- Push notification cho tin tức mới

---

*Tài liệu này được cập nhật ngày 7/7/2025*
