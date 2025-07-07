const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test các API endpoints
async function testAPIs() {
    console.log('🧪 Bắt đầu test API...\n');

    // Test 1: Lấy tin tức chính
    try {
        console.log('📰 Test 1: Lấy danh sách tin tức');
        const response = await axios.get(`${API_BASE_URL}/news`);
        console.log('✅ API tin tức hoạt động');
        console.log(`📊 Số lượng tin tức: ${response.data.data.length}`);
        console.log(`📝 Tin tức đầu tiên: ${response.data.data[0]?.title}`);
        console.log('');
    } catch (error) {
        console.log('❌ API tin tức lỗi:', error.message);
        console.log('');
    }

    // Test 2: Chi tiết bài viết thường
    try {
        console.log('📄 Test 2: Chi tiết bài viết ID = 1');
        const response = await axios.get(`${API_BASE_URL}/news/1`);
        console.log('✅ API chi tiết hoạt động');
        console.log(`📝 Tiêu đề: ${response.data.data.title}`);
        console.log(`📊 Lượt xem: ${response.data.data.views}`);
        console.log('');
    } catch (error) {
        console.log('❌ API chi tiết lỗi:', error.message);
        console.log('');
    }

    // Test 3: Chi tiết bài viết fallback
    try {
        console.log('🔄 Test 3: Chi tiết bài viết fallback ID = fallback-2-3');
        const response = await axios.get(`${API_BASE_URL}/news/fallback-2-3`);
        console.log('✅ API fallback hoạt động');
        console.log(`📝 Tiêu đề: ${response.data.data.title}`);
        console.log(`📊 Lượt xem: ${response.data.data.views}`);
        console.log(`🏷️ ID: ${response.data.data.id}`);
        console.log('');
    } catch (error) {
        console.log('❌ API fallback lỗi:', error.message);
        console.log('');
    }

    // Test 4: Tin tức liên quan
    try {
        console.log('🔗 Test 4: Tin tức liên quan cho ID = 1');
        const response = await axios.get(`${API_BASE_URL}/news/1/related`);
        console.log('✅ API tin tức liên quan hoạt động');
        console.log(`📊 Số lượng tin liên quan: ${response.data.data.length}`);
        if (response.data.data.length > 0) {
            console.log(`📝 Tin liên quan đầu tiên: ${response.data.data[0].title}`);
        }
        console.log('');
    } catch (error) {
        console.log('❌ API tin tức liên quan lỗi:', error.message);
        console.log('');
    }

    // Test 5: Tin tức liên quan cho fallback
    try {
        console.log('🔗 Test 5: Tin tức liên quan cho fallback ID = fallback-1-2');
        const response = await axios.get(`${API_BASE_URL}/news/fallback-1-2/related`);
        console.log('✅ API tin tức liên quan fallback hoạt động');
        console.log(`📊 Số lượng tin liên quan: ${response.data.data.length}`);
        if (response.data.data.length > 0) {
            console.log(`📝 Tin liên quan đầu tiên: ${response.data.data[0].title}`);
        }
        console.log('');
    } catch (error) {
        console.log('❌ API tin tức liên quan fallback lỗi:', error.message);
        console.log('');
    }

    // Test 6: Health check
    try {
        console.log('🏥 Test 6: Health check');
        const response = await axios.get(`${API_BASE_URL}/health`);
        console.log('✅ Health check hoạt động');
        console.log(`📊 Status: ${response.data.status}`);
        console.log('');
    } catch (error) {
        console.log('❌ Health check lỗi:', error.message);
        console.log('');
    }

    console.log('🎉 Hoàn thành test API!');
}

// Kiểm tra xem server có đang chạy không
async function checkServer() {
    try {
        await axios.get(`${API_BASE_URL}/health`);
        console.log('✅ Server đang chạy tại http://localhost:5000');
        return true;
    } catch (error) {
        console.log('❌ Server chưa chạy hoặc có lỗi');
        console.log('📌 Vui lòng chạy: node src/server/ServerNew.js');
        return false;
    }
}

// Chạy test
async function runTests() {
    console.log('🚀 Testing News API System\n');

    const serverRunning = await checkServer();
    if (!serverRunning) {
        return;
    }

    await testAPIs();
}

runTests();
