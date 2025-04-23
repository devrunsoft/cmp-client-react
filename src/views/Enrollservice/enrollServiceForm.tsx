"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./enrollServiceForm.module.css";
import { useForm, Controller, FieldValues } from "react-hook-form";

import { LuCalendar } from "react-icons/lu";
import { GoPlusCircle } from "react-icons/go";
import { FiTrash } from "react-icons/fi";
import { LiaEdit } from "react-icons/lia";
import { IoLogInOutline } from "react-icons/io5";
import { confirmAlert } from "react-confirm-alert";
import { Box, Grid, TextField } from "@mui/material";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ServicePriceEntity } from "common/domain/entity/service_price_entity";
import { ServiceEntity } from "common/domain/entity/service_entity";
import { InvoiceEntity } from "common/domain/entity/invoice_entity";
import { LocationCompanyEntity } from "common/domain/entity/location_company_entity";
import { useLoading } from "components/loading/loading_context";
import { useNavigate } from "react-router-dom";
import { useAddress } from "common/context/address_context";
import { useCard } from "components/context_api/shopping_card_context";
import { ServiceAppointmentEntity } from "common/domain/entity/service_appointment_entity";
import { getServiceApi } from "data/api/service/get_all_service_by_id_api";
import { getAllServicePriceApi } from "data/api/service/get_all_service_price_api";
import { toast } from "react-toastify";
import { AddShoppingCardCommand } from "common/domain/command/shopping_card/add";
import { addShoppingCard } from "data/api/shopping_card/add";
import { getServiceAppointmentApi } from "data/api/service_appointment/get_service_appointment_api";
import { APP_ROUTES } from "../../routes/app_route";
import { cancelServiceAppointmentApi } from "data/api/service_appointment/camcel_service_appointment_api";
import ShowInvoice from "components/Invoice/invoice_modal";
import ServicePriceDropDown from "components/dropDown/service_price_dropdown";
import LocationPointHandlerMap from "components/map/locationPointHandlerMap";
import MultiSelectProduct from "components/dropDown/multi-select";
import { ButtonsForm } from "components/signUpButtons/signUpButtons";
import Switch from "components/switch/switch";

type EnrollServiceFormProps = {
  Id?: number | null;
  serviceId: number;
};

