import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.scss";
import Toolbar from "./components/Toolbar/Toolbar";
import ThemeSwitchBtn from "./components/Toolbar/components/ThemeSwitchBtn/ThemeSwitchBtn";
import { useEffect, useState } from "react";
import NewTaskButton from "./components/NewTaskButton/NewTaskButton";
import NewTaskModal from "./components/NewTaskModal/NewTaskModal";
import TaskRender from "./components/TaskRender";
import saveArray from "./utils/saveArray";
import getArray from "./utils/getArray";
import RemoveNotificationList from "./components/RemoveNotificationList/RemoveNotificationList";

interface TaskType {
  id: string;
  note: string;
  done: boolean;
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [stateModal, setStateModal] = useState<boolean>(false);
  const [stateRemoveNotification, setStateRemoveNotification] =
    useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskType[]>(
    getArray<TaskType>("Tasks") || []
  );
  const [removedId, setRemovedId] = useState<string[]>([]);
  const [removedTasks, setRemovedTasks] = useState<TaskType[]>([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setRemovedId((prev) =>
      prev.filter((id) => removedTasks.some((task) => task.id === id))
    );
  }, [removedTasks]);

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

  const handleRemovedId = (handledId: string) => {
    setRemovedId((prev) => {
      if (!prev.includes(handledId)) {
        return [...prev, handledId];
      }
      return prev;
    });
  };

  const undoRemove = (id: string) => {
    const taskToRestore = removedTasks.find((task) => task.id === id);
    if (taskToRestore) {
      if (!tasks.some((task) => task.id === id)) {
        const restoredTasks = [...tasks, taskToRestore];
        setTasks(restoredTasks);
        saveArray("Tasks", restoredTasks);
      }

      setRemovedTasks((prev) => prev.filter((task) => task.id !== id));
      setRemovedId((prev) => prev.filter((taskId) => taskId !== id));
    }
  };

  const filterHandler = (
    filterState: "All" | "Complete" | "Incomplete"
  ): void => {
    setFilter(filterState);
  };

  const handleSearchChange = (query: string): void => {
    setSearchQuery(query.toLowerCase());
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>TODO LIST</h1>
        <Toolbar
          themeSwitcher={<ThemeSwitchBtn onClick={themeToggler} />}
          filterHandler={filterHandler}
          onSearchChange={handleSearchChange}
        />
        <TaskRender
          filter={filter}
          tasks={tasks.filter((task) => !removedId.includes(task.id))}
          searchQuery={searchQuery}
          setRemovedId={setRemovedId}
          setTasks={setTasks}
          setRemovedTasks={setRemovedTasks}
          removedTasks={removedTasks}
          setStateRemoveNotification={setStateRemoveNotification}
          handleRemovedId={handleRemovedId}
        />

        <NewTaskButton
          openAddTaskModal={() => {
            changeStateModal();
          }}
        />
        <RemoveNotificationList
          removedList={removedId}
          setIsVisible={setStateRemoveNotification}
          undoRemove={undoRemove}
          setRemovedId={setRemovedId}
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
