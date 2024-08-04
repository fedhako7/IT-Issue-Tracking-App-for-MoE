import React from 'react';
import './message.css';
import {format} from 'timeago.js'
const Message = ({ message,own,  }) => {
   
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className="flex gap-4 items-center px-4">
                <div className="w-10 h-10 flex-shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="rounded-full object-cover w-full h-full"
                    />
                </div>
                <p className="bg-[#0b5394] px-4 rounded-xl text-white message-txt">{message.message}</p>
            </div>
            <div className="m-2">
                <span className="font-semibold">{format(message.createdAt)}</span>
            </div>
        </div>
    );
};

export default Message;