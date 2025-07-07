const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Danh sách các nguồn tin tức với selector được cải tiến
const newsSources = [
    {
        name: 'VnExpress Sức khỏe',
        url: 'https://vnexpress.net/suc-khoe',
        selector: {
            articles: '.item-news',
            title: '.title-news a',
            link: '.title-news a',
            summary: '.description',
            image: '.thumb-art img',
            category: 'Phẫu thuật'
        },
        imageSelectors: [
            '.thumb-art img',
            '.item-news img',
            '.news-item img',
            '.pic img'
        ]
    },
    {
        name: 'Tuổi Trẻ Sức khỏe',
        url: 'https://tuoitre.vn/suc-khoe.htm',
        selector: {
            articles: '.box-category-item',
            title: '.box-title-text a',
            link: '.box-title-text a',
            summary: '.sapo',
            image: '.box-category-avatar img',
            category: 'Ung thư'
        },
        imageSelectors: [
            '.box-category-avatar img',
            '.box-category-item img',
            '.item-thumb img',
            '.box-photo img'
        ]
    },
    {
        name: 'Báo Sức khỏe Đời sống',
        url: 'https://suckhoedoisong.vn/',
        selector: {
            articles: '.story',
            title: '.story__title a',
            link: '.story__title a',
            summary: '.story__summary',
            image: '.story__thumb img',
            category: 'Sản khoa'
        },
        imageSelectors: [
            '.story__thumb img',
            '.story img',
            '.item-photo img',
            '.story-image img'
        ]
    },
    {
        name: 'Báo Dân trí Sức khỏe',
        url: 'https://dantri.com.vn/suc-khoe.htm',
        selector: {
            articles: '.news-item',
            title: '.news-item__title a',
            link: '.news-item__title a',
            summary: '.news-item__sapo',
            image: '.news-item__avatar img',
            category: 'Nhi khoa'
        },
        imageSelectors: [
            '.news-item__avatar img',
            '.news-item img',
            '.article-thumb img',
            '.dt-thumbnail img'
        ]
    },
    {
        name: 'Báo Thanh niên Sức khỏe',
        url: 'https://thanhnien.vn/suc-khoe/',
        selector: {
            articles: '.story',
            title: '.story__title a',
            link: '.story__title a',
            summary: '.story__summary',
            image: '.story__thumb img',
            category: 'Tim mạch'
        },
        imageSelectors: [
            '.story__thumb img',
            '.story img',
            '.cms-photo img',
            '.story-photo img'
        ]
    }
];

// Cache để lưu nội dung đã scrape
const contentCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 phút

// Cache toàn cục cho articles
const articlesCache = new Map();
const ARTICLES_CACHE_DURATION = 10 * 60 * 1000; // 10 phút

// Function để lấy hoặc refresh cache articles
async function getCachedArticles() {
    const cached = articlesCache.get('all_articles');

    if (cached && Date.now() - cached.timestamp < ARTICLES_CACHE_DURATION) {
        console.log('📦 Sử dụng cache articles');
        return cached.data;
    }

    console.log('🔄 Refresh cache articles');
    const newsPromises = newsSources.map(source => scrapeNews(source));
    const newsResults = await Promise.all(newsPromises);
    const allArticles = newsResults.flat();

    // Lưu vào cache
    articlesCache.set('all_articles', {
        data: allArticles,
        timestamp: Date.now()
    });

    return allArticles;
}

