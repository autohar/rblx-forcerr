"use client";
import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function HomePage() {
  const [directory, setDirectory] = useState("");
  const [webhook, setWebhook] = useState("");
  const [status, setStatus] = useState("");

  const handleGenerate = async () => {
    if (!directory || !webhook) {
      setStatus("⚠️ Please enter both directory name and webhook URL");
      return;
    }

    setStatus("⏳ Creating your site...");

    // Save record in Supabase table
    const { error } = await supabase
      .from("websites")
      .insert([{ directory, webhook_url: webhook }]);

    if (error) {
      console.error(error);
      setStatus("❌ Error: " + error.message);
      return;
    }

    // Send a Discord webhook message automatically
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `✅ Your site "${directory}" has been successfully created!\n🌐 Visit: https://rblx-forcer.vercel.app/${directory}`,
        }),
      });
    } catch (err) {
      console.error("Webhook failed:", err);
    }

    // Redirect to the user’s generated page
    window.location.href = `/${directory}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white px-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold mb-4">RBLX Site Generator</h1>
        <p className="text-sm mb-6 text-gray-200">
          Instantly create your own live 24/7 site with one click!
        </p>

        <input
          value={directory}
          onChange={(e) => setDirectory(e.target.value)}
          placeholder="Enter site directory (e.g. mystore)"
          className="w-full px-3 py-2 mb-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <input
          value={webhook}
          onChange={(e) => setWebhook(e.target.value)}
          placeholder="Enter Discord Webhook URL"
          className="w-full px-3 py-2 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          onClick={handleGenerate}
          className="w-full py-2 font-semibold bg-white text-purple-700 rounded-lg hover:bg-purple-100 transition-all duration-300"
        >
          🚀 Generate My Website
        </button>

        {status && (
          <p className="mt-4 text-sm text-white/90 font-medium">{status}</p>
        )}
      </div>

      <footer className="mt-8 text-sm opacity-70">
        © {new Date().getFullYear()} RBLX Generator
      </footer>
    </div>
  );
            }
