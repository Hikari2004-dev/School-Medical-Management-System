const axios = require('axios');
const cheerio = require('cheerio');

// Function để lấy hình ảnh từ element với nhiều selector
function extractImageFromElement($element, source) {
    let image = null;

    // Thử các selector hình ảnh theo thứ tự ưu tiên
    for (const imgSelector of source.imageSelectors) {
        const imgElement = $element.find(imgSelector);
        if (imgElement.length > 0) {
            image = imgElement.attr('src') ||
                imgElement.attr('data-src') ||
                imgElement.attr('data-lazy-src') ||
                imgElement.attr('data-original') ||
                imgElement.attr('data-url') ||
                imgElement.attr('data-thumb');

            if (image && image.length > 10 &&
                !image.includes('placeholder') &&
                !image.includes('loading') &&
                !image.includes('avatar') &&
                !image.includes('icon') &&
                !image.includes('logo') &&
                !image.startsWith('data:image/svg')) {
                console.log(`🖼️  Tìm thấy hình ảnh từ ${imgSelector}: ${image}`);
                break;
            }
        }
    }

    // Nếu không tìm thấy, thử với selector chính
    if (!image) {
        const mainImgElement = $element.find(source.selector.image);
        if (mainImgElement.length > 0) {
            image = mainImgElement.attr('src') ||
                mainImgElement.attr('data-src') ||
                mainImgElement.attr('data-lazy-src') ||
                mainImgElement.attr('data-original') ||
                mainImgElement.attr('data-url') ||
                mainImgElement.attr('data-thumb');

            if (image && image.length > 10 &&
                !image.includes('placeholder') &&
                !image.includes('loading') &&
                !image.includes('avatar') &&
                !image.includes('icon') &&
                !image.includes('logo') &&
                !image.startsWith('data:image/svg')) {
                console.log(`🖼️  Tìm thấy hình ảnh từ main selector: ${image}`);
            }
        }
    }

    // Nếu vẫn không có, thử tìm bất kỳ hình ảnh nào trong element
    if (!image) {
        const anyImg = $element.find('img').first();
        if (anyImg.length > 0) {
            image = anyImg.attr('src') ||
                anyImg.attr('data-src') ||
                anyImg.attr('data-lazy-src') ||
                anyImg.attr('data-original') ||
                anyImg.attr('data-url') ||
                anyImg.attr('data-thumb');

            if (image && image.length > 10 &&
                !image.includes('placeholder') &&
                !image.includes('loading') &&
                !image.includes('avatar') &&
                !image.includes('icon') &&
                !image.includes('logo') &&
                !image.startsWith('data:image/svg')) {
                console.log(`🖼️  Tìm thấy hình ảnh fallback: ${image}`);
            }
        }
    }

    return image;
}

