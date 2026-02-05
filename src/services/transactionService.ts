import type { TransactionPayload } from "../models/TransactionPayloadModel";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

// transactionService.js
import axios from "axios";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export function createTransaction(transaction: TransactionPayload) {
  return api.post("/transactions", transaction).then(res => res.data);
}

