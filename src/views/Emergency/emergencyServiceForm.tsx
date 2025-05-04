"use client";
import React, { useState, useEffect } from "react";
import styles from "./emergencyServiceForm.module.css";
import { GoPlusCircle } from "react-icons/go";
import { useForm, Controller, set } from "react-hook-form";
import { FaRegFileAlt } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { FiTrash } from "react-icons/fi";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
  DayOfWeekDescriptions,
  getClientDay,
} from "common/domain/enum/day_of_week_enum";
import { useLoading } from "components/loading/loading_context";
import { LocationCompanyEntity } from "common/domain/entity/location_company_entity";
import { ServiceEntity } from "common/domain/entity/service_entity";
import { useAddress } from "common/context/address_context";
import { ServicePriceEntity } from "common/domain/entity/service_price_entity";
import { useNavigate } from "react-router-dom";
import { ServiceAppointmentEntity } from "common/domain/entity/service_appointment_entity";
import { useCard } from "components/context_api/shopping_card_context";
import { getServiceAppointmentEmergencyApi } from "data/api/service_appointment_emergency/get_service_appointment_api";
import { toast } from "react-toastify";

import { getAllServicePriceApi } from "data/api/service/get_all_service_price_api";
import { OperationalAddressEntity } from "common/domain/entity/operational_address_entity";
import { OtherCompanyLocationCommand } from "common/domain/command/other_company_location_command";
import { deleteOtherAddressApi } from "data/api/dashboard/other_address/delete";
import { cancelServiceAppointmentEmergencyApi } from "data/api/service_appointment_emergency/cancel_service_appointment_emergency_api";
import { AddShoppingCardCommand } from "common/domain/command/shopping_card/add";
import { APP_ROUTES } from "../../routes/app_route";
import ServiceDropDown from "components/dropDown/service_dropdown";
import ServicePriceDropDown from "components/dropDown/service_price_dropdown";
import { ServiceTypeEnum } from "common/domain/enum/service_type_enum";
import LocationPointHandlerMap from "components/map/locationPointHandlerMap";
import MultiSelectProduct from "components/dropDown/multi-select";
import Switch from "components/switch/switch";
import { ButtonsForm } from "components/signUpButtons/signUpButtons";
import { useTerms } from "components/context_api/terms_and_conditions";
import { useAddShoppingCard } from "data/repository/shopingCard";
import { useGetAllServiceApi } from "data/repository/serviceV2";

type EmergencyServiceFormProps = {
  Id?: number | null;
};

