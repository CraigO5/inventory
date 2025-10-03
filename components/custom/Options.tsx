import { useState, useEffect } from "react";
import { InventoryItem } from "@/app/types/inventory";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getCounts } from "@/app/salesStore"; // your global tracker

type Row = {
  Products: string;
  Price?: string;
  "Start balance"?: number;
  "Items Received"?: number;
  "Total Balance"?: number;
  "Items sold"?: number;
};

export default function Options() {
  const [dayStarted, setDayStarted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  // Fetch inventory
  const fetchInventory = async (): Promise<InventoryItem[]> => {
    const res = await fetch("/api/manageInventory");
    const data = await res.json();
    setInventory(data.inventory);
    return data.inventory;
  };

  // Start day
  const startDay = async () => {
    await fetchInventory(); // ensure inventory is loaded
    setDayStarted(true);
  };

  // End day: export Excel
  const endDay = async () => {
    const confirmed = confirm("You are about to end the day. Confirm?");
    if (!confirmed) return;
    setDayStarted(false);
    await exportToExcel();
  };

  // Export Excel using global counts
  const exportToExcel = async () => {
    setIsDownloading(true);
    const items = await fetchInventory();
    const counts = getCounts(); // get sold/received data

    const grouped: Record<string, InventoryItem[]> = {};
    items.forEach((item) => {
      const category = item.category || "Uncategorized";
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(item);
    });

    const rows: any = [];
    Object.entries(grouped).forEach(([category, items]) => {
      rows.push({ Products: category });

      items.forEach((item) => {
        const end = item.quantity;
        const sold = counts[item.id]?.sold ?? 0;
        const received = counts[item.id]?.received ?? 0;
        const start = item.quantity + sold - received; // starting balance

        rows.push({
          Products: item.name,
          Price: (item.priceCents / 100).toFixed(2),
          "Start balance": start,
          "Items Received": received,
          "Total Balance": start + received,
          "Items sold": sold,
          "End Balance": end,
        });
      });

      rows.push({
        Products: "",
        Price: "",
        "Start balance": "",
        "Items Received": "",
        "Total Balance": "",
        "Items sold": "",
        "End Balance": "",
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(rows, {
      header: [
        "Products",
        "Price",
        "Start balance",
        "Items Received",
        "Total Balance",
        "Items sold",
        "End Balance",
      ],
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "inventory.xlsx");
    setIsDownloading(false);
  };

  // CSV export fallback
  const downloadCSV = async () => {
    setIsDownloading(true);
    const res = await fetch("/api/manageInventory");
    const data = await res.json();
    const header = "id,name,priceCents,quantity,category";
    const csv = [
      header,
      ...data.inventory.map(
        (item: InventoryItem) =>
          `${item.id},${item.name},${item.priceCents},${item.quantity},${
            item.category ?? ""
          }`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "inventory.csv";
    link.click();
    setIsDownloading(false);
  };

  // Warn user if day is active
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dayStarted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dayStarted]);

  return (
    <div className="flex flex-col items-center gap-5">
      <h2>Options</h2>

      <div className="gap-4 flex flex-col items-center">
        {!dayStarted ? (
          <button
            className="bg-white text-black p-4 rounded-lg font-bold hover:bg-neutral-400 text-2xl transition-colors"
            onClick={startDay}
          >
            Start my day
          </button>
        ) : (
          <button
            className="bg-yellow-500 text-black p-4 rounded-lg font-bold text-2xl hover:bg-yellow-700 transition-colors"
            onClick={endDay}
          >
            End my day
          </button>
        )}
      </div>

      <div className="gap-2 flex mt-4">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 border rounded-lg hover:bg-white/20 transition-colors"
        >
          {isDownloading ? "Downloading..." : "Export to Excel"}
        </button>
        {!isDownloading && (
          <button
            onClick={downloadCSV}
            className="px-2 border rounded-lg hover:bg-white/20 transition-colors"
          >
            Save to CSV
          </button>
        )}
        {isDownloading && (
          <span className="px-2 border rounded-lg hover:bg-white/20 transition-colors">
            Downloading...
          </span>
        )}
      </div>
    </div>
  );
}
