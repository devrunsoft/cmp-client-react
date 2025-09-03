import React, { useEffect, useState } from "react";
import styles from "./paymentForm.module.css";
import { Loader } from "@googlemaps/js-api-loader";
import { GOOGLE_MAPS_API_KEY } from "core/src/utils/url";
import { SearchBoxForm } from "cmp-core/src/Component/SerachBoxForm/serachBoxForm";
import { BillingInfromationCommand } from "common/domain/command/billing_information_command";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";

type PaymentAddressProps = {
  isDeleting?: boolean;
  isColumn?: boolean;
  onDelete?: () => void; 
  defaultValue: BillingInfromationCommand | null;
  onSelectAddress: (
    address: string,
    latitude: number | null,
    longitude: number | null,
    city: string,
    postalCode: string,
    state: string
  ) => void;
};

const MultiPaymentAddressCm: React.FC<PaymentAddressProps> = ({
  onSelectAddress,
  defaultValue,
  onDelete,
  isDeleting,
  isColumn = false,
}) => {
  const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: "weekly",
    libraries: ["places"],
    id: "google-map-script",
  });

  const [address, setAddress] = useState(defaultValue?.Address ?? "");
  const [city, setCity] = useState(defaultValue?.City ?? "");
  const [state, setState] = useState(defaultValue?.State ?? "");
  const [zipCode, setZipCode] = useState(defaultValue?.ZIPCode ?? "");

  useEffect(() => {
    if (defaultValue) {
      setAddress(defaultValue.Address || "");
      setCity(defaultValue.City || "");
      setState(defaultValue.State || "");
      setZipCode(defaultValue.ZIPCode || "");
    }
  }, [defaultValue]);

  const handleDelete = async () => {
    // setIsDeleting(true);
    // // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async action
    // setAddress("");
    // setCity("");
    // setState("");
    // setZipCode("");
    // onSelectAddress("", null, null, "", "", "");
    // setIsDeleting(false);
    onDelete?.();
  };

  return (
    <>
      <div className={isColumn ? styles.formSectionColumn : styles.formSection}>
        <label htmlFor="billingAddress">Address:</label>
        <SearchBoxForm
          onSelectAddress={(
            selectedAddress,
            latitude,
            longitude,
            selectedCity,
            selectedPostalCode,
            selectedState
          ) => {
            setAddress(selectedAddress);
            setCity(selectedCity);
            setZipCode(selectedPostalCode);
            setState(selectedState);

            onSelectAddress(
              selectedAddress,
              latitude,
              longitude,
              selectedCity,
              selectedPostalCode,
              selectedState
            );
          }}
          defaultValue={address}
          loader={loader}
        />
      </div>

      <div className={isColumn ? styles.formSectionColumn : styles.formSection}>
        <label htmlFor="city">City:</label>
        <input
          className={`${styles.inputInformation} ${styles.formInput}`}
          placeholder="Enter city"
          type="text"
          id="city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            onSelectAddress(address, null, null, e.target.value, zipCode, state);
          }}
        />
      </div>

      <div className={isColumn ? styles.formSectionColumn : styles.formSection}>
        <label htmlFor="state">State:</label>
        <input
          className={`${styles.inputInformation} ${styles.formInput}`}
          placeholder="Enter state"
          type="text"
          id="state"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            onSelectAddress(address, null, null, city, zipCode, e.target.value);
          }}
        />
      </div>

      <div className={isColumn ? styles.formSectionColumn : styles.formSection}>
        <label htmlFor="ZIPCode">Zip code:</label>
        <input
          className={`${styles.inputInformation} ${styles.formInput}`}
          placeholder="Enter ZIP code"
          type="text"
          id="ZIPCode"
          value={zipCode}
          onChange={(e) => {
            setZipCode(e.target.value);
            onSelectAddress(address, null, null, city, e.target.value, state);
          }}
        />
      </div>

      {/* <div className={isColumn ? styles.formSectionColumn : styles.formSection} style={{ marginTop: "1rem" }}>
        <LoadingButton
          variant="outlined"
          color="error"
          loading={isDeleting}
          loadingPosition="start"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </LoadingButton>
      </div> */}
    </>
  );
};

export default MultiPaymentAddressCm;
