import styles from "./EmptyTasks.module.scss";
import empty from "../../assets/empty.png";

const EmptyTasks = () => {
  return (
    <div className={styles.emptyContainer}>
      <img src={empty} alt="empty"></img>
      <p className={styles.emptyText}>Empty...</p>
    </div>
  );
};

export default EmptyTasks;
