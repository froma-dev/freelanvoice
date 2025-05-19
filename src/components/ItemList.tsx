import { Button } from "@components/Button";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface Item {
  description: string;
  price: number;
  quantity: number;
}

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
    if (rowIndex === 0) return resetItems();
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

  const handleAddItemOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    e.preventDefault();
    if (e.key === "Enter" && rowIndex === items.length - 1) {
      handleAddItem(e);
    }
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

  const calculateItemSubtotal = (item: Item) => {
    return (item.price * item.quantity).toFixed(2);
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

  const getTabIndex = (rowIndex: number) => {
    return rowIndex * items.length + (rowIndex + 1);
  };

  return (
    <>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="border">Descripción</th>
            <th className="border">Cantidad</th>
            <th className="border">Precio</th>
            <th className="border">Subtotal</th>
            <th className=""></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-t border-gray-200">
              <td>
                <input
                  tabIndex={getTabIndex(rowIndex)}
                  type="text"
                  className="w-full p-1 text-right"
                  value={item.description}
                  onChange={(e) => handleDescriptionChange(e, rowIndex)}
                ></input>
              </td>
              <td>
                <input
                  tabIndex={getTabIndex(rowIndex)}
                  type="number"
                  min={0}
                  className="w-full p-1 text-right"
                  value={item.price}
                  onChange={(e) => handlePriceChange(e, rowIndex)}
                ></input>
              </td>
              <td>
                <input
                  tabIndex={getTabIndex(rowIndex)}
                  type="number"
                  min={1}
                  className="w-full p-1 text-right"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, rowIndex)}
                  onKeyDown={(e) => {
                    handleAddItemOnEnter(e, rowIndex);
                  }}
                ></input>
              </td>
              <td className="text-right p-2">{calculateItemSubtotal(item)}</td>
              <td>
                <Button
                  className="p-2 bg-red-500 text-white"
                  onClick={(e) => handleRemoveItem(e, rowIndex)}
                >
                  <Trash2 />
                </Button>
              </td>
            </tr>
          ))}
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
