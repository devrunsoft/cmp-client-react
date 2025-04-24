import React, { useEffect, useState } from "react";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { SignUpCommand } from "common/domain/command/signUpCommand";
import ActiveLoadingButton from "uikit/src/Button";
import { useSignUpApi } from "data/repository/registerCompany";
import SignUpStep from "uikit/src/Stepper";
import FormHookInputRow from "uikit/src/FormHookInputRow";
import PhoneNumberInput from "uikit/src/Input/PhoneNumber";
import Label from "uikit/src/Label";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import FormHookInput from "uikit/src/FormHookInput";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { StepIndicator } from "..";
import Gap from "uikit/src/Gap";
import { header, saveToken, tokenheader } from "core/src/utils/auth";
import { APP_ROUTES } from "../../../../routes/app_route";
import { useNavigate } from "react-router-dom";

export default function SwitcherAndCompanyInfo({
  setIndex,
}: {
  setIndex?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [state, setState] = useState(null);
  const navigate = useNavigate();
  const request = useSignUpApi();

  const isLoading = request.loading;
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [companyType, setCompanyType] = useState("standalone");

  const handleCompanyTypeChange = (_, newType) => {
    if (newType !== null) {
      setValue("type", newType == "standalone" ? 1 : 2);
      setCompanyType(newType);
    }
  };
  const onSubmit = async (data: SignUpCommand) => {
    console.log(errors);
    request.call({
      data: data,
      onError(d) {
        console.log(d);
      },
      onSuccess: (res) => {
        saveToken(res.data);
        navigate(APP_ROUTES.Activation);
      },
    });
  };

  const Schema: z.ZodType<SignUpCommand> = z
    .object({
      companyName: z.string().min(1, { message: "Company name is required" }),

      primaryFirstName: z
        .string()
        .min(1, { message: "First name is required" }),
      primaryLastName: z.string().min(1, { message: "Last name is required" }),

      PrimaryPhonNumber: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits" }),

      businessEmail: z
        .string()
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" }),

      position: z.string().min(1, { message: "Position is required" }),

      secondaryFirstName: z.string().optional(),
      secondaryLastName: z.string().optional(),

      secondaryPhoneNumber: z
        .string()
        .optional()
        .refine((val) => !val || val.replace(/\D/g, "").length >= 10, {
          message: "Secondary phone number must be at least 10 digits",
        }),

      referredBy: z.string().optional(),
      accountNumber: z.string().optional(),

      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
          message:
            "Password must contain uppercase, lowercase letters and a number",
        }),

      rePassword: z
        .string()
        .min(1, { message: "Please confirm your password" }),

      type: z.number(),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"], // attach error to rePassword field
    });

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignUpCommand>({
    resolver: zodResolver(Schema),
  });
  const password = watch("password");

  useEffect(() => {
    setValue("type", companyType == "standalone" ? 1 : 2);
  }, []);

  return (
    <Box>
      <StepIndicator step={0} />

      <Typography variant="h5" sx={{ my: 3, textAlign: "center" }}>
        Basic Information
      </Typography>

      <Box className="form">
        <Box display="flex" justifyContent="center" sx={{ mb: 3 }}>
          <ToggleButtonGroup
            value={companyType}
            exclusive
            onChange={handleCompanyTypeChange}
            sx={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              borderRadius: "8px",
              p: "4px",
            }}
          >
            <ToggleButton
              value="standalone"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "16px",
                color:
                  companyType === "standalone"
                    ? "#fff !important"
                    : "rgba(76, 142, 59, 1)",
                backgroundColor:
                  companyType === "standalone" ? "#4c8e3b !important" : "#fff",

                borderRadius: "5px",
              }}
            >
              Stand-alone business
            </ToggleButton>

            <ToggleButton
              value="chain"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "16px",
                color:
                  companyType === "chain"
                    ? "#fff !important"
                    : "rgba(76, 142, 59, 1)",
                backgroundColor:
                  companyType === "chain" ? "#4c8e3b !important" : "#fff",
                borderRadius: "5px",
              }}
            >
              Chain
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <FormHookInputRow<SignUpCommand>
          register={register}
          fieldError={errors.companyName}
          name="companyName"
          label="Company name"
          placeholder="Enter company name"
          disabled={isLoading}
          fullWidth
        />
        <Box className="flex-container">
          <Label label="Contact Phone Number:" styles={{ minWidth: "210px" }} />

          <FormHookInput<SignUpCommand>
            register={register}
            fieldError={errors.primaryFirstName}
            name="primaryFirstName"
            label=""
            placeholder="First Name"
            disabled={isLoading}
            fullWidth
          />

          <FormHookInput<SignUpCommand>
            register={register}
            fieldError={errors.primaryLastName}
            name="primaryLastName"
            label=""
            placeholder="Last Name"
            disabled={isLoading}
            fullWidth
          />
        </Box>
        <Box className="flex-container">
          <Label label="Contact Phone Number:" styles={{ minWidth: "210px" }} />
          <PhoneNumberInput
            style={{ width: "100%" }}
            name="PrimaryPhonNumber"
            control={control}
            error={errors.PrimaryPhonNumber}
          />
        </Box>

        <FormHookInputRow<SignUpCommand>
          register={register}
          fieldError={errors.businessEmail}
          name="businessEmail"
          label="Business Email:"
          placeholder="Business Email"
          disabled={isLoading}
          fullWidth
        />

        <FormHookInputRow<SignUpCommand>
          register={register}
          fieldError={errors.password}
          name="password"
          label="Password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          disabled={isLoading}
          fullWidth
          InputProps={{
            endAdornment: (
              <button
                style={{
                  background: "none",
                  border: "none",
                  marginRight: "12px",
                }}
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <PiEye size={24} /> : <PiEyeClosed size={24} />}
              </button>
            ),
          }}
        />

        <FormHookInputRow<SignUpCommand>
          register={register}
          fieldError={errors.rePassword}
          name="rePassword"
          label="Confirm Password:"
          placeholder="Confirm Password"
          type={showPassword ? "text" : "password"}
          validation={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number",
            },
          }}
          disabled={isLoading}
          fullWidth
          InputProps={{
            endAdornment: (
              <button
                style={{
                  background: "none",
                  border: "none",
                  marginRight: "12px",
                }}
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <PiEye size={24} /> : <PiEyeClosed size={24} />}
              </button>
            ),
          }}
        />

        <FormHookInputRow<SignUpCommand>
          register={register}
          fieldError={errors.position}
          name="position"
          label="Position:"
          placeholder="Position"
          disabled={isLoading}
          fullWidth
        />

        <Box className="flex-container">
          <Label
            label="Secondary contact person:"
            styles={{ minWidth: "210px" }}
          />

          <FormHookInput<SignUpCommand>
            register={register}
            fieldError={errors.secondaryFirstName}
            name="secondaryFirstName"
            label=""
            placeholder="First Name"
            disabled={isLoading}
            fullWidth
          />

          <FormHookInput<SignUpCommand>
            register={register}
            fieldError={errors.secondaryLastName}
            name="secondaryLastName"
            label=""
            placeholder="Last Name"
            disabled={isLoading}
            fullWidth
          />
        </Box>
        <Box className="flex-container">
          <Label label="Contact Phone Number:" styles={{ minWidth: "210px" }} />
          <PhoneNumberInput
            style={{ width: "100%" }}
            name="secondaryPhoneNumber"
            control={control}
            error={errors.secondaryPhoneNumber}
          />
        </Box>

        <FormHookInputRow<SignUpCommand>
          register={register}
          fieldError={errors.referredBy}
          name="referredBy"
          label="Referred by:"
          placeholder="Referred by"
          disabled={isLoading}
          fullWidth
        />

        <FormHookInputRow<SignUpCommand>
          register={register}
          fieldError={errors.accountNumber}
          name="accountNumber"
          label="Account number:"
          placeholder="Account number"
          disabled={isLoading}
          fullWidth
        />
      </Box>
      <Gap />
      <Box className="flex justify-end">
        <ActiveLoadingButton
          loading={isLoading}
          variant="contained"
          sx={{ mt: 3 }}
          type="submit"
          onClick={handleSubmit(onSubmit)}
          isActive={isValid}
        >
          submit
        </ActiveLoadingButton>
      </Box>
    </Box>
  );
}
