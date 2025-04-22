import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { toast } from "react-toastify";
import { APP_ROUTES } from "../../../routes/app_route";
import { useLoginApi } from "data/repository/user";
import { LoginCommand } from "common/domain/command/login";
import FormHookInput from "uikit/src/FormHookInput";
import { useRegistartionStatusLogin } from "data/repository/registartionStatus";
import styles from "../Login/index.module.css";
import ActiveLoadingButton from "uikit/src/Button";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginCommand>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const request = useLoginApi();
  const requestStatus = useRegistartionStatusLogin();
  const isLoading = request.loading;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: LoginCommand) => {
    request.call({
      data,
      onSuccess: (registered) => {
        if (registered) {
          checkRegistration();
        } else {
          navigate(APP_ROUTES.Activation);
        }
      },
    });
  };

  const checkRegistration = async () => {
    requestStatus.call({
      onError: (res) => {
        navigate(APP_ROUTES.Splash);
      },
      onSuccess: (status) => {
        appNavigator(status);
      },
    });
  };

  const appNavigator = (status) => {
    switch (status) {
      case "NotRegistered":
        navigate(`${APP_ROUTES.SignUp}?step=1`);
        toast.error("You are not registered");
        break;
      case "ProfessionalInformation":
        navigate(`${APP_ROUTES.SignUp}?step=2`);
        toast.error("Please complete your registration!");
        break;
      case "DocumentSubmission":
        navigate(`${APP_ROUTES.SignUp}?step=3`);
        toast.error("Please complete your registration!");
        break;
      case "BillingDetails":
        navigate(`${APP_ROUTES.SignUp}?step=4`);
        toast.error("Please complete your registration!");
        break;
      case "NotActivate":
        navigate(APP_ROUTES.Activation);
        toast.error("Check your email for the activation link!");
        break;
      case "Registered":
        navigate(APP_ROUTES.Dashboard);
        break;
    }
  };
  let iconSize = 24;
  return (
    <Box className={styles.container}>
      <Box textAlign="center">
        <Typography variant="h4">Welcome to Client Portal!</Typography>
        <Typography variant="body1">
          Already have an account?{" "}
          <Button variant="text" onClick={() => navigate("/SignUpDetail/1")}>
            Sign up now
          </Button>
        </Typography>
      </Box>

      <Box className="form formPadding">
        <FormHookInput<LoginCommand>
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Invalid email address",
            },
          }}
          fieldError={errors.BusinessEmail}
          name="BusinessEmail"
          required
          placeholder="Email"
          disabled={isLoading}
        />

        <FormHookInput<LoginCommand>
          register={register}
          fieldError={errors.Password}
          name="Password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          disabled={isLoading}
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
                {showPassword ? (
                  <PiEye size={iconSize} />
                ) : (
                  <PiEyeClosed size={iconSize} />
                )}
              </button>
            ),
          }}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
          <Button
            variant="text"
            onClick={() => navigate("/login/forgotPassword")}
          >
            Forgot password?
          </Button>
        </Box>

        <ActiveLoadingButton
          isActive={isValid}
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          fullWidth
          endIcon={<IoIosArrowRoundForward />}
        >
          Continue
        </ActiveLoadingButton>
      </Box>
    </Box>
  );
};

export default LoginForm;
