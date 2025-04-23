import { useAddress } from "common/context/address_context";
import FormFrameScroll from "components/formFrame/formFrameScroll";
import TitleBack from "components/title/title_back";
import { Suspense, useEffect } from "react";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import EnrollServiceForm from "./enrollServiceForm";

export default function EnrollService() {
  return (
    <Suspense>
      <EnrollServiceCm />
    </Suspense>
  );
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EnrollServiceCm = () => {
  const query = useQuery();
  const type = query.get("type");
  const data = query.get("data");
  const serviceId = query.get("serviceId");
  
  var id: number | null = null;
  if (data) {
    if (data) id = JSON.parse(data);
  }

  const { selectedAddresses } = useAddress();
  useEffect(() => {}, [selectedAddresses]);

  return (
    <div className="pagecontent">
      <TitleBack
        title={`${type} - ${selectedAddresses ? selectedAddresses.Name : ""}`}
        icon={"/src/assets/broom.svg"}
      />
      <FormFrameScroll>
        <EnrollServiceForm Id={id} serviceId={Number(serviceId)} />
      </FormFrameScroll>
    </div>
  );
};
