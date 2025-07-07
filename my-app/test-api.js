const axios = require('axios');

// Test API server
async function testAPI() {
    try {
        console.log('🧪 Testing API server...');

        // Test lấy tin tức
        const response = await axios.get('http://localhost:5000/api/news?limit=5', {
            timeout: 30000
        });

        console.log('📰 API Response:');
        console.log(`✅ Status: ${response.status}`);
        console.log(`✅ Total articles: ${response.data.total}`);
        console.log(`✅ Articles returned: ${response.data.data.length}`);

        // Kiểm tra hình ảnh
        response.data.data.forEach((article, index) => {
            console.log(`\n📰 Bài ${index + 1}: ${article.title}`);
            console.log(`🖼️  Image: ${article.image}`);
            console.log(`🔗 Link: ${article.link}`);
            console.log(`📂 Category: ${article.category}`);
            console.log(`📅 Date: ${article.publishDate}`);
        });

    } catch (error) {
        console.error('❌ API Error:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

// Test sau 3 giây để server có thời gian khởi động
setTimeout(testAPI, 3000);
