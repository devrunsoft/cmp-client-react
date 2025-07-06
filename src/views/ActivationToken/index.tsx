import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { saveToken } from "core/src/utils/auth";
import { TokenEntity } from "core/src/types/api";
import { useRegistartionStatusLogin } from "data/repository/registartionStatus";
import { APP_ROUTES } from "../../routes/app_route";
import { toast } from "react-toastify";
import { DataFetchingWrapper } from "cmp-core/src/DataFetchingWrapper";

export default function ActivationToken() {
  const { token } = useParams();
  const requestStatus = useRegistartionStatusLogin();
  const navigate = useNavigate();

  const checkRegistration = async () => {
    requestStatus.call({
      onError: (res) => {
        navigate(APP_ROUTES.Splash);
      },
      onSuccess: (status) => {
        appNavigator(status.data);
      },
    });
  };

  const appNavigator = (status) => {
    switch (status) {
      case "NotRegistered":
        navigate(`${APP_ROUTES.SignUpDetail}/1`);
        toast.warning("You are not registered");
        break;
      case "ProfessionalInformation":
        navigate(`${APP_ROUTES.SignUpDetail}/3`);
        toast.warning("Please complete your registration!");
        break;
      case "DocumentSubmission":
        navigate(`${APP_ROUTES.SignUpDetail}/4`);
        toast.warning("Please complete your registration!");
        break;
      case "BillingDetails":
        navigate(`${APP_ROUTES.SignUpDetail}/2`);
        toast.warning("Please complete your registration!");
        break;
      case "NotActivate":
        navigate(APP_ROUTES.Activation);
        toast.warning("Check your email for the activation link!");
        break;
      case "Registered":
        navigate(APP_ROUTES.Dashboard);
        break;
    }
  };

  useEffect(() => {
    var tokenEntity: TokenEntity = {
      token: token!,
      accepted: false,
      registered: true,
      isFirstLogin: true,
    };
    saveToken(tokenEntity);
    checkRegistration();
  }, []);

  return (
    <DataFetchingWrapper
      retry={checkRegistration}
      loading={requestStatus.loading && !requestStatus.data?.data}
      error={requestStatus.error && !requestStatus.data?.data}
    >
      <Box></Box>
    </DataFetchingWrapper>
  );
}
