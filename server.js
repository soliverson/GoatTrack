const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client', 'public')));

// Proxy API requests to the backend server
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
}));

// Fallback to the main client app for other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Client server is running on port ${PORT}`);
});
