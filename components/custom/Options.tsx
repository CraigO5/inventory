import { useState, useEffect } from "react";
import { InventoryItem } from "@/app/types/inventory";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Options() {
  const [dayStarted, setDayStarted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [startBalances, setStartBalances] = useState<Record<number, number>>(
    {}
  );
  const [itemsSold, setItemsSold] = useState<Record<number, number>>({});
  const [itemsReceived, setItemsReceived] = useState<Record<number, number>>(
    {}
  );

  const fetchInventory = async (): Promise<InventoryItem[]> => {
    const res = await fetch("/api/manageInventory");
    const data = await res.json();
    setInventory(data.inventory);
    return data.inventory;
  };

  const startDay = async () => {
    const items = await fetchInventory();
    const balances: Record<number, number> = {};
    const sold: Record<number, number> = {};
    const received: Record<number, number> = {};
    items.forEach((item) => {
      balances[item.id] = item.quantity;
      sold[item.id] = 0;
      received[item.id] = 0;
    });
    setStartBalances(balances);
    setItemsSold(sold);
    setItemsReceived(received);
    setDayStarted(true);
  };

  const endDay = async () => {
    const confirmed = confirm("You are about to end the day. Confirm?");
    if (!confirmed) return;
    setDayStarted(false);
    await exportToExcel();
  };

  // Increment sold/restocked counts
  const sellItem = (id: number) => {
    setItemsSold((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };
  const restockItem = (id: number) => {
    setItemsReceived((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const exportToExcel = async () => {
    setIsDownloading(true);
    const items = await fetchInventory();

    const grouped: Record<string, InventoryItem[]> = {};
    items.forEach((item) => {
      const category = item.category || "Uncategorized";
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(item);
    });

    const rows: any[] = [];
    Object.entries(grouped).forEach(([category, items]) => {
      rows.push({ Products: category });

      items.forEach((item) => {
        const start = startBalances[item.id] ?? item.quantity;
        const sold = itemsSold[item.id] ?? 0;
        const received = itemsReceived[item.id] ?? 0;
        const end = start + received - sold;

        rows.push({
          Products: item.name,
          Price: (item.priceCents / 100).toFixed(2),
          "Start balance": start,
          "Items Received": received,
          "Total Balance": "",
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

    let rowIndex = 2;
    Object.entries(grouped).forEach(([category, items]) => {
      const cellAddress = `A${rowIndex}`;
      if (worksheet[cellAddress])
        worksheet[cellAddress].s = { font: { bold: true } };
      rowIndex += items.length + 2;
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
      {dayStarted && (
        <div className="w-full max-w-3xl mt-4">
          <h3 className="text-xl font-bold mb-2">Track Sales & Restocks</h3>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Product</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Start Balance</th>
                <th className="border p-2">Sold</th>
                <th className="border p-2">Received</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td className="border p-1">{item.name}</td>
                  <td className="border p-1">
                    {(item.priceCents / 100).toFixed(2)}
                  </td>
                  <td className="border p-1">
                    {startBalances[item.id] ?? item.quantity}
                  </td>
                  <td className="border p-1">{itemsSold[item.id] ?? 0}</td>
                  <td className="border p-1">{itemsReceived[item.id] ?? 0}</td>
                  <td className="border p-1 flex gap-2">
                    <button
                      className="px-2 bg-red-500 text-white rounded"
                      onClick={() => sellItem(item.id)}
                    >
                      Sell +1
                    </button>
                    <button
                      className="px-2 bg-green-500 text-white rounded"
                      onClick={() => restockItem(item.id)}
                    >
                      Restock +1
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
