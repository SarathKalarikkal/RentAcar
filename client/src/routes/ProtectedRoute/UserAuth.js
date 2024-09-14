import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const UserAuth = ({ children }) => {
    const { isAuthenticated, userInfo } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || userInfo?.role !== 'user') {
            navigate('/common/login');
        }
    }, [isAuthenticated, userInfo, navigate]);

    if (!isAuthenticated || userInfo?.role !== 'user') {
        return null; 
    }

    return children;
}