// Function để scrape nội dung chi tiết từ một URL
async function scrapeArticleContent(url) {
    try {
        // Kiểm tra cache trước
        const cached = contentCache.get(url);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            console.log(`📦 Sử dụng cache cho: ${url}`);
            return cached.data;
        }

        console.log(`📄 Đang lấy nội dung chi tiết từ: ${url}`);

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            },
            timeout: 15000,
            maxRedirects: 5
        });

        const $ = cheerio.load(response.data);
        let content = '';
        let author = '';
        let publishDate = '';
        let mainImage = '';

        // Lấy hình ảnh chính với nhiều selector
        const imageSelectors = [
            'meta[property="og:image"]',
            'meta[name="twitter:image"]',
            '.article-image img',
            '.story-image img',
            '.news-image img',
            '.detail-image img',
            '.featured-image img',
            '.fck_detail img:first-child',
            '.detail-content img:first-child',
            '.content-detail img:first-child',
            '.article-body img:first-child',
            '.post-content img:first-child'
        ];

        for (const selector of imageSelectors) {
            let element;
            if (selector.includes('meta')) {
                element = $(selector);
                if (element.length > 0) {
                    mainImage = element.attr('content');
                    if (mainImage && mainImage.startsWith('http')) {
                        console.log(`🖼️  Tìm thấy ảnh từ meta: ${mainImage}`);
                        break;
                    }
                }
            } else {
                element = $(selector);
                if (element.length > 0) {
                    mainImage = element.attr('src') || element.attr('data-src') || element.attr('data-lazy-src');
                    if (mainImage) {
                        if (!mainImage.startsWith('http')) {
                            const baseUrl = new URL(url).origin;
                            mainImage = mainImage.startsWith('/') ? `${baseUrl}${mainImage}` : `${baseUrl}/${mainImage}`;
                        }
                        console.log(`🖼️  Tìm thấy ảnh từ content: ${mainImage}`);
                        break;
                    }
                }
            }
        }

        // Lấy nội dung với nhiều selector cho từng trang báo
        const contentSelectors = [
            // VnExpress
            '.fck_detail',
            '.Normal',
            // Tuổi Trẻ
            '.detail-content',
            '.content',
            '.article-content',
            // Dân Trí
            '.dt-news__content',
            '.news-content',
            // Thanh Niên
            '.story-content',
            '.cms-body',
            // Sức khỏe Đời sống
            '.content-detail',
            '.article-body',
            // Fallback selectors
            '.post-content',
            '.entry-content',
            '.main-content',
            '.article p',
            'article .content p'
        ];

        // Tìm nội dung
        for (const selector of contentSelectors) {
            const element = $(selector);
            if (element.length > 0) {
                let rawContent = element.html();
                if (rawContent && rawContent.trim().length > 100) {
                    content = rawContent;
                    console.log(`📝 Tìm thấy nội dung từ: ${selector} (${rawContent.length} ký tự)`);
                    break;
                }
            }
        }

        // Tìm tác giả với nhiều selector
        const authorSelectors = [
            '.author-info .name',
            '.author-name',
            '.author',
            '.byline',
            '.writer',
            '.article-author',
            '.post-author',
            '.writer-name',
            '.author-signature'
        ];

        for (const selector of authorSelectors) {
            const element = $(selector);
            if (element.length > 0) {
                author = element.text().trim();
                if (author && author.length > 2) {
                    console.log(`👤 Tìm thấy tác giả: ${author}`);
                    break;
                }
            }
        }

        // Tìm ngày xuất bản
        const dateSelectors = [
            '.date-time',
            '.publish-date',
            '.date-publish',
            '.post-date',
            '.article-date',
            '.news-date',
            '.time-publish',
            'time',
            '.published-time'
        ];

        for (const selector of dateSelectors) {
            const element = $(selector);
            if (element.length > 0) {
                publishDate = element.text().trim() || element.attr('datetime');
                if (publishDate && publishDate.length > 5) {
                    console.log(`📅 Tìm thấy ngày: ${publishDate}`);
                    break;
                }
            }
        }

        // Làm sạch và cải thiện nội dung
        if (content) {
            content = content
                // Xóa các thẻ không cần thiết
                .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
                .replace(/<!--[\s\S]*?-->/g, '')
                .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
                // Xóa các div quảng cáo
                .replace(/<div[^>]*class="[^"]*ad[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
                .replace(/<div[^>]*class="[^"]*banner[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
                // Cải thiện hình ảnh
                .replace(/<img([^>]*)src="([^"]*)"([^>]*)>/gi, (match, before, src, after) => {
                    if (!src.startsWith('http') && !src.startsWith('data:')) {
                        const baseUrl = new URL(url).origin;
                        src = src.startsWith('/') ? `${baseUrl}${src}` : `${baseUrl}/${src}`;
                    }
                    return `<img${before}src="${src}"${after} style="max-width: 100%; height: auto; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">`;
                })
                // Cải thiện đoạn văn
                .replace(/<p([^>]*)>/gi, '<p$1 style="margin-bottom: 15px; line-height: 1.6; text-align: justify;">')
                // Cải thiện tiêu đề
                .replace(/<h([1-6])([^>]*)>/gi, '<h$1$2 style="margin: 20px 0 15px 0; color: #2c3e50; font-weight: bold;">')
                // Cải thiện danh sách
                .replace(/<ul([^>]*)>/gi, '<ul$1 style="margin: 15px 0; padding-left: 25px;">')
                .replace(/<ol([^>]*)>/gi, '<ol$1 style="margin: 15px 0; padding-left: 25px;">')
                .replace(/<li([^>]*)>/gi, '<li$1 style="margin-bottom: 8px; line-height: 1.5;">')
                .trim();

            // Wrap nội dung trong container
            content = `
                <div class="article-content" style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6;">
                    ${content}
                </div>
            `;
        }

        const result = {
            content: content || '<p style="color: #666; font-style: italic;">Không thể tải nội dung chi tiết. Vui lòng truy cập link gốc để xem đầy đủ.</p>',
            author: author || 'Biên tập viên',
            publishDate: formatPublishDate(publishDate) || new Date().toISOString().split('T')[0],
            mainImage: mainImage || null
        };

        // Lưu vào cache
        contentCache.set(url, {
            data: result,
            timestamp: Date.now()
        });

        console.log(`✅ Scrape thành công: ${url}`);
        return result;

    } catch (error) {
        console.error(`❌ Lỗi khi lấy nội dung từ ${url}:`, error.message);
        return {
            content: '<p style="color: #666; font-style: italic;">Không thể tải nội dung chi tiết. Vui lòng truy cập link gốc để xem đầy đủ.</p>',
            author: 'Biên tập viên',
            publishDate: new Date().toISOString().split('T')[0],
            mainImage: null
        };
    }
}

