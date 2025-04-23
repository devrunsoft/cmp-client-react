import { IoLogInOutline } from "react-icons/io5";
import { AiOutlineStop } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { ReactNode } from "react";
import { Link } from "@mui/material";
import styles from "./signUpButtons.module.css";
import { useAddress } from "common/context/address_context";
import { APP_ROUTES } from "../../routes/app_route";

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
  return (
    <div className={styles.container}>
      <Link className={styles.cancel} href="/dashboard/services">
        cancel
      </Link>
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
};

export function ButtonsForm(props: ButtonsFormProps) {
  const { selectedAddresses } = useAddress();
  return (
    <div className={styles.container}>
      {props.hasCancel != false && (
        <Link
          className={styles.cancel}
          href={`${APP_ROUTES.Service.replace(
            ":oprAddress",
            selectedAddresses?.Id?.toString()??""
          )}`}
        >
          cancel
        </Link>
      )}
      <button
        className={`${styles.signUp} ${
          props.isActive && styles.signUpBackground
        } ${props.status === "cancel" && styles.cancelService}`}
        onClick={props.onClick}
      >
        {props.nameOfButton}
        {props.status === "cancel" ? (
          <AiOutlineStop size={22} />
        ) : props.status === "save" ? (
          <MdDone size={24} />
        ) : (
          props.icon
        )}
      </button>
      {props.children}
    </div>
  );
}
