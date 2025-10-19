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
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1>⚠️ Directory not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-600 to-blue-600 text-white">
      <h1 className="text-4xl font-bold mb-4">{data.directory}</h1>
      <p className="text-lg">✅ Your site is live!</p>
      <p className="mt-2 text-sm opacity-80">Webhook: {data.webhook_url}</p>
    </div>
  );
}
