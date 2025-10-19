import { supabase } from "../../supabase/supabaseClient";

export default async function DirectoryPage({ params }) {
  const { directory } = params;

  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("directory", directory)
    .maybeSingle();

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-2">❌ Page Not Found</h1>
        <p className="text-white/70">This directory doesn’t exist.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 to-pink-600 text-white">
      <h1 className="text-4xl font-extrabold mb-3">{data.directory.toUpperCase()}</h1>
      <p className="text-white/80 mb-6">This site is live 24/7 ✨</p>

      <div className="bg-white/10 p-4 rounded-xl border border-white/20">
        <p className="text-sm text-white/70">
          Created for you automatically via RBLX Generator
        </p>
      </div>
    </div>
  );
}
