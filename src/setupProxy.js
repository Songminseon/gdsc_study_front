const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // const url = process.env.REACT_APP_SERVER_URL;
  const url = "http://localhost:5000"; // 이거바꾸고 꼭 서버 껐다가 다시키기...
  app.use(
    "/api",
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
};
