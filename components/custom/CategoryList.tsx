import InventoryCard from "./InventoryCard";
import Image from "next/image";
import InputForm from "./InputForm";
import { InventoryItem } from "@/app/types/inventory";
import { useEffect, useState } from "react";

export default function CategoryList() {
  const [inputFormIsVisible, setInputFormIsVisible] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const getItems = async () => {
    const res = await fetch("/api/manageInventory");
    const data = await res.json();

    setInventoryItems(data.inventory);
    localStorage.setItem("inventory", JSON.stringify(data.inventory));

    const saved = localStorage.getItem("inventory");
    if (saved) {
      setInventoryItems(JSON.parse(saved));
    }
  };

  const getCategories = async () => {
    const res = await fetch("/api/manageCategories");
    const data = await res.json();

    setCategories(data.categories);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getCategories();
      await getItems();

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p>Loading...</p>
        <Image
          src={"/loading.gif"}
          alt="Loading Icon"
          width={100}
          height={100}
        />
      </div>
    );
  }

  return categories.map((category) => {
    const categoryItems = inventoryItems.filter(
      (item) =>
        (!item.category && category === "No category") ||
        item.category?.toLowerCase() === category.toLowerCase()
    );

    // CATEGORY HEADER
    return (
      <div key={category} className="mb-5">
        {/* ITEM INPUT FORM */}
        {inputFormIsVisible && (
          <InputForm
            onClose={() => setInputFormIsVisible(false)}
            updateList={getItems}
          />
        )}

        <div className="flex justify-between mb-2 gap-2">
          <p className="font-bold">{category}</p>
          <div className="gap-2 flex">
            <button
              onClick={() => setInputFormIsVisible(true)}
              className="px-2 border rounded-lg hover:bg-white/20 transition-colors"
            >
              Add New Item
            </button>
          </div>
        </div>
        <hr className="mb-5" />

        {/* INVENTORY LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryItems.map((item) => {
            return (
              <InventoryCard key={item.id} item={item} updateList={getItems} />
            );
          })}
          <button
            onClick={() => setInputFormIsVisible(true)}
            className="border border-neutral-700 rounded-2xl bg-neutral-900/40 hover:bg-neutral-900 hover:scale-102 transition-transform flex flex-col justify-center items-center  p-10"
          >
            <span className="text-5xl">+</span>
            <span className="text-2xl">Add New Item</span>
          </button>
        </div>
      </div>
    );
  });
}
