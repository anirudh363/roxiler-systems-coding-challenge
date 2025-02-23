/**
 * Controller Functions
 * Functions to perform operations on Transactions collection
 */

// Import Model
import { TransactionModel } from "../models/transactionModel.js";

// Import environment variables
import { THIRD_PARTY_API, PORT } from "../server.js";

// Fetch all data about the data for development and testing help
export const getAllData = async (req, res) => {
    try {
        // Fetch data
        const transactions = await TransactionModel.find();

        const categories = []
        
        transactions.forEach((transaction) => {
            const category = transaction.category;

            if (!categories.includes(category)) {
                categories.push(category);
            }
        });

        const totalCategories = categories.length

        const totalTransactions = transactions.length;

        res.status(200).json({
            transactions,
            categories,
            totalCategories,
            totalTransactions
        });

    } catch (error) {
        console.error("Error fetching all data: ", error.message);
        res.status(500).json({ message: "Failed to fetch all data" }); 
    }
}

// Fetch seed data and initialize database
export const initTransactions = async (req, res) => {
  try {
    // Fetch data
    const response = await fetch(THIRD_PARTY_API);
    const transactions = await response.json();

    // Clear existing data and insert new
    await TransactionModel.deleteMany({});
    await TransactionModel.insertMany(transactions);

    res
      .status(200)
      .json({
        message: "Database Initialized Successfully",
        count: transactions.length,
      });
  } catch (error) {
    console.error("Error initializing datase: ", error.message);
    res.status(500).json({ message: "Failed to Initialize Database" });
  }
};

// List Transactions using month of the year and pagination
export const listTransactions = async (req, res) => {
  try {
    const { month, search = "", page = 1, perPage = 10 } = req.query;

    // Validate month input
    if (!month) {
      return res.status(400).json({ message: "Month parameter is required" });
    }

    // Convert month to number
    const monthIndex = new Date(`${month} 1, 2000`).getMonth();

    // Build search query
    const searchRegex = new RegExp(search, "i");

    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthIndex + 1],
      },
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { price: isNaN(search) ? undefined : Number(search) },
      ].filter(Boolean),
    };

    // Pagination values
    const limit = parseInt(perPage);
    const skip = (parseInt(page) - 1) * limit;

    // Fetch Transactions
    const transactions = await TransactionModel.find(query)
      .skip(skip)
      .limit(limit);

    // Count total for pagination
    const total = await TransactionModel.countDocuments(query);

    // Respond with Transactions
    res.status(200).json({
      data: transactions,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
    });
  } catch (error) {
    console.error("Error Fetching transactions: ", error.message);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

// Fetch Statistics for selected month
export const getStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        // Validate month input 
        if (!month) {
            return res.status(400).json({ message: "Month parameter is required" });
        }

        // Convert month to number
        const monthIndex = new Date(`${month} 1, 2000`).getMonth();

        // Fetch transactions for selected month
        const transactions = await TransactionModel.find({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, monthIndex + 1],
            },
        });

        // Calculate statistics
        let totalSaleAmount = 0;
        let soldItems = 0;
        let notSoldItems = 0;

        transactions.forEach((transaction) => {
            if (transaction.sold) {
                soldItems += 1;
                totalSaleAmount += Number(transaction.price);
            } else {
                notSoldItems += 1;
            }
        });

        // Respond with statistics
        res.status(200).json({
            month,
            totalSaleAmount,
            soldItems,
            notSoldItems
        });
    } catch (error) {
        console.error("Error fetching statistics: ", error.message);
        res.status(500).json({ message: "Failed to fetch statistics" }); 
    }
};

