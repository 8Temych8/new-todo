import styles from "./Modal.module.scss";
import { ChangeEvent } from "react";

interface ModalProps {
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  taskText: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  cancelButtonHandler: () => void;
  applyButtonHandler: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
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
            onKeyDown={props.handleKeyDown}
            value={props.taskText}
            onChange={props.handleInputChange}
          />
        </div>
        <div className={styles.footerBtns}>
          <div>
            <button
              className={styles.cancelBtn}
              onClick={props.cancelButtonHandler}
            >
              CANCEL
            </button>
          </div>
          <div>
            <button
              className={styles.applyBtn}
              onClick={props.applyButtonHandler}
            >
              APPLY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
