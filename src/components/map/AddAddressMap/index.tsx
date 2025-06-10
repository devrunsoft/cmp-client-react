"use client";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import { FiTrash } from "react-icons/fi";
import { LiaEdit } from "react-icons/lia";
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import styles from "./addAdressMap.module.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { IoClose } from "react-icons/io5";
import { LocationCompanyEntity } from "common/domain/entity/location_company_entity";
import { OtherCompanyLocationCommand } from "common/domain/command/other_company_location_command";
import {
  CapacityEntity,
  mapCapacityToNameAndValue,
} from "common/domain/entity/capacity_entity";
import { useLoading } from "components/loading/loading_context";
import { ServiceTypeEnum } from "common/domain/enum/service_type_enum";
import { toast } from "react-toastify";
import { getAllCapacity } from "data/api/capacity/get_all";
import { addOtherCompanyLocation } from "data/api/register/otherCompanyLocation/add";
import { editOtherCompanyLocation } from "data/api/register/otherCompanyLocation/edit";
import { getAddressFromCoordsApi } from "data/api/map/reverse_id";
import { DropDown } from "components/dropDown";
import { OperationalAddressEntity } from "common/domain/entity/operational_address_entity";
import { useNavigate } from "react-router-dom";
import { useAddress } from "common/context/address_context";
import { getOperationalAddress } from "data/api/dashboard/operationalAddress/get_by_id";
import { getOtherCompanyLocation } from "data/api/register/otherCompanyLocation/get";
import { deleteOperationalAddress } from "data/api/dashboard/operationalAddress/delete";
import { deleteOtherAddressApi } from "data/api/dashboard/other_address/delete";
import { mapLocationCompanyEntityToCommand } from "common/domain/mapper/location_comapny_mapper";
import AddPointMap, { mcenter } from "../addPointMap";
import { NextButton } from "components/button/next/next";
import DeleteButton from "components/button/delete_button";
import { OperationalAddressCommand } from "common/domain/command/operational_address_command";
import { addOperationalAddress } from "data/api/register/operationalAddress/add";
import { editOperationalAddress } from "data/api/register/operationalAddress/edit";
import { SearchBox } from "cmp-core/src/Component/SearchBox";
import CustomSelector from "components/dropDown/customSelect";
import { GOOGLE_MAPS_API_KEY } from "core/src/utils/url";

const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "400px",
};

