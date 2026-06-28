export const AuthProvider = ({ children }) => {
    return children;
};

export const useAuth = () => {
    return { isLoggedIn: true};
};