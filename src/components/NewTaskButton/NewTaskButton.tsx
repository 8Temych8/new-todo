import styles from "./NewTaskButton.module.scss";
import NewTaskSVG from "../../assets/new-task.svg";

interface NewTaskButtonProps {
  openAddTaskModal: () => void;
}

const NewTaskButton: React.FC<NewTaskButtonProps> = (props) => {
  const handleCLick = () => {
    props.openAddTaskModal();
  };

  return (
    <img
      src={NewTaskSVG}
      className={styles.button}
      onClick={handleCLick}
      alt="ADD"
      height="50px"
      width="50px"
    ></img>
  );
};

export default NewTaskButton;
