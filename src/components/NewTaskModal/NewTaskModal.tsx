import { ChangeEvent, useState } from "react";
import Modal from "./components/Modal";

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
      <Modal
        handleKeyDown={handleKeyDown}
        taskText={taskText}
        handleInputChange={handleInputChange}
        cancelButtonHandler={cancelButtonHandler}
        applyButtonHandler={applyButtonHandler}
      />
    );

  return null;
};

export default NewTaskModal;
