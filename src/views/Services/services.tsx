"use client";
import styles from "./services.module.css";
import { FaRegFileAlt, FaSpinner } from "react-icons/fa";
import { IoListCircleOutline, IoLogInOutline } from "react-icons/io5";

import React, { useEffect, useState } from "react";
import { useAddress } from "common/context/address_context";
import {
  ClientServiceAppointment,
  ServiceAppointmentEntity,
} from "common/domain/entity/service_appointment_entity";
import { ServiceEntity } from "common/domain/entity/service_entity";
import { useNavigate } from "react-router-dom";
import { useLoading } from "components/loading/loading_context";

import { APP_ROUTES } from "../../routes/app_route";
import { Link } from "@mui/material";
import LocationSelect from "components/locationSelect/locationSelect";
import { useGetAllServiceAppointmentApi } from "data/repository/service";
import {
  AppDataFetchingWrapper,
  DataFetchingWrapper,
} from "cmp-core/src/DataFetchingWrapper";
import { useGetAllServiceApi } from "data/repository/serviceV2";

import { useRequestTerminate } from "data/repository/requestTerminate";
import { RequestTerminateCommand } from "common/domain/command/requestTerminateCommand";

import TerminateContractDialog from "cmp-core/src/ui/dialog/terminateContract";
import Empty from "cmp-core/src/Empty";
import { TerminateStatusEnum } from "common/domain/enum/terminate_status";

