import Search from "./components/Search";
import DropDownList from "./components/DropDownList";
import styles from "./Toolbar.module.scss";

interface ToolbarProps {
  themeSwitcher: React.ReactNode;
  filterHandler: (filterState: string) => void;
  onSearchChange: (query: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  themeSwitcher,
  filterHandler,
  onSearchChange,
}) => {
  return (
    <div className={styles.toolbar}>
      <Search onSearchChange={onSearchChange} />
      <DropDownList onFilterChange={filterHandler} />
      {themeSwitcher}
    </div>
  );
};

export default Toolbar;
