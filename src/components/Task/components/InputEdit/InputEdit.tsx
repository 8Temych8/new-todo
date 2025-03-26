import styles from "./InputEdit.module.scss";
import { useState } from "react";

interface InputEditProps {
  editNoteFunc: (id: string, editedNote: string) => void;
  hide: () => void;
  id: string;
  note: string;
}

const InputEdit: React.FC<InputEditProps> = (props) => {
  const [note, setNote] = useState<string>(props.note);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.editNoteFunc(props.id, note);
      props.hide();
    } else if (event.key === "Escape") {
      setNote(props.note);
      props.hide();
    }
  };

  return (
    <input
      className={styles.editInput}
      type="text"
      value={note}
      autoFocus
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default InputEdit;
