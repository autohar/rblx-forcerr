"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CreatePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [directory, setDirectory] = useState("");
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
      { name, directory, webhook },
    ]);

    if (error) {
      setMessage("❌ Error — directory may already exist!");
      setLoading(false);
      return;
    }

    await sendWebhookMessage(
      webhook,
      `✅ ${name} created their live site: https://rblx-forcer.vercel.app/${directory}`
    );

    setMessage("✅ Site Created! Redirecting...");
    setTimeout(() => router.push(`/${directory}`), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-700 to-indigo-900 p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md text-center text-white">
        <h1 className="text-3xl font-bold mb-6">Create Your Live Website</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your Directory (e.g. john)"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
            value={directory}
            onChange={(e) => setDirectory(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Your Discord Webhook URL"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
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

        {message && <p className="mt-4 text-white font-medium">{message}</p>}
      </div>
    </div>
  );
              }
