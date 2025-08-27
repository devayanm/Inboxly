// src/components/Sidebar.jsx
import React, { useState } from "react";
import { useWorkspace } from "../context/WorkspaceContext";
import { Folder, Hash, MessageCircle, UserPlus, PlusCircle } from "lucide-react";

const Sidebar = () => {
    const { workspace, activeChannel, setActiveChannel, addChannel } = useWorkspace();
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [newChannel, setNewChannel] = useState("");
    const [showAddChannel, setShowAddChannel] = useState(false);

    if (!workspace) {
        return (
            <div className="w-64 bg-slate-800 text-white flex flex-col p-4">
                <div className="font-bold text-xl mb-4">No Workspace</div>
                <p className="text-slate-400">Please select a workspace to begin.</p>
            </div>
        );
    }

    const handleInvite = () => {
        if (!inviteEmail) return;
        console.log(`Invited ${inviteEmail} to ${workspace.title}`);
        setInviteEmail("");
        setShowInviteModal(false);
    };

    const handleAddChannel = () => {
        if (!newChannel.trim()) return;
        addChannel(workspace.title, newChannel.trim());
        setNewChannel("");
        setShowAddChannel(false);
    };

    return (
        <div className="w-64 bg-slate-800 text-white flex flex-col relative">
            {/* Workspace Header */}
            <div className="p-4 font-bold text-xl border-b border-slate-700 flex items-center">
                <Folder size={20} className="mr-3 text-purple-400" />
                {workspace.name}
            </div>

            {/* Invite Button */}
            <div className="px-4 py-2 border-b border-slate-700">
                <button
                    onClick={() => setShowInviteModal(true)}
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-md"
                >
                    <UserPlus size={18} />
                    Invite
                </button>
            </div>

            {/* Channels Header */}
            <div className="p-3 flex items-center justify-between text-slate-300">
                <span className="flex items-center font-semibold">
                    <Hash size={18} className="mr-2" /> Channels
                </span>
                <button
                    onClick={() => setShowAddChannel(true)}
                    className="hover:text-white"
                    title="Add Channel"
                >
                    <PlusCircle size={18} />
                </button>
            </div>

            {/* Channels List */}
            <div className="px-4 py-2 space-y-1">
                {workspace.channels.map((channel) => (
                    <button
                        key={channel}
                        onClick={() => setActiveChannel(channel)}
                        className={`w-full text-left block py-1.5 px-3 rounded-md transition-colors text-slate-300 ${activeChannel === channel
                            ? "bg-purple-600 text-white font-semibold"
                            : "hover:bg-slate-700"
                            }`}
                    >
                        <span className="flex items-center">
                            <Hash size={16} className="mr-2 opacity-70" />
                            {channel.substring(1)}
                        </span>
                    </button>
                ))}
            </div>

            {/* Direct Messages */}
            <div className="p-3 flex items-center justify-between text-slate-300 mt-4">
                <span className="flex items-center font-semibold">
                    <MessageCircle size={18} className="mr-2" /> Direct Messages
                </span>
            </div>
            <div className="px-4 py-2 text-slate-400 text-sm">
                <p>DMs will appear here.</p>
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-slate-900 p-6 rounded-lg w-80">
                        <h2 className="text-lg font-bold mb-4 text-white">
                            Invite to {workspace.title}
                        </h2>
                        <input
                            type="email"
                            placeholder="Enter email..."
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleInvite}
                                className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-semibold"
                            >
                                Invite
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Channel Modal */}
            {showAddChannel && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-slate-900 p-6 rounded-lg w-80">
                        <h2 className="text-lg font-bold mb-4 text-white">Add Channel</h2>
                        <input
                            type="text"
                            placeholder="Enter channel name..."
                            value={newChannel}
                            onChange={(e) => setNewChannel(e.target.value)}
                            className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={() => setShowAddChannel(false)}
                                className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddChannel}
                                className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-semibold"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
