import { v4 as uuidv4 } from "uuid";

import styles from "./App.module.scss";
import Task from "./Task/Task";
import Toolbar from "./Toolbar/Toolbar";
import ThemeSwitchBtn from "./Toolbar/components/ThemeSwitchBtn";
import { useEffect, useState } from "react";
import empty from "./assets/empty.png";
import NewTaskButton from "./NewTaskButton";
import NewTaskModal from "./NewTaskModal";
import RemoveNotification from "./RemoveNotification";

interface TaskType {
  id: string;
  note: string;
  done: boolean;
}

interface FilterType {
  filtered: boolean;
  doneState: boolean;
}

function App() {
  function saveArray<T>(key: string, array: T[]): void {
    if (Array.isArray(array)) {
      localStorage.setItem(key, JSON.stringify(array));
    }
  }

  function getArray<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [stateModal, setStateModal] = useState<boolean>(false);
  const [stateRemoveNotification, setStateRemoveNotification] =
    useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskType[]>(
    getArray<TaskType>("Tasks") || []
  );
  const [temporaryTasks, setTemporaryTasks] = useState<
    TaskType[] | undefined
  >();
  const [filter, setFilter] = useState<FilterType>({
    filtered: false,
    doneState: true,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const themeToggler = (): void => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const changeStateModal = (): void => {
    setStateModal(!stateModal);
  };

  const PushNewTask = (note: string, done = false): void => {
    const updatedTasks = [...tasks, { id: uuidv4(), note: note, done: done }];
    setTasks(updatedTasks);
    saveArray("Tasks", updatedTasks);
  };

  const RemoveTask = (id: string): void => {
    setTemporaryTasks(tasks);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    console.log("Task id:", id, " removed!!!");
    saveArray("Tasks", updatedTasks);
    setStateRemoveNotification(true);
  };

  const undoRemoveTask = (): void => {
    setTasks(temporaryTasks);
    saveArray("Tasks", temporaryTasks);
  };

  const switchCheckbox = (id: string): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    console.log("Checkbox id:", id, " changed!!!");
    saveArray("Tasks", updatedTasks);
  };

  const editNote = (id: string, editedNote: string): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, note: editedNote } : task
    );
    setTasks(updatedTasks);
    console.log("Note id:", id, " changed!!!");
    saveArray("Tasks", updatedTasks);
  };

  const filterHandler = (
    filterState: "All" | "Complete" | "Incomplete"
  ): void => {
    if (filterState == "Complete") {
      setFilter({ filtered: true, doneState: true });
    } else if (filterState == "Incomplete") {
      setFilter({ filtered: true, doneState: false });
    } else {
      setFilter({ filtered: false, doneState: false });
    }
  };

  const handleSearchChange = (query: string): void => {
    setSearchQuery(query.toLowerCase());
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const taskRender = (): JSX.Element | JSX.Element[] => {
    let filteredTasks = tasks;
    if (filter.filtered) {
      filteredTasks = tasks.filter((task) => task.done === filter.doneState);
    }

    if (searchQuery) {
      filteredTasks = filteredTasks.filter((task) =>
        task.note.toLowerCase().includes(searchQuery)
      );
    }

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
      return (
        <div className={styles.emptyContainer}>
          <img src={empty} alt="empty"></img>
          <p className={styles.emptyText}>Empty...</p>
        </div>
      );
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>TODO LIST</h1>
        <Toolbar
          themeSwitcher={<ThemeSwitchBtn onClick={themeToggler} />}
          filterHandler={filterHandler}
          onSearchChange={handleSearchChange}
        />
        {taskRender()}
        <NewTaskButton
          openAddTaskModal={() => {
            changeStateModal();
          }}
        />
        <RemoveNotification
          isVisible={stateRemoveNotification}
          setIsVisible={setStateRemoveNotification}
          undoRemove={undoRemoveTask}
        />
      </div>
      <NewTaskModal
        isOpen={stateModal}
        setIsOpen={changeStateModal}
        pushTask={PushNewTask}
      />
    </div>
  );
}

export default App;
