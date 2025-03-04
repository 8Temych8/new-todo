import filterTasksArray from "../utils/filterTasksArray";
import Task from "./Task/Task";
import saveArray from "../utils/saveArray";
import EmptyTasks from "./EmptyTasks/EmptyTasks";

const TaskRender = (props) => {
  const RemoveTask = (id: string): void => {
    props.setTemporaryTasks(props.tasks);
    const updatedTasks = props.tasks.filter((task) => task.id !== id);
    props.setTasks(updatedTasks);
    console.log("Task id:", id, " removed!!!");
    saveArray("Tasks", updatedTasks);
    props.setStateRemoveNotification(true);
  };

  const editNote = (id: string, editedNote: string): void => {
    const updatedTasks = props.tasks.map((task) =>
      task.id === id ? { ...task, note: editedNote } : task
    );
    props.setTasks(updatedTasks);
    console.log("Note id:", id, " changed!!!");
    saveArray("Tasks", updatedTasks);
  };

  const switchCheckbox = (id: string): void => {
    const updatedTasks = props.tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    props.setTasks(updatedTasks);
    console.log("Checkbox id:", id, " changed!!!");
    saveArray("Tasks", updatedTasks);
  };

  let filteredTasks = filterTasksArray(
    props.filter,
    props.tasks,
    props.searchQuery
  );

  if (filteredTasks.length != 0) {
    return filteredTasks.map((item, index) => (
      <div key={item.id}>
        <Task
          id={item.id}
          removeTask={() => {
            RemoveTask(item.id);
          }}
          editNoteFunc={editNote}
          note={item.note}
          done={item.done}
          switchChekbox={() => {
            switchCheckbox(item.id);
          }}
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
