import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import saveArray from "../utils/saveArray";
import getArray from "../utils/getArray";

interface TaskType {
  id: string;
  note: string;
  done: boolean;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>(
    getArray<TaskType>("Tasks") || []
  );
  const [removedTasks, setRemovedTasks] = useState<TaskType[]>([]);
  const [removedId, setRemovedId] = useState<string[]>([]);

  useEffect(() => {
    setRemovedId((prev) =>
      prev.filter((id) => removedTasks.some((task) => task.id === id))
    );
  }, [removedTasks]);

  const pushNewTask = (note: string, done = false): void => {
    const updatedTasks = [...tasks, { id: uuidv4(), note, done }];
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

  return {
    tasks,
    setTasks,
    removedId,
    removedTasks,
    pushNewTask,
    handleRemovedId,
    undoRemove,
    setRemovedTasks,
    setRemovedId,
  };
};
