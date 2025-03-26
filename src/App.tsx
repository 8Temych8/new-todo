import styles from "./App.module.scss";
import Toolbar from "./components/Toolbar/Toolbar";
import ThemeSwitchBtn from "./components/Toolbar/components/ThemeSwitchBtn/ThemeSwitchBtn";
import { useEffect, useState } from "react";
import NewTaskButton from "./components/NewTaskButton/NewTaskButton";
import NewTaskModal from "./components/NewTaskModal/NewTaskModal";
import TaskRender from "./components/TaskRender";
import RemoveNotificationList from "./components/RemoveNotificationList/RemoveNotificationList";
import { useTasks } from "./hooks/useTasks";
import { useFilters } from "./hooks/useFilters";
import { useSearch } from "./hooks/useSearch";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [shownModal, setShownModal] = useState<boolean>(false);
  const {
    tasks,
    setTasks,
    removedId,
    removedTasks,
    pushNewTask,
    handleRemovedId,
    undoRemove,
    setRemovedTasks,
    setRemovedId,
  } = useTasks();
  const { filter, filterHandler } = useFilters();
  const { searchQuery, handleSearchChange } = useSearch();

  useEffect(() => {
    setRemovedId((prev) =>
      prev.filter((id) => removedTasks.some((task) => task.id === id))
    );
  }, [removedTasks]);

  const themeToggler = (): void => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const changeStateModal = (): void => {
    setShownModal(!shownModal);
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
          handleRemovedId={handleRemovedId}
        />

        <NewTaskButton openAddTaskModal={changeStateModal} />
        <RemoveNotificationList
          removedList={removedId}
          undoRemove={undoRemove}
          setRemovedId={setRemovedId}
        />
      </div>
      <NewTaskModal
        isOpen={shownModal}
        setIsOpen={changeStateModal}
        pushTask={pushNewTask}
      />
    </div>
  );
}

export default App;
