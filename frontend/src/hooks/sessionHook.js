import { useState, useEffect } from 'react';

export const useSession = () => {
    const [sessionId, setSessionId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/session', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(() => {
                setSessionId(true);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { sessionId, loading, error };
};