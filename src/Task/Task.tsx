import styles from "./Task.module.scss";
import Checkbox from "./components/Checkbox";
import EditBtn from "./components/EditBtn";
import RemoveBtn from "./components/RemoveBtn";
import InputEdit from "./components/InputEdit";
import { useState } from "react";

interface TaskProps {
  id: string;
  removeTask: () => void;
  editNoteFunc: (id: string, editedNote: string) => void;
  note: string;
  done: boolean;
  switchChekbox: () => void;
}

const Task: React.FC<TaskProps> = (props) => {
  const [idTaskIsChange, setIdTaskIsChange] = useState("");
  const handleId = (id: string) => {
    setIdTaskIsChange(id);
  };

  const hideEditInput = () => {
    setIdTaskIsChange("");
  };

  const TaskName = () => {
    if (props.id === idTaskIsChange) {
      return (
        <InputEdit
          editNoteFunc={props.editNoteFunc}
          hide={hideEditInput}
          id={props.id}
          note={props.note}
        />
      );
    } else {
      return (
        <p className={props.done ? styles.donenote : styles.note}>
          {props.note}
        </p>
      );
    }
  };

  return (
    <div className={styles.taskContainer}>
      <Checkbox id={props.id} done={props.done} onClick={props.switchChekbox} />
      {TaskName()}
      <div className={styles.btnContainer}>
        <div className={styles.taskButtons}>
          <div className={styles.editBtn}>
            <EditBtn id={props.id} editIdHandle={handleId} />
          </div>
          <RemoveBtn onClick={props.removeTask} />
        </div>
      </div>
    </div>
  );
};

export default Task;
