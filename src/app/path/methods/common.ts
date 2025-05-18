export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return `rgb(${r}, ${g}, ${b})`;
};

export const gridNodePosition = (index: number, rowLength = 3) => {
  const gapX = 150;
  const gapY = 100;
  const x = (index % rowLength) * gapX + 50;
  const y = Math.floor(index / rowLength) * gapY + 50;
  return { x, y };
};

