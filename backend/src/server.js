import app from "./app.js";
import "dotenv/config.js";

const server = app;
const PORT = process.env.PORT || 5001;

server
  .listen(PORT, () => {
    console.log(`✅ Server running on port: http://localhost:${PORT}`);
  })
  .on("error", (error) => {
    console.error("❌ Server error:", error.message);
    process.exit(1);
  });
