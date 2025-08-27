// src/context/WorkspaceContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [workspace, setWorkspace] = useState(null);
    const [activeChannel, setActiveChannel] = useState(null);

    useEffect(() => {
        const savedWorkspaces = JSON.parse(localStorage.getItem("workspaces")) || [];

        const fixedWorkspaces = savedWorkspaces.map((ws) => ({
            ...ws,
            title: ws.title || ws.name || "Untitled Workspace",
            messages: ws.messages || ws.channels.reduce((acc, ch) => { acc[ch] = []; return acc; }, {}),
        }));

        setWorkspaces(fixedWorkspaces);

        if (fixedWorkspaces.length > 0) {
            setWorkspace(fixedWorkspaces[0]);
            setActiveChannel(fixedWorkspaces[0].channels[0] || null);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("workspaces", JSON.stringify(workspaces));
    }, [workspaces]);

    const selectWorkspace = (ws) => {
        // ✨ FIXED: Ensure the workspace object has a title
        const workspaceWithTitle = {
            ...ws,
            title: ws.title || ws.name || "Untitled Workspace",
        };
        setWorkspace(workspaceWithTitle);
        setActiveChannel(workspaceWithTitle.channels[0] || null);
    };

    const createCustomWorkspace = (ws) => {
        const newWS = {
            title: ws.name,
            channels: ws.channels,
            messages: ws.channels.reduce((acc, ch) => {
                acc[ch] = [];
                return acc;
            }, {}),
            icon: ws.icon || "✨",
        };
        setWorkspaces((prev) => [...prev, newWS]);
        setWorkspace(newWS);
        setActiveChannel(newWS.channels[0] || null);
    };

    const sendMessage = (channel, message) => {
        setWorkspace((prev) => {
            const updated = {
                ...prev,
                messages: {
                    ...prev.messages,
                    [channel]: [...(prev.messages[channel] || []), message],
                },
            };

            setWorkspaces((prevArr) =>
                prevArr.map((w) => (w.title === updated.title ? updated : w))
            );

            return updated;
        });
    };

    const addChannel = (workspaceTitle, channelName) => {
        setWorkspace((prev) => {
            if (!prev.channels.includes(channelName)) {
                const updated = {
                    ...prev,
                    channels: [...prev.channels, channelName],
                    messages: { ...prev.messages, [channelName]: [] },
                };

                setWorkspaces((prevArr) =>
                    prevArr.map((w) => (w.title === updated.title ? updated : w))
                );

                return updated;
            }
            return prev;
        });
    };

    return (
        <WorkspaceContext.Provider
            value={{
                workspaces,
                workspace,
                activeChannel,
                setActiveChannel,
                selectWorkspace,
                createCustomWorkspace,
                sendMessage,
                addChannel,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspace = () => useContext(WorkspaceContext);