import styles from "./formFrame.module.css"


export default function FormFrameScroll({ children }) {
    return (
        <div className={styles.form}>
            <div className={styles.container}>
                {children}
            </div>
        </div>

    )
}