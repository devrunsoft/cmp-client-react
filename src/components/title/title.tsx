"use client";
import styles from "./title.module.css";

export default function Title({
  title,
  icon,
  onPress = undefined,
}: {
  title?: string;
  icon?: string;
  onPress?: () => void;
}) {
  return (
    <div className={styles.title}>
      {icon && (
        <div
          onClick={() => (onPress ? onPress!() : null)}
          style={{ cursor: "pointer" }}
        >
          <img src={icon} width={36} height={36} alt="broom" />
        </div>
      )}
      <h1>{title}</h1>
    </div>
  );
}
