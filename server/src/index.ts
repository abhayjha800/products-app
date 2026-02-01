import express from "express";
import { ENV } from "./config/env";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { User } from "./db/schema";

const app = express();


app.use(cors({
  origin: ENV.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse form data

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(ENV.PORT, () => {
  console.log(`Server is runninggg`);
});