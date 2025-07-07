const axios = require('axios');
const cheerio = require('cheerio');

// Function để lấy hình ảnh thực từ VnExpress (tránh lazy loading)
async function getVnExpressRealImages() {
    try {
        console.log('🔍 Đang lấy hình ảnh thực từ VnExpress...');

        const response = await axios.get('https://vnexpress.net/suc-khoe', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });

        const $ = cheerio.load(response.data);

        let validImages = [];

        $('.item-news').each((index, element) => {
            if (index >= 10) return; // Test 10 bài đầu

            const $element = $(element);
            const title = $element.find('.title-news a').text().trim();

            // Thử nhiều cách lấy hình ảnh
            let image = null;

            // 1. Thử lấy data-src trước (cho lazy loading)
            const thumbImg = $element.find('.thumb-art img');
            if (thumbImg.length > 0) {
                image = thumbImg.attr('data-src') ||
                    thumbImg.attr('data-original') ||
                    thumbImg.attr('data-url') ||
                    thumbImg.attr('src');
            }

            // 2. Nếu không có, thử các selector khác
            if (!image || image.includes('data:image/gif')) {
                const imgElement = $element.find('img').first();
                if (imgElement.length > 0) {
                    image = imgElement.attr('data-src') ||
                        imgElement.attr('data-original') ||
                        imgElement.attr('data-url') ||
                        imgElement.attr('src');
                }
            }

            // 3. Kiểm tra và chuẩn hóa URL
            if (image && !image.includes('data:image/gif') && !image.includes('no-thumb')) {
                if (!image.startsWith('http')) {
                    image = image.startsWith('/') ? `https://vnexpress.net${image}` : `https://vnexpress.net/${image}`;
                }

                console.log(`📰 ${title}`);
                console.log(`🖼️  ${image}`);

                validImages.push({
                    title,
                    image,
                    index
                });
            }
        });

        console.log(`\n✅ Tìm thấy ${validImages.length} hình ảnh hợp lệ`);

        // Test một vài hình ảnh
        for (let i = 0; i < Math.min(3, validImages.length); i++) {
            const item = validImages[i];
            try {
                const imageResponse = await axios.head(item.image, {
                    timeout: 5000,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                });

                if (imageResponse.status === 200) {
                    const contentLength = imageResponse.headers['content-length'];
                    console.log(`✅ Hình ảnh ${i + 1} hợp lệ: ${Math.round(contentLength / 1024)}KB`);
                } else {
                    console.log(`❌ Hình ảnh ${i + 1} không khả dụng: ${imageResponse.status}`);
                }
            } catch (error) {
                console.log(`❌ Hình ảnh ${i + 1} lỗi: ${error.message}`);
            }
        }

        return validImages;

    } catch (error) {
        console.error('❌ Lỗi khi lấy hình ảnh từ VnExpress:', error.message);
        return [];
    }
}

// Function để lấy hình ảnh từ nội dung chi tiết
async function getDetailImageFromUrl(url) {
    try {
        console.log(`🔍 Đang lấy hình ảnh chi tiết từ: ${url}`);

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 15000
        });

        const $ = cheerio.load(response.data);

        // Thử các selector theo thứ tự ưu tiên
        const selectors = [
            // Meta tags
            'meta[property="og:image"]',
            'meta[name="twitter:image"]',

            // VnExpress specific
            '.fig-picture img',
            '.pic img',
            '.fck_detail img:first-child',
            '.Normal img:first-child',

            // General selectors
            '.article-content img:first-child',
            '.content img:first-child',
            'article img:first-child'
        ];

        for (const selector of selectors) {
            let element, imageUrl;

            if (selector.includes('meta')) {
                element = $(selector);
                if (element.length > 0) {
                    imageUrl = element.attr('content');
                    if (imageUrl && !imageUrl.includes('logo_default')) {
                        console.log(`📷 Meta image: ${imageUrl}`);
                        return imageUrl;
                    }
                }
            } else {
                element = $(selector);
                if (element.length > 0) {
                    imageUrl = element.attr('data-src') ||
                        element.attr('data-original') ||
                        element.attr('src');

                    if (imageUrl && !imageUrl.includes('data:image/gif')) {
                        // Chuẩn hóa URL
                        if (!imageUrl.startsWith('http')) {
                            const baseUrl = new URL(url).origin;
                            imageUrl = imageUrl.startsWith('/') ? `${baseUrl}${imageUrl}` : `${baseUrl}/${imageUrl}`;
                        }

                        console.log(`📷 Content image: ${imageUrl}`);
                        return imageUrl;
                    }
                }
            }
        }

        return null;

    } catch (error) {
        console.error(`❌ Lỗi khi lấy hình ảnh chi tiết: ${error.message}`);
        return null;
    }
}

// Test chính
async function runImageTests() {
    console.log('🚀 Bắt đầu test hệ thống lấy hình ảnh cải tiến...\n');

    // Test 1: Lấy hình ảnh từ danh sách
    console.log('=== TEST 1: Lấy hình ảnh từ danh sách ===');
    const vnImages = await getVnExpressRealImages();

    // Test 2: Lấy hình ảnh từ nội dung chi tiết
    console.log('\n=== TEST 2: Lấy hình ảnh từ nội dung chi tiết ===');
    const testUrls = [
        'https://vnexpress.net/benh-nhan-ung-thu-phoi-song-tren-10-nam-nho-dieu-tri-chinh-xac-4825411.html',
        'https://vnexpress.net/10-thoi-quen-am-tham-hai-than-4825395.html'
    ];

    for (const url of testUrls) {
        const detailImage = await getDetailImageFromUrl(url);
        if (detailImage) {
            // Kiểm tra hình ảnh có hợp lệ không
            try {
                const imageResponse = await axios.head(detailImage, {
                    timeout: 5000,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                });

                if (imageResponse.status === 200) {
                    const contentLength = imageResponse.headers['content-length'];
                    console.log(`✅ Hình ảnh chi tiết hợp lệ: ${Math.round(contentLength / 1024)}KB`);
                } else {
                    console.log(`❌ Hình ảnh chi tiết không khả dụng: ${imageResponse.status}`);
                }
            } catch (error) {
                console.log(`❌ Hình ảnh chi tiết lỗi: ${error.message}`);
            }
        } else {
            console.log(`❌ Không tìm thấy hình ảnh chi tiết`);
        }
    }

    console.log('\n🏁 Hoàn thành test!');
}

runImageTests().catch(console.error);