export default function EmergencyServiceForm(props: EmergencyServiceFormProps) {
  const center = {
    lat: 32.733131,
    lng: -117.189472,
  };
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  const [dayOfWeek, setDayOfWeek] = useState<string[]>([
    DayOfWeekDescriptions[getClientDay()],
  ]);

  const [fromTime, setFromTime] = useState<string | null>("18:00");
  const [toTime, setToTime] = useState<string | null>("8:00");

  const convertTimeStringToMinutes = (time: string): number => {
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    return hour * 60 + minute;
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { setLoading } = useLoading();
  const [locations, setLocations] = useState<LocationCompanyEntity[]>([]);
  const [selectedValue, setSelectedValue] = useState<ServiceEntity | null>(
    null
  );
  const { selectedAddresses, refreshAdr } = useAddress();
  const [itemsService, setItemsService] = useState<ServiceEntity[]>([]);
  const [servicesPrice, setservicesPrice] = useState<ServicePriceEntity[]>([]);
  const [selectedPriceValue, setSelectedPriceValue] =
    useState<ServicePriceEntity | null>(null);
  const navigate = useNavigate();
  const [model, setModel] = useState<ServiceAppointmentEntity | null>(null);
  var { refreshCard } = useCard();

  const [adresses, setadresses] = useState<LocationCompanyEntity[]>([]);
  const [formisValid, setFormisValid] = useState<boolean>(false);
  var requestService = useGetAllServiceApi();

  const onAddress = (data: LocationCompanyEntity[]) => {
    setadresses(data);
  };

  useEffect(() => {
    if (selectedAddresses) {
      setValue("locationCount", selectedAddresses.LocationCompany?.length);
      setValue("location", selectedAddresses.LocationCompany);
      setLocations(selectedAddresses.LocationCompany ?? []);
      fetchService();
    }
  }, [setValue, selectedAddresses]);

  const allFields = watch("select");
  const allFields2 = watch("startDate");
  var request = useAddShoppingCard();
  const isLoading = request.loading || requestService.loading;

  useEffect(() => {
    checkFormValidity();
  }, [allFields, allFields2]);

  const checkFormValidity = async () => {
    const isValid = await trigger();
    setFormisValid(isValid);
  };

  function convertMinutesToTime(minutes): string {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutesLeft.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  }
  async function getById(Id: number, services: ServiceEntity[]) {
    try {
      setLoading(true);
      var result = await getServiceAppointmentEmergencyApi(Id);
      result.fold(
        (error) => {
          if (error.message) toast.error(error.message);
        },
        async (data) => {
          var service = services.find((p) => p.Id === data.ProductId);
          setModel(data);
          if (service)
            fetchServicePrice(service, (prices) => {
              initData(data, services, prices);
            });
        }
      );
    } finally {
      setLoading(false);
    }
  }

  function initData(
    entityModel: ServiceAppointmentEntity,
    serviceModel: ServiceEntity[],
    servicesPriceModel: ServicePriceEntity[]
  ) {
    if (entityModel != null) {
      var service = serviceModel.find((p) => p.Id === entityModel.ProductId);
      var servicePrice = servicesPriceModel.find(
        (p) => p.Id === entityModel.ProductPriceId
      );
      setSelectedValue(service!);
      setValue("selectService", service);
      setSelectedPriceValue(servicePrice!);
      setValue("select", servicePrice);
      setFromTime(convertMinutesToTime(entityModel.FromHour));
      setToTime(convertMinutesToTime(entityModel.ToHour));
      setDayOfWeek(entityModel.DayOfWeek?.split(",") ?? []);
    }
    setLocations(selectedAddresses.LocationCompany ?? []);
    setValue("locationCount", selectedAddresses.LocationCompany?.length);
    setValue("location", selectedAddresses.LocationCompany);
  }

  async function fetchService() {
    requestService.call({
      onSuccess: (res) => {
        setItemsService(res.data.filter((e) => e.IsEmergency));
        if (props.Id) {
          getById(props.Id, res.data);
        }
      },
    });
  }

  async function fetchServicePrice(
    service: ServiceEntity,
    onComplete?: (data: ServicePriceEntity[]) => void
  ) {
    try {
      var result = await getAllServicePriceApi(service.Id);
      result.fold(
        (error) => {},
        (data) => {
          setservicesPrice(data);
          setSelectedValue(service);
          if (onComplete) {
            onComplete(data);
          }
        }
      );
    } finally {
    }
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = (data) => {
    setValue("frequency", selectedValue);
    addToShoppingCard(data);
  };

  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleToggleEnrollment = () => {
    setIsEnrolled(!isEnrolled);
  };

  const options = [
    "Cooking Oil Collection",
    "Grease Trap Management",
    "Hydro Line Jetting",
  ];

  function setotherCommand(
    model: OperationalAddressEntity
  ): OtherCompanyLocationCommand {
    var command = new OtherCompanyLocationCommand(
      "",
      model.Lat ?? 0,
      model.Long ?? 0,
      0,
      "",
      model.FirstName ?? "",
      model.LastName ?? "",
      model.LocationPhone ?? "",
      model.Id ?? 0,
      0,
      0,
      model.Address ?? ""
    );
    return command;
  }

  async function deleteOtherAddress(params: number) {
    try {
      setLoading(true);
      var result = await deleteOtherAddressApi(params);
      result.fold(
        (error) => {},
        (data) => {
          refreshAdr();
        }
      );
    } finally {
      setLoading(false);
    }
  }

  async function cancelService(id: number) {
    try {
      setLoading(true);
      var result = await cancelServiceAppointmentEmergencyApi(id);
      result.fold(
        (error) => {
          if (error.message) toast.error(error.message);
        },
        (data) => {
          navigate(-1);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  async function addToShoppingCard(data) {
    try {
      // if (selectedValue.collectionIds.includes(ServiceCollectionConst.Cooking_Oil_Collection)
      //   || selectedValue.collectionIds.includes(ServiceCollectionConst.Grease_Trap_Management_Collection) && adresses.length == 0) {
      //   return toast.error("Pickup point can not be empty");
      // }
      setLoading(true);
      var command: AddShoppingCardCommand = {
        OperationalAddressId: selectedAddresses.Id!,
        ProductPriceId: selectedPriceValue!.Id,
        FrequencyType: selectedPriceValue!.Name,
        ServiceKind: 1,
        LocationCompanyIds: adresses.map((e) => e.Id),
        Qty: 0,
        ProductId: selectedValue!.Id,
        DayOfWeek: dayOfWeek,
        FromHour: convertTimeStringToMinutes(fromTime ?? ""),
        ToHour: convertTimeStringToMinutes(toTime ?? ""),
      };
      request.call({
        data: command,
        onSuccess: (res) => {
          refreshCard();

          if (isEnrolled) {
            navigate(
              `${APP_ROUTES.Enrollservice.replace(
                ":oprAddress",
                selectedAddresses.Id?.toString() ?? ""
              )}?serviceId=${selectedValue!.Id}&type=${selectedValue!.Name}`
            );
          } else {
            navigate(APP_ROUTES.ShoppingCard);
          }
        },
      });
    } finally {
      setLoading(false);
    }
  }

  const { setOpen, isOpen } = useTerms();

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formSection}>
          <label htmlFor="service">Service:</label>
          <div
            className={`${styles.selector} ${
              errors.selectService && styles.inputError
            }`}
          >
            <Controller
              name="selectService"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ServiceDropDown
                  initialValue={selectedValue}
                  options={itemsService}
                  select={"service"}
                  selectValue={(value) => {
                    setSelectedValue(null);
                    if (value) fetchServicePrice(value);
                    setSelectedPriceValue(null);
                    setValue("frequency", null);
                    // setIsEnrolled(!isEnrolled);
                    field.onChange(value);
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <label htmlFor="frequency">Options:</label>
          <div
            className={`${styles.selector} ${
              errors.select && styles.inputError
            }`}
          >
            <Controller
              name="select"
              control={control}
              rules={{ required: true }}
              render={({ field }) =>
                servicesPrice && (
                  <ServicePriceDropDown
                    initialValue={selectedPriceValue}
                    options={servicesPrice}
                    select={"Option"}
                    selectValue={(value) => {
                      setSelectedPriceValue(value);
                      field.onChange(value);
                    }}
                  />
                )
              }
            />
          </div>
        </div>
        {selectedValue &&
          (selectedValue.ServiceType == ServiceTypeEnum.CookingOilCollection ||
            selectedValue.ServiceType ==
              ServiceTypeEnum.GreaseTrapManagement) && (
            <LocationPointHandlerMap
              type={
                selectedValue.ServiceType ==
                ServiceTypeEnum.CookingOilCollection
                  ? "Oil"
                  : "Grease Trap"
              }
              onAddress={(data) => onAddress(data)}
              typeOfButton={"Point"}
            />
          )}

        <MultiSelectProduct
          label="Preferred Days"
          disable={true}
          refresh={(res) => {
            // setDayOfWeek(res);
          }}
          selected={dayOfWeek}
        />

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <label className={styles.label} htmlFor="DayOfWeek">
            Range:
          </label>

          <TimePicker
            disableClock={true}
            onChange={setFromTime}
            value={fromTime}
          />
          <label className={styles.labelFont} style={{ minWidth: 0 }}>
            to:
          </label>
          <TimePicker disableClock={true} onChange={setToTime} value={toTime} />
        </div>
        <div className={styles.agreementText}>
          <div className={styles.textWrapper}>
            {
              <>
                <Switch active={true} onChange={() => {}} />
                <span className={styles.privacyPolicyText}>
                  I agree with{" "}
                  <a
                    onClick={() => {
                      setOpen(!isOpen);
                    }}
                  >
                    {" "}
                    Terms and Conditions
                  </a>{" "}
                  and for this service
                </span>
              </>
            }
          </div>
          <div className={styles.question}>
            <Switch active={false} onChange={handleToggleEnrollment} />
            <span>Enroll Me to Repeating Services</span>
          </div>
        </div>
        <div className={styles.submitButtons}>
          {props.Id == null ? (
            <ButtonsForm
              loading={isLoading}
              isActive={formisValid}
              nameOfButton={"Place Order"}
              status={"save"}
              onClick={handleSubmit(onSubmit)}
            />
          ) : (
            <ButtonsForm
              isActive={formisValid}
              nameOfButton={"Cancel Service"}
              status={"cancel"}
              onClick={() => cancelService(props.Id!)}
            />
          )}
        </div>

        {/* <SignUpButtons nameOfButton={"Place Order"} iconOfButton={<FaRegFileAlt size={24} />}></SignUpButtons> */}
      </form>
    </>
  );
}
