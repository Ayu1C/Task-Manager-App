const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();

// // Enable CORS
// app.use(cors());

module.exports = function (app) {
  app.use(
    '/api',  // Specify the path you want to proxy
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE_URL,  // Specify the target API server
      changeOrigin: true,
    })
  );
};
