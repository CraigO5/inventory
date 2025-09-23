import { useState } from "react";
import { InventoryItem } from "@/app/types/inventory";

type InputFormProps = {
  onClose: () => void;
  onItemAdded: () => void;
};

const categories: string[] = ["No category", "MAIN", "BAR"];

export default function InputForm({ onClose, onItemAdded }: InputFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [categoryInput, setCategoryInput] = useState("");

  const addNewItem = async () => {
    const priceString = price.replace(/\$/g, "").replace(/\./g, "");
    const priceCents = parseInt(priceString);

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

    if (!res.ok) {
      console.error("Failed to add new item!");
      return false;
    }

    const data = res.json();
    console.log(data);

    onItemAdded();

    return true;
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
              value={price}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9.]/g, "");
                setPrice(raw);
              }}
              onBlur={() => {
                if (price) {
                  const numericValue = parseFloat(price);
                  if (!isNaN(numericValue)) {
                    setPrice(
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
              type="number"
              placeholder="Quantity"
              min={0}
              step={1}
              value={quantity}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[1-9]\d*$/.test(val) || val === "") {
                  setQuantity(parseInt(val));
                }
              }}
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
              onClick={async () => {
                const success = await addNewItem();
                if (success) {
                  onClose();
                } else {
                  console.error("Failed to add item!");
                }
              }}
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
