import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NewsDetail.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { newsData } from '../../data/newsData';

const API_BASE_URL = 'http://localhost:5000/api';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedNews, setRelatedNews] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);

    console.log('NewsDetail component loaded with ID:', id);
    console.log('Available news data length:', newsData.length);

    const fetchArticleDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('🔍 Đang tải bài viết với ID:', id);

            // Bước 1: Thử lấy trực tiếp từ API detail
            try {
                const response = await fetch(`${API_BASE_URL}/news/${id}`);

                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.data) {
                        console.log('✅ Tìm thấy bài viết từ API detail:', data.data.title);
                        setArticle(data.data);

                        // Lấy tin tức liên quan
                        await fetchRelatedNews(data.data.category);
                        setLoading(false);
                        return;
                    } else {
                        console.log('❌ API detail response:', data);
                    }
                } else {
                    console.log('❌ API detail status:', response.status);
                }
            } catch (apiError) {
                console.log('❌ API detail error:', apiError.message);
            }

            // Bước 2: Thử lấy từ danh sách tin tức
            try {
                console.log('🔄 Thử lấy từ danh sách tin tức...');
                const listResponse = await fetch(`${API_BASE_URL}/news/full?limit=50`);

                if (listResponse.ok) {
                    const listData = await listResponse.json();
                    if (listData.success && listData.data) {
                        console.log(`📋 Có ${listData.data.length} bài viết trong danh sách`);

                        const foundArticle = listData.data.find(item => {
                            console.log(`Comparing: "${item.id}" (${typeof item.id}) with "${id}" (${typeof id})`);
                            return item.id === id ||
                                item.id.toString() === id.toString() ||
                                parseInt(item.id) === parseInt(id);
                        });

                        if (foundArticle) {
                            console.log('✅ Tìm thấy bài viết từ danh sách:', foundArticle.title);
                            setArticle(foundArticle);

                            // Lấy tin tức liên quan từ cùng danh sách
                            const related = listData.data
                                .filter(item => item.category === foundArticle.category && item.id !== foundArticle.id)
                                .slice(0, 3);
                            setRelatedNews(related);
                            setLoading(false);
                            return;
                        } else {
                            console.log('❌ Không tìm thấy trong danh sách. IDs có sẵn:',
                                listData.data.slice(0, 5).map(item => `${item.id} (${typeof item.id})`));
                        }
                    }
                }
            } catch (listError) {
                console.log('❌ Lỗi khi lấy danh sách:', listError.message);
            }

            // Bước 3: Fallback to local data
            console.log('🔄 Fallback to local data...');
            let foundArticle = newsData.find(item =>
                item.id === parseInt(id) ||
                item.id.toString() === id.toString() ||
                item.id === id
            );

            // Bước 4: Xử lý ID dạng fallback (cho mock data)
            if (!foundArticle && (id.includes('fallback-') || id.includes('mock-'))) {
                const parts = id.split('-');
                if (parts.length >= 3) {
                    const originalIndex = parseInt(parts[2]);
                    const demoRound = parseInt(parts[1]);
                    const validIndex = originalIndex % newsData.length;

                    if (validIndex >= 0 && validIndex < newsData.length) {
                        foundArticle = {
                            ...newsData[validIndex],
                            id: id,
                            title: `${newsData[validIndex].title} - Bản demo ${demoRound + 1}`,
                            publishDate: new Date(Date.now() - demoRound * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                            source: `${newsData[validIndex].source} (Demo)`,
                            views: (newsData[validIndex].views || 100) + demoRound * 10,
                            likes: (newsData[validIndex].likes || 10) + demoRound * 5
                        };
                    }
                }
            }

            if (foundArticle) {
                console.log('✅ Tìm thấy bài viết trong local data:', foundArticle.title);
                setArticle(foundArticle);

                const related = newsData
                    .filter(item => item.category === foundArticle.category && item.id !== foundArticle.id)
                    .slice(0, 3);
                setRelatedNews(related);
            } else {
                console.log('❌ Hoàn toàn không tìm thấy bài viết');
                setArticle(null);
                setError('Không tìm thấy bài viết');
            }

        } catch (err) {
            console.error('❌ Lỗi nghiêm trọng:', err);
            setError('Không thể tải bài viết');
            setArticle(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticleDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchRelatedNews = async (category) => {
        try {
            const response = await fetch(`${API_BASE_URL}/news?limit=20`);
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.data) {
                    const related = data.data
                        .filter(item => item.category === category && item.id !== id)
                        .slice(0, 3);
                    setRelatedNews(related);
                    return;
                }
            }
        } catch (err) {
            console.log('❌ Không thể lấy tin tức liên quan:', err);
        }

        // Fallback: dùng local data
        const related = newsData
            .filter(item => item.category === category)
            .slice(0, 3);
        setRelatedNews(related);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Phẫu thuật': '#dc2626',
            'Ung thư': '#7c3aed',
            'Sản khoa': '#ec4899',
            'Nhi khoa': '#06b6d4',
            'Tim mạch': '#ef4444',
            'Thần kinh': '#8b5cf6',
            'Cấp cứu': '#f59e0b',
            'Y tế công cộng': '#10b981',
            'Chăm sóc sức khỏe': '#059669',
            'Bệnh viện': '#2563eb',
            'default': '#6b7280'
        };
        return colors[category] || colors['default'];
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = article.title;

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                alert('Đã sao chép liên kết!');
                break;
            default:
                break;
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Đang tải bài viết...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <button onClick={() => navigate(-1)}>Quay lại</button>
            </div>
        );
    }

    if (!article) {
        return null;
    }

    return (
        <div className="news-detail-container">
            <Header />
            <div className="news-detail-content">
                <h1 className="news-title">{article.title}</h1>
                <div className="news-meta">
                    <span className="news-date">{formatDate(article.publishDate)}</span>
                    <span className="news-source">{article.source}</span>
                    <span className="news-views">{article.views} lượt xem</span>
                </div>
                <div className="news-image">
                    <img src={article.image} alt={article.title} />
                </div>
                <div className="news-description" dangerouslySetInnerHTML={{ __html: article.content }} />
                <div className="news-category" style={{ backgroundColor: getCategoryColor(article.category) }}>
                    {article.category}
                </div>
                <div className="news-actions">
                    <button className="btn-share" onClick={() => handleShare('facebook')}>Chia sẻ Facebook</button>
                    <button className="btn-share" onClick={() => handleShare('twitter')}>Chia sẻ Twitter</button>
                    <button className="btn-share" onClick={() => handleShare('linkedin')}>Chia sẻ LinkedIn</button>
                    <button className="btn-share" onClick={() => handleShare('copy')}>Sao chép liên kết</button>
                </div>
                <div className="related-news">
                    <h2>Tin tức liên quan</h2>
                    <div className="related-news-list">
                        {relatedNews.length > 0 ? (
                            relatedNews.map(item => (
                                <div key={item.id} className="related-news-item">
                                    <div className="related-news-image">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="related-news-info">
                                        <h3 className="related-news-title">{item.title}</h3>
                                        <div className="related-news-meta">
                                            <span className="related-news-date">{formatDate(item.publishDate)}</span>
                                            <span className="related-news-source">{item.source}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Không có tin tức liên quan.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NewsDetail;
