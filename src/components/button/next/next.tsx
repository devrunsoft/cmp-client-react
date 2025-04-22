"use client"
import React from 'react';
import { IoIosArrowRoundForward } from "react-icons/io";

import styles from "./index.module.css"

export const NextButton = ({ onClick }) => {
    return (
        <button className={styles.nextButton} type='submit' onClick={onClick}>
            Save <IoIosArrowRoundForward size={"24"} style={{ color: "white", minWidth: '24px' }} />
        </button>
    );
};