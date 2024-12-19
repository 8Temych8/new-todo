import { ChangeEvent, useState } from "react";
import styles from "./NewTaskModal.module.scss";

interface NewTaskModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  pushTask: (taskText: string) => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = (props) => {
  const [taskText, setTaskText] = useState<string>("");

  const cancelButtonHandler = () => {
    props.setIsOpen();
  };

  const applyButtonHandler = () => {
    if (taskText.trim() !== "") {
      props.pushTask(taskText);
      setTaskText("");
      props.setIsOpen();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      applyButtonHandler();
    } else if (event.key === "Escape") {
      cancelButtonHandler();
    }
  };

  if (props.isOpen)
    return (
      <div className={styles.modal}>
        <div className={styles.modalWindow}>
          <h2>NEW NOTE</h2>
          <div className={styles.inputFieldDiv}>
            <input
              type="text"
              className={styles.inputFieldModal}
              placeholder="Input your note..."
              autoFocus
              onKeyDown={handleKeyDown}
              value={taskText}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.footerBtns}>
            <div>
              <button
                className={styles.cancelBtn}
                onClick={cancelButtonHandler}
              >
                CANCEL
              </button>
            </div>
            <div>
              <button className={styles.applyBtn} onClick={applyButtonHandler}>
                APPLY
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  return null;
};

export default NewTaskModal;
