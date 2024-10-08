import React, { useEffect, useState } from 'react';
import { MdMessage } from "react-icons/md";
import axiosInstance from '../../../config/axiosInstance';
import MessageCard from '../../../components/Admin/MessageCard';
import AdminLoader from '../../../components/Loader/AdminLoader';

const AllMessagePage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const response = await axiosInstance.get('/message/list');
            setMessages(response.data.data);
            setLoading(false)
        } catch (error) {
            console.error("Failed to fetch messages:", error);
            setLoading(false)
        }
    };

    const handleDelete = (deletedMessageId) => {
        setMessages(messages.filter(message => message._id !== deletedMessageId));
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    if (loading) {
        return <AdminLoader/>;
      }

    return (
        <div className='d-flex flex-column w-100 all-user-wrapper'>
            <div className="admin-top">
                <h5><MdMessage /> Messages</h5>
            </div>
            <div className="admin-bottom">
                <div className="container">
                    <div className="row">
                        {messages?.map((message) => (
                            <div className="col-md-12" key={message._id}>
                                <MessageCard message={message} onDelete={handleDelete} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllMessagePage;
