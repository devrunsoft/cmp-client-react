"use client";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FiTrash } from "react-icons/fi";
import { LiaEdit } from "react-icons/lia";
import { GoPlusCircle } from "react-icons/go";

import React, { useEffect, useState } from "react";
import styles from "./profileEditForm.module.css";

import { CgSpinner } from "react-icons/cg";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { CompanyEntity } from "common/domain/entity/company_entity";
import { StateStatus, StateStatusExtension } from "state/state_status";
import { OperationalAddressEntity } from "common/domain/entity/operational_address_entity";
import { BilingInformationEntity } from "common/domain/entity/billing_information_entity";
import { getCompany } from "data/api/register/company/get";
import { getBilling } from "data/api/register/bilingInformation/get";
import { OtherCompanyLocationCommand } from "common/domain/command/other_company_location_command";
import { EditProfileCommand } from "common/domain/command/edit_profile_command";
import { editCompany } from "data/api/register/company/edit";
import { deleteOperationalAddress } from "data/api/dashboard/operationalAddress/delete";
import { deleteOtherAddressApi } from "data/api/dashboard/other_address/delete";
import PaymentAddressCm from "cmp-core/src/Component/PaymentAddress/PaymentAddress";
import AddAddressMap from "components/map/AddAddressMap";
import { useLoading } from "components/loading/loading_context";
import AddPointMap from "components/map/addPointMap";
import { mapLocationCompanyEntityToCommand } from "common/domain/mapper/location_comapny_mapper";
import { EditProfileButtons } from "components/signUpButtons/signUpButtons";
import PhotoUpload from "components/photoUpload/photoUpload";
import { getAllOperationalAddress } from "data/api/dashboard/operationalAddress/get_all";

