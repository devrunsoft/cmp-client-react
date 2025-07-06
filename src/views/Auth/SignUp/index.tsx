import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SwitcherAndCompanyInfo from "./SwitcherAndCompanyInfo";
import styles from "./signUp.module.css";
import OperationalAddress from "./OperationalAddress";
import { Box } from "@mui/material";
import PaymentForm from "./Payment/payment";
import { BusinessLicense } from "./BusinessLicense";
import { APP_ROUTES } from "../../../routes/app_route";
import { ProtectWrapper } from "../../../routes/main";
// import { loginUser } from '@/app/utils/auth';

const SignUp = () => {
  const { step } = useParams(); // 👈 read step from URL
  const navigate = useNavigate();

  const initialIndex = parseInt(step || "1", 10);
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    navigate(`${APP_ROUTES.SignUpDetail}/${index}`, { replace: true });
  }, [index, navigate]);

  return (
    <Box className="registerPadding">
      {index === 1 && <SwitcherAndCompanyInfo setIndex={setIndex} />}
      {index === 2 && (
        <ProtectWrapper>
          <PaymentForm
            setIndex={setIndex}
            onRegistrationSuccess={() => {
              setIndex(3);
            }}
          />
        </ProtectWrapper>
      )}
      {index === 3 && (
        <ProtectWrapper>
          <OperationalAddress setIndex={setIndex} />{" "}
        </ProtectWrapper>
      )}
      {index === 4 && (
        <ProtectWrapper>
          <BusinessLicense setIndex={setIndex} />{" "}
        </ProtectWrapper>
      )}

      {/* {index === 1 && <BillingDetails setIndex={setIndex} />}
      {index === 2 && <OperationalAddress setIndex={setIndex} />}
      {index === 3 && <DocumentSubmission setIndex={setIndex} />}
      {index === 4 && <SuccessScreen />} */}
    </Box>
  );
};

export default SignUp;

export const StepIndicator = ({ step }) => {
  const steps = [1, 2, 3, 4];
  return (
    <div className={styles.stepsContainer}>
      {steps.map((s, index) => (
        <React.Fragment key={s}>
          {index > 0 && index < steps.length && (
            <div
              key={`spacer-${index}`}
              className={`${styles.spacer} ${
                step >= s - 1 && step === s ? styles.spacerActive : ""
              }`}
            />
          )}
          <div
            key={s}
            className={`${styles.stepIndicator} ${
              step === s ? styles.intermediate : step >= s ? styles.active : ""
            }`}
          >
            {s}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
