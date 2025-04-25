"use client";
import styles from "./services.module.css";
import { FaRegFileAlt } from "react-icons/fa";
import { IoListCircleOutline, IoLogInOutline } from "react-icons/io5";

import React, { useEffect, useState } from "react";
import { useAddress } from "common/context/address_context";
import { ServiceAppointmentEntity } from "common/domain/entity/service_appointment_entity";
import { ServiceEntity } from "common/domain/entity/service_entity";
import { useNavigate } from "react-router-dom";
import { useLoading } from "components/loading/loading_context";
import { getAllServiceAppointmentApi } from "data/api/service_appointment/get_all_service_appointment_api";
import { getAllServiceApi } from "data/api/service/get_all_service_api";
import { APP_ROUTES } from "../../routes/app_route";
import { Link } from "@mui/material";
import LocationSelect from "components/locationSelect/locationSelect";

export default function Services() {
  const { selectedAddresses } = useAddress();
  const [appointmentservices, setAppointmentservices] = useState<
    ServiceAppointmentEntity[]
  >([]);
  const [services, setservices] = useState<ServiceEntity[]>([]);
  const [itemsService, setItemsService] = useState<ServiceEntity[]>([]);
  const [itemsProduct, setItemsProduct] = useState<ServiceEntity[]>([]);
  const navigate = useNavigate();

  const { setLoading } = useLoading();
  useEffect(() => {
    if (selectedAddresses) {
      fetchAppointmentService();
    }
    return () => {
      setLoading(false);
    };
  }, [selectedAddresses]);

  async function fetchAppointmentService() {
    try {
      setLoading(true);
      var result = await getAllServiceAppointmentApi(selectedAddresses.Id!);
      result.fold(
        (error) => {
          setLoading(false);
          fetchService([]);
        },
        (data) => {
          setAppointmentservices(data.filter((e) => !e.IsEmegency));
          fetchService(data);
        }
      );
    } finally {
    }
  }

  async function fetchService(serviceAppointment: ServiceAppointmentEntity[]) {
    try {
      setLoading(true);
      var result = await getAllServiceApi();
      result.fold(
        (error) => {},
        (data) => {
          setItemsService(data.filter((e) => e.Type == 1));
          setItemsProduct(data.filter((e) => e.Type == 2));
        }
      );
    } finally {
      setLoading(false);
    }
  }

  function onRoute(
    item: ServiceEntity,
    serviceappoitnment: ServiceAppointmentEntity
  ) {
    if (serviceappoitnment)
      navigate(
        `${APP_ROUTES.Enrollservice.replace(
          ":oprAddress",
          selectedAddresses.Id?.toString() ?? ""
        )}?data=${serviceappoitnment.Id}&serviceId=${item.Id}&type=${
          item.Name
        }`,
        undefined
      );
    else
      navigate(
        `${APP_ROUTES.Enrollservice.replace(
          ":oprAddress",
          selectedAddresses.Id?.toString() ?? ""
        )}?serviceId=${item.Id}&type=${item.Name}`
      );
  }

  function onRouteAll(
    item: ServiceEntity,
    serviceappoitnment: ServiceAppointmentEntity
  ) {
    if (serviceappoitnment)
      navigate(
        `${APP_ROUTES.ServiceItem}?data=${serviceappoitnment.Id}&serviceId=${item.Id}&type=${item.Name}`,
        undefined
      );
    else
      navigate(
        `${APP_ROUTES.ServiceItem}?serviceId=${item.Id}&type=${item.Name}`
      );
  }

  function existService(service: ServiceEntity[], id: number): boolean {
    return service.find((appointment) => appointment.Id === id) != null;
  }

  function hasRegistered(service: ServiceEntity): ServiceAppointmentEntity {
    return appointmentservices.find((e) => e.ProductId == service.Id)!;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.sectLocation}>
          <img
            src="/assets/fluent_location-regular.svg"
            alt="location icon"
            width={36}
            height={36}
            style={{ width: "auto", height: "auto" }}
          />
          <LocationSelect />
        </div>
        <div className={styles.scrollStaff}>
          <div className={styles.mainText}>
            <img
              src="/assets/services_icon.svg"
              alt="group"
              width={36}
              height={36}
              loading="lazy"
            />
            <h1>Services</h1>
          </div>
          <div className={styles.main}>
            <div className={styles.cardsContainer}>
              {itemsService.map((item, index) => {
                var serviceAppoitnemtn = hasRegistered(item);
                var status = serviceAppoitnemtn != null;
                return (
                  <div className={styles.card} key={index + "-service"}>
                    <div className={styles.mainInfo}>
                      <div className={styles.iconStyle}>
                        {/* {item.image} */}
                        <p>{item.Name}</p>
                      </div>
                      {!status ? null : (
                        <>
                          <div className={styles.smallStaff}>
                            Frequency:{" "}
                            <p>{serviceAppoitnemtn.FrequencyType}x yr</p>
                          </div>
                          <div className={styles.smallStaff}>
                            Start date:{" "}
                            <p>
                              {new Date(
                                serviceAppoitnemtn.StartDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <div
                        className={styles.subsButtom}
                        key={index + "-service-enroll"}
                        onClick={() => onRoute(item, serviceAppoitnemtn)}
                      >
                        {status ? "enrolled" : "Sign Up"}
                        {status ? (
                          <FaRegFileAlt size={17} />
                        ) : (
                          <IoLogInOutline size={17} />
                        )}
                      </div>
                      &nbsp;
                      <div
                        className={styles.subsButtom}
                        key={index + "-service-seeAll"}
                        onClick={() => onRouteAll(item, serviceAppoitnemtn)}
                      >
                        {"See All"}
                        {<IoListCircleOutline size={17} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.scrollStaff}>
          <div className={styles.mainText}>
            <img
              src="/assets/services_icon.svg"
              alt="group"
              width={36}
              height={36}
              loading="lazy"
            />
            <h1>Products</h1>
          </div>
          <div className={styles.main}>
            <div className={styles.cardsContainer}>
              {itemsProduct.map((item, index) => {
                var serviceAppoitnemtn = hasRegistered(item);
                var status = serviceAppoitnemtn != null;
                return (
                  <div className={styles.card} key={index + "-product"}>
                    <div className={styles.mainInfo}>
                      <div className={styles.iconStyle}>
                        {/* {item.image} */}
                        <p>{item.Name}</p>
                      </div>
                      {!status ? null : (
                        <>
                          <div className={styles.smallStaff}>
                            Frequency:{" "}
                            <p>{serviceAppoitnemtn.FrequencyType}x yr</p>
                          </div>
                          <div className={styles.smallStaff}>
                            Start date:{" "}
                            <p>
                              {new Date(
                                serviceAppoitnemtn.StartDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <div
                        className={styles.subsButtom}
                        key={index + "-product-enroll"}
                        onClick={() => onRoute(item, serviceAppoitnemtn)}
                      >
                        {status ? "Bought" : "Buy Now"}
                        {status ? (
                          <FaRegFileAlt size={17} />
                        ) : (
                          <IoLogInOutline size={17} />
                        )}
                      </div>
                      &nbsp;
                      <div
                        className={styles.subsButtom}
                        key={index + "-product-seeAll"}
                        onClick={() => onRouteAll(item, serviceAppoitnemtn)}
                      >
                        {"See All"}
                        {<IoListCircleOutline size={17} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.emergencyService}>
        <Link
          key="unique_key"
          href={APP_ROUTES.EnrollEmergencyService.replace(
            ":oprAddress",
            selectedAddresses?.Id?.toString() ?? ""
          )}
          className={`${styles.emerButton} ${styles.subsButtom}`}
        >
          Emergency Service
          <img
            src="/assets/emergency_serc_icon.svg"
            width={25}
            height={25}
            alt="emergency"
          />
        </Link>
      </div>
    </div>
  );
}
