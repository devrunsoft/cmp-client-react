import React, { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";

import { FiTrash } from "react-icons/fi";
import { useForm } from "react-hook-form";
import AddPointMap from "./addPointMap";
import { LiaEdit } from "react-icons/lia";
import { LocationCompanyEntity } from "common/domain/entity/location_company_entity";
import { useAddress } from "common/context/address_context";
import styles from "./locationPointHandlerMap.module.css";
import { OperationalAddressEntity } from "common/domain/entity/operational_address_entity";
import { OtherCompanyLocationCommand } from "common/domain/command/other_company_location_command";
import { locationCompanyEntityHash, mapLocationCompanyEntityToCommand } from "common/domain/mapper/location_comapny_mapper";


interface locationPointHandlerMapProps {
  onAddress: (data: LocationCompanyEntity[]) => void;
  type: "Oil" | "Grease Trap";
  typeOfButton: string;
  id?: number;
}

const LocationPointHandlerMap = (props: locationPointHandlerMapProps) => {
  const center = {
    lat: 32.733131,
    lng: -117.189472,
  };
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const { selectedAddresses, refreshAdr } = useAddress();
  const [addresses, setAddresses] = useState<LocationCompanyEntity[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openEditOtherAddressModal, setOpenEditOtherAddressModal] =
    useState<number|null>(null);

  const openModal = () => {
    console.log("im here");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (selectedAddresses) {
      setValue("locationCount", selectedAddresses.LocationCompany?.length);
      setValue("location", selectedAddresses.LocationCompany);
      var adr =
        props.type == "Oil"
          ? selectedAddresses.LocationCompany?.filter((e) => e.Type == 1)
          : selectedAddresses.LocationCompany?.filter((e) => e.Type == 2);
          if(adr){
      setAddresses(adr);
      props.onAddress(adr);
          }
    }
  }, [selectedAddresses]);

  useEffect(() => {}, [addresses]);

  function removeLocation(Id: number) {
    setAddresses(addresses.filter((e) => e.Id != Id));
    props.onAddress(addresses.filter((e) => e.Id != Id));
  }
  function onSubmitAddress(model: LocationCompanyEntity) {
    setAddresses([...addresses, model]);
    props.onAddress([...addresses, model]);
  }

  const updateAddress = (
    id: number,
    updatedFields: Partial<LocationCompanyEntity>
  ) => {
    var newAddress = addresses.map((address) => {
      var data = address.Id === id ? { ...address, ...updatedFields } : address;
      return data;
    });
    props.onAddress(newAddress);
    setAddresses(newAddress);

    //   setAddresses((prevAddresses) =>
    //     prevAddresses.map((address)=> {

    //     var data =  address.Id === id ? { ...address, ...updatedFields } : address
    //     return data;
    //     }
    //     )
    //   );
  };

  function handleUpdate(model: LocationCompanyEntity) {
    updateAddress(model.Id, model);
  }

  function setotherCommand(
    model: OperationalAddressEntity
  ): OtherCompanyLocationCommand {
    var command = new OtherCompanyLocationCommand(
      "",
      model.Lat!,
      model.Long!,
      0,
      "",
      model.FirstName??"",
      model.LastName??"",
      model.LocationPhone??"",
      model.Id??0,
      0,
      0,
      model.Address ?? ""
    );
    return command;
  }

  return (
    <div className={`${styles.formSection} ${styles.labelTwoButtom}`}>
      <label htmlFor="pickupLocation" className={styles.label}>
        Pickup point:
      </label>
      <div className={styles.column}>
        {addresses.map((item, index) => (
          <div key={index} className={styles.fakeInput}>
            <p>
              {item.Name}, {item.Lat}, {item.Long}
            </p>
            <div className={styles.inputIconButton}>
              <button
                type="button"
                onClick={() => {
                  setOpenEditOtherAddressModal(item.Id);
                }}
              >
                <LiaEdit size={26} style={{ color: "rgba(76, 142, 59, 1)" }} />
              </button>
              <button type="button" onClick={() => removeLocation(item.Id)}>
                <FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} />
              </button>
            </div>
            <AddPointMap
              key={locationCompanyEntityHash(item)}
              onSubmitAddress={(data) => {
                handleUpdate(data);
              }}
              isOpen={openEditOtherAddressModal == item?.Id}
              onClose={() => {
                setOpenEditOtherAddressModal(null);
              }}
              center={{ lat: item.Lat, lng: item.Long }}
              type={props.type}
              typeOfButton={"Point"}
              oprId={selectedAddresses?.Id}
              model={mapLocationCompanyEntityToCommand(item)}
              id={item.Id}
            />
          </div>
        ))}
        <div
          className={`${styles.dialogContainer} ${
            errors.locationCount && styles.inputError
          }`}
        >
          <button
            type="button"
            className={styles.addPointButton}
            onClick={openModal}
          >
            {" "}
            <GoPlusCircle size={"24"} />
            ADD PICKUP POINT
          </button>
        </div>
      </div>
      <input
        type="hidden"
        {...register("locationCount", { validate: (value) => value > 0 })}
      />

      {selectedAddresses && (
        <AddPointMap
          type={props.type}
          onSubmitAddress={(data) => onSubmitAddress(data)}
          isOpen={modalIsOpen}
          onClose={closeModal}
          center={center}
          typeOfButton={"Point"}
          model={setotherCommand(selectedAddresses as OperationalAddressEntity)}
          oprId={selectedAddresses?.Id}
        />
      )}
    </div>
  );
};

export default LocationPointHandlerMap;
