// src/pages/Homepage.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useWorkspace } from "../context/WorkspaceContext";

const Homepage = () => {
    const { workspace, activeChannel, setActiveChannel, sendMessage } = useWorkspace();

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                {workspace ? (
                    activeChannel ? (
                        <ChatWindow
                            workspaceName={workspace.title}
                            channelName={activeChannel}
                            messages={workspace.messages[activeChannel] || []}
                            onSendMessage={(text) =>
                                sendMessage(activeChannel, {
                                    user: "You",
                                    text,
                                    time: new Date().toLocaleTimeString(),
                                })
                            }
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Select a channel to start chatting
                        </div>
                    )
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Create or select a workspace
                    </div>
                )}
            </div>
        </div>
    );
};

export default Homepage;
