import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function DirectoryPage({ params }) {
  const { directory } = params;

  // Fetch data from Supabase
  const { data, error } = await supabase
    .from('websites')
    .select('*')
    .eq('directory', directory)
    .single();

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold">404 — Site not found</h1>
        <p className="text-gray-400 mt-2">Try a different directory.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center">
      <h1 className="text-5xl font-bold">{data.name || directory}</h1>
      <p className="mt-4 text-lg text-gray-300">Your custom site is live 🎉</p>
    </div>
  );
}
