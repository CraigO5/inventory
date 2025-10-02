import { NextResponse } from "next/server";
import { InventoryItem } from "@/app/types/inventory";

let categories: string[] = [
  "No category",
  "MAIN",
  "BAR",
  "POUCH & TABLE BOX",
  "SMALL PACK",
  "PLASTIC JAR",
  "DRINKS",
  "OTHERS",
];

export async function GET() {
  try {
    return NextResponse.json({
      message: "Got category list successfully",
      categories,
    });
  } catch (error) {
    console.error("Error getting category list: ", error);
    return NextResponse.json(
      { error: "Failed to get category list." },
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

export async function DELETE(req: Request) {
  try {
    const targetCategory = await req.json();

    categories = categories.filter((category) => category !== targetCategory);

    return NextResponse.json({
      message: `${targetCategory} removed successfully`,
      categories,
    });
  } catch (error) {
    console.error("Error deleting a category: ", error);
    return NextResponse.json(
      { error: "Failed to delete a category." },
      { status: 500 }
    );
  }
}
