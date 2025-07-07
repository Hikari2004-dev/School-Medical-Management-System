import React from 'react';
import { useNavigate } from 'react-router-dom';
import { newsData } from '../data/newsData';

const NewsTestPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Test Navigation to News Detail</h1>
            <p>Số bài viết có sẵn: {newsData.length}</p>

            <div style={{ marginBottom: '20px' }}>
                <h2>Test Links:</h2>
                {newsData.map(article => (
                    <div key={article.id} style={{
                        border: '1px solid #ddd',
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '4px'
                    }}>
                        <h3>{article.title}</h3>
                        <p>ID: {article.id} (type: {typeof article.id})</p>
                        <button
                            onClick={() => navigate(`/news/${article.id}`)}
                            style={{
                                background: '#007bff',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginRight: '10px'
                            }}
                        >
                            Xem bài viết
                        </button>
                        <a
                            href={`/news/${article.id}`}
                            style={{
                                background: '#28a745',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                textDecoration: 'none'
                            }}
                        >
                            Direct Link
                        </a>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate('/')}
                style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Về trang chủ
            </button>
        </div>
    );
};

export default NewsTestPage;
