import { supabase } from "../../supabaseClient";

export default async function DirectoryPage({ params }) {
  const { directory } = params;

  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("directory", directory)
    .single();

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-2xl font-bold">❌ Site Not Found</h1>
        <p className="mt-2 text-gray-400">
          This directory doesn’t exist or has been deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-indigo-700 text-white">
      <h1 className="text-4xl font-bold mb-4">✅ {data.directory}</h1>
      <p className="text-lg">Your live site is now active 24/7!</p>
      <a
        href={data.webhook_url}
        target="_blank"
        className="mt-6 px-4 py-2 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition"
      >
        Open Webhook
      </a>
    </div>
  );
}
