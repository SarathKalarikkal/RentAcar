import React, { useState } from 'react';
import { FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdEvent } from 'react-icons/md'; // Calendar icon for date
import axiosInstance from '../../config/axiosInstance';
import './style.css'; 

const MessageCard = ({ message, onDelete }) => {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/message/delete/${message._id}`);
            onDelete(message._id);
        } catch (error) {
            console.error("Failed to delete message:", error);
        }
    };

    return (
        <div className="mb-3 message-card">
            <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    {/* Left Section: Calendar Icon */}
                    <MdEvent className="calendar-icon" />

                    {/* Middle Section: Message Details */}
                    <div className="ml-3">
                        <h5 className="card-title name">{message.name}</h5>
                        <p className="card-subtitle mb-2 text-muted">
                            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                            - {message.location || message.email}
                        </p>
                    </div>
                </div>

                {/* Right Section: Expand and Delete Buttons */}
                <div className="d-flex align-items-center">
                    <button
                        className="small-btn"
                        onClick={() => setOpen(!open)}
                        aria-controls={`message-content-${message._id}`}
                        aria-expanded={open}
                    >
                        {open ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    <button
                        className="small-btn  ml-2"
                        onClick={handleDelete}
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            {/* Collapsible Message Content */}
            <div 
                id={`message-content-${message._id}`} 
                className={`collapse mt-3 ${open ? 'show' : ''}`}
            >
                <p className="card-text">{message.message}</p>
            </div>
        </div>
    );
};

export default MessageCard;
