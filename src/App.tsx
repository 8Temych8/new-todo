import { v4 as uuidv4 } from "uuid";

import styles from "./App.module.scss";
import Toolbar from "./components/Toolbar/Toolbar";
import ThemeSwitchBtn from "./components/Toolbar/components/ThemeSwitchBtn/ThemeSwitchBtn";
import { useEffect, useState } from "react";
import NewTaskButton from "./components/NewTaskButton/NewTaskButton";
import NewTaskModal from "./components/NewTaskModal/NewTaskModal";
import RemoveNotification from "./components/RemoveNotification/RemoveNotification";
import TaskRender from "./components/TaskRender";
import saveArray from "./utils/saveArray";
import getArray from "./utils/getArray";

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
  const [temporaryTasks, setTemporaryTasks] = useState<
    TaskType[] | undefined
  >();
  const [filter, setFilter] = useState("All");
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

  const undoRemoveTask = (): void => {
    setTasks(temporaryTasks);
    saveArray("Tasks", temporaryTasks);
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
          tasks={tasks}
          searchQuery={searchQuery}
          setTemporaryTasks={setTemporaryTasks}
          setTasks={setTasks}
          setStateRemoveNotification={setStateRemoveNotification}
        />

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
