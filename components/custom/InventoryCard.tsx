import Image from "next/image";
import { InventoryItem } from "@/app/types/inventory";
import { useState } from "react";

type InventoryCardProps = {
  item: InventoryItem;
  updateList: () => void;
};

export default function InventoryCard({
  item,
  updateList,
}: InventoryCardProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const deleteItem = async () => {
    const res = await fetch("/api/manageInventory", {
      method: "DELETE",
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      console.error(`Failed to delete ${item.name} at with id ${item.id}.`);
    }

    updateList();
  };

  const addItems = () => {
    const input = prompt("How many items do you want to add?:");

    if (input !== null) {
      const num = parseInt(input);

      if (!isNaN(num) && num > 0) {
        console.log(`Added ${num} items.`);

        let quantityDiff = quantity + num;

        if (quantityDiff < 0) {
          quantityDiff = 0;
        }

        setQuantity(quantityDiff);
        sendQuantity(quantityDiff);
      } else {
        alert("Invalid input! Please enter a positive integer.");
      }
    }
  };

  const removeItems = () => {
    const input = prompt("How many items do you want to remove?");

    if (input !== null) {
      const num = parseInt(input);

      if (!isNaN(num) && num > 0) {
        console.log(`Added ${num} items.`);

        let quantityDiff = quantity - num;

        if (quantityDiff < 0) {
          quantityDiff = 0;
        }

        setQuantity(quantityDiff);
        sendQuantity(quantityDiff);
      } else {
        alert("Invalid input! Please enter a positive integer.");
      }
    }
  };

  const sendQuantity = async (newQuantity: number) => {
    const res = await fetch("/api/manageInventory", {
      method: "PUT",
      body: JSON.stringify({ id: item.id, quantity: newQuantity }),
    });

    if (!res.ok) {
      console.error(
        `Failed to update quantity for ${item.name} at with id ${item.id}.`
      );
    }
  };

  return (
    <div
      className="border border-neutral-700 p-4 rounded-2xl space-y-2 bg-neutral-900 hover:scale-102 transition-transform"
      key={item.id}
    >
      <div className="w-50 h-50 relative">
        {/* Image of product */}
        <Image
          src={"/cacao.jpeg"}
          alt={item.name}
          fill
          className="object-cover rounded-xl pointer-events-none no-select"
        ></Image>
      </div>
      {/* Name of product */}
      <h3 className="font-bold text-lg">{item.name}</h3>
      {/* Price of product by quantity */}
      <p>${item.priceCents / 100}</p>
      {/* Add/remove item quantity by ONE */}
      <div className="flex gap-2">
        <button
          onClick={async () => {
            setQuantity((prev) => Math.max(0, prev - 1));
            sendQuantity(quantity - 1);
          }}
          className="px-2 border rounded-full hover:bg-white/20"
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          onClick={async () => {
            setQuantity((prev) => prev + 1);
            sendQuantity(quantity + 1);
          }}
          className="px-2 border rounded-full hover:bg-white/20"
        >
          +
        </button>
      </div>
      {/* Add/remove items by BULK*/}
      <div className="gap-2 flex">
        <button
          onClick={addItems}
          className="bg-white text-black p-2 rounded-lg font-bold hover:bg-neutral-400 transition-colors"
        >
          Add Items
        </button>
        <button
          onClick={removeItems}
          className="bg-white text-black p-2 rounded-lg font-bold hover:bg-neutral-400 transition-colors"
        >
          Remove Items
        </button>
      </div>
      {/* Delete entire listing */}
      <button
        className="text-red-500 hover:text-red-700"
        onClick={async () => {
          const confirmed = confirm(
            "WARNING: Deleting a listing is permanent! Proceed?"
          );
          if (confirmed) {
            deleteItem();
          }
        }}
      >
        Delete Listing
      </button>
    </div>
  );
}
