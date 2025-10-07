import { NextResponse } from "next/server";

let categories: string[] = ["No category"];

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
    const category = await req.json();

    categories.push(category);

    return NextResponse.json({
      message: `${category} added successfully`,
      categories,
    });
  } catch (error) {
    console.error("Error adding a category: ", error);
    return NextResponse.json(
      { error: "Failed to add a category." },
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
