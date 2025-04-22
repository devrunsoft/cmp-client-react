"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import styles from "./addPointMap.module.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { IoClose } from "react-icons/io5";
import { LocationCompanyEntity } from "common/domain/entity/location_company_entity";
import { OtherCompanyLocationCommand } from "common/domain/command/other_company_location_command";
import { CapacityEntity, mapCapacityToNameAndValue } from "common/domain/entity/capacity_entity";
import { useLoading } from "components/loading/loading_context";
import { ServiceTypeEnum } from "common/domain/enum/service_type_enum";
import { toast } from "react-toastify";
import { getAllCapacity } from "data/api/capacity/get_all";
import { addOtherCompanyLocation } from "data/api/register/otherCompanyLocation/add";
import { editOtherCompanyLocation } from "data/api/register/otherCompanyLocation/edit";
import { getAddressFromCoordsApi } from "data/api/map/reverse_id";
import { DropDown } from "components/dropDown";

const containerStyle = {
  width: "100%",
  height: "400px",
};

type LatLng = {
    lat: number;
    lng: number;
  };
  export const mcenter = {
    lat: 34.063473,
    lng: -118.242753,
  };

const libraries = ["places"];

interface AddPointMapProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAddress: (data: LocationCompanyEntity) => void;
  center: { lat: number | undefined; lng: number  | undefined};
  type: "Oil" | "Grease Trap";
  typeOfButton: string;
  oprId?: number;
  model?: Partial<OtherCompanyLocationCommand>;
  id?: number;
}

