import Title from "components/title/title";
import { useLocation } from "react-router-dom";
import ContractTable from "./contract";

export default function Contract({}: {}) {
  return <ContractPage />;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ContractPage() {
  const query = useQuery();
  var id;
  if (query) {
    id = query.get("id");
  }
  return (
    <div className="pagecontent">
      <Title title={"Contract"} icon={"/assets/invoices_and_payments_logo.svg"} />
      <ContractTable contractId={Number(id)} />
    </div>
  );
}
