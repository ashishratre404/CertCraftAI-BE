import express from "express";
import cors from "cors";
import generateRoutes from "./api/routes/generate.js";
import modifyRoutes from "./api/routes/modify.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/generate", generateRoutes);
app.use("/api/modify", modifyRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