const ProfileEditForm = () => {
  const [company, setCompanyEntity] = useState<CompanyEntity | null>(null);
  const [state, setState] = useState<StateStatus>(StateStatus.Initial);
  const [stateLocation, setStateLocation] = useState<StateStatus>(
    StateStatus.Initial
  );
  const [operationalAddress, setOperationalAddress] = useState<
    OperationalAddressEntity[]
  >([]);
  const [bilingInformation, setBilingInformation] =
    useState<BilingInformationEntity | null>(null);
  const [openEditOtherAddressModal, setOpenEditOtherAddressModal] = useState<
    number | null
  >(null);
  const [openEditOprAddressModal, setOpenEditOprAddressModal] = useState<
    number | null
  >(null);
  const { setLoading } = useLoading();

  var initialEditData = {
    companyName: company?.CompanyName,
    primaryFirstName: company?.PrimaryFirstName,
    primaryLastName: company?.PrimaryLastName,
    phone: company?.PrimaryPhonNumber,
    email: company?.BusinessEmail,
    position: company?.Position,
    secondaryFirstName: company?.SecondaryFirstName,
    secondaryLastName: company?.SecondaryLastName,
    secondaryPhone: company?.SecondaryPhoneNumber,
    billingAddress: "",
    addresses: operationalAddress || null,
    city: "",
    postalCode: "",
    state: "",
  };

  useEffect(() => {
    fetchCompany();
    fetchLocation();
    fetchBilling();
  }, []);

  async function fetchCompany() {
    var result = await getCompany();
    result.fold(
      (error) => {},
      (data) => {
        setValue("phone", data.PrimaryPhonNumber);
        setValue("secondaryPhone", data.SecondaryPhoneNumber);
        setCompanyEntity(data);
        setState(StateStatus.Success);
      }
    );
  }
  async function fetchBilling() {
    var result = await getBilling();
    result.fold(
      (error) => {},
      (data) => {
        if (data != null) {
          setBilingInformation(data);
          setValue("billingAddress", data.Address);
          setValue("postalCode", data.ZIPCode);
          setValue("city", data.City);
          setValue("state", data.State);
        }
      }
    );
  }

  async function fetchLocation() {
    setStateLocation(StateStatus.Loading);
    var result = await getAllOperationalAddress();
    result.fold(
      (error) => {},
      (data) => {
        setOperationalAddress(data);
        setStateLocation(StateStatus.Success);
      }
    );
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialEditData,
  });

  // const [data, setData] = useState(initialEditData);
  // const [modalIsOpen, setModalIsOpen] = useState(initialEditData.addresses.map(() => ({ operational: false, oilContainer: false, greaseTrap: false })));

  const [modalIsOpenNew, setModalIsOpenNew] = useState({
    operational: false,
    oilContainer: false,
    greaseTrap: false,
  });

  const openModalNew = (type) => {
    setModalIsOpenNew((prevState) => ({ ...prevState, [type]: true }));
  };
  const closeModalNew = (type) => {
    setModalIsOpenNew((prevState) => ({ ...prevState, [type]: false }));
  };

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

  const getOperationalCenter = (index) => {
    const operationalAddressSet = initialEditData.addresses[index];
    return { lat: operationalAddressSet.Lat, lng: operationalAddressSet.Long };
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      var command = new EditProfileCommand(
        data.companyName,
        data.primaryFirstName,
        data.primaryLastName,
        data.phone,
        data.position,
        data.secondaryFirstName,
        data.secondaryLastName,
        data.secondaryPhone,
        data.billingAddress,
        data.city,
        data.postalCode,
        data.state
      );
      var result = await editCompany(command);
      result.fold(
        (error) => {},
        (data) => {
          setCompanyEntity(data);
        }
      );
    } finally {
      setLoading(false);
    }
  };

  async function deleteOprAddress(params: number) {
    try {
      setLoading(true);
      var result = await deleteOperationalAddress(params);
      result.fold(
        (error) => {},
        (data) => {
          fetchLocation();
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
          fetchLocation();
        }
      );
    } finally {
      setLoading(false);
    }
  }

  const sanitizePhoneNumber = (value) => {
    return value.replace(/\D/g, "");
  };

  return (
    <>
      {StateStatusExtension.from(state).isSuccess() ? (
        <div className={styles.container}>
          {company&&<PhotoUpload model={company} />}
          <h3>Basic Information</h3>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formSection}>
              <label htmlFor="companyName">Company name: </label>
              <input
                type="text"
                id="companyName"
                defaultValue={initialEditData.companyName}
                className={`${styles.formInput} ${
                  errors.companyName && styles.inputError
                }`}
                placeholder="Company name"
                // name="companyName"
                {...register("companyName", { required: true })}
              />
            </div>

            <div className={styles.formSection}>
              <label htmlFor="contactPerson">Primary contact person: </label>
              <div className={styles.personInput}>
                <input
                  id="primaryFirstName"
                  className={`${styles.formInput} ${
                    errors.primaryFirstName && styles.inputError
                  }`}
                  defaultValue={initialEditData.primaryFirstName}
                  type="text"
                  placeholder="First Name"
                  {...register("primaryFirstName", { required: true })}
                />
                <input
                  id="primaryLastName"
                  className={`${styles.formInput} ${
                    errors.primaryLastName && styles.inputError
                  }`}
                  defaultValue={initialEditData.primaryLastName}
                  type="text"
                  placeholder="Last Name"
                  {...register("primaryLastName", { required: true })}
                />
              </div>
            </div>

            <div className={styles.formSection}>
              <label htmlFor="phoneNumber">Contact Phone Number: </label>
              <Controller
                name="phone"
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
                      errors.phone
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
            </div>

            <div className={styles.formSection}>
              <label htmlFor="email">Business Email: </label>
              <input
                type="text"
                id="email"
                placeholder="Business Email"
                className={`${styles.disableInput} ${
                  errors.email && styles.inputError
                }`}
                defaultValue={initialEditData.email}
                // name="email"
                readOnly={true}
                disabled={true}
                autoComplete="email"
              />
            </div>

            <div className={styles.formSection}>
              <label htmlFor="email">Referred by: </label>
              <input
                type="text"
                placeholder="---"
                className={`${styles.disableInput} ${
                  errors.email && styles.inputError
                }`}
                defaultValue={company?.ReferredBy}
                // name="email"
                readOnly={true}
                disabled={true}

              />
            </div>

            <div className={styles.formSection}>
              <label htmlFor="email">Account number: </label>
              <input
                type="text"
                placeholder="---"
                className={`${styles.disableInput} ${
                  errors.email && styles.inputError
                }`}
                defaultValue={company?.AccountNumber}
                // name="email"
                readOnly={true}
                disabled={true}

              />
            </div>

            <div className={styles.formSection}>
              <label htmlFor="position">Position: </label>
              <input
                type="text"
                id="position"
                className={`${styles.formInput} ${
                  errors.position && styles.inputError
                }`}
                defaultValue={initialEditData.position}
                placeholder="Position"
                // name="position"
                {...register("position", { required: true })}
              />
            </div>

            <div className={styles.formSection}>
              <label htmlFor="secondContactPerson">
                Secondary contact person:{" "}
              </label>
              <div className={styles.personInput}>
                <input
                  id="secondaryFirstName"
                  className={`${styles.formInput} ${
                    errors.secondaryFirstName && styles.inputError
                  }`}
                  defaultValue={initialEditData.secondaryFirstName}
                  type="text"
                  placeholder="First Name"
                  {...register("secondaryFirstName", { required: false })}
                />
                <input
                  id="secondaryLastName"
                  className={`${styles.formInput} ${
                    errors.secondaryLastName && styles.inputError
                  }`}
                  defaultValue={initialEditData.secondaryLastName}
                  type="text"
                  placeholder="Last Name"
                  {...register("secondaryLastName", { required: false })}
                />
              </div>
            </div>

            <div className={styles.formSection}>
              <label htmlFor="secondaryPhone">Secondary phone number: </label>
              <Controller
                name="secondaryPhone"
                control={control}
                rules={{
                  validate: (value) => {
                    if (!value || value.length == 0) {
                      return true;
                    }
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
                      errors.secondaryPhone
                        ? styles.numberInputError
                        : styles.numberInput
                    }
                    defaultCountry="US"
                    placeholder="Enter secondary phone number"
                    onChange={(value) => field.onChange(value)}
                    maxLength={14}
                  />
                )}
              />
            </div>
            <br />
            <h3>Professional Information</h3>

            <PaymentAddressCm
              onSelectAddress={(
                address,
                latitude,
                longitude,
                city,
                postalCode,
                state
              ) => {}}
              register={register}
              setValue={setValue}
              errors={errors}
              defaultValue={bilingInformation}
            />
            {StateStatusExtension.from(stateLocation).isSuccess() &&
              initialEditData.addresses.map(
                (operationalAddress, groupIndex) => (
                  <React.Fragment key={`address-group-${groupIndex}`}>
                    <p>
                      {" "}
                      Location {groupIndex + 1} - {operationalAddress.Name}:{" "}
                    </p>
                    <div className={styles.formSection}>
                      <label htmlFor={`operational-${groupIndex}`}>
                        Operational address:{" "}
                      </label>
                      <div className={styles.informSection}>
                        <div className={styles.fakeInput}>
                          <div className={styles.textContainer}>
                            {operationalAddress.Name}
                            <p className={styles.addressInfo}>
                              {operationalAddress.Address}
                            </p>
                          </div>
                          <div className={styles.inputIconButton}>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenEditOprAddressModal(
                                  operationalAddress.Id!
                                )
                              }
                            >
                              <LiaEdit
                                size={26}
                                style={{ color: "rgba(76, 142, 59, 1)" }}
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                deleteOprAddress(operationalAddress.Id!)
                              }
                            >
                              <FiTrash
                                size={22}
                                style={{ color: "rgba(76, 142, 59, 1)" }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <AddAddressMap
                        onSubmitAddress={(data) => {
                          fetchLocation();
                        }}
                        isOpen={
                          openEditOprAddressModal == operationalAddress?.Id
                        }
                        onClose={() => setOpenEditOprAddressModal(null)}
                        center={{
                          lat: operationalAddress.Lat!,
                          lng: operationalAddress.Long!,
                        }}
                        model={operationalAddress}
                      />
                    </div>

                    <div className={styles.formSection}>
                      <label htmlFor="oilContainer">
                        Oil Container Location:{" "}
                      </label>
                      <div className={styles.informSection}>
                        {operationalAddress.LocationCompany?.map(
                          (item, index) =>
                            item.Type == 1 && (
                              <div
                                key={`oilContainer-${index}`}
                                className={styles.fakeInput}
                              >
                                {item.Name}, {item.Lat}, {item.Long}
                                <div className={styles.inputIconButton}>
                                  <button type="button">
                                    <LiaEdit
                                      onClick={() => {
                                        setOpenEditOtherAddressModal(item.Id);
                                      }}
                                      size={26}
                                      style={{ color: "rgba(76, 142, 59, 1)" }}
                                    />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      deleteOtherAddress(item.Id);
                                    }}
                                  >
                                    <FiTrash
                                      size={22}
                                      style={{ color: "rgba(76, 142, 59, 1)" }}
                                    />
                                  </button>
                                </div>
                                <AddPointMap
                                  onSubmitAddress={(data) => {
                                    fetchLocation();
                                  }}
                                  isOpen={openEditOtherAddressModal == item?.Id}
                                  onClose={() => {
                                    setOpenEditOtherAddressModal(null);
                                  }}
                                  center={getOperationalCenter(groupIndex)}
                                  type={"Oil"}
                                  typeOfButton={"LOCATION"}
                                  oprId={operationalAddress?.Id}
                                  model={mapLocationCompanyEntityToCommand(
                                    item
                                  )}
                                  id={item.Id}
                                />
                              </div>
                            )
                        )}
                        <button
                          type="button"
                          id={`oilContainer-${groupIndex}`}
                          onClick={() => {
                            openModalNew("oilContainer");
                          }}
                          className={styles.addLocationButton}
                        >
                          {" "}
                          <GoPlusCircle size={"24"} /> ADD LOCATION
                        </button>
                        <AddPointMap
                          onSubmitAddress={(data) => {
                            fetchLocation();
                          }}
                          isOpen={modalIsOpenNew.oilContainer}
                          onClose={() => {
                            closeModalNew("oilContainer");
                          }}
                          center={getOperationalCenter(groupIndex)}
                          type={"Oil"}
                          model={setotherCommand(operationalAddress)}
                          typeOfButton={"LOCATION"}
                          oprId={operationalAddress?.Id}
                        />
                      </div>
                    </div>

                    <div className={styles.formSection}>
                      <label htmlFor={`greaseTrap-${groupIndex}`}>
                        Grease Trap Location:{" "}
                      </label>
                      <div className={styles.informSection}>
                        {operationalAddress.LocationCompany?.map(
                          (item, index) =>
                            item.Type == 2 && (
                              <div
                                key={`greaseTrap-${index}`}
                                className={styles.fakeInput}
                              >
                                {item.Name}, {item.Lat}, {item.Long}
                                <div className={styles.inputIconButton}>
                                  <button
                                    onClick={() => {
                                      setOpenEditOtherAddressModal(item.Id);
                                    }}
                                    type="button"
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
                                    fetchLocation();
                                  }}
                                  isOpen={openEditOtherAddressModal == item?.Id}
                                  onClose={() => {
                                    setOpenEditOtherAddressModal(null);
                                  }}
                                  center={getOperationalCenter(groupIndex)}
                                  type={"Grease Trap"}
                                  typeOfButton={"LOCATION"}
                                  oprId={operationalAddress?.Id}
                                  model={mapLocationCompanyEntityToCommand(
                                    item
                                  )}
                                  id={item.Id}
                                />
                              </div>
                            )
                        )}
                        <button
                          type="button"
                          id={`greaseTrap-${groupIndex}`}
                          onClick={() => {
                            openModalNew("greaseTrap");
                          }}
                          className={styles.addLocationButton}
                        >
                          <GoPlusCircle size={"24"} /> ADD LOCATION
                        </button>
                        <AddPointMap
                          onSubmitAddress={(data) => {
                            fetchLocation();
                          }}
                          isOpen={modalIsOpenNew.greaseTrap}
                          onClose={() => {
                            closeModalNew("greaseTrap");
                          }}
                          center={getOperationalCenter(groupIndex)}
                          type={"Grease Trap"}
                          typeOfButton={"LOCATION"}
                          model={setotherCommand(operationalAddress)}
                          oprId={operationalAddress?.Id}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                )
              )}
            <EditProfileButtons
              nameOfButton={"Save"}
              status={"save"}
              iconOfButton={null}
              isActive={true}
            />
            {/* <button type="submit">Submit</button> */}
          </form>
        </div>
      ) : (
        <div>
          <TailSpin
            visible={true}
            width="40"
            strokeWidth="5"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      )}
    </>
  );
};

export default ProfileEditForm;
