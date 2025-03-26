import filterTasksArray from "../utils/filterTasksArray";
import Task from "./Task/Task";
import saveArray from "../utils/saveArray";
import EmptyTasks from "./EmptyTasks/EmptyTasks";

interface TaskType {
  id: string;
  note: string;
  done: boolean;
}

interface TaskRenderProps {
  filter: "All" | "Complete" | "Incomplete";
  tasks: TaskType[];
  searchQuery: string;
  setRemovedId: React.Dispatch<React.SetStateAction<string[]>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  setRemovedTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  removedTasks: TaskType[];
  handleRemovedId: (handledId: string) => void;
}

const TaskRender: React.FC<TaskRenderProps> = (props) => {
  const removeTask = (id: string) => {
    const taskToRemove = props.tasks.find((task) => task.id === id);
    if (taskToRemove) {
      if (!props.removedTasks.some((task) => task.id === id)) {
        props.setRemovedTasks((prev) => [...prev, taskToRemove]);
      }
    }

    const updatedTasks = props.tasks.filter((task) => task.id !== id);
    props.setTasks(updatedTasks);
    saveArray("Tasks", updatedTasks);
    props.handleRemovedId(id);
  };

  const editNote = (id: string, editedNote: string): void => {
    const updatedTasks = props.tasks.map((task) =>
      task.id === id ? { ...task, note: editedNote } : task
    );
    props.setTasks(updatedTasks);
    saveArray("Tasks", updatedTasks);
  };

  const switchCheckbox = (id: string): void => {
    const updatedTasks = props.tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    props.setTasks(updatedTasks);
    saveArray("Tasks", updatedTasks);
  };

  const filteredTasks = filterTasksArray(
    props.filter,
    props.tasks,
    props.searchQuery
  );

  if (filteredTasks.length !== 0) {
    return filteredTasks.map((item: TaskType, index: number) => (
      <div key={item.id}>
        <Task
          id={item.id}
          removeTask={() => removeTask(item.id)}
          editNoteFunc={editNote}
          note={item.note}
          done={item.done}
          switchChekbox={() => switchCheckbox(item.id)}
        />
        {index < filteredTasks.length - 1 && (
          <hr
            style={{
              width: "520px",
              color: "#6C63FF",
              backgroundColor: "#6C63FF",
              border: "none",
              height: "1px",
            }}
          />
        )}
      </div>
    ));
  } else {
    return <EmptyTasks />;
  }
};

export default TaskRender;
