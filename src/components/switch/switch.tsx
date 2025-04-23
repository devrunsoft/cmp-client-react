import styles from "./switch.module.css"
import { useState } from 'react';


export default function Switch({active, onChange}){
    const [checked, setChecked] = useState(active);

    const handleChange = () => {
        setChecked
        setChecked(!checked);
    };

    
    return(
        <label className={styles.switch} onChange={onChange}>
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    )
}