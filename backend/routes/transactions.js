/**
 * Transaction Routes
 * Create Routes to perform CRUD operations on Transactions collection
 */

// Import packages
import express from "express";

// Import controller functions
import { getAllData, getBarChartData, getCombinedData, getPieChartData, getStatistics, initTransactions, listTransactions } from "../controllers/transactionController.js";

// Initialize the route
export const router = express.Router();

/**
 * @route GET /api/get-all
 * @desc Fetches all data about the data for development and testing help
 */
router.get("/get-all", getAllData);

/**
 * @route GET /api/init
 * @desc  Fetches seed data from third-party API and initializes Database
 */
router.get("/init", initTransactions);

/**
 * @route GET /api/transactions
 * @desc Fetches transactions using month and search parameters, with pagination
 */
router.get("/transactions", listTransactions);

/**
 * @route GET /api/statistics
 * @desc Fetches statistics for the selected month
 */
router.get("/statistics", getStatistics);

/**
 * @route GET /api/bar-chart
 * @desc Fetches Bar Chart data of item counts in price ranges
 */
router.get("/bar-chart", getBarChartData);

/**
 * @route GET /api/pie-chart
 * @desc Fetches Pie Chart Data of Categories
 */
router.get("/pie-chart", getPieChartData);

/**
 * @route GET /api/combined-data
 * @desc Fetches combined data of all APIs
 */
router.get("/combined-data", getCombinedData);