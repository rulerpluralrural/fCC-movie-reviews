import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/reviews", reviews);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
