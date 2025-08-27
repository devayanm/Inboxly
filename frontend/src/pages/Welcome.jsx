// src/pages/Welcome.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkspace } from "../context/WorkspaceContext";
import WorkspaceModal from "../components/WorkspaceModal";

const workspaceTemplates = [
  {
    name: "Team Collaboration Hub",
    description: "Perfect for companies and startups with channels for teams and projects.",
    channels: ["#general", "#announcements", "#design", "#development", "#qa"],
    icon: "👥",
  },
  {
    name: "Study Group Space",
    description: "Ideal for students to share resources, assignments, and Q&A sessions.",
    channels: ["#lectures", "#assignments", "#resources", "#qna", "#casual-chat"],
    icon: "📚",
  },
  {
    name: "Startup Workspace",
    description: "Organize product, marketing, sales, and investor discussions in one place.",
    channels: ["#planning", "#product", "#marketing", "#sales", "#investors"],
    icon: "🚀",
  },
  {
    name: "Gaming Community Server",
    description: "Engage your gaming squad with chats, strategies, and tournaments.",
    channels: ["#game-chat", "#voice", "#strategy", "#tournaments", "#memes"],
    icon: "🎮",
  },
  {
    name: "Hackathon Team Space",
    description: "Collaborate with your hackathon team and track progress easily.",
    channels: ["#ideas", "#code", "#tasks", "#progress-updates", "#demo"],
    icon: "💻",
  },
  {
    name: "Friends & Social Hangout",
    description: "Casual fun space for memes, movies, music, and late-night chats.",
    channels: ["#memes", "#music", "#movies", "#late-night", "#general"],
    icon: "🥳",
  },
];

const Welcome = () => {
  const navigate = useNavigate();
  const { workspaces, workspace, selectWorkspace, createCustomWorkspace } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [navigateToHomepage, setNavigateToHomepage] = useState(false);

  // ✅ Navigate after workspace updates
  useEffect(() => {
    if (navigateToHomepage && workspace) {
      navigate("/homepage");
      setNavigateToHomepage(false);
    }
  }, [workspace, navigate, navigateToHomepage]);

  const handleSelectTemplate = (template) => {
    const ws = {
      title: template.name,
      channels: template.channels,
      messages: template.channels.reduce((acc, ch) => {
        acc[ch] = [];
        return acc;
      }, {}),
      icon: template.icon,
    };

    createCustomWorkspace(ws); // Update context
    setNavigateToHomepage(true); // Trigger navigation after workspace is set
  };

  const handleModalCreate = (newWorkspace) => {
    createCustomWorkspace(newWorkspace); // Update context
    setNavigateToHomepage(true); // Trigger navigation after workspace is set
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-purple-400">Inboxly</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Create a new workspace or select one of your existing workspaces.
          </p>
        </header>

        {/* Existing Workspaces */}
        {workspaces.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Workspaces</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaces.map((ws, index) => (
                <div
                  key={index}
                  onClick={() => {
                    selectWorkspace(ws);
                    setNavigateToHomepage(true);
                  }}
                  className="cursor-pointer bg-slate-800 rounded-xl p-6 text-center hover:bg-purple-700 transition-colors"
                >
                  <div className="text-4xl mb-2">{ws.icon}</div>
                  <h3 className="font-bold text-lg">{ws.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{ws.channels.length} channels</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Custom Workspace */}
        <div className="text-center mb-16">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
          >
            + Create a Custom Workspace
          </button>
        </div>

        {/* Templates Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Or Start with a Template</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workspaceTemplates.map((template, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="text-4xl mb-4">{template.icon}</div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{template.name}</h3>
                <p className="text-slate-400 mb-4 text-sm">{template.description}</p>
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Channels Included:</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.channels.map((ch, i) => (
                      <span
                        key={i}
                        className="bg-slate-700 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-b-2xl mt-auto">
                <button
                  onClick={() => handleSelectTemplate(template)}
                  className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300"
                >
                  Use this Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workspace Modal */}
      <WorkspaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleModalCreate}
      />
    </div>
  );
};

export default Welcome;
