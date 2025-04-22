import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { OperationalAddressEntity } from "common/domain/entity/operational_address_entity";
import { LocationCompanyEntity } from "common/domain/entity/location_company_entity";
import { getOtherCompanyLocation } from "data/api/register/otherCompanyLocation/get";
import { useLoading } from "components/loading/loading_context";
import { OtherCompanyLocationCommand } from "common/domain/command/other_company_location_command";
import { deleteOperationalAddress } from "data/api/dashboard/operationalAddress/delete";
import { deleteOtherAddressApi } from "data/api/dashboard/other_address/delete";
import Title from "components/title/title";
import { useForm, useFormContext } from "react-hook-form";
import styles from "../signUp.module.css";
import { FiTrash } from "react-icons/fi";
import { LiaEdit } from "react-icons/lia";
import { GoPlusCircle } from "react-icons/go";
import { getOperationalAddress } from "data/api/register/operationalAddress/get";
import { mapLocationCompanyEntityToCommand } from "common/domain/mapper/location_comapny_mapper";
import { NextButton } from "components/button/next/next";
import AddPointMap, { mcenter } from "components/map/addPointMap";
import AddAddressMap from "components/map/AddAddressMap";
import Gap from "uikit/src/Gap";

export default function OperationalAddress({
  setIndex,
}: {
  setIndex?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [operationalAddress, setoperationalAddress] =
    useState<OperationalAddressEntity | null>(null);
  const [otherAddress, setotherAddress] = useState<LocationCompanyEntity[]>([]);
  const [otherAddressCommand, setotherAddressCommand] = useState<
    Partial<OtherCompanyLocationCommand>
  >({});
  const { isLoading, setLoading } = useLoading();
  const [openEditOtherAddressModal, setOpenEditOtherAddressModal] = useState<
    number | null
  >(null);

  useEffect(() => {
    getOprAddress();
  }, []);

  async function getOprAddress() {
    try {
      setLoading(true);
      var result = await getOperationalAddress();
      result.fold(
        (s) => {},
        async (data) => {
          setoperationalAddress(data);

          if (data != null) {
            setotherCommand(data);
            await getOtherAddress(data);
          }
        }
      );
    } finally {
      setLoading(false);
    }
  }

  function setotherCommand(model: OperationalAddressEntity) {
    var command = new OtherCompanyLocationCommand(
      "",
      model.Lat!,
      model.Long!,
      0,
      "",
      model.FirstName!,
      model.LastName!,
      model.LocationPhone!,
      model.Id!,
      0,
      0,
      model.Address!
    );
    setotherAddressCommand(command);
  }

  async function getOtherAddress(oprAddress) {
    try {
      setLoading(true);
      var result = await getOtherCompanyLocation(oprAddress?.Id);
      result.fold(
        (s) => {},
        (m) => {
          setotherAddress(m);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  const center = {
    lat: 34.063473,
    lng: -118.242753,
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modalIsOpen, setModalIsOpen] = useState({
    operational: false,
    oilContainer: false,
    greaseTrap: false,
  });

  const [myArray, setMyArray] = useState([]);

  const addArray = (key, data) => {
    if (operationalAddress == null) getOprAddress();
    else {
      getOtherAddress(operationalAddress);
    }
  };

  //   const removeField = (key, index) => {
  //     setMyArray((prevArray) =>
  //       prevArray.map((item, i) => {
  //         if (i === index && item[key]) {
  //           return { ...item, [key]: null };
  //         }
  //         return item;
  //       })
  //     );
  //   };

  async function deleteOprAddress(params: number) {
    try {
      setLoading(true);
      var result = await deleteOperationalAddress(params);
      result.fold(
        (error) => {},
        (data) => {
          getOprAddress();
        }
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteOtherAddress(params: number) {
    try {
      setLoading(true);
      var result = await deleteOtherAddressApi(params);
      result.fold(
        (error) => {},
        (data) => {
          getOtherAddress(operationalAddress);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  const openModal = (type) => {
    setModalIsOpen((prevState) => ({ ...prevState, [type]: true }));
  };
  const closeModal = (type) => {
    setModalIsOpen((prevState) => ({ ...prevState, [type]: false }));
  };
  const info = ["random", "infom"];
  const onSubmit = () => {
    setIndex!(3);
  };

  const operationalAddressCenter = operationalAddress
    ? { lat: operationalAddress.Lat??mcenter.lat, lng: operationalAddress.Long??mcenter.lng, }
    : center;

  return (
    <>
      <Title title={"Professional Information"} />
      <div className={styles.form}>
        <div className={styles.formSection}>
          <label htmlFor="operational">Operational address: </label>
          {operationalAddress ? (
            <div className={styles.informSection}>
              <div className={styles.fakeInput}>
                {operationalAddress.Address}
                <div className={styles.inputIconButton}>
                  <button type="button">
                    <LiaEdit
                      onClick={() => openModal("operational")}
                      size={26}
                      style={{ color: "rgba(76, 142, 59, 1)" }}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteOprAddress(operationalAddress.Id!)}
                  >
                    <FiTrash
                      size={22}
                      style={{ color: "rgba(76, 142, 59, 1)" }}
                    />
                  </button>
                </div>
              </div>
              <AddAddressMap
                onSubmitAddress={(data) => {
                  setoperationalAddress(data);
                  setotherCommand(data);
                }}
                isOpen={modalIsOpen.operational}
                onClose={() => closeModal("operational")}
                center={{
                  lat: operationalAddress.Lat??mcenter.lat,
                  lng: operationalAddress.Long??mcenter.lng,
                }}
                model={operationalAddress}
              />
            </div>
          ) : (
            <>
              <button
                type="button"
                id="operational"
                onClick={() => openModal("operational")}
                className={styles.addLocationButton}
              >
                <GoPlusCircle size={"24"} /> ADD ADDRESS
              </button>
              <AddAddressMap
                onSubmitAddress={(data) => addArray("operationalAddress", data)}
                isOpen={modalIsOpen.operational}
                onClose={() => closeModal("operational")}
                center={operationalAddressCenter}
              />
            </>
          )}
        </div>
        <div className={styles.formSection}>
          <label htmlFor="oilContainer">Oil Container Location: </label>
          <div className={styles.informSection}>
            {otherAddress.map(
              (item, index) =>
                item.Type == 1 && (
                  <div
                    key={`oilContainer-${index}`}
                    className={styles.fakeInput}
                  >
                    {item.Name}, {item.Lat}, {item.Long}
                    <div className={styles.inputIconButton}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenEditOtherAddressModal(item.Id);
                        }}
                      >
                        <LiaEdit
                          size={26}
                          style={{ color: "rgba(76, 142, 59, 1)" }}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteOtherAddress(item.Id)}
                      >
                        <FiTrash
                          size={22}
                          style={{ color: "rgba(76, 142, 59, 1)" }}
                        />
                      </button>
                    </div>
                    <AddPointMap
                      onSubmitAddress={(data) => {
                        getOtherAddress(operationalAddress);
                      }}
                      isOpen={openEditOtherAddressModal == item?.Id}
                      onClose={() => {
                        setOpenEditOtherAddressModal(null);
                      }}
                      center={{ lat: item.Lat, lng: item.Long }}
                      type={"Oil"}
                      typeOfButton={"LOCATION"}
                      oprId={operationalAddress?.Id}
                      model={mapLocationCompanyEntityToCommand(item)}
                      id={item.Id}
                    />
                  </div>
                )
            )}

            <button
              type="button"
              id="oilContainer"
              onClick={() => openModal("oilContainer")}
              className={styles.addLocationButton}
            >
              <GoPlusCircle size={"24"} /> ADD LOCATION
            </button>
            {otherAddressCommand && (
              <AddPointMap
                onSubmitAddress={(data) => addArray("oilContainer", data)}
                isOpen={modalIsOpen.oilContainer}
                onClose={() => closeModal("oilContainer")}
                center={{
                  lat: otherAddressCommand.Lat,
                  lng: otherAddressCommand.Long,
                }}
                type={"Oil"}
                typeOfButton={"LOCATION"}
                model={otherAddressCommand}
                oprId={operationalAddress?.Id}
              />
            )}
          </div>
        </div>
        <div className={styles.formSection}>
          <label htmlFor="greaseTrap">Grease Trap Location: </label>
          <div className={styles.informSection}>
            {otherAddress.map(
              (item, index) =>
                item.Type == 2 && (
                  <div
                    key={`oilContainer-${index}`}
                    className={styles.fakeInput}
                  >
                    {item.Name}, {item.Lat}, {item.Long}
                    <div className={styles.inputIconButton}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenEditOtherAddressModal(item.Id);
                        }}
                      >
                        <LiaEdit
                          size={26}
                          style={{ color: "rgba(76, 142, 59, 1)" }}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteOtherAddress(item.Id)}
                      >
                        <FiTrash
                          size={22}
                          style={{ color: "rgba(76, 142, 59, 1)" }}
                        />
                      </button>
                    </div>
                    <AddPointMap
                      onSubmitAddress={(data) => {
                        getOtherAddress(operationalAddress);
                      }}
                      isOpen={openEditOtherAddressModal == item?.Id}
                      onClose={() => {
                        setOpenEditOtherAddressModal(null);
                      }}
                      center={{ lat: item.Lat, lng: item.Long }}
                      type={"Grease Trap"}
                      typeOfButton={"LOCATION"}
                      oprId={operationalAddress?.Id}
                      model={mapLocationCompanyEntityToCommand(item)}
                      id={item.Id}
                    />
                  </div>
                )
            )}

            <button
              type="button"
              id="greaseTrap"
              onClick={() => openModal("greaseTrap")}
              className={styles.addLocationButton}
            >
              <GoPlusCircle size={"24"} /> ADD LOCATION
            </button>
            {otherAddressCommand && (
              <AddPointMap
                onSubmitAddress={(data) => addArray("greaseTrap", data)}
                isOpen={modalIsOpen.greaseTrap}
                onClose={() => closeModal("greaseTrap")}
                center={{
                  lat: otherAddressCommand.Lat,
                  lng: otherAddressCommand.Long,
                }}
                type={"Grease Trap"}
                typeOfButton={"LOCATION"}
                model={otherAddressCommand}
                oprId={operationalAddress?.Id}
              />
            )}
          </div>
        </div>

        <div className={styles.buttonLine}>
          {/* <button type="button" onClick={onBack}>
            Back
          </button> */}
          <NextButton onClick={onSubmit} />
        </div>
      </div>
    </>
  );
}
