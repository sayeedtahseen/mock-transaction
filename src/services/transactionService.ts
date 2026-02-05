import type { TransactionPayload } from "../models/TransactionPayloadModel";

// transactionService.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export function createTransaction(transaction: TransactionPayload) {
  return api.post("/transactions", transaction).then(res => res.data);
}

