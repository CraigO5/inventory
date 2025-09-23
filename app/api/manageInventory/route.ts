import { NextResponse } from "next/server";
import { InventoryItem } from "@/app/types/inventory";
import { v4 as uuidv4 } from "uuid";

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
    name: "Banana 100g",
    priceCents: 25000,
    imageUrl: "/cacao.jpeg",
    quantity: 10,
  },
  {
    id: "3",
    name: "Banana 100g",
    priceCents: 25000,
    imageUrl: "/cacao.jpeg",
    quantity: 10,
  },
  {
    id: "4",
    name: "Banana 100g",
    priceCents: 25000,
    imageUrl: "/cacao.jpeg",
    quantity: 10,
  },
  {
    id: "5",
    name: "Banana 100g",
    priceCents: 25000,
    imageUrl: "/cacao.jpeg",
    quantity: 10,
  },
  {
    id: "6",
    name: "Example Item",
    priceCents: 1,
    imageUrl: "/cacao.jpeg",
    quantity: 10,
    category: "main",
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      message: "Got inventory list successfully",
      inventory: inventoryItems,
    });
  } catch (error) {
    console.error("Error getting inventory list: ", error);
    return NextResponse.json(
      { error: "Failed to get inventory list." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { id, ...rest } = await req.json();
    const newId = uuidv4();

    const newItem: InventoryItem = {
      id: newId,
      ...rest,
    };

    console.log("ID: ", newId);
    console.log("Item: ", newItem);

    inventoryItems.push(newItem);

    return NextResponse.json({
      message: `${newItem.name} added successfully with id ${newItem.id}`,
      inventory: inventoryItems,
    });
  } catch (error) {
    console.error("Error adding an item: ", error);
    return NextResponse.json(
      { error: "Failed to add an item." },
      { status: 500 }
    );
  }
}
