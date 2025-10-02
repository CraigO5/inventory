import { NextResponse } from "next/server";
import { InventoryItem } from "@/app/types/inventory";
import { v4 as uuidv4 } from "uuid";

let inventoryItems: InventoryItem[] = [
  // MAIN
  {
    id: "1",
    name: "Banana 100g",
    priceCents: 25000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "2",
    name: "Calamansi 100g",
    priceCents: 25000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "3",
    name: "Chili 100g",
    priceCents: 25000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "4",
    name: "Coconut 100g",
    priceCents: 25000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "5",
    name: "Coffee 100g",
    priceCents: 25000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "6",
    name: "Durian filled 100g",
    priceCents: 28000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "7",
    name: "Nibs Sweetened 100g",
    priceCents: 25000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "8",
    name: "Peanut Butter100g",
    priceCents: 25000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "9",
    name: "White Chocolate 100g",
    priceCents: 25000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "10",
    name: "50% Milk100g",
    priceCents: 25000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "11",
    name: "65% 100g",
    priceCents: 25000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "12",
    name: "70% 100g",
    priceCents: 25000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "13",
    name: "85% 100g",
    priceCents: 28000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "14",
    name: "95% 100g",
    priceCents: 28000,
    quantity: 0,
    category: "MAIN",
  },
  {
    id: "15",
    name: "100% 100g",
    priceCents: 29000,
    quantity: 0,
    category: "MAIN",
  },

  // BAR
  {
    id: "16",
    name: "Banana 90g",
    priceCents: 16000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "17",
    name: "Calamansi 90g",
    priceCents: 15000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "18",
    name: "Chili 90g",
    priceCents: 15000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "19",
    name: "Coconut 90g",
    priceCents: 15000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "20",
    name: "Coffee 90g",
    priceCents: 15000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "21",
    name: "Durian filled 90g",
    priceCents: 16000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "22",
    name: "Pineapple 90g",
    priceCents: 16000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "23",
    name: "Chili 100g",
    priceCents: 15000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "24",
    name: "Coconut 90g",
    priceCents: 15000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "25",
    name: "Peanut Butter90g",
    priceCents: 16000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "26",
    name: "White Chocolate 90g",
    priceCents: 15000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "27",
    name: "50% Milk 90g",
    priceCents: 15000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "28",
    name: "65% 90g",
    priceCents: 15000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "29",
    name: "70% 90g",
    priceCents: 16000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "30",
    name: "100% 90g",
    priceCents: 16000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "31",
    name: "Garlic 90g",
    priceCents: 16000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "32",
    name: "Ginger 90g",
    priceCents: 16000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "33",
    name: "Cashew 90g",
    priceCents: 16000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "34",
    name: "Raisin 90g",
    priceCents: 16000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "35",
    name: "Almond 90g",
    priceCents: 16000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "36",
    name: "Mango 90g",
    priceCents: 16000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "37",
    name: "Matcha 90g",
    priceCents: 15000,
    quantity: 0,
    category: "BAR",
  },
  {
    id: "38",
    name: "Mint 90g",
    priceCents: 15000,
    quantity: 0,
    category: "BAR",
  },

  // POUCH & TABLE BOX
  {
    id: "39",
    name: "Premium 185g",
    priceCents: 25000,
    quantity: 0,
    category: "POUCH & TABLE BOX",
  },
  {
    id: "40",
    name: "Sweetened Premium 185g",
    priceCents: 26000,
    quantity: 0,
    category: "POUCH & TABLE BOX",
  },
  {
    id: "41",
    name: "Cacao Nibs 150g",
    priceCents: 22000,
    quantity: 0,
    category: "POUCH & TABLE BOX",
  },
  {
    id: "42",
    name: "Callets Unsweeted 140g",
    priceCents: 22000,
    quantity: 0,
    category: "POUCH & TABLE BOX",
  },
  {
    id: "43",
    name: "Coco Powder 150g",
    priceCents: 22500,
    quantity: 0,
    category: "POUCH & TABLE BOX",
  },
  {
    id: "44",
    name: "Coco Sugar 225g",
    priceCents: 16000,
    quantity: 0,
    category: "POUCH & TABLE BOX",
  },
  {
    id: "45",
    name: "Champorado 225g",
    priceCents: 18000,
    quantity: 0,
    category: "POUCH & TABLE BOX",
  },
  {
    id: "46",
    name: "Mocha 170g",
    priceCents: 21000,
    quantity: 0,
    category: "POUCH & TABLE BOX",
  },
  {
    id: "47",
    name: "QuackerOats 50g",
    priceCents: 18500,
    quantity: 0,
    category: "POUCH & TABLE BOX",
  },

  // SMALL PACK
  {
    id: "48",
    name: "Cocoa Powder 90g",
    priceCents: 15000,
    quantity: 0,
    category: "SMALL PACK",
  },
  {
    id: "49",
    name: "Sweeened Callets 90g",
    priceCents: 15000,
    quantity: 0,
    category: "SMALL PACK",
  },
  {
    id: "50",
    name: "Unsweetened Callets 90g",
    priceCents: 15000,
    quantity: 0,
    category: "SMALL PACK",
  },

  // PLASTIC JAR
  {
    id: "51",
    name: "Cacao Nibs 200g",
    priceCents: 24000,
    quantity: 0,
    category: "PLASTIC JAR",
  },
  {
    id: "52",
    name: "Cacao Nibs 280g",
    priceCents: 32500,
    quantity: 0,
    category: "PLASTIC JAR",
  },
  {
    id: "53",
    name: "Cocoa Powder 180g",
    priceCents: 29000,
    quantity: 0,
    category: "PLASTIC JAR",
  },
  {
    id: "54",
    name: "Cocoa Powder 230g",
    priceCents: 37000,
    quantity: 0,
    category: "PLASTIC JAR",
  },
  {
    id: "55",
    name: "Nibs Sweetened 180g",
    priceCents: 33500,
    quantity: 0,
    category: "PLASTIC JAR",
  },
  {
    id: "56",
    name: "Nibs Sweetened 350g",
    priceCents: 47000,
    quantity: 0,
    category: "PLASTIC JAR",
  },
  {
    id: "57",
    name: "Sweetened Callets 350g",
    priceCents: 50000,
    quantity: 0,
    category: "PLASTIC JAR",
  },
  {
    id: "58",
    name: "Unsweetened Callets 360g",
    priceCents: 37500,
    quantity: 0,
    category: "PLASTIC JAR",
  },
  {
    id: "59",
    name: "Unsweetened Callets 200g",
    priceCents: 0,
    quantity: 0,
    category: "PLASTIC JAR",
  }, // no price given
  {
    id: "60",
    name: "Coco Sugar 180g",
    priceCents: 23000,
    quantity: 0,
    category: "PLASTIC JAR",
  },
  {
    id: "61",
    name: "Mocha 350g",
    priceCents: 39000,
    quantity: 0,
    category: "PLASTIC JAR",
  },
  {
    id: "62",
    name: "Quaker Oats 300g",
    priceCents: 27000,
    quantity: 0,
    category: "PLASTIC JAR",
  },

  // DRINKS
  {
    id: "63",
    name: "ChocoMilk",
    priceCents: 12000,
    quantity: 0,
    category: "DRINKS",
  },
  {
    id: "64",
    name: "Hot Choco",
    priceCents: 12000,
    quantity: 0,
    category: "DRINKS",
  },
  {
    id: "65",
    name: "Moka",
    priceCents: 12000,
    quantity: 0,
    category: "DRINKS",
  },

  // OTHERS
  {
    id: "66",
    name: "Cocoa Butter 15g",
    priceCents: 10000,
    quantity: 0,
    category: "OTHERS",
  },
  {
    id: "67",
    name: "Cacao Bag",
    priceCents: 5000,
    quantity: 0,
    category: "OTHERS",
  },
  {
    id: "68",
    name: "Tablea Rounds 500g",
    priceCents: 75000,
    quantity: 0,
    category: "OTHERS",
  },
  {
    id: "69",
    name: "Tablea Sweetened 500g",
    priceCents: 75000,
    quantity: 0,
    category: "OTHERS",
  },
  {
    id: "70",
    name: "Callets Sweetened 500g",
    priceCents: 75000,
    quantity: 0,
    category: "OTHERS",
  },
  {
    id: "71",
    name: "Cocoa Powder 500g",
    priceCents: 75000,
    quantity: 0,
    category: "OTHERS",
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
