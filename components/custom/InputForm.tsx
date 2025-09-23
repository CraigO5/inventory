import { useState } from "react";
import { InventoryItem } from "@/app/types/inventory";

type InputFormProps = {
  onClose: () => void;
};

const categories: string[] = ["No category", "MAIN", "BAR"];

export default function InputForm({ onClose }: InputFormProps) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  const addNewItem = async () => {
    const item: InventoryItem = {
      id: "",
      name,
      priceCents,
      quantity,
      category: categoryInput,
    };

    const res = await fetch("/api/manageInventory", {
      method: "POST",
      body: JSON.stringify(item),
    });

    const data = res.json();
    console.log(data);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-900 border border-neutral-700 p-10"
      >
        <div className="flex flex-col space-y-10 items-center">
          <p>Input Form</p>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="$0.00"
              value={cost}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9.]/g, "");
                setCost(raw);
              }}
              onBlur={() => {
                if (cost) {
                  const numericValue = parseFloat(cost);
                  if (!isNaN(numericValue)) {
                    setCost(
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(numericValue)
                    );
                  }
                }
              }}
            />
            <input
              type="text"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <label>Category:</label>
            <select
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="border border-neutral-700 p-1 rounded-lg bg-neutral-900 text-white"
            >
              {categories.map((category, i) => {
                return (
                  <option value={category} key={i} className="text-white">
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="gap-2 flex">
            <button
              onClick={onClose}
              className="bg-white text-black p-2 rounded-lg font-bold hover:bg-neutral-400 transition-colors"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="bg-white text-black p-2 rounded-lg font-bold hover:bg-neutral-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
