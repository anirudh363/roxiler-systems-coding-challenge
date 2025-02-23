/*
 * Author: Anirudh Manjunath Sandilya
 * Date Created: 2025-02-22 12:42:07
 * Last Modified: 2025-02-22 18:41:01
 * Filename: server.js
 *
 * Description:
 *   Entry point for the Express backend server.
 *   Configures environment variables, connects to MongoDB, sets up middleware, and initializes API routes.
 *
 *
 * Project Initialization:
 *   $ npm init -y
 *
 * Usage:
 *   $ npm run dev
 *
 * Dependencies:
 *   - express
 *   - mongoose
 *   - cors
 *   - dotenv
 *   - nodemon
 * 
 * Notes:
 *
 */

// Import packages
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Configue environment variables
dotenv.config();

// Import routes
import { router as TransactionRoutes } from "./routes/transactions.js";

// Initialize Express application
const app = express();

// Get environment variables
const MONGO_URI = process.env.MONGO_URI;
const DATABASE = process.env.DATABASE;
export const PORT = process.env.PORT;
export const THIRD_PARTY_API = process.env.THIRD_PARTY_API;

// Initialize middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Logger middleware to log request paths and methods
app.use((req, res, next) => {
  console.log(" | ", req.path, " | ", req.query, " | ", req.method, " | ");
  next();
});

// Test the server
app.get("/", (req, res) => {
  res.send("Server is running..");
});

// Register API routes
app.use("/api", TransactionRoutes);

// connect to MongoDB and start the server
mongoose
  .connect(`${MONGO_URI}/${DATABASE}`)
  .then(
    // listen for requests
    app.listen(PORT, () => {
      console.log("Connected to Database and listening for requests..");
    })
  )
  .catch((error) => console.log(error));
