const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test lấy hình ảnh từ tin tức
async function testImageExtraction() {
    console.log('🖼️  Testing Image Extraction from News...\n');

    try {
        // Test 1: Lấy danh sách tin tức và kiểm tra hình ảnh
        console.log('📰 Test 1: Checking images in news list');
        const newsResponse = await axios.get(`${API_BASE_URL}/news?limit=5`);

        if (newsResponse.data.success) {
            console.log(`✅ Successfully got ${newsResponse.data.data.length} articles`);

            newsResponse.data.data.forEach((article, index) => {
                console.log(`\n📄 Article ${index + 1}:`);
                console.log(`   Title: ${article.title}`);
                console.log(`   Image: ${article.image}`);
                console.log(`   Image type: ${article.image.includes('unsplash') ? 'Real' : 'Generated'}`);
                console.log(`   Category: ${article.category}`);
            });
        }

        console.log('\n');

        // Test 2: Lấy chi tiết bài viết và kiểm tra hình ảnh
        console.log('📄 Test 2: Checking images in article details');
        const detailResponse = await axios.get(`${API_BASE_URL}/news/1`);

        if (detailResponse.data.success) {
            const article = detailResponse.data.data;
            console.log('✅ Successfully got article details');
            console.log(`   Title: ${article.title}`);
            console.log(`   Main Image: ${article.image}`);
            console.log(`   Content has images: ${article.content.includes('<img') ? 'Yes' : 'No'}`);

            // Đếm số lượng hình ảnh trong nội dung
            const imageCount = (article.content.match(/<img/g) || []).length;
            console.log(`   Images in content: ${imageCount}`);
        }

        console.log('\n');

        // Test 3: Kiểm tra fallback images
        console.log('🔄 Test 3: Checking fallback article images');
        const fallbackResponse = await axios.get(`${API_BASE_URL}/news/fallback-1-2`);

        if (fallbackResponse.data.success) {
            const article = fallbackResponse.data.data;
            console.log('✅ Successfully got fallback article');
            console.log(`   Title: ${article.title}`);
            console.log(`   Image: ${article.image}`);
            console.log(`   Image type: ${article.image.includes('unsplash') ? 'Real' : 'Generated'}`);
        }

        console.log('\n');

        // Test 4: Kiểm tra API health
        console.log('🏥 Test 4: API Health Check');
        const healthResponse = await axios.get(`${API_BASE_URL}/health`);

        if (healthResponse.data.status === 'OK') {
            console.log('✅ API is healthy and running');
            console.log(`   Message: ${healthResponse.data.message}`);
            console.log(`   Timestamp: ${healthResponse.data.timestamp}`);
        }

    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`);

        if (error.code === 'ECONNREFUSED') {
            console.log('📌 Please make sure the server is running:');
            console.log('   node src/server/ServerNew.js');
        }
    }
}

// Test hình ảnh placeholder
function testPlaceholderImages() {
    console.log('\n🎨 Testing Placeholder Image Generation');

    const categories = ['Sức khỏe', 'Y tế', 'Dinh dưỡng', 'Vaccine', 'Mắt'];
    const testTitles = [
        'Chương trình tiêm vaccine COVID-19',
        'Hướng dẫn dinh dưỡng mùa thi',
        'Phòng chống cận thị học sinh',
        'Khám sức khỏe định kỳ',
        'Tăng cường miễn dịch trẻ em'
    ];

    categories.forEach((category, index) => {
        const title = testTitles[index] || 'Tin tức y tế';
        console.log(`\n📷 Category: ${category}`);
        console.log(`   Sample title: ${title}`);
        console.log(`   Expected image: Medical/health related image from Unsplash`);
    });
}

// Kiểm tra server trước khi test
async function checkServer() {
    try {
        await axios.get(`${API_BASE_URL}/health`, { timeout: 5000 });
        console.log('✅ Server is running at http://localhost:5000\n');
        return true;
    } catch (error) {
        console.log('❌ Server is not running or not accessible');
        console.log('📌 Please start the server first:');
        console.log('   cd my-app');
        console.log('   node src/server/ServerNew.js\n');
        return false;
    }
}

// Chạy tất cả tests
async function runTests() {
    console.log('🚀 Testing News Image System');
    console.log('===============================\n');

    const serverRunning = await checkServer();

    if (serverRunning) {
        await testImageExtraction();
    }

    testPlaceholderImages();

    console.log('\n🎉 Image testing completed!');
    console.log('\n📖 What to expect:');
    console.log('   - Real medical images from Unsplash instead of placeholders');
    console.log('   - Images in article content preserved and styled');
    console.log('   - Fallback to quality medical images when scraping fails');
    console.log('   - Consistent image sizing and cropping');
}

runTests();
