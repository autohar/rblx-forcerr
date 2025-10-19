"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://ramnfuimgktyyulpjeqh.supabase.co", // 🔹 Replace with your Supabase URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhbW5mdWltZ2t0eXl1bHBqZXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NjgyMDMsImV4cCI6MjA3NTA0NDIwM30.b_iBCqGzNCuKtfgbMZLK8rAI6eK6q9q-CIOWmMPAW60" // 🔹 Replace with your Supabase anon key
);

export default function Page({ params }) {
  const router = useRouter();
  const { directory } = params;
  const [name, setName] = useState("");
  const [webhook, setWebhook] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendWebhookMessage = async (webhookUrl, content) => {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
    } catch (err) {
      console.error("Webhook Error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("users").insert([
      { name, webhook, directory },
    ]);

    if (error) {
      console.error(error);
      setMessage("❌ Error creating your entry. Please try again.");
      setLoading(false);
    } else {
      await sendWebhookMessage(
        webhook,
        `✅ Successfully created site for: **${name}** under directory **${directory}**`
      );

      setMessage("✅ Success! Redirecting...");
      setTimeout(() => {
        router.push(`https://${directory}.vercel.app`);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Create Your Site
        </h1>
        <p className="text-gray-300 mb-6">
          Directory: <span className="font-semibold text-purple-300">{directory}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Your Name"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="url"
            placeholder="Enter Your Discord Webhook URL"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            value={webhook}
            onChange={(e) => setWebhook(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition"
          >
            {loading ? "Creating..." : "Create Site"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-white font-medium">{message}</p>
        )}
      </div>
    </div>
  );
    }