export default function Services() {
  const { selectedAddresses } = useAddress();
  const [appointmentservices, setAppointmentservices] = useState<
    ClientServiceAppointment[]
  >([]);
  const [services, setservices] = useState<ServiceEntity[]>([]);
  const [itemsService, setItemsService] = useState<ServiceEntity[]>([]);
  const [itemsProduct, setItemsProduct] = useState<ServiceEntity[]>([]);
  const navigate = useNavigate();
  var request = useGetAllServiceAppointmentApi(selectedAddresses.Id);
  var requestTerminate = useRequestTerminate();
  var requestService = useGetAllServiceApi();
  const [configDelete, setConfirmDelete] = useState<string | null>(null);

  const isloading = request.loading || requestService.loading;
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
    request.call({
      onSuccess: (res) => {
        setAppointmentservices(res.data);
        fetchService();
      },
    });
  }

  async function TerminateContract(command: RequestTerminateCommand) {
    requestTerminate.call({
      data: command,
      onSuccess: (res) => {
        setConfirmDelete(null);
        fetchAppointmentService();
      },
    });
  }

  async function fetchService() {
    requestService.call({
      onSuccess: (res) => {
        setItemsService(res.data.filter((e) => e.Type == 1));
        setItemsProduct(res.data.filter((e) => e.Type == 2));
      },
    });
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

  // function onRouteAll(
  //   item: ServiceEntity,
  //   serviceappoitnment: ServiceAppointmentEntity
  // ) {
  //   if (serviceappoitnment)
  //     navigate(
  //       `${APP_ROUTES.ServiceItem}?data=${serviceappoitnment.Id}&serviceId=${item.Id}&type=${item.Name}`,
  //       undefined
  //     );
  //   else
  //     navigate(
  //       `${APP_ROUTES.ServiceItem}?serviceId=${item.Id}&type=${item.Name}`
  //     );
  // }

  // function existService(service: ServiceEntity[], id: number): boolean {
  //   return service.find((appointment) => appointment.Id === id) != null;
  // }

  function hasDraft(service: ServiceEntity): ServiceAppointmentEntity | null {
    return (
      appointmentservices.find((e) => e.Draft?.ProductId == service.Id)
        ?.Draft ?? null
    );
  }
  function hasRegistered(
    service: ServiceEntity
  ): ServiceAppointmentEntity | null {
    return (
      appointmentservices.find((e) => e.Current?.ProductId == service.Id)
        ?.Current ?? null
    );
  }
  function hasNext(service: ServiceEntity): ServiceAppointmentEntity | null {
    return (
      appointmentservices.find((e) => e.Next?.ProductId == service.Id)?.Next ??
      null
    );
  }
  function getTerminateStatus(service: ServiceEntity): TerminateStatusEnum {
    return (
      appointmentservices.find((e) => e.ServiceId == service.Id)
        ?.TerminateStatus ?? TerminateStatusEnum.None
    );
  }
  function getInvoiceNumber(service: ServiceEntity): string {
    return (
      appointmentservices.find((e) => e.ServiceId == service.Id)
        ?.InvoiceNumber ?? ""
    );
  }

  if (selectedAddresses.Id == 0) {
    return (
      <Empty
        title="Select an address to continue with service registration."
        mt="60px"
      />
    );
  }

  return (
    <DataFetchingWrapper loading={isloading}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* <div className={styles.sectLocation}>
            <img
              src="/assets/fluent_location-regular.svg"
              alt="location icon"
              width={36}
              height={36}
              style={{ width: "auto", height: "auto" }}
            />
          </div> */}
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
                  const canTerminate = getTerminateStatus(item);
                  var serviceAppoitnemtn = hasRegistered(item);
                  var hasDrafted = hasDraft(item);
                  var next = hasNext(item);
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
                              <p>{serviceAppoitnemtn?.FrequencyType}x yr</p>
                            </div>
                            <div className={styles.smallStaff}>
                              Start Date:{" "}
                              <p>
                                {new Date(
                                  serviceAppoitnemtn!.StartDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            {next != null && (
                              <div className={styles.smallStaff}>
                                Next Service:{" "}
                                <p>
                                  {new Date(
                                    next!.StartDate
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className={styles.boxItem}>
                        {status ? (
                          <div
                            className={styles.subsButtom}
                            key={index + "-service-enroll"}
                            onClick={() => onRoute(item, serviceAppoitnemtn!)}
                          >
                            {status ? "enrolled" : "Request"}
                            {status ? (
                              <FaRegFileAlt size={17} />
                            ) : (
                              <IoLogInOutline size={17} />
                            )}
                          </div>
                        ) : hasDrafted ? (
                          <div
                            className={styles.draftButton}
                            key={index + "-service-enroll"}
                            onClick={() => onRoute(item, hasDrafted!)}
                          >
                            {"Drafted"}
                            {status ? (
                              <FaRegFileAlt size={17} />
                            ) : (
                              <IoLogInOutline size={17} />
                            )}
                          </div>
                        ) : (
                          <div
                            className={styles.subsButtom}
                            key={index + "-service-enroll"}
                            onClick={() => onRoute(item, serviceAppoitnemtn!)}
                          >
                            {status ? "enrolled" : "Request"}
                            {status ? (
                              <FaRegFileAlt size={17} />
                            ) : (
                              <IoLogInOutline size={17} />
                            )}
                          </div>
                        )}
                        &nbsp;
                        {canTerminate == TerminateStatusEnum.CanTerminate && (
                          <div
                            className={styles.subsButtom}
                            key={index + "-service-enroll"}
                            onClick={() =>
                              setConfirmDelete(getInvoiceNumber(item))
                            }
                          >
                            {"edit"}
                            {requestTerminate.loading ? (
                              <FaSpinner
                                size={17}
                                className="animate-spin ml-2"
                              />
                            ) : (
                              <FaRegFileAlt size={17} />
                            )}
                          </div>
                        )}
                        {canTerminate == TerminateStatusEnum.Requested && (
                          <div
                            className={styles.subsButtom}
                            style={{
                              backgroundColor: "#6b7280",
                              color: "white",
                            }}
                            key={index + "-service-enroll"}
                            onClick={() => {
                              // add your logic here, e.g., open request details modal
                            }}
                          >
                            {"view edit request"}
                            {requestTerminate.loading ? (
                              <FaSpinner
                                size={17}
                                className="animate-spin ml-2"
                              />
                            ) : (
                              <FaRegFileAlt size={17} />
                            )}
                          </div>
                        )}
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
                              <p>{serviceAppoitnemtn?.FrequencyType}x yr</p>
                            </div>
                            <div className={styles.smallStaff}>
                              Start date:{" "}
                              <p>
                                {new Date(
                                  serviceAppoitnemtn!.StartDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      <div className={styles.boxItem}>
                        <div
                          className={styles.subsButtom}
                          key={index + "-product-enroll"}
                          onClick={() => onRoute(item, serviceAppoitnemtn!)}
                        >
                          {status ? "Bought" : "Request"}
                          {status ? (
                            <FaRegFileAlt size={17} />
                          ) : (
                            <IoLogInOutline size={17} />
                          )}
                        </div>
                        &nbsp;
                        {/* <div
                        className={styles.subsButtom}
                        key={index + "-product-seeAll"}
                        onClick={() => onRouteAll(item, serviceAppoitnemtn)}
                      >
                        {"See All"}
                        {<IoListCircleOutline size={17} />}
                      </div> */}
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
      <TerminateContractDialog
        onClose={() => setConfirmDelete(null)}
        onConfirm={(reason, comment) => {
          var command: RequestTerminateCommand = {
            InvoiceNumber: configDelete!,
            Message: comment,
            Status: reason,
          };
          TerminateContract(command);
        }}
        open={configDelete != null}
        title="Request"
        body=""
        loading={requestTerminate.loading}
      />
    </DataFetchingWrapper>
  );
}
