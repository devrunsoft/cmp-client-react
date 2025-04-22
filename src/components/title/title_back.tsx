'use client'
import { useNavigate } from "react-router-dom";
import styles from "./title.module.css";

import { IoArrowBack, } from "react-icons/io5";



export default function TitleBack({ title, icon }) {
    const navigate= useNavigate();
    return (
        <div className={styles.titleBack}>
            {<IoArrowBack size={25} onClick={() => navigate(-1)} />}
            {icon && <img src={icon} width={36} height={36} alt="broom" />}
            <h1>{title}</h1>
        </div>
    );
}