interface AddPointMapProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAddress: (data: OperationalAddressEntity) => void;
  center: { lat: number; lng: number };
  model?: OperationalAddressEntity;
}
const addAdressMap: React.FC<AddPointMapProps> = ({
  center,
  isOpen,
  onClose,
  onSubmitAddress,
  model,
}) => {
  const options = ["Restaurant", "Food processing company", "Other type"];

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isDirty, dirtyFields },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: model?.Name,
      address: model?.Address,
      latitude: model?.Lat,
      longitude: model?.Long,
      crossStreet: model?.CrossStreet,
      county: model?.County,
      phoneNumber: model?.LocationPhone,
      select: options[model != null ? model?.BusinessId! - 1 : 0],
      contactFirstName: model?.FirstName,
      contactLastName: model?.LastName,
    },
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const { setLoading } = useLoading();

  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const address = watch("address");
  const latitude = watch("latitude");
  const longitude = watch("longitude");
  const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY ?? "",
    version: "weekly",
    libraries: ["places"],
    id: "google-map-script",
  });

  useEffect(() => {
    loader
      .load()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Failed to load Google Maps API:", error);
        setLoadError(error);
      });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      reset({
        name: "",
        address: "",
        latitude: 0,
        longitude: 0,
        crossStreet: "",
        county: "",
        phoneNumber: "",
        select: "",
        contactFirstName: "",
        contactLastName: "",
      });
    } else {
      reset({
        name: model?.Name,
        address: model?.Address,
        latitude: model?.Lat,
        longitude: model?.Long,
        crossStreet: model?.CrossStreet,
        county: model?.County,
        phoneNumber: model?.LocationPhone,
        select: options[model != null ? model?.BusinessId! - 1 : 0],
        contactFirstName: model?.FirstName,
        contactLastName: model?.LastName,
      });
      setSelectedValue(options[model != null ? model?.BusinessId! - 1 : 0]);
      if (model == null) {
        setCurrentLocation();
      }
    }
  }, [isOpen, reset]);

  function setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setValue("latitude", latitude);
          setValue("longitude", longitude);
          setMapCenter({ lat: latitude, lng: longitude });
          changeCenter(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  const [mapCenter, setMapCenter] = useState({
    lat: latitude ? latitude : center.lat,
    lng: longitude ? longitude : center.lng,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  function selecType(params: string): number {
    switch (params) {
      case "Restaurant":
        return 1;
      case "Food processing company":
        return 2;
      default:
        return 3;
    }
  }

  const handleSubmitAddress = async (data) => {
    if (model != null) {
      edit(data);
    } else {
      add(data);
    }
  };

  async function add(data) {
    try {
      setLoading(true);
      if (!data.address) {
        toast.error("Please fill the address correctly");
        return;
      }
      var operationalAddressCommand = new OperationalAddressCommand(
        data.name,
        data.address,
        data.crossStreet,
        data.county,
        data.phoneNumber,
        selecType(data.select),
        data.contactFirstName,
        data.contactLastName,
        mapCenter.lat,
        mapCenter.lng
      );
      var result = await addOperationalAddress(operationalAddressCommand);
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (res) => {
          onSuccess(data, res);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  async function edit(data) {
    try {
      setLoading(true);
      if (!data.address) {
        toast.error("Please fill the address correctly");
      }
      var operationalAddressCommand = new OperationalAddressCommand(
        data.name,
        data.address,
        data.crossStreet,
        data.county,
        data.phoneNumber,
        selecType(data.select),
        data.contactFirstName,
        data.contactLastName,
        mapCenter.lat,
        mapCenter.lng
      );

      var result = await editOperationalAddress(
        operationalAddressCommand,
        model!.Id!
      );
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (res) => {
          onSuccess(data, res);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  function onSuccess(data, res) {
    setFormSubmitted(true);
    onSubmitAddress(res);
    onClose();
    reset();
    setFormSubmitted(false);
  }

  const onCancel = () => {
    onClose();
    reset();
    setFormSubmitted(false);
  };

  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setValue("latitude", lat);
    setValue("longitude", lng);
    changeCenter(lat, lng);
  }, []);

  const changeCenter = (lat, lng) => {
    getAddressFromCoordsApi(lat, lng).then((result) => {
      result.fold(
        (_) => {},
        (data) => {
          setValue("address", data);
        }
      );
    });
  };

  const isAddressFilled = !!address;
  const sanitizePhoneNumber = (value) => {
    return value.replace(/\D/g, ""); // Removes all non-digit characters
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Add Operational Address"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(31, 34, 41, 0.8)",
          },
          content: {
            borderRadius: "10px",
          },
        }}
      >
        <div className={styles.title}>
          <h2>Add Operational address</h2>
          <button onClick={onClose}>
            <IoClose size={34} />
          </button>
        </div>
        <div className={styles.mapSection}>
          <SearchBox
            onSelectAddress={(address, latitude, longitude, city, state, county, bounds) => {
              setValue("address", address);
              setValue("latitude", latitude);
              setValue("longitude", longitude);
              setValue("county", county);
              setMapCenter({ lat: latitude, lng: longitude });
            }}
            defaultValue=""
            loader={loader}
          />
          <GoogleMap
            id="google-map"
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={17}
            onClick={handleMapClick}
          >
            {!isNaN(latitude!) && !isNaN(longitude!) && (
              <OverlayView
                position={{
                  lat: latitude ?? mcenter.lat,
                  lng: longitude ?? mcenter.lng,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <FaMapMarkerAlt size={24} />
              </OverlayView>
            )}
          </GoogleMap>
        </div>
        <form
          className={styles.dialogForm}
          // onSubmit={handleSubmit(handleSubmitAddress)}
        >
          <label className={styles.smallText}>Location name:</label>
          <input
            className={`${styles.formInput} ${
              errors.name && styles.inputError
            }`}
            type="text"
            defaultValue={model?.CrossStreet}
            placeholder="Location name"
            {...register("name", { required: true })}
          />
          <label>Operational address:</label>
          {address ? (
            <div className={styles.fakeInput}>
              <p>{address}</p>
              <button type="button" onClick={() => setValue("address", "")}>
                <FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} />
              </button>
            </div>
          ) : (
            <div
              className={`${
                formSubmitted && !address ? styles.inputError : ""
              }`}
            >
              <SearchBox
                isForm={true}
                onSelectAddress={(address, latitude, longitude, city, state, county, bounds) => {
                  setValue("address", address);
                  setValue("latitude", latitude);
                  setValue("longitude", longitude);
                  setMapCenter({ lat: latitude, lng: longitude });
                }}
                defaultValue={model?.Address}
                loader={loader}
              />
            </div>
          )}
          <label className={styles.smallText}>Cross Street:</label>
          <input
            className={`${styles.formInput} ${
              errors.crossStreet && styles.inputError
            }`}
            type="text"
            defaultValue={model?.CrossStreet}
            placeholder="Cross street"
            {...register("crossStreet")}
          />
          <label className={styles.smallText}>County:</label>
          <input
            className={`${styles.formInput} ${
              errors.county && styles.inputError
            }`}
            type="text"
            defaultValue={model?.County}
            placeholder="County"
            {...register("county", { required: true })}
          />
          <label className={styles.smallText}>Location Phone:</label>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: true,
              validate: (value) => {
                const sanitizedValue = sanitizePhoneNumber(value);
                return (
                  sanitizedValue.length >= 10 ||
                  "Phone number must be 10 digits"
                );
              },
            }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                className={
                  errors.phoneNumber
                    ? styles.numberInputError
                    : styles.numberInput
                }
                defaultCountry="US"
                placeholder="Enter phone number"
                onChange={(value) => field.onChange(value)}
                maxLength={14}
              />
            )}
          />
          <label className={styles.smallText}>Type of Business:</label>
          <div className={errors.select && styles.inputError}>
            <Controller
              name="select"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomSelector
                  options={options}
                  select={"specify whether"}
                  initialValue={selectedValue ?? ""}
                  selectValue={(value) => {
                    setSelectedValue(value);
                    field.onChange(value);
                  }}
                />
              )}
            />
          </div>
          <label className={styles.smallText}>Location Contact Person: </label>
          <div className={styles.personInput}>
            <input
              className={`${styles.formInput} ${
                errors.contactFirstName && styles.inputError
              }`}
              type="text"
              placeholder="First Name"
              {...register("contactFirstName", { required: true })}
            />
            <input
              className={`${styles.formInput} ${
                errors.contactLastName && styles.inputError
              }`}
              type="text"
              placeholder="Last Name"
              {...register("contactLastName", { required: true })}
            />
          </div>
          <div className={styles.submitButtons}>
            <button className={styles.cancel} type="button" onClick={onCancel}>
              Cancel
            </button>
            <button onClick={handleSubmit(handleSubmitAddress)}>
              {model == null ? "Add ADDRESS" : "Update ADDRESS"}{" "}
              <GoPlusCircle size={24} />
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(addAdressMap);
