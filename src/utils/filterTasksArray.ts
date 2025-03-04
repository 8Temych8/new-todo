const FilterTasksArray = (filterType, array, searchQuery) => {
  let filteredArray = array;
  if (filterType === "Complete") {
    filteredArray = array.filter((task) => task.done);
  } else if (filterType === "Incomplete") {
    filteredArray = array.filter((task) => !task.done);
  }
  if (searchQuery) {
    filteredArray = filteredArray.filter((task) =>
      task.note.toLowerCase().includes(searchQuery)
    );
  }
  return filteredArray;
};

export default FilterTasksArray;
