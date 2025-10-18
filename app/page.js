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
        setMessage(`✅ Created successfully!`);
      } else {
        setMessage(`❌ Error: ${data.error || 'Unknown error occurred'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Request failed. Please try again.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">RBLX Generator</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm bg-gray-800 p-6 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          placeholder="Enter directory name"
          value={directory}
          onChange={(e) => setDirectory(e.target.value)}
          className="p-3 rounded-lg text-black"
        />

        <input
          type="text"
          placeholder="Enter webhook URL"
          value={webhook}
          onChange={(e) => setWebhook(e.target.value)}
          className="p-3 rounded-lg text-black"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-semibold"
        >
          Generate
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-gray-300 text-center">{message}</p>
      )}
    </main>
  );
        }
