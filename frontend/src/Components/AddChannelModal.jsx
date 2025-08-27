import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddChannelModal = ({ isOpen, onClose, onAddChannel }) => {
    const [channelName, setChannelName] = useState('');

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (channelName) {
            onAddChannel(channelName);
            setChannelName('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create a new channel</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="channelName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Channel Name
                        </label>
                        <input
                            type="text"
                            id="channelName"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                            placeholder="e.g., general"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Channel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddChannelModal;
