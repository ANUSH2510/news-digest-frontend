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
                            <div style={styles.topicBadge}>
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

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
    },
    navbar: {
        backgroundColor: 'white',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    brand: {
        margin: 0,
        fontSize: '20px',
        color: '#1a202c',
    },
    logoutBtn: {
        padding: '8px 16px',
        backgroundColor: '#e53e3e',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    navButtons:{
        display:'flex',
        gap:'12px',
    },
    topicsBtn:{
        padding:'8px 16px',
        backgroundColor:'#4299e1',
        color:'white',
        border:'none',
        borderRadius:'8px',
        cursor:'pointer',
        fontWeight:'bold',
    },
    content: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '32px 16px',
    },
    heading: {
        fontSize: '22px',
        color: '#1a202c',
        marginBottom: '24px',
    },
    message: {
        color: '#718096',
        textAlign: 'center',
    },
    emptyState: {
        textAlign: 'center',
        color: '#718096',
        padding: '60px 0',
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    card: {
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    topicBadge: {
        display: 'inline-block',
        backgroundColor: '#ebf8ff',
        color: '#2b6cb0',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        width: 'fit-content',
    },
    articleTitle: {
        margin: 0,
        fontSize: '18px',
        color: '#1a202c',
        fontWeight: '600',
    },
    summary: {
        margin: 0,
        color: '#4a5568',
        lineHeight: '1.6',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    source: {
        fontSize: '12px',
        color: '#718096',
    },
    readMore: {
        fontSize: '14px',
        color: '#4299e1',
        textDecoration: 'none',
        fontWeight: '500',
    },
    
};
export default Feed;