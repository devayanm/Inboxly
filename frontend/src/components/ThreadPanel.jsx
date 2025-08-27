import React from "react";

const ThreadPanel = ({ thread, onClose }) => {
    if (!thread) return null;

    return (
        <div className="w-80 bg-white border-l flex flex-col">
            <div className="p-3 border-b flex justify-between items-center">
                <span className="font-bold">Thread</span>
                <button onClick={onClose}>❌</button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
                <p><b>{thread.user}</b>: {thread.text}</p>
            </div>
        </div>
    );
};

export default ThreadPanel;
