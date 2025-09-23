import Image from "next/image";
import { InventoryItem } from "@/app/types/inventory";

type InventoryCardProps = {
  item: InventoryItem;
};

export default function InventoryCard({ item }: InventoryCardProps) {
  return (
    <div
      className="border border-neutral-700 p-4 rounded-2xl space-y-2 bg-neutral-900 hover:scale-102 transition-transform"
      key={item.id}
    >
      <div className="w-50 h-50 relative">
        {/* Image of product */}
        <Image
          src={item.imageUrl || "/cacao.jpeg"}
          alt={item.name}
          fill
          className="object-cover rounded-xl"
        ></Image>
      </div>
      {/* Name of product */}
      <h3 className="font-bold text-lg">{item.name}</h3>
      {/* Price of product by quantity */}
      <p>${item.priceCents / 100}</p>
      {/* Add/remove item quantity by ONE */}
      <div className="flex gap-2">
        <button className="px-2 border rounded-full hover:bg-white/20">
          -
        </button>
        <p>{item.quantity}</p>
        <button className="px-2 border rounded-full hover:bg-white/20">
          +
        </button>
      </div>
      {/* Add/remove items by BULK*/}
      <div className="gap-2 flex">
        <button className="bg-white text-black p-2 rounded-lg font-bold hover:bg-neutral-400 transition-colors">
          Add Items
        </button>
        <button className="bg-white text-black p-2 rounded-lg font-bold hover:bg-neutral-400 transition-colors">
          Remove Items
        </button>
      </div>
      {/* Delete entire listing */}
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() =>
          confirm("WARNING: Deleting a listing is permanent! Proceed?")
        }
      >
        Delete Listing
      </button>
    </div>
  );
}
