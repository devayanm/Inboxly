import React, { useEffect, useRef } from "react";
import { useWorkspace } from "../context/WorkspaceContext";
import { Hash } from "lucide-react";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
    const { workspace, activeChannel, sendMessage } = useWorkspace();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [workspace?.messages, activeChannel]);

    if (!workspace || !activeChannel) {
        return (
            <div className="flex-1 flex items-center justify-center bg-slate-700 text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Welcome to Inboxly</h2>
                    <p className="text-slate-400">Select a channel to start chatting.</p>
                </div>
            </div>
        );
    }

    const messages = workspace.messages?.[activeChannel] || [];

    return (
        <div className="flex-1 flex flex-col bg-slate-700 overflow-hidden">
            {/* Channel Header */}
            <div className="p-4 border-b border-slate-600">
                <h2 className="text-xl font-bold text-white flex items-center">
                    <Hash size={20} className="mr-2 text-slate-400" />
                    {activeChannel.substring(1)}
                </h2>
                <p className="text-sm text-slate-400">
                    This is the start of the{" "}
                    <span className="font-semibold text-white">{activeChannel}</span>{" "}
                    channel in the{" "}
                    <span className="font-semibold text-white">{workspace.title}</span>{" "}
                    workspace.
                </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center text-slate-400 mt-8">
                        <p className="text-lg">No messages yet.</p>
                        <p>Be the first to say something!</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex-shrink-0"></div>
                            <div className="flex-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-bold text-white">{msg.user}</span>
                                    <span className="text-xs text-slate-400">{msg.time}</span>
                                </div>
                                <p className="mt-1 text-slate-200">{msg.text}</p>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <MessageInput
                onSend={(text) =>
                    sendMessage(activeChannel, {
                        user: "You", // later can be dynamic (login user)
                        text,
                        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    })
                }
            />
        </div>
    );
};

export default ChatWindow;