const EnrollServiceForm = (prop: EnrollServiceFormProps) => {
  const [servicesPrice, setservicesPrice] = useState<ServicePriceEntity[]>([]);
  const [services, setservices] = useState<Partial<ServiceEntity>>({});

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    trigger,
    watch,
  } = useForm();

  //
  const [fromTime, setFromTime] = useState<string | null>("18:00");
  const [toTime, setToTime] = useState<string | null>("8:00");
  const convertTimeStringToMinutes = (time: string): number => {
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    return hour * 60 + minute;
  };
  function convertMinutesToTime(minutes): string {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutesLeft.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  }

  const [startDate, setStartDate] = useState<Date | null>(null);

  const [invoiceModalIsOpen, setInvoiceModalIsOpen] = useState(false);
  const [invoiceModel, setInvoiceModel] = useState<InvoiceEntity | null>(null);
  const [formisValid, setFormisValid] = useState<boolean>(false);

  const [locations, setLocations] = useState<LocationCompanyEntity[]>([]);
  const [selectedValue, setSelectedValue] = useState<ServicePriceEntity | null>(
    null
  );

  const [dayOfWeek, setDayOfWeek] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const { setLoading } = useLoading();
  const { selectedAddresses, refreshAdr } = useAddress();
  const navigate = useNavigate();
  var { itemsCard, refreshCard } = useCard();
  // const [model, setModel] = useState<ServiceAppointmentEntity>(null);
  // const [collection, setcollection] = useState<String[]>([]);

  const [adresses, setadresses] = useState<LocationCompanyEntity[]>([]);

  const onAddress = (data: LocationCompanyEntity[]) => {
    setadresses(data);
  };
  // const [fromHour, setFromHour] = useState("");
  // const [toHour, setToHour] = useState("");

  function convertTimeTostring(totalMinutes: number): string {
    const convertedHours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, "0");
    const convertedMinutes = (totalMinutes % 60).toString().padStart(2, "0");

    const convertedTime = `${convertedHours}:${convertedMinutes}`;
    return convertedTime;
  }
  useEffect(() => {
    if (selectedAddresses) {
      fetchServicePrice();
      fetchService();
    }
  }, [selectedAddresses]);

  const allFields = watch("select");
  const allFields2 = watch("startDate");

  useEffect(() => {
    checkFormValidity();
  }, [allFields, allFields2]);

  const checkFormValidity = async () => {
    const isValid = await trigger();
    setFormisValid(isValid);
  };

  async function fetchService() {
    try {
      setLoading(true);
      var result = await getServiceApi(prop.serviceId);
      result.fold(
        (error) => {},
        (data) => {
          setservices(data);
          // setcollection(data.collectionIds);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  async function fetchServicePrice() {
    try {
      setLoading(true);
      var result = await getAllServicePriceApi(prop.serviceId);
      result.fold(
        (error) => {
          setLoading(false);
        },
        (data) => {
          setservicesPrice(data);
          if (prop.Id) {
            getById(prop.Id, data);
          } else {
            initData(null, data);
            setLoading(false);
          }
        }
      );
    } finally {
    }
  }

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  async function getById(Id: number, services: ServicePriceEntity[]) {
    try {
      setLoading(true);
      var result = await getServiceAppointmentApi(Id);
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (data) => {
          // setModel(data);
          initData(data, services);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  async function registerService(data) {
    if (
      (services.ServiceType == 1 || services.ServiceType == 2) &&
      adresses.length == 0
    ) {
      return toast.error("Pickup point can not be empty");
    }
    if (dayOfWeek.length == 0) {
      return toast.error("At least one day must be selected.");
    }
    try {
      setLoading(true);
      var command: AddShoppingCardCommand = {
        OperationalAddressId: selectedAddresses.Id!,
        ProductPriceId: selectedValue!.Id,
        StartDate: startDate!,
        FrequencyType: selectedValue!.Name!,
        ServiceKind: 1,
        LocationCompanyIds: adresses.map((e) => e.Id),
        Qty: 0,
        ProductId: services.Id!,
        DayOfWeek: dayOfWeek,
        FromHour: convertTimeStringToMinutes(fromTime ?? ""),
        ToHour: convertTimeStringToMinutes(toTime ?? ""),
      };

      var result = await addShoppingCard(command);
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (data) => {
          navigate(-1);
          refreshCard();
          setTimeout(() => {
            navigate(APP_ROUTES.ShoppingCard, { replace: true });
          }, 100);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  let closeDialog;
  const confirmDelete = (id: number) => {
    confirmAlert({
      title: "Confirm to cancel",
      message: "Are you sure you want to cancel this invoice?",
      buttons: [
        {
          label: "Yes",
          onClick: () => cancelService(id),
        },
        {
          label: "No",
          onClick: () => console.log("Delete canceled"),
        },
      ],
      customUI: ({ onClose }) => {
        closeDialog = onClose; // Capture onClose to programmatically close
        return (
          <div className="react-confirm-alert">
            <div />
            <div className="react-confirm-alert-body">
              <h1>Confirm to cancel</h1>
              <p>Are you sure you want to cancel this service?</p>
              <div className={styles.container}>
                <button
                  className={styles.cancelService}
                  onClick={() => {
                    onClose();
                    cancelService(id);
                  }}
                >
                  Yes
                </button>
                <button className={styles.signUp} onClick={onClose}>
                  No
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  async function cancelService(id: number) {
    try {
      setLoading(true);
      var result = await cancelServiceAppointmentApi(id);
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (data) => {
          navigate(-1);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  function initData(
    entityModel: ServiceAppointmentEntity | null,
    services: ServicePriceEntity[]
  ) {
    if (entityModel != null) {
      setValue(
        "select",
        services.find((p) => p.Id === entityModel.ProductPriceId)
      );
      setSelectedValue(
        services.find((p) => p.Id === entityModel.ProductPriceId)!
      );
      setValue("startDate", new Date(entityModel.StartDate));
      setStartDate(new Date(entityModel.StartDate));
      setFromTime(convertMinutesToTime(entityModel.FromHour));
      setToTime(convertMinutesToTime(entityModel.ToHour));
      setDayOfWeek(entityModel.DayOfWeek?.split(",") ?? []);
    }
    setLocations(selectedAddresses.LocationCompany ?? []);
    setValue("locationCount", selectedAddresses.LocationCompany?.length);
    setValue("location", selectedAddresses.LocationCompany);
  }

  // async function deleteOtherAddress(params: number) {
  //     try {
  //         setLoading(true);
  //         var result = await deleteOtherAddressApi(params);
  //         result.fold(
  //             (error) => {
  //             },
  //             (data) => {
  //                 refreshAdr();
  //             }
  //         );
  //     } finally {
  //         setLoading(false);
  //     }
  // }

  return (
    <>
      {invoiceModel && (
        <ShowInvoice
          isOpen={invoiceModalIsOpen}
          onClose={() => {
            setInvoiceModalIsOpen(false);
          }}
          model={invoiceModel}
        />
      )}
      {
        <div className={styles.form}>
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor="frequency">
              {!services ? "" : services.Type == 1 ? "Frequency:" : "Quantaty:"}
            </label>
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
                      initialValue={selectedValue}
                      options={servicesPrice}
                      select={
                        !services
                          ? ""
                          : services.Type == 1
                          ? "frequency"
                          : "Quantaty"
                      }
                      selectValue={(value) => {
                        setSelectedValue(value);
                        field.onChange(value);
                      }}
                    />
                  )
                }
              />
            </div>
          </div>

          {(services.ServiceType == 1 || services.ServiceType == 2) && (
            <LocationPointHandlerMap
              type={services.ServiceType == 1 ? "Oil" : "Grease Trap"}
              onAddress={(data) => onAddress(data)}
              typeOfButton={"Point"}
            />
          )}

          {services.Type == 1 && (
            <div className={styles.formSection}>
              <label className={styles.label} htmlFor="startDate">
                Start date:
              </label>
              <div
                className={`${styles.inputWithButton} ${
                  errors.startDate && styles.inputError
                }`}
              >
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      id="startDate"
                      selected={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                        handleDateChange(date);
                      }}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="Select a date"
                    />
                  )}
                />
                <div className={styles.inputIconButton}>
                  <button
                    type="button"
                    onClick={() => document.getElementById("startDate")?.focus()}
                  >
                    <LuCalendar size={24} />
                  </button>
                </div>
              </div>
            </div>
          )}
          <MultiSelectProduct
            refresh={(res) => {
              setDayOfWeek(res);
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
            <label className={styles.labelFont} htmlFor="DayOfWeek">
              to:
            </label>
            <TimePicker
              disableClock={true}
              onChange={setToTime}
              value={toTime}
            />
          </div>

          <div className={styles.agreementText}>
            <div className={styles.textWrapper}>
              {services.Type == 1 && (
                <div>
                  <Switch active={true} onChange={() => {}} />{" "}
                  <span>
                    I agree with Terms and Conditions for this service
                  </span>
                </div>
              )}
            </div>
          </div>

          {prop.Id == null ? (
            <ButtonsForm
              isActive={formisValid}
              nameOfButton={"Save"}
              status={"save"}
              onClick={handleSubmit(registerService)}
            />
          ) : (
            <ButtonsForm
              isActive={formisValid}
              nameOfButton={"Cancel Service"}
              status={"cancel"}
              onClick={() => confirmDelete(prop.Id!)}
            />
          )}
        </div>
      }
    </>
  );
};

export default EnrollServiceForm;
