import { NextResponse } from "next/server";
import { InventoryItem } from "@/app/types/inventory";
import { v4 as uuidv4 } from "uuid";

let inventoryItems: InventoryItem[] = [];

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

export async function PUT(req: Request) {
  try {
    const { id, ...updateFields } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing item id" }, { status: 400 });
    }

    const itemIndex = inventoryItems.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    inventoryItems[itemIndex] = {
      ...inventoryItems[itemIndex],
      ...updateFields,
    };

    return NextResponse.json({
      message: `${inventoryItems[itemIndex].name} updated successfully with id ${id}`,
      item: inventoryItems[itemIndex],
    });
  } catch (error) {
    console.error("Error updating an item: ", error);
    return NextResponse.json(
      { error: "Failed to update an item." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const data = await req.json();

    inventoryItems = inventoryItems.filter((item) => item.id !== data.id);

    return NextResponse.json({
      message: `${data.name} removed successfully with id ${data.id}`,
      inventory: inventoryItems,
    });
  } catch (error) {
    console.error("Error deleting an item: ", error);
    return NextResponse.json(
      { error: "Failed to delete an item." },
      { status: 500 }
    );
  }
}
