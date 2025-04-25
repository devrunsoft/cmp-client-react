import styles from "./forgotPasswordForm.module.css";
import React from "react";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

import { PiEye, PiEyeClosed, PiWarningCircle } from "react-icons/pi";
import { MdDone } from "react-icons/md";
import { useLoading } from "components/loading/loading_context";
import { ForgotPasswordApi } from "data/api/user/forgot_password_api";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../routes/app_route";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showConfirm, setShowConfirm] = useState(false);

  const onConfirm = () => setShowConfirm(!showConfirm);

  const [showPasswordBlock, setShowPasswordBlock] = useState(false);
  const { setLoading } = useLoading();

  // const router = useRouter();
  const showBlock = () => {
    setShowPasswordBlock(!showPasswordBlock);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      var result = await ForgotPasswordApi(data.email);
      result.fold(
        (error) => {
          toast.error(error.message);
        },
        (data) => {
          showBlock();
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  return (
    <>
      {showConfirm ? (
        <div className={styles.container}>
          <svg
            width="112"
            height="112"
            viewBox="0 0 112 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="56" cy="56" r="56" fill="#4C8E3B" fill-opacity="0.1" />
            <circle cx="56" cy="56" r="36" fill="#4C8E3B" />
            <path
              d="M41 56L51 66L71 46"
              stroke="white"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h1>Password Updated</h1>
          <p>
            Sweet! Your new password has now been set and you are logged in.
          </p>
        </div>
      ) : (
        <div>
          {!showPasswordBlock ? (
            <div className={styles.container}>
              <div className={styles.welcomeText}>
                <h1>Forgot Password?</h1>
                <p>
                  Don’t worry! Fill in your email and we’ll send you a link to
                  reset your password.{" "}
                </p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.forgotPasswordForm}
                autoComplete="email"
              >
                <input
                  id="email"
                  className={`${styles.inputWithButton} ${styles.inputPassword}`}
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {/* {errors.email && <p>{errors.email.message}</p>} */}

                <button type="submit" className={styles.confirmButton}>
                  send{" "}
                  <IoIosArrowRoundForward
                    size={"24"}
                    style={{ color: "white", minWidth: "24px" }}
                  />
                </button>
              </form>
            </div>
          ) : (
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
                <h1 style={{ textAlign: "center" }}>
                  Please check your email to reset your password
                </h1>
                <Button
                  onClick={() => {
                    navigate(APP_ROUTES.Login);
                  }}
                  variant="contained"
                  endIcon={<IoIosArrowRoundForward />}
                >
                  Login
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ForgotPasswordForm;
