import Title from "components/title/title";
import InvoicesTable from "./invoicesTable/invoicesTable";


export default function Invoices() {
    return (
        <div className="pagecontent">
            <Title title={"Invoices and Payments"} icon={"/assets/invoices_and_payments_logo.svg"} />
            <InvoicesTable />
        </div>
    )
}