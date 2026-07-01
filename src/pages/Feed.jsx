import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDigest } from '../services/api';


function Feed() {
    const [digests, setDigests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getDigest()
            .then((res) => setDigests(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <div style={styles.navbar}>
                <h2 style={styles.brand}>📰 News Digest</h2>
                <div style={styles.navButtons}>
                    <button
                       style={styles.topicsBtn}
                       onClick={() => navigate('/topics')}>
                        Change Topics
                       </button>
                       <button style={styles.logoutBtn} onClick={handleLogout}>
                        Logout
                       </button>
                </div>       
            </div>

            <div style={styles.content}>
                <h3 style={styles.heading}>Your Daily Digest</h3>

                {loading && <p style={styles.message}>Loading your digest...</p>}

                {!loading && digests.length === 0 && (
                    <div style={styles.emptyState}>
                        <p>No digest available yet.</p>
                        <p>Articles are summarized daily — check back soon!</p>
                    </div>
                )}

                <div style={styles.grid}>
                    {digests.map((digest) => (
                        <div key={digest.id} style={styles.card}>
                            <div style={{...styles.topicBadge,
                                  backgroundColor: getTopicColor(digest.article?.topic?.name).bg,
                                  color: getTopicColor(digest.article?.topic?.name).text,}}>
                                {digest.article?.topic?.name}
                            </div>
                            <h4 style={styles.articleTitle}>
                                {digest.article?.title}
                            </h4>
                            <p style={styles.summary}>{digest.summary}</p>
                            <div style={styles.footer}>
                                <span style={styles.source}>
                                    {digest.article?.source}
                                </span>
                                    <a
                                    href={digest.article?.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={styles.readMore}>
                                    Read full article →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const getTopicColor = (topicName) => {
    const colors = {
        'Technology': { bg: '#1e3a5f', text: '#60a5fa' },
        'Business': { bg: '#1c3a2a', text: '#34d399' },
        'Sports': { bg: '#2d1b4e', text: '#a78bfa' },
        'Health': { bg: '#3b1f2b', text: '#f472b6' },
        'Science': { bg: '#1a3a3a', text: '#2dd4bf' },
        'Entertainment': { bg: '#3b2a1a', text: '#fb923c' },
        'Politics': { bg: '#3b1a1a', text: '#f87171' },
    };
    return colors[topicName] || { bg: '#1e293b', text: '#94a3b8' };
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#0f172a',
    },
    navbar: {
        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        borderBottom: '1px solid #334155',
    },
    brand: {
        margin: 0,
        fontSize: '20px',
        color: '#f1f5f9',
        fontWeight: 'bold',
    },
    navButtons: {
        display: 'flex',
        gap: '12px',
    },
    topicsBtn: {
        padding: '8px 16px',
        background: 'linear-gradient(135deg, #4299e1, #7c3aed)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
    },
    logoutBtn: {
        padding: '8px 16px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
    },
    content: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '32px 16px',
    },
    heading: {
        fontSize: '22px',
        color: '#f1f5f9',
        marginBottom: '24px',
    },
    message: {
        color: '#94a3b8',
        textAlign: 'center',
    },
    emptyState: {
        textAlign: 'center',
        color: '#94a3b8',
        padding: '60px 0',
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    card: {
        backgroundColor: '#1e293b',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        border: '1px solid #334155',
    },
    topicBadge: {
        display: 'inline-block',
        backgroundColor: '#1e40af',
        color: '#93c5fd',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        width: 'fit-content',
    },
    articleTitle: {
        margin: 0,
        fontSize: '18px',
        color: '#f1f5f9',
        fontWeight: '600',
    },
    summary: {
        margin: 0,
        color: '#94a3b8',
        lineHeight: '1.6',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    source: {
        fontSize: '12px',
        color: '#64748b',
    },
    readMore: {
        fontSize: '14px',
        color: '#60a5fa',
        textDecoration: 'none',
        fontWeight: '500',
    },
};
export default Feed;