// Fetch Bar Chart data for selected month
export const getBarChartData = async (req, res) => {
    try {
        const { month } = req.query;

        // Validate month 
        if (!month) {
            return res.status(400).json({ message: "Month parameter is required" });
        }

        // Convert month to number
        const monthIndex = new Date(`${month} 1, 2000`).getMonth();

        // Fetch transactions for the selected month
        const transactions = await TransactionModel.find({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, monthIndex + 1]
            }
        });

        // Define price ranges
        const priceRanges = [
            { range: "0-100", min: 0, max: 100, count: 0 },
            { range: "101-200", min: 101, max: 200, count: 0 },
            { range: "201-300", min: 201, max: 300, count: 0 },
            { range: "301-400", min: 301, max: 400, count: 0 },
            { range: "401-500", min: 401, max: 500, count: 0 },
            { range: "501-600", min: 501, max: 600, count: 0 },
            { range: "601-700", min: 601, max: 700, count: 0 },
            { range: "701-800", min: 701, max: 800, count: 0 },
            { range: "801-900", min: 801, max: 900, count: 0 },
            { range: "901-above", min: 901, max: Infinity, count: 0 },
        ];

        // Categorize transactions into price ranges
        transactions.forEach((transaction) => {
            const price = transaction.price;

            for (let range of priceRanges) {
                if (price >= range.min && price <= range.max) {
                    range.count += 1;
                    break;
                }
            }
        });

        // Format data for response
        const barChartData = priceRanges.map(({ range, count }) => ({
            priceRange: range,
            itemCount: count
        }));

        // Respond with Bar Chart Data
        res.status(200).json({ month, barChartData });
    } catch (error) {
        console.error("Error generating bar chart data: ", error.message); 
        res.status(500).json({ message: "Failed to generate bar chart data" })
    }
};


// Fetch Categorical Pie Chart data for selected month
export const getPieChartData = async (req, res) => {
    try {
        const { month } = req.query;

        // Validate month
        if (!month) {
            return res.status(400).json({ message: "Month parameter is required" });
        }

        // Convert month to number
        const monthIndex = new Date(`${month} 1, 2000`).getMonth();

        // Fetch transactions for the selected month
        const transactions = await TransactionModel.find({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, monthIndex + 1]
            }
        });

        // Count items per category
        const categoryCounts = {};

        transactions.forEach((transaction) => {
            const category = transaction.category || "uncategorized";
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        // Format data for pie chart
        const pieChartData = Object.entries(categoryCounts).map(([category, count]) => ({
            category,
            itemCount: count
        }));

        // Respond with Pie Chart Data
        res.status(200).json({ month, pieChartData });
    } catch (error) {
        console.error("Error generating pie chart data: ", error.message);
        res.status(500).json({ message: "Failed to generate pie chart data" });
    }
};

// Fetch Combined data of all APIs
export const getCombinedData = async (req, res) => {
    try {
        const { month, search = "" } = req.query;

        // Validate month
        if (!month) {
            return res.status(400).json({ message: "Month parameter is required" });
        }

        // API URLs 
        const transactionsAPI = `http://localhost:${PORT}/api/transactions?month=${month}&search=${search}`;
        const statisticsAPI = `http://localhost:${PORT}/api/statistics?month=${month}`;
        const barChartAPI = `http://localhost:${PORT}/api/bar-chart?month=${month}`;
        const pieChartData = `http://localhost:${PORT}/api/pie-chart?month=${month}`;

        // Fetch all data in parallel
        const [transactionsResponse, statsResponse, barChartResponse, pieChartResponse] = await Promise.all([
            fetch(transactionsAPI),
            fetch(statisticsAPI),
            fetch(barChartAPI),
            fetch(pieChartData)
        ]);

        // Combine all responses
        const combinedData = {
            transactions: await transactionsResponse.json(),
            statistics: await statsResponse.json(),
            barChart: await barChartResponse.json(),
            pieChart: await pieChartResponse.json()
        };

        // Respond with combined data
        res.status(200).json(combinedData);
    } catch (error) {
        console.error("Error fetching combined data: ", error.message);
        res.status(500).json({ message: "Failed to fetch combined data" });
    }
};