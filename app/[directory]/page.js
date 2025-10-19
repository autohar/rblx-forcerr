import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async function Page({ params }) {
  const { directory } = params;

  // Fetch the matching site info
  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("directory", directory)
    .single();

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl font-bold">❌ Site Not Found</h1>
        <p className="text-gray-400 mt-2">Please check your generated link.</p>
      </div>
    );
  }

  // Send Discord Webhook notification
  if (data.webhook_url) {
    await fetch(data.webhook_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "✅ Site Successfully Created!",
            description: `Your site **${directory}** is now live!`,
            color: 0x00ff99,
            footer: {
              text: "RBLX Generator",
            },
            fields: [
              {
                name: "🔗 Visit Site",
                value: `https://${directory}.vercel.app`,
              },
            ],
          },
        ],
      }),
    });
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 text-white">
      <div className="bg-white/10 p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-extrabold mb-4">
          🎉 Welcome to {directory}!
        </h1>
        <p className="text-lg mb-6 text-gray-200">
          Your generated page is now live and your webhook has been notified.
        </p>
        <a
          href="/"
          className="bg-white text-indigo-700 px-5 py-2 rounded-xl font-semibold hover:bg-indigo-200 transition"
        >
          🔙 Go Back Home
        </a>
      </div>
    </main>
  );
}
