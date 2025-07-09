import { useState, useEffect } from 'react';
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
    const [error, setError] = useState(null);

    const fetchArticleDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            // Try API first
            try {
                const response = await fetch(`${API_BASE_URL}/news/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.data) {
                        setArticle(data.data);
                        await fetchRelatedNews(data.data.category);
                        setLoading(false);
                        return;
                    }
                }
            } catch (apiError) {
                console.log('API not available, using local data');
            }

            // Fallback to local data
            let foundArticle = newsData.find(item =>
                item.id === parseInt(id) ||
                item.id.toString() === id.toString() ||
                item.id === id
            );

            if (foundArticle) {
                setArticle(foundArticle);
                const related = newsData
                    .filter(item => item.category === foundArticle.category && item.id !== foundArticle.id)
                    .slice(0, 3);
                setRelatedNews(related);
            } else {
                setError('Không tìm thấy bài viết');
            }

        } catch (err) {
            setError('Không thể tải bài viết');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticleDetails();
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
            console.log('Using local data for related news');
        }

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
            'Sức khỏe': '#10b981',
            'Dinh dưỡng': '#f59e0b',
            'Mắt': '#ef4444',
            'Y tế': '#8b5cf6',
            'An toàn': '#06b6d4',
            'Vaccine': '#2563eb',
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

    const handleRelatedNewsClick = (newsId) => {
        navigate(`/news/${newsId}`);
    };

    if (loading) {
        return (
            <div className="news-detail-page">
                <Header />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Đang tải bài viết...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="news-detail-page">
                <Header />
                <div className="error-container">
                    <h2>Oops! Có lỗi xảy ra</h2>
                    <p>{error || 'Không tìm thấy bài viết'}</p>
                    <button className="back-button" onClick={() => navigate('/news')}>
                        Về trang tin tức
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="news-detail-page">
            <Header />

            {/* Breadcrumb */}
            <div className="breadcrumb-container">
                <nav className="breadcrumb">
                    <span className="breadcrumb-link" onClick={() => navigate('/')}>Trang chủ</span>
                    <span className="breadcrumb-separator">›</span>
                    <span className="breadcrumb-link" onClick={() => navigate('/news')}>Tin tức</span>
                    <span className="breadcrumb-separator">›</span>
                    <span className="breadcrumb-current">{article.category}</span>
                </nav>
            </div>

            <main className="news-detail-main">
                <div className="container">
                    <article className="news-article">
                        {/* Article Header */}
                        <header className="article-header">
                            <div className="category-badge" style={{ backgroundColor: getCategoryColor(article.category) }}>
                                {article.category}
                            </div>
                            <h1 className="article-title">{article.title}</h1>
                            <div className="article-meta">
                                <div className="meta-info">
                                    <span className="article-date">
                                        <i className="fas fa-calendar-alt"></i>
                                        {formatDate(article.publishDate)}
                                    </span>
                                    <span className="article-source">
                                        <i className="fas fa-user-edit"></i>
                                        {article.source}
                                    </span>
                                    <span className="article-views">
                                        <i className="fas fa-eye"></i>
                                        {article.views || 0} lượt xem
                                    </span>
                                </div>
                            </div>
                        </header>

                        {/* Article Image */}
                        <div className="article-image-container">
                            <img src={article.image} alt={article.title} className="article-image" />
                        </div>

                        {/* Article Summary */}
                        {article.summary && (
                            <div className="article-summary">
                                <p>{article.summary}</p>
                            </div>
                        )}

                        {/* Article Content */}
                        <div className="article-content">
                            <div dangerouslySetInnerHTML={{ __html: article.content || article.summary }} />
                        </div>

                        {/* Share Section */}
                        <div className="share-section">
                            <h4>Chia sẻ bài viết</h4>
                            <div className="share-buttons">
                                <button className="share-btn facebook" onClick={() => handleShare('facebook')}>
                                    <i className="fab fa-facebook-f"></i>
                                    Facebook
                                </button>
                                <button className="share-btn twitter" onClick={() => handleShare('twitter')}>
                                    <i className="fab fa-twitter"></i>
                                    Twitter
                                </button>
                                <button className="share-btn linkedin" onClick={() => handleShare('linkedin')}>
                                    <i className="fab fa-linkedin-in"></i>
                                    LinkedIn
                                </button>
                                <button className="share-btn copy" onClick={() => handleShare('copy')}>
                                    <i className="fas fa-link"></i>
                                    Sao chép
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Related News */}
                    {relatedNews.length > 0 && (
                        <section className="related-news">
                            <h3>Tin tức liên quan</h3>
                            <div className="related-news-grid">
                                {relatedNews.map(item => (
                                    <article
                                        key={item.id}
                                        className="related-news-item"
                                        onClick={() => handleRelatedNewsClick(item.id)}
                                    >
                                        <div className="related-news-image">
                                            <img src={item.image} alt={item.title} />
                                            <div className="related-news-category" style={{ backgroundColor: getCategoryColor(item.category) }}>
                                                {item.category}
                                            </div>
                                        </div>
                                        <div className="related-news-content">
                                            <h4 className="related-news-title">{item.title}</h4>
                                            <p className="related-news-summary">{item.summary}</p>
                                            <div className="related-news-meta">
                                                <span className="related-news-date">{formatDate(item.publishDate)}</span>
                                                <span className="related-news-source">{item.source}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NewsDetail;