const AddPointMap: React.FC<AddPointMapProps> = ({
  isOpen,
  onClose,
  onSubmitAddress,
  center,
  type,
  typeOfButton,
  oprId,
  model,
  id,
}) => {
  const { setLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [marker, setMarker] = useState<Record<string, number> | null>(null);
  const [capacity, setCapacity] = useState<CapacityEntity[]>([]);

  const [mapCenter, setMapCenter] = useState<LatLng>({
    lat: center.lat ?? mcenter.lat,
    lng: center.lng ?? mcenter.lng,
  });

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    version: "weekly",
    libraries: ["places"],
    id: "google-map-script",
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      locationName: model?.Name,
      selectAdress: `${(model?.Lat, model?.Long)}`,
      comments: model?.Comment,
      contactFirstName: model?.PrimaryFirstName,
      contactLastName: model?.PrimaryLastName,
      phoneNumber: model?.PrimaryPhonNumber,
      select: model?.CapacityId,
      Address: model?.Address,
    },
  });
  const [selectedValue, setSelectedValue] = useState(null);
  useEffect(() => {
    loadCapacity();
    loader
      .load()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Failed to load Google Maps API:", error);
        setLoadError(error);
      });
  }, [loader]);

  useEffect(() => {
    if (!isOpen) {
      setMarker(null);
      setSelectedValue(null);
    } else {
      if (model != null) init(model as OtherCompanyLocationCommand);
      if (id == null) setCurrentLocation();
    }
  }, [isOpen]);

  useEffect(() => {
    handleSelectValue(model?.CapacityId);
  }, [capacity]);

  function setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarker({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  function init(model: OtherCompanyLocationCommand) {
    handleSelectValue(model?.CapacityId);
    const lat = model?.Lat;
    const lng = model?.Long;
    setMarker({ lat, lng });
    setValue("select", model.CapacityId);
    setValue("selectAdress", `${(model?.Lat, model?.Long)}`);
  }

  async function loadCapacity() {
    var result = await getAllCapacity(
      type === "Oil"
        ? ServiceTypeEnum.CookingOilCollection
        : ServiceTypeEnum.GreaseTrapManagement
    );
    result.fold(
      (error) => {
        toast.error(error.message);
      },
      (data) => {
        setCapacity(data);
      }
    );
  }

  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });
    changeCenter(lat, lng);
  }, []);

  const handleSelectValue = (value) => {
    var selected = value ? capacity.find((x) => x?.Id == value)?.Name : value;
    setSelectedValue(selected);
    setValue("select", value);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const completeData = {
        ...data,
        lat: marker?.lat,
        lng: marker?.lng,
      };

      if (type === "Oil" || type === "Grease Trap") {
        var otherCompanyLocationCommand = new OtherCompanyLocationCommand(
          data.locationName, // Name: string,
          completeData.lat, //Lat: number,
          completeData.lng, //Long: number
          data.select, // Capacity: string,
          data.comments, // Comment: string,
          data.contactFirstName, // PrimaryFirstName: string,
          data.contactLastName, // PrimaryLastName: string,
          data.phoneNumber, // PrimaryPhonNumber: string,
          oprId!,
          type === "Oil" ? 1 : 2,
          data.select,
          data.Address
        );

        if (id == null) {
          var result = await addOtherCompanyLocation(
            otherCompanyLocationCommand
          );
          result.fold(
            (error) => {
              toast.error(error.message);
            },
            (data) => {
              onSuccess(data, completeData);
            }
          );
        } else {
          var result = await editOtherCompanyLocation(
            otherCompanyLocationCommand,
            id
          );
          result.fold(
            (error) => {
              toast.error(error.message);
            },
            (data) => {
              onSuccess(data, completeData);
            }
          );
        }
      } else {
        // var operationalAddressCommand = new OperationalAddressCommand(
        //   "", //Address: string,
        //   data.crossStreet, //CrossStreet: string,
        //   data.county, //County: string,
        //   data.phoneNumber, //LocationPhone: string,
        //   1, //BusinessId: number,
        //   data.contactFirstName, //FirstName: string,
        //   data.contactLastName, //LastName: string,
        //   completeData.lat, //Lat: number,
        //   completeData.lng //Long: number
        // );
        // var x = await addOperationalAddress(operationalAddressCommand);
      }
    } finally {
      setLoading(false);
    }
  };

  function onSuccess(data: LocationCompanyEntity, completeData) {
    onSubmitAddress(data);
    console.log(completeData);
    onClose();
    setMarker(null);
    setValue("phoneNumber", "");
    setValue("select", 0);
    reset();
  }

  const onCancel = () => {
    onClose();
    setMarker(null);
    setSelectedValue(null);
  };
  const changeCenter = (lat, lng) => {
    getAddressFromCoordsApi(lat, lng).then((result) => {
      result.fold(
        (_) => {},
        (data) => {
          setValue("Address", data);
        }
      );
    });
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

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
          overlay: { backgroundColor: "rgba(31, 34, 41, 0.8)" },
          content: { borderRadius: "10px" },
        }}
      >
        <div className={styles.title}>
          <h2>
            {type} {type === "Oil" ? "Container Location" : "Location"}
          </h2>
          <button onClick={onClose}>
            <IoClose size={34} />
          </button>
        </div>
        <GoogleMap
          id="google-map-script"
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={17}
          onClick={handleMapClick}
        >
          {marker && (
            <OverlayView
              position={{ lat: marker.lat, lng: marker.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <FaMapMarkerAlt size={24} />
            </OverlayView>
          )}
        </GoogleMap>

        <form className={styles.dialogForm} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.smallText}>{type} Location Name:</label>
          <input
            className={`${styles.formInput} ${
              errors.locationName && styles.inputError
            }`}
            placeholder="Enter name"
            defaultValue={model?.Name}
            {...register("locationName", { required: true })}
          />
          <label className={styles.smallText}>Address:</label>
          <input
            className={`${styles.formInput} ${
              errors.Address && styles.inputError
            }`}
            placeholder="Enter address"
            defaultValue={model?.Address}
            {...register("Address", { required: true })}
          />
          <label className={styles.smallText}>Location coordinates:</label>
          {marker && (
            <div className={styles.selectAdress}>
              {marker.lat}, {marker.lng}
            </div>
          )}
          {!marker && (
            <>
              <input
                className={`${styles.formInput} ${
                  errors.selectAdress && styles.inputError
                }`}
                type="text"
                placeholder="Put a point on the map"
                disabled={true}
                {...register("selectAdress", { required: true })}
              />
            </>
          )}
          <label className={styles.smallText}>
            {type === "Oil" ? "Coocking Oil" : "Grease Trap"} Capacity: (gal)
          </label>
          <div className={errors.select && styles.inputError}>
            <Controller
              name="select"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DropDown
                  options={mapCapacityToNameAndValue(capacity)}
                  select={type === "Oil" ? "Oil Capacity" : "Trap Capacity"}
                  initialValue={selectedValue ?? ""}
                  selectValue={(value) => {
                    setSelectedValue(value.name);
                    field.onChange(value.value);
                  }}
                />
              )}
            />
          </div>
          <label className={styles.smallText}>
            {type === "Oil" ? "Oil" : "Trap"} Location Comments:
          </label>
          <textarea
            className={`${styles.textareaInput} ${
              errors.comments && styles.inputError
            }`}
            placeholder="Enter text"
            rows={6}
            {...register("comments", { required: false })}
          />
          <label className={styles.smallText}>Primary contact person:</label>
          <div className={styles.personInput}>
            <input
              className={`${styles.formInput} ${
                errors.contactFirstName && styles.inputError
              }`}
              type="text"
              placeholder="First Name"
              defaultValue={model?.PrimaryFirstName}
              {...register("contactFirstName", { required: true })}
            />
            <input
              className={`${styles.formInput} ${
                errors.contactLastName && styles.inputError
              }`}
              type="text"
              defaultValue={model?.PrimaryLastName}
              placeholder="Last Name"
              {...register("contactLastName", { required: true })}
            />
          </div>
          <label className={styles.smallText}>Contact number:</label>
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

          <div className={styles.submitButtons}>
            <button className={styles.cancel} type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">
              {id == null ? "Add" : "Update"} {typeOfButton}{" "}
              <GoPlusCircle size={24} />
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(AddPointMap);