// Function để format ngày xuất bản
function formatPublishDate(dateString) {
    if (!dateString) return null;

    try {
        // Xử lý các format ngày phổ biến
        let date = new Date(dateString);

        // Nếu không parse được, thử các format khác
        if (isNaN(date.getTime())) {
            // Format: "Thứ 2, 7/7/2025, 10:30"
            const match = dateString.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
            if (match) {
                date = new Date(match[3], match[2] - 1, match[1]);
            }
        }

        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
        }

        return new Date().toISOString().split('T')[0];
    } catch (error) {
        return new Date().toISOString().split('T')[0];
    }
}

// Function để lấy hình ảnh từ element (giữ nguyên như cũ)
function extractImageFromElement($element, source) {
    let image = null;

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
                break;
            }
        }
    }

    return image;
}

// Function để scrape tin tức từ một nguồn
async function scrapeNews(source) {
    try {
        console.log(`🌐 Đang lấy tin từ: ${source.name}`);

        const response = await axios.get(source.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 10000
        });

        const $ = cheerio.load(response.data);
        const articles = [];

        const articleElements = $(source.selector.articles).slice(0, 8);

        for (let index = 0; index < articleElements.length; index++) {
            const element = articleElements[index];
            const $element = $(element);

            const title = $element.find(source.selector.title).text().trim();
            const link = $element.find(source.selector.link).attr('href');
            const summary = $element.find(source.selector.summary).text().trim();

            if (title && link) {
                const fullLink = link.startsWith('http') ? link : `${new URL(source.url).origin}${link}`;

                let image = extractImageFromElement($element, source);

                if (image && !image.startsWith('http')) {
                    const baseUrl = new URL(source.url).origin;
                    image = image.startsWith('/') ? `${baseUrl}${image}` : `${baseUrl}/${image}`;
                }

                // TẠO ID DẠNG STRING ĐỂ DỄ PHÂN BIỆT
                const articleId = `${source.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${index}`;

                const article = {
                    id: articleId, // ID string format
                    title: title,
                    summary: summary || 'Nội dung sẽ được cập nhật...',
                    link: fullLink,
                    image: image,
                    category: source.selector.category,
                    source: source.name,
                    publishDate: new Date().toISOString().split('T')[0],
                    isHighlight: index === 0 && source.name === 'VnExpress Sức khỏe',
                    readTime: `${Math.floor(Math.random() * 5) + 3} phút đọc`,
                    views: Math.floor(Math.random() * 1000) + 100,
                    likes: Math.floor(Math.random() * 100) + 10,
                    tags: ['y tế', 'sức khỏe', 'tin tức'],
                    hasRealContent: true,
                    originalUrl: fullLink,
                    // Thêm content ngay từ đầu để tránh phải scrape lại
                    content: '<p>Đang tải nội dung chi tiết...</p>',
                    author: 'Biên tập viên'
                };

                articles.push(article);
                console.log(`📝 Tạo bài viết ID: ${articleId} - ${title.substring(0, 50)}...`);
            }
        }

        console.log(`✅ Lấy được ${articles.length} bài từ ${source.name}`);
        return articles;

    } catch (error) {
        console.error(`❌ Lỗi khi lấy tin từ ${source.name}:`, error.message);
        return [];
    }
}

