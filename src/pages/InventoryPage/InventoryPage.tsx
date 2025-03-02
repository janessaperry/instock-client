import "./InventoryPage.scss";

interface InventoryPageProps {
  baseApiUrl: string;
}

function InventoryPage({ baseApiUrl }: InventoryPageProps) {
  console.log(baseApiUrl);
  return (
    <div>
      <h1>Inventory</h1>
    </div>
  );
}

export default InventoryPage;
