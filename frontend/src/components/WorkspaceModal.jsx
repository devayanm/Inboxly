// src/components/WorkspaceModal.jsx
import React, { useState } from "react";

const WorkspaceModal = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState("");
    const [channels, setChannels] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        const channelList = channels
            .split(",")
            .map((ch) => ch.trim())                          // remove extra spaces
            .filter(Boolean)                                 // remove empty strings
            .map((ch) => (ch.startsWith("#") ? ch : `#${ch}`)); // add # if missing

        const messages = {};
        channelList.forEach((ch) => (messages[ch] = []));

        const newWorkspace = {
            title: name,
            channels: channelList,
            messages,
            icon: "✨",
        };

        onCreate(newWorkspace);
        setName("");
        setChannels("");
        onClose();
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6 z-10">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                    Create New Workspace
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Workspace Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter workspace name"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Channels (comma-separated)
                        </label>
                        <input
                            type="text"
                            value={channels}
                            onChange={(e) => setChannels(e.target.value)}
                            placeholder="#general, #announcements, #random"
                            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-md transition"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WorkspaceModal;
