import Image from "next/image";
import { z } from "zod";
type InventoryItem = {
  id: string;
  name: string;
  priceCents: number;
  imageUrl?: string;
  quantity: number;
};
const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Banana 100g",
    priceCents: 25000,
    imageUrl: "/cacao.jpeg",
    quantity: 10,
  },
  {
    id: "2",
    name: "Example Item",
    priceCents: 1,
    imageUrl: "/cacao.jpeg",
    quantity: 10,
  },
];

export default function Inventory() {
  return (
    <>
      {/* TITLE AREA */}
      <h1>CacaoTrack</h1>
      <p>Your one stop shop for inventory management!</p>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h2>Your Inventory</h2>

        {/* INVENTORY LIST */}
        <div className="grid grid-cols-3 gap-4">
          {inventoryItems.map((item) => {
            return (
              <div
                className="border border-white/25 p-4 rounded space-y-2"
                key={item.id}
              >
                <div className="w-50 h-50 relative">
                  {/* Image of product */}
                  <Image
                    src={item.imageUrl || "/cacao.jpeg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  ></Image>
                </div>
                {/* Name of product */}
                <h3 className="font-bold text-lg">{item.name}</h3>
                {/* Price of product by quantity */}
                <p>${item.priceCents / 100}</p>
                {/* Add/remove item quantity by ONE */}
                <div className="flex gap-2">
                  <button className="border p-1">-</button>
                  <p>{item.quantity}</p>
                  <button className="border p-1">+</button>
                </div>
                {/* Add/remove items by BULK*/}
                <div className="gap-2 flex">
                  <button className="border p-1">Add Items</button>
                  <button className="border p-1">Remove Items</button>
                </div>
                {/* Delete entire listing */}
                <button className="text-red-500">Delete Listing</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
