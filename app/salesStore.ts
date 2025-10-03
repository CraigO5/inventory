type Counts = { [id: string]: { sold: number; received: number } };

const counts: Counts = {};

export const getCounts = () => counts;

export const sellItem = (id: string, amount: number) => {
  if (!counts[id]) counts[id] = { sold: 0, received: 0 };
  counts[id].sold += amount;
  console.log(`Sold ${amount} items!`);
};

export const restockItem = (id: string, amount: number) => {
  if (!counts[id]) counts[id] = { sold: 0, received: 0 };
  counts[id].received += amount;
  console.log(`Restocked ${amount} items!`);
};
