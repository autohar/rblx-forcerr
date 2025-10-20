/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minification (faster than Terser)
  swcMinify: true,
}

module.exports = nextConfig
