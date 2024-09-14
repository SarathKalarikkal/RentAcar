import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BiSolidDashboard } from 'react-icons/bi';
import './style.css';
import axiosInstance from "../../../config/axiosInstance";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminHomePage = () => {
    const [usersCount, setUsersCount] = useState(null);
    const [dealersCount, setDealersCount] = useState(null);
    const [carsCount, setCarsCount] = useState(null);
    const [chartData, setChartData] = useState({
        labels: ['Users', 'Dealers', 'Cars'],
        datasets: [
            {
                label: 'Count',
                data: [0, 0, 0], // Initial values
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    });

    const fetchCounts = async () => {
        try {
            const response = await axiosInstance.get('/admin/allusers');
            const userCount = response.data.data;
            setUsersCount(userCount.length);

            const dealerresponse = await axiosInstance.get('/admin/dealers');
            const dealerCount = dealerresponse.data.data;
            setDealersCount(dealerCount.length);

            const carsresponse = await axiosInstance.get('/admin/allcars');
            const carsCount = carsresponse.data.data;
            setCarsCount(carsCount.length);

         
            setChartData({
                labels: ['Users', 'Dealers', 'Cars'],
                datasets: [
                    {
                        label: 'Count',
                        data: [userCount.length, dealerCount.length, carsCount.length],
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    useEffect(() => {
        fetchCounts();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                    },
                },
            },
        },
    };

    return (
        <>
            <div className='d-flex flex-column w-100'>
                <div className="admin-top">
                    <h5><BiSolidDashboard /> DASHBOARD</h5>
                </div>
                <div className="admin-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="dashboard-card">
                                    <div className="card-body">
                                        <Bar data={chartData} options={options} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHomePage;
