import { useState } from "react";
import styles from "./Select.module.scss";
import chevronUp from "../../../../assets/chevron-up.svg";
import chevronDown from "../../../../assets/chevron-down.svg";

interface SelectProps {
  defaultValue: string;
  data: string[];
  onSelectionChange: (selection: string) => void;
}

const Select: React.FC<SelectProps> = ({
  defaultValue,
  data,
  onSelectionChange,
}) => {
  const [activeSelection, setActiveSelection] = useState<string>(defaultValue);
  const [shownDropdown, setShownDropdown] = useState<boolean>(false);
  const [chevronPath, setChevronPath] = useState(chevronDown);

  const changeChevronPath = () => {
    setChevronPath(shownDropdown ? chevronDown : chevronUp);
  };

  const handleSelectionChange = (selection: string) => {
    setActiveSelection(selection);
    onSelectionChange(selection);
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.dropdown__button}
        onClick={() => {
          setShownDropdown(!shownDropdown);
          changeChevronPath();
        }}
      >
        {activeSelection}
        <img src={chevronPath} alt="" />
      </div>
      <div
        className={styles.dropdown__selections}
        style={{ display: shownDropdown ? "block" : "none" }}
      >
        {data.map((selection, index) => (
          <div
            key={index}
            className={styles.dropdown__item}
            onClick={() => {
              handleSelectionChange(selection);
              setShownDropdown(false);
              changeChevronPath();
            }}
          >
            {selection}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