// Function để kiểm tra hình ảnh có hợp lệ không
async function validateImage(imageUrl) {
    try {
        if (!imageUrl) return false;

        // Chuẩn hóa URL
        if (!imageUrl.startsWith('http')) {
            return false;
        }

        const response = await axios.head(imageUrl, {
            timeout: 8000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (response.status === 200) {
            const contentLength = response.headers['content-length'];
            const contentType = response.headers['content-type'];

            // Kiểm tra content type
            if (contentType && contentType.startsWith('image/')) {
                // Kiểm tra size (ít nhất 2KB để tránh ảnh nhỏ)
                if (!contentLength || parseInt(contentLength) > 2000) {
                    console.log(`✅ Hình ảnh hợp lệ: ${imageUrl} (${contentLength ? Math.round(contentLength / 1024) + 'KB' : 'Unknown size'})`);
                    return true;
                } else {
                    console.log(`⚠️  Hình ảnh quá nhỏ (${contentLength} bytes): ${imageUrl}`);
                    return false;
                }
            } else {
                console.log(`⚠️  Không phải file hình ảnh: ${contentType}`);
                return false;
            }
        }
        return false;
    } catch (error) {
        console.log(`❌ Hình ảnh không khả dụng: ${imageUrl} - ${error.message}`);
        return false;
    }
}

// Test scraping hình ảnh từ VnExpress
async function testVnExpressImages() {
    try {
        console.log('🧪 Test lấy hình ảnh từ VnExpress...');

        const response = await axios.get('https://vnexpress.net/suc-khoe', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });

        const $ = cheerio.load(response.data);

        const source = {
            name: 'VnExpress Sức khỏe',
            selector: {
                articles: '.item-news',
                title: '.title-news a',
                link: '.title-news a',
                summary: '.description',
                image: '.thumb-art img',
                category: 'Sức khỏe'
            },
            imageSelectors: [
                '.thumb-art img',
                '.item-news img',
                '.news-item img',
                '.pic img'
            ]
        };

        let count = 0;
        const results = [];

        $('.item-news').each(async (index, element) => {
            if (count >= 3) return; // Test 3 bài đầu

            const $element = $(element);
            const title = $element.find('.title-news a').text().trim();
            const image = extractImageFromElement($element, source);

            if (title && image) {
                // Chuẩn hóa URL
                let fullImageUrl = image;
                if (!image.startsWith('http')) {
                    const baseUrl = 'https://vnexpress.net';
                    fullImageUrl = image.startsWith('/') ? `${baseUrl}${image}` : `${baseUrl}/${image}`;
                }

                console.log(`\n📰 Bài ${count + 1}: ${title}`);
                console.log(`🖼️  Hình gốc: ${fullImageUrl}`);

                const isValid = await validateImage(fullImageUrl);
                results.push({
                    title,
                    image: fullImageUrl,
                    valid: isValid
                });

                count++;
            }
        });

        // Chờ một chút để các async calls hoàn thành
        setTimeout(() => {
            console.log('\n📊 Kết quả tổng hợp:');
            console.log(`✅ Tổng số bài test: ${results.length}`);
            console.log(`✅ Hình ảnh hợp lệ: ${results.filter(r => r.valid).length}`);
            console.log(`❌ Hình ảnh không hợp lệ: ${results.filter(r => !r.valid).length}`);
        }, 5000);

    } catch (error) {
        console.error('❌ Lỗi test VnExpress:', error.message);
    }
}

// Test scraping hình ảnh từ nội dung chi tiết
async function testDetailImageExtraction() {
    try {
        console.log('\n🧪 Test lấy hình ảnh từ nội dung chi tiết...');

        // URL test từ VnExpress
        const testUrl = 'https://vnexpress.net/benh-nhan-ung-thu-phoi-song-tren-10-nam-nho-dieu-tri-chinh-xac-4825411.html';

        const response = await axios.get(testUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 15000
        });

        const $ = cheerio.load(response.data);

        // Thử các selector khác nhau
        const selectors = [
            'meta[property="og:image"]',
            '.fig-picture img',
            '.pic img',
            '.fck_detail img:first-child',
            '.article_content img:first-child'
        ];

        for (const selector of selectors) {
            let element, imageUrl;

            if (selector.includes('meta')) {
                element = $(selector);
                if (element.length > 0) {
                    imageUrl = element.attr('content');
                    if (imageUrl) {
                        console.log(`📷 Meta image (${selector}): ${imageUrl}`);
                        const isValid = await validateImage(imageUrl);
                        if (isValid) {
                            console.log(`✅ Hình ảnh meta hợp lệ!`);
                            break;
                        }
                    }
                }
            } else {
                element = $(selector);
                if (element.length > 0) {
                    imageUrl = element.attr('src') || element.attr('data-src');
                    if (imageUrl) {
                        // Chuẩn hóa URL
                        if (!imageUrl.startsWith('http')) {
                            const baseUrl = 'https://vnexpress.net';
                            imageUrl = imageUrl.startsWith('/') ? `${baseUrl}${imageUrl}` : `${baseUrl}/${imageUrl}`;
                        }

                        console.log(`📷 Content image (${selector}): ${imageUrl}`);
                        const isValid = await validateImage(imageUrl);
                        if (isValid) {
                            console.log(`✅ Hình ảnh content hợp lệ!`);
                            break;
                        }
                    }
                }
            }
        }

    } catch (error) {
        console.error('❌ Lỗi test detail extraction:', error.message);
    }
}

// Chạy test
async function runTests() {
    console.log('🚀 Bắt đầu test hệ thống lấy hình ảnh...\n');

    await testVnExpressImages();
    await testDetailImageExtraction();

    console.log('\n🏁 Hoàn thành test!');
}

runTests().catch(console.error);
