import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const useSession = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const saveToken = () => {
        const tokenUrl = searchParams.get('T');
        if (tokenUrl) {
            localStorage.setItem('token', JSON.stringify(tokenUrl));
        }
    }
    saveToken();
    const token = JSON.parse(localStorage.getItem('token'));
    const session = token ? jwtDecode(token) : null;
    const sessionExp = session ? new Date(session.exp * 1000) : null;
    const sessionExpired = new Date() > sessionExp;
    useEffect(() => {
        if (!token || sessionExpired) {
            navigate('/login');
        }
    }, [navigate, token]);
    return { token, session, sessionExpired };
}

export default useSession;
