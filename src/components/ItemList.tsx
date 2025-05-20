import { Button } from "@components/Button";
import { useState } from "react";
import { TotalFooter } from "./TotalFooter";
import { ItemRow, type Item } from "./ItemRow";
import { ItemListHead } from "./ItemListHead";

export const ItemList = ({
  initialItemsList,
}: {
  initialItemsList?: Item[];
}) => {
  const [items, setItems] = useState<Item[]>(
    initialItemsList || [{ description: "", price: 0, quantity: 1 }]
  );
  const [resetHistory, setResetHistory] = useState<Item[] | null>(null);

  const addItem = () => {
    const newItem = { description: "", price: 0, quantity: 1 };
    const lastItem = items[items.length - 1];

    if (!lastItem.description) return;

    setItems([...items, newItem]);
  };

  const resetItems = () => {
    setItems(initialItemsList || [{ description: "", price: 0, quantity: 1 }]);
  };

  const removeItem = (rowIndex: number) => {
    setItems(items.filter((_, i) => i !== rowIndex));
  };

  const handleAddItem = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addItem();
  };

  const handleAddItemOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    e.preventDefault();
    if (e.key === "Enter" && rowIndex === items.length - 1) {
      handleAddItem(e);
    }
  };

  const handleResetItems = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (resetHistory) {
      setItems([...resetHistory]);
      setResetHistory(null);
      return;
    }
    setResetHistory([...items]);
    resetItems();
  };

  const handleRemoveItem = (e: React.SyntheticEvent, rowIndex: number) => {
    e.preventDefault();
    if (rowIndex === 0 && items.length === 1) return resetItems();
    removeItem(rowIndex);
  };

  const handleQuantityChange = (
    e: React.SyntheticEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    e.preventDefault();
    const newItems = [...items];
    newItems[rowIndex].quantity = Number(e.currentTarget.value);
    setItems(newItems);
  };

  const handlePriceChange = (
    e: React.SyntheticEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    e.preventDefault();
    const newItems = [...items];
    newItems[rowIndex].price = Number(e.currentTarget.value);
    setItems(newItems);
  };

  const calculateTotal = (items: Item[]) => {
    return items
      .reduce((sum, item) => sum + item.quantity * item.price, 0)
      .toFixed(2);
  };

  const handleDescriptionChange = (
    e: React.SyntheticEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    e.preventDefault();
    const newItems = [...items];
    newItems[rowIndex].description = e.currentTarget.value;
    setItems(newItems);
  };

  return (
    <>
      <table className="w-full border-collapse text-sm border">
        <ItemListHead
          items={["Descripción", "Cantidad", "Precio", "Subtotal"]}
        ></ItemListHead>
        <tbody>
          {items.map((item, rowIndex) => (
            <ItemRow
              key={rowIndex}
              item={item}
              rowIndex={rowIndex}
              onDescriptionChange={handleDescriptionChange}
              onPriceChange={handlePriceChange}
              onQuantityChange={handleQuantityChange}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              onAddItemOnEnter={handleAddItemOnEnter}
              totalRows={items.length}
            />
          ))}
          <TotalFooter total={calculateTotal(items)} />
        </tbody>
      </table>
      <Button className="p-2 bg-blue-500 text-white" onClick={handleAddItem}>
        + Añadir Item
      </Button>
      <Button className="p-2 bg-blue-500 text-white" onClick={handleResetItems}>
        {resetHistory ? "Undo Reset" : "Reset"}
      </Button>
    </>
  );
};