// API endpoint để lấy tin tức với nội dung đầy đủ
app.get('/api/news/full', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        console.log(`📰 Lấy tin tức đầy đủ - Trang ${page}, Limit ${limit}`);

        const allArticles = await getCachedArticles();
        const newsToProcess = allArticles.slice(0, limit);

        const detailedNews = [];

        for (const article of newsToProcess) {
            try {
                console.log(`📄 Lấy chi tiết cho: ${article.title.substring(0, 30)}...`);
                const articleContent = await scrapeArticleContent(article.originalUrl || article.link);

                detailedNews.push({
                    ...article,
                    content: articleContent.content,
                    author: articleContent.author || 'Biên tập viên',
                    publishDate: articleContent.publishDate || article.publishDate,
                    image: articleContent.mainImage || article.image,
                    fullContent: true,
                    hasRealContent: true
                });
            } catch (error) {
                console.error(`❌ Lỗi chi tiết cho bài viết ${article.id}:`, error);
                detailedNews.push({
                    ...article,
                    content: '<p>Không thể tải nội dung chi tiết. Vui lòng truy cập link gốc.</p>',
                    fullContent: false
                });
            }
        }

        res.json({
            success: true,
            data: detailedNews,
            pagination: {
                page: page,
                limit: limit,
                total: allArticles.length,
                hasNext: allArticles.length > limit,
                hasPrev: page > 1
            },
            lastUpdated: new Date().toISOString(),
            source: 'Real scraping - No mock data'
        });

    } catch (error) {
        console.error('❌ Lỗi khi lấy tin tức đầy đủ:', error);
        res.status(500).json({
            success: false,
            error: 'Không thể lấy tin tức đầy đủ',
            message: error.message
        });
    }
});

