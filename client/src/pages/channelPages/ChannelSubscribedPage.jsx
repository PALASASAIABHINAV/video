import React, { useEffect, useState } from 'react';
import SubscriberProfileComponent from '../../components/SubscriberProfileComponent';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function ChannelSubscribedPage() {
    const channelId = useParams().channelId;
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${import.meta.env.VITE_HOST}/api/subscription/c/${channelId}`, {
                withCredentials: true
            });
            if (!response.data.success) {
                setError("Failed to fetch subscribers");
            } else {
                setSubscribers(response.data.data);
            }
        } catch (err) {
            setError("Network error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [channelId]);

    if (loading) return <motion.div className="flex justify-center items-center min-h-[200px] text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Loading...</motion.div>;
    if (error) return <motion.div className="text-red-600 text-center py-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>;

    return (
        <motion.div
            className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Channel Subscribers</h1>
            <p className="mb-4 text-gray-600 dark:text-gray-300">{subscribers.length} {subscribers.length === 1 ? 'subscriber' : 'subscribers'}</p>
            {subscribers.length === 0 ? (
                <motion.div className="text-center text-gray-500 dark:text-gray-400 py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>No Subscribers Yet</motion.div>
            ) : (
                <ul className="space-y-4">
                    {subscribers.map((subscriber, index) => (
                        <motion.li
                            key={subscriber._id || index}
                            className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.07 }}
                        >
                            <div>
                                <img src={subscriber.channel.avatar} alt="avatar" width={40} height={40} className="rounded-full border border-gray-300 dark:border-gray-700" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-gray-800 dark:text-gray-100">Username: {subscriber.channel.username}</div>
                                <div className="text-gray-600 dark:text-gray-300">Full Name: {subscriber.channel.fullName}</div>
                                <div className="text-xs text-gray-400 dark:text-gray-500">Subscribed Since: {subscriber.createdAt}</div>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
}

export default ChannelSubscribedPage;
