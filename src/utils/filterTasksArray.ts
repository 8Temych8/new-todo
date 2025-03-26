interface TaskType {
  id: string;
  note: string;
  done: boolean;
}

const filterTasksArray = (
  filterType: "All" | "Complete" | "Incomplete",
  array: TaskType[],
  searchQuery: string
) => {
  let filteredArray = array;
  if (filterType === "Complete") {
    filteredArray = array.filter((task: TaskType) => task.done);
  } else if (filterType === "Incomplete") {
    filteredArray = array.filter((task: TaskType) => !task.done);
  }
  if (searchQuery) {
    filteredArray = filteredArray.filter((task: TaskType) =>
      task.note.toLowerCase().includes(searchQuery)
    );
  }
  return filteredArray;
};

export default filterTasksArray;