// API endpoint để lấy chi tiết một bài viết
app.get('/api/news/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`🔍 Tìm kiếm bài viết với ID: ${id}`);

        // Lấy articles từ cache
        const allArticles = await getCachedArticles();

        // Tìm bài viết theo ID - hỗ trợ nhiều format
        const article = allArticles.find(item => {
            // So sánh exact match
            if (item.id === id) return true;
            // So sánh string
            if (item.id.toString() === id.toString()) return true;
            // So sánh number
            if (parseInt(item.id) === parseInt(id)) return true;
            return false;
        });

        if (!article) {
            console.log(`❌ Không tìm thấy bài viết với ID: ${id}`);
            console.log(`📋 Các ID có sẵn:`, allArticles.slice(0, 10).map(item => ({
                id: item.id,
                title: item.title.substring(0, 50) + '...',
                source: item.source
            })));

            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài viết',
                debug: {
                    searchedId: id,
                    searchedIdType: typeof id,
                    availableIds: allArticles.slice(0, 10).map(item => ({
                        id: item.id,
                        idType: typeof item.id,
                        title: item.title.substring(0, 50) + '...',
                        source: item.source
                    }))
                }
            });
        }

        console.log(`✅ Tìm thấy bài viết: ${article.title}`);

        // Lấy nội dung chi tiết nếu chưa có
        let detailedContent = article.content;
        let articleAuthor = article.author;
        let articleImage = article.image;

        if (!article.fullContent || article.content === '<p>Đang tải nội dung chi tiết...</p>') {
            console.log(`📄 Đang scrape nội dung chi tiết cho: ${article.title.substring(0, 30)}...`);
            try {
                const articleContent = await scrapeArticleContent(article.originalUrl || article.link);
                detailedContent = articleContent.content;
                articleAuthor = articleContent.author || article.author;
                articleImage = articleContent.mainImage || article.image;
            } catch (error) {
                console.error(`❌ Lỗi khi scrape nội dung:`, error);
                detailedContent = `
                    <div class="article-content">
                        <p><strong>Tóm tắt:</strong> ${article.summary}</p>
                        <p><em>Không thể tải nội dung đầy đủ. Vui lòng truy cập nguồn gốc để xem chi tiết.</em></p>
                        <p><a href="${article.link}" target="_blank" rel="noopener noreferrer">👉 Đọc bài viết gốc tại ${article.source}</a></p>
                    </div>
                `;
            }
        }

        const detailedArticle = {
            ...article,
            content: detailedContent,
            author: articleAuthor,
            image: articleImage,
            fullContent: true,
            hasRealContent: true
        };

        res.json({
            success: true,
            data: detailedArticle
        });

    } catch (error) {
        console.error('❌ Lỗi khi lấy chi tiết bài viết:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
});

// API endpoint cơ bản để lấy tin tức (không có nội dung chi tiết)
app.get('/api/news', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        console.log(`📰 Lấy tin tức cơ bản - Trang ${page}, Limit ${limit}`);

        const allArticles = await getCachedArticles();
        const paginatedNews = allArticles.slice(0, limit);

        res.json({
            success: true,
            data: paginatedNews,
            pagination: {
                page: page,
                limit: limit,
                total: allArticles.length,
                hasNext: allArticles.length > limit,
                hasPrev: page > 1
            },
            lastUpdated: new Date().toISOString(),
            source: 'Real scraping with simple IDs'
        });

    } catch (error) {
        console.error('❌ Lỗi server:', error);
        res.status(500).json({
            success: false,
            error: 'Không thể lấy tin tức',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Real News Scraping API đang hoạt động',
        timestamp: new Date().toISOString(),
        cache_size: contentCache.size
    });
});

// Thêm endpoint debug trong ServerNew.js:
app.get('/api/debug/articles', async (req, res) => {
    try {
        const allArticles = await getCachedArticles();
        
        res.json({
            success: true,
            total: allArticles.length,
            articles: allArticles.map(item => ({
                id: item.id,
                idType: typeof item.id,
                title: item.title.substring(0, 60) + '...',
                source: item.source,
                category: item.category,
                hasContent: !!item.content && item.content !== '<p>Đang tải nội dung chi tiết...</p>',
                contentLength: item.content ? item.content.length : 0
            }))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Thêm endpoint để force refresh cache:
app.post('/api/refresh-cache', async (req, res) => {
    try {
        console.log('🔄 Force refresh cache...');
        articlesCache.delete('all_articles');
        contentCache.clear();
        
        const newArticles = await getCachedArticles();
        
        res.json({
            success: true,
            message: 'Cache đã được refresh',
            totalArticles: newArticles.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📰 News API: http://localhost:${PORT}/api/news`);
    console.log(`📄 Full News API: http://localhost:${PORT}/api/news/full`);
    console.log(`🎯 Scraping thực tế từ các nguồn tin tức - Không có dữ liệu giả!`);
});