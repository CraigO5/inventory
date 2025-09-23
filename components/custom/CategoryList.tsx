import InventoryCard from "./InventoryCard";
import InputForm from "./InputForm";
import { InventoryItem } from "@/app/types/inventory";
import { useEffect, useState } from "react";

const categories: string[] = ["No category", "MAIN", "BAR"];

export default function CategoryList() {
  const [inputFormIsVisible, setInputFormIsVisible] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  const getItems = async () => {
    const res = await fetch("/api/manageInventory");
    const data = await res.json();

    setInventoryItems(data.inventory);
  };

  useEffect(() => {
    getItems();
  }, []);

  return categories.map((category) => {
    const categoryItems = inventoryItems.filter(
      (item) =>
        (!item.category && category === "No category") ||
        item.category?.toLowerCase() === category.toLowerCase()
    );

    // CATEGORY HEADER
    return (
      <div key={category}>
        {/* ITEM INPUT FORM */}
        {inputFormIsVisible && (
          <InputForm
            onClose={() => setInputFormIsVisible(false)}
            onItemAdded={getItems}
          />
        )}

        <div className="flex justify-between mb-2 gap-2">
          <p className="font-bold">{category}</p>
          <div className="gap-2 flex">
            <button
              onClick={() => setInputFormIsVisible(true)}
              className="px-2 border rounded-lg hover:bg-white/20"
            >
              Add New Item
            </button>
          </div>
        </div>
        <hr className="mb-5" />

        {/* INVENTORY LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryItems.map((item) => {
            return <InventoryCard item={item} key={item.id} />;
          })}
        </div>
      </div>
    );
  });
}
