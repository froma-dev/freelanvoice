export const ItemListHead = ({ items }: { items: string[] }) => {
  return (
    <thead>
      <tr className="bg-gray-100 text-black">
        {items.map((item) => (
          <th className="border p-2 text-xl">{item}</th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
};
