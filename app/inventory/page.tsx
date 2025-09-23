"use client";

import CategoryList from "@/components/custom/CategoryList";

export default function Inventory() {
  return (
    <>
      {/* TITLE AREA */}
      <div className="flex items-center flex-col py-10">
        <h1>CacaoTrack</h1>
        <p>Your one stop shop for inventory management!</p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h2>Your Inventory</h2>

        {/* CATEGORY LIST */}
        <CategoryList />
      </div>
      <div className="flex items-center flex-col p-10">
        <button className="px-2 border rounded-lg hover:bg-white/20">
          Add New Category
        </button>
      </div>
    </>
  );
}
