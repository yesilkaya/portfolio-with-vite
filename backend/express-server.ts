import "dotenv/config";
import express from "express";
import { join } from "path";
import { ROOT_DIR } from "../src/config/paths.js";
import apiRouter from "../src/routes/api-routes.js";
import { handleCors } from "../src/utils/cors-express.js";
import { errorHandler } from "../src/middlewares/error-handler.js";

const app = express();

app.use(handleCors());

app.use("/api", apiRouter);
app.use(express.static(join(ROOT_DIR, "dist")));
app.get("/{*splat}", (req, res) => {
  res.sendFile(join(ROOT_DIR, "dist", "index.html"));
});

app.use(errorHandler);

const PORT = process.env.HTTP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
