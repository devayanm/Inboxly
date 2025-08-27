import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile } from "lucide-react";

const MessageInput = ({ onSend }) => {
    const [text, setText] = useState("");
    const textareaRef = useRef(null);

    // Auto-resize textarea height
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${scrollHeight}px`;
        }
    }, [text]);

    const handleSend = () => {
        if (text.trim() !== "") {
            onSend(text.trim());
            setText("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="relative flex items-center">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message... (Shift+Enter for new line)"
                    className="w-full   bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 py-2 pr-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="1"
                    style={{ maxHeight: '150px' }}
                />
                <div className="absolute right-2 flex items-center">
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                        <Paperclip size={20} />
                    </button>
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400">
                        <Smile size={20} />
                    </button>
                    <button
                        onClick={handleSend}
                        className="ml-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                        disabled={!text.trim()}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageInput;
