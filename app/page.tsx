"use client";

import CategoryList from "@/components/custom/CategoryList";
import Options from "@/components/custom/Options";

export default function Inventory() {
  return (
    <>
      {/* TITLE AREA */}
      <div className="flex items-center flex-col py-10">
        <h1>The Backroom</h1>
        <p>Your one stop shop for inventory management!</p>
      </div>
      <div className="flex flex-col gap-10 justify-center items-center">
        <Options />
        <div>
          <h2 className="mb-5">Your Inventory</h2>

          {/* CATEGORY LIST */}
          <CategoryList />
        </div>
      </div>
      <div className="flex items-center flex-col p-10">
        <button className="px-2 border rounded-lg hover:bg-white/20">
          Add New Category
        </button>
      </div>
    </>
  );
}
