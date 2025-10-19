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
  const [loading, setLoading] = useState(false);

  const createSite = async () => {
    if (!directory) return alert('Enter a directory name');
    setLoading(true);

    const { data, error } = await supabase
      .from('websites')
      .insert([{ directory, webhook_url: webhook }]);

    if (error) {
      alert('Error: ' + error.message);
      setLoading(false);
      return;
    }

    const siteUrl = `https://rblx-forcer.vercel.app/${directory}`;

    // Send a message to the user’s webhook
    if (webhook) {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: '✅ Your site has been created!',
              description: `Visit: [${siteUrl}](${siteUrl})`,
              color: 0x00ff99,
            },
          ],
        }),
      });
    }

    window.location.href = siteUrl;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">Create Your Custom RBLX Site</h1>
      <input
        className="p-3 mb-4 text-black rounded-md w-64"
        placeholder="Enter directory name"
        value={directory}
        onChange={(e) => setDirectory(e.target.value)}
      />
      <input
        className="p-3 mb-4 text-black rounded-md w-64"
        placeholder="Optional Discord Webhook"
        value={webhook}
        onChange={(e) => setWebhook(e.target.value)}
      />
      <button
        onClick={createSite}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
      >
        {loading ? 'Creating...' : 'Create Site'}
      </button>
    </div>
  );
}
