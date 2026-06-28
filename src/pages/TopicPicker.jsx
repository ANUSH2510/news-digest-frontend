import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTopics, selectTopics } from '../services/api';

function TopicPicker() {
    const [topics, setTopics] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTopics().then((res) => setTopics(res.data));
    }, []);

    const toggleTopic = (id) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((t) => t !== id)
                : [...prev, id]
        );
    };

    const handleSave = async () => {
        if (selected.length === 0) return;
        setLoading(true);
        try {
            await selectTopics(selected);
            navigate('/feed');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Choose Your Topics</h1>
                <p style={styles.subtitle}>
                    Select topics you want in your daily digest
                </p>

                <div style={styles.topicsGrid}>
                    {topics.map((topic) => (
                        <div
                            key={topic.id}
                            style={{
                                ...styles.topicChip,
                                backgroundColor: selected.includes(topic.id)
                                    ? '#4299e1'
                                    : '#edf2f7',
                                color: selected.includes(topic.id)
                                    ? 'white'
                                    : '#2d3748',
                            }}
                            onClick={() => toggleTopic(topic.id)}>
                            {topic.name}
                        </div>
                    ))}
                </div>

                <button
                    style={{
                        ...styles.button,
                        opacity: selected.length === 0 ? 0.5 : 1,
                    }}
                    onClick={handleSave}
                    disabled={loading || selected.length === 0}>
                    {loading ? 'Saving...' : `Continue with ${selected.length} topics`}
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f4f8',
    },
    card: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    title: {
        margin: 0,
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#1a202c',
    },
    subtitle: {
        margin: 0,
        color: '#718096',
        fontSize: '14px',
    },
    topicsGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
    },
    topicChip: {
        padding: '10px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px',
        transition: 'all 0.2s',
    },
    button: {
        padding: '12px',
        backgroundColor: '#4299e1',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
};
export default TopicPicker