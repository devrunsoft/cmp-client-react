import Title from "components/title/title";
import RequestServices from "./requestService";

export default function Requets() {
  return (
    <div className="pagecontent">
      <Title
        title={"Request service"}
        icon={"/assets/invoices_and_payments_logo.svg"}
      />
      <RequestServices />
    </div>
  );
}
