import express from "express";
import { ENV } from "./config/env";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { User } from "./db/schema";
import path from "path";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();


app.use(cors({
  origin: ENV.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse form data

app.get("/api/health", (req, res) => {
  res.json({
    message: "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

if (ENV.NODE_ENV === "production") {
  const __dirname = path.resolve();

  // serve static files from client/dist
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // handle SPA routing - send all non-API routes to index.html - react app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});