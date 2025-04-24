import Title from "@/components/forms/title/title"
import PaymentMethod from "@/components/forms/paymentMethod";

export default function PaymentsPage() {
    return (
        <div className="pagecontent">
            <Title title={"Shopping Cart"} icon={"/invoices_and_payments_logo.svg"} />
            <PaymentMethod />
        </div>
    )
}