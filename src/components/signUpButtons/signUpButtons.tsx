import { IoLogInOutline } from "react-icons/io5";
import { AiOutlineStop } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { ReactNode } from "react";
import { Box, Button, Link } from "@mui/material";
import styles from "./signUpButtons.module.css";
import { useAddress } from "common/context/address_context";
import { APP_ROUTES } from "../../routes/app_route";
import { useNavigate } from "react-router-dom";
import ActiveLoadingButton from "uikit/src/Button";

export default function SignUpButtons({
  nameOfButton,
  iconOfButton,
  status,
  Click,
}) {
  return (
    <div className={styles.container}>
      <Link className={styles.cancel} href="/dashboard/services">
        cancel
      </Link>
      <button
        className={`${styles.signUp} ${
          status === "cancel" && styles.cancelService
        }`}
        onClick={Click}
      >
        {nameOfButton}
        {status === "cancel" ? (
          <AiOutlineStop size={22} />
        ) : status === "save" ? (
          <MdDone size={24} />
        ) : (
          iconOfButton
        )}
        {/* {status === "cansel" && <Dialog isOpen={isOpen} onClose={handleCloseDialog}>
                    <CanselServiceForm/>
                </Dialog>} */}
      </button>
    </div>
  );
}

export function EditProfileButtons({
  nameOfButton,
  iconOfButton,
  status,
  isActive,
}) {
  const { selectedAddresses } = useAddress();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <button
        className={styles.cancel}
        onClick={() => {
          navigate(
            APP_ROUTES.Service.replace(
              ":oprAddress",
              selectedAddresses?.Id?.toString() ?? ""
            ),
            { replace: true }
          );
        }}
      >
        Cancel
      </button>
      <button
        type="submit"
        className={`${styles.signUp} ${isActive && styles.signUpBackground} ${
          status === "cancel" && styles.cancelService
        }`}
      >
        {nameOfButton}
        {status === "cancel" ? (
          <AiOutlineStop size={22} />
        ) : status === "save" ? (
          <MdDone size={24} />
        ) : (
          iconOfButton
        )}
        {/* {status === "cansel" && <Dialog isOpen={isOpen} onClose={handleCloseDialog}>
                    <CanselServiceForm/>
                </Dialog>} */}
      </button>
    </div>
  );
}

type ButtonsFormProps = {
  nameOfButton: String;
  status: String;
  onClick: () => void;
  children?: ReactNode;
  hasCancel?: boolean;
  icon?: ReactNode;
  isActive?: boolean;
  loading?: boolean;
};

export function ButtonsForm22(props: ButtonsFormProps) {
  const { selectedAddresses } = useAddress();

  return (
    <div className={styles.container}>
      {props.hasCancel !== false &&
        (props.loading ? (
          <span className={styles.cancel}>
            <span className={styles.spinner} aria-label="Loading..." />
          </span>
        ) : (
          <Link
            className={styles.cancel}
            href={`${APP_ROUTES.Service.replace(
              ":oprAddress",
              selectedAddresses?.Id?.toString() ?? ""
            )}`}
          >
            cancel
          </Link>
        ))}

      <button
        className={`${styles.signUp} ${
          props.isActive ? styles.signUpBackground : ""
        } ${props.status === "cancel" ? styles.cancelService : ""}`}
        onClick={props.onClick}
        disabled={props.loading}
      >
        {props.loading ? (
          <span className={styles.spinner} aria-label="Loading..." />
        ) : (
          <>
            {props.nameOfButton}
            {props.status === "cancel" ? (
              <AiOutlineStop size={22} />
            ) : props.status === "save" ? (
              <MdDone size={24} />
            ) : (
              props.icon
            )}
          </>
        )}
      </button>
      {props.children}
    </div>
  );
}

export function ButtonsForm({
  loading,
  isActive,
  onClick,
  hasCancel,
  status,
  icon,
  nameOfButton,
  children,
}: ButtonsFormProps) {
  const { selectedAddresses } = useAddress();
  const navigate = useNavigate();
  return (
    <Box className="flex justify-end" sx={{ gap: "5px" }}>
      {hasCancel !== false && (
        <Button
          className="formButton"
          variant="outlined"
          color="default"
          onClick={() =>
            navigate(
              `${APP_ROUTES.Service.replace(
                ":oprAddress",
                selectedAddresses?.Id?.toString() ?? ""
              )}`
            )
          }
        >
          Cancel
        </Button>
      )}
      <ActiveLoadingButton
        loading={loading}
        color={status === "cancel" ? "warning" : "primary"}
        startIcon={
          <>
            {status === "cancel" ? (
              <AiOutlineStop size={22} />
            ) : status === "save" ? (
              <MdDone size={24} />
            ) : (
              icon
            )}
          </>
        }
        variant={status === "cancel" ? "outlined" : "contained"}
        // sx={{ mt: 3 }}
        onClick={onClick}
        isActive={isActive ?? true}
      >
        {nameOfButton ?? ""}
      </ActiveLoadingButton>
      {children}
    </Box>
  );
}
