// src/pages/Docs.jsx
import React from "react";

const Docs = () => {
  return (
    <div className="p-10 max-w-5xl mx-auto text-gray-200">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-10 text-center">📖 Inboxly Documentation</h1>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">📌 Introduction / Overview</h2>
        <p className="leading-relaxed">
          <strong>Inboxly</strong> is an open-source real-time messenger platform designed
          for teams and products that need a fully integratable communication inbox.
          It solves the problem of building reliable, secure, and extensible messaging
          systems by providing APIs, SDKs, and embeddable components.
        </p>
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🛠 Tech Stack</h2>
        <table className="table-auto border border-gray-700 w-full text-left">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 border">Layer</th>
              <th className="px-4 py-2 border">Technology</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">Frontend</td>
              <td className="px-4 py-2 border">React + Vite, Tailwind CSS</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Backend</td>
              <td className="px-4 py-2 border">Node.js + Express</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Database</td>
              <td className="px-4 py-2 border">MongoDB</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Realtime</td>
              <td className="px-4 py-2 border">Socket.IO</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Auth</td>
              <td className="px-4 py-2 border">JWT + RBAC</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Storage</td>
              <td className="px-4 py-2 border">Local / S3-compatible</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Setup Instructions */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🚀 Setup Instructions</h2>
        <ol className="list-decimal list-inside space-y-3">
          <li>
            Clone the repository:
            <pre className="bg-gray-900 text-green-400 p-3 rounded mt-2 overflow-x-auto">
              git clone https://github.com/YOUR_USERNAME/inboxly.git
            </pre>
          </li>
          <li>
            Install dependencies:
            <pre className="bg-gray-900 text-green-400 p-3 rounded mt-2 overflow-x-auto">
              npm install
            </pre>
          </li>
          <li>
            Configure environment:
            <pre className="bg-gray-900 text-green-400 p-3 rounded mt-2 overflow-x-auto">
              cp .env.example .env
            </pre>
          </li>
          <li>
            Run locally:
            <pre className="bg-gray-900 text-green-400 p-3 rounded mt-2 overflow-x-auto">
              cd backend && npm run dev{"\n"}
              cd frontend && npm run dev
            </pre>
          </li>
        </ol>
      </section>

      {/* APIs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">📡 API Overview</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><code>POST /auth/login</code> → Authenticate user</li>
          <li><code>POST /auth/register</code> → Register new user</li>
          <li><code>GET /messages/:id</code> → Fetch conversation</li>
          <li><code>POST /messages</code> → Send new message</li>
          <li><code>DELETE /messages/:id</code> → Delete message</li>
        </ul>
      </section>

      {/* Footer */}
      <section className="mt-16 text-center text-sm text-gray-400">
        📜 Licensed under MIT | Built by the Inboxly Community
      </section>
    </div>
  );
};

export default Docs;
