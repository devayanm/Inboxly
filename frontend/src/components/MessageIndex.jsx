import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (text.trim() !== "") {
            onSend(text);
            setText("");
        }
    };

    return (
        <div className="p-3 bg-white border-t flex gap-2">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message... (supports markdown)"
                className="flex-1 border rounded-lg px-3 py-2"
            />
            <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;
