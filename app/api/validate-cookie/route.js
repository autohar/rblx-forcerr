import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { cookie } = await request.json();
    
    if (!cookie) {
      return NextResponse.json({ 
        valid: false, 
        error: 'No cookie provided' 
      }, { status: 400 });
    }

    // Validate the Roblox cookie by making server-side request
    const userResponse = await fetch('https://users.roblox.com/v1/users/authenticated', {
      method: 'GET',
      headers: {
        'Cookie': `.ROBLOSECURITY=${cookie}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (userResponse.status === 401) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Cookie is expired or invalid' 
      });
    }

    if (!userResponse.ok) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Unable to validate cookie - Roblox API error' 
      });
    }

    const userData = await userResponse.json();

    // Get economy data (Robux balance)
    let robux = 0;
    let pendingRobux = 0;
    try {
      const economyResponse = await fetch(`https://economy.roblox.com/v1/users/${userData.id}/currency`, {
        headers: {
          'Cookie': `.ROBLOSECURITY=${cookie}`,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (economyResponse.ok) {
        const economyData = await economyResponse.json();
        robux = economyData.robux || 0;
        pendingRobux = economyData.pendingRobux || 0;
      }
    } catch (error) {
      console.error('Error fetching economy data:', error);
    }

    // Get premium status
    let hasPremium = false;
    try {
      const premiumResponse = await fetch(`https://premiumfeatures.roblox.com/v1/users/${userData.id}/validate-membership`, {
        headers: {
          'Cookie': `.ROBLOSECURITY=${cookie}`,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (premiumResponse.ok) {
        const premiumData = await premiumResponse.json();
        hasPremium = premiumData || false;
      }
    } catch (error) {
      console.error('Error fetching premium status:', error);
    }

    // Return enriched user data
    return NextResponse.json({
      valid: true,
      userData: {
        ...userData,
        robux,
        pendingRobux,
        premium: hasPremium
      }
    });

  } catch (error) {
    console.error('Error in validate-cookie:', error);
    return NextResponse.json({ 
      valid: false, 
      error: 'Server error - cannot validate cookie at this time' 
    }, { status: 500 });
  }
      }
