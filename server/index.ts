import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import phoneRoutes from "./routes/phoneNumbers";
import messageRoutes from "./routes/messages";

dotenv.config({ path: "./server/.env" });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", phoneRoutes);
app.use("/api", messageRoutes);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
