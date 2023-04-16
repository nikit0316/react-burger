import { useContext, useState, createContext } from 'react';
import { deleteCookie, setCookie } from './utils';
import React from 'react';
import {loginRequest, getUserRequest, logoutRequest, registerRequest, getAccesstoken} from './api';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        return await getUserRequest()
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUser({ ...data.user, name: data.user.name, email: data.user.email, password: data.user.password });
                }
                return data.success;
            });
    };

    const refreshAccessToken = async () => {
        const data = await getAccesstoken()
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    let authToken = data['accessToken'].split('Bearer ')[1];
                    let refreshToken = data['refreshToken'];
                    if (authToken) {
                        setCookie('token', authToken, {expires: 1200});
                        setCookie('refreshToken', refreshToken);
                    }
                    return data;
                }
                else {
                    signOut()
                }
            })

        return data;
    }

    const signIn = async form => {
        const data = await loginRequest(form)
            .then(res => res.json())
            .then(data => {
                let authToken = data['accessToken'].split('Bearer ')[1];
                let refreshToken = data['refreshToken'];
                if (authToken) {
                    setCookie('token', authToken, {expires: 12});
                    setCookie('refreshToken', refreshToken);
                }
                return data;
            })

        if (data.success) {
            setUser({ ...data.user, email: data.user.email, name: data.user.name });
        }
    };

    const signOut = async () => {
        await logoutRequest()
        setUser();
        deleteCookie('token');
        deleteCookie('refreshToken')
    };

    const register = async form => {
        const data = await registerRequest(form)
            .then(res => res.json())
            .then(data => {
                let authToken = data['accessToken'].split('Bearer ')[1];
                let refreshToken = data['refreshToken'];
                if (authToken) {
                    setCookie('token', authToken);
                    setCookie('refreshToken', refreshToken);
                }
                return data;
            })

        if (data.success) {
            setUser({ ...data.user, email: data.user.email, name: data.user.name });
        }
    }

    return {
        user,
        getUser,
        signIn,
        refreshAccessToken,
        register,
        signOut
    };
}