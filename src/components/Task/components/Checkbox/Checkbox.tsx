import { useState } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  id: string;
  done: boolean;
  onClick: () => void;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <div>
      <input
        checked={props.done}
        type="checkbox"
        id={`customCheckbox-${props.id}`}
        className={styles.checkbox}
        onChange={props.onClick}
      />
      <label
        htmlFor={`customCheckbox-${props.id}`}
        className={styles.checkboxLabel}
      ></label>
    </div>
  );
};

export default Checkbox;
