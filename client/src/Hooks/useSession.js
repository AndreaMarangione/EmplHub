import React, { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const useSession = () => {
    const [searchParams] = useSearchParams();
    const saveToken = () => {
        const token = searchParams.get('T');
        if (token) {
            localStorage.setItem('token', JSON.stringify(token));
        }
    }
    saveToken();
    const session = JSON.parse(localStorage.getItem('token'));
    const decodedSession = session ? jwtDecode(session) : null;
    const sessionExp = session ? new Date(decodedSession.exp * 1000) : null;
    const navigate = useNavigate();
    useEffect(() => {
        if (!session) {
            navigate('/login');
        }
    }, [navigate, session]);
    return { session, decodedSession, sessionExp };
}

export default useSession;
