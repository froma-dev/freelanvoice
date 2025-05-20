import { Trash2 } from "lucide-react";
import { Button } from "./Button";

export interface Item {
  description: string;
  price: number;
  quantity: number;
}

export const ItemRow = ({
  item,
  rowIndex,
  onDescriptionChange,
  onPriceChange,
  onQuantityChange,
  onRemoveItem,
  onAddItem,
  onAddItemOnEnter,
  totalRows,
}) => {
  const getTabIndex = (rowIndex: number, rowCell: number) => {
    return rowIndex * totalRows + rowCell;
  };

  const calculateItemSubtotal = (item: Item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  return (
    <tr key={rowIndex} className="border-t border-gray-200 text-lg">
      <td>
        <input
          tabIndex={getTabIndex(rowIndex, 1)}
          type="text"
          className="w-full p-2 border border-gray-300 rounded text-right"
          value={item.description}
          onChange={(e) => onDescriptionChange(e, rowIndex)}
        ></input>
      </td>
      <td>
        <input
          tabIndex={getTabIndex(rowIndex, 2)}
          type="number"
          min={0}
          className="w-full p-2 border border-gray-300 rounded text-right"
          value={item.price}
          onChange={(e) => onPriceChange(e, rowIndex)}
        ></input>
      </td>
      <td>
        <input
          tabIndex={getTabIndex(rowIndex, 3)}
          type="number"
          min={1}
          className="w-full p-2 border border-gray-300 rounded text-right"
          value={item.quantity}
          onChange={(e) => onQuantityChange(e, rowIndex)}
          onKeyDown={(e) => {
            onAddItemOnEnter(e, rowIndex);
          }}
        ></input>
      </td>
      <td className="text-right p-2">{calculateItemSubtotal(item)}</td>
      <td>
        <Button
          className="p-2 bg-red-500 text-white"
          onClick={(e) => onRemoveItem(e, rowIndex)}
        >
          <Trash2 />
        </Button>
      </td>
    </tr>
  );
};
