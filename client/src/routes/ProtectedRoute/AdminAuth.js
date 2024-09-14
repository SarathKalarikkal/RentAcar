import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const AdminAuth = ({ children }) => {
    const { isAuthenticated, adminInfo } = useSelector((state) => state.admin);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || adminInfo?.role !== 'admin') {
            navigate('/');
        }
    }, [isAuthenticated, adminInfo, navigate]);

    if (!isAuthenticated || adminInfo?.role !== 'admin') {
        return null; 
    }

    return children;
};