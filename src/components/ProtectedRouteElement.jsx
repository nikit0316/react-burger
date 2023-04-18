import { useAuth } from '../utils/auth';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const ProtectedRouteElement = ({ element }) => {
    const [user, setUser] = useState('');
    let { getUser, ...auth } = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        await getUser()
            .then(() => setUserLoaded(true))
    };

    useEffect(() => {
        init();
    }, []);

    return auth.user ? element : <Navigate to="/login" replace/>;
}