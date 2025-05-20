import { InvoiceHeader } from "./InvoiceHeader";
import { ItemList } from "./ItemList";

export const InvoiceForm = () => {
  return (
    <form>
      <InvoiceHeader></InvoiceHeader>
      <ItemList />
    </form>
  );
};
