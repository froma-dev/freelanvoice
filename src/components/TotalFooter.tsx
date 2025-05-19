export const TotalFooter = ({ total }: { total: string }) => {
  return (
    <tr>
      <td colSpan={3} className="text-right text-xl font-semibold">
        Total
      </td>
      <td className="text-right text-xl font-semibold">{total}</td>
    </tr>
  );
};
