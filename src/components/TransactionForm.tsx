import { useState } from "react";
import type { TransactionPayload } from "../models/TransactionPayloadModel";
import { createTransaction } from "../services/transactionService";

export default function TransactionForm() {
  const [formData, setFormData] = useState({
    user: "",
    transactionType: "",
    itemName: "",
    price: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload: TransactionPayload = {
      ...formData,
      price: Number(formData.price),
    };

    console.log("Submitted:", payload);

    try {
      await createTransaction({
        ...formData,
        price: Number(formData.price),
      });

      setFormData({
        user: "",
        transactionType: "",
        itemName: "",
        price: 0,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    // reset (optional)
    setFormData({
      user: "",
      transactionType: "",
      itemName: "",
      price: 0,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 space-y-5 rounded-xl bg-slate-900 p-6 text-white shadow-lg"
    >
      <h2 className="text-xl font-semibold text-cyan-400">
        New Transaction
      </h2>

      {/* User */}
      <div>
        <label className="block text-sm text-slate-300 mb-1">
          User
        </label>
        <input
          type="text"
          name="user"
          value={formData.user}
          onChange={handleChange}
          placeholder="Enter user name"
          className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      {/* Transaction Type */}
      <div>
        <label className="block text-sm text-slate-300 mb-1">
          Transaction Type
        </label>
        <select
          name="transactionType"
          value={formData.transactionType}
          onChange={handleChange}
          className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        >
          <option value="" disabled>
            Select type
          </option>
          <option value="purchase">Purchase</option>
          <option value="refund">Refund</option>
          <option value="transfer">Transfer</option>
        </select>
      </div>

      {/* Item Name */}
      <div>
        <label className="block text-sm text-slate-300 mb-1">
          Item Name
        </label>
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          placeholder="Enter item name"
          className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm text-slate-300 mb-1">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          min="0"
          step="1"
          className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-cyan-500 py-2 font-medium text-white-900 hover:bg-cyan-400 transition"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
