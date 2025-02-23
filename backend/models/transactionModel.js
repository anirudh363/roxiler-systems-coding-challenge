/**
 * Database Collection Model
 * Defining the Schema for the Transactions collection
 */

// Import packages
import mongoose from "mongoose";

// Define Collection Schema
const transactionSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    sold: {
        type: Boolean
    },
    dateOfSale: {
        type: Date
    }
}, { timestamps: true });

// Create Model for collection
export const TransactionModel = mongoose.model("transactions", transactionSchema);