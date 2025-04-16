import SingleTableComponent from "@/components/SingleTableComponent";
import TableOrders from "@/components/TableOrders";

const TablePage = async ({
  params,
}: {
  params: Promise<{ table: string }>;
}) => {
  const { table } = await params;

  return (
    <div>
      <SingleTableComponent param={table} />
      <TableOrders param={table} />
    </div>
  );
};

export default TablePage;
