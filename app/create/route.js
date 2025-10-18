import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request) {
  try {
    const body = await request.json();
    const { directory, webhook } = body;

    if (!directory || !webhook) {
      return new Response(
        JSON.stringify({ error: 'Missing directory or webhook' }),
        { status: 400 }
      );
    }

    // Insert the new record into Supabase table "websites"
    const { data, error } = await supabase
      .from('websites')
      .insert([{ directory, webhook }]);

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Website entry created successfully',
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error('POST error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
