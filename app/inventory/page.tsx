import Image from "next/image";
import { z } from "zod";
type InventoryItem = {
  id: string;
  name: string;
  priceDollars: number;
  priceCents?: number;
  imageUrl?: string;
  quantity: number;
  unit: string;
};
const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Example Item",
    priceDollars: 1,
    priceCents: 1,
    imageUrl: "/cacao.jpeg",
    quantity: 10,
    unit: "pounds",
  },
];

export default function Inventory() {
  return (
    <>
      <h1>CacaoTrack</h1>
      <p>Your one stop shop for inventory management!</p>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h2>Your Inventory</h2>
        <div className="grid grid-cols-3 gap-4">
          {inventoryItems.map((item) => {
            return (
              <div
                className="border border-white/25 p-4 rounded space-y-2"
                key={item.id}
              >
                <div className="w-50 h-50 relative">
                  <Image
                    src={item.imageUrl || "/cacao.jpeg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  ></Image>
                </div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <div className="flex gap-2">
                  <button className="border p-1">-</button>
                  <p>
                    {item.quantity} {item.unit}
                  </p>
                  <button className="border p-1">+</button>
                </div>
                <div className="gap-2 flex">
                  <button className="border p-1">Add Items</button>
                  <button className="border p-1">Remove Items</button>
                </div>
                <button className="text-red-500">Delete Listing</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
