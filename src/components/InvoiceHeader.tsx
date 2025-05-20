export const InvoiceHeader = () => {
  return (
    <>
      <label htmlFor="client-name">Nombre del cliente</label>
      <input type="text" id="client-name" />
      <label htmlFor="date">Fecha</label>
      <input type="date" id="date" />
      <label htmlFor="invoice-number">Número de factura</label>
      <input type="number" id="invoice-number" />
      <label htmlFor="currency">Moneda</label>
      <select id="currency">
        <option value="MXN">MXN</option>
        <option value="USD">USD</option>
      </select>
    </>
  );
};
