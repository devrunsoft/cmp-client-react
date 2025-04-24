import React, { useEffect, useState } from "react";
import styles from "./registrationSuccessModule.module.css";
import { IoLogInOutline } from "react-icons/io5";

import { IoIosAddCircle, IoIosArrowRoundForward } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { useLoading } from "components/loading/loading_context";
import { useNavigate } from "react-router-dom";
import { getToken, logout } from "core/src/utils/auth";
import { reSendApi } from "data/api/register/company/resend";
import { toast } from "react-toastify";

const RegistationSuccessModal = () => {
  const navigate = useNavigate();
  const [secondsRemaining, setSecondsRemaining] = useState(180);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { setLoading } = useLoading();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (secondsRemaining > 0) {
      const timer = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsButtonEnabled(true);
    }
  }, [secondsRemaining]);

  useEffect(() => {
    getEmail();
  }, []);

  async function getEmail() {
    try {
      var token = await getToken();
      var decoded = jwtDecode(token?.token ?? "");
      setEmail(decoded["businessEmail"]);
    } catch (error) {}
  }

  async function reSend() {
    try {
      setLoading(true);
      var result = await reSendApi();
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (data) => {
          setSecondsRemaining(180);
        }
      );
    } finally {
      setLoading(false);
    }
  }

  function convertMin(time: number, isSec = true): string {
    var day = fixParts(Math.floor(time / 86400).toString());
    var h = fixParts(Math.floor((time % 86400) / 3600).toString());
    var m = fixParts(Math.floor((time % 3600) / 60).toString());
    var s = fixParts(Math.floor((time % 3600) % 60).toString());

    var newstring = m + (isSec ? ":" + s : "");
    return newstring;
  }

  function fixParts(time: String) {
    return time.length == 1 ? "0" + time : time;
  }

  return (
    <div>
      <div className={styles.modaloverlay}>
        <div className={styles.modalcontent}>
          <svg
            width="72"
            height="64"
            viewBox="0 0 72 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.95243 10.4571C6.68592 12.5617 5.16797 15.9766 5.16797 21.3334V44.6668C5.16797 50.0236 6.68592 53.4385 8.95243 55.5431C11.2525 57.6789 14.7179 58.8334 19.3346 58.8334H52.668C57.2847 58.8334 60.7501 57.6789 63.0502 55.5431C65.3167 53.4385 66.8346 50.0236 66.8346 44.6668V28.0001C66.8346 26.6194 67.9539 25.5001 69.3346 25.5001C70.7153 25.5001 71.8346 26.6194 71.8346 28.0001V44.6668C71.8346 50.9766 70.0193 55.895 66.4524 59.2071C62.9192 62.488 58.0512 63.8334 52.668 63.8334H19.3346C13.9514 63.8334 9.08346 62.488 5.55017 59.2071C1.98335 55.895 0.167969 50.9766 0.167969 44.6668V21.3334C0.167969 15.0236 1.98335 10.1051 5.55017 6.7931C9.08346 3.51219 13.9514 2.16675 19.3346 2.16675H42.668C44.0487 2.16675 45.168 3.28604 45.168 4.66675C45.168 6.04746 44.0487 7.16675 42.668 7.16675H19.3346C14.7179 7.16675 11.2525 8.3213 8.95243 10.4571Z"
              fill="#1F2229"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.3826 21.4399C18.2443 20.3611 19.8174 20.185 20.8962 21.0467L31.3265 29.3776C31.3259 29.3771 31.327 29.378 31.3265 29.3776C33.8485 31.384 38.1901 31.385 40.7117 29.378C40.7115 29.3782 40.7119 29.3779 40.7117 29.378L44.645 26.2447C45.7249 25.3844 47.2978 25.5624 48.1581 26.6424C49.0184 27.7223 48.8403 29.2952 47.7604 30.1555L43.8271 33.2888C39.4824 36.7477 32.5569 36.7481 28.2123 33.2893L17.7758 24.9535C16.697 24.0918 16.521 22.5187 17.3826 21.4399Z"
              fill="#1F2229"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M61.0013 5.5C57.7796 5.5 55.168 8.11167 55.168 11.3333C55.168 14.555 57.7796 17.1667 61.0013 17.1667C64.223 17.1667 66.8346 14.555 66.8346 11.3333C66.8346 8.11167 64.223 5.5 61.0013 5.5ZM50.168 11.3333C50.168 5.35025 55.0182 0.5 61.0013 0.5C66.9844 0.5 71.8346 5.35025 71.8346 11.3333C71.8346 17.3164 66.9844 22.1667 61.0013 22.1667C55.0182 22.1667 50.168 17.3164 50.168 11.3333Z"
              fill="#4C8E3B"
            />
          </svg>

          <h1>Check your email for the activation link</h1>
          <h3>{email}</h3>
          <h1>{secondsRemaining != 0 && convertMin(secondsRemaining, true)}</h1>
          <div className={styles.buttonLine}>
            <button
              className={styles.nextButton}
              onClick={() => {
                reSend();
              }}
              disabled={!isButtonEnabled}
            >
              Resend Activation Link
            </button>
            <button
              className={styles.cancel}
              onClick={() => {
                logout();
              }}
            >
              Use Diffrent Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistationSuccessModal;
