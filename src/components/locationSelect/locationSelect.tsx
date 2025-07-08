import React, { useEffect, useState } from "react";
import styles from "./locationSelect.module.css";
import { useAddress } from "common/context/address_context";
import { APP_ROUTES } from "../../routes/app_route";
import { useAppDispatch, useAppSelector } from "state/index";
import { setAddress } from "state/slice/address";
import { OperationalAddressEntity } from "common/domain/entity/operational_address_entity";
import Gap from "uikit/src/Gap";
import { useParams } from "react-router-dom";

export default function LocationSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { addresses, selectedAddresses, setSelectedAddresses } = useAddress();
  const { oprAddress } = useParams();
  const [address, setAddresse] = useState<OperationalAddressEntity[]>([]);
  const toggling = () => setIsOpen(!isOpen);
  var dispatch = useAppDispatch();

  // const location = useLocation();
  // const navigate = useNavigate();

  const onOptionClicked = (value) => () => {
    selectTheAddress(value);
    setIsOpen(false);

    const currentPath = location.pathname;

    // Match only routes like /dashboard/{oprAddress}/...
    const match = currentPath.match(/^\/dashboard\/[^/]+(\/.*)?$/);

    if (match) {
      // Replace current oprAddress with new one
      const newPath = currentPath.replace(
        /^\/dashboard\/[^/]+/,
        `/dashboard/${value.Id}`
      );

      window.history.replaceState(null, "", newPath);
    }
  };

  const selectTheAddress = (value: OperationalAddressEntity) => {
    setSelectedAddresses(value);
    dispatch(setAddress(value));
  };

  useEffect(() => {
    const hasAll = addresses.some((x) => x.Id === 0);
    var allAddress: OperationalAddressEntity = {
      LocationCompany: [],
      Name: "All",
      Id: 0,
      Address: "",
      LocationDateTimes: [],
    };
    setAddresse([...[allAddress], ...addresses]);
    if (oprAddress) {
      selectTheAddress(addresses.find((e) => e.Id === Number(oprAddress))!);
    }
  }, []);

  return (
    <div className={styles.dropDownContainer}>
      <div className={styles.dropDownHeader} onClick={toggling}>
        <div>
          <p className={styles.dropDownHeaderText}>
            Location - {selectedAddresses?.Name}
          </p>
          {/* <p>{selectedAddresses?.Address}</p> */}
        </div>
        <Gap />
        <svg
          width="8"
          height="7"
          viewBox="0 0 8 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.86603 6.5C4.48113 7.16667 3.51887 7.16667 3.13397 6.5L0.535899 2C0.150999 
            1.33334 0.632124 0.500001 1.40192 0.500001L6.59808 0.500001C7.36788 0.500001 7.849 1.33333 
            7.4641 2L4.86603 6.5Z"
            fill="#1F2229"
          />
        </svg>
      </div>
      {isOpen && (
        <div className={styles.dropDownListContainer}>
          <ul className={styles.dropDownList}>
            {address.map((option) => (
              <li
                className={styles.listItem}
                onClick={onOptionClicked(option)}
                key={Math.random()}
              >
                {option.Name} {option?.Address && "-"} {option?.Address}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
