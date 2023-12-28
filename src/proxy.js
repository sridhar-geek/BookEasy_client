import { createProxyMiddleware } from "http-proxy-middleware";

export  const proxyServer = (app)=> {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://book-easy-server.vercel.app/api",
      // target: "http://localhost:5000/api",
      changeOrigin: true,
    })
  );
}
