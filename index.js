const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3001;

app.use('/api', createProxyMiddleware({
  target: 'http://127.0.0.1:8000',
  changeOrigin: true,
}));

app.use(express.static(path.join(__dirname, 'client-build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-build', 'index.html'));
});

app.listen(port, () => console.log(`Serwer na porcie ${port}`));