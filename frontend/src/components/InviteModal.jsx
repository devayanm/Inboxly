import React, { useState } from "react";

const InviteModal = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [inviteLink, setInviteLink] = useState("");

    const handleInvite = () => {
        if (!email) return;
        // Mock unique invite link
        const link = `https://demo-app.com/invite/${Math.random().toString(36).substr(2, 8)}`;
        setInviteLink(link);
        setEmail("");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteLink);
        alert("Invite link copied!");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Invite to Workspace</h2>

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
                />

                <button
                    onClick={handleInvite}
                    className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                >
                    Generate Invite
                </button>

                {inviteLink && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Invite Link:</p>
                        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                            <span className="text-xs text-gray-800 dark:text-gray-200">{inviteLink}</span>
                            <button onClick={handleCopy} className="text-blue-500 text-sm">Copy</button>
                        </div>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default InviteModal;
