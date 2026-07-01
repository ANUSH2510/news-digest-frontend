import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async () => {
        setLoading(true);
        setError('');
        try {
           const response = await signup({name,email,password});
           localStorage.setItem('token',response.data.token);
           navigate('/topics');
        } catch (err) {
            console.log('Signup error:' , err);
            setError('Email already registered or invalid data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Create Account</h1>
                <p style={styles.subtitle}>Get your personalized news digest</p>

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    style={styles.input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p style={styles.error}>{error}</p>}

                <button
                    style={styles.button}
                    onClick={handleSignup}
                    disabled={loading}>
                    {loading ? 'Creating account...' : 'Sign Up'}
                </button>

                <p style={styles.link}>
                    Already have an account?{' '}
                    <Link to="/login">Login</Link>
                </p>
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
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
    },
    card: {
        backgroundColor: '#1e293b',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        border: '1px solid #334155',
    },
    title: {
        margin: 0,
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#f1f5f9',
    },
    subtitle: {
        margin: 0,
        color: '#94a3b8',
        fontSize: '14px',
    },
    input: {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #334155',
        fontSize: '16px',
        outline: 'none',
        backgroundColor: '#0f172a',
        color: '#f1f5f9',
    },
    button: {
        padding: '12px',
        background: 'linear-gradient(135deg, #4299e1, #7c3aed)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    error: {
        color: '#f87171',
        fontSize: '14px',
        margin: 0,
    },
    link: {
        textAlign: 'center',
        fontSize: '14px',
        color: '#94a3b8',
    },
};
export default Signup;