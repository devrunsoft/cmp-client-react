import { useAddress } from "common/context/address_context";
import FormFrameScroll from "components/formFrame/formFrameScroll";
import TitleBack from "components/title/title_back";
import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import EmergencyServiceForm from "./emergencyServiceForm";

export default function emergencyService() {
  return <EmergencyServiceChild />;
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EmergencyServiceChild = () => {
  const query = useQuery();
  const type = query.get("type");
  const data = query.get("data");
  var id: number | null = null;

  if (query) {
    if (data) id = JSON.parse(data);
  }

  const { selectedAddresses } = useAddress();
  return (
    <div className="pagecontent">
      <TitleBack
        title={`Emergency Service - ${
          selectedAddresses ? selectedAddresses.Name : ""
        }`}
        icon={"/src/assets/emergency_serc_icon.svg"}
      />
      <FormFrameScroll>
        <EmergencyServiceForm Id={id} />
      </FormFrameScroll>
    </div>
  );
};
