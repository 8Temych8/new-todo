import styles from "../components/ThemeSwitchBtn.module.scss";

interface ThemeSwitchBtnProps {
  onClick: () => void;
}

const ThemeSwitchBtn: React.FC<ThemeSwitchBtnProps> = (props) => {
  return (
    <div>
      <button className={styles.btn} onClick={props.onClick}></button>
    </div>
  );
};

export default ThemeSwitchBtn;
