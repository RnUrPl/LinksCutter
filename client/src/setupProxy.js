const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://linkscutter-7.onrender.com/',
      changeOrigin: true,
    })
  );
};